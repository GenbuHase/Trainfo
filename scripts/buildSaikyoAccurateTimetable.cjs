// 駅探実スクレイピングデータからSaikyo線の各駅時刻表とglobalTimetableを生成
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ekitan_saikyo_raw_timetables.json'), 'utf8'));

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

const ST_BY_ID = new Map(STATIONS.map(s => [s.id, s]));
const ST_BY_NUM = new Map(STATIONS.map(s => [s.number, s]));
const NAME_TO_ST = new Map(STATIONS.map(s => [s.name, s]));

// 下り隣接駅間秒数
const DOWN_SECTION_SECS = {
  8: 255,  9: 145, 10: 342, 11: 372, 12: 158, 13: 151, 14: 200,
  15: 126, 16: 127, 17: 195, 18: 120, 19: 123, 20: 225, 21: 120,
  22: 135, 23: 131, 24: 109, 25: 304, 26: 252, 27: 305, 28: 162,
  29: 396, 30: 300,
};

// 上り隣接駅間秒数
const UP_SECTION_SECS = {
  31: 307, 30: 300, 29: 218, 28: 226, 27: 362, 26: 169, 25: 108,
  24: 137, 23: 127, 22: 208, 21: 159, 20: 119, 19: 168, 18: 153,
  17: 123, 16: 178, 15: 152, 14: 150, 13: 241, 12: 383, 11: 281,
  10: 147,  9: 255,
};

function getTerminalStation(dest, direction) {
  if (direction === 'outbound') {
    if (['川越', '八王子', '拝島', '高麗川'].some(d => dest.includes(d))) return ST_BY_ID.get('JA-31');
    if (dest.includes('南古谷')) return ST_BY_ID.get('JA-30');
    if (dest.includes('指扇')) return ST_BY_ID.get('JA-29');
    if (dest.includes('西大宮')) return ST_BY_ID.get('JA-28');
    if (dest.includes('大宮')) return ST_BY_ID.get('JA-26');
    if (dest.includes('北与野')) return ST_BY_ID.get('JA-25');
    if (dest.includes('武蔵浦和')) return ST_BY_ID.get('JA-21');
    if (dest.includes('赤羽')) return ST_BY_ID.get('JA-15');
    if (dest.includes('池袋')) return ST_BY_ID.get('JA-12');
    if (dest.includes('新宿')) return ST_BY_ID.get('JA-11');
  } else {
    if (['大崎', '新木場', '海老名', '羽沢横浜国大'].some(d => dest.includes(d))) return ST_BY_ID.get('JA-08');
    if (dest.includes('恵比寿')) return ST_BY_ID.get('JA-09');
    if (dest.includes('渋谷')) return ST_BY_ID.get('JA-10');
    if (dest.includes('新宿')) return ST_BY_ID.get('JA-11');
    if (dest.includes('池袋')) return ST_BY_ID.get('JA-12');
    if (dest.includes('赤羽')) return ST_BY_ID.get('JA-15');
    if (dest.includes('武蔵浦和')) return ST_BY_ID.get('JA-21');
    if (dest.includes('大宮')) return ST_BY_ID.get('JA-26');
    if (dest.includes('指扇')) return ST_BY_ID.get('JA-29');
    if (dest.includes('南古谷')) return ST_BY_ID.get('JA-30');
  }
  return NAME_TO_ST.get(dest);
}

function secondsToTimeString(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// 1. 各駅時刻表（stationTimetables.json）の作成
const stationTimetables = {
  weekday: {},
  holiday: {},
};

for (const dayKey of ['weekday', 'holiday']) {
  stationTimetables[dayKey] = {};
  for (const st of STATIONS) {
    const rawSt = raw[dayKey][st.id] || { inbound: [], outbound: [] };
    stationTimetables[dayKey][st.id] = {
      inbound: rawSt.inbound.map(t => ({
        h: t.h,
        m: t.m,
        time: t.time,
        t: t.t,
        d: t.d,
        no: `${t.no}レ`,
        sec: t.sec,
      })),
      outbound: rawSt.outbound.map(t => ({
        h: t.h,
        m: t.m,
        time: t.time,
        t: t.t,
        d: t.d,
        no: `${t.no}レ`,
        sec: t.sec,
      })),
    };
  }
}

// 2. 運行シミュレーション用トリップ（globalTimetable.json）の構築
const allTrips = [];

for (const dayKey of ['weekday', 'holiday']) {
  const isHoliday = dayKey === 'holiday';
  const dayData = raw[dayKey];

  // (A) 下り (outbound: 大崎方面 -> 川越方面)
  const outboundTrainMap = new Map();
  for (const st of STATIONS) {
    const list = dayData[st.id]?.outbound || [];
    list.forEach(item => {
      if (!outboundTrainMap.has(item.no)) {
        outboundTrainMap.set(item.no, {
          trainNo: `${item.no}レ`,
          type: item.t,
          dest: item.d,
          stops: new Map(), // stationId -> depSec
        });
      }
      outboundTrainMap.get(item.no).stops.set(st.id, item.sec);
    });
  }

  // 各下り列車をトリップ化
  for (const [trainNoKey, info] of outboundTrainMap.entries()) {
    const stopPairs = [];
    info.stops.forEach((depSec, stId) => {
      const st = ST_BY_ID.get(stId);
      if (st) stopPairs.push({ stId, depSec, num: st.number });
    });
    stopPairs.sort((a, b) => a.depSec - b.depSec);

    if (stopPairs.length === 0) continue;

    const firstStop = stopPairs[0];
    const lastStop = stopPairs[stopPairs.length - 1];

    const startNum = firstStop.num;
    let endNum = lastStop.num;

    const terminalSt = getTerminalStation(info.dest, 'outbound');
    if (terminalSt && terminalSt.number > endNum) {
      endNum = terminalSt.number;
    }

    if (startNum >= endNum) continue; // 下り方向でないものはスキップ

    const stops = [];
    const knownSecMap = new Map();
    stopPairs.forEach(sp => knownSecMap.set(sp.num, sp.depSec));

    // 既知の最後の駅から endNum まで所要時間を加算して knownSecMap を補完
    let currentLastKnownNum = lastStop.num;
    let currentLastSec = lastStop.depSec;
    for (let num = currentLastKnownNum + 1; num <= endNum; num++) {
      const stepSec = DOWN_SECTION_SECS[num - 1] || 150;
      currentLastSec += stepSec;
      knownSecMap.set(num, currentLastSec);
    }

    // 区間内の各駅の発着時刻を計算
    for (let num = startNum; num <= endNum; num++) {
      const st = ST_BY_NUM.get(num);
      const isOrigin = num === startNum;
      const isDest = num === endNum;
      const isStop = knownSecMap.has(num);

      let depSec, arrSec;
      if (isStop) {
        depSec = knownSecMap.get(num);
        arrSec = isOrigin ? depSec : (isDest ? depSec : depSec - 30); // 終着駅は到着時刻
      } else {
        // 通過駅: 前後の既知駅から線形補間
        let prevNum = num - 1;
        while (prevNum >= startNum && !knownSecMap.has(prevNum)) prevNum--;
        let nextNum = num + 1;
        while (nextNum <= endNum && !knownSecMap.has(nextNum)) nextNum++;

        const prevSec = knownSecMap.get(prevNum);
        const nextSec = knownSecMap.get(nextNum);
        const ratio = (num - prevNum) / (nextNum - prevNum);
        depSec = Math.round(prevSec + (nextSec - prevSec) * ratio);
        arrSec = depSec;
      }

      stops.push({
        stationId: st.id,
        arrivalTime: secondsToTimeString(arrSec),
        departureTime: secondsToTimeString(depSec),
        isPassing: !isStop && !isOrigin && !isDest,
      });
    }

    const tripDestSt = ST_BY_NUM.get(endNum);
    const tripId = `${isHoliday ? 'HD' : 'WD'}_OUT_${firstStop.stId}_${secondsToTimeString(firstStop.depSec).replace(/:/g, '').slice(0, 4)}_${info.trainNo}`;
    allTrips.push({
      tripId,
      trainNumber: info.trainNo,
      trainType: info.type,
      direction: 'outbound',
      originStationId: firstStop.stId,
      destinationStationId: tripDestSt.id,
      customDestination: info.dest,
      cars: 10,
      isHoliday,
      stops,
      lineId: 'saikyo',
    });
  }

  // (B) 上り (inbound: 川越方面 -> 大崎方面)
  const inboundTrainMap = new Map();
  for (const st of STATIONS) {
    const list = dayData[st.id]?.inbound || [];
    list.forEach(item => {
      if (!inboundTrainMap.has(item.no)) {
        inboundTrainMap.set(item.no, {
          trainNo: `${item.no}レ`,
          type: item.t,
          dest: item.d,
          stops: new Map(),
        });
      }
      inboundTrainMap.get(item.no).stops.set(st.id, item.sec);
    });
  }

  // 各上り列車をトリップ化
  for (const [trainNoKey, info] of inboundTrainMap.entries()) {
    const stopPairs = [];
    info.stops.forEach((depSec, stId) => {
      const st = ST_BY_ID.get(stId);
      if (st) stopPairs.push({ stId, depSec, num: st.number });
    });
    stopPairs.sort((a, b) => a.depSec - b.depSec);

    if (stopPairs.length === 0) continue;

    const firstStop = stopPairs[0];
    const lastStop = stopPairs[stopPairs.length - 1];

    const startNum = firstStop.num;
    let endNum = lastStop.num;

    const terminalSt = getTerminalStation(info.dest, 'inbound');
    if (terminalSt && terminalSt.number < endNum) {
      endNum = terminalSt.number;
    }

    if (startNum <= endNum) continue; // 上り方向でないものはスキップ

    const stops = [];
    const knownSecMap = new Map();
    stopPairs.forEach(sp => knownSecMap.set(sp.num, sp.depSec));

    // 既知の最後の駅から endNum まで所要時間を加算して knownSecMap を補完
    let currentLastKnownNum = lastStop.num;
    let currentLastSec = lastStop.depSec;
    for (let num = currentLastKnownNum - 1; num >= endNum; num--) {
      const stepSec = UP_SECTION_SECS[num + 1] || 150;
      currentLastSec += stepSec;
      knownSecMap.set(num, currentLastSec);
    }

    // 各駅の発着時刻を計算 (startNum から endNum まで減少)
    for (let num = startNum; num >= endNum; num--) {
      const st = ST_BY_NUM.get(num);
      const isOrigin = num === startNum;
      const isDest = num === endNum;
      const isStop = knownSecMap.has(num);

      let depSec, arrSec;
      if (isStop) {
        depSec = knownSecMap.get(num);
        arrSec = isOrigin ? depSec : (isDest ? depSec : depSec - 30); // 終着駅は到着時刻
      } else {
        let prevNum = num + 1;
        while (prevNum <= startNum && !knownSecMap.has(prevNum)) prevNum++;
        let nextNum = num - 1;
        while (nextNum >= endNum && !knownSecMap.has(nextNum)) nextNum--;

        const prevSec = knownSecMap.get(prevNum);
        const nextSec = knownSecMap.get(nextNum);
        const ratio = (prevNum - num) / (prevNum - nextNum);
        depSec = Math.round(prevSec + (nextSec - prevSec) * ratio);
        arrSec = depSec;
      }

      stops.push({
        stationId: st.id,
        arrivalTime: secondsToTimeString(arrSec),
        departureTime: secondsToTimeString(depSec),
        isPassing: !isStop && !isOrigin && !isDest,
      });
    }

    const tripDestSt = ST_BY_NUM.get(endNum);
    const tripId = `${isHoliday ? 'HD' : 'WD'}_IN_${firstStop.stId}_${secondsToTimeString(firstStop.depSec).replace(/:/g, '').slice(0, 4)}_${info.trainNo}`;
    allTrips.push({
      tripId,
      trainNumber: info.trainNo,
      trainType: info.type,
      direction: 'inbound',
      originStationId: firstStop.stId,
      destinationStationId: tripDestSt.id,
      customDestination: info.dest,
      cars: 10,
      isHoliday,
      stops,
      lineId: 'saikyo',
    });
  }
}

console.log(`Generated ${allTrips.length} real trips from Ekitan scraping!`);
const weekdayTrips = allTrips.filter(t => !t.isHoliday);
const holidayTrips = allTrips.filter(t => t.isHoliday);
console.log(`  Weekday trips: ${weekdayTrips.length} (Outbound: ${weekdayTrips.filter(t => t.direction === 'outbound').length}, Inbound: ${weekdayTrips.filter(t => t.direction === 'inbound').length})`);
console.log(`  Holiday trips: ${holidayTrips.length} (Outbound: ${holidayTrips.filter(t => t.direction === 'outbound').length}, Inbound: ${holidayTrips.filter(t => t.direction === 'inbound').length})`);

// 保存
fs.writeFileSync(path.resolve(__dirname, '../src/data/lines/saikyo/stationTimetables.json'), JSON.stringify(stationTimetables), 'utf8');
console.log('Saved src/data/lines/saikyo/stationTimetables.json');

fs.writeFileSync(path.resolve(__dirname, '../src/data/lines/saikyo/globalTimetable.json'), JSON.stringify(allTrips), 'utf8');
console.log('Saved src/data/lines/saikyo/globalTimetable.json');
