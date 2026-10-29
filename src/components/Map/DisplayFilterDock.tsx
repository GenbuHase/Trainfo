import React, { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  Layers,
  Filter,
  CheckSquare,
  Square,
  MinusSquare,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  X,
  Search,
} from 'lucide-react';
import type { LineId, LineDefinition, RegionArea } from '../../types';
import {
  getAllLines,
  getLinesGroupedByOperator,
  getLinesGroupedByArea,
  AREA_INFO,
} from '../../data/linesRegistry';

import { useSelection } from '../../contexts/SelectionContext';
import { useFilter } from '../../contexts/FilterContext';

interface DisplayFilterDockProps {
  mode?: 'desktop' | 'mobile' | 'both';
}

interface NormalizedGroup {
  id: string;
  title: string;
  icon?: string;
  lines: LineDefinition[];
}

export const DisplayFilterDock: React.FC<DisplayFilterDockProps> = ({
  mode = 'both',
}) => {
  const { selectedLineIds, setSelectedLineIds: onChangeSelectedLines } = useSelection();
  const {
    filterDirection,
    setFilterDirection: onChangeFilterDirection,
    filterType,
    setFilterType: onChangeFilterType,
  } = useFilter();

  const [isLineDropdownOpen, setIsLineDropdownOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const lineDropdownRef = useRef<HTMLDivElement>(null);

  const allLines = useMemo(() => getAllLines(), []);

  // 路線セレクターの内部状態
  const [groupMode, setGroupMode] = useState<'operator' | 'area'>('operator');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroupKeys, setExpandedGroupKeys] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    getLinesGroupedByOperator().forEach((g) => {
      if (g.lines.some((l) => selectedLineIds.includes(l.id))) {
        initial.add(g.operator);
      }
    });
    return initial;
  });

  // フィルターがデフォルト（全路線・全方向・全種別）から変更されているか
  const isFiltered =
    selectedLineIds.length !== allLines.length ||
    filterDirection !== 'all' ||
    filterType !== 'all';

  // 外側クリック検知 (PC版の路線ドロップダウン用)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (lineDropdownRef.current && !lineDropdownRef.current.contains(target)) {
        setIsLineDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // タブ切り替え時の自動初期展開
  const handleModeChange = (newMode: 'operator' | 'area') => {
    if (newMode === groupMode) return;
    setGroupMode(newMode);
    const newExpanded = new Set<string>();
    if (newMode === 'operator') {
      getLinesGroupedByOperator().forEach((g) => {
        if (g.lines.some((l) => selectedLineIds.includes(l.id))) {
          newExpanded.add(g.operator);
        }
      });
    } else {
      getLinesGroupedByArea().forEach((g) => {
        if (g.lines.some((l) => selectedLineIds.includes(l.id))) {
          newExpanded.add(g.area);
        }
      });
    }
    setExpandedGroupKeys(newExpanded);
  };

  // 検索クエリ適用時のグループおよび路線
  const rawGroups: NormalizedGroup[] = useMemo(() => {
    if (groupMode === 'operator') {
      return getLinesGroupedByOperator().map((g) => ({
        id: g.operator,
        title: g.operator,
        lines: g.lines,
      }));
    } else {
      return getLinesGroupedByArea().map((g) => ({
        id: g.area,
        title: g.title,
        icon: g.icon,
        lines: g.lines,
      }));
    }
  }, [groupMode]);

  const filteredGroups = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rawGroups;

    return rawGroups
      .map((g) => {
        const matched = g.lines.filter((l) => {
          const nameMatch =
            l.name.toLowerCase().includes(query) ||
            (l.shortName && l.shortName.toLowerCase().includes(query));
          const opMatch = (l.operator || '').toLowerCase().includes(query);
          const areaName = AREA_INFO[(l.area || 'kanto') as RegionArea]?.name.toLowerCase() || '';
          return nameMatch || opMatch || areaName.includes(query);
        });
        return { ...g, lines: matched };
      })
      .filter((g) => g.lines.length > 0);
  }, [rawGroups, searchQuery]);

  const allMatchedLines = useMemo(() => {
    return filteredGroups.flatMap((g) => g.lines);
  }, [filteredGroups]);

  // 検索入力ハンドラ（入力時はマッチするグループを自動展開）
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const q = query.trim().toLowerCase();
    if (q) {
      setExpandedGroupKeys((prev) => {
        const next = new Set(prev);
        rawGroups.forEach((g) => {
          const hasMatch = g.lines.some((l) => {
            const nameMatch =
              l.name.toLowerCase().includes(q) ||
              (l.shortName && l.shortName.toLowerCase().includes(q));
            const opMatch = (l.operator || '').toLowerCase().includes(q);
            const areaName = AREA_INFO[(l.area || 'kanto') as RegionArea]?.name.toLowerCase() || '';
            return nameMatch || opMatch || areaName.includes(q);
          });
          if (hasMatch) {
            next.add(g.id);
          }
        });
        return next;
      });
    }
  };

  // グループの開閉トグル
  const handleToggleGroup = (groupId: string) => {
    setExpandedGroupKeys((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // すべて展開 / 折り畳み
  const allVisibleExpanded =
    filteredGroups.length > 0 &&
    filteredGroups.every((g) => expandedGroupKeys.has(g.id));

  const handleToggleAllExpand = () => {
    if (allVisibleExpanded) {
      setExpandedGroupKeys((prev) => {
        const next = new Set(prev);
        filteredGroups.forEach((g) => next.delete(g.id));
        return next;
      });
    } else {
      setExpandedGroupKeys((prev) => {
        const next = new Set(prev);
        filteredGroups.forEach((g) => next.add(g.id));
        return next;
      });
    }
  };

  // 路線トグル
  const handleToggleLine = (lineId: LineId) => {
    if (selectedLineIds.includes(lineId)) {
      onChangeSelectedLines(selectedLineIds.filter((id) => id !== lineId));
    } else {
      onChangeSelectedLines([...selectedLineIds, lineId]);
    }
  };

  // 全路線選択（絞り込み時は表示中のみ選択）
  const isSearchActive = searchQuery.trim().length > 0;

  const handleSelectAllLines = () => {
    if (isSearchActive) {
      const newIds = new Set(selectedLineIds);
      allMatchedLines.forEach((l) => newIds.add(l.id));
      onChangeSelectedLines(Array.from(newIds));
    } else {
      onChangeSelectedLines(allLines.map((l) => l.id));
    }
  };

  // 全解除（絞り込み時は表示中のみ解除）
  const handleDeselectAllLines = () => {
    if (isSearchActive) {
      const matchedSet = new Set(allMatchedLines.map((l) => l.id));
      onChangeSelectedLines(selectedLineIds.filter((id) => !matchedSet.has(id)));
    } else {
      onChangeSelectedLines([]);
    }
  };

  // グループ単位の一括選択/解除
  const handleToggleGroupLines = (
    groupLines: LineDefinition[],
    isAllGroupSelected: boolean
  ) => {
    const groupLineIds = groupLines.map((l) => l.id);
    if (isAllGroupSelected) {
      const groupSet = new Set(groupLineIds);
      onChangeSelectedLines(selectedLineIds.filter((id) => !groupSet.has(id)));
    } else {
      const newSet = new Set(selectedLineIds);
      groupLineIds.forEach((id) => newSet.add(id));
      onChangeSelectedLines(Array.from(newSet));
    }
  };

  // グループ「のみ」選択
  const handleSelectOnlyGroup = (
    group: NormalizedGroup,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    onChangeSelectedLines(group.lines.map((l) => l.id));
    setExpandedGroupKeys((prev) => new Set(prev).add(group.id));
  };

  // 単独路線選択
  const handleSelectOnlyLine = (lineId: LineId, e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeSelectedLines([lineId]);
  };

  // 全フィルターをリセット
  const handleResetFilters = () => {
    onChangeSelectedLines(allLines.map((l) => l.id));
    onChangeFilterDirection('all');
    onChangeFilterType('all');
  };

  const lineSummaryText =
    selectedLineIds.length === allLines.length
      ? '全路線'
      : selectedLineIds.length === 0
      ? '0路線'
      : selectedLineIds.length === 1
      ? allLines.find((l) => l.id === selectedLineIds[0])?.shortName || '1路線'
      : `${selectedLineIds.length}路線`;

  const showDesktop = mode === 'desktop' || mode === 'both';
  const showMobile = mode === 'mobile' || mode === 'both';

  // 共通の路線セレクターUIコンポーネント
  const renderLineSelector = (isMobile = false) => (
    <div className="flex flex-col min-w-0">
      {/* コントロールヘッダー: 検索バー ＆ タブ ＆ 一括ボタン */}
      <div className="p-2 sm:p-2.5 bg-slate-50 border-b border-slate-200/80 space-y-2 shrink-0">
        {/* 検索入力 */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="路線名・会社名・エリア名で検索..."
            className="w-full pl-8 pr-7 py-1 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-800"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange('')}
              className="absolute right-2 top-1.5 text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 表示切り替えタブ ＆ 一括補助操作 */}
        <div className="flex items-center justify-between flex-wrap gap-1.5 text-xs">
          {/* 会社別 / エリア別 タブ */}
          <div className="flex bg-slate-200/80 p-0.5 rounded-lg font-medium shrink-0">
            <button
              type="button"
              onClick={() => handleModeChange('operator')}
              className={`px-2 py-0.5 rounded-md text-xs transition-all flex items-center gap-1 ${
                groupMode === 'operator'
                  ? 'bg-white text-sky-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🏢 会社別</span>
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('area')}
              className={`px-2 py-0.5 rounded-md text-xs transition-all flex items-center gap-1 ${
                groupMode === 'area'
                  ? 'bg-white text-sky-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🗺️ エリア別</span>
            </button>
          </div>

          {/* 一括操作ボタン */}
          <div className="flex items-center gap-1 text-xs shrink-0">
            <button
              type="button"
              onClick={handleToggleAllExpand}
              className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors whitespace-nowrap text-xs"
            >
              {allVisibleExpanded ? 'すべて折り畳む' : 'すべて展開'}
            </button>
            <div className="w-px h-3 bg-slate-300" />
            <button
              type="button"
              onClick={handleSelectAllLines}
              className="px-2 py-0.5 rounded bg-sky-50 hover:bg-sky-100 text-sky-700 font-semibold border border-sky-200 transition-colors whitespace-nowrap text-xs"
              title={isSearchActive ? `表示中の ${allMatchedLines.length} 路線を選択` : '全路線を選択'}
            >
              {isSearchActive ? `表示中全選択 (${allMatchedLines.length})` : '全選択'}
            </button>
            <button
              type="button"
              onClick={handleDeselectAllLines}
              className="px-2 py-0.5 rounded bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-colors whitespace-nowrap text-xs"
              title={isSearchActive ? '表示中の路線を選択解除' : '全路線を選択解除'}
            >
              {isSearchActive ? '表示中解除' : '全解除'}
            </button>
          </div>
        </div>
      </div>

      {/* グループリスト (アコーディオン) */}
      <div
        className={`p-1.5 space-y-1.5 overflow-y-auto divide-y divide-slate-100 ${
          isMobile ? 'max-h-[50vh]' : 'max-h-[60vh]'
        }`}
      >
        {filteredGroups.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            該当する路線が見つかりませんでした
          </div>
        ) : (
          filteredGroups.map((group) => {
            const isExpanded = expandedGroupKeys.has(group.id);
            const selectedInGroup = group.lines.filter((l) =>
              selectedLineIds.includes(l.id)
            ).length;
            const isAllGroupSelected =
              selectedInGroup === group.lines.length && group.lines.length > 0;
            const isSomeGroupSelected =
              selectedInGroup > 0 && !isAllGroupSelected;

            return (
              <div key={group.id} className="pt-1.5 first:pt-0">
                {/* グループヘッダー */}
                <div
                  onClick={() => handleToggleGroup(group.id)}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-100/90 hover:bg-slate-200/80 transition-colors cursor-pointer select-none border border-slate-200/80"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <span className="text-slate-400 shrink-0 w-3.5 flex items-center justify-center">
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleGroupLines(group.lines, isAllGroupSelected);
                      }}
                      className="focus:outline-none shrink-0"
                      title={
                        isAllGroupSelected
                          ? 'グループ内をすべて解除'
                          : 'グループ内をすべて選択'
                      }
                    >
                      {isAllGroupSelected ? (
                        <CheckSquare className="w-4 h-4 text-sky-600" />
                      ) : isSomeGroupSelected ? (
                        <MinusSquare className="w-4 h-4 text-sky-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    <span className="text-xs font-bold text-slate-800 truncate">
                      {group.icon ? `${group.icon} ` : ''}
                      {group.title}
                    </span>

                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        selectedInGroup > 0
                          ? 'bg-sky-100 text-sky-700 font-semibold'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {selectedInGroup}/{group.lines.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => handleSelectOnlyGroup(group, e)}
                      className="text-xs font-semibold px-2 py-0.5 rounded bg-white hover:bg-sky-50 text-slate-600 hover:text-sky-700 border border-slate-200 shadow-2xs transition-colors"
                      title={`${group.title} の路線のみを表示`}
                    >
                      のみ
                    </button>
                  </div>
                </div>

                {/* 路線アイテムリスト */}
                {isExpanded && (
                  <div className="pl-2 pr-1 pt-1 space-y-0.5">
                    {group.lines.map((line) => {
                      const isChecked = selectedLineIds.includes(line.id);
                      const isOnly =
                        selectedLineIds.length === 1 && isChecked;

                      return (
                        <div
                          key={line.id}
                          onClick={() => handleToggleLine(line.id)}
                          className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                            isChecked
                              ? 'bg-sky-50/70 hover:bg-sky-100/60'
                              : 'hover:bg-slate-50/60 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 mr-2">
                            <button
                              type="button"
                              className="text-slate-600 focus:outline-none shrink-0"
                            >
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-sky-600" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                              style={{ backgroundColor: line.lineColor }}
                            />
                            <span className="text-xs font-semibold text-slate-800 truncate">
                              {line.name}
                            </span>
                          </div>

                          {!isOnly && (
                            <button
                              type="button"
                              onClick={(e) =>
                                handleSelectOnlyLine(line.id, e)
                              }
                              className="text-xs text-slate-400 hover:text-sky-700 px-1.5 py-0.5 rounded hover:bg-sky-50 transition-colors shrink-0 whitespace-nowrap font-medium"
                              title={`${line.name} のみ表示`}
                            >
                              のみ
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="pointer-events-auto">
      {/* 1. デスクトップ用: 一体型フィルタードック */}
      {showDesktop && (
        <div
          className={`${
            mode === 'both' ? 'hidden sm:flex' : 'flex'
          } items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 text-xs`}
        >
          {/* 路線ドロップダウン */}
          <div className="relative" ref={lineDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLineDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-slate-700 hover:bg-slate-100/80 font-semibold transition-colors"
              title="表示路線を切り替え"
            >
              <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>路線:</span>
              <span className="font-bold text-sky-700">{lineSummaryText}</span>
              <span className="text-[10px] px-1 rounded bg-slate-100 text-slate-500 font-mono">
                {selectedLineIds.length}/{allLines.length}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {/* 路線選択ポップオーバー */}
            {isLineDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    表示路線
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedLineIds.length}/{allLines.length} 路線
                  </span>
                </div>

                {renderLineSelector(false)}
              </div>
            )}
          </div>

          {/* 区切り線 */}
          <div className="w-[1px] h-4 bg-slate-200" />

          {/* 進行方向セグメント */}
          <div className="flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-lg font-medium">
            <button
              type="button"
              onClick={() => onChangeFilterDirection('all')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                filterDirection === 'all'
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              全方向
            </button>
            <button
              type="button"
              onClick={() => onChangeFilterDirection('inbound')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                filterDirection === 'inbound'
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              上り
            </button>
            <button
              type="button"
              onClick={() => onChangeFilterDirection('outbound')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                filterDirection === 'outbound'
                  ? 'bg-sky-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              下り
            </button>
          </div>

          {/* 区切り線 */}
          <div className="w-[1px] h-4 bg-slate-200" />

          {/* 種別セグメント */}
          <div className="flex items-center gap-0.5 bg-slate-100/80 p-0.5 rounded-lg font-medium">
            <button
              type="button"
              onClick={() => onChangeFilterType('all')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                filterType === 'all'
                  ? 'bg-slate-800 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              全種別
            </button>
            <button
              type="button"
              onClick={() => onChangeFilterType('rapid')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                filterType === 'rapid'
                  ? 'bg-red-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              優等
            </button>
            <button
              type="button"
              onClick={() => onChangeFilterType('local')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                filterType === 'local'
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              普通/各停
            </button>
          </div>

          {/* フィルター解除ボタン (絞り込み時のみ表示) */}
          {isFiltered && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              title="フィルターを初期状態にリセット"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* 2. モバイル用: チップバーと完璧に揃うコンパクトなフィルターボタン ＆ ポップオーバー */}
      {showMobile && (
        <div className={`relative ${mode === 'both' ? 'sm:hidden' : ''}`}>
          <button
            type="button"
            onClick={() => setIsMobileModalOpen((prev) => !prev)}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-md border text-xs font-semibold backdrop-blur-md whitespace-nowrap transition-all ${
              isFiltered
                ? 'bg-sky-50/95 text-sky-800 border-sky-300 ring-2 ring-sky-400/20'
                : 'bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="表示絞り込み"
          >
            <Filter
              className={`w-3.5 h-3.5 ${
                isFiltered ? 'text-sky-600' : 'text-slate-500'
              } shrink-0`}
            />
            <span className="whitespace-nowrap">絞り込み</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 whitespace-nowrap ${
                isFiltered
                  ? 'bg-sky-100/90 text-sky-700 font-bold'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {selectedLineIds.length}/{allLines.length}
            </span>
          </button>

          {/* モバイル用 ボトムシートモーダル */}
          {isMobileModalOpen &&
            typeof document !== 'undefined' &&
            createPortal(
              <div className="fixed inset-0 z-[2000] flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 p-3 sm:hidden pointer-events-auto">
                {/* 背景タップで閉じる */}
                <div
                  className="absolute inset-0"
                  onClick={() => setIsMobileModalOpen(false)}
                />

                <div
                  className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-h-[88vh] overflow-y-auto space-y-4 animate-in slide-in-from-bottom-6 duration-200 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {/* ヘッダー */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <span className="font-bold text-slate-800 text-base flex items-center gap-2">
                      <Filter className="w-5 h-5 text-sky-600" />
                      表示路線
                    </span>
                    <div className="flex items-center gap-2">
                      {isFiltered && (
                        <button
                          type="button"
                          onClick={handleResetFilters}
                          className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700 font-semibold px-2 py-1 rounded hover:bg-sky-50 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          リセット
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsMobileModalOpen(false)}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* 路線選択 */}
                  <div className="space-y-1.5">
                    <div className="text-slate-600 font-bold text-xs">
                      表示路線 ({selectedLineIds.length}/{allLines.length})
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-200/80 overflow-hidden">
                      {renderLineSelector(true)}
                    </div>
                  </div>

                  {/* 進行方向 */}
                  <div className="space-y-2">
                    <div className="text-slate-600 font-bold text-xs">
                      進行方向
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl font-medium text-center text-sm">
                      <button
                        type="button"
                        onClick={() => onChangeFilterDirection('all')}
                        className={`py-2 rounded-lg transition-all ${
                          filterDirection === 'all'
                            ? 'bg-sky-600 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                      >
                        全方向
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeFilterDirection('inbound')}
                        className={`py-2 rounded-lg transition-all ${
                          filterDirection === 'inbound'
                            ? 'bg-sky-600 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                      >
                        上り
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeFilterDirection('outbound')}
                        className={`py-2 rounded-lg transition-all ${
                          filterDirection === 'outbound'
                            ? 'bg-sky-600 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                      >
                        下り
                      </button>
                    </div>
                  </div>

                  {/* 列車種別 */}
                  <div className="space-y-2">
                    <div className="text-slate-600 font-bold text-xs">
                      列車種別
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl font-medium text-center text-sm">
                      <button
                        type="button"
                        onClick={() => onChangeFilterType('all')}
                        className={`py-2 rounded-lg transition-all ${
                          filterType === 'all'
                            ? 'bg-slate-800 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                      >
                        全種別
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeFilterType('rapid')}
                        className={`py-2 rounded-lg transition-all ${
                          filterType === 'rapid'
                            ? 'bg-red-600 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                      >
                        優等
                      </button>
                      <button
                        type="button"
                        onClick={() => onChangeFilterType('local')}
                        className={`py-2 rounded-lg transition-all ${
                          filterType === 'local'
                            ? 'bg-emerald-600 text-white font-bold shadow-sm'
                            : 'text-slate-600 hover:bg-white/60'
                        }`}
                      >
                        普通/各停
                      </button>
                    </div>
                  </div>

                  {/* 完了ボタン */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsMobileModalOpen(false)}
                      className="w-full py-2.5 bg-slate-800 text-white rounded-xl font-bold text-center text-sm hover:bg-slate-900 transition-colors shadow-sm"
                    >
                      完了
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
      )}
    </div>
  );
};
