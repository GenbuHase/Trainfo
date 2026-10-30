// JR中央線快速 ↔ JR中央本線 特急八王子〜高尾間延伸・高尾通過時刻完全同期・相互直通リンクスクリプト
const fs = require('fs');
const path = require('path');

function toSec(t) {
  if (!t) return 0;
  const [h, m, s] = t.split(':').map(Number);
  let norm = h < 4 ? h + 24 : h;
  return norm * 3600 + m * 60 + (s || 0);
}

function secToStr(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getYahooId(trip) {
  if (trip.trainId) return trip.trainId;
  const parts = trip.tripId.split('_');
  return parts[parts.length - 1];
}

function safeWriteJson(filePath, data) {
  const content = JSON.stringify(data, null, 2);
  let attempts = 0;
  while (attempts < 10) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (e) {
      attempts++;
      if (attempts >= 10) throw e;
      const start = Date.now();
      while (Date.now() - start < 150) {}
    }
  }
}

function extendChuoHachiojiTakao() {
  console.log('=== 🚄 中央線快速 ↔ 中央本線 特急延伸・時刻完全同期・直通リンク開始 ===\n');

  const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
  const chuoMainPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');

  if (!fs.existsSync(chuoPath) || !fs.existsSync(chuoMainPath)) return;

  const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
  const chuoMainTrips = JSON.parse(fs.readFileSync(chuoMainPath, 'utf8'));

  // 1. 各駅停車・快速列車に誤って付与された特急愛称（あずさ・かいじ・富士回遊等）および改ざんされた時刻をクリーンアップ
  let cleanedMisassigned = 0;
  for (const trip of chuoTrips) {
    if (trip.trainType !== 'limitedExp') {
      if (trip.trainName && (trip.trainName.includes('あずさ') || trip.trainName.includes('かいじ') || trip.trainName.includes('富士回遊') || trip.trainName.includes('はちおうじ') || trip.trainName.includes('おうめ'))) {
        delete trip.trainName;
        delete trip.prevTripId;
        delete trip.prevLineId;
        delete trip.throughTripId;
        delete trip.throughLineId;
        delete trip.customOrigin;
        delete trip.customDestination;
        cleanedMisassigned++;
      }
      // 高尾始発列車(JC-24)の到着時刻改ざん（特急通過時刻で上書きされたもの）を始発時刻に復元
      if (trip.originStationId === 'JC-24' && trip.stops[0]?.stationId === 'JC-24') {
        if (trip.stops[0].arrivalTime !== trip.stops[0].departureTime) {
          trip.stops[0].arrivalTime = trip.stops[0].departureTime;
        }
      }
    }
  }

  // 中央本線側の一般列車に誤付与された特急愛称もクリーンアップ
  for (const trip of chuoMainTrips) {
    if (trip.trainType !== 'limitedExp') {
      if (trip.trainName && (trip.trainName.includes('あずさ') || trip.trainName.includes('かいじ') || trip.trainName.includes('富士回遊') || trip.trainName.includes('はちおうじ') || trip.trainName.includes('おうめ'))) {
        delete trip.trainName;
        delete trip.prevTripId;
        delete trip.prevLineId;
        delete trip.throughTripId;
        delete trip.throughLineId;
        delete trip.customOrigin;
        delete trip.customDestination;
        cleanedMisassigned++;
      }
    }
  }

  // 非特急から誤生成された富士回遊ゴースト(_fuji)を除去
  const chuoLenBefore = chuoTrips.length;
  for (let i = chuoTrips.length - 1; i >= 0; i--) {
    const t = chuoTrips[i];
    if (t.tripId.includes('_fuji') && t.trainType !== 'limitedExp') {
      chuoTrips.splice(i, 1);
    }
  }
  if (chuoTrips.length < chuoLenBefore) {
    console.log(`  ✓ 非特急由来のゴースト富士回遊トリップを ${chuoLenBefore - chuoTrips.length} 件除去`);
  }

  if (cleanedMisassigned > 0) {
    console.log(`  ✓ 一般快速列車への誤割り当て愛称・メタデータを ${cleanedMisassigned} 便クリーンアップ`);
  }

  // 2. 中央本線のマッピングテーブル構築 (yId_dir_HD / yId_dir_WD)
  const cmMap = new Map();
  for (const t of chuoMainTrips) {
    const yId = getYahooId(t);
    if (yId) {
      const key = `${yId}_${t.direction}_${t.isHoliday ? 'HD' : 'WD'}`;
      cmMap.set(key, t);
    }
  }

  let linkedOutbound = 0;
  let linkedInbound = 0;

  for (const trip of chuoTrips) {
    if (trip.trainType !== 'limitedExp') continue;

    const yId = getYahooId(trip);
    const key = `${yId}_${trip.direction}_${trip.isHoliday ? 'HD' : 'WD'}`;
    const cm = yId ? cmMap.get(key) : null;

    if (!cm) continue;

    // trainName の双方向同期（あずさ優先）
    if (cm.trainName && cm.trainName.includes('あずさ')) {
      trip.trainName = cm.trainName;
    } else if (trip.trainName && trip.trainName.includes('あずさ')) {
      cm.trainName = trip.trainName;
    } else if (trip.trainName && !cm.trainName) {
      cm.trainName = trip.trainName;
    } else if (!trip.trainName && cm.trainName) {
      trip.trainName = cm.trainName;
    }

    if (trip.direction === 'outbound') {
      // 下り特急 (東京/新宿 -> 高尾 -> 甲府/松本)
      const cmTakaoStop = cm.stops.find(s => s.stationId === 'JC-24') || cm.stops[0];
      const cmTakaoTime = cmTakaoStop.arrivalTime || cmTakaoStop.departureTime;

      // trip の高尾(JC-24)ストップを整備または同期
      let takaoStop = trip.stops.find(s => s.stationId === 'JC-24');
      if (!takaoStop) {
        // 八王子(JC-22)から高尾(JC-24)へ延伸
        const last = trip.stops[trip.stops.length - 1];
        const hachiojiSec = toSec(last.departureTime || last.arrivalTime);
        const takaoSec = toSec(cmTakaoTime);
        const nishiSec = Math.round((hachiojiSec + takaoSec) / 2);

        trip.stops.push({
          stationId: 'JC-23',
          arrivalTime: secToStr(nishiSec),
          departureTime: secToStr(nishiSec),
          isPassing: true,
        });
        trip.stops.push({
          stationId: 'JC-24',
          arrivalTime: cmTakaoTime,
          departureTime: cmTakaoTime,
          isPassing: true,
        });
        trip.destinationStationId = 'JC-24';
      } else {
        // 既に高尾がある場合は、通過時刻を cm と完全同一秒に同期！
        takaoStop.arrivalTime = cmTakaoTime;
        takaoStop.departureTime = cmTakaoTime;
        takaoStop.isPassing = true;
      }

      // 相互直通リンク & 行先同期
      trip.throughTripId = cm.tripId;
      trip.throughLineId = 'chuo_main';
      cm.prevTripId = trip.tripId;
      cm.prevLineId = 'chuo';

      cm.customOrigin = trip.customOrigin || (trip.originStationId === 'JC-01' ? '東京' : '新宿');
      trip.customDestination = cm.customDestination || '松本';

      linkedOutbound++;
    } else if (trip.direction === 'inbound') {
      // 上り特急 (松本/甲府 -> 高尾 -> 新宿/東京)
      const cmTakaoStop = cm.stops.find(s => s.stationId === 'JC-24') || cm.stops[cm.stops.length - 1];
      const cmTakaoTime = cmTakaoStop.arrivalTime || cmTakaoStop.departureTime;

      // trip の先頭に高尾(JC-24)と西八王子(JC-23)を追加（八王子始発の場合）
      let takaoStop = trip.stops.find(s => s.stationId === 'JC-24');
      if (!takaoStop) {
        const first = trip.stops[0];
        const hachiojiSec = toSec(first.arrivalTime || first.departureTime);
        const takaoSec = toSec(cmTakaoTime);
        const nishiSec = Math.round((takaoSec + hachiojiSec) / 2);

        trip.stops.unshift({
          stationId: 'JC-23',
          arrivalTime: secToStr(nishiSec),
          departureTime: secToStr(nishiSec),
          isPassing: true,
        });
        trip.stops.unshift({
          stationId: 'JC-24',
          arrivalTime: cmTakaoTime,
          departureTime: cmTakaoTime,
          isPassing: true,
        });
        trip.originStationId = 'JC-24';
      } else {
        // 既に高尾がある場合は、通過時刻を cm と完全同一秒に同期！
        takaoStop.arrivalTime = cmTakaoTime;
        takaoStop.departureTime = cmTakaoTime;
        takaoStop.isPassing = true;
      }

      // 相互直通リンク & 行先同期
      cm.throughTripId = trip.tripId;
      cm.throughLineId = 'chuo';
      trip.prevTripId = cm.tripId;
      trip.prevLineId = 'chuo_main';

      trip.customOrigin = cm.customOrigin || '松本';
      cm.customDestination = trip.customDestination || (trip.destinationStationId === 'JC-01' ? '東京' : '新宿');

      linkedInbound++;
    }
  }

  safeWriteJson(chuoPath, chuoTrips);
  safeWriteJson(chuoMainPath, chuoMainTrips);
  console.log(`  ✓ chuo ↔ chuo_main 特急相互直通リンク完了: 下り ${linkedOutbound} 便, 上り ${linkedInbound} 便\n`);
}

module.exports = { extendChuoHachiojiTakao };

if (require.main === module) {
  extendChuoHachiojiTakao();
}
