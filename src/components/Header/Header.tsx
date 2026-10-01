import React, { useState, useRef, useEffect } from 'react';
import { Search, Train, MapPin, X, Calendar, Settings, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';
import type { Station, ActiveTrain, LineId, Direction } from '../../types';
import { getStations } from '../../data/stations';
import { StationBadge, TrainTypeBadge } from '../Common/Badges';
import type { TrainOperationStatus } from '../../services/odptApi';
import { formatTrainNumber } from '../../data/timetableData';
import { getLine } from '../../data/linesRegistry';
import { DisplayFilterDock } from '../Map/DisplayFilterDock';

interface HeaderProps {
  onSelectStation: (station: Station) => void;
  onSelectTrain: (train: ActiveTrain) => void;
  activeTrains: ActiveTrain[];
  isHoliday: boolean;
  onToggleHoliday: (val: boolean) => void;
  operationStatus: TrainOperationStatus;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  isSidebarOpen: boolean;
  onCloseSidebar?: () => void;
  selectedLineIds: LineId[];
  onChangeSelectedLines: (lineIds: LineId[]) => void;
  filterDirection: 'all' | Direction;
  onChangeFilterDirection: (direction: 'all' | Direction) => void;
  filterType: 'all' | 'rapid' | 'local';
  onChangeFilterType: (type: 'all' | 'rapid' | 'local') => void;
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
  isSidebarOpen,
  onCloseSidebar,
  selectedLineIds,
  onChangeSelectedLines,
  filterDirection,
  onChangeFilterDirection,
  filterType,
  onChangeFilterType,
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

  // ステータスカプセル群（運行状況、ダイヤ種別、走行列車数）の共通JSX
  const statusCapsulesJsx = (
    <>
      {/* 運行情報ステータスバッジ */}
      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setShowStatusTooltip(!showStatusTooltip)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg shadow-md backdrop-blur-md text-xs font-semibold border pointer-events-auto transition-all ${
            operationStatus.status === 'NORMAL'
              ? 'bg-emerald-50/95 text-emerald-800 border-emerald-200 hover:bg-emerald-100/90'
              : 'bg-amber-50/95 text-amber-800 border-amber-200 hover:bg-amber-100/90'
          }`}
          title="運行情報を表示"
        >
          {operationStatus.status === 'NORMAL' ? (
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          )}
          <span className="whitespace-nowrap">{operationStatus.title}</span>
        </button>

        {/* 運行情報詳細ポップオーバー */}
        {showStatusTooltip && (
          <div className="absolute top-full mt-2 left-0 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-3.5 z-50 text-left pointer-events-auto animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-xs text-slate-800">運行情報</span>
              <span className="text-[10px] text-slate-400">{operationStatus.updatedAt} 更新</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{operationStatus.details}</p>
            <div className="mt-2.5 text-[10px] text-slate-400 border-t border-slate-100 pt-2 flex justify-between items-center">
              <span>提供: 各鉄道会社 / ODPT</span>
              <button
                type="button"
                onClick={() => setShowStatusTooltip(false)}
                className="text-sky-600 hover:underline font-semibold"
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
        className="pointer-events-auto shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 shadow-md border border-slate-200 hover:bg-slate-50 transition-all"
        title="平日 / 土休日ダイヤを切り替え"
      >
        <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        <span className="whitespace-nowrap">{isHoliday ? '土休日ダイヤ' : '平日ダイヤ'}</span>
      </button>

      {/* 走行中列車数 */}
      <div className="pointer-events-auto shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-slate-700 shadow-md border border-slate-200">
        <Train className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span className="whitespace-nowrap">走行中 <strong className="text-sky-700 font-bold">{activeTrains.length}</strong> 列車</span>
      </div>
    </>
  );

  return (
    <header
      className="absolute top-[calc(0.75rem+env(safe-area-inset-top,0px))] left-[calc(0.75rem+env(safe-area-inset-left,0px))] right-[calc(0.75rem+env(safe-area-inset-right,0px))] z-[1002] pointer-events-none flex flex-col gap-2 transition-all duration-300 ease-in-out"
    >
      {/* ===== 1段目 (Row 1): 検索バー (左) ＆ ステータスカプセル (右揃え・上部固定) ===== */}
      <div className="flex items-start justify-between gap-2 w-full">
        {/* 検索入力ボックス (サイドバーの上端に左右均等余白で綺麗に乗るGoogleマップ風仕様、幅は440px) */}
        <div
          ref={containerRef}
          className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 w-full sm:w-[420px] md:w-[440px] transition-all"
        >
          <div className="flex items-center px-3 py-2 gap-2">
            {/* ブランドロゴ */}
            <div className="flex items-center gap-1.5 pr-2 border-r border-slate-200 shrink-0">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#002060] to-[#00ac9a] flex items-center justify-center text-white shadow-xs font-black text-sm">
                T
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-slate-800 text-sm leading-tight tracking-tight">Trainfo</span>
                <span className="text-[10px] text-slate-500 font-medium leading-none hidden xs:inline">運行マップ</span>
              </div>
            </div>

            {/* 検索入力欄 (プレースホルダーが見切れないよう余白最適化) */}
            <div className="relative flex-1 flex items-center min-w-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-0.5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder="駅名・行先・種別で検索..."
                className="w-full pl-6 pr-6 py-1 text-sm bg-transparent outline-none text-slate-800 placeholder-slate-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    onCloseSidebar?.();
                  }}
                  className="absolute right-0 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                  title="検索クリア"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 一体型ボタン: ヘルプ(?) ＆ 設定(⚙) */}
            <div className="flex items-center gap-0.5 border-l border-slate-200 pl-1.5 shrink-0">
              <button
                type="button"
                onClick={onOpenHelp}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                title="使い方と機能説明"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onOpenSettings}
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
                title="API設定・カスタム時刻表"
              >
                <Settings className="w-4 h-4" />
              </button>
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

        {/* PC用 右側固定エリア: 1行目 ステータスカプセル群 ＆ 2行目 フィルタードック (右揃え・上端固定) */}
        <div className="hidden sm:flex flex-col items-end gap-2 pointer-events-auto shrink-0 ml-auto mt-1">
          <div className="flex items-center gap-1.5">
            {statusCapsulesJsx}
          </div>
          <DisplayFilterDock
            selectedLineIds={selectedLineIds}
            onChangeSelectedLines={onChangeSelectedLines}
            filterDirection={filterDirection}
            onChangeFilterDirection={onChangeFilterDirection}
            filterType={filterType}
            onChangeFilterType={onChangeFilterType}
            mode="desktop"
          />
        </div>
      </div>

      {/* モバイル用: 横スクロールチップバー (サイドバー展開時は非表示にして詳細パネルと被らないようにする) */}
      {!isSidebarOpen && (
        <div className="relative sm:hidden w-full pointer-events-auto animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 pr-8 w-full">
            <DisplayFilterDock
              selectedLineIds={selectedLineIds}
              onChangeSelectedLines={onChangeSelectedLines}
              filterDirection={filterDirection}
              onChangeFilterDirection={onChangeFilterDirection}
              filterType={filterType}
              onChangeFilterType={onChangeFilterType}
              mode="mobile"
            />
            {statusCapsulesJsx}
          </div>
          {/* 右端スクロール可能を視覚的に伝えるフェードマスク */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-100/90 via-slate-100/40 to-transparent pointer-events-none rounded-r-lg" />
        </div>
      )}
    </header>
  );
};
