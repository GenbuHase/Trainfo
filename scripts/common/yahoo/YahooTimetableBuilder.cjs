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
    if (!rawName) return null;
    const aliased = this.config.stationNameAliases?.[rawName] || rawName;
    const directMatch = this.stByName.get(aliased);
    if (directMatch) return directMatch;

    // 1. 都道府県等の括弧を除去して再試行（例: '桜台(東京都)' -> '桜台'）
    const withoutSuffix = aliased.replace(/\([^\)]+\)$/, '');
    if (this.stByName.has(withoutSuffix)) {
      return this.stByName.get(withoutSuffix);
    }

    // 2. 「ケ」と「ヶ」の正規化（例: '芦ケ久保' <-> '芦ヶ久保', '狭山ケ丘' <-> '狭山ヶ丘'）
    const normalizedKe = withoutSuffix.replace(/ケ/g, 'ヶ');
    if (this.stByName.has(normalizedKe)) {
      return this.stByName.get(normalizedKe);
    }
    const normalizedBigKe = withoutSuffix.replace(/ヶ/g, 'ケ');
    if (this.stByName.has(normalizedBigKe)) {
      return this.stByName.get(normalizedBigKe);
    }

    return null;
  }

  /**
   * 種別表示名から trainType キーを解決（号数除去・全角半角正規化・部分一致対応）
   * @param {string} rawName
   * @returns {string}
   */
  resolveTrainType(rawName) {
    if (!rawName) return this.config.defaultTrainType || 'local';
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

    // 4. 最長一致キーワードマッチ（路線configのtrainTypeMapキーを文字列長の長い順に自動走査）
    // （例: 「川越特急」が「特急」より先にマッチし、「快速急行」が「快速」より先にマッチする）
    const sortedKeys = Object.keys(this.config.trainTypeMap || {}).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (trimmed.includes(key) || half.includes(key)) {
        return this.config.trainTypeMap[key];
      }
    }

    return this.config.defaultTrainType || 'local';
  }

  /**
   * Yahooの displayName から固有の列車名・愛称・号数（例: "あずさ9号", "DLばんえつ物語", "ひたち1号"）を抽出
   * 固有の愛称がない普通列車や単なる「快速」「特急」等の場合は null を返す
   * @param {string} rawName
   * @returns {string|null}
   */
  extractTrainName(rawName) {
    if (!rawName) return null;
    // 1. 全角英数・記号の半角化、余分な空白の正規化
    let normalized = rawName
      .replace(/[Ａ-Ｚａ-ｚ０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
      .replace(/[−－―]/g, '-')
      .replace(/　/g, ' ')
      .trim();

    // S-TRAIN の表記揺れ正規化（例: "S-TRAIN1号" -> "S-TRAIN 1号"）
    normalized = normalized.replace(/^S-TRAIN\s*(\d+号)$/i, 'S-TRAIN $1');

    // 2. 単なる種別名のみの場合は除外（愛称なし）
    const genericTypes = new Set([
      '普通', '各駅停車', '快速', '通勤快速', '特別快速', '通勤特快',
      '中央特快', '青梅特快', '区間快速', '急行', '快速急行', '区間急行',
      '準急', '通勤準急', '区間準急', '特急', '通勤特急', 'ライナー',
      '新幹線', 'S-TRAIN', 'S−TRAIN', '川越特急'
    ]);
    if (genericTypes.has(normalized)) {
      return null;
    }

    // 3. 先頭の種別プレフィックス（「新幹線 」「特急 」「快速 」「急行 」「普通 」など）を除去
    // 例: "新幹線 とき301号" -> "とき301号"
    // 例: "特急 あずさ9号" -> "あずさ9号"
    // 例: "快速 DLばんえつ物語" -> "DLばんえつ物語"
    // 例: "特急あずさ9号" -> "あずさ9号"
    const prefixRegex = /^(?:JR)?(?:新幹線|超特急|特急|川越特急|通勤特急|快速急行|通勤急行|区間急行|急行|特別快速|通勤特快|中央特快|青梅特快|通勤快速|区間快速|快速|区間準急|通勤準急|準急|普通|各駅停車)\s*/;
    const stripped = normalized.replace(prefixRegex, '').trim();

    if (!stripped || genericTypes.has(stripped)) {
      return null;
    }

    return stripped;
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
    const trainName = this.extractTrainName(displayName);

    // 【路線固有の除外フィルター】他路線集約列車（むさしの号等）の除外判定
    if (this.config.shouldExcludeTrip && this.config.shouldExcludeTrip(trainDetail)) {
      return null;
    }

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
    let validSegments = segments.filter(seg => seg.length >= 2);

    // 【1駅停車直通列車の救出】自社線区間に1駅のみ停車し、他線へ直通通過する列車（常磐線特急ひたち号等）の救出
    if (validSegments.length === 0 && segments.length > 0 && this.config.singleStopRescueRules) {
      for (const rule of this.config.singleStopRescueRules) {
        const singleSeg = segments.find(s => s.length === 1 && s[0].station.id === rule.singleStationId);
        if (singleSeg) {
          const singleStop = singleSeg[0];
          const boundarySt = this.stById.get(rule.boundaryStationId);
          if (!boundarySt) continue;

          // 直通先駅が stopStation に含まれているか判定
          const throughStopIndex = stopStation.findIndex(s => rule.throughStations.includes(s.stationName));
          const singleIndex = stopStation.findIndex(s => s.stationName === singleStop.station.name);

          if (throughStopIndex !== -1 && singleIndex !== -1) {
            const isOutbound = throughStopIndex > singleIndex;
            const diffSec = rule.estimatedSectionSeconds || 1500;
            const boundarySec = isOutbound
              ? (singleStop.depSec || singleStop.arrSec) + diffSec
              : (singleStop.arrSec || singleStop.depSec) - diffSec;

            const boundaryStopObj = {
              station: boundarySt,
              arrSec: boundarySec,
              depSec: boundarySec,
              rawStop: { stationName: boundarySt.name },
              isPassing: true,
            };

            const rescuedStops = isOutbound
              ? [singleStop, boundaryStopObj]
              : [boundaryStopObj, singleStop];

            validSegments = [rescuedStops];
            break;
          }
        }
      }
    }

    if (validSegments.length === 0) {
      return null;
    }

    validSegments.sort((a, b) => b.length - a.length);
    const lineStops = validSegments[0];

    // 【境界駅通過直通列車の境界駅延長】（自社線区間の境界駅を通過して他線へ直通する特急等の救出）
    if (this.config.boundaryPassingRules) {
      for (const rule of this.config.boundaryPassingRules) {
        const boundarySt = this.stById.get(rule.boundaryStationId);
        if (!boundarySt) continue;

        const firstLineStop = lineStops[0];
        const lastLineStop = lineStops[lineStops.length - 1];

        // 既に始点または終点が境界駅なら何もしない
        if (firstLineStop.station.id === boundarySt.id || lastLineStop.station.id === boundarySt.id) {
          continue;
        }

        // stopStation 全体における自社線内停車駅のインデックスを特定
        const firstLineIdxInAll = stopStation.findIndex(s => s.stationName === firstLineStop.station.name);
        const lastLineIdxInAll = stopStation.findIndex(s => s.stationName === lastLineStop.station.name);

        if (firstLineIdxInAll === -1 || lastLineIdxInAll === -1) continue;

        // 1. スカイツリーライン側 下り: 自社線終着駅の後続に throughStations がある場合 (末尾に push)
        if (lastLineIdxInAll < stopStation.length - 1 && boundarySt.number > lastLineStop.station.number) {
          const nextThroughRaw = stopStation[lastLineIdxInAll + 1];
          if (rule.throughStations.includes(nextThroughRaw.stationName)) {
            const nextThroughArr = this.parseTimeToSeconds(nextThroughRaw.arrivalTime || nextThroughRaw.departureTime);
            const lastDep = lastLineStop.depSec !== null ? lastLineStop.depSec : lastLineStop.arrSec;

            let boundarySec = null;
            if (lastDep !== null && nextThroughArr !== null && nextThroughArr > lastDep) {
              const nextStationName = nextThroughRaw.stationName;
              let ratio = 0.3;
              if (nextStationName === '板倉東洋大前' || nextStationName === '栃木') ratio = 0.23;
              else if (nextStationName === '久喜' || nextStationName === '加須') ratio = 0.5;

              boundarySec = Math.round(lastDep + (nextThroughArr - lastDep) * ratio);
            } else if (lastDep !== null) {
              boundarySec = lastDep + 300;
            }

            if (boundarySec !== null) {
              lineStops.push({
                station: boundarySt,
                arrSec: boundarySec,
                depSec: boundarySec,
                rawStop: { stationName: boundarySt.name },
                isPassing: true,
              });
            }
          }
        }

        // 2. スカイツリーライン側 上り: 自社線始発駅の先行に throughStations がある場合 (先頭に unshift)
        if (firstLineIdxInAll > 0 && boundarySt.number > firstLineStop.station.number) {
          const prevThroughRaw = stopStation[firstLineIdxInAll - 1];
          if (rule.throughStations.includes(prevThroughRaw.stationName)) {
            const prevThroughDep = this.parseTimeToSeconds(prevThroughRaw.departureTime || prevThroughRaw.arrivalTime);
            const firstArr = firstLineStop.arrSec !== null ? firstLineStop.arrSec : firstLineStop.depSec;

            let boundarySec = null;
            if (prevThroughDep !== null && firstArr !== null && firstArr > prevThroughDep) {
              const prevStationName = prevThroughRaw.stationName;
              let ratio = 0.23;
              if (prevStationName === '板倉東洋大前' || prevStationName === '栃木') ratio = 0.23;
              else if (prevStationName === '久喜' || prevStationName === '加須') ratio = 0.5;

              boundarySec = Math.round(firstArr - (firstArr - prevThroughDep) * ratio);
            } else if (firstArr !== null) {
              boundarySec = firstArr - 300;
            }

            if (boundarySec !== null) {
              lineStops.unshift({
                station: boundarySt,
                arrSec: boundarySec,
                depSec: boundarySec,
                rawStop: { stationName: boundarySt.name },
                isPassing: true,
              });
            }
          }
        }

        // 3. 日光線・伊勢崎線側 下り: 自社線先頭駅の先行に throughStations がある場合 (先頭に unshift)
        if (firstLineIdxInAll > 0 && boundarySt.number < firstLineStop.station.number) {
          const prevThroughRaw = stopStation[firstLineIdxInAll - 1];
          if (rule.throughStations.includes(prevThroughRaw.stationName)) {
            const prevThroughDep = this.parseTimeToSeconds(prevThroughRaw.departureTime || prevThroughRaw.arrivalTime);
            const firstArr = firstLineStop.arrSec !== null ? firstLineStop.arrSec : firstLineStop.depSec;

            let boundarySec = null;
            if (prevThroughDep !== null && firstArr !== null && firstArr > prevThroughDep) {
              const prevStationName = prevThroughRaw.stationName;
              let ratio = 0.23;
              if (prevStationName === '春日部') {
                if (firstLineStop.station.name === '板倉東洋大前' || firstLineStop.station.name === '栃木') ratio = 0.23;
                else if (firstLineStop.station.name === '久喜') ratio = 0.5;
              }
              boundarySec = Math.round(prevThroughDep + (firstArr - prevThroughDep) * ratio);
            } else if (firstArr !== null) {
              boundarySec = firstArr - 1000;
            }

            if (boundarySec !== null) {
              lineStops.unshift({
                station: boundarySt,
                arrSec: boundarySec,
                depSec: boundarySec,
                rawStop: { stationName: boundarySt.name },
                isPassing: true,
              });
            }
          }
        }

        // 4. 日光線・伊勢崎線側 上り: 自社線終着駅の後続に throughStations がある場合 (末尾に push)
        if (lastLineIdxInAll < stopStation.length - 1 && boundarySt.number < lastLineStop.station.number) {
          const nextThroughRaw = stopStation[lastLineIdxInAll + 1];
          if (rule.throughStations.includes(nextThroughRaw.stationName)) {
            const nextThroughArr = this.parseTimeToSeconds(nextThroughRaw.arrivalTime || nextThroughRaw.departureTime);
            const lastDep = lastLineStop.depSec !== null ? lastLineStop.depSec : lastLineStop.arrSec;

            let boundarySec = null;
            if (lastDep !== null && nextThroughArr !== null && nextThroughArr > lastDep) {
              let ratio = 0.77;
              if (lastLineStop.station.name === '久喜') ratio = 0.5;
              boundarySec = Math.round(lastDep + (nextThroughArr - lastDep) * ratio);
            } else if (lastDep !== null) {
              boundarySec = lastDep + 1000;
            }

            if (boundarySec !== null) {
              lineStops.push({
                station: boundarySt,
                arrSec: boundarySec,
                depSec: boundarySec,
                rawStop: { stationName: boundarySt.name },
                isPassing: true,
              });
            }
          }
        }
      }
    }

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

        // 次の停車駅との間に通過駅が存在する場合、通過駅（isPassing: true）を線形補間して挿入
        if (i < lineStops.length - 1) {
          const next = lineStops[i + 1];
          let nextArr = next.arrSec;
          let nextDep = next.depSec;
          if (nextArr === null) nextArr = nextDep;

          // 1. 分岐・短絡線ルール（junctionPassingRules）による通過駅補間
          const junctionRule = this.config.junctionPassingRules?.find(
            rule => rule.fromId === cur.station.id && rule.toId === next.station.id
          );

          if (junctionRule && dep !== null && nextArr !== null) {
            const viaStations = junctionRule.viaIds.map(id => this.stById.get(id)).filter(Boolean);
            if (viaStations.length > 0) {
              // 各駅間距離を計算して比率を割り出す
              const allPoints = [cur.station, ...viaStations, next.station];
              const segDists = [];
              let totalDist = 0;
              for (let p = 0; p < allPoints.length - 1; p++) {
                const p1 = allPoints[p];
                const p2 = allPoints[p + 1];
                const dy = ((p1.lat || 0) - (p2.lat || 0)) * 111;
                const dx = ((p1.lng || 0) - (p2.lng || 0)) * 91;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                segDists.push(dist);
                totalDist += dist;
              }

              let accDist = 0;
              for (let v = 0; v < viaStations.length; v++) {
                accDist += segDists[v];
                const ratio = totalDist > 0 ? accDist / totalDist : (v + 1) / (viaStations.length + 1);
                const passSec = Math.round(dep + (nextArr - dep) * ratio);
                stops.push({
                  stationId: viaStations[v].id,
                  arrivalTime: this.secondsToTimeString(passSec),
                  departureTime: this.secondsToTimeString(passSec),
                  isPassing: true,
                });
              }
            }
          } else {
            // 2. 同一路線プレフィックスによるナンバリング自動補間
            const curPrefix = cur.station.id.replace(/-\d+$/, '');
            const nextPrefix = next.station.id.replace(/-\d+$/, '');

            if (curPrefix === nextPrefix && cur.station.number && next.station.number) {
              const numDiff = next.station.number - cur.station.number;
              const step = numDiff > 0 ? 1 : -1;
              const stepsCount = Math.abs(numDiff);

              if (stepsCount > 1 && dep !== null && nextArr !== null) {
                for (let s = 1; s < stepsCount; s++) {
                  const intermediateNum = cur.station.number + s * step;
                  const intermediateId = `${curPrefix}-${intermediateNum}`;
                  const intermediateSt = this.stById.get(intermediateId);
                  if (intermediateSt) {
                    const ratio = s / stepsCount;
                    const passSec = Math.round(dep + (nextArr - dep) * ratio);
                    stops.push({
                      stationId: intermediateSt.id,
                      arrivalTime: this.secondsToTimeString(passSec),
                      departureTime: this.secondsToTimeString(passSec),
                      isPassing: true,
                    });
                  }
                }
              }
            }
          }
        }
      }

      const trainType = trainDetail.trainType || this.resolveTrainType(displayName);
      const originSt = firstStop.station;
      const destSt = lastStop.station;

      // 始発駅名
      const originalFirstStop = stopStation[0];
      const resolvedFirstStopSt = this.resolveStation(originalFirstStop.stationName);
      const isInternalOrigin = resolvedFirstStopSt && resolvedFirstStopSt.id === originSt.id;
      const customOrigName = this.config.stationNameAliases?.[originalFirstStop.stationName] || originalFirstStop.stationName;
      const customOrigin = isInternalOrigin ? undefined : customOrigName;

      // 行き先名
      const originalLastStop = stopStation[stopStation.length - 1];
      const resolvedLastStopSt = this.resolveStation(originalLastStop.stationName);
      const isInternalDestination = resolvedLastStopSt && resolvedLastStopSt.id === destSt.id;
      const customDestName = this.config.stationNameAliases?.[originalLastStop.stationName] || originalLastStop.stationName;
      const customDestination = isInternalDestination ? undefined : customDestName;

      const firstDepTime = stops[0].departureTime.replace(/:/g, '').slice(0, 4);
      const tripId = `${isHoliday ? 'HD' : 'WD'}_${direction.toUpperCase().slice(0, 3)}_${originSt.id}_${firstDepTime}_${trainId}`;

      return {
        tripId,
        lineId: this.config.lineId,
        trainNumber: trainId,
        trainType,
        ...(trainName ? { trainName } : {}),
        direction,
        originStationId: originSt.id,
        destinationStationId: destSt.id,
        customOrigin,
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
        knownMap.set(cur.station.number, { arrSec: arr, depSec: dep, isPassing: Boolean(cur.isPassing) });
      }
    }

    // 始発から終着までの全駅セグメントを走査して stops を生成
    const stops = [];
    let allNums = [];
    for (let n = startNum; isOutbound ? n <= endNum : n >= endNum; n += step) {
      allNums.push(n);
    }

    // 分岐線の駅が通過駅として誤混入するのを防ぐ除外ルール
    if (this.config.branchExclusionRules) {
      for (const bRule of this.config.branchExclusionRules) {
        if (lineStops.some(s => bRule.ifContains.includes(s.station.number))) {
          allNums = allNums.filter(n => !bRule.excludeNumbers.includes(n));
        }
      }
    }

    for (let i = 0; i < allNums.length; i++) {
      const num = allNums[i];
      const st = this.stByNum.get(num);
      if (!st) continue;

      const isOrigin = num === startNum;
      const isDest = num === endNum;
      const knownEntry = knownMap.get(num);
      const isStopping = knownEntry && !knownEntry.isPassing;

      let finalArrSec;
      let finalDepSec;

      if (knownEntry) {
        finalArrSec = knownEntry.arrSec;
        finalDepSec = knownEntry.depSec;
      } else {
        // 通過駅の秒補間: 直前の既知駅と直後の既知駅を探索
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

    // 種別の決定: 駅時刻表の trainType があれば優先、なければ displayName から解決
    let trainType = trainDetail.trainType || this.resolveTrainType(displayName);

    const hasPassingStop = stops.some(s => s.isPassing);

    // 新幹線種別および特急種別は、各駅停車区間であっても普通列車化しない
    const SHINKANSEN_TYPES = [
      'hayabusa', 'hayate', 'yamabiko', 'nasuno', 'komachi', 'tsubasa',
      'toki', 'tanigawa', 'kagayaki', 'hakutaka', 'asama', 'tsurugi',
    ];
    const preserveTypes = new Set([
      'limitedExp',
      'limited_express',
      'regular',
      ...SHINKANSEN_TYPES,
      ...(this.config.preserveAllStopsTypes || []),
    ]);
    if (!hasPassingStop && trainType !== 'local' && !preserveTypes.has(trainType)) {
      trainType = this.config.defaultTrainType || 'local';
    }

    // 安全策2: 通過駅が存在するのに trainType が local の場合（直通列車で発車駅が各停扱いだった場合等）
    // guideComment や displayName から自社線内の優等種別を解決
    if (hasPassingStop && trainType === 'local') {
      if (trainDetail.guideComment) {
        const resolvedFromGuide = this.resolveTrainType(trainDetail.guideComment);
        if (resolvedFromGuide && resolvedFromGuide !== 'local') {
          trainType = resolvedFromGuide;
        }
      }
      if (trainType === 'local' && displayName) {
        const resolvedFromDisplay = this.resolveTrainType(displayName);
        if (resolvedFromDisplay && resolvedFromDisplay !== 'local') {
          trainType = resolvedFromDisplay;
        }
      }
    }
    const originSt = firstStop.station;
    const destSt = lastStop.station;

    // 始発駅名
    const originalFirstStop = stopStation[0];
    const resolvedFirstStopSt = this.resolveStation(originalFirstStop.stationName);
    const isInternalOrigin = resolvedFirstStopSt && resolvedFirstStopSt.id === originSt.id;
    const customOrigName = this.config.stationNameAliases?.[originalFirstStop.stationName] || originalFirstStop.stationName;
    const customOrigin = isInternalOrigin ? undefined : customOrigName;

    // 行き先名
    const originalLastStop = stopStation[stopStation.length - 1];
    const resolvedLastStopSt = this.resolveStation(originalLastStop.stationName);
    const isInternalDestination = resolvedLastStopSt && resolvedLastStopSt.id === destSt.id;
    const customDestName = this.config.stationNameAliases?.[originalLastStop.stationName] || originalLastStop.stationName;
    const customDestination = isInternalDestination ? undefined : customDestName;

    const firstDepTime = stops[0].departureTime.replace(/:/g, '').slice(0, 4);
    const tripId = `${isHoliday ? 'HD' : 'WD'}_${direction.toUpperCase().slice(0, 3)}_${originSt.id}_${firstDepTime}_${trainId}`;

    return {
      tripId,
      lineId: this.config.lineId,
      trainNumber: trainId,
      trainType,
      ...(trainName ? { trainName } : {}),
      direction,
      originStationId: originSt.id,
      destinationStationId: destSt.id,
      customOrigin,
      customDestination,
      cars: this.config.resolveCars
        ? this.config.resolveCars({
            originStationId: originSt.id,
            destinationStationId: destSt.id,
            trainType,
            direction,
            stops,
          })
        : (this.config.defaultCars || 6),
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
        // 終着駅は発車しないため除外（ただし直通先へ発車するトリップで departureTime が設定されている場合は含める）
        if (i === trip.stops.length - 1) {
          if (!trip.throughTripId || !stop.departureTime) continue;
        }
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
          tripId: trip.tripId,
        };

        if (store[dayKey][stop.stationId]) {
          // 重複チェック（同一tripId、または同一列車番号・同一発車時刻の重複防止）
          const existing = store[dayKey][stop.stationId][dir];
          if (!existing.some(e => (entry.tripId && e.tripId === entry.tripId) || (e.no === entry.no && e.sec === entry.sec))) {
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
