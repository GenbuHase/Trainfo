import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { LineId, ActiveTrain } from '../../../types';
import { calculateBoundsForLines } from '../../../data/linesRegistry';

interface UseMapCameraOptions {
  mapRef: React.RefObject<L.Map | null>;
  selectedLineIds: LineId[];
  isTrackingTrain: boolean;
  trackingTrainId: string | null;
  selectedTrain?: ActiveTrain | null;
  activeTrains: ActiveTrain[];
}

export function useMapCamera({
  mapRef,
  selectedLineIds,
  isTrackingTrain,
  trackingTrainId,
  selectedTrain,
  activeTrains,
}: UseMapCameraOptions) {
  const prevLineIdsRef = useRef<string>(selectedLineIds.slice().sort().join(','));
  const prevTrackingPosRef = useRef<{ lat: number; lng: number } | null>(null);
  const isFirstTrackRef = useRef<boolean>(true);

  // 1. 選択路線変更時のカメラ自動フィット（動的バウンディングボックス）
  useEffect(() => {
    if (!mapRef.current) return;
    const currentKey = selectedLineIds.slice().sort().join(',');
    if (currentKey !== prevLineIdsRef.current) {
      prevLineIdsRef.current = currentKey;
      // 列車追従中は路線全体への flyToBounds を行わず追従カメラを最優先
      if (isTrackingTrain) return;
      const bounds = calculateBoundsForLines(selectedLineIds);
      mapRef.current.flyToBounds(bounds, {
        padding: [60, 60],
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }
  }, [mapRef, selectedLineIds, isTrackingTrain]);

  // 2. 列車追従モード初期化フラグのリセット
  useEffect(() => {
    isFirstTrackRef.current = true;
    prevTrackingPosRef.current = null;
  }, [trackingTrainId, isTrackingTrain]);

  // 3. 列車追従カメラ移動（初回はスムーズパン、追従中は直接更新でガタつきを防止）
  useEffect(() => {
    if (!isTrackingTrain || !trackingTrainId || !mapRef.current) return;
    const tracked =
      (selectedTrain && selectedTrain.tripId === trackingTrainId ? selectedTrain : null) ||
      activeTrains.find((t) => t.tripId === trackingTrainId);
    if (!tracked) return;

    if (isFirstTrackRef.current) {
      mapRef.current.panTo([tracked.currentLat, tracked.currentLng], {
        animate: true,
        duration: 0.5,
      });
      isFirstTrackRef.current = false;
      prevTrackingPosRef.current = { lat: tracked.currentLat, lng: tracked.currentLng };
    } else {
      const prev = prevTrackingPosRef.current;
      if (
        !prev ||
        Math.abs(prev.lat - tracked.currentLat) > 0.00003 ||
        Math.abs(prev.lng - tracked.currentLng) > 0.00003
      ) {
        mapRef.current.panTo([tracked.currentLat, tracked.currentLng], { animate: false });
        prevTrackingPosRef.current = { lat: tracked.currentLat, lng: tracked.currentLng };
      }
    }
  }, [mapRef, isTrackingTrain, trackingTrainId, selectedTrain, activeTrains]);
}
