import { useEffect, useRef, useMemo } from 'react';
import type { ActiveTrain, LineId } from '../types';
import { STATION_MAP } from '../data/stations';
import {
  getThroughChainTrips,
  timeStringToSeconds,
  getGlobalTripMap,
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

interface CouplingConfigItem {
  tripId: string;
  coupling: NonNullable<import('../types').TimetableTrip['coupling']>;
}

/**
 * 指定したtripId、またはその直通運行チェーン内に存在するすべての併結設定を取得
 */
function findAllCouplingConfigs(tripId: string): CouplingConfigItem[] {
  const tripMap = getGlobalTripMap();
  const results: CouplingConfigItem[] = [];
  const seenTripIds = new Set<string>();

  const chainTrips = getThroughChainTrips(tripId);
  const allTrips = chainTrips.length > 0 ? chainTrips : [tripMap.get(tripId)].filter(Boolean) as import('../types').TimetableTrip[];

  for (const t of allTrips) {
    if (t.coupling && !seenTripIds.has(t.tripId)) {
      seenTripIds.add(t.tripId);
      results.push({ tripId: t.tripId, coupling: t.coupling });
    }
  }
  return results;
}

/**
 * 直通運転および併結運転の自動ハンドオーバー・自動路線追加・追尾猶予タイマーを管理するカスタムフック
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

  // selectedTrainId が明示的に解除された場合は直前の履歴をクリア
  useEffect(() => {
    if (!selectedTrainId) {
      lastSelectedTrainRef.current = null;
    }
  }, [selectedTrainId]);

  // 1. 選択中の列車オブジェクトをリアルタイム算出（直通運転チェーンおよび併結運転の網羅探索）
  const selectedTrain = useMemo(() => {
    // 列車が選択されていない場合は常に null
    if (!selectedTrainId) {
      return null;
    }

    // 自系統の直通運行チェーン全体（祖先・子孫を含む全トリップ）を取得
    const chainTrips = getThroughChainTrips(selectedTrainId);
    const chainTripIds = new Set(chainTrips.map((t) => t.tripId));

    // A. 現在選択されている tripId または直通チェーン内のトリップが activeTrains 内に直接存在するか確認
    let selfActive = activeTrains.find((t) => t.tripId === selectedTrainId);
    if (!selfActive && chainTrips.length > 0) {
      const candidates = activeTrains.filter((t) => chainTripIds.has(t.tripId));
      if (candidates.length > 0) {
        // chainTrips は時系列順。複数候補がある場合はより進行方向（後続トリップ）を優先
        candidates.sort((a, b) => {
          const idxA = chainTrips.findIndex((ct) => ct.tripId === a.tripId);
          const idxB = chainTrips.findIndex((ct) => ct.tripId === b.tripId);
          return idxB - idxA;
        });
        selfActive = candidates[0];
      }
    }

    // B. 直通列車の境界駅ハンドオーバー判定
    if (selfActive?.throughTripId) {
      const throughTripId = selfActive.throughTripId;
      const lastStop = selfActive.stops[selfActive.stops.length - 1];
      const isAtLastStop = lastStop?.stationId === selfActive.currentStationId;
      // 特急等の通過駅の場合: 最後の駅に向かって走行中（nextStationIdが最後の駅）または通過駅にいる
      const isApproachingOrPassingLastStop =
        Boolean(lastStop?.isPassing) &&
        (selfActive.nextStationId === lastStop?.stationId || selfActive.currentStationId === lastStop?.stationId);

      const successor = activeTrains.find((t) => t.tripId === throughTripId);
      if (successor) {
        // 先行列車が終着駅に到着/通過中、または後続列車が既に運行開始している場合
        const isSuccessorRunning =
          successor.currentStationId !== successor.stops[0]?.stationId ||
          (successor.status === 'RUNNING' && successor.progressPercent > 0);

        if (isAtLastStop || isApproachingOrPassingLastStop || isSuccessorRunning) {
          const foundOrigin = selfActive.customOrigin || STATION_MAP.get(selfActive.originStationId)?.name;
          if (
            foundOrigin &&
            (!successor.customOrigin || successor.customOrigin === STATION_MAP.get(successor.originStationId)?.name)
          ) {
            successor.customOrigin = foundOrigin;
          }
          if (
            selfActive.customDestination &&
            !successor.customDestination &&
            !selfActive.isCoupledActive
          ) {
            successor.customDestination = selfActive.customDestination;
          }
          if (selfActive.trainName && !successor.trainName) {
            successor.trainName = selfActive.trainName;
          }
          selfActive = successor;
        }
      }
    }

    // C. 併結運転（Coupling）のハンドオーバー判定
    // 自列車の直通運行チェーン内に存在するすべての併結設定から、現在運行中かつ併結アクティブな主編成（PRIMARY）を探索
    const couplingConfigs = findAllCouplingConfigs(selectedTrainId);
    for (const info of couplingConfigs) {
      const coupledTripId = info.coupling.coupledTripId;
      const coupledChain = getThroughChainTrips(coupledTripId);
      const coupledChainIds = new Set(coupledChain.map((t) => t.tripId));
      coupledChainIds.add(coupledTripId);

      // 併結相手（PRIMARY）で現在運行中かつ併結アクティブな列車を探索
      const primaryCandidate = activeTrains.find(
        (t) => coupledChainIds.has(t.tripId) && Boolean(t.isCoupledActive)
      );

      if (primaryCandidate) {
        // 自列車が SECONDARY の場合：
        // 1) 自列車が activeTrains に存在しない（除外済み）
        // 2) 自列車が既に isCoupledActive === true
        // 3) 自列車が併結開始駅（fromStationId）に到着している
        // のいずれかであれば、主編成（PRIMARY）へハンドオーバー
        if (
          !selfActive ||
          selfActive.isCoupledActive ||
          (info.coupling.role === 'SECONDARY' &&
            selfActive.currentStationId === info.coupling.fromStationId)
        ) {
          // 自列車（SECONDARY）本来の始発駅をチェーン情報から探索
          const selfChain = getThroughChainTrips(selectedTrainId);
          const firstSelfTrip = selfChain[0];
          const selfOrigin =
            firstSelfTrip?.customOrigin ||
            (firstSelfTrip ? STATION_MAP.get(firstSelfTrip.originStationId)?.name : undefined);

          // primaryCandidate 自体のオブジェクトを汚染しないようシャローコピーを作成し、
          // 自列車の始発駅を反映して返す
          const delegatedTrain: ActiveTrain = {
            ...primaryCandidate,
            customOrigin: selfOrigin || primaryCandidate.customOrigin,
          };
          return delegatedTrain;
        }
      }
    }

    // D. 自系統が運行中の場合は selfActive を返す
    if (selfActive) {
      const selfChain = getThroughChainTrips(selectedTrainId);
      const firstSelfTrip = selfChain[0];
      const selfOrigin =
        firstSelfTrip?.customOrigin ||
        (firstSelfTrip ? STATION_MAP.get(firstSelfTrip.originStationId)?.name : undefined);
      if (
        selfOrigin &&
        (!selfActive.customOrigin || selfActive.customOrigin === STATION_MAP.get(selfActive.originStationId)?.name)
      ) {
        selfActive.customOrigin = selfOrigin;
      }
      return selfActive;
    }

    return null;
  }, [activeTrains, selectedTrainId]);

  // 2. 選択列車が直通トリップへ切り替わった場合に selectedTrainId を同期更新
  // ※ 併結代理追尾中（自系統の直通チェーン外である PRIMARY 列車を追尾中）は、
  // 解結時や巻き戻し時に元の自系統へ自動復帰できるよう selectedTrainId を上書きしない
  useEffect(() => {
    if (selectedTrain && selectedTrainId) {
      lastSelectedTrainRef.current = selectedTrain;

      const chainTrips = getThroughChainTrips(selectedTrainId);
      const chainTripIds = new Set(chainTrips.map((t) => t.tripId));

      // 自系統の直通チェーンに含まれる正規の直通先トリップの場合のみ selectedTrainId を更新
      if (chainTripIds.has(selectedTrain.tripId) && selectedTrain.tripId !== selectedTrainId) {
        setSelectedTrainId(selectedTrain.tripId);
      }
    }
  }, [selectedTrain, selectedTrainId, setSelectedTrainId]);

  // 3. 直通列車・併結列車を選択中、直通チェーンおよび併結相手に含まれる未選択路線を自動追加
  useEffect(() => {
    if (!selectedTrain) return;

    const baseTripId = selectedTrainId || selectedTrain.tripId;
    const chainTrips = getThroughChainTrips(baseTripId);
    const neededLines: LineId[] = [];

    // 自系統の直通チェーンの路線
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

    // 併結相手の直通チェーンの路線も自動追加
    const couplingConfigs = findAllCouplingConfigs(baseTripId);
    for (const info of couplingConfigs) {
      if (info.coupling.coupledTripId) {
        const coupledChain = getThroughChainTrips(info.coupling.coupledTripId);
        for (const t of coupledChain) {
          if (t.lineId && !selectedLineIds.includes(t.lineId) && !neededLines.includes(t.lineId)) {
            neededLines.push(t.lineId);
          }
        }
      }
    }

    if (neededLines.length > 0) {
      onAddLines(neededLines);
    }
  }, [selectedTrain, selectedTrainId, selectedLineIds, onAddLines]);

  // 4. 追尾中の列車が時間を巻き戻すなどして未選択路線へ移動した場合の自動ロード
  useEffect(() => {
    const baseTripId = selectedTrainId || lastSelectedTrainRef.current?.tripId;
    if (!baseTripId || selectedTrain) return;

    const chainTrips = getThroughChainTrips(baseTripId);
    const allTrips = [...chainTrips];
    const couplingConfigs = findAllCouplingConfigs(baseTripId);
    for (const info of couplingConfigs) {
      if (info.coupling.coupledTripId) {
        const coupledChain = getThroughChainTrips(info.coupling.coupledTripId);
        allTrips.push(...coupledChain);
      }
    }

    const runningTrip = allTrips.find((t) => {
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
        const allTrips = [...chainTrips];
        const couplingConfigs = findAllCouplingConfigs(baseTripId);
        for (const info of couplingConfigs) {
          if (info.coupling.coupledTripId) {
            const coupledChain = getThroughChainTrips(info.coupling.coupledTripId);
            allTrips.push(...coupledChain);
          }
        }

        if (allTrips.length > 0) {
          let minStartSec = Infinity;
          let maxEndSec = -Infinity;

          for (const trip of allTrips) {
            const firstStop = trip.stops[0];
            const lastStop = trip.stops[trip.stops.length - 1];
            if (firstStop) {
              const start = Math.min(
                timeStringToSeconds(firstStop.arrivalTime || firstStop.departureTime),
                timeStringToSeconds(firstStop.departureTime)
              );
              if (start < minStartSec) minStartSec = start;
            }
            if (lastStop) {
              const end = Math.max(
                timeStringToSeconds(lastStop.arrivalTime),
                timeStringToSeconds(lastStop.departureTime || lastStop.arrivalTime)
              );
              if (end > maxEndSec) maxEndSec = end;
            }
          }

          if (Number.isFinite(minStartSec) && Number.isFinite(maxEndSec)) {
            if (currentSec >= minStartSec && currentSec <= maxEndSec) {
              isWithinOperatingWindow = true;
            }
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
