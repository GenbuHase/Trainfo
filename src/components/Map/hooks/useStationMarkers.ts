import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Station, LineId } from '../../../types';
import { getStations } from '../../../data/stations';
import { getLine } from '../../../data/linesRegistry';

interface UseStationMarkersOptions {
  mapRef: React.RefObject<L.Map | null>;
  stationLayerRef: React.RefObject<L.LayerGroup | null>;
  selectedLineIds: LineId[];
  selectedStation: Station | null;
  onSelectStation: (station: Station) => void;
}

export function useStationMarkers({
  mapRef,
  stationLayerRef,
  selectedLineIds,
  selectedStation,
  onSelectStation,
}: UseStationMarkersOptions) {
  const onSelectStationRef = useRef(onSelectStation);
  const prevSelectedStationIdRef = useRef<string | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const prevStationLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    onSelectStationRef.current = onSelectStation;
  }, [onSelectStation]);

  // コンポーネント破棄時またはレイヤー切り替え時のクリーンアップ
  useEffect(() => {
    return () => {
      stationLayerRef.current?.clearLayers();
      markersRef.current.clear();
      prevStationLayerRef.current = null;
    };
  }, [stationLayerRef]);

  // 1. 路線変更時の駅マーカー生成（必要な駅のみ差分同期）
  useEffect(() => {
    if (!mapRef.current || !stationLayerRef.current) return;

    // レイヤーグループのインスタンスが再生成された場合はキャッシュをクリア
    if (prevStationLayerRef.current !== stationLayerRef.current) {
      markersRef.current.clear();
      prevStationLayerRef.current = stationLayerRef.current;
    }

    const stations = getStations(selectedLineIds);
    const stationIdSet = new Set(stations.map((s) => s.id));

    // 不要になったマーカーを削除
    for (const [stId, marker] of markersRef.current.entries()) {
      if (!stationIdSet.has(stId)) {
        stationLayerRef.current.removeLayer(marker);
        markersRef.current.delete(stId);
      }
    }

    // 新規駅マーカーのみ追加（既存マーカーがレイヤーに載っていない場合は再追加）
    stations.forEach((st) => {
      const existingMarker = markersRef.current.get(st.id);
      if (existingMarker) {
        if (!stationLayerRef.current?.hasLayer(existingMarker)) {
          stationLayerRef.current?.addLayer(existingMarker);
        }
        return;
      }

      const isSelected = selectedStation?.id === st.id;
      const isMajor = st.isMajor ?? false;
      const line = getLine(st.lineId);
      const stationColor = line?.lineColor || '#004b97';
      const accentColor = line?.accentColor || '#ed6d00';

      const html = `
        <div class="station-inner relative group cursor-pointer flex flex-col items-center">
          <div class="station-dot w-4 h-4 rounded-full border-2 ${
            isSelected
              ? 'border-white ring-4 scale-125'
              : isMajor
              ? 'border-white shadow-md'
              : 'bg-white shadow-xs'
          } transition-transform" style="
            background-color: ${isSelected ? accentColor : (isMajor ? stationColor : '#ffffff')};
            border-color: ${isSelected ? '#ffffff' : (isMajor ? '#ffffff' : stationColor)};
          "></div>
          <div class="station-label absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-sm border border-slate-200 text-[11px] font-bold text-slate-800 transition-opacity flex items-center gap-1 ${
            isMajor || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }">
            <span class="font-mono text-[9px] px-1 py-0.2 rounded text-white font-semibold" style="background-color: ${stationColor}">${st.id.replace('-', '')}</span>
            <span>${st.name}</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'station-div-icon',
        html,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const marker = L.marker([st.lat, st.lng], {
        icon,
        zIndexOffset: isSelected ? 1000 : 0,
      });

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectStationRef.current(st);
        mapRef.current?.panTo([st.lat, st.lng], { animate: true, duration: 0.4 });
      });

      stationLayerRef.current?.addLayer(marker);
      markersRef.current.set(st.id, marker);
    });
  }, [mapRef, stationLayerRef, selectedLineIds]);

  // 2. 選択駅変更時のスタイル更新（全破棄せずDOM差分のみ適用）
  useEffect(() => {
    const curId = selectedStation?.id || null;
    const prevId = prevSelectedStationIdRef.current;
    if (curId === prevId) return;

    // 前の選択駅のスタイルをリセット
    if (prevId) {
      const prevMarker = markersRef.current.get(prevId);
      if (prevMarker) {
        prevMarker.setZIndexOffset(0);
        const el = prevMarker.getElement();
        if (el) {
          const dot = el.querySelector('.station-dot');
          const label = el.querySelector('.station-label');
          dot?.classList.remove('ring-4', 'scale-125');
          if (!label?.classList.contains('opacity-100')) {
            label?.classList.add('opacity-0');
          }
        }
      }
    }

    // 新たに選択された駅のスタイルをハイライト
    if (curId) {
      const curMarker = markersRef.current.get(curId);
      if (curMarker) {
        curMarker.setZIndexOffset(1000);
        const el = curMarker.getElement();
        if (el) {
          const dot = el.querySelector('.station-dot');
          const label = el.querySelector('.station-label');
          dot?.classList.add('ring-4', 'scale-125');
          label?.classList.remove('opacity-0');
          label?.classList.add('opacity-100');
        }
      }
    }

    prevSelectedStationIdRef.current = curId;
  }, [selectedStation]);
}
