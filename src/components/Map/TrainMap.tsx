import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
import './smoothWheelZoom';
import type { Station, ActiveTrain, Direction, LineId } from '../../types';
import { getStations, STATION_MAP } from '../../data/stations';
import { formatTrainNumber } from '../../data/timetableData';
import { getLine, calculateBoundsForLines, getTrainTypeConfig } from '../../data/linesRegistry';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Locate,
  LocateFixed,
  Loader2,
} from 'lucide-react';

interface TrainMapProps {
  activeTrains: ActiveTrain[];
  selectedStation: Station | null;
  selectedTrain: ActiveTrain | null;
  onSelectStation: (station: Station) => void;
  onSelectTrain: (train: ActiveTrain) => void;
  isTrackingTrain: boolean;
  trackingTrainId: string | null;
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
  selectedLineIds: LineId[];
  filterDirection: 'all' | Direction;
  filterType: 'all' | 'rapid' | 'local';
  isTimeControllerExpanded?: boolean;
  onStopTracking?: () => void;
}

type TileType = 'standard' | 'satellite' | 'dark';

function generateTrainMarkerHtml(train: ActiveTrain, isSelected: boolean): string {
  const typeConfig = getTrainTypeConfig(train.trainType, train.lineId);
  const destSt = STATION_MAP.get(train.destinationStationId);
  const destText = train.customDestination || destSt?.name || '行先';
  const trainNo = formatTrainNumber(train.trainNumber, train.tripId);
  const rotationDeg = train.heading;

  return `
    <div class="train-marker-inner relative cursor-pointer group flex flex-col items-center select-none" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));">
      <!-- 選択ハイライトパルス -->
      <div class="train-pulse absolute -inset-2 rounded-full bg-amber-400 opacity-75 animate-ping ${isSelected ? '' : 'hidden'}"></div>

      <!-- 列車バッジ本体 -->
      <div class="train-badge relative flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-[11px] transition-transform ${
        isSelected ? 'scale-125 ring-2 ring-white shadow-xl' : 'hover:scale-110'
      }" style="background-color: ${typeConfig.bgColor}; border: 2px solid #ffffff;">
        <!-- 進行方向ポインタ (バッジ中心を軸に外周上を滑らかに回転) -->
        <div class="train-arrow-pointer absolute inset-0 flex items-center justify-center pointer-events-none"
             data-rotation="${rotationDeg}"
             style="transform: rotate(${rotationDeg}deg);">
          <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[4px] border-x-transparent border-b-[6px] border-b-white"
               style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.5));"></div>
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
  // 選択パルス表示切り替え
  const pulseEl = el.querySelector('.train-pulse');
  if (pulseEl) {
    pulseEl.classList.toggle('hidden', !isSelected);
  }

  // バッジ本体のスタイル・クラス
  const badgeEl = el.querySelector('.train-badge');
  if (badgeEl) {
    badgeEl.classList.toggle('scale-125', isSelected);
    badgeEl.classList.toggle('ring-2', isSelected);
    badgeEl.classList.toggle('ring-white', isSelected);
    badgeEl.classList.toggle('shadow-xl', isSelected);
    badgeEl.classList.toggle('hover:scale-110', !isSelected);
  }

  // 進行方向ポインタ（最短角度差分・連続角度で360度大逆回転を防止）
  const pointerEl = el.querySelector<HTMLElement>('.train-arrow-pointer');
  if (pointerEl) {
    const rawPrev = pointerEl.getAttribute('data-rotation');
    const prevRotation = rawPrev ? parseFloat(rawPrev) : train.heading;
    // 0°/360°境界を最短距離（-180°〜+180°）で跨ぐ連続角度を計算
    const diff = ((train.heading - (prevRotation % 360) + 540) % 360) - 180;
    const continuousRotation = prevRotation + diff;
    pointerEl.setAttribute('data-rotation', continuousRotation.toString());
    pointerEl.style.transform = `rotate(${continuousRotation}deg)`;
  }

  // 遅延バッジ
  const delayEl = el.querySelector('.train-delay');
  if (delayEl) {
    if (train.delayMinutes > 0) {
      delayEl.textContent = `+${train.delayMinutes}`;
      delayEl.classList.remove('hidden');
    } else {
      delayEl.classList.add('hidden');
    }
  }

  // 列車情報ラベル（フォーカス選択時は常時表示）
  const infoLabelEl = el.querySelector('.train-info-label');
  if (infoLabelEl) {
    infoLabelEl.classList.toggle('opacity-100', isSelected);
    infoLabelEl.classList.toggle('ring-1', isSelected);
    infoLabelEl.classList.toggle('ring-amber-400', isSelected);
    infoLabelEl.classList.toggle('opacity-0', !isSelected);
  }

  // 行先
  const destEl = el.querySelector('.train-dest');
  if (destEl) {
    const destSt = STATION_MAP.get(train.destinationStationId);
    const destText = train.customDestination || destSt?.name || '行先';
    if (destEl.textContent !== destText) {
      destEl.textContent = destText;
    }
  }
}

export const TrainMap: React.FC<TrainMapProps> = ({
  activeTrains,
  selectedStation,
  selectedTrain,
  onSelectStation,
  onSelectTrain,
  isTrackingTrain,
  trackingTrainId,
  isSidebarOpen = false,
  onCloseSidebar,
  selectedLineIds,
  filterDirection,
  filterType,
  isTimeControllerExpanded = false,
  onStopTracking,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const stationLayerRef = useRef<L.LayerGroup | null>(null);
  const trainLayerRef = useRef<L.LayerGroup | null>(null);
  const polylineLayerRef = useRef<L.LayerGroup | null>(null);
  const locationLayerRef = useRef<L.LayerGroup | null>(null);
  const locationWatchIdRef = useRef<number | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);

  // 列車マーカーのキャッシュと追従管理用Refs
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const latestTrainsMapRef = useRef<Map<string, ActiveTrain>>(new Map());
  const onSelectTrainRef = useRef(onSelectTrain);
  useEffect(() => {
    onSelectTrainRef.current = onSelectTrain;
  }, [onSelectTrain]);
  const prevTrackingPosRef = useRef<{ lat: number; lng: number } | null>(null);
  const isFirstTrackRef = useRef<boolean>(true);

  // 現在地取得関連の状態
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isTrackingLocation, setIsTrackingLocation] = useState<boolean>(false);
  const [locationErrorMessage, setLocationErrorMessage] = useState<string | null>(null);

  const [tileType, setTileType] = useState<TileType>('standard');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // CARTO APIキー（設定されている場合はCARTO Dark Matter、未設定時はOSMにCSSダークフィルターを適用）
  const cartoApiKey = (import.meta.env.VITE_CARTO_API_KEY as string | undefined)?.trim();

  // 地図タイルのURLマッピング
  const tileUrls = useMemo<Record<TileType, { url: string; attribution: string }>>(() => ({
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri',
    },
    dark: {
      url: cartoApiKey
        ? `https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png?key=${cartoApiKey}`
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: cartoApiKey
        ? '&copy; OpenStreetMap contributors &copy; CARTO'
        : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  }), [cartoApiKey]);

  // 地図の初期化
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // 初期表示範囲（両路線が見渡せる範囲）
    const initialBounds = calculateBoundsForLines(selectedLineIds);

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      scrollWheelZoom: false, // 標準のステップ式スクロールを無効化
      smoothWheelZoom: true,  // 慣性付き滑らかスクロールズームを有効化
      smoothSensitivity: 2,   // スムースズームの感度
      zoomSnap: 0,            // スナップを無効化し完全無段階にする
      zoomDelta: 0.5,        // ボタン押下時の拡大・縮小刻み幅
    });

    map.fitBounds(initialBounds, { padding: [40, 40] });

    const tile = L.tileLayer(tileUrls.standard.url, {
      attribution: tileUrls.standard.attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tile;
    polylineLayerRef.current = L.layerGroup().addTo(map);
    stationLayerRef.current = L.layerGroup().addTo(map);
    trainLayerRef.current = L.layerGroup().addTo(map);
    locationLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // 地図背景クリックでサイドバーを閉じる
    map.on('click', () => {
      onCloseSidebar?.();
    });

    // 地図ドラッグ操作で現在地追従を解除
    map.on('dragstart', () => {
      setIsTrackingLocation(false);
    });

    // リサイズハンドラ
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    const markers = markersRef.current;
    return () => {
      if (locationWatchIdRef.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(locationWatchIdRef.current);
        locationWatchIdRef.current = null;
      }
      if (errorTimeoutRef.current !== null) {
        window.clearTimeout(errorTimeoutRef.current);
      }
      resizeObserver.disconnect();
      markers.clear();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // 選択路線変更時のカメラ自動フィット（動的バウンディングボックス）
  const prevLineIdsRef = useRef<string>(selectedLineIds.slice().sort().join(','));
  useEffect(() => {
    if (!mapRef.current) return;
    const currentKey = selectedLineIds.slice().sort().join(',');
    if (currentKey !== prevLineIdsRef.current) {
      prevLineIdsRef.current = currentKey;
      const bounds = calculateBoundsForLines(selectedLineIds);
      mapRef.current.flyToBounds(bounds, {
        padding: [60, 60],
        duration: 0.8,
        easeLinearity: 0.25,
      });
    }
  }, [selectedLineIds]);

  // サイドバー開閉時の地図サイズ追従
  useEffect(() => {
    if (!mapRef.current) return;
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 320);
    return () => clearTimeout(timer);
  }, [isSidebarOpen]);

  // タイル切り替え
  useEffect(() => {
    if (!mapRef.current || !tileLayerRef.current) return;
    const currentTile = tileUrls[tileType];
    tileLayerRef.current.setUrl(currentTile.url);

    if (mapRef.current.attributionControl) {
      const control = mapRef.current.attributionControl;
      Object.values(tileUrls).forEach((t) => control.removeAttribution(t.attribution));
      control.addAttribution(currentTile.attribution);
    }
  }, [tileType, tileUrls]);

  // 路線別ポリラインの動的描画
  useEffect(() => {
    if (!mapRef.current || !polylineLayerRef.current) return;
    polylineLayerRef.current.clearLayers();

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

      polylineLayerRef.current.addLayer(glowLine);
      polylineLayerRef.current.addLayer(mainLine);
      polylineLayerRef.current.addLayer(accentDashLine);
    }
  }, [selectedLineIds]);

  // 駅マーカーの描画
  useEffect(() => {
    if (!mapRef.current || !stationLayerRef.current) return;
    stationLayerRef.current.clearLayers();

    const stations = getStations(selectedLineIds);

    stations.forEach((st) => {
      const isSelected = selectedStation?.id === st.id;
      const isMajor = st.isMajor ?? false;

      const line = getLine(st.lineId);
      const stationColor = line?.lineColor || '#004b97';
      const accentColor = line?.accentColor || '#ed6d00';

      const html = `
        <div class="relative group cursor-pointer flex flex-col items-center">
          <div class="w-4 h-4 rounded-full border-2 ${
            isSelected
              ? 'border-white ring-4 scale-125'
              : isMajor
              ? 'border-white shadow-md'
              : 'bg-white shadow-xs'
          } transition-all" style="
            background-color: ${isSelected ? accentColor : (isMajor ? stationColor : '#ffffff')};
            border-color: ${isSelected ? '#ffffff' : (isMajor ? '#ffffff' : stationColor)};
            box-shadow: ${isSelected ? `0 0 10px ${accentColor}` : 'none'};
          "></div>
          <div class="absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-sm border border-slate-200 text-[11px] font-bold text-slate-800 transition-opacity flex items-center gap-1 ${
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
        onSelectStation(st);
        mapRef.current?.panTo([st.lat, st.lng], { animate: true });
      });

      stationLayerRef.current?.addLayer(marker);
    });
  }, [selectedStation, onSelectStation, selectedLineIds]);

  // activeTrains が更新された時に tripId -> ActiveTrain マップを同期
  useEffect(() => {
    const map = new Map<string, ActiveTrain>();
    activeTrains.forEach((t) => map.set(t.tripId, t));
    latestTrainsMapRef.current = map;
  }, [activeTrains]);

  // 列車マーカーのリアルタイム描画 & 更新（インスタンスをキャッシュ・差分更新してチカチカとクリック不能を解消）
  useEffect(() => {
    if (!mapRef.current || !trainLayerRef.current) return;

    // フィルタリング（進行方向・種別）
    const filteredTrains = activeTrains.filter((train) => {
      if (filterDirection !== 'all' && train.direction !== filterDirection) return false;
      const isLocalOrRegular =
        train.trainType === 'local' || train.trainType === 'regular' || train.trainType === 'semiExp';
      if (filterType === 'rapid' && isLocalOrRegular) {
        return false;
      }
      if (filterType === 'local' && !isLocalOrRegular) {
        return false;
      }
      return true;
    });

    const currentVisibleTripIds = new Set<string>();

    filteredTrains.forEach((train) => {
      currentVisibleTripIds.add(train.tripId);
      const isSelected = selectedTrain?.tripId === train.tripId;
      const existingMarker = markersRef.current.get(train.tripId);

      if (existingMarker) {
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
  }, [activeTrains, selectedTrain, filterDirection, filterType]);

  // 列車追従モード（初回はスムーズパン、追従中は直接更新でガタつきを防止）
  useEffect(() => {
    isFirstTrackRef.current = true;
    prevTrackingPosRef.current = null;
  }, [trackingTrainId, isTrackingTrain]);

  useEffect(() => {
    if (!isTrackingTrain || !trackingTrainId || !mapRef.current) return;
    const tracked = activeTrains.find((t) => t.tripId === trackingTrainId);
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
      if (!prev || Math.abs(prev.lat - tracked.currentLat) > 0.000005 || Math.abs(prev.lng - tracked.currentLng) > 0.000005) {
        mapRef.current.panTo([tracked.currentLat, tracked.currentLng], { animate: false });
        prevTrackingPosRef.current = { lat: tracked.currentLat, lng: tracked.currentLng };
      }
    }
  }, [isTrackingTrain, trackingTrainId, activeTrains]);

  // エラー通知トースト表示ヘルパー
  const showLocationError = useCallback((msg: string) => {
    setLocationErrorMessage(msg);
    if (errorTimeoutRef.current !== null) {
      window.clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = window.setTimeout(() => {
      setLocationErrorMessage(null);
    }, 4000);
  }, []);

  // 現在地マーカーと測位精度円の描画更新
  useEffect(() => {
    if (!locationLayerRef.current) return;
    locationLayerRef.current.clearLayers();

    if (!currentLocation) return;

    // 測位精度を表す円
    const circle = L.circle([currentLocation.lat, currentLocation.lng], {
      radius: currentLocation.accuracy,
      color: '#3b82f6',
      fillColor: '#3b82f6',
      fillOpacity: 0.12,
      weight: 1,
      interactive: false,
    });

    // 現在地パルスマーカー
    const markerIcon = L.divIcon({
      className: 'current-location-marker',
      html: `
        <div class="relative flex items-center justify-center w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <span class="absolute w-6 h-6 rounded-full bg-blue-500 opacity-60 animate-ping"></span>
          <span class="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-md"></span>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    const marker = L.marker([currentLocation.lat, currentLocation.lng], {
      icon: markerIcon,
      interactive: false,
      zIndexOffset: 1000,
    });

    locationLayerRef.current.addLayer(circle);
    locationLayerRef.current.addLayer(marker);
  }, [currentLocation]);

  // バックグラウンドでの位置情報監視（移動に合わせてマーカーを更新）
  useEffect(() => {
    if (!currentLocation || !navigator.geolocation) return;

    if (locationWatchIdRef.current === null) {
      locationWatchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          setCurrentLocation({ lat: latitude, lng: longitude, accuracy });
        },
        () => {
          // バックグラウンド監視中のエラーはサイレントに処理
        },
        {
          enableHighAccuracy: true,
          maximumAge: 10000,
        }
      );
    }
  }, [currentLocation]);

  // 現在地追従モード時の地図センタリング
  useEffect(() => {
    if (!isTrackingLocation || !currentLocation || !mapRef.current) return;
    mapRef.current.panTo([currentLocation.lat, currentLocation.lng], { animate: true, duration: 0.5 });
  }, [isTrackingLocation, currentLocation]);

  // 現在地取得 / 追従トグルハンドラ
  const handleToggleLocation = useCallback(() => {
    if (!navigator.geolocation) {
      showLocationError('お使いのブラウザは位置情報取得に対応していません');
      return;
    }

    // 列車追跡モードが有効なら解除
    onStopTracking?.();

    // 既に位置情報があり、追従が無効の場合は追従を再開してフォーカス
    if (currentLocation && !isTrackingLocation) {
      mapRef.current?.flyTo([currentLocation.lat, currentLocation.lng], Math.max(mapRef.current.getZoom(), 15), {
        duration: 0.8,
      });
      setIsTrackingLocation(true);
      return;
    }

    // 既に追従中の場合は追従を解除（マーカー表示は維持）
    if (currentLocation && isTrackingLocation) {
      setIsTrackingLocation(false);
      return;
    }

    // 初回取得
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setCurrentLocation({ lat: latitude, lng: longitude, accuracy });
        setIsLocating(false);
        setIsTrackingLocation(true);

        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], Math.max(mapRef.current.getZoom(), 15), {
            duration: 1.0,
          });
        }
      },
      (err) => {
        setIsLocating(false);
        setIsTrackingLocation(false);
        let msg = '現在地を取得できませんでした';
        if (err.code === err.PERMISSION_DENIED) {
          msg = '位置情報の利用が許可されていません';
        } else if (err.code === err.TIMEOUT) {
          msg = '位置情報の取得がタイムアウトしました';
        }
        showLocationError(msg);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );
  }, [currentLocation, isTrackingLocation, onStopTracking, showLocationError]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        data-tile-type={tileType}
        data-has-carto-key={Boolean(cartoApiKey).toString()}
        className="w-full h-full z-0"
      />

      {/* 現在地エラー通知トースト */}
      {locationErrorMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-[1000] px-4 py-2 bg-slate-900/95 text-white text-xs font-medium rounded-full shadow-xl backdrop-blur-md pointer-events-none transition-all flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span>{locationErrorMessage}</span>
        </div>
      )}

      {/* 地図コントロール (右下配置、モバイル時のTimeControllerとの被りを完全防止) */}
      <div
        className={`absolute right-[calc(0.75rem+env(safe-area-inset-right,0px))] sm:right-[calc(1rem+env(safe-area-inset-right,0px))] z-[1000] flex flex-col gap-2 pointer-events-auto transition-all duration-300 ease-in-out ${
          isTimeControllerExpanded
            ? 'bottom-[calc(19.5rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]'
            : 'bottom-[calc(10.5rem+env(safe-area-inset-bottom,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]'
        }`}
      >
        {/* レイヤー切り替え */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            title="マップレイヤー"
          >
            <Layers className="w-5 h-5 text-slate-700" />
          </button>

          {showLayerMenu && (
            <div className="absolute right-12 bottom-0 w-36 bg-white rounded-lg shadow-xl border border-slate-200 py-1 text-xs">
              <div className="px-3 py-1 font-bold text-slate-400 border-b border-slate-100">地図タイプ</div>
              <button
                type="button"
                onClick={() => {
                  setTileType('standard');
                  setShowLayerMenu(false);
                }}
                className={`w-full px-3 py-1.5 text-left hover:bg-slate-50 ${tileType === 'standard' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                標準マップ
              </button>
              <button
                type="button"
                onClick={() => {
                  setTileType('satellite');
                  setShowLayerMenu(false);
                }}
                className={`w-full px-3 py-1.5 text-left hover:bg-slate-50 ${tileType === 'satellite' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                航空写真
              </button>
              <button
                type="button"
                onClick={() => {
                  setTileType('dark');
                  setShowLayerMenu(false);
                }}
                className={`w-full px-3 py-1.5 text-left hover:bg-slate-50 ${tileType === 'dark' ? 'text-blue-600 font-bold' : 'text-slate-700'}`}
              >
                ダークマップ
              </button>
            </div>
          )}
        </div>

        {/* 現在地取得ボタン */}
        <button
          type="button"
          onClick={handleToggleLocation}
          disabled={isLocating}
          className={`p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md border transition-all ${
            isTrackingLocation
              ? 'border-blue-500 text-blue-600 bg-blue-50/90 ring-2 ring-blue-300'
              : currentLocation
              ? 'border-slate-200 text-blue-600 hover:bg-slate-50'
              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
          title={
            isLocating
              ? '現在地を取得中...'
              : isTrackingLocation
              ? '現在地を追従中（クリックで解除）'
              : currentLocation
              ? '現在地に移動'
              : '現在地を表示'
          }
          aria-label="現在地を表示"
        >
          {isLocating ? (
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          ) : isTrackingLocation ? (
            <LocateFixed className="w-5 h-5" />
          ) : (
            <Locate className="w-5 h-5" />
          )}
        </button>

        {/* ズームイン */}
        <button
          type="button"
          onClick={() => mapRef.current?.zoomIn()}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          title="拡大"
        >
          <ZoomIn className="w-5 h-5" />
        </button>

        {/* ズームアウト */}
        <button
          type="button"
          onClick={() => mapRef.current?.zoomOut()}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          title="縮小"
        >
          <ZoomOut className="w-5 h-5" />
        </button>

        {/* 全線表示にリセット */}
        <button
          type="button"
          onClick={() => {
            onStopTracking?.();
            const bounds = calculateBoundsForLines(selectedLineIds);
            mapRef.current?.flyToBounds(bounds, { padding: [50, 50] });
          }}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          title="表示路線全体を表示"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
