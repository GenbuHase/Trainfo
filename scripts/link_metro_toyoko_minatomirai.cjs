// 東京メトロ副都心線 ↔ 東急東横線 ↔ 横浜高速鉄道みなとみらい線 相互直通リンカー
const fs = require('fs');
const path = require('path');

function timeToSec(t) {
  if (!t) return null;
  const parts = t.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + (parts[2] || 0);
}

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

  // 1. 東急東横線 ↔ みなとみらい線 直通リンク (横浜駅)
  if (hasToyoko && hasMinatomirai) {
    let tyToMmCount = 0;
    let mmToTyCount = 0;

    // 下り: 東横線 (TY-21着) -> みなとみらい線 (MM-01発)
    const tyOut = tyTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'TY-21');
    const mmOut = mmTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'MM-01');
    const usedMmOut = new Set();

    for (const ty of tyOut) {
      let matched = mmOut.find(mm => !usedMmOut.has(mm.tripId) && mm.trainNumber === ty.trainNumber && mm.isHoliday === ty.isHoliday);
      if (!matched) {
        const tyArr = timeToSec(ty.stops[ty.stops.length - 1].arrivalTime);
        const candidates = mmOut.filter(mm => {
          if (usedMmOut.has(mm.tripId) || mm.isHoliday !== ty.isHoliday) return false;
          const mmDep = timeToSec(mm.stops[0].departureTime);
          const diff = mmDep - tyArr;
          return diff >= 0 && diff <= 180;
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
        ty.customDestination = matched.customDestination || '元町・中華街';
        matched.customOrigin = ty.customOrigin || '渋谷';
        tyToMmCount++;
      }
    }

    // 上り: みなとみらい線 (MM-01着) -> 東横線 (TY-21発)
    const mmIn = mmTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'MM-01');
    const tyIn = tyTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'TY-21');
    const usedTyIn = new Set();

    for (const mm of mmIn) {
      let matched = tyIn.find(ty => !usedTyIn.has(ty.tripId) && ty.trainNumber === mm.trainNumber && ty.isHoliday === mm.isHoliday);
      if (!matched) {
        const mmArr = timeToSec(mm.stops[mm.stops.length - 1].arrivalTime);
        const candidates = tyIn.filter(ty => {
          if (usedTyIn.has(ty.tripId) || ty.isHoliday !== mm.isHoliday) return false;
          const tyDep = timeToSec(ty.stops[0].departureTime);
          const diff = tyDep - mmArr;
          return diff >= 0 && diff <= 180;
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
        mm.customDestination = matched.customDestination || '渋谷';
        matched.customOrigin = mm.customOrigin || '元町・中華街';
        mmToTyCount++;
      }
    }

    console.log(`✅ 東急東横線 ↔ みなとみらい線 直通リンク完了:`);
    console.log(`  [下り] 東横線 -> みなとみらい線: ${tyToMmCount} 本`);
    console.log(`  [上り] みなとみらい線 -> 東横線: ${mmToTyCount} 本`);
  }

  // 2. 副都心線 ↔ 東急東横線 直通リンク (渋谷駅)
  if (hasFukutoshin && hasToyoko) {
    let fToTyCount = 0;
    let tyToFCount = 0;

    // 下り: 副都心線 (F-16着) -> 東横線 (TY-01発)
    const fOut = fTrips.filter(t => t.direction === 'outbound' && t.destinationStationId === 'F-16');
    const tyOut = tyTrips.filter(t => t.direction === 'outbound' && t.originStationId === 'TY-01');
    const usedTyOut = new Set();

    for (const f of fOut) {
      const fId = f.trainId || f.trainNumber;
      let matched = tyOut.find(ty => !usedTyOut.has(ty.tripId) && ty.trainNumber === fId && ty.isHoliday === f.isHoliday);

      if (!matched) {
        const fArr = timeToSec(f.stops[f.stops.length - 1].arrivalTime);
        const candidates = tyOut.filter(ty => {
          if (usedTyOut.has(ty.tripId) || ty.isHoliday !== f.isHoliday) return false;
          const tyDep = timeToSec(ty.stops[0].departureTime);
          const diff = tyDep - fArr;
          return diff >= 0 && diff <= 300;
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
        f.customDestination = matched.customDestination || '元町・中華街';
        matched.customOrigin = f.customOrigin || '和光市';
        fToTyCount++;
      }
    }

    // 上り: 東横線 (TY-01着) -> 副都心線 (F-16発)
    const tyIn = tyTrips.filter(t => t.direction === 'inbound' && t.destinationStationId === 'TY-01');
    const fIn = fTrips.filter(t => t.direction === 'inbound' && t.originStationId === 'F-16');
    const usedFIn = new Set();

    for (const ty of tyIn) {
      let matched = fIn.find(f => !usedFIn.has(f.tripId) && (f.trainId === ty.trainNumber || f.trainNumber === ty.trainNumber) && f.isHoliday === ty.isHoliday);

      if (!matched) {
        const tyArr = timeToSec(ty.stops[ty.stops.length - 1].arrivalTime);
        const candidates = fIn.filter(f => {
          if (usedFIn.has(f.tripId) || f.isHoliday !== ty.isHoliday) return false;
          const fDep = timeToSec(f.stops[0].departureTime);
          const diff = fDep - tyArr;
          return diff >= 0 && diff <= 300;
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
        ty.customDestination = matched.customDestination || '和光市';
        matched.customOrigin = ty.customOrigin || '元町・中華街';
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
