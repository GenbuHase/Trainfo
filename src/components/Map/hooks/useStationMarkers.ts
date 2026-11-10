import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Station, LineId } from '../../../types';
import { getStations } from '../../../data/stations';
import { getLine } from '../../../data/linesRegistry';
import { calculateDistanceKm } from '../../../data/trackGeometry';

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
  const selectedStationIdRef = useRef<string | null>(selectedStation?.id ?? null);
  const prevSelectedStationIdRef = useRef<string | null>(null);
  const markersRef = useRef<Map<string, L.Layer>>(new Map());
  const prevStationLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    onSelectStationRef.current = onSelectStation;
  }, [onSelectStation]);

  useEffect(() => {
    selectedStationIdRef.current = selectedStation?.id ?? null;
  }, [selectedStation]);

  // コンポーネント破棄時またはレイヤー切り替え時のクリーンアップ
  useEffect(() => {
    const layer = stationLayerRef.current;
    const markers = markersRef.current;
    return () => {
      layer?.clearLayers();
      markers.clear();
      prevStationLayerRef.current = null;
    };
  }, [stationLayerRef]);

  // 1. 路線変更時の駅マーカー生成（必要な駅のみ差分同期）
  useEffect(() => {
    const layer = stationLayerRef.current;
    if (!mapRef.current || !layer) return;

    // レイヤーグループのインスタンスが再生成された場合はキャッシュをクリア
    if (prevStationLayerRef.current !== layer) {
      markersRef.current.clear();
      prevStationLayerRef.current = layer;
    }

    const stations = getStations(selectedLineIds);
    const stationIdSet = new Set(stations.map((s) => s.id));

    // 不要になったマーカー（およびサブマーカー・連絡線）を削除
    for (const [key, marker] of markersRef.current.entries()) {
      const baseStId = key.split('_platform_')[0];
      if (!stationIdSet.has(baseStId)) {
        layer.removeLayer(marker);
        markersRef.current.delete(key);
      }
    }

    // 新規駅マーカーおよびホーム分離駅マーカーの追加
    stations.forEach((st) => {
      const line = getLine(st.lineId);
      const stationColor = line?.lineColor || '#004b97';
      const accentColor = line?.accentColor || '#ed6d00';
      const isSelected = selectedStationIdRef.current === st.id;
      const isMajor = st.isMajor ?? false;

      // --- (A) 代表駅マーカー ---
      const existingMainMarker = markersRef.current.get(st.id);
      if (existingMainMarker) {
        if (!layer.hasLayer(existingMainMarker)) {
          layer.addLayer(existingMainMarker);
        }
      } else {
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
              ${st.stationNumber ? `<span class="font-mono text-[9px] px-1 py-0.2 rounded text-white font-semibold" style="background-color: ${stationColor}">${st.stationNumber.replace('-', '')}</span>` : ''}
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

        layer.addLayer(marker);
        markersRef.current.set(st.id, marker);
      }

      // --- (B) ホーム分離駅（platformCoordinates）のサブマーカー ＆ 連絡通路ライン ---
      if (st.platformCoordinates) {
        const dirs: ('inbound' | 'outbound')[] = ['inbound', 'outbound'];
        for (const dir of dirs) {
          const pCoord = st.platformCoordinates[dir];
          if (!pCoord) continue;

          // 代表座標からの距離（メートル）
          const distM = calculateDistanceKm(st.lat, st.lng, pCoord.lat, pCoord.lng) * 1000;
          // 40m 以上離れている場合のみサブマーカーを設置
          if (distM < 40) continue;

          const subMarkerKey = `${st.id}_platform_${dir}`;
          const connectorKey = `${st.id}_platform_connector_${dir}`;

          // 1. 連絡通路ライン（点線）
          let connector = markersRef.current.get(connectorKey);
          if (!connector) {
            connector = L.polyline([[st.lat, st.lng], [pCoord.lat, pCoord.lng]], {
              color: stationColor,
              weight: 2,
              dashArray: '4, 4',
              opacity: 0.65,
              interactive: false,
            });
            layer.addLayer(connector);
            markersRef.current.set(connectorKey, connector);
          } else if (!layer.hasLayer(connector)) {
            layer.addLayer(connector);
          }

          // 2. 分離ホームのサブ駅アイコン
          const existingSubMarker = markersRef.current.get(subMarkerKey);
          if (existingSubMarker) {
            if (!layer.hasLayer(existingSubMarker)) {
              layer.addLayer(existingSubMarker);
            }
          } else {
            const platformName = pCoord.name || (dir === 'outbound' ? '下りホーム' : '上りホーム');
            const subHtml = `
              <div class="station-inner relative group cursor-pointer flex flex-col items-center">
                <div class="station-dot w-3.5 h-3.5 rounded-full border-2 ${
                  isSelected
                    ? 'border-white ring-4 scale-125'
                    : 'border-white shadow-sm'
                } transition-transform" style="
                  background-color: ${isSelected ? accentColor : stationColor};
                  border-color: #ffffff;
                "></div>
                <div class="station-label absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-sm border border-slate-200 text-[10px] font-bold text-slate-800 transition-opacity flex items-center gap-1 opacity-90 group-hover:opacity-100">
                  <span class="font-mono text-[9px] px-1 py-0.2 rounded text-white font-semibold" style="background-color: ${stationColor}">${st.name}</span>
                  <span class="text-[9px] text-slate-600 font-medium">(${platformName})</span>
                </div>
              </div>
            `;

            const subIcon = L.divIcon({
              className: 'station-div-icon station-platform-sub-icon',
              html: subHtml,
              iconSize: [18, 18],
              iconAnchor: [9, 9],
            });

            const subMarker = L.marker([pCoord.lat, pCoord.lng], {
              icon: subIcon,
              zIndexOffset: isSelected ? 950 : 0,
            });

            subMarker.on('click', (e) => {
              L.DomEvent.stopPropagation(e);
              onSelectStationRef.current(st);
              mapRef.current?.panTo([pCoord.lat, pCoord.lng], { animate: true, duration: 0.4 });
            });

            layer.addLayer(subMarker);
            markersRef.current.set(subMarkerKey, subMarker);
          }
        }
      }
    });
  }, [mapRef, stationLayerRef, selectedLineIds]);

  // 2. 選択駅変更時のスタイル更新（全破棄せずDOM差分のみ適用）
  useEffect(() => {
    const curId = selectedStation?.id || null;
    const prevId = prevSelectedStationIdRef.current;
    if (curId === prevId) return;

    // 前の選択駅のスタイルをリセット
    if (prevId) {
      for (const [key, marker] of markersRef.current.entries()) {
        const baseStId = key.split('_platform_')[0];
        if (baseStId === prevId && marker instanceof L.Marker) {
          marker.setZIndexOffset(0);
          const el = marker.getElement();
          if (el) {
            const dot = el.querySelector('.station-dot');
            const label = el.querySelector('.station-label');
            dot?.classList.remove('ring-4', 'scale-125');
            // サブマーカーでない場合のみ非主要駅ラベルを隠す
            if (!key.includes('_platform_') && !label?.classList.contains('opacity-100')) {
              label?.classList.add('opacity-0');
            }
          }
        }
      }
    }

    // 新たに選択された駅のスタイルをハイライト
    if (curId) {
      for (const [key, marker] of markersRef.current.entries()) {
        const baseStId = key.split('_platform_')[0];
        if (baseStId === curId && marker instanceof L.Marker) {
          marker.setZIndexOffset(1000);
          const el = marker.getElement();
          if (el) {
            const dot = el.querySelector('.station-dot');
            const label = el.querySelector('.station-label');
            dot?.classList.add('ring-4', 'scale-125');
            label?.classList.remove('opacity-0');
            label?.classList.add('opacity-100');
          }
        }
      }
    }

    prevSelectedStationIdRef.current = curId;
  }, [selectedStation]);
}
