import React from 'react';
import type { Station, ActiveTrain, Direction, LineId } from '../../types';
import { calculateBoundsForLines } from '../../data/linesRegistry';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Locate,
  LocateFixed,
  Loader2,
} from 'lucide-react';
import { useSelection } from '../../contexts/SelectionContext';
import { useSimulation } from '../../contexts/SimulationContext';
import { useFilter } from '../../contexts/FilterContext';
import { useUI } from '../../contexts/UIContext';

import { useLeafletMap } from './hooks/useLeafletMap';
import { useTrackPolylines } from './hooks/useTrackPolylines';
import { useStationMarkers } from './hooks/useStationMarkers';
import { useTrainMarkers } from './hooks/useTrainMarkers';
import { useMapCamera } from './hooks/useMapCamera';
import { useGeolocation } from './hooks/useGeolocation';

export interface TrainMapProps {
  activeTrains?: ActiveTrain[];
  selectedStation?: Station | null;
  selectedTrain?: ActiveTrain | null;
  onSelectStation?: (station: Station) => void;
  onSelectTrain?: (train: ActiveTrain) => void;
  isTrackingTrain?: boolean;
  trackingTrainId?: string | null;
  isSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
  selectedLineIds?: LineId[];
  filterDirection?: 'all' | Direction;
  filterType?: 'all' | 'rapid' | 'local';
  isTimeControllerExpanded?: boolean;
  onStopTracking?: () => void;
}

export const TrainMap: React.FC<TrainMapProps> = ({
  activeTrains: propActiveTrains,
  selectedStation: propSelectedStation,
  selectedTrain: propSelectedTrain,
  onSelectStation: propOnSelectStation,
  onSelectTrain: propOnSelectTrain,
  isTrackingTrain: propIsTrackingTrain,
  trackingTrainId: propTrackingTrainId,
  isSidebarOpen: propIsSidebarOpen,
  onCloseSidebar: propOnCloseSidebar,
  selectedLineIds: propSelectedLineIds,
  filterDirection: propFilterDirection,
  filterType: propFilterType,
  isTimeControllerExpanded: propIsTimeControllerExpanded,
  onStopTracking: propOnStopTracking,
}) => {
  const selection = useSelection();
  const simulation = useSimulation();
  const filter = useFilter();
  const ui = useUI();

  const activeTrains = propActiveTrains ?? simulation.activeTrains;
  const selectedStation = propSelectedStation ?? selection.selectedStation;
  const selectedTrain = propSelectedTrain ?? simulation.selectedTrain;
  const onSelectStation = propOnSelectStation ?? selection.selectStation;
  const onSelectTrain = propOnSelectTrain ?? selection.selectTrain;
  const isTrackingTrain = propIsTrackingTrain ?? selection.isTrackingTrain;
  const trackingTrainId = propTrackingTrainId ?? (simulation.selectedTrain?.tripId || null);
  const isSidebarOpen = propIsSidebarOpen ?? ui.isSidebarOpen;
  const onCloseSidebar = propOnCloseSidebar ?? ui.closeSidebar;
  const selectedLineIds = propSelectedLineIds ?? selection.selectedLineIds;
  const filterDirection = propFilterDirection ?? filter.filterDirection;
  const filterType = propFilterType ?? filter.filterType;
  const isTimeControllerExpanded = propIsTimeControllerExpanded ?? ui.isTimeControllerExpanded;
  const onStopTracking = propOnStopTracking ?? selection.stopTracking;

  // 1. 地図・タイル管理
  const {
    mapContainerRef,
    mapRef,
    stationLayerRef,
    trainLayerRef,
    polylineLayerRef,
    locationLayerRef,
    tileType,
    setTileType,
    showLayerMenu,
    setShowLayerMenu,
  } = useLeafletMap({
    selectedLineIds,
    isSidebarOpen,
    onCloseSidebar,
  });

  // 2. 現在地情報 (Geolocation)
  const {
    isLocating,
    currentLocation,
    isTrackingLocation,
    locationErrorMessage,
    handleToggleLocation,
  } = useGeolocation({
    mapRef,
    locationLayerRef,
    onStopTracking,
  });

  // 3. 路線ポリライン描画
  useTrackPolylines({
    mapRef,
    polylineLayerRef,
    selectedLineIds,
  });

  // 4. 駅マーカー描画
  useStationMarkers({
    mapRef,
    stationLayerRef,
    selectedLineIds,
    selectedStation,
    onSelectStation,
  });

  // 5. 列車マーカー描画 & DOM差分更新
  useTrainMarkers({
    mapRef,
    trainLayerRef,
    activeTrains,
    selectedTrain,
    filterDirection,
    filterType,
    onSelectTrain,
  });

  // 6. カメラワーク（路線フィット & 列車自動追従）
  useMapCamera({
    mapRef,
    selectedLineIds,
    isTrackingTrain,
    trackingTrainId,
    activeTrains,
  });

  const cartoApiKey = (import.meta.env.VITE_CARTO_API_KEY as string | undefined)?.trim();

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

export default TrainMap;
