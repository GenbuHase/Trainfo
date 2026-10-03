import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, Train, MapPin, X, Calendar, Settings, HelpCircle, Download } from 'lucide-react';
import type { Station, ActiveTrain, LineId, Direction } from '../../types';
import { getStations } from '../../data/stations';
import { StationBadge, TrainTypeBadge } from '../Common/Badges';
import { formatTrainNumber } from '../../data/timetableData';
import { getLine } from '../../data/linesRegistry';
import { DisplayFilterDock } from '../Map/DisplayFilterDock';
import { TrackingBar } from '../Map/TrackingBar';
import { isRunningStandalone, subscribeInstallState } from '../../services/pwaService';

interface HeaderProps {
  onSelectStation: (station: Station) => void;
  onSelectTrain: (train: ActiveTrain) => void;
  activeTrains: ActiveTrain[];
  isHoliday: boolean;
  onToggleHoliday: (val: boolean) => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onOpenInstall?: () => void;
  isSidebarOpen: boolean;
  onCloseSidebar?: () => void;
  selectedLineIds: LineId[];
  onChangeSelectedLines: (lineIds: LineId[]) => void;
  filterDirection: 'all' | Direction;
  onChangeFilterDirection: (direction: 'all' | Direction) => void;
  filterType: 'all' | 'rapid' | 'local';
  onChangeFilterType: (type: 'all' | 'rapid' | 'local') => void;
  selectedTrain?: ActiveTrain | null;
  isTrackingTrain?: boolean;
  onOpenSidebar?: () => void;
  onStopTracking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectStation,
  onSelectTrain,
  activeTrains,
  isHoliday,
  onToggleHoliday,
  onOpenSettings,
  onOpenHelp,
  onOpenInstall,
  isSidebarOpen,
  onCloseSidebar,
  selectedLineIds,
  onChangeSelectedLines,
  filterDirection,
  onChangeFilterDirection,
  filterType,
  onChangeFilterType,
  selectedTrain,
  isTrackingTrain = false,
  onOpenSidebar,
  onStopTracking,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // PWAインストール状態の監視
  useEffect(() => {
    setIsStandalone(isRunningStandalone());
    const unsubscribe = subscribeInstallState((canPrompt) => {
      setCanInstall(canPrompt);
    });
    return unsubscribe;
  }, []);

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

  // モバイル用チップバーのスクロール状態管理
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    // わずかなサブピクセル誤差を吸収するためバッファ (2px) を考慮
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(maxScroll > 2 && scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(() => {
      updateScrollState();
    });
    resizeObserver.observe(el);
    Array.from(el.children).forEach((child) => resizeObserver.observe(child));

    window.addEventListener('resize', updateScrollState);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState, activeTrains.length, isHoliday, selectedLineIds, filterDirection, filterType, isSidebarOpen]);

  // 見切れている方向のみフェードする動的マスクスタイル
  const scrollMaskStyle = useMemo<React.CSSProperties>(() => {
    if (!canScrollLeft && !canScrollRight) {
      return {};
    }
    const fadeSize = '24px';
    let gradient = '';

    if (canScrollLeft && canScrollRight) {
      gradient = `linear-gradient(to right, transparent 0, black ${fadeSize}, black calc(100% - ${fadeSize}), transparent 100%)`;
    } else if (canScrollLeft) {
      gradient = `linear-gradient(to right, transparent 0, black ${fadeSize}, black 100%)`;
    } else if (canScrollRight) {
      gradient = `linear-gradient(to right, black calc(100% - ${fadeSize}), transparent 100%)`;
    }

    return {
      WebkitMaskImage: gradient,
      maskImage: gradient,
    };
  }, [canScrollLeft, canScrollRight]);

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

  // ステータスカプセル群（ダイヤ種別、走行列車数）の共通JSX
  const statusCapsulesJsx = (
    <>
      {/* アプリインストールボタン (ブラウザ起動時のみ) */}
      {!isStandalone && onOpenInstall && (
        <button
          type="button"
          onClick={onOpenInstall}
          className="pointer-events-auto shrink-0 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md text-xs font-semibold text-sky-700 shadow-md border border-sky-200 hover:bg-sky-50 hover:border-sky-300 transition-all group"
          title="ホーム画面またはPCにアプリとしてインストール"
        >
          <Download className="w-3.5 h-3.5 text-sky-600 group-hover:scale-110 transition-transform shrink-0" />
          <span className="whitespace-nowrap">アプリをインストール</span>
          {canInstall && (
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse shrink-0" />
          )}
        </button>
      )}

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

            {/* 一体型ボタン: インストール(↓) ＆ ヘルプ(?) ＆ 設定(⚙) */}
            <div className="flex items-center gap-0.5 border-l border-slate-200 pl-1.5 shrink-0">
              {!isStandalone && onOpenInstall && (
                <button
                  type="button"
                  onClick={onOpenInstall}
                  className="p-1.5 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-md transition-colors relative"
                  title="アプリとしてインストール"
                >
                  <Download className="w-4 h-4" />
                  {canInstall && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-500 animate-pulse ring-1 ring-white" />
                  )}
                </button>
              )}
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
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            style={scrollMaskStyle}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5 w-full"
          >
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
        </div>
      )}

      {/* 追尾中バー (サイドバーが閉じていて自動追尾中の場合に表示) */}
      {!isSidebarOpen && isTrackingTrain && selectedTrain && (
        <TrackingBar
          train={selectedTrain}
          onOpenSidebar={() => onOpenSidebar?.()}
          onStopTracking={() => onStopTracking?.()}
        />
      )}
    </header>
  );
};
