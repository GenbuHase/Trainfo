// S-TRAIN 12便の全路線（メトロ有楽町線・副都心線、西武有楽町線、西武池袋線）貫通トリップ生成・統合スクリプト
const fs = require('fs');
const path = require('path');

// 秒数・時刻ヘルパー
function toSec(hhmm) {
  if (!hhmm) return null;
  const s = String(hhmm).padStart(4, '0');
  const h = parseInt(s.slice(0, 2), 10);
  const m = parseInt(s.slice(2, 4), 10);
  return h * 3600 + m * 60;
}

function secToStr(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// 通過駅補間ヘルパー
function interpolateStops(stationList, startStationId, endStationId, knownTimes) {
  // start から end までの駅順リストを抽出
  const startIdx = stationList.findIndex(s => s.id === startStationId);
  const endIdx = stationList.findIndex(s => s.id === endStationId);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`Station not found: ${startStationId} or ${endStationId}`);
  }

  const step = startIdx <= endIdx ? 1 : -1;
  const pathStations = [];
  for (let i = startIdx; i !== endIdx + step; i += step) {
    pathStations.push(stationList[i]);
  }

  // 各駅の既知時刻（arrSec, depSec, isStop）
  const stopsData = pathStations.map(st => {
    const k = knownTimes[st.id];
    return {
      station: st,
      arrSec: k?.arr != null ? k.arr : null,
      depSec: k?.dep != null ? k.dep : null,
      isStop: k?.isStop ?? false,
    };
  });

  // 始端と終端の時刻が揃っているか確認
  if (stopsData[0].depSec == null) stopsData[0].depSec = stopsData[0].arrSec;
  if (stopsData[0].arrSec == null) stopsData[0].arrSec = stopsData[0].depSec;
  const last = stopsData[stopsData.length - 1];
  if (last.arrSec == null) last.arrSec = last.depSec;
  if (last.depSec == null) last.depSec = last.arrSec;

  // 区間ごとに線形補間
  let lastKnownIdx = 0;
  for (let i = 1; i < stopsData.length; i++) {
    if (stopsData[i].arrSec != null || stopsData[i].depSec != null) {
      const fromIdx = lastKnownIdx;
      const toIdx = i;
      const fromDep = stopsData[fromIdx].depSec ?? stopsData[fromIdx].arrSec;
      const toArr = stopsData[toIdx].arrSec ?? stopsData[toIdx].depSec;
      const count = toIdx - fromIdx;
      const delta = (toArr - fromDep) / count;

      for (let j = fromIdx + 1; j < toIdx; j++) {
        const est = Math.round(fromDep + delta * (j - fromIdx));
        stopsData[j].arrSec = est;
        stopsData[j].depSec = est;
      }
      if (stopsData[toIdx].arrSec == null) stopsData[toIdx].arrSec = stopsData[toIdx].depSec;
      if (stopsData[toIdx].depSec == null) stopsData[toIdx].depSec = stopsData[toIdx].arrSec;
      lastKnownIdx = toIdx;
    }
  }

  return stopsData.map(d => ({
    stationId: d.station.id,
    arrivalTime: secToStr(d.arrSec),
    departureTime: secToStr(d.depSec),
    isPassing: !d.isStop,
  }));
}

function main() {
  console.log('=== S-TRAIN 12便 全線貫通トリップ合成・リンク開始 ===\n');

  // 駅メタデータ読み込み
  const yStations = require('../src/data/lines/yurakucho/stations').YURAKUCHO_STATIONS;
  const fStations = require('../src/data/lines/fukutoshin/stations').FUKUTOSHIN_STATIONS;
  const syStations = require('../src/data/lines/seibu_yurakucho/stations').SEIBU_YURAKUCHO_STATIONS;
  const siStations = require('../src/data/lines/seibu_ikebukuro/stations').SEIBU_IKEBUKURO_STATIONS;

  // ダイヤ読み込み
  const yPath = path.resolve(__dirname, '../src/data/lines/yurakucho/globalTimetable.json');
  const fPath = path.resolve(__dirname, '../src/data/lines/fukutoshin/globalTimetable.json');
  const syPath = path.resolve(__dirname, '../src/data/lines/seibu_yurakucho/globalTimetable.json');
  const siPath = path.resolve(__dirname, '../src/data/lines/seibu_ikebukuro/globalTimetable.json');

  let yTrips = JSON.parse(fs.readFileSync(yPath, 'utf8'));
  let fTrips = JSON.parse(fs.readFileSync(fPath, 'utf8'));
  let syTrips = JSON.parse(fs.readFileSync(syPath, 'utf8'));
  let siTrips = JSON.parse(fs.readFileSync(siPath, 'utf8'));

  // S-TRAIN の全12列車番号
  const strainNums = new Set(['77814', '77815', '77816', '77817', '77818', '144439', '144440', '172007', '105731', '105730', '144626', '172006']);

  // 既存の strain トリップおよび同一列車番号トリップを除外（上書きクリーン更新）
  const isStrainTrip = t => t.trainType === 'strain' || (t.trainNumber && strainNums.has(t.trainNumber));
  yTrips = yTrips.filter(t => !isStrainTrip(t));
  fTrips = fTrips.filter(t => !isStrainTrip(t));
  syTrips = syTrips.filter(t => !isStrainTrip(t));
  siTrips = siTrips.filter(t => !isStrainTrip(t));

  // ============================================================
  // 1. 平日下り S-TRAIN 101, 103, 105, 107, 109号 (豊洲 -> 小手指)
  // ============================================================
  const weekdayDownStrains = [
    { num: '77814', name: '101号', toyosuDep: '1729', yuraArr: '1735', yuraDep: '1736', iidaArr: '1745', iidaDep: '1746', kotakeArr: '1802', kotakeDep: '1802', nerimaArr: '1807', nerimaDep: '1808', shakuArr: '1812', shakuDep: '1813', hoyaArr: '1816', hoyaDep: '1817', tokoArr: '1828', tokoDep: '1829', nishiArr: '1832', nishiDep: '1833', koteArr: '1835' },
    { num: '77815', name: '103号', toyosuDep: '1829', yuraArr: '1835', yuraDep: '1836', iidaArr: '1845', iidaDep: '1846', kotakeArr: '1902', kotakeDep: '1902', nerimaArr: '1907', nerimaDep: '1908', shakuArr: '1912', shakuDep: '1912', hoyaArr: '1916', hoyaDep: '1917', tokoArr: '1928', tokoDep: '1929', nishiArr: '1932', nishiDep: '1933', koteArr: '1935' },
    { num: '77816', name: '105号', toyosuDep: '1929', yuraArr: '1935', yuraDep: '1936', iidaArr: '1944', iidaDep: '1946', kotakeArr: '2001', kotakeDep: '2001', nerimaArr: '2006', nerimaDep: '2007', shakuArr: '2012', shakuDep: '2012', hoyaArr: '2016', hoyaDep: '2017', tokoArr: '2028', tokoDep: '2029', nishiArr: '2032', nishiDep: '2033', koteArr: '2035' },
    { num: '77817', name: '107号', toyosuDep: '2030', yuraArr: '2036', yuraDep: '2037', iidaArr: '2045', iidaDep: '2047', kotakeArr: '2101', kotakeDep: '2101', nerimaArr: '2106', nerimaDep: '2107', shakuArr: '2112', shakuDep: '2112', hoyaArr: '2116', hoyaDep: '2117', tokoArr: '2128', tokoDep: '2129', nishiArr: '2132', nishiDep: '2132', koteArr: '2135' },
    { num: '77818', name: '109号', toyosuDep: '2130', yuraArr: '2136', yuraDep: '2137', iidaArr: '2145', iidaDep: '2147', kotakeArr: '2158', kotakeDep: '2158', nerimaArr: '2209', nerimaDep: '2210', shakuArr: '2214', shakuDep: '2214', hoyaArr: '2218', hoyaDep: '2219', tokoArr: '2228', tokoDep: '2228', nishiArr: '2231', nishiDep: '2232', koteArr: '2235' },
  ];

  for (const s of weekdayDownStrains) {
    const yTripId = `WD_INB_Y-22_${s.toyosuDep}_${s.num}`;
    const syTripId = `WD_OUT_SI-37_${s.kotakeDep}_${s.num}`;
    const siTripId = `WD_OUT_SI-06_${s.nerimaDep}_${s.num}`;

    // 1. 有楽町線: 豊洲(Y-22) -> 小竹向原(Y-06)
    const yStops = interpolateStops(yStations, 'Y-22', 'Y-06', {
      'Y-22': { dep: toSec(s.toyosuDep), isStop: true },
      'Y-18': { arr: toSec(s.yuraArr), dep: toSec(s.yuraDep), isStop: true },
      'Y-13': { arr: toSec(s.iidaArr), dep: toSec(s.iidaDep), isStop: true },
      'Y-06': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
    });
    yTrips.push({
      tripId: yTripId,
      lineId: 'yurakucho',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'inbound',
      originStationId: 'Y-22',
      destinationStationId: 'Y-06',
      customDestination: '小手指',
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: false,
      stops: yStops,
    });

    // 2. 西武有楽町線: 小竹向原(SI-37) -> 練馬(SI-06)
    const syStops = interpolateStops(syStations, 'SI-37', 'SI-06', {
      'SI-37': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: true },
    });
    syTrips.push({
      tripId: syTripId,
      lineId: 'seibu_yurakucho',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'outbound',
      originStationId: 'SI-37',
      destinationStationId: 'SI-06',
      customDestination: '小手指',
      throughTripId: siTripId,
      throughLineId: 'seibu_ikebukuro',
      cars: 10,
      isHoliday: false,
      stops: syStops,
    });

    // 3. 西武池袋線: 練馬(SI-06) -> 小手指(SI-19)
    const siStops = interpolateStops(siStations, 'SI-06', 'SI-19', {
      'SI-06': { dep: toSec(s.nerimaDep), isStop: true },
      'SI-10': { arr: toSec(s.shakuArr), dep: toSec(s.shakuDep), isStop: true },
      'SI-12': { arr: toSec(s.hoyaArr), dep: toSec(s.hoyaDep), isStop: true },
      'SI-17': { arr: toSec(s.tokoArr), dep: toSec(s.tokoDep), isStop: true },
      'SI-18': { arr: toSec(s.nishiArr), dep: toSec(s.nishiDep), isStop: true },
      'SI-19': { arr: toSec(s.koteArr), isStop: true },
    });
    siTrips.push({
      tripId: siTripId,
      lineId: 'seibu_ikebukuro',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'outbound',
      originStationId: 'SI-06',
      destinationStationId: 'SI-19',
      customDestination: '小手指',
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: false,
      stops: siStops,
    });

    console.log(`  Added 平日下り S-TRAIN ${s.name} (${s.num}): Y -> SY -> SI`);
  }

  // ============================================================
  // 2. 平日上り S-TRAIN 102, 104号 (所沢 -> 豊洲)
  // ============================================================
  const weekdayUpStrains = [
    { num: '144439', name: '102号', tokoDep: '0623', hoyaArr: '0634', hoyaDep: '0635', shakuArr: '0639', shakuDep: '0641', nerimaArr: '0646', nerimaDep: '0646', kotakeArr: '0651', kotakeDep: '0651', iidaArr: '0707', iidaDep: '0708', yuraArr: '0717', yuraDep: '0718', toyosuArr: '0724' },
    { num: '144440', name: '104号', tokoDep: '0839', hoyaArr: '0850', hoyaDep: '0851', shakuArr: '0855', shakuDep: '0857', nerimaArr: '0903', nerimaDep: '0903', kotakeArr: '0909', kotakeDep: '0909', iidaArr: '0925', iidaDep: '0927', yuraArr: '0937', yuraDep: '0939', toyosuArr: '0947' },
  ];

  for (const s of weekdayUpStrains) {
    const siTripId = `WD_INB_SI-17_${s.tokoDep}_${s.num}`;
    const syTripId = `WD_INB_SI-06_${s.nerimaDep}_${s.num}`;
    const yTripId = `WD_OUT_Y-06_${s.kotakeDep}_${s.num}`;

    // 1. 西武池袋線: 所沢(SI-17) -> 練馬(SI-06)
    const siStops = interpolateStops(siStations, 'SI-17', 'SI-06', {
      'SI-17': { dep: toSec(s.tokoDep), isStop: true },
      'SI-12': { arr: toSec(s.hoyaArr), dep: toSec(s.hoyaDep), isStop: true },
      'SI-10': { arr: toSec(s.shakuArr), dep: toSec(s.shakuDep), isStop: true },
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: false },
    });
    siTrips.push({
      tripId: siTripId,
      lineId: 'seibu_ikebukuro',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'inbound',
      originStationId: 'SI-17',
      destinationStationId: 'SI-06',
      customDestination: '豊洲',
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: false,
      stops: siStops,
    });

    // 2. 西武有楽町線: 練馬(SI-06) -> 小竹向原(SI-37)
    const syStops = interpolateStops(syStations, 'SI-06', 'SI-37', {
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: false },
      'SI-37': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
    });
    syTrips.push({
      tripId: syTripId,
      lineId: 'seibu_yurakucho',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'inbound',
      originStationId: 'SI-06',
      destinationStationId: 'SI-37',
      customDestination: '豊洲',
      throughTripId: yTripId,
      throughLineId: 'yurakucho',
      cars: 10,
      isHoliday: false,
      stops: syStops,
    });

    // 3. 有楽町線: 小竹向原(Y-06) -> 豊洲(Y-22)
    const yStops = interpolateStops(yStations, 'Y-06', 'Y-22', {
      'Y-06': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
      'Y-13': { arr: toSec(s.iidaArr), dep: toSec(s.iidaDep), isStop: true },
      'Y-18': { arr: toSec(s.yuraArr), dep: toSec(s.yuraDep), isStop: true },
      'Y-22': { arr: toSec(s.toyosuArr), isStop: true },
    });
    yTrips.push({
      tripId: yTripId,
      lineId: 'yurakucho',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'outbound',
      originStationId: 'Y-06',
      destinationStationId: 'Y-22',
      customDestination: '豊洲',
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: false,
      stops: yStops,
    });

    console.log(`  Added 平日上り S-TRAIN ${s.name} (${s.num}): SI -> SY -> Y`);
  }

  // ============================================================
  // 3. 土休日下り S-TRAIN 1, 3, 5号 (元町・中華街 -> 西武秩父/飯能/所沢)
  // ============================================================
  const holidayDownStrains = [
    { num: '172007', name: '1号', shibuyaArr: '0826', shibuyaDep: '0827', shinArr: '0832', shinDep: '0833', ikeArr: '0839', ikeDep: '0841', kotakeArr: '0846', kotakeDep: '0846', nerimaArr: '0850', nerimaDep: '0850', shakuArr: '0854', shakuDep: '0854', tokoArr: '0906', tokoDep: '0907', irumaArr: '0917', irumaDep: '0918', hannoArr: '0925', hannoDep: '0928', chichibuArr: '1003', destId: 'SI-36', destName: '西武秩父' },
    { num: '105731', name: '3号', shibuyaArr: '1731', shibuyaDep: '1732', shinArr: '1737', shinDep: '1738', ikeArr: '1744', ikeDep: '1746', kotakeArr: '1751', kotakeDep: '1751', nerimaArr: '1756', nerimaDep: '1756', shakuArr: '1801', shakuDep: '1801', tokoArr: '1813', tokoDep: '1814', irumaArr: '1825', irumaDep: '1826', hannoArr: '1833', destId: 'SI-26', destName: '飯能' },
    { num: '105730', name: '5号', shibuyaArr: '2030', shibuyaDep: '2031', shinArr: '2036', shinDep: '2037', ikeArr: '2043', ikeDep: '2044', kotakeArr: '2049', kotakeDep: '2049', nerimaArr: '2053', nerimaDep: '2053', shakuArr: '2057', shakuDep: '2057', tokoArr: '2109', destId: 'SI-17', destName: '所沢' },
  ];

  for (const s of holidayDownStrains) {
    const fTripId = `HD_INB_F-16_${s.shibuyaDep}_${s.num}`;
    const syTripId = `HD_OUT_SI-37_${s.kotakeDep}_${s.num}`;
    const siTripId = `HD_OUT_SI-06_${s.nerimaDep}_${s.num}`;

    // 1. 副都心線: 渋谷(F-16) -> 小竹向原(F-06)
    const fStops = interpolateStops(fStations, 'F-16', 'F-06', {
      'F-16': { arr: toSec(s.shibuyaArr), dep: toSec(s.shibuyaDep), isStop: true },
      'F-13': { arr: toSec(s.shinArr), dep: toSec(s.shinDep), isStop: true },
      'F-09': { arr: toSec(s.ikeArr), dep: toSec(s.ikeDep), isStop: true },
      'F-06': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
    });
    fTrips.push({
      tripId: fTripId,
      lineId: 'fukutoshin',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'inbound',
      originStationId: 'F-16',
      destinationStationId: 'F-06',
      customDestination: s.destName,
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: true,
      stops: fStops,
    });

    // 2. 西武有楽町線: 小竹向原(SI-37) -> 練馬(SI-06)
    const syStops = interpolateStops(syStations, 'SI-37', 'SI-06', {
      'SI-37': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: false },
    });
    syTrips.push({
      tripId: syTripId,
      lineId: 'seibu_yurakucho',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'outbound',
      originStationId: 'SI-37',
      destinationStationId: 'SI-06',
      customDestination: s.destName,
      throughTripId: siTripId,
      throughLineId: 'seibu_ikebukuro',
      cars: 10,
      isHoliday: true,
      stops: syStops,
    });

    // 3. 西武池袋線: 練馬(SI-06) -> 終着駅
    const siKnown = {
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: false },
      'SI-10': { arr: toSec(s.shakuArr), dep: toSec(s.shakuDep), isStop: true },
      'SI-17': { arr: toSec(s.tokoArr), dep: s.tokoDep ? toSec(s.tokoDep) : null, isStop: true },
    };
    if (s.irumaArr) siKnown['SI-23'] = { arr: toSec(s.irumaArr), dep: toSec(s.irumaDep), isStop: true };
    if (s.hannoArr) siKnown['SI-26'] = { arr: toSec(s.hannoArr), dep: s.hannoDep ? toSec(s.hannoDep) : null, isStop: true };
    if (s.chichibuArr) siKnown['SI-36'] = { arr: toSec(s.chichibuArr), isStop: true };

    const siStops = interpolateStops(siStations, 'SI-06', s.destId, siKnown);
    siTrips.push({
      tripId: siTripId,
      lineId: 'seibu_ikebukuro',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'outbound',
      originStationId: 'SI-06',
      destinationStationId: s.destId,
      customDestination: s.destName,
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: true,
      stops: siStops,
    });

    console.log(`  Added 土休日下り S-TRAIN ${s.name} (${s.num}): F -> SY -> SI`);
  }

  // ============================================================
  // 4. 土休日上り S-TRAIN 2, 4号 (飯能/西武秩父 -> 元町・中華街)
  // ============================================================
  const holidayUpStrains = [
    { num: '144626', name: '2号', origId: 'SI-26', origName: '飯能', hannoDep: '0920', irumaArr: '0926', irumaDep: '0927', tokoArr: '0937', tokoDep: '0938', shakuArr: '0949', shakuDep: '0950', nerimaArr: '0954', nerimaDep: '0954', kotakeArr: '0958', kotakeDep: '0958', ikeArr: '1002', ikeDep: '1003', shinArr: '1009', shinDep: '1010', shibuyaArr: '1015', shibuyaDep: '1018' },
    { num: '172006', name: '4号', origId: 'SI-36', origName: '西武秩父', chichibuDep: '1707', hannoArr: '1745', hannoDep: '1750', irumaArr: '1757', irumaDep: '1758', tokoArr: '1811', tokoDep: '1812', shakuArr: '1826', shakuDep: '1827', nerimaArr: '1832', nerimaDep: '1832', kotakeArr: '1837', kotakeDep: '1837', ikeArr: '1842', ikeDep: '1844', shinArr: '1850', shinDep: '1851', shibuyaArr: '1856', shibuyaDep: '1859' },
  ];

  for (const s of holidayUpStrains) {
    const siDep = s.chichibuDep || s.hannoDep;
    const siTripId = `HD_INB_${s.origId}_${siDep}_${s.num}`;
    const syTripId = `HD_INB_SI-06_${s.nerimaDep}_${s.num}`;
    const fTripId = `HD_OUT_F-06_${s.kotakeDep}_${s.num}`;

    // 1. 西武池袋線: 始発駅 -> 練馬(SI-06)
    const siKnown = {
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: false },
      'SI-10': { arr: toSec(s.shakuArr), dep: toSec(s.shakuDep), isStop: true },
      'SI-17': { arr: toSec(s.tokoArr), dep: toSec(s.tokoDep), isStop: true },
      'SI-23': { arr: toSec(s.irumaArr), dep: toSec(s.irumaDep), isStop: true },
      'SI-26': { arr: toSec(s.hannoArr), dep: toSec(s.hannoDep), isStop: true },
    };
    if (s.chichibuDep) siKnown['SI-36'] = { dep: toSec(s.chichibuDep), isStop: true };

    const siStops = interpolateStops(siStations, s.origId, 'SI-06', siKnown);
    siTrips.push({
      tripId: siTripId,
      lineId: 'seibu_ikebukuro',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'inbound',
      originStationId: s.origId,
      destinationStationId: 'SI-06',
      customDestination: '元町・中華街',
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: true,
      stops: siStops,
    });

    // 2. 西武有楽町線: 練馬(SI-06) -> 小竹向原(SI-37)
    const syStops = interpolateStops(syStations, 'SI-06', 'SI-37', {
      'SI-06': { arr: toSec(s.nerimaArr), dep: toSec(s.nerimaDep), isStop: false },
      'SI-37': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
    });
    syTrips.push({
      tripId: syTripId,
      lineId: 'seibu_yurakucho',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'inbound',
      originStationId: 'SI-06',
      destinationStationId: 'SI-37',
      customDestination: '元町・中華街',
      throughTripId: fTripId,
      throughLineId: 'fukutoshin',
      cars: 10,
      isHoliday: true,
      stops: syStops,
    });

    // 3. 副都心線: 小竹向原(F-06) -> 渋谷(F-16)
    const fStops = interpolateStops(fStations, 'F-06', 'F-16', {
      'F-06': { arr: toSec(s.kotakeArr), dep: toSec(s.kotakeDep), isStop: false },
      'F-09': { arr: toSec(s.ikeArr), dep: toSec(s.ikeDep), isStop: true },
      'F-13': { arr: toSec(s.shinArr), dep: toSec(s.shinDep), isStop: true },
      'F-16': { arr: toSec(s.shibuyaArr), dep: toSec(s.shibuyaDep), isStop: true },
    });
    fTrips.push({
      tripId: fTripId,
      lineId: 'fukutoshin',
      trainNumber: s.num,
      trainType: 'strain',
      direction: 'outbound',
      originStationId: 'F-06',
      destinationStationId: 'F-16',
      customDestination: '元町・中華街',
      throughTripId: syTripId,
      throughLineId: 'seibu_yurakucho',
      cars: 10,
      isHoliday: true,
      stops: fStops,
    });

    console.log(`  Added 土休日上り S-TRAIN ${s.name} (${s.num}): SI -> SY -> F`);
  }

  // 保存
  fs.writeFileSync(yPath, JSON.stringify(yTrips, null, 2), 'utf8');
  fs.writeFileSync(fPath, JSON.stringify(fTrips, null, 2), 'utf8');
  fs.writeFileSync(syPath, JSON.stringify(syTrips, null, 2), 'utf8');
  fs.writeFileSync(siPath, JSON.stringify(siTrips, null, 2), 'utf8');

  console.log('\n✨ 全4路線の globalTimetable.json に S-TRAIN 12便を完全注入・相互リンクしました！');
}

main();
