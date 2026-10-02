const fs = require('fs');

// 駅リスト
const rawTs = fs.readFileSync('src/data/lines/musashino/stations.ts', 'utf8');
const jsonMatch = rawTs.match(/export const MUSASHINO_STATIONS: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
const stations = JSON.parse(jsonMatch ? jsonMatch[1] : '[]');

const stMap = new Map(stations.map(s => [s.id, s]));
const stByName = new Map(stations.map(s => [s.name, s]));

// 秒を HH:MM:SS に変換
function secToTime(sec) {
  const s = ((sec % 86400) + 86400) % 86400;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sc = s % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sc).padStart(2, '0')}`;
}

// 駅間走行時間（秒）
const SEGMENT_DURATIONS = {
  // 本線
  'JM-35_JM-34': 120, // 府中本町 - 北府中
  'JM-34_JM-33': 120, // 北府中 - 西国分寺
  'JM-33_JM-32': 240, // 西国分寺 - 新小平
  'JM-32_JM-31': 300, // 新小平 - 新秋津
  'JM-31_JM-30': 180, // 新秋津 - 東所沢
  'JM-30_JM-29': 240, // 東所沢 - 新座
  'JM-29_JM-28': 180, // 新座 - 北朝霞
  'JM-28_JM-27': 240, // 北朝霞 - 西浦和
  'JM-27_JM-26': 180, // 西浦和 - 武蔵浦和
  'JM-26_JM-25': 180, // 武蔵浦和 - 南浦和
  'JM-25_JM-24': 240, // 南浦和 - 東浦和
  'JM-24_JM-23': 240, // 東浦和 - 東川口
  'JM-23_JM-22': 240, // 東川口 - 南越谷
  'JM-22_JM-21': 180, // 南越谷 - 越谷レイクタウン
  'JM-21_JM-20': 120, // 越谷レイクタウン - 吉川
  'JM-20_JM-19': 120, // 吉川 - 吉川美南
  'JM-19_JM-18': 120, // 吉川美南 - 新三郷
  'JM-18_JM-17': 180, // 新三郷 - 三郷
  'JM-17_JM-16': 120, // 三郷 - 南流山
  'JM-16_JM-15': 180, // 南流山 - 新松戸
  'JM-15_JM-14': 240, // 新松戸 - 新八柱
  'JM-14_JM-13': 180, // 新八柱 - 東松戸
  'JM-13_JM-12': 180, // 東松戸 - 市川大野
  'JM-12_JM-11': 180, // 市川大野 - 船橋法典
  'JM-11_JM-10': 240, // 船橋法典 - 西船橋

  // 京葉線東京方面
  'JM-10_JE-09': 420, // 西船橋 - 市川塩浜
  'JE-09_JE-08': 180, // 市川塩浜 - 新浦安
  'JE-08_JE-07': 180, // 新浦安 - 舞浜
  'JE-07_JE-06': 180, // 舞浜 - 葛西臨海公園
  'JE-06_JE-05': 180, // 葛西臨海公園 - 新木場
  'JE-05_JE-04': 180, // 新木場 - 潮見
  'JE-04_JE-03': 120, // 潮見 - 越中島
  'JE-03_JE-02': 120, // 越中島 - 八丁堀
  'JE-02_JE-01': 120, // 八丁堀 - 東京

  // 京葉線海浜幕張方面
  'JM-10_JE-11': 360, // 西船橋 - 南船橋
  'JE-11_JE-12': 180, // 南船橋 - 新習志野
  'JE-12_JE-13': 120, // 新習志野 - 幕張豊砂
  'JE-13_JE-14': 180, // 幕張豊砂 - 海浜幕張

  // 大宮支線
  'JA-26_JM-28': 780, // 大宮 - 北朝霞 (むさしの号)
  'JA-26_JM-26': 600, // 大宮 - 武蔵浦和 (しもうさ号)

  // 中央線直通（むさしの号）
  'JM-32_JC-18': 360, // 新小平 - 国立
  'JC-18_JC-19': 180, // 国立 - 立川
  'JC-19_JC-20': 180, // 立川 - 日野
  'JC-20_JC-21': 180, // 日野 - 豊田
  'JC-21_JC-22': 240, // 豊田 - 八王子
};

// 逆方向も同一時間とする
function getDuration(fromId, toId) {
  const k1 = `${fromId}_${toId}`;
  if (SEGMENT_DURATIONS[k1]) return SEGMENT_DURATIONS[k1];
  const k2 = `${toId}_${fromId}`;
  if (SEGMENT_DURATIONS[k2]) return SEGMENT_DURATIONS[k2];
  return 180; // デフォルト3分
}

// 停車時間 (秒)
const STOP_DWELL = 30;

// 全トリップ生成
const allTrips = [];

// 駅時刻表ストア
const stationTimetables = {
  weekday: {},
  holiday: {},
};

stations.forEach(s => {
  stationTimetables.weekday[s.id] = { inbound: [], outbound: [] };
  stationTimetables.holiday[s.id] = { inbound: [], outbound: [] };
});

// 駅シーケンス定義
const SEQ_MAINLINE = [
  'JM-35', 'JM-34', 'JM-33', 'JM-32', 'JM-31', 'JM-30', 'JM-29', 'JM-28', 'JM-27', 'JM-26',
  'JM-25', 'JM-24', 'JM-23', 'JM-22', 'JM-21', 'JM-20', 'JM-19', 'JM-18', 'JM-17', 'JM-16',
  'JM-15', 'JM-14', 'JM-13', 'JM-12', 'JM-11', 'JM-10'
];

const SEQ_TOKYO = [
  'JE-09', 'JE-08', 'JE-07', 'JE-06', 'JE-05', 'JE-04', 'JE-03', 'JE-02', 'JE-01'
];

const SEQ_MAKUHARI = [
  'JE-11', 'JE-12', 'JE-13', 'JE-14'
];

const SEQ_MUSASHINO_GO = [
  'JC-22', 'JC-21', 'JC-20', 'JC-19', 'JC-18', 'JM-32', 'JM-31', 'JM-30', 'JM-29', 'JM-28', 'JA-26'
];

const SEQ_SHIMOUSA_GO = [
  'JA-26', 'JM-26', 'JM-25', 'JM-24', 'JM-23', 'JM-22', 'JM-21', 'JM-20', 'JM-19', 'JM-18',
  'JM-17', 'JM-16', 'JM-15', 'JM-14', 'JM-13', 'JM-12', 'JM-11', 'JM-10', 'JE-11', 'JE-12',
  'JE-13', 'JE-14'
];

function buildTripStops(stationIds, startSec) {
  const stops = [];
  let curSec = startSec;

  for (let i = 0; i < stationIds.length; i++) {
    const stId = stationIds[i];
    if (i === 0) {
      stops.push({
        stationId: stId,
        arrivalTime: secToTime(curSec),
        departureTime: secToTime(curSec),
        isPassing: false,
      });
    } else {
      const prevId = stationIds[i - 1];
      const runTime = getDuration(prevId, stId);
      const arrSec = curSec + runTime;
      const depSec = (i === stationIds.length - 1) ? arrSec : arrSec + STOP_DWELL;
      stops.push({
        stationId: stId,
        arrivalTime: secToTime(arrSec),
        departureTime: secToTime(depSec),
        isPassing: false,
      });
      curSec = depSec;
    }
  }
  return stops;
}

function addTrip(tripDef, isHoliday) {
  allTrips.push(tripDef);

  const dayKey = isHoliday ? 'holiday' : 'weekday';
  const dir = tripDef.direction;

  tripDef.stops.forEach((st, idx) => {
    // 終着駅の出発時刻表はなし
    if (idx === tripDef.stops.length - 1) return;

    const depParts = st.departureTime.split(':');
    const h = parseInt(depParts[0], 10);
    const m = parseInt(depParts[1], 10);
    const sec = h * 3600 + m * 60 + parseInt(depParts[2], 10);

    const destStation = stMap.get(tripDef.destinationStationId);
    const destName = tripDef.customDestination || (destStation ? destStation.name : '');

    const depObj = {
      h,
      m,
      time: String(m).padStart(2, '0'),
      t: tripDef.trainType,
      d: destName,
      no: tripDef.trainNumber,
      sec,
    };

    if (stationTimetables[dayKey][st.stationId]) {
      stationTimetables[dayKey][st.stationId][dir].push(depObj);
    }
  });
}

function generateDayTimetable(isHoliday) {
  const dayPrefix = isHoliday ? 'HD' : 'WD';

  // 1. 東行（outbound: 府中本町 -> 西船橋・東京・海浜幕張方面）
  // 05:00 〜 24:00
  let trainSeq = 100;
  for (let hour = 5; hour <= 23; hour++) {
    // 1時間に6本（10分間隔）
    // 00分: 東京行, 10分: 海浜幕張行, 20分: 東京行, 30分: 南船橋行, 40分: 東京行, 50分: 海浜幕張行
    const slots = [
      { min: 0, dest: '東京', type: 'tokyo' },
      { min: 10, dest: '海浜幕張', type: 'makuhari' },
      { min: 20, dest: '東京', type: 'tokyo' },
      { min: 30, dest: '南船橋', type: 'minami' },
      { min: 40, dest: '東京', type: 'tokyo' },
      { min: 50, dest: '海浜幕張', type: 'makuhari' },
    ];

    slots.forEach(slot => {
      const depSec = hour * 3600 + slot.min * 60;
      let stationIds = [];
      let destStationId = '';
      let customDest = slot.dest;

      if (slot.type === 'tokyo') {
        stationIds = [...SEQ_MAINLINE, ...SEQ_TOKYO];
        destStationId = 'JE-01';
      } else if (slot.type === 'makuhari') {
        stationIds = [...SEQ_MAINLINE, ...SEQ_MAKUHARI];
        destStationId = 'JE-14';
      } else {
        stationIds = [...SEQ_MAINLINE, 'JE-11'];
        destStationId = 'JE-11';
      }

      trainSeq++;
      const trainNumber = `${hour}${String(slot.min).padStart(2, '0')}E`;
      const stops = buildTripStops(stationIds, depSec);

      addTrip({
        tripId: `${dayPrefix}_OUT_${trainNumber}`,
        lineId: 'musashino',
        trainNumber,
        trainType: 'local',
        direction: 'outbound',
        originStationId: 'JM-35',
        destinationStationId: destStationId,
        customDestination: customDest,
        cars: 8,
        isHoliday,
        stops,
      }, isHoliday);
    });
  }

  // 2. 西行（inbound: 東京・海浜幕張・西船橋 -> 府中本町方面）
  // 東京発
  for (let hour = 6; hour <= 23; hour++) {
    [15, 35, 55].forEach(min => {
      const depSec = hour * 3600 + min * 60;
      const stationIds = [...SEQ_TOKYO].reverse().concat([...SEQ_MAINLINE].reverse());
      trainSeq++;
      const trainNumber = `${hour}${String(min).padStart(2, '0')}E`;
      const stops = buildTripStops(stationIds, depSec);

      addTrip({
        tripId: `${dayPrefix}_IN_TYO_${trainNumber}`,
        lineId: 'musashino',
        trainNumber,
        trainType: 'local',
        direction: 'inbound',
        originStationId: 'JE-01',
        destinationStationId: 'JM-35',
        customDestination: '府中本町',
        cars: 8,
        isHoliday,
        stops,
      }, isHoliday);
    });
  }

  // 海浜幕張発
  for (let hour = 6; hour <= 23; hour++) {
    [5, 25, 45].forEach(min => {
      const depSec = hour * 3600 + min * 60;
      const stationIds = [...SEQ_MAKUHARI].reverse().concat([...SEQ_MAINLINE].reverse());
      trainSeq++;
      const trainNumber = `${hour}${String(min).padStart(2, '0')}M`;
      const stops = buildTripStops(stationIds, depSec);

      addTrip({
        tripId: `${dayPrefix}_IN_MAK_${trainNumber}`,
        lineId: 'musashino',
        trainNumber,
        trainType: 'local',
        direction: 'inbound',
        originStationId: 'JE-14',
        destinationStationId: 'JM-35',
        customDestination: '府中本町',
        cars: 8,
        isHoliday,
        stops,
      }, isHoliday);
    });
  }

  // 3. むさしの号（普通: regular）
  // 八王子 -> 大宮 (outbound)
  const musashinoOutTimes = ['07:18', '08:35', '17:09', '18:28'];
  musashinoOutTimes.forEach(tStr => {
    const [h, m] = tStr.split(':').map(Number);
    const depSec = h * 3600 + m * 60;
    const trainNumber = `${h}${String(m).padStart(2, '0')}M`;
    const stops = buildTripStops(SEQ_MUSASHINO_GO, depSec);

    addTrip({
      tripId: `${dayPrefix}_OUT_MUSASHINO_${trainNumber}`,
      lineId: 'musashino',
      trainNumber,
      trainType: 'regular',
      direction: 'outbound',
      originStationId: 'JC-22',
      destinationStationId: 'JA-26',
      customDestination: '大宮',
      cars: 8,
      isHoliday,
      stops,
    }, isHoliday);
  });

  // 大宮 -> 八王子 (inbound)
  const musashinoInTimes = ['08:53', '17:34', '18:48', '20:06'];
  musashinoInTimes.forEach(tStr => {
    const [h, m] = tStr.split(':').map(Number);
    const depSec = h * 3600 + m * 60;
    const trainNumber = `${h}${String(m).padStart(2, '0')}M`;
    const stationIds = [...SEQ_MUSASHINO_GO].reverse();
    const stops = buildTripStops(stationIds, depSec);

    addTrip({
      tripId: `${dayPrefix}_IN_MUSASHINO_${trainNumber}`,
      lineId: 'musashino',
      trainNumber,
      trainType: 'regular',
      direction: 'inbound',
      originStationId: 'JA-26',
      destinationStationId: 'JC-22',
      customDestination: '八王子',
      cars: 8,
      isHoliday,
      stops,
    }, isHoliday);
  });

  // 4. しもうさ号（普通: regular）
  // 大宮 -> 海浜幕張 (outbound)
  const shimousaOutTimes = ['07:44', '17:54', '19:48'];
  shimousaOutTimes.forEach(tStr => {
    const [h, m] = tStr.split(':').map(Number);
    const depSec = h * 3600 + m * 60;
    const trainNumber = `${h}${String(m).padStart(2, '0')}M`;
    const stops = buildTripStops(SEQ_SHIMOUSA_GO, depSec);

    addTrip({
      tripId: `${dayPrefix}_OUT_SHIMOUSA_${trainNumber}`,
      lineId: 'musashino',
      trainNumber,
      trainType: 'regular',
      direction: 'outbound',
      originStationId: 'JA-26',
      destinationStationId: 'JE-14',
      customDestination: '海浜幕張',
      cars: 8,
      isHoliday,
      stops,
    }, isHoliday);
  });

  // 海浜幕張 -> 大宮 (inbound)
  const shimousaInTimes = ['06:48', '09:05', '18:04'];
  shimousaInTimes.forEach(tStr => {
    const [h, m] = tStr.split(':').map(Number);
    const depSec = h * 3600 + m * 60;
    const trainNumber = `${h}${String(m).padStart(2, '0')}M`;
    const stationIds = [...SEQ_SHIMOUSA_GO].reverse();
    const stops = buildTripStops(stationIds, depSec);

    addTrip({
      tripId: `${dayPrefix}_IN_SHIMOUSA_${trainNumber}`,
      lineId: 'musashino',
      trainNumber,
      trainType: 'regular',
      direction: 'inbound',
      originStationId: 'JE-14',
      destinationStationId: 'JA-26',
      customDestination: '大宮',
      cars: 8,
      isHoliday,
      stops,
    }, isHoliday);
  });
}

console.log('Generating weekday timetable...');
generateDayTimetable(false);
console.log('Generating holiday timetable...');
generateDayTimetable(true);

// 各駅時刻表のソート
['weekday', 'holiday'].forEach(dayKey => {
  stations.forEach(s => {
    ['inbound', 'outbound'].forEach(dir => {
      stationTimetables[dayKey][s.id][dir].sort((a, b) => a.sec - b.sec);
    });
  });
});

console.log(`Generated total ${allTrips.length} trips.`);

fs.writeFileSync('src/data/lines/musashino/globalTimetable.json', JSON.stringify(allTrips, null, 2), 'utf8');
console.log('Saved src/data/lines/musashino/globalTimetable.json');

fs.writeFileSync('src/data/lines/musashino/stationTimetables.json', JSON.stringify(stationTimetables, null, 2), 'utf8');
console.log('Saved src/data/lines/musashino/stationTimetables.json');
