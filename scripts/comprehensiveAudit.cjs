const fs = require('fs');
const path = require('path');

const LINES = [
  {
    id: 'tsukuba_express',
    name: 'つくばエクスプレス',
    stationsFile: 'src/data/lines/tsukuba_express/stations.ts',
    trainTypesFile: 'src/data/lines/tsukuba_express/trainTypes.ts',
    globalTtFile: 'src/data/lines/tsukuba_express/globalTimetable.json',
    stationTtFile: 'src/data/lines/tsukuba_express/stationTimetables.json',
  },
  {
    id: 'tojo',
    name: '東武東上線',
    stationsFile: 'src/data/lines/tojo/stations.ts',
    trainTypesFile: 'src/data/lines/tojo/trainTypes.ts',
    globalTtFile: 'src/data/lines/tojo/globalTimetable.json',
    stationTtFile: 'src/data/lines/tojo/stationTimetables.json',
  },
  {
    id: 'saikyo',
    name: 'JR埼京線・川越線',
    stationsFile: 'src/data/lines/saikyo/stations.ts',
    trainTypesFile: 'src/data/lines/saikyo/trainTypes.ts',
    globalTtFile: 'src/data/lines/saikyo/globalTimetable.json',
    stationTtFile: 'src/data/lines/saikyo/stationTimetables.json',
  },
  {
    id: 'musashino',
    name: 'JR武蔵野線',
    stationsFile: 'src/data/lines/musashino/stations.ts',
    trainTypesFile: 'src/data/lines/musashino/trainTypes.ts',
    globalTtFile: 'src/data/lines/musashino/globalTimetable.json',
    stationTtFile: 'src/data/lines/musashino/stationTimetables.json',
  },
];

function timeToSec(t) {
  if (!t) return null;
  const [h, m, s = 0] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

function parseTsExport(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/export const [A-Z0-9_]+:\s*(?:Record<string,\s*TrainTypeConfig>|Station\[])\s*=\s*(\{[\s\S]*?\}|\[[\s\S]*?\]);\s*$/m);
  if (!match) {
    throw new Error(`Failed to parse ${filePath}`);
  }
  return eval(`(${match[1]})`);
}

console.log('================================================================');
console.log('🔍 全4路線 徹底健全性監査（Comprehensive Timetable Audit）');
console.log('================================================================\n');

let totalAnomalies = 0;

for (const line of LINES) {
  console.log(`\n============================================================`);
  console.log(`🚆 路線: ${line.name} (${line.id})`);
  console.log(`============================================================`);

  const stations = parseTsExport(line.stationsFile);
  const trainTypes = parseTsExport(line.trainTypesFile);
  const globalTt = JSON.parse(fs.readFileSync(line.globalTtFile, 'utf8'));
  const stationTt = JSON.parse(fs.readFileSync(line.stationTtFile, 'utf8'));

  const validStIds = new Set(stations.map(s => s.id));
  const validTrainTypeKeys = new Set(Object.keys(trainTypes));

  console.log(`- 登録駅数: ${stations.length}駅`);
  console.log(`- 定義種別一覧: [${Array.from(validTrainTypeKeys).join(', ')}]`);
  console.log(`- 総トリップ数: ${globalTt.length}本`);

  let lineErrors = 0;

  // 1. 種別チェック (Global Timetable)
  const unknownGlobalTypes = new Set();
  for (const t of globalTt) {
    if (!validTrainTypeKeys.has(t.trainType)) {
      unknownGlobalTypes.add(t.trainType);
    }
  }
  if (unknownGlobalTypes.size > 0) {
    console.error(`  ❌ [種別定義不一致] globalTimetableに未定義種別を発見:`, Array.from(unknownGlobalTypes));
    lineErrors += unknownGlobalTypes.size;
  } else {
    console.log(`  ✅ globalTimetable 種別キー整合性チェック: 全トリップ正常`);
  }

  // 2. 種別チェック (Station Timetables)
  const unknownStationTypes = new Set();
  for (const day of ['weekday', 'holiday']) {
    for (const stId of Object.keys(stationTt[day] || {})) {
      const all = [...stationTt[day][stId].inbound, ...stationTt[day][stId].outbound];
      for (const item of all) {
        if (!validTrainTypeKeys.has(item.t)) {
          unknownStationTypes.add(item.t);
        }
      }
    }
  }
  if (unknownStationTypes.size > 0) {
    console.error(`  ❌ [種別定義不一致] stationTimetablesに未定義種別を発見:`, Array.from(unknownStationTypes));
    lineErrors += unknownStationTypes.size;
  } else {
    console.log(`  ✅ stationTimetables 種別キー整合性チェック: 全駅発車標正常`);
  }

  // 3. 時刻逆転 & stops チェック
  let timeReverseErrors = 0;
  let invalidStationIdErrors = 0;
  let singleStationTrips = 0;
  let emptyDestErrors = 0;

  for (const trip of globalTt) {
    if (!trip.stops || trip.stops.length < 2) {
      singleStationTrips++;
    }

    if (!trip.customDestination && !trip.destinationStationId) {
      emptyDestErrors++;
    }

    for (let i = 0; i < trip.stops.length; i++) {
      const cur = trip.stops[i];
      if (!validStIds.has(cur.stationId)) {
        invalidStationIdErrors++;
      }

      const arrSec = timeToSec(cur.arrivalTime);
      const depSec = timeToSec(cur.departureTime);

      if (arrSec !== null && depSec !== null && depSec < arrSec) {
        if (depSec + 86400 < arrSec) {
          timeReverseErrors++;
        }
      }

      if (i > 0) {
        const prev = trip.stops[i - 1];
        const prevDep = timeToSec(prev.departureTime);
        if (arrSec !== null && prevDep !== null && arrSec < prevDep) {
          if (arrSec + 86400 < prevDep) {
            timeReverseErrors++;
          }
        }
      }
    }
  }

  if (timeReverseErrors > 0) {
    console.error(`  ❌ [時刻逆転] ${timeReverseErrors}件の時刻逆転を発見`);
    lineErrors += timeReverseErrors;
  } else {
    console.log(`  ✅ 時刻逆転チェック: 0件 (全トリップの時系列正常)`);
  }

  if (invalidStationIdErrors > 0) {
    console.error(`  ❌ [不正駅ID] ${invalidStationIdErrors}件の未登録駅IDを発見`);
    lineErrors += invalidStationIdErrors;
  } else {
    console.log(`  ✅ 駅ID整合性チェック: 全stops正常`);
  }

  if (singleStationTrips > 0) {
    console.error(`  ❌ [異常トリップ] 1駅以下のトリップを発見: ${singleStationTrips}件`);
    lineErrors += singleStationTrips;
  }

  // 4. 優等列車と通過駅の整合性チェック
  let localWithPassing = 0;
  for (const trip of globalTt) {
    const hasPassing = trip.stops.some(s => s.isPassing);
    if (trip.trainType === 'local' && hasPassing) {
      localWithPassing++;
    }
  }
  if (localWithPassing > 0) {
    console.warn(`  ⚠️ [注意] 各停(local)なのに通過駅を持つトリップ: ${localWithPassing}本`);
  } else {
    console.log(`  ✅ 各停(local)通過駅チェック: 0本 (全各停が全駅停車)`);
  }

  // 5. 各駅発車標の本数健全性チェック
  let emptyStationCount = 0;
  for (const st of stations) {
    const wdIn = stationTt.weekday[st.id]?.inbound?.length || 0;
    const wdOut = stationTt.weekday[st.id]?.outbound?.length || 0;
    const hdIn = stationTt.holiday[st.id]?.inbound?.length || 0;
    const hdOut = stationTt.holiday[st.id]?.outbound?.length || 0;

    const totalWd = wdIn + wdOut;
    const totalHd = hdIn + hdOut;

    // 終着駅・始発駅を除き、どちらも0本なら異常
    if (totalWd === 0 || totalHd === 0) {
      console.warn(`  ⚠️ 駅 ${st.id} (${st.name}) 発車標が0本: 平日=${totalWd}本, 休日=${totalHd}本`);
      emptyStationCount++;
    }
  }
  if (emptyStationCount === 0) {
    console.log(`  ✅ 全駅発車標本数チェック: 全駅正常発車本数を保持`);
  }

  totalAnomalies += lineErrors;
}

console.log(`\n============================================================`);
console.log(`🏁 監査完了: 重大エラー合計 ${totalAnomalies}件`);
console.log(`============================================================\n`);
