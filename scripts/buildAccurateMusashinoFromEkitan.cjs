// 駅探実スクレイピングデータから駅間完全チェーン結合による正確な武蔵野線時刻表・ダイヤを構築
const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/ekitan_musashino_raw_timetables.json', 'utf8'));
const stations = JSON.parse(fs.readFileSync('src/data/lines/musashino/stations.ts', 'utf8')
  .match(/export const MUSASHINO_STATIONS: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m)[1]);

const stMap = new Map(stations.map(s => [s.id, s]));

// 秒を HH:MM:SS に変換
function secToTime(sec) {
  const s = ((Math.floor(sec) % 86400) + 86400) % 86400;
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
  'JM-10_JE-09': 300, // 西船橋 - 市川塩浜 (実所要時間約5分)
  'JE-09_JE-08': 180, // 市川塩浜 - 新浦安
  'JE-08_JE-07': 180, // 新浦安 - 舞浜
  'JE-07_JE-06': 180, // 舞浜 - 葛西臨海公園
  'JE-06_JE-05': 240, // 葛西臨海公園 - 新木場
  'JE-05_JE-04': 120, // 新木場 - 潮見
  'JE-04_JE-03': 180, // 潮見 - 越中島
  'JE-03_JE-02': 180, // 越中島 - 八丁堀
  'JE-02_JE-01': 120, // 八丁堀 - 東京 (実所要時間約2分)

  // 京葉線海浜幕張方面
  'JM-10_JE-11': 360, // 西船橋 - 南船橋 (実所要時間約6分)
  'JE-11_JE-12': 180, // 南船橋 - 新習志野
  'JE-12_JE-13': 120, // 新習志野 - 幕張豊砂
  'JE-13_JE-14': 180, // 幕張豊砂 - 海浜幕張

  // 大宮支線
  'JA-26_JM-28': 780, // 大宮 - 北朝霞 (むさしの号: 13分)
  'JA-26_JM-26': 600, // 大宮 - 武蔵浦和 (しもうさ号: 10分)

  // 中央線直通（むさしの号）
  'JM-32_JC-18': 360, // 新小平 - 国立 (6分)
  'JC-18_JC-19': 180, // 国立 - 立川 (3分)
  'JC-19_JC-20': 180, // 立川 - 日野 (3分)
  'JC-20_JC-21': 180, // 日野 - 豊田 (3分)
  'JC-21_JC-22': 240, // 豊田 - 八王子 (4分)
};

function getDuration(fromId, toId) {
  const k1 = `${fromId}_${toId}`;
  if (SEGMENT_DURATIONS[k1]) return SEGMENT_DURATIONS[k1];
  const k2 = `${toId}_${fromId}`;
  if (SEGMENT_DURATIONS[k2]) return SEGMENT_DURATIONS[k2];
  return 180;
}

// 本線全駅
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

// 武蔵野線列車判定（本線・京葉線直通: E, むさしの・しもうさ: M）
function isMusashinoTrain(trainNo) {
  if (!trainNo) return false;
  const suffix = trainNo.replace(/[0-9]/g, '');
  return suffix === 'E' || suffix === 'M';
}

// 列車番号のパリティによる方向判定（奇数: 下り/outbound, 偶数: 上り/inbound）
function isOddTrain(trainNo) {
  const m = trainNo.match(/(\d+)/);
  if (!m) return false;
  return parseInt(m[1], 10) % 2 === 1;
}

// 既知発車時刻から停車駅リストを完全構築する関数
function buildChainedStops(seq, knownSecMap) {
  const seqIndices = [];
  seq.forEach((stId, idx) => {
    if (knownSecMap.has(stId)) {
      seqIndices.push({ idx, stId, sec: knownSecMap.get(stId) });
    }
  });

  if (seqIndices.length === 0) return null;

  const lastKnownSeqIdx = seqIndices[seqIndices.length - 1].idx;
  const endSeqIdx = seq.length - 1;

  // 最後の既知駅から終着駅までの時刻を実所要時間で正確に前進加算
  let curLastSec = seqIndices[seqIndices.length - 1].sec;
  for (let i = lastKnownSeqIdx; i < endSeqIdx; i++) {
    const fromId = seq[i];
    const toId = seq[i + 1];
    curLastSec += getDuration(fromId, toId);
    knownSecMap.set(toId, curLastSec);
  }

  // 最初の既知駅より前があれば後退減算
  let curFirstSec = seqIndices[0].sec;
  for (let i = seqIndices[0].idx; i > 0; i--) {
    const toId = seq[i];
    const fromId = seq[i - 1];
    curFirstSec -= getDuration(fromId, toId);
    knownSecMap.set(fromId, curFirstSec);
  }

  const stops = [];
  for (let i = 0; i < seq.length; i++) {
    const stId = seq[i];
    const isOrigin = i === 0;
    const isDest = i === seq.length - 1;

    let depSec;
    if (knownSecMap.has(stId)) {
      depSec = knownSecMap.get(stId);
    } else {
      let prevI = i - 1;
      while (prevI >= 0 && !knownSecMap.has(seq[prevI])) prevI--;
      let nextI = i + 1;
      while (nextI < seq.length && !knownSecMap.has(seq[nextI])) nextI++;

      const pSec = knownSecMap.get(seq[prevI]);
      const nSec = knownSecMap.get(seq[nextI]);
      depSec = Math.round(pSec + (nSec - pSec) * ((i - prevI) / (nextI - prevI)));
    }

    const arrSec = isOrigin ? depSec : (isDest ? depSec : depSec - 30);

    stops.push({
      stationId: stId,
      arrivalTime: secToTime(arrSec),
      departureTime: secToTime(depSec),
      isPassing: false,
    });
  }

  return stops;
}

// 1. 各駅時刻表の生成
const stationTimetables = {
  weekday: {},
  holiday: {},
};

['weekday', 'holiday'].forEach(dayKey => {
  stations.forEach(s => {
    const rawSt = raw[dayKey][s.id] || { inbound: [], outbound: [] };
    const allStTrains = [...rawSt.inbound, ...rawSt.outbound].filter(t => isMusashinoTrain(t.no));

    // 各駅の発車標：奇数は下り（outbound）、偶数は上り（inbound）
    const outList = allStTrains.filter(t => isOddTrain(t.no)).map(t => ({
      h: t.h,
      m: t.m,
      time: t.time,
      t: t.t,
      d: t.d,
      no: t.no,
      sec: t.sec,
    }));

    const inList = allStTrains.filter(t => !isOddTrain(t.no)).map(t => ({
      h: t.h,
      m: t.m,
      time: t.time,
      t: t.t,
      d: t.d,
      no: t.no,
      sec: t.sec,
    }));

    outList.sort((a, b) => a.sec - b.sec);
    inList.sort((a, b) => a.sec - b.sec);

    stationTimetables[dayKey][s.id] = {
      inbound: inList,
      outbound: outList,
    };
  });

  // 大宮駅（JA-26）の時刻表補完（むさしの号・しもうさ号実データから同期）
  const omiyaDepInbound = [];  // 八王子行（むさしの号上り：偶数）
  const omiyaDepOutbound = []; // 海浜幕張/西船橋/新習志野行（しもうさ号下り：奇数）

  const kitaAsakaIn = raw[dayKey]['JM-28']?.inbound || [];
  kitaAsakaIn.filter(t => isMusashinoTrain(t.no) && (t.d.includes('八王子') || t.rawType?.includes('むさしの'))).forEach(t => {
    const omiyaDepSec = t.sec - 780;
    const h = Math.floor(omiyaDepSec / 3600);
    const m = Math.floor((omiyaDepSec % 3600) / 60);
    omiyaDepInbound.push({
      h,
      m,
      time: String(m).padStart(2, '0'),
      t: 'regular',
      d: '八王子',
      no: t.no,
      sec: omiyaDepSec,
    });
  });

  const muOut = raw[dayKey]['JM-26']?.outbound || [];
  muOut.filter(t => isMusashinoTrain(t.no) && (t.d.includes('海浜幕張') || t.d.includes('西船橋') || t.d.includes('新習志野') || t.rawType?.includes('しもうさ'))).forEach(t => {
    const omiyaDepSec = t.sec - 600;
    const h = Math.floor(omiyaDepSec / 3600);
    const m = Math.floor((omiyaDepSec % 3600) / 60);
    omiyaDepOutbound.push({
      h,
      m,
      time: String(m).padStart(2, '0'),
      t: 'regular',
      d: t.d,
      no: t.no,
      sec: omiyaDepSec,
    });
  });

  omiyaDepInbound.sort((a, b) => a.sec - b.sec);
  omiyaDepOutbound.sort((a, b) => a.sec - b.sec);

  stationTimetables[dayKey]['JA-26'] = {
    inbound: omiyaDepInbound,
    outbound: omiyaDepOutbound,
  };
});

// 2. 実データチェーン結合による全体ダイヤ（globalTimetable.json）構築
const allTrips = [];

['weekday', 'holiday'].forEach(dayKey => {
  const isHoliday = dayKey === 'holiday';
  const prefix = isHoliday ? 'HD' : 'WD';
  const dayData = raw[dayKey];

  const outboundTrainMap = new Map();
  const inboundTrainMap = new Map();

  stations.forEach(st => {
    const allStTrains = [...(dayData[st.id]?.inbound || []), ...(dayData[st.id]?.outbound || [])];
    allStTrains.filter(t => isMusashinoTrain(t.no)).forEach(t => {
      const isOdd = isOddTrain(t.no);
      const map = isOdd ? outboundTrainMap : inboundTrainMap;

      if (!map.has(t.no)) {
        map.set(t.no, {
          trainNo: t.no,
          type: t.t,
          dest: t.d,
          stops: new Map(),
        });
      }
      map.get(t.no).stops.set(st.id, t.sec);
    });
  });

  // ==========================================
  // A. 下り列車 (outbound: 府中本町方面 -> 西船橋・東京・海浜幕張)
  // ==========================================
  for (const [trainNo, info] of outboundTrainMap.entries()) {
    // むさしの号（八王子 -> 大宮）
    if (info.dest.includes('大宮') || trainNo.includes('M')) {
      const stops = buildChainedStops(SEQ_MUSASHINO_GO, new Map(info.stops));
      if (stops) {
        allTrips.push({
          tripId: `${prefix}_OUT_MUSASHINO_${trainNo}`,
          lineId: 'musashino',
          trainNumber: trainNo,
          trainType: 'regular',
          direction: 'outbound',
          originStationId: 'JC-22',
          destinationStationId: 'JA-26',
          customDestination: '大宮',
          cars: 8,
          isHoliday,
          stops,
        });
      }
      continue;
    }

    // 通常の武蔵野線下り列車
    let seq = [...SEQ_MAINLINE];
    let destId = 'JM-10';

    if (info.dest.includes('東京')) {
      seq = [...SEQ_MAINLINE, ...SEQ_TOKYO];
      destId = 'JE-01';
    } else if (info.dest.includes('海浜幕張')) {
      seq = [...SEQ_MAINLINE, ...SEQ_MAKUHARI];
      destId = 'JE-14';
    } else if (info.dest.includes('南船橋')) {
      seq = [...SEQ_MAINLINE, 'JE-11'];
      destId = 'JE-11';
    } else if (info.dest.includes('新習志野')) {
      seq = [...SEQ_MAINLINE, 'JE-11', 'JE-12'];
      destId = 'JE-12';
    } else if (info.dest.includes('東所沢')) {
      const idx = seq.indexOf('JM-30');
      if (idx !== -1) seq = seq.slice(0, idx + 1);
      destId = 'JM-30';
    } else if (info.dest.includes('南越谷')) {
      const idx = seq.indexOf('JM-22');
      if (idx !== -1) seq = seq.slice(0, idx + 1);
      destId = 'JM-22';
    }

    // 始発駅が府中本町以外（東所沢発、西船橋発など）の場合の調整
    const knownStIds = Array.from(info.stops.keys());
    if (knownStIds.length > 0) {
      const firstKnown = knownStIds.find(id => seq.includes(id));
      if (firstKnown && firstKnown !== seq[0]) {
        const startIdx = seq.indexOf(firstKnown);
        seq = seq.slice(startIdx);
      }
    }

    const stops = buildChainedStops(seq, new Map(info.stops));
    if (stops && stops.length >= 2) {
      allTrips.push({
        tripId: `${prefix}_OUT_${trainNo}`,
        lineId: 'musashino',
        trainNumber: trainNo,
        trainType: 'local',
        direction: 'outbound',
        originStationId: seq[0],
        destinationStationId: destId,
        customDestination: info.dest,
        cars: 8,
        isHoliday,
        stops,
      });
    }
  }

  // ==========================================
  // B. 上り列車 (inbound: 西船橋・東京・海浜幕張・大宮 -> 府中本町・八王子)
  // ==========================================
  for (const [trainNo, info] of inboundTrainMap.entries()) {
    if (info.dest.includes('八王子')) {
      // むさしの号（大宮 -> 八王子）
      const seq = [...SEQ_MUSASHINO_GO].reverse();
      if (!info.stops.has('JA-26') && info.stops.has('JM-28')) {
        info.stops.set('JA-26', info.stops.get('JM-28') - 780);
      }
      const stops = buildChainedStops(seq, new Map(info.stops));
      if (stops) {
        allTrips.push({
          tripId: `${prefix}_IN_MUSASHINO_${trainNo}`,
          lineId: 'musashino',
          trainNumber: trainNo,
          trainType: 'regular',
          direction: 'inbound',
          originStationId: 'JA-26',
          destinationStationId: 'JC-22',
          customDestination: '八王子',
          cars: 8,
          isHoliday,
          stops,
        });
      }
      continue;
    } else if (info.dest.includes('大宮')) {
      // しもうさ号（海浜幕張/西船橋 -> 大宮）
      let seq = [...SEQ_SHIMOUSA_GO].reverse();
      const knownStIds = Array.from(info.stops.keys());
      const firstKnown = knownStIds.find(id => seq.includes(id));
      if (firstKnown && firstKnown !== seq[0]) {
        seq = seq.slice(seq.indexOf(firstKnown));
      }
      const stops = buildChainedStops(seq, new Map(info.stops));
      if (stops) {
        allTrips.push({
          tripId: `${prefix}_IN_SHIMOUSA_${trainNo}`,
          lineId: 'musashino',
          trainNumber: trainNo,
          trainType: 'regular',
          direction: 'inbound',
          originStationId: seq[0],
          destinationStationId: 'JA-26',
          customDestination: '大宮',
          cars: 8,
          isHoliday,
          stops,
        });
      }
      continue;
    }

    // 通常の上り列車
    let seq = [...SEQ_MAINLINE].reverse();
    let originId = 'JM-10';
    let destId = 'JM-35';

    // 始発駅の判定（東京発、海浜幕張発、新習志野発、南船橋発、西船橋発）
    if (info.stops.has('JE-01') || (info.stops.has('JE-02') && !info.stops.has('JE-11'))) {
      seq = [...SEQ_TOKYO].reverse().concat([...SEQ_MAINLINE].reverse());
      originId = 'JE-01';
    } else if (info.stops.has('JE-14')) {
      seq = [...SEQ_MAKUHARI].reverse().concat([...SEQ_MAINLINE].reverse());
      originId = 'JE-14';
    } else if (info.stops.has('JE-13')) {
      const idx = SEQ_MAKUHARI.indexOf('JE-13');
      seq = SEQ_MAKUHARI.slice(0, idx + 1).reverse().concat([...SEQ_MAINLINE].reverse());
      originId = 'JE-13';
    } else if (info.stops.has('JE-12')) {
      const idx = SEQ_MAKUHARI.indexOf('JE-12');
      seq = SEQ_MAKUHARI.slice(0, idx + 1).reverse().concat([...SEQ_MAINLINE].reverse());
      originId = 'JE-12';
    } else if (info.stops.has('JE-11')) {
      seq = ['JE-11'].concat([...SEQ_MAINLINE].reverse());
      originId = 'JE-11';
    }

    // 終着駅調整（東所沢行き、西船橋行き、吉川美南行きなど）
    if (info.dest.includes('東所沢')) {
      const idx = seq.indexOf('JM-30');
      if (idx !== -1) {
        seq = seq.slice(0, idx + 1);
        destId = 'JM-30';
      }
    } else if (info.dest.includes('西船橋')) {
      const idx = seq.indexOf('JM-10');
      if (idx !== -1) {
        seq = seq.slice(0, idx + 1);
        destId = 'JM-10';
      }
    } else if (info.dest.includes('吉川美南')) {
      const idx = seq.indexOf('JM-19');
      if (idx !== -1) {
        seq = seq.slice(0, idx + 1);
        destId = 'JM-19';
      }
    }

    const stops = buildChainedStops(seq, new Map(info.stops));
    if (stops && stops.length >= 2) {
      allTrips.push({
        tripId: `${prefix}_IN_${trainNo}`,
        lineId: 'musashino',
        trainNumber: trainNo,
        trainType: 'local',
        direction: 'inbound',
        originStationId: originId,
        destinationStationId: destId,
        customDestination: info.dest,
        cars: 8,
        isHoliday,
        stops,
      });
    }
  }
});

console.log(`Generated chained accurate timetable with ${allTrips.length} trips!`);

fs.writeFileSync('src/data/lines/musashino/stationTimetables.json', JSON.stringify(stationTimetables, null, 2), 'utf8');
console.log('Saved src/data/lines/musashino/stationTimetables.json');

fs.writeFileSync('src/data/lines/musashino/globalTimetable.json', JSON.stringify(allTrips, null, 2), 'utf8');
console.log('Saved src/data/lines/musashino/globalTimetable.json');
