// リアルタイム列車位置計算シミュレーションエンジン
import type { ActiveTrain, TimetableTrip, LineId } from '../types';
import { STATION_MAP } from '../data/stations';
import {
  interpolateTrackPosition,
  calculateHeading,
  calculateDistanceKm,
} from '../data/trackGeometry';
import {
  timeStringToSeconds,
  formatTrainNumber,
} from '../data/timetableData';
import { getCombinedGlobalTimetable } from '../data/linesRegistry';

export interface SimulationState {
  currentSec: number;        // シミュレーション時刻（秒）0〜86399
  isPlaying: boolean;        // 再生中フラグ
  speedMultiplier: number;   // 再生倍速 (1, 2, 5, 10, 30)
  isHoliday: boolean;        // 平日/土休日
  globalDelayMinutes: number;// 全体遅延シミュレーション(分)
  randomDelays: Record<string, number>; // 個別列車の遅延
  incidentMessage?: string;  // 運行情報メッセージ
  selectedLineIds?: LineId[];// 表示・シミュレーション対象の路線IDリスト
}

// 指定時刻における走行中の全列車を算出
export function calculateActiveTrains(
  simState: SimulationState,
  customTimetable?: TimetableTrip[]
): ActiveTrain[] {
  const timetable = customTimetable || getCombinedGlobalTimetable(simState.selectedLineIds);
  const currentSec = simState.currentSec;
  const isHoliday = simState.isHoliday;
  const activeTrains: ActiveTrain[] = [];

  for (const trip of timetable) {
    if (trip.isHoliday !== isHoliday) continue;
    if (trip.stops.length < 2) continue;

    const lineId: LineId = trip.lineId || 'tojo';
    if (simState.selectedLineIds && simState.selectedLineIds.length > 0 && !simState.selectedLineIds.includes(lineId)) {
      continue;
    }

    const trainDelay =
      (simState.randomDelays[trip.tripId] || 0) + simState.globalDelayMinutes;
    const adjustedCurrentSec = currentSec - trainDelay * 60;

    const firstStop = trip.stops[0];
    const lastStop = trip.stops[trip.stops.length - 1];

    const tripStartSec = timeStringToSeconds(firstStop.departureTime);
    const tripEndSec = timeStringToSeconds(lastStop.departureTime || lastStop.arrivalTime);

    // 運行時間帯外ならスキップ
    if (adjustedCurrentSec < tripStartSec || adjustedCurrentSec > tripEndSec) {
      continue;
    }

    // 各ストップ間を精査
    for (let i = 0; i < trip.stops.length; i++) {
      const curStop = trip.stops[i];
      const curArrSec = timeStringToSeconds(curStop.arrivalTime);
      const curDepSec = timeStringToSeconds(curStop.departureTime);

      const stObj = STATION_MAP.get(curStop.stationId);
      if (!stObj) continue;

      // 1. 駅停車中（または通過駅での通過中）の判定
      if (adjustedCurrentSec >= curArrSec && adjustedCurrentSec <= curDepSec) {
        let heading = 0;
        const nextStop = trip.stops[i + 1];
        if (nextStop) {
          const nextSt = STATION_MAP.get(nextStop.stationId);
          if (nextSt) {
            heading = calculateHeading(stObj.lat, stObj.lng, nextSt.lat, nextSt.lng);
          }
        } else {
          const prevStop = trip.stops[i - 1];
          if (prevStop) {
            const prevSt = STATION_MAP.get(prevStop.stationId);
            if (prevSt) {
              heading = calculateHeading(prevSt.lat, prevSt.lng, stObj.lat, stObj.lng);
            }
          }
        }

        const nextStopStation = trip.stops.slice(i + 1).find((s) => !s.isPassing);

        activeTrains.push({
          tripId: trip.tripId,
          lineId,
          trainNumber: trip.trainNumber || formatTrainNumber(undefined, trip.tripId),
          trainType: trip.trainType,
          direction: trip.direction,
          originStationId: trip.originStationId,
          destinationStationId: trip.destinationStationId,
          customDestination: trip.customDestination,
          cars: trip.cars,
          status: 'STOPPING',
          currentLat: stObj.lat,
          currentLng: stObj.lng,
          heading,
          currentStationId: curStop.stationId,
          nextStationId: nextStop ? nextStop.stationId : curStop.stationId,
          nextStopStationId: nextStopStation ? nextStopStation.stationId : curStop.stationId,
          progressPercent: 0,
          speedKmh: 0,
          delayMinutes: trainDelay,
          departureTime: curStop.departureTime,
          arrivalTimeNext: nextStop ? nextStop.arrivalTime : curStop.arrivalTime,
          stops: trip.stops,
        });
        break;
      }

      // 2. 駅間走行中の判定
      if (i < trip.stops.length - 1) {
        const nextStop = trip.stops[i + 1];
        const nextArrSec = timeStringToSeconds(nextStop.arrivalTime);

        if (adjustedCurrentSec > curDepSec && adjustedCurrentSec < nextArrSec) {
          const totalDuration = nextArrSec - curDepSec;
          const elapsed = adjustedCurrentSec - curDepSec;
          const progress = totalDuration > 0 ? elapsed / totalDuration : 0;

          // 線路ポリラインに沿った座標・方位角の精密補間
          const interpolated = interpolateTrackPosition(
            curStop.stationId,
            nextStop.stationId,
            progress
          );

          // 速度計算 (km/h)
          const stNextObj = STATION_MAP.get(nextStop.stationId);
          let speedKmh = 70;
          if (stObj && stNextObj) {
            const dist = calculateDistanceKm(stObj.lat, stObj.lng, stNextObj.lat, stNextObj.lng);
            if (totalDuration > 0) {
              speedKmh = Math.round((dist / (totalDuration / 3600)) * 10) / 10;
            }
          }

          const nextStopStation = trip.stops.slice(i + 1).find((s) => !s.isPassing);

          activeTrains.push({
            tripId: trip.tripId,
            lineId,
            trainNumber: trip.trainNumber || formatTrainNumber(undefined, trip.tripId),
            trainType: trip.trainType,
            direction: trip.direction,
            originStationId: trip.originStationId,
            destinationStationId: trip.destinationStationId,
            customDestination: trip.customDestination,
            cars: trip.cars,
            status: 'RUNNING',
            currentLat: interpolated.lat,
            currentLng: interpolated.lng,
            heading: interpolated.heading,
            currentStationId: curStop.stationId,
            nextStationId: nextStop.stationId,
            nextStopStationId: nextStopStation ? nextStopStation.stationId : nextStop.stationId,
            progressPercent: progress,
            speedKmh: Math.min(105, Math.max(25, speedKmh)),
            delayMinutes: trainDelay,
            departureTime: curStop.departureTime,
            arrivalTimeNext: nextStop.arrivalTime,
            stops: trip.stops,
          });
          break;
        }
      }
    }
  }

  // 同一運行（路線・進行方向・同一列車番号）の重複表示を安全に排除
  const uniqueTrains: ActiveTrain[] = [];
  const seenTrainKeys = new Set<string>();

  for (const train of activeTrains) {
    const formattedNo = formatTrainNumber(train.trainNumber, train.tripId);
    const key = `${train.lineId}_${train.direction}_${formattedNo}`;

    if (seenTrainKeys.has(key)) {
      continue;
    }
    seenTrainKeys.add(key);
    uniqueTrains.push(train);
  }

  return uniqueTrains;
}

// 現在のリアルタイム時刻（秒）を取得（深夜0〜3時は翌日24〜27時として計算）
export function getRealCurrentSeconds(): number {
  const now = new Date();
  const h = now.getHours();
  const normalizedHour = h < 4 ? h + 24 : h;
  return normalizedHour * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

// 指定駅を通過中または直近に停車する列車を検索
export function getTrainsNearStation(activeTrains: ActiveTrain[], stationId: string): ActiveTrain[] {
  return activeTrains.filter(
    (t) => t.currentStationId === stationId || t.nextStationId === stationId
  );
}
