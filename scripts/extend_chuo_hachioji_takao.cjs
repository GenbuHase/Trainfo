// JR中央線快速 ↔ JR中央本線 特急八王子〜高尾間延伸・高尾通過時刻完全同期・相互直通リンクスクリプト（宣言的設定駆動）
const fs = require('fs');
const path = require('path');
const {
  timeToSec,
  secToTime,
  safeReadJson,
  safeWriteJson,
  extractTrainId,
  linkThroughTrips,
} = require('./common/timetableUtils.cjs');

// 宣言的設定: 中央線快速↔中央本線の特急延伸・同期ルール
const CHUO_EXTENSION_CONFIG = {
  chuoPath: path.resolve('src/data/lines/chuo/globalTimetable.json'),
  chuoMainPath: path.resolve('src/data/lines/chuo_main/globalTimetable.json'),
  limitedExpressKeywords: ['あずさ', 'かいじ', '富士回遊', 'はちおうじ', 'おうめ'],
  priorityTrainNameKeyword: 'あずさ',
  maxChuoNonPassingStops: 8,
  boundaryStationId: 'JC-24',      // 高尾
  intermediateStationId: 'JC-23',  // 西八王子
  tokyoStationId: 'JC-01',
};

function hasMisassignedLimitedExpName(trip) {
  if (trip.trainType === 'limitedExp' || !trip.trainName) return false;
  return CHUO_EXTENSION_CONFIG.limitedExpressKeywords.some((kw) => trip.trainName.includes(kw));
}

function clearMisassignedMetadata(trip) {
  delete trip.trainName;
  delete trip.prevTripId;
  delete trip.prevLineId;
  delete trip.throughTripId;
  delete trip.throughLineId;
  delete trip.customOrigin;
  delete trip.customDestination;
}

function extendChuoHachiojiTakao() {
  console.log('=== 🚄 中央線快速 ↔ 中央本線 特急延伸・時刻完全同期・直通リンク開始 ===\n');

  const { chuoPath, chuoMainPath, boundaryStationId, intermediateStationId, tokyoStationId } = CHUO_EXTENSION_CONFIG;
  if (!fs.existsSync(chuoPath) || !fs.existsSync(chuoMainPath)) return;

  const chuoTrips = safeReadJson(chuoPath);
  const chuoMainTrips = safeReadJson(chuoMainPath);

  // 1. 各駅停車・快速列車に誤って付与された特急愛称および改ざんされた時刻をクリーンアップ
  let cleanedMisassigned = 0;
  for (const trip of chuoTrips) {
    if (trip.trainType !== 'limitedExp') {
      if (hasMisassignedLimitedExpName(trip)) {
        clearMisassignedMetadata(trip);
        cleanedMisassigned++;
      }
      if (trip.originStationId === boundaryStationId && trip.stops[0]?.stationId === boundaryStationId) {
        if (trip.stops[0].arrivalTime !== trip.stops[0].departureTime) {
          trip.stops[0].arrivalTime = trip.stops[0].departureTime;
        }
      }
    }
  }

  for (const trip of chuoMainTrips) {
    if (hasMisassignedLimitedExpName(trip)) {
      clearMisassignedMetadata(trip);
      cleanedMisassigned++;
    }
  }

  // 非特急から誤生成された富士回遊ゴースト(_fuji)および異常なゴーストを除去
  const chuoLenBefore = chuoTrips.length;
  for (let i = chuoTrips.length - 1; i >= 0; i--) {
    const t = chuoTrips[i];
    if (t.tripId.includes('_fuji') && (t.trainType !== 'limitedExp' || t.tripId.includes('10030'))) {
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
    if (t.trainType !== 'limitedExp') continue;
    if (!t.stops || !t.stops.some((s) => s.isPassing)) continue;

    const yId = extractTrainId(t);
    if (yId) {
      const key = `${yId}_${t.direction}_${t.isHoliday ? 'HD' : 'WD'}`;
      cmMap.set(key, t);
    }
  }

  let linkedOutbound = 0;
  let linkedInbound = 0;

  for (const trip of chuoTrips) {
    if (trip.trainType !== 'limitedExp') continue;
    const nonPassingStops = trip.stops ? trip.stops.filter((s) => !s.isPassing) : [];
    if (nonPassingStops.length > CHUO_EXTENSION_CONFIG.maxChuoNonPassingStops) continue;

    const yId = extractTrainId(trip);
    const key = `${yId}_${trip.direction}_${trip.isHoliday ? 'HD' : 'WD'}`;
    const cm = yId ? cmMap.get(key) : null;
    if (!cm) continue;

    // trainName の同期（互いに未設定の場合のみ補完、既存の愛称を不正に上書きしない）
    if (!trip.trainName && cm.trainName) {
      trip.trainName = cm.trainName;
    } else if (trip.trainName && !cm.trainName) {
      cm.trainName = trip.trainName;
    }

    // trainNumber の同期（cm側の正規列車番号 [例: 13M, 3107M, 9076M] を chuo側へ同期）
    if (cm.trainNumber && /^\d+[A-Z]$/.test(cm.trainNumber)) {
      trip.trainNumber = cm.trainNumber;
    } else if (trip.trainNumber && /^\d+[A-Z]$/.test(trip.trainNumber) && !cm.trainNumber) {
      cm.trainNumber = trip.trainNumber;
    }

    if (trip.direction === 'outbound') {
      const cmTakaoStop = cm.stops.find((s) => s.stationId === boundaryStationId) || cm.stops[0];
      const cmTakaoTime = cmTakaoStop.departureTime || cmTakaoStop.arrivalTime;

      let takaoStop = trip.stops.find((s) => s.stationId === boundaryStationId);
      if (!takaoStop) {
        const last = trip.stops[trip.stops.length - 1];
        const hachiojiSec = timeToSec(last.departureTime || last.arrivalTime);
        const takaoSec = timeToSec(cmTakaoTime);
        const nishiSec = Math.round((hachiojiSec + takaoSec) / 2);

        trip.stops.push(
          { stationId: intermediateStationId, arrivalTime: secToTime(nishiSec), departureTime: secToTime(nishiSec), isPassing: true },
          { stationId: boundaryStationId, arrivalTime: cmTakaoTime, departureTime: cmTakaoTime, isPassing: true }
        );
        trip.destinationStationId = boundaryStationId;
      } else {
        takaoStop.arrivalTime = cmTakaoTime;
        takaoStop.departureTime = cmTakaoTime;
        takaoStop.isPassing = true;
      }

      linkThroughTrips(trip, 'chuo', cm, 'chuo_main', {
        customOrigin: trip.customOrigin || (trip.originStationId === tokyoStationId ? '東京' : '新宿'),
        customDestination: cm.customDestination || '松本',
      });
      linkedOutbound++;
    } else if (trip.direction === 'inbound') {
      const cmTakaoStop = cm.stops.find((s) => s.stationId === boundaryStationId) || cm.stops[cm.stops.length - 1];
      const cmTakaoTime = cmTakaoStop.arrivalTime || cmTakaoStop.departureTime;

      let takaoStop = trip.stops.find((s) => s.stationId === boundaryStationId);
      if (!takaoStop) {
        const first = trip.stops[0];
        const hachiojiSec = timeToSec(first.arrivalTime || first.departureTime);
        const takaoSec = timeToSec(cmTakaoTime);
        const nishiSec = Math.round((takaoSec + hachiojiSec) / 2);

        trip.stops.unshift({ stationId: intermediateStationId, arrivalTime: secToTime(nishiSec), departureTime: secToTime(nishiSec), isPassing: true });
        trip.stops.unshift({ stationId: boundaryStationId, arrivalTime: cmTakaoTime, departureTime: cmTakaoTime, isPassing: true });
        trip.originStationId = boundaryStationId;
      } else {
        takaoStop.arrivalTime = cmTakaoTime;
        takaoStop.departureTime = cmTakaoTime;
        takaoStop.isPassing = true;
      }

      linkThroughTrips(cm, 'chuo_main', trip, 'chuo', {
        customOrigin: cm.customOrigin || '松本',
        customDestination: trip.customDestination || (trip.destinationStationId === tokyoStationId ? '東京' : '新宿'),
      });
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
