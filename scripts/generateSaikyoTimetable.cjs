// JR埼京線・川越線 リアルタイム運行ダイヤ＆各駅時刻表ジェネレータ
const fs = require('fs');

const STATIONS = [
  { id: 'JA-08', number: 8, name: '大崎' },
  { id: 'JA-09', number: 9, name: '恵比寿' },
  { id: 'JA-10', number: 10, name: '渋谷' },
  { id: 'JA-11', number: 11, name: '新宿' },
  { id: 'JA-12', number: 12, name: '池袋' },
  { id: 'JA-13', number: 13, name: '板橋' },
  { id: 'JA-14', number: 14, name: '十条' },
  { id: 'JA-15', number: 15, name: '赤羽' },
  { id: 'JA-16', number: 16, name: '北赤羽' },
  { id: 'JA-17', number: 17, name: '浮間舟渡' },
  { id: 'JA-18', number: 18, name: '戸田公園' },
  { id: 'JA-19', number: 19, name: '戸田' },
  { id: 'JA-20', number: 20, name: '北戸田' },
  { id: 'JA-21', number: 21, name: '武蔵浦和' },
  { id: 'JA-22', number: 22, name: '中浦和' },
  { id: 'JA-23', number: 23, name: '南与野' },
  { id: 'JA-24', number: 24, name: '与野本町' },
  { id: 'JA-25', number: 25, name: '北与野' },
  { id: 'JA-26', number: 26, name: '大宮' },
  { id: 'JA-27', number: 27, name: '日進' },
  { id: 'JA-28', number: 28, name: '西大宮' },
  { id: 'JA-29', number: 29, name: '指扇' },
  { id: 'JA-30', number: 30, name: '南古谷' },
  { id: 'JA-31', number: 31, name: '川越' },
];

const STATION_INDEX_MAP = new Map(STATIONS.map((s, idx) => [s.id, idx]));

// 停車判定
function doesStopAt(type, stNumber) {
  // 各停は全駅停車
  if (type === 'local') return true;
  // 快速: 大崎〜赤羽各駅停車、赤羽〜武蔵浦和間は戸田公園のみ停車、武蔵浦和以北各駅停車
  if (type === 'rapid') {
    if (stNumber <= 15) return true; // 大崎〜赤羽 各駅停車
    if (stNumber === 18) return true; // 戸田公園
    if (stNumber >= 21) return true; // 武蔵浦和からの各駅
    return false; // 北赤羽(16), 浮間舟渡(17), 戸田(19), 北戸田(20)は通過
  }
  // 通勤快速: 大崎〜赤羽(8〜15)各駅、武蔵浦和(21)、大宮(26)以北各駅
  if (type === 'commuter') {
    if (stNumber <= 15) return true;
    if (stNumber === 21) return true;
    if (stNumber >= 26) return true;
    return false;
  }
  return true;
}

// 駅間基準所要時間 (秒)
const HOP_SECONDS = [
  180, // 大崎 -> 恵比寿
  120, // 恵比寿 -> 渋谷
  300, // 渋谷 -> 新宿
  300, // 新宿 -> 池袋
  180, // 池袋 -> 板橋
  120, // 板橋 -> 十条
  180, // 十条 -> 赤羽
  150, // 赤羽 -> 北赤羽
  120, // 北赤羽 -> 浮間舟渡
  180, // 浮間舟渡 -> 戸田公園
  120, // 戸田公園 -> 戸田
  120, // 戸田 -> 北戸田
  150, // 北戸田 -> 武蔵浦和
  120, // 武蔵浦和 -> 中浦和
  150, // 中浦和 -> 南与野
  120, // 南与野 -> 与野本町
  120, // 与野本町 -> 北与野
  150, // 北与野 -> 大宮
  240, // 大宮 -> 日進
  180, // 日進 -> 西大宮
  180, // 西大宮 -> 指扇
  300, // 指扇 -> 南古谷 (荒川橋梁)
  240, // 南古谷 -> 川越
];

function secondsToTimeString(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// 運行スケジュールの生成
function generateSchedule(isHoliday) {
  const trips = [];
  let trainSeq = 1000;

  // 1時間あたりのパターン定義
  for (let hour = 4; hour <= 24; hour++) {
    // 時間帯ごとの運行本数
    let outboundRuns = []; // 下り (大崎/新宿 -> 大宮/川越方面)
    let inboundRuns = [];  // 上り (川越/大宮 -> 新宿/大崎方面)

    if (hour === 4) {
      outboundRuns = [{ min: 38, type: 'local', orig: 'JA-11', dest: 'JA-26', custom: '大宮' }];
      inboundRuns = [{ min: 45, type: 'local', orig: 'JA-26', dest: 'JA-11', custom: '新宿' }];
    } else if (hour === 5) {
      outboundRuns = [
        { min: 5, type: 'local', orig: 'JA-11', dest: 'JA-31', custom: '川越' },
        { min: 25, type: 'local', orig: 'JA-08', dest: 'JA-26', custom: '大宮' },
        { min: 45, type: 'local', orig: 'JA-08', dest: 'JA-31', custom: '川越' },
      ];
      inboundRuns = [
        { min: 10, type: 'local', orig: 'JA-31', dest: 'JA-08', custom: '大崎' },
        { min: 30, type: 'local', orig: 'JA-26', dest: 'JA-08', custom: '新木場' },
        { min: 50, type: 'local', orig: 'JA-31', dest: 'JA-08', custom: '新木場' },
      ];
    } else if (hour >= 6 && hour <= 9) {
      // 朝ラッシュ
      const count = isHoliday ? 7 : 12;
      for (let i = 0; i < count; i++) {
        const m = Math.floor((60 / count) * i) + 2;
        const isCommuter = !isHoliday && (hour === 7 || hour === 8) && i % 3 === 0;
        const type = isCommuter ? 'commuter' : (isHoliday && i % 2 === 0 ? 'rapid' : 'local');
        const dest = i % 2 === 0 ? 'JA-31' : 'JA-26';
        const customDest = dest === 'JA-31' ? '川越' : (i % 4 === 1 ? '指扇' : '大宮');
        outboundRuns.push({ min: m, type, orig: 'JA-08', dest, custom: customDest });

        const inType = isCommuter ? 'commuter' : (isHoliday && i % 2 === 0 ? 'rapid' : 'local');
        const inOrig = i % 2 === 0 ? 'JA-31' : 'JA-26';
        const inCustom = i % 3 === 0 ? '新木場' : (i % 3 === 1 ? '海老名' : '大崎');
        inboundRuns.push({ min: m, type: inType, orig: inOrig, dest: 'JA-08', custom: inCustom });
      }
    } else if (hour >= 10 && hour <= 16) {
      // データイム (毎時6本: 快速3本 + 各停3本)
      const patterns = [
        { m: 5, type: 'local', dest: 'JA-26', custom: '大宮', inCustom: '新木場' },
        { m: 15, type: 'rapid', dest: 'JA-31', custom: '川越', inCustom: '新木場' },
        { m: 25, type: 'local', dest: 'JA-26', custom: '大宮', inCustom: '海老名' },
        { m: 35, type: 'rapid', dest: 'JA-31', custom: '川越', inCustom: '新木場' },
        { m: 45, type: 'local', dest: 'JA-26', custom: '大宮', inCustom: '大崎' },
        { m: 55, type: 'rapid', dest: 'JA-31', custom: '川越', inCustom: '新木場' },
      ];
      for (const p of patterns) {
        outboundRuns.push({ min: p.m, type: p.type, orig: 'JA-08', dest: p.dest, custom: p.custom });
        inboundRuns.push({
          min: p.m,
          type: p.type,
          orig: p.type === 'rapid' ? 'JA-31' : 'JA-26',
          dest: 'JA-08',
          custom: p.inCustom,
        });
      }
    } else if (hour >= 17 && hour <= 21) {
      // 夕夜ラッシュ (毎時9〜10本)
      const count = isHoliday ? 7 : 10;
      for (let i = 0; i < count; i++) {
        const m = Math.floor((60 / count) * i) + 1;
        const isCommuter = !isHoliday && (hour === 18 || hour === 19) && i % 3 === 1;
        const type = isCommuter ? 'commuter' : (i % 3 === 0 ? 'rapid' : 'local');
        const dest = i % 2 === 0 ? 'JA-31' : (i % 4 === 1 ? 'JA-26' : 'JA-21');
        const customDest = dest === 'JA-31' ? '川越' : (dest === 'JA-21' ? '武蔵浦和' : '大宮');
        outboundRuns.push({ min: m, type, orig: 'JA-08', dest, custom: customDest });

        const inOrig = i % 2 === 0 ? 'JA-31' : 'JA-26';
        const inCustom = i % 2 === 0 ? '新木場' : '海老名';
        inboundRuns.push({ min: m, type, orig: inOrig, dest: 'JA-08', custom: inCustom });
      }
    } else if (hour >= 22) {
      // 深夜帯
      const count = hour === 24 ? 3 : 5;
      for (let i = 0; i < count; i++) {
        const m = Math.floor((60 / count) * i) + 5;
        if (hour === 24 && m > 35) continue;
        const dest = hour === 24 ? (i === count - 1 ? 'JA-15' : 'JA-21') : (i % 2 === 0 ? 'JA-31' : 'JA-26');
        const customDest = dest === 'JA-15' ? '赤羽' : (dest === 'JA-21' ? '武蔵浦和' : (dest === 'JA-31' ? '川越' : '大宮'));
        outboundRuns.push({ min: m, type: 'local', orig: 'JA-11', dest, custom: customDest });

        if (hour < 24) {
          inboundRuns.push({ min: m, type: 'local', orig: 'JA-26', dest: 'JA-12', custom: '池袋' });
        }
      }
    }

    // トリップオブジェクトの生成
    // 1. 下り (Outbound)
    for (const run of outboundRuns) {
      const origIdx = STATION_INDEX_MAP.get(run.orig);
      const destIdx = STATION_INDEX_MAP.get(run.dest);
      if (origIdx === undefined || destIdx === undefined || origIdx >= destIdx) continue;

      let curSec = hour * 3600 + run.min * 60;
      const stops = [];

      for (let idx = origIdx; idx <= destIdx; idx++) {
        const st = STATIONS[idx];
        const stopsAtSt = doesStopAt(run.type, st.number);

        if (idx === origIdx) {
          const tStr = secondsToTimeString(curSec);
          stops.push({ stationId: st.id, arrivalTime: tStr, departureTime: tStr, isPassing: false });
        } else {
          const hopSec = HOP_SECONDS[idx - 1];
          const actualHop = stopsAtSt ? hopSec : Math.round(hopSec * 0.75);
          curSec += actualHop;

          const arrStr = secondsToTimeString(curSec);
          if (idx === destIdx) {
            stops.push({ stationId: st.id, arrivalTime: arrStr, departureTime: arrStr, isPassing: false });
          } else if (stopsAtSt) {
            const dwellSec = (st.id === 'JA-11' || st.id === 'JA-12' || st.id === 'JA-15' || st.id === 'JA-21') ? 60 : 35;
            curSec += dwellSec;
            const depStr = secondsToTimeString(curSec);
            stops.push({ stationId: st.id, arrivalTime: arrStr, departureTime: depStr, isPassing: false });
          } else {
            stops.push({ stationId: st.id, arrivalTime: arrStr, departureTime: arrStr, isPassing: true });
          }
        }
      }

      trainSeq++;
      const letter = run.type === 'commuter' ? 'S' : (run.type === 'rapid' ? 'F' : 'K');
      const trainNo = `${trainSeq}${letter}`;
      const prefix = isHoliday ? 'HD' : 'WD';
      const tripId = `${prefix}_OUT_${run.orig}_${hour.toString().padStart(2, '0')}${run.min.toString().padStart(2, '0')}_${trainNo}`;

      trips.push({
        tripId,
        lineId: 'saikyo',
        trainNumber: trainNo,
        trainType: run.type,
        direction: 'outbound',
        originStationId: run.orig,
        destinationStationId: run.dest,
        customDestination: run.custom,
        cars: 10,
        isHoliday,
        stops,
      });
    }

    // 2. 上り (Inbound)
    for (const run of inboundRuns) {
      const origIdx = STATION_INDEX_MAP.get(run.orig);
      const destIdx = STATION_INDEX_MAP.get(run.dest);
      if (origIdx === undefined || destIdx === undefined || origIdx <= destIdx) continue;

      let curSec = hour * 3600 + run.min * 60;
      const stops = [];

      for (let idx = origIdx; idx >= destIdx; idx--) {
        const st = STATIONS[idx];
        const stopsAtSt = doesStopAt(run.type, st.number);

        if (idx === origIdx) {
          const tStr = secondsToTimeString(curSec);
          stops.push({ stationId: st.id, arrivalTime: tStr, departureTime: tStr, isPassing: false });
        } else {
          const hopSec = HOP_SECONDS[idx];
          const actualHop = stopsAtSt ? hopSec : Math.round(hopSec * 0.75);
          curSec += actualHop;

          const arrStr = secondsToTimeString(curSec);
          if (idx === destIdx) {
            stops.push({ stationId: st.id, arrivalTime: arrStr, departureTime: arrStr, isPassing: false });
          } else if (stopsAtSt) {
            const dwellSec = (st.id === 'JA-11' || st.id === 'JA-12' || st.id === 'JA-15' || st.id === 'JA-21') ? 60 : 35;
            curSec += dwellSec;
            const depStr = secondsToTimeString(curSec);
            stops.push({ stationId: st.id, arrivalTime: arrStr, departureTime: depStr, isPassing: false });
          } else {
            stops.push({ stationId: st.id, arrivalTime: arrStr, departureTime: arrStr, isPassing: true });
          }
        }
      }

      trainSeq++;
      const letter = run.type === 'commuter' ? 'S' : (run.type === 'rapid' ? 'F' : 'K');
      const trainNo = `${trainSeq}${letter}`;
      const prefix = isHoliday ? 'HD' : 'WD';
      const tripId = `${prefix}_INB_${run.orig}_${hour.toString().padStart(2, '0')}${run.min.toString().padStart(2, '0')}_${trainNo}`;

      trips.push({
        tripId,
        lineId: 'saikyo',
        trainNumber: trainNo,
        trainType: run.type,
        direction: 'inbound',
        originStationId: run.orig,
        destinationStationId: run.dest,
        customDestination: run.custom,
        cars: 10,
        isHoliday,
        stops,
      });
    }
  }

  return trips;
}

const weekdayTrips = generateSchedule(false);
const holidayTrips = generateSchedule(true);
const allTrips = [...weekdayTrips, ...holidayTrips];

console.log(`Generated ${weekdayTrips.length} weekday trips, ${holidayTrips.length} holiday trips.`);
fs.writeFileSync('src/data/lines/saikyo/globalTimetable.json', JSON.stringify(allTrips), 'utf8');

// 各駅時刻表の生成
const stationTimetables = {
  weekday: {},
  holiday: {},
};

for (const st of STATIONS) {
  stationTimetables.weekday[st.id] = { inbound: [], outbound: [] };
  stationTimetables.holiday[st.id] = { inbound: [], outbound: [] };
}

for (const trip of allTrips) {
  const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
  for (const stop of trip.stops) {
    if (stop.isPassing) continue;
    const [hStr, mStr] = stop.departureTime.split(':');
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    const sec = h * 3600 + m * 60;

    const list = stationTimetables[dayKey][stop.stationId];
    if (!list) continue;

    const entry = {
      h,
      m,
      time: mStr,
      t: trip.trainType,
      d: trip.customDestination || '大宮',
      no: trip.trainNumber || '',
      sec,
    };

    if (trip.direction === 'inbound') {
      list.inbound.push(entry);
    } else {
      list.outbound.push(entry);
    }
  }
}

// 時刻順ソート
for (const day of ['weekday', 'holiday']) {
  for (const stId of Object.keys(stationTimetables[day])) {
    stationTimetables[day][stId].inbound.sort((a, b) => a.sec - b.sec);
    stationTimetables[day][stId].outbound.sort((a, b) => a.sec - b.sec);
  }
}

fs.writeFileSync('src/data/lines/saikyo/stationTimetables.json', JSON.stringify(stationTimetables), 'utf8');
console.log('Saved stationTimetables.json and globalTimetable.json for Saikyo Line.');
