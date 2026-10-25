import { useEffect } from 'react';
import L from 'leaflet';
import type { LineId } from '../../../types';
import { getLine } from '../../../data/linesRegistry';

interface UseTrackPolylinesOptions {
  mapRef: React.RefObject<L.Map | null>;
  polylineLayerRef: React.RefObject<L.LayerGroup | null>;
  selectedLineIds: LineId[];
}

export function useTrackPolylines({
  mapRef,
  polylineLayerRef,
  selectedLineIds,
}: UseTrackPolylinesOptions) {
  useEffect(() => {
    const layer = polylineLayerRef.current;
    if (!mapRef.current || !layer) return;
    layer.clearLayers();

    for (const lineId of selectedLineIds) {
      const line = getLine(lineId);
      if (!line) continue;

      // 路線セグメントごとに座標配列を収集（分岐・支線に対応したマルチポリライン）
      const segmentCoords = line.trackSegments
        .map((seg) => seg.coordinates)
        .filter((c) => c && c.length >= 2);

      if (segmentCoords.length === 0) continue;

      // 1. 白グロー線
      const glowLine = L.polyline(segmentCoords, {
        color: '#ffffff',
        weight: 8,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // 2. メインライン
      const mainLine = L.polyline(segmentCoords, {
        color: line.lineColor,
        weight: 5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // 3. アクセント点線
      const accentDashLine = L.polyline(segmentCoords, {
        color: line.accentColor || '#ffffff',
        weight: 2,
        dashArray: '6, 12',
        opacity: 0.9,
      });

      layer.addLayer(glowLine);
      layer.addLayer(mainLine);
      layer.addLayer(accentDashLine);
    }

    return () => {
      layer.clearLayers();
    };
  }, [mapRef, polylineLayerRef, selectedLineIds]);
}
