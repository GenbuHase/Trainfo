import React from 'react';
import type { Station, ActiveTrain } from '../../types';
import { StationDetail } from './StationDetail';
import { TrainDetail } from './TrainDetail';
import { X, ChevronRight } from 'lucide-react';
import { STATIONS } from '../../data/stations';
import { StationBadge } from '../Common/Badges';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedStation: Station | null;
  selectedTrain: ActiveTrain | null;
  currentSec: number;
  isHoliday: boolean;
  activeTrains: ActiveTrain[];
  isTrackingTrain: boolean;
  onToggleTrackingTrain: () => void;
  onSelectStation: (station: Station) => void;
  onSelectTrain: (train: ActiveTrain) => void;
  onOpenFullTimetable: (station: Station) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  selectedStation,
  selectedTrain,
  currentSec,
  isHoliday,
  activeTrains,
  isTrackingTrain,
  onToggleTrackingTrain,
  onSelectStation,
  onSelectTrain,
  onOpenFullTimetable,
}) => {
  if (!isOpen) return null;

  return (
    <aside
      className={`fixed md:absolute top-0 left-0 h-full w-full sm:w-[400px] md:w-[420px] bg-white shadow-2xl z-[1001] transition-transform duration-300 ease-in-out flex flex-col border-r border-slate-200 overflow-hidden pt-[60px] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* 閉じるボタン (Googleマップ風) */}
      <div className="absolute top-[68px] right-3 z-30">
        <button
          onClick={onClose}
          className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-colors shadow-sm"
          title="パネルを閉じる"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* パネルコンテンツ切り替え */}
      <div className="flex-1 overflow-hidden">
        {selectedTrain ? (
          <TrainDetail
            train={selectedTrain}
            isTracking={isTrackingTrain}
            onToggleTracking={onToggleTrackingTrain}
            onSelectStation={onSelectStation}
          />
        ) : selectedStation ? (
          <StationDetail
            station={selectedStation}
            currentSec={currentSec}
            isHoliday={isHoliday}
            activeTrains={activeTrains}
            onSelectTrain={onSelectTrain}
            onOpenFullTimetable={onOpenFullTimetable}
          />
        ) : (
          /* 駅・列車未選択時の路線サマリー */
          <div className="p-6 h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-2">東武東上線 (池袋〜寄居)</h2>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              全39駅、営業キロ75.0kmの首都圏主要幹線。地図上の駅または走行中の列車アイコンをクリックすると詳細情報と発車案内・運行ダイヤを表示します。
            </p>

            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              全駅クイックアクセス ({STATIONS.length}駅)
            </h3>
            <div className="space-y-1">
              {STATIONS.map((station) => (
                <button
                  key={station.id}
                  onClick={() => onSelectStation(station)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors text-left text-xs"
                >
                  <div className="flex items-center gap-2">
                    <StationBadge id={station.id} size="sm" />
                    <span className="font-semibold text-slate-800">{station.name}</span>
                    <span className="text-[11px] text-slate-400">({station.nameKana})</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
