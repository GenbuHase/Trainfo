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

interface PlatformDirectionInfo {
  hasSeparated: boolean;
  mainDirLabel: string | null;
  subPlatforms: Array<{
    dir: 'inbound' | 'outbound';
    dirLabel: string;
    lat: number;
    lng: number;
  }>;
}

// 分離ホーム情報の解析（代表座標と分離ホームの方向判定）
function getStationPlatformDirs(st: Station): PlatformDirectionInfo {
  if (!st.platformCoordinates) {
    return { hasSeparated: false, mainDirLabel: null, subPlatforms: [] };
  }

  const inCoord = st.platformCoordinates.inbound;
  const outCoord = st.platformCoordinates.outbound;

  const inDist = inCoord ? calculateDistanceKm(st.lat, st.lng, inCoord.lat, inCoord.lng) * 1000 : Infinity;
  const outDist = outCoord ? calculateDistanceKm(st.lat, st.lng, outCoord.lat, outCoord.lng) * 1000 : Infinity;

  const subPlatforms: PlatformDirectionInfo['subPlatforms'] = [];
  let mainDirLabel: string | null = null;

  // 代表座標から 40m 以上離れているものを分離ホームとする
  if (inDist >= 40 && inCoord) {
    subPlatforms.push({ dir: 'inbound', dirLabel: inCoord.name || '上り', lat: inCoord.lat, lng: inCoord.lng });
  } else if (inCoord) {
    mainDirLabel = inCoord.name || '上り';
  }

  if (outDist >= 40 && outCoord) {
    subPlatforms.push({ dir: 'outbound', dirLabel: outCoord.name || '下り', lat: outCoord.lat, lng: outCoord.lng });
  } else if (outCoord) {
    mainDirLabel = outCoord.name || '下り';
  }

  return {
    hasSeparated: subPlatforms.length > 0,
    mainDirLabel,
    subPlatforms,
  };
}

// 代表駅マーカーのラベル表示を更新するヘルパー
function updateMainStationLabel(
  marker: L.Marker,
  st: Station,
  isSelected: boolean
) {
  const el = marker.getElement();
  if (!el) return;

  const dot = el.querySelector('.station-dot');
  const label = el.querySelector('.station-label');
  const nameSpan = el.querySelector('.station-name-text');
  const innerEl = el.querySelector('.station-inner') as HTMLElement | null;
  const isMajor = innerEl?.dataset.isMajor === 'true';
  const baseName = innerEl?.dataset.baseName || st.name;

  if (isSelected) {
    marker.setZIndexOffset(1000);
    dot?.classList.add('ring-4', 'scale-125');
    label?.classList.remove('opacity-0');
    label?.classList.add('opacity-100');

    // 分離ホーム駅の場合、代表駅の駅名に (上り) などの方向を付加（例: 土合 (上り)）
    const { hasSeparated, mainDirLabel } = getStationPlatformDirs(st);
    if (hasSeparated && mainDirLabel && nameSpan) {
      nameSpan.textContent = `${baseName} (${mainDirLabel})`;
    }
  } else {
    marker.setZIndexOffset(0);
    dot?.classList.remove('ring-4', 'scale-125');
    if (!isMajor) {
      label?.classList.remove('opacity-100');
      label?.classList.add('opacity-0');
    }
    // 元の駅名（基本名）に戻す
    if (nameSpan) {
      nameSpan.textContent = baseName;
    }
  }
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
  const { hasSeparated, subPlatforms } = getStationPlatformDirs(st);
  if (!hasSeparated) return;

  const line = getLine(st.lineId);
  const stationColor = line?.lineColor || '#004b97';
  const accentColor = line?.accentColor || '#ed6d00';

  for (const sub of subPlatforms) {
    const subMarkerKey = `${st.id}_platform_${sub.dir}`;
    const connectorKey = `${st.id}_platform_connector_${sub.dir}`;

    // 1. 連絡通路ライン（破線）
    let connector = markers.get(connectorKey);
    if (!connector) {
      connector = L.polyline([[st.lat, st.lng], [sub.lat, sub.lng]], {
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

    // 2. 分離ホームのサブマーカー（駅選択時専用：「駅名 (下り)」表記）
    let subMarker = markers.get(subMarkerKey);
    if (!subMarker) {
      const subHtml = `
        <div class="station-inner relative group cursor-pointer flex flex-col items-center">
          <div class="station-dot w-4 h-4 rounded-full border-2 border-white ring-4 scale-125 transition-transform shadow-md" style="
            background-color: ${accentColor};
          "></div>
          <div class="station-label absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-sm border border-slate-200 text-[11px] font-bold text-slate-800 transition-opacity flex items-center gap-1 opacity-100">
            ${st.stationNumber ? `<span class="font-mono text-[9px] px-1 py-0.2 rounded text-white font-semibold" style="background-color: ${stationColor}">${st.stationNumber.replace('-', '')}</span>` : ''}
            <span>${st.name} (${sub.dirLabel})</span>
          </div>
        </div>
      `;

      const subIcon = L.divIcon({
        className: 'station-div-icon station-platform-sub-icon',
        html: subHtml,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      subMarker = L.marker([sub.lat, sub.lng], {
        icon: subIcon,
        zIndexOffset: 1000,
      });

      subMarker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectStation(st);
        map.panTo([sub.lat, sub.lng], { animate: true, duration: 0.4 });
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

      // 分離ホーム情報
      const platformDirs = getStationPlatformDirs(st);

      // --- 代表駅マーカー ---
      const existingMainMarker = markersRef.current.get(st.id);
      if (existingMainMarker) {
        if (!layer.hasLayer(existingMainMarker)) {
          layer.addLayer(existingMainMarker);
        }
      } else {
        const displayName =
          isSelected && platformDirs.hasSeparated && platformDirs.mainDirLabel
            ? `${st.name} (${platformDirs.mainDirLabel})`
            : st.name;

        const html = `
          <div class="station-inner relative group cursor-pointer flex flex-col items-center" data-station-id="${st.id}" data-is-major="${isMajor}" data-base-name="${st.name}">
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
              <span class="station-name-text">${displayName}</span>
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
        const el = prevMarker.getElement();
        const baseName = (el?.querySelector('.station-inner') as HTMLElement)?.dataset.baseName || '';
        updateMainStationLabel(prevMarker, { id: prevId, name: baseName } as Station, false);
      }
      if (layer) {
        removePlatformElements(prevId, layer, markersRef.current);
      }
    }

    // 新たに選択された駅のスタイルをハイライト＆分離ホームを展開
    if (curId && selectedStation) {
      const curMarker = markersRef.current.get(curId);
      if (curMarker instanceof L.Marker) {
        updateMainStationLabel(curMarker, selectedStation, true);
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
