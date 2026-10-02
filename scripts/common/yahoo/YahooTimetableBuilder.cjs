// Yahoo! 路線情報 ダイヤ合成 & 汎用通過・秒補間エンジン
const fs = require('fs');
const path = require('path');

class YahooTimetableBuilder {
  /**
   * @param {Object} config - LineScraperConfig
   */
  constructor(config) {
    this.config = config;
    this.loadStations();
  }

  /**
   * stations.ts から駅メタデータをロード
   */
  loadStations() {
    const fullPath = path.resolve(process.cwd(), this.config.stationsFilePath);
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Stations file not found: ${fullPath}`);
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    // export const XX_STATIONS: Station[] = [...]
    const match = content.match(/export const [A-Z0-9_]+: Station\[] =\s*(\[[\s\S]*?\]);\s*$/m);
    if (!match) {
      throw new Error(`Failed to parse stations from ${fullPath}`);
    }

    try {
      this.stations = JSON.parse(match[1]);
    } catch {
      this.stations = eval(match[1]);
    }
    this.stById = new Map(this.stations.map(s => [s.id, s]));
    this.stByNum = new Map(this.stations.map(s => [s.number, s]));
    this.stByName = new Map(this.stations.map(s => [s.name, s]));
  }

  /**
   * 駅名の正規化と駅オブジェクト解決
   * @param {string} rawName
   * @returns {Object|null}
   */
  resolveStation(rawName) {
    const aliased = this.config.stationNameAliases?.[rawName] || rawName;
    return this.stByName.get(aliased) || null;
  }

  /**
   * 種別表示名から trainType キーを解決（号数除去・全角半角正規化・部分一致対応）
   * @param {string} rawName
   * @returns {string}
   */
  resolveTrainType(rawName) {
    if (!rawName) return 'local';
    const trimmed = rawName.trim();

    // 1. 完全一致
    if (this.config.trainTypeMap[trimmed]) {
      return this.config.trainTypeMap[trimmed];
    }

    // 2. 号数（例: 1号, ２号等）を除去した名称でマッチ
    const normalized = trimmed.replace(/[0-9０-９]+号$/, '').trim();
    if (this.config.trainTypeMap[normalized]) {
      return this.config.trainTypeMap[normalized];
    }

    // 3. 全角英数を半角化してチェック
    const half = normalized.replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0));
    if (this.config.trainTypeMap[half]) {
      return this.config.trainTypeMap[half];
    }

    // 4. 特殊キーワードマッチ（TJライナー、ライナー等）
    if (/TJライナー|ＴＪライナー|ライナー/i.test(trimmed)) {
      return this.config.trainTypeMap['TJライナー'] || this.config.trainTypeMap['ライナー'] || 'tjLiner';
    }
    if (/川越特急/i.test(trimmed)) {
      return this.config.trainTypeMap['川越特急'] || 'kawagoeExp';
    }
    if (/快速急行/i.test(trimmed)) {
      return this.config.trainTypeMap['快速急行'] || 'rapidExp';
    }
    if (/急行/i.test(trimmed)) {
      return this.config.trainTypeMap['急行'] || 'express';
    }
    if (/準急/i.test(trimmed)) {
      return this.config.trainTypeMap['準急'] || 'semiExp';
    }
    if (/特急/i.test(trimmed)) {
      return this.config.trainTypeMap['特急'] || 'rapidExp';
    }

    return 'local';
  }

  /**
   * HHMM 文字列を秒数に変換
   * @param {string} timeStr - "1400" など
   * @returns {number|null}
   */
  parseTimeToSeconds(timeStr) {
    if (!timeStr || typeof timeStr !== 'string') return null;
    const clean = timeStr.trim();
    if (clean.length < 3 || clean.length > 4) return null;
    const h = parseInt(clean.slice(0, clean.length - 2), 10);
    const m = parseInt(clean.slice(clean.length - 2), 10);
    if (isNaN(h) || isNaN(m)) return null;

    let sec = h * 3600 + m * 60;
    // 深夜（0時〜3時）の列車は翌日扱い (+24h)
    if (h < 4) {
      sec += 86400;
    }
    return sec;
  }

  /**
   * 秒数を "HH:MM:SS" に変換
   * @param {number} sec
   * @returns {string}
   */
  secondsToTimeString(sec) {
    const norm = (Math.floor(sec) + 86400 * 2) % 86400;
    const h = Math.floor(norm / 3600).toString().padStart(2, '0');
    const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
    const s = (norm % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  /**
   * 2駅間の基準所要時間（秒）を計算
   * @param {number} fromNum
   * @param {number} toNum
   * @returns {number}
   */
  getSectionBaseSeconds(fromNum, toNum) {
    const isForward = fromNum < toNum;
    const step = isForward ? 1 : -1;
    let totalSec = 0;
    const baseTable = this.config.baseSectionSeconds || {};

    for (let n = fromNum; n !== toNum; n += step) {
      const sectionKey = isForward ? n : n - 1;
      const baseSec = baseTable[sectionKey] || 150;
      totalSec += baseSec;
    }

    return Math.max(30, totalSec);
  }

  /**
   * 単一列車の詳細データから TimetableTrip を構築
   * @param {Object} trainDetail
   * @returns {Object|null}
   */
  buildTrip(trainDetail) {
    const { trainId, dayKey, stopStation, displayName } = trainDetail;
    const isHoliday = dayKey === 'holiday';

    if (!stopStation || stopStation.length === 0) {
      return null;
    }

    // 自社線内の停車駅リストを抽出（他社線直通駅を挟んだ飛び地駅の誤マッチを排除するため、連続するセグメントに分割）
    const segments = [];
    let currentSegment = [];

    for (const rawStop of stopStation) {
      const st = this.resolveStation(rawStop.stationName);
      if (st) {
        const arrSec = this.parseTimeToSeconds(rawStop.arrivalTime);
        const depSec = this.parseTimeToSeconds(rawStop.departureTime);
        currentSegment.push({
          station: st,
          arrSec,
          depSec,
          rawStop,
        });
      } else {
        if (currentSegment.length > 0) {
          segments.push(currentSegment);
          currentSegment = [];
        }
      }
    }
    if (currentSegment.length > 0) {
      segments.push(currentSegment);
    }

    // 長さが2以上の最長セグメントを自社線区間として採用
    // （例: 森林公園〜和光市の15駅と、副都心線池袋の1駅の場合、15駅側を採用）
    const validSegments = segments.filter(seg => seg.length >= 2);
    if (validSegments.length === 0) {
      return null;
    }

    validSegments.sort((a, b) => b.length - a.length);
    const lineStops = validSegments[0];

    const firstStop = lineStops[0];
    const lastStop = lineStops[lineStops.length - 1];

    // directStops モード: 停車駅リストを直接 stops として使用（武蔵野線など通過駅のない分岐・直通系統用）
    if (this.config.directStops) {
      let direction = trainDetail.direction;
      if (this.config.resolveDirection) {
        direction = this.config.resolveDirection(firstStop.station, lastStop.station, trainDetail);
      }
      if (!direction) {
        direction = 'outbound';
      }

      const stops = [];
      for (let i = 0; i < lineStops.length; i++) {
        const cur = lineStops[i];
        let arr = cur.arrSec;
        let dep = cur.depSec;

        if (i === 0 && arr === null) arr = dep;
        if (i === lineStops.length - 1 && dep === null) dep = arr;
        if (arr === null && dep !== null) arr = dep;
        if (dep === null && arr !== null) dep = arr;

        stops.push({
          stationId: cur.station.id,
          arrivalTime: this.secondsToTimeString(arr),
          departureTime: this.secondsToTimeString(dep),
          isPassing: false,
        });
      }

      const trainType = this.resolveTrainType(displayName);
      const originSt = firstStop.station;
      const destSt = lastStop.station;

      const originalLastStop = stopStation[stopStation.length - 1];
      const customDestination = originalLastStop.stationName !== destSt.name ? originalLastStop.stationName : undefined;

      const firstDepTime = stops[0].departureTime.replace(/:/g, '').slice(0, 4);
      const tripId = `${isHoliday ? 'HD' : 'WD'}_${direction.toUpperCase().slice(0, 3)}_${originSt.id}_${firstDepTime}_${trainId}`;

      return {
        tripId,
        lineId: this.config.lineId,
        trainNumber: trainId,
        trainType,
        direction,
        originStationId: originSt.id,
        destinationStationId: destSt.id,
        customDestination,
        cars: this.config.defaultCars || 8,
        isHoliday,
        stops,
      };
    }

    const startNum = firstStop.station.number;
    const endNum = lastStop.station.number;

    if (startNum === endNum) {
      return null;
    }

    const isOutbound = startNum < endNum;
    const direction = isOutbound ? 'outbound' : 'inbound';
    const step = isOutbound ? 1 : -1;

    // 既知の停車駅時刻Map (station.number -> { arrSec, depSec })
    const knownMap = new Map();

    for (let i = 0; i < lineStops.length; i++) {
      const cur = lineStops[i];
      let arr = cur.arrSec;
      let dep = cur.depSec;

      // 始発駅: arr が null なら dep と同じ
      if (i === 0 && arr === null) {
        arr = dep;
      }
      // 終着駅: dep が null なら arr と同じ
      if (i === lineStops.length - 1 && dep === null) {
        dep = arr;
      }

      // 途中駅で片方しか無い場合の安全策
      if (arr === null && dep !== null) arr = dep;
      if (dep === null && arr !== null) dep = arr;

      if (arr !== null && dep !== null) {
        knownMap.set(cur.station.number, { arrSec: arr, depSec: dep });
      }
    }

    // 始発から終着までの全駅セグメントを走査して stops を生成
    const stops = [];
    const allNums = [];
    for (let n = startNum; isOutbound ? n <= endNum : n >= endNum; n += step) {
      allNums.push(n);
    }

    for (let i = 0; i < allNums.length; i++) {
      const num = allNums[i];
      const st = this.stByNum.get(num);
      if (!st) continue;

      const isOrigin = num === startNum;
      const isDest = num === endNum;
      const isStopping = knownMap.has(num);

      let finalArrSec;
      let finalDepSec;

      if (isStopping) {
        const known = knownMap.get(num);
        finalArrSec = known.arrSec;
        finalDepSec = known.depSec;
      } else {
        // 通過駅の秒補間: 直前の既知停車駅と直後の既知停車駅を探索
        let prevIdx = i - 1;
        while (prevIdx >= 0 && !knownMap.has(allNums[prevIdx])) {
          prevIdx--;
        }

        let nextIdx = i + 1;
        while (nextIdx < allNums.length && !knownMap.has(allNums[nextIdx])) {
          nextIdx++;
        }

        if (prevIdx >= 0 && nextIdx < allNums.length) {
          const prevNum = allNums[prevIdx];
          const nextNum = allNums[nextIdx];
          const prevDep = knownMap.get(prevNum).depSec;
          const nextArr = knownMap.get(nextNum).arrSec;

          const sectionWeightTotal = this.getSectionBaseSeconds(prevNum, nextNum);
          const currentWeight = this.getSectionBaseSeconds(prevNum, num);

          const ratio = sectionWeightTotal > 0 ? (currentWeight / sectionWeightTotal) : 0.5;
          const passSec = Math.round(prevDep + (nextArr - prevDep) * ratio);

          finalArrSec = passSec;
          finalDepSec = passSec;
        } else {
          // エッジケース
          finalArrSec = firstStop.depSec;
          finalDepSec = firstStop.depSec;
        }
      }

      stops.push({
        stationId: st.id,
        arrivalTime: this.secondsToTimeString(finalArrSec),
        departureTime: this.secondsToTimeString(finalDepSec),
        isPassing: !isStopping,
      });
    }

    const trainType = this.resolveTrainType(displayName);
    const originSt = firstStop.station;
    const destSt = lastStop.station;

    // 行き先名
    const originalLastStop = stopStation[stopStation.length - 1];
    const customDestination = originalLastStop.stationName !== destSt.name ? originalLastStop.stationName : undefined;

    const firstDepTime = stops[0].departureTime.replace(/:/g, '').slice(0, 4);
    const tripId = `${isHoliday ? 'HD' : 'WD'}_${direction.toUpperCase().slice(0, 3)}_${originSt.id}_${firstDepTime}_${trainId}`;

    return {
      tripId,
      lineId: this.config.lineId,
      trainNumber: trainId,
      trainType,
      direction,
      originStationId: originSt.id,
      destinationStationId: destSt.id,
      customDestination,
      cars: this.config.defaultCars || 6,
      isHoliday,
      stops,
    };
  }

  /**
   * 全列車詳細マップから TimetableTrip 配列を合成
   * @param {Map<string, Object>|Array<Object>} trainDetails
   * @returns {Array<Object>}
   */
  buildGlobalTimetable(trainDetails) {
    const list = trainDetails instanceof Map ? Array.from(trainDetails.values()) : trainDetails;
    const trips = [];

    for (const detail of list) {
      try {
        const trip = this.buildTrip(detail);
        if (trip) {
          trips.push(trip);
        }
      } catch (err) {
        console.warn(`[TimetableBuilder] Error building trip for train ${detail?.trainId}:`, err.message);
      }
    }

    // 出発時刻順にソート
    trips.sort((a, b) => {
      if (a.isHoliday !== b.isHoliday) return a.isHoliday ? 1 : -1;
      const aTime = a.stops[0]?.departureTime || '00:00:00';
      const bTime = b.stops[0]?.departureTime || '00:00:00';
      return aTime.localeCompare(bTime);
    });

    return trips;
  }

  /**
   * 全トリップから全駅の駅時刻表（stationTimetables）を集約・生成
   * （武蔵野線など、直通先や他線区間を含む駅時刻表の完全網羅用）
   * @param {Array<Object>} trips
   * @returns {{ weekday: Object, holiday: Object }}
   */
  buildStationTimetablesFromTrips(trips) {
    const store = {
      weekday: {},
      holiday: {},
    };

    // 全駅の初期化
    for (const st of this.stations) {
      store.weekday[st.id] = { inbound: [], outbound: [] };
      store.holiday[st.id] = { inbound: [], outbound: [] };
    }

    for (const trip of trips) {
      const dayKey = trip.isHoliday ? 'holiday' : 'weekday';
      const dir = trip.direction; // 'outbound' または 'inbound'

      for (let i = 0; i < trip.stops.length; i++) {
        const stop = trip.stops[i];
        // 終着駅は発車しないため除外
        if (i === trip.stops.length - 1) continue;
        if (stop.isPassing) continue;

        const [h, m, s = 0] = stop.departureTime.split(':').map(Number);
        const exactSec = h * 3600 + m * 60 + s;

        // 行先名
        const lastStop = trip.stops[trip.stops.length - 1];
        const lastStObj = this.stById.get(lastStop.stationId);
        const destName = trip.customDestination || lastStObj?.name || '';

        const entry = {
          h,
          m,
          time: String(m).padStart(2, '0'),
          sec: exactSec,
          t: trip.trainType,
          d: destName,
          no: trip.trainNumber,
        };

        if (store[dayKey][stop.stationId]) {
          // 重複チェック（同一列車番号・同一発車時刻の重複防止）
          const existing = store[dayKey][stop.stationId][dir];
          if (!existing.some(e => e.no === entry.no && e.sec === entry.sec)) {
            existing.push(entry);
          }
        }
      }
    }

    // 各駅の発車時刻順にソート
    for (const dayKey of ['weekday', 'holiday']) {
      for (const stId of Object.keys(store[dayKey])) {
        store[dayKey][stId].outbound.sort((a, b) => a.sec - b.sec);
        store[dayKey][stId].inbound.sort((a, b) => a.sec - b.sec);
      }
    }

    return store;
  }
}

module.exports = YahooTimetableBuilder;
