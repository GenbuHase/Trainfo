// つくばエクスプレス（TX）の駅探スクレイピングデータから globalTimetable.json を生成
const fs = require('fs');
const path = require('path');

const raw = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ekitan_tx_raw_timetables.json'), 'utf8'));

const STATIONS = [
  { id: 'TX-01', number: 1, name: '秋葉原' },
  { id: 'TX-02', number: 2, name: '新御徒町' },
  { id: 'TX-03', number: 3, name: '浅草' },
  { id: 'TX-04', number: 4, name: '南千住' },
  { id: 'TX-05', number: 5, name: '北千住' },
  { id: 'TX-06', number: 6, name: '青井' },
  { id: 'TX-07', number: 7, name: '六町' },
  { id: 'TX-08', number: 8, name: '八潮' },
  { id: 'TX-09', number: 9, name: '三郷中央' },
  { id: 'TX-10', number: 10, name: '南流山' },
  { id: 'TX-11', number: 11, name: '流山セントラルパーク' },
  { id: 'TX-12', number: 12, name: '流山おおたかの森' },
  { id: 'TX-13', number: 13, name: '柏の葉キャンパス' },
  { id: 'TX-14', number: 14, name: '柏たなか' },
  { id: 'TX-15', number: 15, name: '守谷' },
  { id: 'TX-16', number: 16, name: 'みらい平' },
  { id: 'TX-17', number: 17, name: 'みどりの' },
  { id: 'TX-18', number: 18, name: '万博記念公園' },
  { id: 'TX-19', number: 19, name: '研究学園' },
  { id: 'TX-20', number: 20, name: 'つくば' },
];

const ST_BY_ID = new Map(STATIONS.map(s => [s.id, s]));
const ST_BY_NUM = new Map(STATIONS.map(s => [s.number, s]));
const NAME_TO_ST = new Map(STATIONS.map(s => [s.name, s]));

// 駅間標準秒数（普通列車ベース）
const SECTION_SECS = {
  1: 120, // 秋葉原 -> 新御徒町
  2: 120, // 新御徒町 -> 浅草
  3: 180, // 浅草 -> 南千住
  4: 180, // 南千住 -> 北千住
  5: 180, // 北千住 -> 青井
  6: 120, // 青井 -> 六町
  7: 240, // 六町 -> 八潮
  8: 180, // 八潮 -> 三郷中央
  9: 180, // 三郷中央 -> 南流山
  10: 180, // 南流山 -> 流山セントラルパーク
  11: 120, // 流山セントラルパーク -> 流山おおたかの森
  12: 180, // 流山おおたかの森 -> 柏の葉キャンパス
  13: 180, // 柏の葉キャンパス -> 柏たなか
  14: 240, // 柏たなか -> 守谷
  15: 300, // 守谷 -> みらい平
  16: 180, // みらい平 -> みどりの
  17: 180, // みどりの -> 万博記念公園
  18: 180, // 万博記念公園 -> 研究学園
  19: 180, // 研究学園 -> つくば
};

function secondsToTimeString(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getTerminalStation(dest, direction) {
  if (direction === 'outbound') {
    if (dest.includes('つくば')) return ST_BY_ID.get('TX-20');
    if (dest.includes('守谷')) return ST_BY_ID.get('TX-15');
    if (dest.includes('八潮')) return ST_BY_ID.get('TX-08');
  } else {
    if (dest.includes('秋葉原')) return ST_BY_ID.get('TX-01');
    if (dest.includes('北千住')) return ST_BY_ID.get('TX-05');
    if (dest.includes('八潮')) return ST_BY_ID.get('TX-08');
    if (dest.includes('守谷')) return ST_BY_ID.get('TX-15');
  }
  return NAME_TO_ST.get(dest);
}

const allTrips = [];

for (const dayKey of ['weekday', 'holiday']) {
  const isHoliday = dayKey === 'holiday';
  const dayData = raw[dayKey];

  // ==========================================
  // (A) 下り (outbound: 秋葉原 -> つくば方面)
  // ==========================================
  const outboundTrainMap = new Map();

  for (const st of STATIONS) {
    const list = dayData[st.id]?.outbound || [];
    list.forEach(item => {
      // 深夜0時〜4時台の列車は日付跨ぎ（+86400秒）
      let adjustedSec = item.sec;
      if (item.h < 4) {
        adjustedSec += 86400;
      }

      if (!outboundTrainMap.has(item.no)) {
        outboundTrainMap.set(item.no, {
          trainNo: item.no,
          type: item.t,
          dest: item.d,
          stops: new Map(), // stationId -> depSec
        });
      }
      outboundTrainMap.get(item.no).stops.set(st.id, adjustedSec);
    });
  }

  // 下り各列車をトリップ化
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

    if (startNum >= endNum) continue;

    const knownSecMap = new Map();
    stopPairs.forEach(sp => knownSecMap.set(sp.num, sp.depSec));

    // 終着駅まで足りない既知時刻を駅間標準秒数で補完
    let currentLastNum = lastStop.num;
    let currentLastSec = lastStop.depSec;
    for (let num = currentLastNum + 1; num <= endNum; num++) {
      const stepSec = SECTION_SECS[num - 1] || 180;
      currentLastSec += stepSec;
      knownSecMap.set(num, currentLastSec);
    }

    // startNum から endNum までの全駅ストップを生成
    const stops = [];
    for (let num = startNum; num <= endNum; num++) {
      const st = ST_BY_NUM.get(num);
      const isOrigin = num === startNum;
      const isDest = num === endNum;
      const isStop = knownSecMap.has(num);

      let depSec, arrSec;
      if (isStop) {
        depSec = knownSecMap.get(num);
        arrSec = isOrigin ? depSec : (isDest ? depSec : depSec - 25);
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
      lineId: 'tsukuba_express',
      trainNumber: info.trainNo,
      trainType: info.type,
      direction: 'outbound',
      originStationId: firstStop.stId,
      destinationStationId: tripDestSt.id,
      customDestination: info.dest !== tripDestSt.name ? info.dest : undefined,
      cars: 6,
      isHoliday,
      stops,
    });
  }

  // ==========================================
  // (B) 上り (inbound: つくば方面 -> 秋葉原)
  // ==========================================
  const inboundTrainMap = new Map();

  for (const st of STATIONS) {
    const list = dayData[st.id]?.inbound || [];
    list.forEach(item => {
      let adjustedSec = item.sec;
      if (item.h < 4) {
        adjustedSec += 86400;
      }

      if (!inboundTrainMap.has(item.no)) {
        inboundTrainMap.set(item.no, {
          trainNo: item.no,
          type: item.t,
          dest: item.d,
          stops: new Map(),
        });
      }
      inboundTrainMap.get(item.no).stops.set(st.id, adjustedSec);
    });
  }

  // 上り各列車をトリップ化
  for (const [trainNoKey, info] of inboundTrainMap.entries()) {
    const stopPairs = [];
    info.stops.forEach((depSec, stId) => {
      const st = ST_BY_ID.get(stId);
      if (st) stopPairs.push({ stId, depSec, num: st.number });
    });
    // 上りは北から南（駅番号が大きい方から小さい方へ）
    stopPairs.sort((a, b) => b.num - a.num);

    if (stopPairs.length === 0) continue;

    const firstStop = stopPairs[0];
    const lastStop = stopPairs[stopPairs.length - 1];

    const startNum = firstStop.num;
    let endNum = lastStop.num;

    const terminalSt = getTerminalStation(info.dest, 'inbound');
    if (terminalSt && terminalSt.number < endNum) {
      endNum = terminalSt.number;
    }

    if (startNum <= endNum) continue;

    const knownSecMap = new Map();
    stopPairs.forEach(sp => knownSecMap.set(sp.num, sp.depSec));

    // 終着駅まで足りない既知時刻を補完
    let currentLastNum = lastStop.num;
    let currentLastSec = lastStop.depSec;
    for (let num = currentLastNum - 1; num >= endNum; num--) {
      const stepSec = SECTION_SECS[num] || 180;
      currentLastSec += stepSec;
      knownSecMap.set(num, currentLastSec);
    }

    // startNum から endNum までの全駅ストップを生成
    const stops = [];
    for (let num = startNum; num >= endNum; num--) {
      const st = ST_BY_NUM.get(num);
      const isOrigin = num === startNum;
      const isDest = num === endNum;
      const isStop = knownSecMap.has(num);

      let depSec, arrSec;
      if (isStop) {
        depSec = knownSecMap.get(num);
        arrSec = isOrigin ? depSec : (isDest ? depSec : depSec - 25);
      } else {
        // 通過駅: 前後の既知駅から線形補間
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
      lineId: 'tsukuba_express',
      trainNumber: info.trainNo,
      trainType: info.type,
      direction: 'inbound',
      originStationId: firstStop.stId,
      destinationStationId: tripDestSt.id,
      customDestination: info.dest !== tripDestSt.name ? info.dest : undefined,
      cars: 6,
      isHoliday,
      stops,
    });
  }
}

// 出発時刻順にソート
allTrips.sort((a, b) => {
  if (a.isHoliday !== b.isHoliday) return a.isHoliday ? 1 : -1;
  return a.stops[0].departureTime.localeCompare(b.stops[0].departureTime);
});

console.log(`Generated ${allTrips.length} Tsukuba Express trips in total.`);
const wdTrips = allTrips.filter(t => !t.isHoliday);
const hdTrips = allTrips.filter(t => t.isHoliday);
console.log(`  Weekday trips: ${wdTrips.length} (Outbound: ${wdTrips.filter(t => t.direction === 'outbound').length}, Inbound: ${wdTrips.filter(t => t.direction === 'inbound').length})`);
console.log(`  Holiday trips: ${hdTrips.length} (Outbound: ${hdTrips.filter(t => t.direction === 'outbound').length}, Inbound: ${hdTrips.filter(t => t.direction === 'inbound').length})`);

// 保存
const outPath = path.resolve(__dirname, '../src/data/lines/tsukuba_express/globalTimetable.json');
fs.writeFileSync(outPath, JSON.stringify(allTrips, null, 2), 'utf8');
console.log(`Saved global timetable to ${outPath}`);
