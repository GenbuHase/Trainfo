// 試験走行（試運転）列車生成サービス
import type { TimetableTrip, LineId, Direction, StationStopTime } from '../types';
import { getLine } from '../data/linesRegistry';
import { getTrackDistanceKm, calculateDistanceKm } from '../data/trackGeometry';
import { STATION_MAP } from '../data/stations';

function secondsToTimeString(sec: number): string {
  const normalized = ((Math.floor(sec) % 86400) + 86400) % 86400;
  const h = Math.floor(normalized / 3600);
  const m = Math.floor((normalized % 3600) / 60);
  const s = normalized % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export interface CreateTestTrainOptions {
  speedKmh?: number;
  stopSeconds?: number;
  trainNumber?: string;
}

/**
 * 指定された路線の始点から終点まで走行する試験走行（試運転）トリップを生成
 */
export function createTestTrainTrip(
  lineId: LineId,
  direction: Direction = 'outbound',
  currentSec: number,
  options: CreateTestTrainOptions = {}
): TimetableTrip[] {
  const line = getLine(lineId);
  if (!line || line.stations.length < 2) {
    throw new Error(`路線 ${lineId} の駅データが見つかりません`);
  }

  const isShinkansen = lineId.includes('shinkansen');
  const defaultSpeed = isShinkansen ? 210 : 70;
  const avgSpeedKmh = options.speedKmh || defaultSpeed;
  const stopSec = options.stopSeconds !== undefined ? options.stopSeconds : 15;

  // 駅順を決定 (outbound = 順方向, inbound = 逆方向)
  const stationsList = direction === 'outbound' ? [...line.stations] : [...line.stations].reverse();

  let accumulatedSec = currentSec;
  const stops: StationStopTime[] = [];

  for (let i = 0; i < stationsList.length; i++) {
    const curSt = stationsList[i];
    const nextSt = stationsList[i + 1];

    if (i === 0) {
      // 始発駅: 現在時刻から発車
      const depTime = secondsToTimeString(accumulatedSec);
      stops.push({
        stationId: curSt.id,
        arrivalTime: depTime,
        departureTime: depTime,
        isPassing: false,
      });
    } else {
      const arrTime = secondsToTimeString(accumulatedSec);
      // 終着駅の場合は発車時刻も同じ
      const isTerminal = i === stationsList.length - 1;
      const depSec = isTerminal ? accumulatedSec : accumulatedSec + stopSec;
      const depTime = secondsToTimeString(depSec);

      stops.push({
        stationId: curSt.id,
        arrivalTime: arrTime,
        departureTime: depTime,
        isPassing: false,
      });

      accumulatedSec = depSec;
    }

    // 次の駅までの所要時間を加算
    if (nextSt) {
      const trackDist = getTrackDistanceKm(curSt.id, nextSt.id);
      const stObjA = STATION_MAP.get(curSt.id) || curSt;
      const stObjB = STATION_MAP.get(nextSt.id) || nextSt;
      const distKm = trackDist !== null ? trackDist : calculateDistanceKm(stObjA.lat, stObjA.lng, stObjB.lat, stObjB.lng);

      const runHours = distKm / avgSpeedKmh;
      const runSec = Math.max(30, Math.round(runHours * 3600));
      accumulatedSec += runSec;
    }
  }

  const originStation = stationsList[0];
  const destStation = stationsList[stationsList.length - 1];
  const trainNo = options.trainNumber || (direction === 'outbound' ? '試9001レ' : '試9002レ');
  const baseTripId = `TEST_RUN_${lineId}_${direction}_${Math.floor(currentSec)}`;

  // 平日用と土休日用の両方を作成（シミュレーション設定がどちらであっても確実に走行）
  const tripWeekday: TimetableTrip = {
    tripId: `${baseTripId}_WD`,
    lineId,
    trainId: 'TEST9001',
    trainNumber: trainNo,
    trainType: 'test_run' as any,
    direction,
    originStationId: originStation.id,
    destinationStationId: destStation.id,
    customOrigin: `${originStation.name} (試運転)`,
    customDestination: `${destStation.name} (試運転)`,
    cars: line.defaultCars || 8,
    isHoliday: false,
    stops,
  };

  const tripHoliday: TimetableTrip = {
    ...tripWeekday,
    tripId: `${baseTripId}_HD`,
    isHoliday: true,
  };

  return [tripWeekday, tripHoliday];
}
