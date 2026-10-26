import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { ActiveTrain } from '../../../types';
import { getLine } from '../../../data/linesRegistry';
import { STATION_MAP } from '../../../data/stations';
import { getTrackCoordinatesBetween } from '../../../data/trackGeometry';

interface UseTrainTrajectoryOptions {
  mapRef: React.RefObject<L.Map | null>;
  trajectoryLayerRef: React.RefObject<L.LayerGroup | null>;
  selectedTrain: ActiveTrain | null;
  activeTrains: ActiveTrain[];
  showTrajectory: boolean;
}

export function useTrainTrajectory({
  mapRef,
  trajectoryLayerRef,
  selectedTrain,
  activeTrains,
  showTrajectory,
}: UseTrainTrajectoryOptions) {
  // 走行中の直近軌跡座標バッファ（トリップID -> 座標配列）
  const breadcrumbsRef = useRef<Map<string, [number, number][]>>(new Map());

  useEffect(() => {
    const layer = trajectoryLayerRef.current;
    if (!mapRef.current || !layer) return;

    if (!showTrajectory) {
      layer.clearLayers();
      return;
    }

    // 表示対象列車: 選択中列車、または稼働中の試験走行・臨時列車
    const targetTrains: ActiveTrain[] = [];
    if (selectedTrain) {
      targetTrains.push(selectedTrain);
    } else {
      const testTrains = activeTrains.filter((t) => t.isTestTrain);
      if (testTrains.length > 0) {
        targetTrains.push(...testTrains);
      }
    }

    if (targetTrains.length === 0) {
      layer.clearLayers();
      return;
    }

    layer.clearLayers();

    for (const train of targetTrains) {
      const line = getLine(train.lineId);
      const lineColor = line?.lineColor || '#0284c7';
      const stops = train.stops || [];

      // 直近の現在地をブレッドクラム履歴に追加
      const currentPos: [number, number] = [train.currentLat, train.currentLng];
      if (!breadcrumbsRef.current.has(train.tripId)) {
        breadcrumbsRef.current.set(train.tripId, []);
      }
      const history = breadcrumbsRef.current.get(train.tripId)!;
      const lastPoint = history[history.length - 1];
      if (!lastPoint || lastPoint[0] !== currentPos[0] || lastPoint[1] !== currentPos[1]) {
        history.push(currentPos);
        if (history.length > 100) history.shift();
      }

      // stops 情報から走行済み経路と予定経路を算出
      if (stops.length >= 2) {
        let curIdx = -1;
        if (train.status === 'STOPPING') {
          curIdx = stops.findIndex((s) => s.stationId === train.currentStationId);
        } else {
          const nextIdx = stops.findIndex((s) => s.stationId === train.nextStationId);
          curIdx = nextIdx > 0 ? nextIdx - 1 : 0;
        }
        if (curIdx === -1) curIdx = 0;

        const traveledCoords: [number, number][] = [];
        const passedStationCoords: [number, number][] = [];

        // 始発駅〜現在駅までの線路座標を蓄積
        for (let i = 0; i < curIdx; i++) {
          const stA = stops[i].stationId;
          const stB = stops[i + 1].stationId;
          const segCoords = getTrackCoordinatesBetween(stA, stB);
          if (segCoords.length > 0) {
            traveledCoords.push(...segCoords);
          }
          const stObj = STATION_MAP.get(stA);
          if (stObj) passedStationCoords.push([stObj.lat, stObj.lng]);
        }

        // 現在走行中区間の補間
        if (train.status !== 'STOPPING' && curIdx < stops.length - 1) {
          const stA = stops[curIdx].stationId;
          const stB = stops[curIdx + 1].stationId;
          const segCoords = getTrackCoordinatesBetween(stA, stB);
          if (segCoords.length > 0) {
            const cutIdx = Math.max(1, Math.round(segCoords.length * Math.min(1, Math.max(0, train.progressPercent))));
            traveledCoords.push(...segCoords.slice(0, cutIdx));
          }
          const stObjA = STATION_MAP.get(stA);
          if (stObjA) passedStationCoords.push([stObjA.lat, stObjA.lng]);
        }

        // 現在地ピンポイント
        traveledCoords.push(currentPos);

        // 今後の予定経路（現在地〜終着駅）
        const remainingCoords: [number, number][] = [currentPos];
        if (train.status !== 'STOPPING' && curIdx < stops.length - 1) {
          const stA = stops[curIdx].stationId;
          const stB = stops[curIdx + 1].stationId;
          const segCoords = getTrackCoordinatesBetween(stA, stB);
          if (segCoords.length > 0) {
            const cutIdx = Math.max(1, Math.round(segCoords.length * Math.min(1, Math.max(0, train.progressPercent))));
            remainingCoords.push(...segCoords.slice(cutIdx));
          }
        }
        for (let i = curIdx + 1; i < stops.length - 1; i++) {
          const stA = stops[i].stationId;
          const stB = stops[i + 1].stationId;
          const segCoords = getTrackCoordinatesBetween(stA, stB);
          if (segCoords.length > 0) {
            remainingCoords.push(...segCoords);
          }
        }

        // 1. 走行済み軌跡の描画（グロー線＋実線＋アニメーション点線）
        if (traveledCoords.length >= 2) {
          // グロー背景線
          const glowLine = L.polyline(traveledCoords, {
            color: lineColor,
            weight: 8,
            opacity: 0.45,
            lineCap: 'round',
            lineJoin: 'round',
          });

          // メイン実線
          const mainLine = L.polyline(traveledCoords, {
            color: '#ffffff',
            weight: 5,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round',
          });

          // カラーインナーライン
          const innerLine = L.polyline(traveledCoords, {
            color: lineColor,
            weight: 3,
            opacity: 1,
            lineCap: 'round',
            lineJoin: 'round',
          });

          // アクセント点線（走行軌跡の進行感）
          const dashLine = L.polyline(traveledCoords, {
            color: '#38bdf8',
            weight: 2,
            dashArray: '3, 6',
            opacity: 0.9,
          });

          layer.addLayer(glowLine);
          layer.addLayer(mainLine);
          layer.addLayer(innerLine);
          layer.addLayer(dashLine);
        }

        // 2. 通過済み駅のミニドットマーカー
        for (const pt of passedStationCoords) {
          const dot = L.circleMarker(pt, {
            radius: 3,
            fillColor: '#ffffff',
            fillOpacity: 0.9,
            color: lineColor,
            weight: 2,
            interactive: false,
          });
          layer.addLayer(dot);
        }

        // 3. 今後の予定走行経路（半透明の破線）
        if (remainingCoords.length >= 2) {
          const futureLine = L.polyline(remainingCoords, {
            color: lineColor,
            weight: 3,
            dashArray: '5, 8',
            opacity: 0.6,
            lineCap: 'round',
            lineJoin: 'round',
          });
          layer.addLayer(futureLine);
        }
      } else if (history.length >= 2) {
        // stops 情報が不足している場合は蓄積したブレッドクラム履歴から直接描画
        const histLine = L.polyline(history, {
          color: lineColor,
          weight: 4,
          opacity: 0.85,
          dashArray: '4, 6',
          lineCap: 'round',
        });
        layer.addLayer(histLine);
      }
    }

    return () => {
      layer.clearLayers();
    };
  }, [mapRef, trajectoryLayerRef, selectedTrain, activeTrains, showTrajectory]);
}
