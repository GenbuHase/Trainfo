import { useEffect, useRef, useMemo } from 'react';
import type { ActiveTrain, LineId } from '../types';
import { STATION_MAP } from '../data/stations';
import {
  formatTrainNumber,
  getThroughChainTrips,
  getThroughChainTripIds,
  timeStringToSeconds,
} from '../data/timetableData';

interface UseTrainTrackerParams {
  selectedTrainId: string | null;
  setSelectedTrainId: (id: string | null) => void;
  isTrackingTrain: boolean;
  setIsTrackingTrain: (tracking: boolean) => void;
  activeTrains: ActiveTrain[];
  selectedLineIds: LineId[];
  onAddLines: (lineIds: LineId[]) => void;
  currentSec: number;
}

interface UseTrainTrackerResult {
  selectedTrain: ActiveTrain | null;
  clearSelection: () => void;
}

/**
 * 直通運転の自動ハンドオーバー・自動路線追加・追尾猶予タイマーを管理するカスタムフック
 */
export function useTrainTracker({
  selectedTrainId,
  setSelectedTrainId,
  isTrackingTrain,
  setIsTrackingTrain,
  activeTrains,
  selectedLineIds,
  onAddLines,
  currentSec,
}: UseTrainTrackerParams): UseTrainTrackerResult {
  const lastSelectedTrainRef = useRef<ActiveTrain | null>(null);
  const missingTrainTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1. 選択中の列車オブジェクトをリアルタイム算出（直通運転チェーンの網羅探索）
  const selectedTrain = useMemo(() => {
    if (!selectedTrainId && !lastSelectedTrainRef.current) return null;

    // 現在選択されている tripId が activeTrains 内に直接存在するか確認
    if (selectedTrainId) {
      const found = activeTrains.find((t) => t.tripId === selectedTrainId);
      if (found) {
        // 境界駅に到着した直通列車で、後続トリップが既に停車・運行中の場合は直ちに後続トリップへハンドオーバー
        if (found.throughTripId) {
          const isFoundEnding = found.stops[found.stops.length - 1]?.stationId === found.currentStationId;
          if (isFoundEnding) {
            const successor = activeTrains.find((t) => t.tripId === found.throughTripId);
            if (successor) {
              const foundOrigin = found.customOrigin || STATION_MAP.get(found.originStationId)?.name;
              if (
                foundOrigin &&
                (!successor.customOrigin || successor.customOrigin === STATION_MAP.get(successor.originStationId)?.name)
              ) {
                successor.customOrigin = foundOrigin;
              }
              if (
                found.customDestination &&
                (!successor.customDestination ||
                  successor.customDestination === STATION_MAP.get(successor.destinationStationId)?.name)
              ) {
                successor.customDestination = found.customDestination;
              }
              return successor;
            }
          }
        }

        const prev = lastSelectedTrainRef.current;
        if (
          prev &&
          (prev.tripId === found.tripId ||
            formatTrainNumber(prev.trainNumber, prev.tripId) === formatTrainNumber(found.trainNumber, found.tripId))
        ) {
          const prevOrigin = prev.customOrigin || STATION_MAP.get(prev.originStationId)?.name;
          if (prevOrigin && (!found.customOrigin || found.customOrigin === STATION_MAP.get(found.originStationId)?.name)) {
            found.customOrigin = prevOrigin;
          }
          if (
            prev.customDestination &&
            (!found.customDestination || found.customDestination === STATION_MAP.get(found.destinationStationId)?.name)
          ) {
            found.customDestination = prev.customDestination;
          }
        }
        return found;
      }
    }

    // 直通運行チェーン全体（祖先・子孫を含む全トリップ）を網羅探索
    const baseTripId = selectedTrainId || lastSelectedTrainRef.current?.tripId;
    if (baseTripId) {
      const chainTripIds = getThroughChainTripIds(baseTripId);
      const chainActive = activeTrains.find((t) => chainTripIds.has(t.tripId));
      if (chainActive) {
        const prev = lastSelectedTrainRef.current;
        if (prev) {
          const prevOrigin = prev.customOrigin || STATION_MAP.get(prev.originStationId)?.name;
          if (
            prevOrigin &&
            (!chainActive.customOrigin || chainActive.customOrigin === STATION_MAP.get(chainActive.originStationId)?.name)
          ) {
            chainActive.customOrigin = prevOrigin;
          }
          if (
            prev.customDestination &&
            (!chainActive.customDestination ||
              chainActive.customDestination === STATION_MAP.get(chainActive.destinationStationId)?.name)
          ) {
            chainActive.customDestination = prev.customDestination;
          }
        }
        return chainActive;
      }
    }

    return null;
  }, [activeTrains, selectedTrainId]);

  // 2. 選択列車が直通トリップへ切り替わった場合に selectedTrainId を同期更新
  useEffect(() => {
    if (selectedTrain) {
      lastSelectedTrainRef.current = selectedTrain;
      if (selectedTrain.tripId !== selectedTrainId) {
        setSelectedTrainId(selectedTrain.tripId);
      }
    }
  }, [selectedTrain, selectedTrainId, setSelectedTrainId]);

  // 3. 直通列車を選択中、直通チェーンに含まれる未選択路線を自動追加
  useEffect(() => {
    if (!selectedTrain) return;

    const chainTrips = getThroughChainTrips(selectedTrain.tripId);
    const neededLines: LineId[] = [];
    for (const t of chainTrips) {
      if (t.lineId && !selectedLineIds.includes(t.lineId) && !neededLines.includes(t.lineId)) {
        neededLines.push(t.lineId);
      }
    }
    if (
      selectedTrain.throughLineId &&
      !selectedLineIds.includes(selectedTrain.throughLineId) &&
      !neededLines.includes(selectedTrain.throughLineId)
    ) {
      neededLines.push(selectedTrain.throughLineId);
    }
    if (
      selectedTrain.prevLineId &&
      !selectedLineIds.includes(selectedTrain.prevLineId) &&
      !neededLines.includes(selectedTrain.prevLineId)
    ) {
      neededLines.push(selectedTrain.prevLineId);
    }

    if (neededLines.length > 0) {
      onAddLines(neededLines);
    }
  }, [selectedTrain, selectedLineIds, onAddLines]);

  // 4. 追尾中の列車が時間を巻き戻すなどして未選択路線へ移動した場合の自動ロード
  useEffect(() => {
    const baseTripId = selectedTrainId || lastSelectedTrainRef.current?.tripId;
    if (!baseTripId || selectedTrain) return;

    const chainTrips = getThroughChainTrips(baseTripId);
    const runningTrip = chainTrips.find((t) => {
      const first = t.stops[0];
      const last = t.stops[t.stops.length - 1];
      if (!first || !last) return false;
      const depSec = Math.min(
        timeStringToSeconds(first.arrivalTime || first.departureTime),
        timeStringToSeconds(first.departureTime)
      );
      const arrSec = Math.max(
        timeStringToSeconds(last.arrivalTime),
        timeStringToSeconds(last.departureTime || last.arrivalTime)
      );
      return currentSec >= depSec && currentSec <= arrSec;
    });

    if (runningTrip && runningTrip.lineId && !selectedLineIds.includes(runningTrip.lineId)) {
      onAddLines([runningTrip.lineId]);
    }
  }, [selectedTrain, selectedTrainId, currentSec, selectedLineIds, onAddLines]);

  // 5. 運行終了等で存在しなくなった場合の猶予タイマー（5秒）
  useEffect(() => {
    if ((isTrackingTrain || selectedTrainId) && !selectedTrain) {
      const baseTripId = selectedTrainId || lastSelectedTrainRef.current?.tripId;
      let isWithinOperatingWindow = false;

      if (baseTripId) {
        const chainTrips = getThroughChainTrips(baseTripId);
        if (chainTrips.length > 0) {
          const firstTrip = chainTrips[0];
          const lastTrip = chainTrips[chainTrips.length - 1];
          const firstStop = firstTrip.stops[0];
          const lastStop = lastTrip.stops[lastTrip.stops.length - 1];
          const startSec = firstStop
            ? Math.min(
                timeStringToSeconds(firstStop.arrivalTime || firstStop.departureTime),
                timeStringToSeconds(firstStop.departureTime)
              )
            : 0;
          const endSec = lastStop
            ? Math.max(
                timeStringToSeconds(lastStop.arrivalTime),
                timeStringToSeconds(lastStop.departureTime || lastStop.arrivalTime)
              )
            : 0;

          if (currentSec >= startSec && currentSec <= endSec) {
            isWithinOperatingWindow = true;
          }
        }
      }

      if (!isWithinOperatingWindow) {
        if (!missingTrainTimeoutRef.current) {
          missingTrainTimeoutRef.current = setTimeout(() => {
            setIsTrackingTrain(false);
            setSelectedTrainId(null);
            lastSelectedTrainRef.current = null;
            missingTrainTimeoutRef.current = null;
          }, 5000);
        }
      } else {
        if (missingTrainTimeoutRef.current) {
          clearTimeout(missingTrainTimeoutRef.current);
          missingTrainTimeoutRef.current = null;
        }
      }
    } else {
      if (missingTrainTimeoutRef.current) {
        clearTimeout(missingTrainTimeoutRef.current);
        missingTrainTimeoutRef.current = null;
      }
    }

    return () => {
      if (missingTrainTimeoutRef.current) {
        clearTimeout(missingTrainTimeoutRef.current);
        missingTrainTimeoutRef.current = null;
      }
    };
  }, [isTrackingTrain, selectedTrainId, selectedTrain, currentSec, setIsTrackingTrain, setSelectedTrainId]);

  const clearSelection = () => {
    setSelectedTrainId(null);
    lastSelectedTrainRef.current = null;
    setIsTrackingTrain(false);
  };

  return {
    selectedTrain,
    clearSelection,
  };
}
