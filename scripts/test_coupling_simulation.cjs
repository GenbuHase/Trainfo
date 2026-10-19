// ts-node または esbuild-register で trainSimulation.ts を直接テスト
const fs = require('fs');

// trainSimulation.ts の resolveActiveTrainInfo のロジックを抽出して検証
function simulateResolveActiveTrainInfo(trip, currentStationId, nextStationId) {
  let resolvedNumber = trip.trainNumber;
  let resolvedType = trip.trainType;
  let resolvedCustomDest = trip.customDestination;
  let isCoupledActive = false;
  let totalCars = trip.cars;

  if (trip.coupling && currentStationId) {
    const fromIdx = trip.stops.findIndex((s) => s.stationId === trip.coupling.fromStationId);
    const toIdx = trip.stops.findIndex((s) => s.stationId === trip.coupling.toStationId);
    const curIdx = trip.stops.findIndex((s) => s.stationId === currentStationId);

    if (fromIdx !== -1 && toIdx !== -1 && curIdx !== -1) {
      const minIdx = Math.min(fromIdx, toIdx);
      const maxIdx = Math.max(fromIdx, toIdx);

      let inCoupledRange = false;
      if (nextStationId) {
        const nextIdx = trip.stops.findIndex((s) => s.stationId === nextStationId);
        if (nextIdx !== -1) {
          inCoupledRange = curIdx >= minIdx && nextIdx <= maxIdx;
        } else {
          inCoupledRange = curIdx >= minIdx && curIdx < maxIdx;
        }
      } else {
        inCoupledRange = curIdx >= minIdx && curIdx < maxIdx;
      }

      if (inCoupledRange) {
        isCoupledActive = true;
        totalCars = trip.cars + (trip.coupling.coupledCars || 0);
        if (resolvedNumber && trip.coupling.coupledTrainNumber) {
          if (!resolvedNumber.includes(trip.coupling.coupledTrainNumber)) {
            resolvedNumber = `${resolvedNumber} + ${trip.coupling.coupledTrainNumber}`;
          }
        }
        if (trip.coupling.coupledDestination && resolvedCustomDest) {
          if (!resolvedCustomDest.includes(trip.coupling.coupledDestination)) {
            resolvedCustomDest =
              trip.coupling.role === 'SECONDARY'
                ? `${trip.coupling.coupledDestination}・${resolvedCustomDest}`
                : `${resolvedCustomDest}・${trip.coupling.coupledDestination}`;
          }
        }
      } else {
        if (trip.coupling.coupledDestination && resolvedCustomDest) {
          const parts = resolvedCustomDest.split(/[・/]/).map((p) => p.trim());
          if (parts.length > 1 && parts.includes(trip.coupling.coupledDestination)) {
            const filtered = parts.filter((p) => p !== trip.coupling.coupledDestination);
            if (filtered.length > 0) {
              resolvedCustomDest = filtered.join('・');
            }
          }
        }
        if (trip.coupling.coupledTrainNumber && resolvedNumber) {
          const parts = resolvedNumber.split('+').map((p) => p.trim());
          if (parts.length > 1 && parts.includes(trip.coupling.coupledTrainNumber)) {
            const filtered = parts.filter((p) => p !== trip.coupling.coupledTrainNumber);
            if (filtered.length > 0) {
              resolvedNumber = filtered.join(' + ');
            }
          }
        }
      }
    }
  }

  return {
    trainNumber: resolvedNumber,
    trainType: resolvedType,
    customDestination: resolvedCustomDest,
    cars: isCoupledActive ? totalCars : trip.cars,
    isCoupledActive
  };
}

console.log("=== 併結特急の駅ごとの表示シミュレーション検証 ===");

// 1. 東武日光線（浅草6:30発 リバティけごん1号 & リバティ会津101号）
const tobuNikkoTt = JSON.parse(fs.readFileSync('src/data/lines/tobu_nikko/globalTimetable.json', 'utf8'));
const libertyKegon = tobuNikkoTt.find(t => t.tripId.includes('25128') && !t.isHoliday);
if (libertyKegon) {
  console.log(`\n【東武特急 リバティけごん1号 (東武日光行) 下り】(解結駅: 下今市 TN-23)`);
  console.log(`tripId: ${libertyKegon.tripId}, coupling:`, libertyKegon.coupling);
  
  // いくつかの駅での表示を確認
  const testStations = [
    { cur: 'TSK-01', next: 'TSK-03', name: '浅草 (併結区間)' },
    { cur: 'TSK-12', next: 'TSK-13', name: '北千住 (併結区間)' },
    { cur: 'TSK-30', next: 'TN-01', name: '東武動物公園 (併結区間)' },
    { cur: 'TN-18', next: 'TN-23', name: '新鹿沼 (併結区間走行中)' },
    { cur: 'TN-23', next: 'TN-24', name: '下今市 (解結駅発車)' },
    { cur: 'TN-24', next: 'TN-25', name: '上今市 (解結後)' },
    { cur: 'TN-25', next: null, name: '東武日光 (終点)' }
  ];

  testStations.forEach(st => {
    const res = simulateResolveActiveTrainInfo(libertyKegon, st.cur, st.next);
    console.log(`  駅: ${st.name} [cur=${st.cur}, next=${st.next}] -> 列車名/番号: "${res.trainNumber}", 行先: "${res.customDestination}", 両数: ${res.cars}両, 併結中: ${res.isCoupledActive}`);
  });
}

// 2. 東北新幹線（やまびこ + つばさ）
const tohokuTt = JSON.parse(fs.readFileSync('src/data/lines/tohoku_shinkansen/globalTimetable.json', 'utf8'));
const yamabiko = tohokuTt.find(t => t.coupling && t.coupling.role === 'PRIMARY' && t.direction === 'outbound' && !t.isHoliday);
if (yamabiko) {
  console.log(`\n【東北新幹線 やまびこ (仙台行) + つばさ (山形行) 下り】(解結駅: 福島 TS-09)`);
  console.log(`tripId: ${yamabiko.tripId}, coupling:`, yamabiko.coupling);
  const testStations = [
    { cur: 'TS-01', next: 'TS-02', name: '東京 (併結中)' },
    { cur: 'TS-03', next: 'TS-05', name: '大宮 (併結中)' },
    { cur: 'TS-08', next: 'TS-09', name: '郡山 (併結中)' },
    { cur: 'TS-09', next: 'TS-10', name: '福島 (解結駅発車)' },
    { cur: 'TS-10', next: 'TS-11', name: '白石蔵王 (解結後単独)' },
    { cur: 'TS-12', next: null, name: '仙台 (終点)' }
  ];
  testStations.forEach(st => {
    const res = simulateResolveActiveTrainInfo(yamabiko, st.cur, st.next);
    console.log(`  駅: ${st.name} [cur=${st.cur}, next=${st.next}] -> 列車番号: "${res.trainNumber}", 行先: "${res.customDestination}", 両数: ${res.cars}両, 併結中: ${res.isCoupledActive}`);
  });
}

// 3. 中央本線（かいじ + 富士回遊）
const chuoTt = JSON.parse(fs.readFileSync('src/data/lines/chuo_main/globalTimetable.json', 'utf8'));
const kaiji = chuoTt.find(t => t.coupling && t.coupling.role === 'PRIMARY' && t.direction === 'outbound' && !t.isHoliday);
if (kaiji) {
  console.log(`\n【中央本線 かいじ (甲府行) + 富士回遊 (河口湖行) 下り】(解結駅: 大月 JC-32)`);
  console.log(`tripId: ${kaiji.tripId}, coupling:`, kaiji.coupling);
  const testStations = [
    { cur: 'JC-05', next: 'JC-06', name: '新宿 (併結中)' },
    { cur: 'JC-12', next: 'JC-13', name: '立川 (併結中)' },
    { cur: 'JC-24', next: 'JC-25', name: '八王子 (併結中)' },
    { cur: 'JC-32', next: 'JC-33', name: '大月 (解結駅発車)' },
    { cur: 'JC-33', next: 'JC-34', name: '猿橋 (解結後単独)' },
    { cur: 'JC-38', next: null, name: '甲府 (終点)' }
  ];
  testStations.forEach(st => {
    const res = simulateResolveActiveTrainInfo(kaiji, st.cur, st.next);
    console.log(`  駅: ${st.name} [cur=${st.cur}, next=${st.next}] -> 列車番号: "${res.trainNumber}", 行先: "${res.customDestination}", 両数: ${res.cars}両, 併結中: ${res.isCoupledActive}`);
  });
}

// 4. 東海道線（踊り子 下田行 + 修善寺行）
const tokaidoTt = JSON.parse(fs.readFileSync('src/data/lines/tokaido/globalTimetable.json', 'utf8'));
const odoriko = tokaidoTt.find(t => t.coupling && t.coupling.role === 'PRIMARY' && t.direction === 'outbound' && !t.isHoliday);
if (odoriko) {
  console.log(`\n【東海道線 踊り子 (伊豆急下田行) + 踊り子 (修善寺行) 下り】(解結駅: 熱海 JT-21)`);
  console.log(`tripId: ${odoriko.tripId}, coupling:`, odoriko.coupling);
  const testStations = [
    { cur: 'JT-01', next: 'JT-02', name: '東京 (併結中)' },
    { cur: 'JT-05', next: 'JT-06', name: '横浜 (併結中)' },
    { cur: 'JT-14', next: 'JT-15', name: '国府津 (併結中)' },
    { cur: 'JT-21', next: 'JT-22', name: '熱海 (解結駅発車)' },
    { cur: 'JT-22', next: 'JT-23', name: '来宮 (解結後単独)' }
  ];
  testStations.forEach(st => {
    const res = simulateResolveActiveTrainInfo(odoriko, st.cur, st.next);
    console.log(`  駅: ${st.name} [cur=${st.cur}, next=${st.next}] -> 列車番号: "${res.trainNumber}", 行先: "${res.customDestination}", 両数: ${res.cars}両, 併結中: ${res.isCoupledActive}`);
  });
}
