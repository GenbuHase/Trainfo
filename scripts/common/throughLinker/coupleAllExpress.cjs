const fs = require('fs');
const path = require('path');
const { coupleTobuExpress } = require('./coupleTobuExpress.cjs');
const YahooTimetableBuilder = require('../yahoo/YahooTimetableBuilder.cjs');

function safeWriteJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function timeToSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + (s || 0);
}

/**
 * 東北新幹線の下りつばさ・こまちトリップを復元注入
 */
function restoreTohokuDownTrips(thTrips) {
  const thConfig = require('../../lines/tohoku_shinkansen/config.cjs');
  const thBuilder = new YahooTimetableBuilder(thConfig);

  const yPath = path.resolve('scripts/cache/yahoo/yamagata_shinkansen/all_train_details.json');
  const aPath = path.resolve('scripts/cache/yahoo/akita_shinkansen/all_train_details.json');
  if (!fs.existsSync(yPath) || !fs.existsSync(aPath)) return thTrips;

  const yDetails = JSON.parse(fs.readFileSync(yPath, 'utf8'));
  const aDetails = JSON.parse(fs.readFileSync(aPath, 'utf8'));

  const yDown = yDetails.filter(t => t.direction === 'outbound' && t.displayName.includes('つばさ') && t.stopStation.some(s => s.stationName === '東京'));
  const aDown = aDetails.filter(t => t.direction === 'outbound' && t.displayName.includes('こまち') && t.stopStation.some(s => s.stationName === '東京'));

  const generatedY = thBuilder.buildGlobalTimetable(yDown);
  const generatedA = thBuilder.buildGlobalTimetable(aDown);

  const existingIds = new Set(thTrips.map(t => t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`));

  let added = 0;
  for (const t of [...generatedY, ...generatedA]) {
    const key = t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`;
    if (!existingIds.has(key)) {
      thTrips.push(t);
      existingIds.add(key);
      added++;
    }
  }
  console.log(`[coupleAllExpress] 東北新幹線に下りつばさ・こまち ${added} 便を復元注入`);
  return thTrips;
}

/**
 * 東海道線の下り修善寺踊り子トリップを復元注入
 */
function restoreTokaidoDownTrips(tkTrips) {
  const tkConfig = require('../../lines/tokaido/config.cjs');
  const tkBuilder = new YahooTimetableBuilder(tkConfig);

  const sunPath = path.resolve('scripts/cache/yahoo/izuhakone_sunzu/all_train_details.json');
  if (!fs.existsSync(sunPath)) return tkTrips;

  const sunDetails = JSON.parse(fs.readFileSync(sunPath, 'utf8'));
  const sunDown = sunDetails.filter(t => t.direction === 'outbound' && t.displayName.includes('踊り子') && t.stopStation.some(s => s.stationName === '東京'));

  const generated = tkBuilder.buildGlobalTimetable(sunDown);
  const existingIds = new Set(tkTrips.map(t => t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`));

  let added = 0;
  for (const t of generated) {
    const key = t.tripId || `${t.isHoliday ? 'H' : 'W'}_${t.direction}_${t.trainId || t.trainNumber}`;
    if (!existingIds.has(key)) {
      t.destinationStationName = '修善寺';
      tkTrips.push(t);
      existingIds.add(key);
      added++;
    }
  }
  console.log(`[coupleAllExpress] 東海道線に下り修善寺踊り子 ${added} 便を復元注入`);
  return tkTrips;
}

/**
 * 1. 東北新幹線（やまびこ＋つばさ、はやぶさ＋こまち）の併結
 */
function coupleTohokuShinkansen() {
  console.log('\n=== 🚄 東北新幹線（やまびこ+つばさ、はやぶさ+こまち）カップリング ===');
  const filePath = path.resolve('src/data/lines/tohoku_shinkansen/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  let trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  trips = restoreTohokuDownTrips(trips);

  // 既存の coupling をクリアして再計算可能に
  for (const t of trips) {
    delete t.coupling;
  }

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      // (A) やまびこ (PRIMARY: 10両) + つばさ (SECONDARY: 7両)
      const yamabikos = dirTrips.filter(t => t.trainType === 'yamabiko');
      const tsubasas = dirTrips.filter(t => t.trainType === 'tsubasa');

      for (const y of yamabikos) {
        if (y.coupling) continue;
        const yRefStop = dir === 'outbound' ? y.stops.find(s => s.stationId === 'TS-01') : y.stops.find(s => s.stationId === 'TS-01');
        if (!yRefStop) continue;
        const yTime = dir === 'outbound' ? yRefStop.departureTime : yRefStop.arrivalTime;

        const match = tsubasas.find(ts => {
          if (ts.coupling) return false;
          const tsRefStop = dir === 'outbound' ? ts.stops.find(s => s.stationId === 'TS-01') : ts.stops.find(s => s.stationId === 'TS-01');
          if (!tsRefStop) return false;
          const tsTime = dir === 'outbound' ? tsRefStop.departureTime : tsRefStop.arrivalTime;
          return Math.abs(timeToSec(tsTime) - timeToSec(yTime)) <= 60;
        });

        if (match) {
          const fromSt = dir === 'outbound' ? 'TS-01' : (match.stops[0]?.stationId || 'TS-09');
          const toSt = dir === 'outbound' ? (match.stops[match.stops.length - 1]?.stationId || 'TS-09') : 'TS-01';

          y.cars = 10;
          match.cars = 7;
          y.customDestination = y.destinationStationName || '仙台';
          match.customDestination = match.destinationStationName || '新庄';

          y.coupling = {
            role: 'PRIMARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: match.tripId,
            coupledTrainNumber: match.trainNumber,
            coupledCars: 7,
            coupledDestination: match.destinationStationName || '新庄'
          };

          match.coupling = {
            role: 'SECONDARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: y.tripId,
            coupledTrainNumber: y.trainNumber,
            coupledCars: 10,
            coupledDestination: y.destinationStationName || '仙台'
          };

          count += 2;
        }
      }

      // (B) はやぶさ (PRIMARY: 10両) + こまち (SECONDARY: 7両)
      const hayabusas = dirTrips.filter(t => t.trainType === 'hayabusa');
      const komachis = dirTrips.filter(t => t.trainType === 'komachi');

      for (const h of hayabusas) {
        if (h.coupling) continue;
        const hRefStop = dir === 'outbound' ? h.stops.find(s => s.stationId === 'TS-01') : h.stops.find(s => s.stationId === 'TS-01');
        if (!hRefStop) continue;
        const hTime = dir === 'outbound' ? hRefStop.departureTime : hRefStop.arrivalTime;

        const match = komachis.find(k => {
          if (k.coupling) return false;
          const kRefStop = dir === 'outbound' ? k.stops.find(s => s.stationId === 'TS-01') : k.stops.find(s => s.stationId === 'TS-01');
          if (!kRefStop) return false;
          const kTime = dir === 'outbound' ? kRefStop.departureTime : kRefStop.arrivalTime;
          return Math.abs(timeToSec(kTime) - timeToSec(hTime)) <= 60;
        });

        if (match) {
          const fromSt = dir === 'outbound' ? 'TS-01' : (match.stops[0]?.stationId || 'TS-18');
          const toSt = dir === 'outbound' ? (match.stops[match.stops.length - 1]?.stationId || 'TS-18') : 'TS-01';

          h.cars = 10;
          match.cars = 7;
          h.customDestination = h.destinationStationName || '新函館北斗';
          match.customDestination = match.destinationStationName || '秋田';

          h.coupling = {
            role: 'PRIMARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: match.tripId,
            coupledTrainNumber: match.trainNumber,
            coupledCars: 7,
            coupledDestination: match.destinationStationName || '秋田'
          };

          match.coupling = {
            role: 'SECONDARY',
            fromStationId: fromSt,
            toStationId: toSt,
            coupledTripId: h.tripId,
            coupledTrainNumber: h.trainNumber,
            coupledCars: 10,
            coupledDestination: h.destinationStationName || '新函館北斗'
          };

          count += 2;
        }
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 東北新幹線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 2. 中央本線（あずさ/かいじ ＋ 富士回遊）の併結
 */
function coupleChuoFujiKaiyu() {
  console.log('\n=== 🏔️ 中央本線（あずさ/かいじ + 富士回遊）カップリング ===');
  const filePath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  const trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      const ltdExps = dirTrips.filter(t =>
        (t.trainType === 'limitedExp' || t.trainType === 'regular') &&
        t.stops.some(s => s.stationId === 'JC-32')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'JC-32');
        if (!s1) continue;
        const time1 = dir === 'outbound' ? s1.departureTime : s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'JC-32');
          if (!s2) continue;
          const time2 = dir === 'outbound' ? s2.departureTime : s2.arrivalTime;

          if (Math.abs(timeToSec(time1) - timeToSec(time2)) <= 120) {
            const isT1Fuji = (t1.destinationStationName && t1.destinationStationName.includes('河口湖')) || (t1.trainNumber && t1.trainNumber.includes('富士回遊'));
            const pri = isT1Fuji ? t2 : t1;
            const sec = isT1Fuji ? t1 : t2;

            const fromSt = dir === 'outbound' ? (pri.stops[0]?.stationId || 'JC-01') : 'JC-32';
            const toSt = dir === 'outbound' ? 'JC-32' : (pri.stops[pri.stops.length - 1]?.stationId || 'JC-01');

            pri.cars = 9;
            sec.cars = 3;
            pri.customDestination = pri.destinationStationName || '甲府';
            sec.customDestination = '河口湖';

            pri.coupling = {
              role: 'PRIMARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: sec.tripId,
              coupledTrainNumber: sec.trainNumber,
              coupledCars: 3,
              coupledDestination: sec.destinationStationName || '河口湖'
            };

            sec.coupling = {
              role: 'SECONDARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: pri.tripId,
              coupledTrainNumber: pri.trainNumber,
              coupledCars: 9,
              coupledDestination: pri.destinationStationName || '甲府'
            };

            count += 2;
            break;
          }
        }
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 中央本線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 3. 東海道線（特急踊り子 下田行 ＋ 修善寺行）の併結
 */
function coupleTokaidoOdoriko() {
  console.log('\n=== 🌊 東海道線（特急踊り子 下田行 + 修善寺行）カップリング ===');
  const filePath = path.resolve('src/data/lines/tokaido/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  let trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  trips = restoreTokaidoDownTrips(trips);
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      const ltdExps = dirTrips.filter(t =>
        (t.trainType === 'limitedExp' || (t.trainNumber && t.trainNumber.includes('踊り子'))) &&
        t.stops.some(s => s.stationId === 'JT-21')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'JT-21');
        if (!s1) continue;
        const time1 = dir === 'outbound' ? (s1.arrivalTime || s1.departureTime) : s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'JT-21');
          if (!s2) continue;
          const time2 = dir === 'outbound' ? (s2.arrivalTime || s2.departureTime) : s2.arrivalTime;

          // 熱海駅発着が5分以内、または東京駅発車時刻が一致
          const t1Tokyo = t1.stops.find(s => s.stationId === 'JT-01');
          const t2Tokyo = t2.stops.find(s => s.stationId === 'JT-01');
          const tokyoMatch = t1Tokyo && t2Tokyo && (
            (dir === 'outbound' && t1Tokyo.departureTime === t2Tokyo.departureTime) ||
            (dir === 'inbound' && t1Tokyo.arrivalTime === t2Tokyo.arrivalTime)
          );

          if (tokyoMatch || Math.abs(timeToSec(time1) - timeToSec(time2)) <= 300) {
            const isT1Shuzenji = (t1.destinationStationName && t1.destinationStationName.includes('修善寺'));
            const isT2Shuzenji = (t2.destinationStationName && t2.destinationStationName.includes('修善寺'));

            if ((isT1Shuzenji || isT2Shuzenji) && isT1Shuzenji !== isT2Shuzenji) {
              const pri = isT1Shuzenji ? t2 : t1;
              const sec = isT1Shuzenji ? t1 : t2;

              const fromSt = dir === 'outbound' ? 'JT-01' : 'JT-21';
              const toSt = dir === 'outbound' ? 'JT-21' : 'JT-01';

              pri.cars = 9;
              sec.cars = 5;
              pri.customDestination = '伊豆急下田';
              sec.customDestination = '修善寺';

              pri.coupling = {
                role: 'PRIMARY',
                fromStationId: fromSt,
                toStationId: toSt,
                coupledTripId: sec.tripId,
                coupledTrainNumber: sec.trainNumber,
                coupledCars: 5,
                coupledDestination: '修善寺'
              };

              sec.coupling = {
                role: 'SECONDARY',
                fromStationId: fromSt,
                toStationId: toSt,
                coupledTripId: pri.tripId,
                coupledTrainNumber: pri.trainNumber,
                coupledCars: 9,
                coupledDestination: '伊豆急下田'
              };

              count += 2;
              break;
            }
          }
        }
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 東海道線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 4. 小田急線（特急ロマンスカー えのしま ＋ はこね）の併結
 */
function coupleOdakyuRomancecar() {
  console.log('\n=== 🚆 小田急線（ロマンスカー えのしま + はこね）カップリング ===');
  const filePath = path.resolve('src/data/lines/odakyu_odawara/globalTimetable.json');
  if (!fs.existsSync(filePath)) return;
  const trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const t of trips) delete t.coupling;

  let count = 0;

  for (const isHoliday of [false, true]) {
    for (const dir of ['outbound', 'inbound']) {
      const dirTrips = trips.filter(t => t.isHoliday === isHoliday && t.direction === dir);

      const ltdExps = dirTrips.filter(t =>
        t.trainType === 'limitedExp' &&
        t.stops.some(s => s.stationId === 'OH-28')
      );

      for (let i = 0; i < ltdExps.length; i++) {
        const t1 = ltdExps[i];
        if (t1.coupling) continue;
        const s1 = t1.stops.find(s => s.stationId === 'OH-28');
        if (!s1) continue;
        const time1 = s1.departureTime || s1.arrivalTime;

        for (let j = i + 1; j < ltdExps.length; j++) {
          const t2 = ltdExps[j];
          if (t2.coupling) continue;
          const s2 = t2.stops.find(s => s.stationId === 'OH-28');
          if (!s2) continue;
          const time2 = s2.departureTime || s2.arrivalTime;

          if (Math.abs(timeToSec(time1) - timeToSec(time2)) <= 60) {
            const isT1Enoshima = (t1.destinationStationName && t1.destinationStationName.includes('江ノ島')) || (t1.trainNumber && t1.trainNumber.includes('えのしま'));
            const pri = isT1Enoshima ? t2 : t1;
            const sec = isT1Enoshima ? t1 : t2;

            const fromSt = dir === 'outbound' ? 'OH-01' : 'OH-28';
            const toSt = dir === 'outbound' ? 'OH-28' : 'OH-01';

            pri.cars = 6;
            sec.cars = 4;

            pri.coupling = {
              role: 'PRIMARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: sec.tripId,
              coupledTrainNumber: sec.trainNumber,
              coupledCars: 4,
              coupledDestination: sec.destinationStationName || '片瀬江ノ島'
            };

            sec.coupling = {
              role: 'SECONDARY',
              fromStationId: fromSt,
              toStationId: toSt,
              coupledTripId: pri.tripId,
              coupledTrainNumber: pri.trainNumber,
              coupledCars: 6,
              coupledDestination: pri.destinationStationName || '箱根湯本'
            };

            count += 2;
            break;
          }
        }
      }
    }
  }

  safeWriteJson(filePath, trips);
  console.log(`  -> 小田急線: ${count} 件の併結トリップを設定完了`);
}

/**
 * 統合カップリング実行
 */
function runAllCoupling() {
  console.log(`============================================================`);
  console.log(`🚀 全路線 併結（Coupling）統合設定パイプライン`);
  console.log(`============================================================`);

  coupleTobuExpress();
  coupleTohokuShinkansen();
  coupleChuoFujiKaiyu();
  coupleTokaidoOdoriko();
  coupleOdakyuRomancecar();

  console.log(`\n============================================================`);
  console.log(`✨ 全路線の併結（Coupling）設定が完了しました！`);
  console.log(`============================================================\n`);
}

if (require.main === module) {
  runAllCoupling();
}

module.exports = { runAllCoupling, coupleTobuExpress, coupleTohokuShinkansen, coupleChuoFujiKaiyu, coupleTokaidoOdoriko, coupleOdakyuRomancecar };
