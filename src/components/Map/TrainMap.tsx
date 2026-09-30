import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import type { Station, ActiveTrain, Direction } from '../../types';
import { STATIONS, STATION_MAP } from '../../data/stations';
import { ENTIRE_LINE_COORDINATES } from '../../data/trackGeometry';
import { TRAIN_TYPES } from '../../data/trainTypes';
import { formatTrainNumber } from '../../data/timetableData';
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
  const tileUrls: Record<TileType, { url: string; attribution: string }> = {
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
  };

  // 地図の初期化
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // 川越〜志木付近を中心とした初期表示
    const map = L.map(mapContainerRef.current, {
      center: [35.84, 139.56],
      zoom: 11,
      zoomControl: false,
    });

    const tile = L.tileLayer(tileUrls.standard.url, {
      attribution: tileUrls.standard.attribution,
      maxZoom: 19,
    }).addTo(map);

    tileLayerRef.current = tile;
    polylineLayerRef.current = L.layerGroup().addTo(map);
    stationLayerRef.current = L.layerGroup().addTo(map);
    trainLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    // 地図背景クリックでサイドバーを閉じる (Googleマップ風)
    map.on('click', () => {
      onCloseSidebar?.();
    });

    // 路線ポリラインの描画 (グロー効果 ＋ メイン線)
    const glowLine = L.polyline(ENTIRE_LINE_COORDINATES, {
      color: '#ffffff',
      weight: 8,
      opacity: 0.8,
      lineCap: 'round',
      lineJoin: 'round',
    });

    const mainLine = L.polyline(ENTIRE_LINE_COORDINATES, {
      color: '#004b97', // 東武ブルー
      weight: 5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round',
    });

    const accentDashLine = L.polyline(ENTIRE_LINE_COORDINATES, {
      color: '#ed6d00', // 東武東上線オレンジ
      weight: 2,
      dashArray: '6, 12',
      opacity: 0.9,
    });

    polylineLayerRef.current.addLayer(glowLine);
    polylineLayerRef.current.addLayer(mainLine);
    polylineLayerRef.current.addLayer(accentDashLine);

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
  }, [tileType]);

  // 駅マーカーの描画
  useEffect(() => {
    if (!mapRef.current || !stationLayerRef.current) return;
    stationLayerRef.current.clearLayers();

    STATIONS.forEach((st) => {
      const isSelected = selectedStation?.id === st.id;
      const isMajor = [1, 10, 11, 13, 14, 18, 21, 22, 26, 30, 33, 39].includes(st.number);

      const html = `
        <div class="relative group cursor-pointer flex flex-col items-center">
          <div class="w-4 h-4 rounded-full border-2 ${
            isSelected
              ? 'bg-[#ed6d00] border-white ring-4 ring-[#ed6d00]/50 scale-125'
              : isMajor
              ? 'bg-[#004b97] border-white shadow-md'
              : 'bg-white border-[#004b97] shadow-xs'
          } transition-all"></div>
          <div class="absolute top-4 pointer-events-none whitespace-nowrap bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-sm border border-slate-200 text-[11px] font-bold text-slate-800 transition-opacity ${
            isMajor || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }">
            <span class="text-[#ed6d00] font-mono text-[9px] mr-0.5">TJ${st.number < 10 ? '0' : ''}${st.number}</span>
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

      const marker = L.marker([st.lat, st.lng], { icon });
      marker.on('click', () => {
        onSelectStation(st);
        mapRef.current?.panTo([st.lat, st.lng], { animate: true });
      });

      stationLayerRef.current?.addLayer(marker);
    });
  }, [selectedStation, onSelectStation]);

  // 列車マーカーのリアルタイム描画 & 更新
  useEffect(() => {
    if (!mapRef.current || !trainLayerRef.current) return;
    trainLayerRef.current.clearLayers();

    // フィルタリング
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
      const typeConfig = TRAIN_TYPES[train.trainType] || TRAIN_TYPES.local;
      const destSt = STATION_MAP.get(train.destinationStationId);

      // 矢印・電車の向きアイコン
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
            <span style="color: ${typeConfig.color}">${typeConfig.shortName}</span>
            <span>${train.customDestination || destSt?.name || '小川町'}</span>
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

    // 列車自動追尾モード
    if (isTrackingTrain && trackingTrainId) {
      const tracked = activeTrains.find((t) => t.tripId === trackingTrainId);
      if (tracked && mapRef.current) {
        mapRef.current.panTo([tracked.currentLat, tracked.currentLng], { animate: true, duration: 0.6 });
      }
    }
  }, [activeTrains, selectedTrain, isTrackingTrain, trackingTrainId, filterDirection, filterType, onSelectTrain]);

  // 全線表示（フィットバウンズ）
  const handleFitBounds = () => {
    if (!mapRef.current) return;
    const poly = L.polyline(ENTIRE_LINE_COORDINATES);
    mapRef.current.fitBounds(poly.getBounds(), { padding: [50, 50] });
  };

  // 池袋駅へジャンプ
  const handleJumpToIkebukuro = () => {
    mapRef.current?.setView([35.7289, 139.7113], 14, { animate: true });
  };

  // 川越駅へジャンプ
  const handleJumpToKawagoe = () => {
    mapRef.current?.setView([35.9069, 139.4828], 14, { animate: true });
  };

  return (
    <div className="relative w-full h-full">
      {/* Leaflet 地図コンテナ */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* 右上: フィルタ＆マップレイヤー切り替え */}
      <div className="absolute top-3 right-3 z-[1000] flex flex-col items-end gap-2 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-lg shadow-md border border-slate-200 text-xs">
          {/* 運行方向フィルタ */}
          <button
            onClick={() => setFilterDirection(filterDirection === 'all' ? 'inbound' : filterDirection === 'inbound' ? 'outbound' : 'all')}
            className={`px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              filterDirection !== 'all' ? 'bg-[#004b97] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="進行方向で絞り込み"
          >
            {filterDirection === 'all' ? '全方向' : filterDirection === 'inbound' ? '上り (池袋方面)' : '下り (寄居方面)'}
          </button>

          {/* 種別フィルタ */}
          <button
            onClick={() => setFilterType(filterType === 'all' ? 'rapid' : filterType === 'rapid' ? 'local' : 'all')}
            className={`px-2.5 py-1.5 rounded-md font-semibold transition-all ${
              filterType !== 'all' ? 'bg-[#ed6d00] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
            }`}
            title="優等/普通で絞り込み"
          >
            {filterType === 'all' ? '全種別' : filterType === 'rapid' ? '急行系のみ' : '普通・準急のみ'}
          </button>

          {/* レイヤー切替ボタン */}
          <div className="relative">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="p-1.5 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              title="地図レイヤー切替"
            >
              <Layers className="w-4 h-4" />
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 top-full mt-1.5 bg-white rounded-lg shadow-xl border border-slate-200 py-1 w-32 z-50">
                <button
                  onClick={() => { setTileType('standard'); setShowLayerMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${tileType === 'standard' ? 'text-[#004b97] bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  標準地図
                </button>
                <button
                  onClick={() => { setTileType('satellite'); setShowLayerMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${tileType === 'satellite' ? 'text-[#004b97] bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  衛星写真
                </button>
                <button
                  onClick={() => { setTileType('dark'); setShowLayerMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold ${tileType === 'dark' ? 'text-[#004b97] bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  ダークモード
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 主要駅クイックジャンプボタン */}
        <div className="pointer-events-auto flex gap-1">
          <button
            onClick={handleJumpToIkebukuro}
            className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-md shadow-md border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            池袋
          </button>
          <button
            onClick={handleJumpToKawagoe}
            className="px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-md shadow-md border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            川越
          </button>
        </div>
      </div>

      {/* 右下: Googleマップ風 ズーム＆フィットコントロール */}
      <div className="absolute bottom-24 md:bottom-20 right-3 z-[1000] flex flex-col gap-1.5 pointer-events-none">
        <div className="pointer-events-auto flex flex-col bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => mapRef.current?.zoomIn()}
            className="p-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-b border-slate-200 transition-colors"
            title="拡大"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => mapRef.current?.zoomOut()}
            className="p-2.5 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title="縮小"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleFitBounds}
          className="pointer-events-auto p-2.5 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="東武東上線 全線を表示"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
