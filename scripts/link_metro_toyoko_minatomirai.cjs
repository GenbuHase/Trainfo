// 東京メトロ副都心線 ↔ 東急東横線 ↔ 横浜高速鉄道みなとみらい線 相互直通リンカー
const fs = require('fs');
const path = require('path');

function timeToSec(t) {
  if (!t) return null;
  const parts = t.split(':').map(Number);
  let h = parts[0];
  if (h < 4) h += 24;
  return h * 3600 + parts[1] * 60 + (parts[2] || 0);
}

const TOYOKO_STATIONS = {
  'TY-01': '渋谷', 'TY-02': '代官山', 'TY-03': '中目黒', 'TY-04': '祐天寺', 'TY-05': '学芸大学',
  'TY-06': '都立大学', 'TY-07': '自由が丘', 'TY-08': '田園調布', 'TY-09': '多摩川', 'TY-10': '新丸子',
  'TY-11': '武蔵小杉', 'TY-12': '元住吉', 'TY-13': '日吉', 'TY-14': '綱島', 'TY-15': '大倉山',
  'TY-16': '菊名', 'TY-17': '妙蓮寺', 'TY-18': '白楽', 'TY-19': '東白楽', 'TY-20': '反町', 'TY-21': '横浜'
};

const MINATOMIRAI_STATIONS = {
  'MM-01': '横浜', 'MM-02': '新高島', 'MM-03': 'みなとみらい', 'MM-04': '馬車道', 'MM-05': '日本大通り', 'MM-06': '元町・中華街'
};

const FUKUTOSHIN_STATIONS = {
  'F-01': '和光市', 'F-02': '地下鉄成増', 'F-03': '地下鉄赤塚', 'F-04': '平和台', 'F-05': '小竹向原',
  'F-06': '千川', 'F-07': '要町', 'F-08': '池袋', 'F-09': '雑司が谷', 'F-10': '西早稲田',
  'F-11': '東新宿', 'F-12': '新宿三丁目', 'F-13': '北参道', 'F-14': '明治神宮前', 'F-15': '渋谷', 'F-16': '渋谷'
};

function linkMetroToyokoMinatomirai() {
  const fukutoshinPath = path.resolve('src/data/lines/fukutoshin/globalTimetable.json');
  const toyokoPath = path.resolve('src/data/lines/tokyu_toyoko/globalTimetable.json');
  const minatomiraiPath = path.resolve('src/data/lines/minatomirai/globalTimetable.json');

  const hasFukutoshin = fs.existsSync(fukutoshinPath);
  const hasToyoko = fs.existsSync(toyokoPath);
  const hasMinatomirai = fs.existsSync(minatomiraiPath);

  let fTrips = hasFukutoshin ? JSON.parse(fs.readFileSync(fukutoshinPath, 'utf8')) : [];
  let tyTrips = hasToyoko ? JSON.parse(fs.readFileSync(toyokoPath, 'utf8')) : [];
  let mmTrips = hasMinatomirai ? JSON.parse(fs.readFileSync(minatomiraiPath, 'utf8')) : [];

  // 以前の東横線・みなとみらい線関連のリンクをリセット
  for (const t of fTrips) {
    if (t.throughLineId === 'tokyu_toyoko' || t.prevLineId === 'tokyu_toyoko') {
      delete t.throughTripId;
      delete t.throughLineId;
      delete t.prevTripId;
      delete t.prevLineId;
    }
  }
  for (const t of tyTrips) {
    delete t.throughTripId;
    delete t.throughLineId;
    delete t.prevTripId;
    delete t.prevLineId;
  }
  for (const t of mmTrips) {
    delete t.throughTripId;
    delete t.throughLineId;
    delete t.prevTripId;
    delete t.prevLineId;
  }

  // 1. 東急東横線 ↔ みなとみらい線 直通リンク (横浜駅 TY-21 / MM-01)
  if (hasToyoko && hasMinatomirai) {
    let tyToMmCount = 0;
    let mmToTyCount = 0;

    // 下り: 東横線 (TY-21着) -> みなとみらい線 (MM-01発)
    const tyOut = tyTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'TY-21');
    const mmOut = mmTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'MM-01');
    const usedMmOut = new Set();

    for (const ty of tyOut) {
      const tyId = ty.trainId || ty.trainNumber;
      // 1. trainId 照合
      let matched = mmOut.find(mm => !usedMmOut.has(mm.tripId) && (mm.trainId === tyId || mm.trainNumber === tyId) && mm.isHoliday === ty.isHoliday);

      // 2. 時刻近接照合
      if (!matched) {
        const tyArr = timeToSec(ty.stops[ty.stops.length - 1].arrivalTime);
        const candidates = mmOut.filter(mm => {
          if (usedMmOut.has(mm.tripId) || mm.isHoliday !== ty.isHoliday) return false;
          const mmDep = timeToSec(mm.stops[0].departureTime);
          const diff = mmDep - tyArr;
          return diff >= -60 && diff <= 180;
        }).sort((a, b) => {
          const da = Math.abs(timeToSec(a.stops[0].departureTime) - tyArr);
          const db = Math.abs(timeToSec(b.stops[0].departureTime) - tyArr);
          return da - db;
        });
        matched = candidates[0];
      }

      if (matched) {
        usedMmOut.add(matched.tripId);
        ty.throughTripId = matched.tripId;
        ty.throughLineId = 'minatomirai';
        matched.prevTripId = ty.tripId;
        matched.prevLineId = 'tokyu_toyoko';

        // 境界駅での時刻シームレス同期
        const arrTime = ty.stops[ty.stops.length - 1].arrivalTime;
        ty.stops[ty.stops.length - 1].departureTime = arrTime; // 東横線は横浜到着で完了
        matched.stops[0].arrivalTime = arrTime;               // みなとみらい線は到着時刻から停車開始
        const finalDest = matched.customDestination || MINATOMIRAI_STATIONS[matched.destinationStationId] || '元町・中華街';
        ty.customDestination = finalDest;
        matched.customOrigin = ty.customOrigin || TOYOKO_STATIONS[ty.originStationId] || '渋谷';
        tyToMmCount++;
      }
    }

    // 上り: みなとみらい線 (MM-01着) -> 東横線 (TY-21発)
    const mmIn = mmTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'MM-01');
    const tyIn = tyTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'TY-21');
    const usedTyIn = new Set();

    for (const mm of mmIn) {
      const mmId = mm.trainId || mm.trainNumber;
      let matched = tyIn.find(ty => !usedTyIn.has(ty.tripId) && (ty.trainId === mmId || ty.trainNumber === mmId) && ty.isHoliday === mm.isHoliday);

      if (!matched) {
        const mmArr = timeToSec(mm.stops[mm.stops.length - 1].arrivalTime);
        const candidates = tyIn.filter(ty => {
          if (usedTyIn.has(ty.tripId) || ty.isHoliday !== mm.isHoliday) return false;
          const tyDep = timeToSec(ty.stops[0].departureTime);
          const diff = tyDep - mmArr;
          return diff >= -60 && diff <= 180;
        }).sort((a, b) => {
          const da = Math.abs(timeToSec(a.stops[0].departureTime) - mmArr);
          const db = Math.abs(timeToSec(b.stops[0].departureTime) - mmArr);
          return da - db;
        });
        matched = candidates[0];
      }

      if (matched) {
        usedTyIn.add(matched.tripId);
        mm.throughTripId = matched.tripId;
        mm.throughLineId = 'tokyu_toyoko';
        matched.prevTripId = mm.tripId;
        matched.prevLineId = 'minatomirai';

        // 境界駅での時刻シームレス同期
        const arrTime = mm.stops[mm.stops.length - 1].arrivalTime;
        mm.stops[mm.stops.length - 1].departureTime = arrTime; // みなとみらい線は横浜到着で完了
        matched.stops[0].arrivalTime = arrTime;               // 東横線は到着時刻から停車開始

        const finalDest = matched.customDestination || TOYOKO_STATIONS[matched.destinationStationId] || '渋谷';
        mm.customDestination = finalDest;
        matched.customOrigin = mm.customOrigin || MINATOMIRAI_STATIONS[mm.originStationId] || '元町・中華街';
        mmToTyCount++;
      }
    }

    console.log(`✅ 東急東横線 ↔ みなとみらい線 直通リンク完了:`);
    console.log(`  [下り] 東横線 -> みなとみらい線: ${tyToMmCount} 本`);
    console.log(`  [上り] みなとみらい線 -> 東横線: ${mmToTyCount} 本`);
  }

  // 2. 副都心線 ↔ 東急東横線 直通リンク (渋谷駅 F-16 / TY-01)
  if (hasFukutoshin && hasToyoko) {
    let fToTyCount = 0;
    let tyToFCount = 0;

    // 下り: 副都心線 (F-16着) -> 東横線 (TY-01発)
    const fOut = fTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'F-16');
    const tyOut = tyTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'TY-01');
    const usedTyOut = new Set();

    for (const f of fOut) {
      const fId = f.trainId || f.trainNumber;
      let matched = tyOut.find(ty => !usedTyOut.has(ty.tripId) && (ty.trainId === fId || ty.trainNumber === fId) && ty.isHoliday === f.isHoliday);

      if (!matched) {
        const fArr = timeToSec(f.stops[f.stops.length - 1].arrivalTime);
        const candidates = tyOut.filter(ty => {
          if (usedTyOut.has(ty.tripId) || ty.isHoliday !== f.isHoliday) return false;
          const tyDep = timeToSec(ty.stops[0].departureTime);
          const diff = tyDep - fArr;
          return diff >= -60 && diff <= 300;
        }).sort((a, b) => {
          const da = Math.abs(timeToSec(a.stops[0].departureTime) - fArr);
          const db = Math.abs(timeToSec(b.stops[0].departureTime) - fArr);
          return da - db;
        });
        matched = candidates[0];
      }

      if (matched) {
        usedTyOut.add(matched.tripId);
        f.throughTripId = matched.tripId;
        f.throughLineId = 'tokyu_toyoko';
        matched.prevTripId = f.tripId;
        matched.prevLineId = 'fukutoshin';

        // 境界駅での時刻シームレス同期
        const arrTime = f.stops[f.stops.length - 1].arrivalTime;
        f.stops[f.stops.length - 1].departureTime = arrTime; // 副都心線は渋谷到着で完了
        matched.stops[0].arrivalTime = arrTime;             // 東横線は到着時刻から停車開始

        const finalDest = matched.customDestination || TOYOKO_STATIONS[matched.destinationStationId] || '横浜';
        f.customDestination = finalDest;
        matched.customOrigin = f.customOrigin || FUKUTOSHIN_STATIONS[f.originStationId] || '和光市';
        fToTyCount++;
      }
    }

    // 上り: 東横線 (TY-01着) -> 副都心線 (F-16発)
    const tyIn = tyTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'TY-01');
    const fIn = fTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'F-16');
    const usedFIn = new Set();

    for (const ty of tyIn) {
      const tyId = ty.trainId || ty.trainNumber;
      let matched = fIn.find(f => !usedFIn.has(f.tripId) && (f.trainId === tyId || f.trainNumber === tyId) && f.isHoliday === ty.isHoliday);

      if (!matched) {
        const tyArr = timeToSec(ty.stops[ty.stops.length - 1].arrivalTime);
        const candidates = fIn.filter(f => {
          if (usedFIn.has(f.tripId) || f.isHoliday !== ty.isHoliday) return false;
          const fDep = timeToSec(f.stops[0].departureTime);
          const diff = fDep - tyArr;
          return diff >= -60 && diff <= 300;
        }).sort((a, b) => {
          const da = Math.abs(timeToSec(a.stops[0].departureTime) - tyArr);
          const db = Math.abs(timeToSec(b.stops[0].departureTime) - tyArr);
          return da - db;
        });
        matched = candidates[0];
      }

      if (matched) {
        usedFIn.add(matched.tripId);
        ty.throughTripId = matched.tripId;
        ty.throughLineId = 'fukutoshin';
        matched.prevTripId = ty.tripId;
        matched.prevLineId = 'tokyu_toyoko';

        // 境界駅での時刻シームレス同期
        const arrTime = ty.stops[ty.stops.length - 1].arrivalTime;
        ty.stops[ty.stops.length - 1].departureTime = arrTime; // 東横線は渋谷到着で完了
        matched.stops[0].arrivalTime = arrTime;             // 副都心線は到着時刻から停車開始

        const finalDest = matched.customDestination || FUKUTOSHIN_STATIONS[matched.destinationStationId] || '和光市';
        ty.customDestination = finalDest;
        matched.customOrigin = ty.customOrigin || TOYOKO_STATIONS[ty.originStationId] || '元町・中華街';
        tyToFCount++;
      }
    }

    console.log(`✅ 東京メトロ副都心線 ↔ 東急東横線 直通リンク完了:`);
    console.log(`  [下り] 副都心線 -> 東横線: ${fToTyCount} 本`);
    console.log(`  [上り] 東横線 -> 副都心線: ${tyToFCount} 本`);
  }

  // ファイル保存
  if (hasFukutoshin) fs.writeFileSync(fukutoshinPath, JSON.stringify(fTrips, null, 2), 'utf8');
  if (hasToyoko) fs.writeFileSync(toyokoPath, JSON.stringify(tyTrips, null, 2), 'utf8');
  if (hasMinatomirai) fs.writeFileSync(minatomiraiPath, JSON.stringify(mmTrips, null, 2), 'utf8');

  console.log('✅ 直通リンク更新完了');
}

module.exports = { linkMetroToyokoMinatomirai };

if (require.main === module) {
  linkMetroToyokoMinatomirai();
}
