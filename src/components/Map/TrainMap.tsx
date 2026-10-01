import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import type { Station, ActiveTrain, Direction, LineId } from '../../types';
import { getStations, STATION_MAP } from '../../data/stations';
import { formatTrainNumber } from '../../data/timetableData';
import { getLine, calculateBoundsForLines, getTrainTypeConfig } from '../../data/linesRegistry';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
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
}

type TileType = 'standard' | 'satellite' | 'dark';

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
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const stationLayerRef = useRef<L.LayerGroup | null>(null);
  const trainLayerRef = useRef<L.LayerGroup | null>(null);
  const polylineLayerRef = useRef<L.LayerGroup | null>(null);

  const [tileType, setTileType] = useState<TileType>('standard');
  const [filterDirection, setFilterDirection] = useState<'all' | Direction>('all');
  const [filterType, setFilterType] = useState<'all' | 'rapid' | 'local'>('all');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

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
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    },
  }), []);

  // 地図の初期化
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // 初期表示範囲（両路線が見渡せる範囲）
    const initialBounds = calculateBoundsForLines(selectedLineIds);

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
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
    mapRef.current = map;

    // 地図背景クリックでサイドバーを閉じる
    map.on('click', () => {
      onCloseSidebar?.();
    });

    // リサイズハンドラ
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
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
    tileLayerRef.current.setUrl(tileUrls[tileType].url);
  }, [tileType, tileUrls]);

  // 路線別ポリラインの動的描画
  useEffect(() => {
    if (!mapRef.current || !polylineLayerRef.current) return;
    polylineLayerRef.current.clearLayers();

    for (const lineId of selectedLineIds) {
      const line = getLine(lineId);
      if (!line) continue;

      // 路線セグメントから全座標を抽出
      const coords: [number, number][] = [];
      line.trackSegments.forEach((seg, idx) => {
        if (idx === 0) {
          coords.push(...seg.coordinates);
        } else {
          coords.push(...seg.coordinates.slice(1));
        }
      });

      if (coords.length === 0) continue;

      // 1. 白グロー線
      const glowLine = L.polyline(coords, {
        color: '#ffffff',
        weight: 8,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // 2. メインライン
      const mainLine = L.polyline(coords, {
        color: line.lineColor,
        weight: 5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
      });

      // 3. アクセント点線
      const accentDashLine = L.polyline(coords, {
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
      const isMajor = [1, 10, 11, 13, 14, 18, 21, 22, 26, 30, 33, 39].includes(st.number) ||
        ['JA-08', 'JA-10', 'JA-11', 'JA-12', 'JA-15', 'JA-21', 'JA-26', 'JA-31'].includes(st.id);

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
      marker.on('click', () => {
        onSelectStation(st);
        mapRef.current?.panTo([st.lat, st.lng], { animate: true });
      });

      stationLayerRef.current?.addLayer(marker);
    });
  }, [selectedStation, onSelectStation, selectedLineIds]);

  // 列車マーカーのリアルタイム描画 & 更新
  useEffect(() => {
    if (!mapRef.current || !trainLayerRef.current) return;
    trainLayerRef.current.clearLayers();

    // フィルタリング（進行方向・種別）
    const filteredTrains = activeTrains.filter((train) => {
      if (filterDirection !== 'all' && train.direction !== filterDirection) return false;
      if (filterType === 'rapid' && (train.trainType === 'local' || train.trainType === 'semiExp')) {
        return false;
      }
      if (filterType === 'local' && train.trainType !== 'local' && train.trainType !== 'semiExp') {
        return false;
      }
      return true;
    });

    filteredTrains.forEach((train) => {
      const isSelected = selectedTrain?.tripId === train.tripId;
      const typeConfig = getTrainTypeConfig(train.trainType, train.lineId);
      const destSt = STATION_MAP.get(train.destinationStationId);

      // 矢印・電車の向き
      const rotationDeg = train.heading;

      const html = `
        <div class="relative cursor-pointer group flex flex-col items-center select-none" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));">
          <!-- 選択ハイライトパルス -->
          ${
            isSelected
              ? '<div class="absolute -inset-2 rounded-full bg-amber-400 opacity-75 animate-ping"></div>'
              : ''
          }

          <!-- 列車バッジ本体 -->
          <div class="relative flex items-center justify-center w-7 h-7 rounded-full text-white font-bold text-[11px] transition-transform ${
            isSelected ? 'scale-125 ring-2 ring-white shadow-xl' : 'hover:scale-110'
          }" style="background-color: ${typeConfig.bgColor}; border: 2px solid #ffffff;">
            <!-- 進行方向ポインタ (三角形矢印) -->
            <div class="absolute -top-1 w-0 h-0 border-x-4 border-x-transparent border-b-6 border-b-white transform origin-bottom transition-transform"
                 style="transform: rotate(${rotationDeg}deg) translateY(-8px);"></div>
            
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
            ${
              train.delayMinutes > 0
                ? `<span class="absolute -bottom-1 -right-1 bg-red-600 text-white text-[9px] font-black px-1 rounded-full border border-white leading-none py-0.5">+${train.delayMinutes}</span>`
                : ''
            }
          </div>

          <!-- 列車情報ラベル (ホバーまたは選択時) -->
          <div class="absolute top-8 pointer-events-none whitespace-nowrap bg-slate-900/95 text-white px-2 py-0.5 rounded shadow-lg text-[10px] font-sans font-bold flex items-center gap-1.5 transition-opacity ${
            isSelected ? 'opacity-100 ring-1 ring-amber-400' : 'opacity-0 group-hover:opacity-100'
          }">
            <span class="px-1 py-0.2 rounded text-[9px] text-white font-bold" style="background-color: ${typeConfig.bgColor}">${typeConfig.shortName}</span>
            <span>${train.customDestination || destSt?.name || '行先'}</span>
            <span class="text-slate-400 font-mono font-normal">${formatTrainNumber(train.trainNumber, train.tripId)}</span>
          </div>
        </div>
      `;

      const icon = L.divIcon({
        className: 'train-div-icon',
        html,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([train.currentLat, train.currentLng], { icon, zIndexOffset: isSelected ? 1000 : 500 });
      marker.on('click', () => {
        onSelectTrain(train);
      });

      trainLayerRef.current?.addLayer(marker);
    });
  }, [activeTrains, selectedTrain, onSelectTrain, filterDirection, filterType]);

  // 列車追従モード
  useEffect(() => {
    if (!isTrackingTrain || !trackingTrainId || !mapRef.current) return;
    const tracked = activeTrains.find((t) => t.tripId === trackingTrainId);
    if (tracked) {
      mapRef.current.panTo([tracked.currentLat, tracked.currentLng], { animate: true });
    }
  }, [isTrackingTrain, trackingTrainId, activeTrains]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 地図コントロール (右下配置) */}
      <div className="absolute right-4 bottom-28 z-[1000] flex flex-col gap-2 pointer-events-auto">
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
            const bounds = calculateBoundsForLines(selectedLineIds);
            mapRef.current?.flyToBounds(bounds, { padding: [50, 50] });
          }}
          className="p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          title="表示路線全体を表示"
        >
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>

      {/* 列車フィルター (方向・種別) */}
      <div className="absolute top-20 right-4 z-[1000] hidden sm:flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-lg shadow-md border border-slate-200 text-xs">
        <button
          type="button"
          onClick={() => setFilterDirection('all')}
          className={`px-2 py-1 rounded transition-colors ${filterDirection === 'all' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          全方向
        </button>
        <button
          type="button"
          onClick={() => setFilterDirection('inbound')}
          className={`px-2 py-1 rounded transition-colors ${filterDirection === 'inbound' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          上り
        </button>
        <button
          type="button"
          onClick={() => setFilterDirection('outbound')}
          className={`px-2 py-1 rounded transition-colors ${filterDirection === 'outbound' ? 'bg-sky-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          下り
        </button>
        <div className="w-[1px] h-4 bg-slate-200 my-auto mx-0.5"></div>
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`px-2 py-1 rounded transition-colors ${filterType === 'all' ? 'bg-slate-800 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          全種別
        </button>
        <button
          type="button"
          onClick={() => setFilterType('rapid')}
          className={`px-2 py-1 rounded transition-colors ${filterType === 'rapid' ? 'bg-red-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          優等
        </button>
        <button
          type="button"
          onClick={() => setFilterType('local')}
          className={`px-2 py-1 rounded transition-colors ${filterType === 'local' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          普通/各停
        </button>
      </div>
    </div>
  );
};
