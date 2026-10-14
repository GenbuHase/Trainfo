import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { ActiveTrain, Direction } from '../../../types';
import { STATION_MAP } from '../../../data/stations';
import { formatTrainNumber } from '../../../data/timetableData';
import { isLocalTrainType } from '../../../data/trainTypes';
import { getTrainTypeConfig } from '../../../data/linesRegistry';

function generateTrainMarkerHtml(train: ActiveTrain, isSelected: boolean): string {
  const typeConfig = getTrainTypeConfig(train.trainType, train.lineId);
  const destSt = STATION_MAP.get(train.destinationStationId);
  const destText = train.customDestination || destSt?.name || '行先';
  const trainNo = formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
  const rotationDeg = train.heading;

  return `
    <div class="train-marker-inner relative cursor-pointer group flex flex-col items-center select-none">
      <!-- 選択ハイライトパルス（選択時のみDOM生成しGPUアニメーション負荷を極小化） -->
      ${isSelected ? '<div class="train-pulse absolute -inset-2 rounded-full bg-amber-400 opacity-75 animate-ping"></div>' : ''}

      <!-- 列車バッジ本体 (GPU負荷の高いfilter:drop-shadowを排しbox-shadow/borderで最適化) -->
      <div class="train-badge relative flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-[11px] shadow-md ${
        isSelected ? 'scale-125 ring-2 ring-white shadow-xl' : 'hover:scale-110'
      }" style="background-color: ${typeConfig.bgColor}; border: 2px solid #ffffff;">
        <!-- 進行方向ポインタ (バッジ中心を軸に外周上を滑らかに回転) -->
        <div class="train-arrow-pointer absolute inset-0 flex items-center justify-center pointer-events-none"
             data-rotation="${rotationDeg}"
             style="transform: rotate(${rotationDeg}deg);">
          <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[4px] border-x-transparent border-b-[6px] border-b-white"></div>
        </div>
        
        <!-- 電車アイコン -->
        <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="16" height="16" x="4" y="3" rx="2"></rect>
          <path d="M4 11h16"></path>
          <path d="M12 3v8"></path>
          <path d="m8 19-2 3"></path>
          <path d="m16 19 2 3"></path>
          <circle cx="8" cy="15" r="1" fill="currentColor"></circle>
          <circle cx="16" cy="15" r="1" fill="currentColor"></circle>
        </svg>

        <!-- 遅延バッジ -->
        <span class="train-delay absolute -bottom-1 -right-1 bg-red-600 text-white text-[9px] font-black px-1 rounded-full border border-white leading-none py-0.5 ${
          train.delayMinutes > 0 ? '' : 'hidden'
        }">${train.delayMinutes > 0 ? `+${train.delayMinutes}` : ''}</span>
      </div>

      <!-- 列車情報ラベル (ホバーまたは選択時) -->
      <div class="train-info-label absolute top-8 pointer-events-none whitespace-nowrap bg-slate-900/95 text-white px-2 py-0.5 rounded shadow-lg text-[10px] font-sans font-bold flex items-center gap-1.5 transition-opacity ${
        isSelected ? 'opacity-100 ring-1 ring-amber-400' : 'opacity-0 group-hover:opacity-100'
      }">
        <span class="train-type-badge px-1 py-0.2 rounded text-[9px] text-white font-bold" style="background-color: ${typeConfig.bgColor}">${typeConfig.shortName}</span>
        <span class="train-dest">${destText}</span>
        <span class="train-no text-slate-400 font-mono font-normal">${trainNo}</span>
      </div>
    </div>
  `;
}

function updateTrainMarkerDom(el: HTMLElement, train: ActiveTrain, isSelected: boolean) {
  let pulseEl = el.querySelector('.train-pulse');
  if (isSelected) {
    if (!pulseEl) {
      pulseEl = document.createElement('div');
      pulseEl.className = 'train-pulse absolute -inset-2 rounded-full bg-amber-400 opacity-75 animate-ping';
      el.querySelector('.train-marker-inner')?.prepend(pulseEl);
    }
  } else if (pulseEl) {
    pulseEl.remove();
  }

  const badgeEl = el.querySelector('.train-badge');
  if (badgeEl) {
    badgeEl.classList.toggle('scale-125', isSelected);
    badgeEl.classList.toggle('ring-2', isSelected);
    badgeEl.classList.toggle('ring-white', isSelected);
    badgeEl.classList.toggle('shadow-xl', isSelected);
    badgeEl.classList.toggle('hover:scale-110', !isSelected);
  }

  const pointerEl = el.querySelector<HTMLElement>('.train-arrow-pointer');
  if (pointerEl) {
    const rawPrev = pointerEl.getAttribute('data-rotation');
    const prevRotation = rawPrev ? parseFloat(rawPrev) : train.heading;
    const diff = ((train.heading - (prevRotation % 360) + 540) % 360) - 180;
    const continuousRotation = prevRotation + diff;
    pointerEl.setAttribute('data-rotation', continuousRotation.toString());
    pointerEl.style.transform = `rotate(${continuousRotation}deg)`;
  }

  const delayEl = el.querySelector('.train-delay');
  if (delayEl) {
    if (train.delayMinutes > 0) {
      delayEl.textContent = `+${train.delayMinutes}`;
      delayEl.classList.remove('hidden');
    } else {
      delayEl.classList.add('hidden');
    }
  }

  const infoLabelEl = el.querySelector('.train-info-label');
  if (infoLabelEl) {
    infoLabelEl.classList.toggle('opacity-100', isSelected);
    infoLabelEl.classList.toggle('ring-1', isSelected);
    infoLabelEl.classList.toggle('ring-amber-400', isSelected);
    infoLabelEl.classList.toggle('opacity-0', !isSelected);
  }

  const destEl = el.querySelector('.train-dest');
  if (destEl) {
    const destSt = STATION_MAP.get(train.destinationStationId);
    const destText = train.customDestination || destSt?.name || '行先';
    if (destEl.textContent !== destText) {
      destEl.textContent = destText;
    }
  }

  const trainNoEl = el.querySelector('.train-no');
  if (trainNoEl) {
    const curNo = formatTrainNumber(train.trainNumber, train.trainId, train.tripId);
    if (trainNoEl.textContent !== curNo) {
      trainNoEl.textContent = curNo;
    }
  }
}

interface UseTrainMarkersOptions {
  mapRef: React.RefObject<L.Map | null>;
  trainLayerRef: React.RefObject<L.LayerGroup | null>;
  activeTrains: ActiveTrain[];
  selectedTrain: ActiveTrain | null;
  filterDirection: 'all' | Direction;
  filterType: 'all' | 'rapid' | 'local';
  onSelectTrain: (train: ActiveTrain) => void;
}

export function useTrainMarkers({
  mapRef,
  trainLayerRef,
  activeTrains,
  selectedTrain,
  filterDirection,
  filterType,
  onSelectTrain,
}: UseTrainMarkersOptions) {
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const latestTrainsMapRef = useRef<Map<string, ActiveTrain>>(new Map());
  const onSelectTrainRef = useRef(onSelectTrain);
  const prevTrainLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    onSelectTrainRef.current = onSelectTrain;
  }, [onSelectTrain]);

  // コンポーネント破棄時またはレイヤー切り替え時のクリーンアップ
  useEffect(() => {
    return () => {
      trainLayerRef.current?.clearLayers();
      markersRef.current.clear();
      prevTrainLayerRef.current = null;
    };
  }, [trainLayerRef]);

  // activeTrains が更新された時に tripId -> ActiveTrain マップを同期
  useEffect(() => {
    const map = new Map<string, ActiveTrain>();
    activeTrains.forEach((t) => map.set(t.tripId, t));
    latestTrainsMapRef.current = map;
  }, [activeTrains]);

  // 列車マーカーのリアルタイム描画 & 更新（インスタンスをキャッシュ・差分更新してチカチカとクリック不能を解消）
  useEffect(() => {
    if (!mapRef.current || !trainLayerRef.current) return;

    // レイヤーグループのインスタンスが再生成された場合はキャッシュをクリア
    if (prevTrainLayerRef.current !== trainLayerRef.current) {
      markersRef.current.clear();
      prevTrainLayerRef.current = trainLayerRef.current;
    }

    // フィルタリング（進行方向・種別）
    const filteredTrains = activeTrains.filter((train) => {
      if (filterDirection !== 'all' && train.direction !== filterDirection) return false;
      const isLocal = isLocalTrainType(train.trainType);
      if (filterType === 'rapid' && isLocal) return false;
      if (filterType === 'local' && !isLocal) return false;
      return true;
    });

    const currentVisibleTripIds = new Set<string>();

    filteredTrains.forEach((train) => {
      currentVisibleTripIds.add(train.tripId);
      const isSelected = selectedTrain?.tripId === train.tripId;
      const existingMarker = markersRef.current.get(train.tripId);

      if (existingMarker) {
        if (!trainLayerRef.current?.hasLayer(existingMarker)) {
          trainLayerRef.current?.addLayer(existingMarker);
        }

        // 既存マーカーの位置を滑らかに更新（DOMは破棄されない）
        const curLatLng = existingMarker.getLatLng();
        if (curLatLng.lat !== train.currentLat || curLatLng.lng !== train.currentLng) {
          existingMarker.setLatLng([train.currentLat, train.currentLng]);
        }

        const targetZIndex = isSelected ? 1000 : 500;
        if (existingMarker.options.zIndexOffset !== targetZIndex) {
          existingMarker.setZIndexOffset(targetZIndex);
        }

        const el = existingMarker.getElement();
        if (el) {
          updateTrainMarkerDom(el, train, isSelected);
        }
      } else {
        // 新規マーカー生成
        const html = generateTrainMarkerHtml(train, isSelected);
        const icon = L.divIcon({
          className: 'train-div-icon',
          html,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([train.currentLat, train.currentLng], {
          icon,
          zIndexOffset: isSelected ? 1000 : 500,
        });

        marker.on('click', (e) => {
          L.DomEvent.stopPropagation(e);
          const currentTrain = latestTrainsMapRef.current.get(train.tripId);
          if (currentTrain) {
            onSelectTrainRef.current(currentTrain);
          }
        });

        trainLayerRef.current?.addLayer(marker);
        markersRef.current.set(train.tripId, marker);
      }
    });

    // 画面外または非表示になったマーカーの削除
    for (const [tripId, marker] of markersRef.current.entries()) {
      if (!currentVisibleTripIds.has(tripId)) {
        trainLayerRef.current?.removeLayer(marker);
        markersRef.current.delete(tripId);
      }
    }
  }, [mapRef, trainLayerRef, activeTrains, selectedTrain, filterDirection, filterType]);

  return { markersRef };
}
