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

// 分離ホーム要素（破線連絡線＋サブマーカー）の削除（格納）
function removePlatformElements(stationId: string, layer: L.LayerGroup, markers: Map<string, L.Layer>) {
  for (const dir of ['inbound', 'outbound']) {
    const subMarkerKey = `${stationId}_platform_${dir}`;
    const connectorKey = `${stationId}_platform_connector_${dir}`;
    const subMarker = markers.get(subMarkerKey);
    if (subMarker) {
      layer.removeLayer(subMarker);
      markers.delete(subMarkerKey);
    }
    const connector = markers.get(connectorKey);
    if (connector) {
      layer.removeLayer(connector);
      markers.delete(connectorKey);
    }
  }
}

// 分離ホーム要素（破線連絡線＋サブマーカー）の追加（駅選択時のみ展開）
function addPlatformElements(
  st: Station,
  map: L.Map,
  layer: L.LayerGroup,
  markers: Map<string, L.Layer>,
  onSelectStation: (st: Station) => void
) {
  if (!st.platformCoordinates) return;
  const line = getLine(st.lineId);
  const stationColor = line?.lineColor || '#004b97';
  const accentColor = line?.accentColor || '#ed6d00';

  const dirs: ('inbound' | 'outbound')[] = ['inbound', 'outbound'];
  for (const dir of dirs) {
    const pCoord = st.platformCoordinates[dir];
    if (!pCoord) continue;

    // 代表座標からの距離（メートル）
    const distM = calculateDistanceKm(st.lat, st.lng, pCoord.lat, pCoord.lng) * 1000;
    // 40m 以上離れている場合のみサブマーカーを展開
    if (distM < 40) continue;

    const subMarkerKey = `${st.id}_platform_${dir}`;
    const connectorKey = `${st.id}_platform_connector_${dir}`;

    // 1. 連絡通路ライン（破線）
    let connector = markers.get(connectorKey);
    if (!connector) {
      connector = L.polyline([[st.lat, st.lng], [pCoord.lat, pCoord.lng]], {
        color: stationColor,
        weight: 2,
        dashArray: '4, 4',
        opacity: 0.75,
        interactive: false,
      });
      markers.set(connectorKey, connector);
    }
    if (!layer.hasLayer(connector)) {
      layer.addLayer(connector);
    }

    // 2. 分離ホームのサブマーカー（駅選択時専用）
    let subMarker = markers.get(subMarkerKey);
    if (!subMarker) {
      const platformName = pCoord.name || (dir === 'outbound' ? '下りホーム' : '上りホーム');
      const subHtml = `
        <div class="station-inner relative group cursor-pointer flex flex-col items-center">
          <div class="station-dot w-3.5 h-3.5 rounded-full border-2 border-white shadow-md ring-2 ring-white/80 transition-transform hover:scale-125" style="
            background-color: ${accentColor};
          "></div>
          <div class="station-label absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-md border border-slate-300 text-[10px] font-bold text-slate-800 flex items-center gap-1.5 opacity-100">
            <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${stationColor}"></span>
            <span>${platformName}</span>
          </div>
        </div>
      `;

      const subIcon = L.divIcon({
        className: 'station-div-icon station-platform-sub-icon',
        html: subHtml,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      subMarker = L.marker([pCoord.lat, pCoord.lng], {
        icon: subIcon,
        zIndexOffset: 950,
      });

      subMarker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectStation(st);
        map.panTo([pCoord.lat, pCoord.lng], { animate: true, duration: 0.4 });
      });

      markers.set(subMarkerKey, subMarker);
    }
    if (!layer.hasLayer(subMarker)) {
      layer.addLayer(subMarker);
    }
  }
}

export function useStationMarkers({
  mapRef,
  stationLayerRef,
  selectedLineIds,
  selectedStation,
  onSelectStation,
}: UseStationMarkersOptions) {
  const onSelectStationRef = useRef(onSelectStation);
  const selectedStationRef = useRef<Station | null>(selectedStation);
  const prevSelectedStationIdRef = useRef<string | null>(null);
  const markersRef = useRef<Map<string, L.Layer>>(new Map());
  const prevStationLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    onSelectStationRef.current = onSelectStation;
  }, [onSelectStation]);

  useEffect(() => {
    selectedStationRef.current = selectedStation;
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
    const map = mapRef.current;
    if (!map || !layer) return;

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

    // 代表駅マーカーの追加（通常時は代表マーカーのみ表示）
    stations.forEach((st) => {
      const line = getLine(st.lineId);
      const stationColor = line?.lineColor || '#004b97';
      const accentColor = line?.accentColor || '#ed6d00';
      const isSelected = selectedStationRef.current?.id === st.id;
      const isMajor = st.isMajor ?? false;

      // --- 代表駅マーカー ---
      const existingMainMarker = markersRef.current.get(st.id);
      if (existingMainMarker) {
        if (!layer.hasLayer(existingMainMarker)) {
          layer.addLayer(existingMainMarker);
        }
      } else {
        const html = `
          <div class="station-inner relative group cursor-pointer flex flex-col items-center" data-station-id="${st.id}" data-is-major="${isMajor}">
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
    });

    // 選択中の駅があれば、分離ホーム要素を展開
    if (selectedStationRef.current && stationIdSet.has(selectedStationRef.current.id)) {
      addPlatformElements(
        selectedStationRef.current,
        map,
        layer,
        markersRef.current,
        (s) => onSelectStationRef.current(s)
      );
    }
  }, [mapRef, stationLayerRef, selectedLineIds]);

  // 2. 選択駅変更時のスタイル更新＆分離ホームの展開/格納
  useEffect(() => {
    const curId = selectedStation?.id || null;
    const prevId = prevSelectedStationIdRef.current;
    if (curId === prevId) return;

    const layer = stationLayerRef.current;
    const map = mapRef.current;

    // 前の選択駅のスタイルをリセット＆分離ホームを格納
    if (prevId) {
      const prevMarker = markersRef.current.get(prevId);
      if (prevMarker instanceof L.Marker) {
        prevMarker.setZIndexOffset(0);
        const el = prevMarker.getElement();
        if (el) {
          const innerEl = el.querySelector('.station-inner') as HTMLElement | null;
          const isMajor = innerEl?.dataset.isMajor === 'true';
          const dot = el.querySelector('.station-dot');
          const label = el.querySelector('.station-label');
          dot?.classList.remove('ring-4', 'scale-125');
          if (!isMajor) {
            label?.classList.remove('opacity-100');
            label?.classList.add('opacity-0');
          }
        }
      }
      if (layer) {
        removePlatformElements(prevId, layer, markersRef.current);
      }
    }

    // 新たに選択された駅のスタイルをハイライト＆分離ホームを展開
    if (curId && selectedStation) {
      const curMarker = markersRef.current.get(curId);
      if (curMarker instanceof L.Marker) {
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
      if (layer && map) {
        addPlatformElements(
          selectedStation,
          map,
          layer,
          markersRef.current,
          (s) => onSelectStationRef.current(s)
        );
      }
    }

    prevSelectedStationIdRef.current = curId;
  }, [mapRef, stationLayerRef, selectedStation]);
}
