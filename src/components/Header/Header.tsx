import React, { useState, useRef, useEffect } from 'react';
import { Search, Train, MapPin, X, Calendar, Settings, AlertTriangle, CheckCircle, HelpCircle, Clock } from 'lucide-react';
import type { Station, ActiveTrain, LineId } from '../../types';
import { getStations } from '../../data/stations';
import { StationBadge, TrainTypeBadge } from '../Common/Badges';
import type { TrainOperationStatus } from '../../services/odptApi';
import { formatTrainNumber } from '../../data/timetableData';
import { LineFilterDropdown } from './LineFilterDropdown';
import { getLine } from '../../data/linesRegistry';

interface HeaderProps {
  onSelectStation: (station: Station) => void;
  onSelectTrain: (train: ActiveTrain) => void;
  activeTrains: ActiveTrain[];
  isHoliday: boolean;
  onToggleHoliday: (val: boolean) => void;
  operationStatus: TrainOperationStatus;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  currentTimeString: string;
  isSidebarOpen: boolean;
  onCloseSidebar?: () => void;
  selectedLineIds: LineId[];
  onChangeSelectedLines: (lineIds: LineId[]) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectStation,
  onSelectTrain,
  activeTrains,
  isHoliday,
  onToggleHoliday,
  operationStatus,
  onOpenSettings,
  onOpenHelp,
  currentTimeString,
  isSidebarOpen,
  onCloseSidebar,
  selectedLineIds,
  onChangeSelectedLines,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showStatusTooltip, setShowStatusTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 外側クリックで検索サジェストを閉じる
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  // 現在選択中の路線の駅一覧から検索
  const currentStations = getStations(selectedLineIds);

  // 駅検索フィルター
  const matchedStations = normalizedQuery
    ? currentStations
        .filter(
          (s) =>
            s.name.includes(normalizedQuery) ||
            s.nameKana.includes(normalizedQuery) ||
            s.nameEn.toLowerCase().includes(normalizedQuery) ||
            s.id.toLowerCase().includes(normalizedQuery)
        )
        .slice(0, 6)
    : [];

  // 列車検索フィルター
  const matchedTrains = normalizedQuery
    ? activeTrains
        .filter(
          (t) =>
            t.tripId.toLowerCase().includes(normalizedQuery) ||
            (t.trainNumber && t.trainNumber.toLowerCase().includes(normalizedQuery)) ||
            t.destinationStationId.toLowerCase().includes(normalizedQuery) ||
            (t.customDestination && t.customDestination.toLowerCase().includes(normalizedQuery))
        )
        .slice(0, 4)
    : [];

  return (
    <>
      {/* 1. Googleマップ風 検索ボックス (常に左上に固定) */}
      <div className="absolute top-3 left-3 z-[1002] pointer-events-none">
        <div
          ref={containerRef}
          className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-slate-200/80 w-[calc(100vw-24px)] sm:w-[380px] md:w-[400px] transition-all"
        >
          <div className="flex items-center px-3 py-2.5 gap-2">
            {/* ブランドロゴ */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200 shrink-0">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#002060] to-[#00ac9a] flex items-center justify-center text-white shadow-xs font-black text-sm">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-sm leading-tight tracking-tight">Trainfo</span>
                <span className="text-[10px] text-slate-500 font-medium leading-none">運行マップ</span>
              </div>
            </div>

            {/* 検索入力欄 */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-1" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="駅名・行先・種別で検索..."
                className="w-full pl-7 pr-7 py-1 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    onCloseSidebar?.();
                  }}
                  className="absolute right-1 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                  title="検索クリア"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* サジェストリスト */}
          {isOpen && (matchedStations.length > 0 || matchedTrains.length > 0) && (
            <div className="border-t border-slate-100 max-h-[320px] overflow-y-auto py-1">
              {matchedStations.length > 0 && (
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  駅
                </div>
              )}
              {matchedStations.map((station) => {
                const line = getLine(station.lineId);
                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => {
                      onSelectStation(station);
                      setIsOpen(false);
                      setQuery(station.name);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm text-slate-800">{station.name}</span>
                          <span className="text-xs text-slate-400">({station.nameKana})</span>
                        </div>
                        {line && (
                          <div className="text-[10px] text-slate-500 font-medium">
                            {line.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <StationBadge id={station.id} size="sm" />
                  </button>
                );
              })}

              {matchedTrains.length > 0 && (
                <div className="px-3 pt-2 pb-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  走行中の列車
                </div>
              )}
              {matchedTrains.map((train) => {
                const line = getLine(train.lineId);
                return (
                  <button
                    key={train.tripId}
                    type="button"
                    onClick={() => {
                      onSelectTrain(train);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Train className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-semibold text-slate-800">
                            {formatTrainNumber(train.trainNumber, train.tripId)}
                          </span>
                          <span className="text-xs text-slate-500">
                            {train.customDestination ? `${train.customDestination}行` : (train.direction === 'inbound' ? '上り' : '下り')}
                          </span>
                        </div>
                        {line && (
                          <div className="text-[10px] text-slate-400">
                            {line.shortName}
                          </div>
                        )}
                      </div>
                    </div>
                    <TrainTypeBadge type={train.trainType} size="sm" lineId={train.lineId} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 2. サブコントロールバー（路線フィルター、平日/土休日、運行情報、時計、設定） */}
      <div
        className={`absolute top-3 z-[1000] pointer-events-none transition-all duration-300 ease-in-out ${
          isSidebarOpen
            ? 'hidden md:flex left-[436px] max-w-[calc(100vw-700px)]'
            : 'hidden sm:flex left-[416px] max-w-[calc(100vw-680px)]'
        } items-center gap-1.5 flex-wrap`}
      >
        {/* 路線フィルター（チェックボックス式セレクター） */}
        <div className="pointer-events-auto">
          <LineFilterDropdown
            selectedLineIds={selectedLineIds}
            onChangeSelectedLines={onChangeSelectedLines}
          />
        </div>

        {/* 運行情報ステータスバッジ */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowStatusTooltip(!showStatusTooltip)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-md backdrop-blur-md text-xs font-semibold border pointer-events-auto transition-all ${
              operationStatus.status === 'NORMAL'
                ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200 hover:bg-emerald-100/90'
                : 'bg-amber-50/90 text-amber-800 border-amber-200 hover:bg-amber-100/90'
            }`}
          >
            {operationStatus.status === 'NORMAL' ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span>{operationStatus.title}</span>
          </button>

          {/* 運行情報詳細ポップオーバー */}
          {showStatusTooltip && (
            <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-lg shadow-xl border border-slate-200 p-3 z-50 text-left pointer-events-auto">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-xs text-slate-800">運行情報</span>
                <span className="text-[10px] text-slate-400">{operationStatus.updatedAt} 更新</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{operationStatus.details}</p>
              <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-100 pt-1.5 flex justify-between">
                <span>データ提供: 各鉄道会社 / ODPT</span>
                <button
                  type="button"
                  onClick={() => setShowStatusTooltip(false)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  閉じる
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ダイヤ種別トグル (平日 / 土休日) */}
        <button
          type="button"
          onClick={() => onToggleHoliday(!isHoliday)}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 shadow-md border border-slate-200 hover:bg-slate-50 transition-all"
          title="ダイヤ切り替え"
        >
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{isHoliday ? '土休日ダイヤ' : '平日ダイヤ'}</span>
        </button>

        {/* 現在時刻表示 */}
        <div className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 shadow-md border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-sky-600" />
          <span className="font-mono font-bold text-slate-800">{currentTimeString}</span>
        </div>

        {/* 走行中列車数 */}
        <div className="pointer-events-auto hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 shadow-md border border-slate-200">
          <Train className="w-3.5 h-3.5 text-sky-600" />
          <span>走行中 <strong className="text-sky-700 font-bold">{activeTrains.length}</strong> 列車</span>
        </div>

        {/* ヘルプボタン */}
        <button
          type="button"
          onClick={onOpenHelp}
          className="pointer-events-auto p-2 rounded-lg bg-white/95 backdrop-blur-md text-slate-600 shadow-md border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all"
          title="使い方と機能説明"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* 設定ボタン */}
        <button
          type="button"
          onClick={onOpenSettings}
          className="pointer-events-auto p-2 rounded-lg bg-white/95 backdrop-blur-md text-slate-600 shadow-md border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all"
          title="API設定・カスタム時刻表"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
