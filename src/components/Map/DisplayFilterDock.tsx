import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Layers, Filter, CheckSquare, Square, RotateCcw, ChevronDown, X } from 'lucide-react';
import type { LineId, Direction } from '../../types';
import { getAllLines } from '../../data/linesRegistry';

interface DisplayFilterDockProps {
  selectedLineIds: LineId[];
  onChangeSelectedLines: (lineIds: LineId[]) => void;
  filterDirection: 'all' | Direction;
  onChangeFilterDirection: (direction: 'all' | Direction) => void;
  filterType: 'all' | 'rapid' | 'local';
  onChangeFilterType: (type: 'all' | 'rapid' | 'local') => void;
  mode?: 'desktop' | 'mobile' | 'both';
}

export const DisplayFilterDock: React.FC<DisplayFilterDockProps> = ({
  selectedLineIds,
  onChangeSelectedLines,
  filterDirection,
  onChangeFilterDirection,
  filterType,
  onChangeFilterType,
  mode = 'both',
}) => {
  const [isLineDropdownOpen, setIsLineDropdownOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const lineDropdownRef = useRef<HTMLDivElement>(null);

  const allLines = getAllLines();

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

  // 路線トグル
  const handleToggleLine = (lineId: LineId) => {
    if (selectedLineIds.includes(lineId)) {
      if (selectedLineIds.length > 1) {
        onChangeSelectedLines(selectedLineIds.filter((id) => id !== lineId));
      }
    } else {
      onChangeSelectedLines([...selectedLineIds, lineId]);
    }
  };

  // 全路線選択
  const handleSelectAllLines = () => {
    onChangeSelectedLines(allLines.map((l) => l.id));
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
      : selectedLineIds.length === 1
      ? allLines.find((l) => l.id === selectedLineIds[0])?.shortName || '1路線'
      : `${selectedLineIds.length}路線`;

  const showDesktop = mode === 'desktop' || mode === 'both';
  const showMobile = mode === 'mobile' || mode === 'both';

  return (
    <div className="pointer-events-auto">
      {/* 1. デスクトップ用: 一体型フィルタードック */}
      {showDesktop && (
        <div className={`${mode === 'both' ? 'hidden sm:flex' : 'flex'} items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200/80 text-xs`}>
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
              <div className="absolute left-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    表示路線
                  </span>
                  <button
                    type="button"
                    onClick={handleSelectAllLines}
                    className="text-[11px] text-sky-600 hover:text-sky-700 hover:underline font-semibold"
                  >
                    全選択
                  </button>
                </div>

                <div className="p-1.5 space-y-1">
                  {allLines.map((line) => {
                    const isChecked = selectedLineIds.includes(line.id);
                    const isOnly = selectedLineIds.length === 1 && isChecked;

                    return (
                      <div
                        key={line.id}
                        onClick={() => handleToggleLine(line.id)}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${
                          isChecked ? 'bg-slate-50 hover:bg-slate-100/80' : 'hover:bg-slate-50/60 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <button type="button" className="text-slate-600">
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-sky-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: line.lineColor }}
                          />
                          <span className="text-xs font-semibold text-slate-800 truncate">
                            {line.name}
                          </span>
                        </div>
                        {!isOnly && (
                          <button
                            type="button"
                            onClick={(e) => handleSelectOnlyLine(line.id, e)}
                            className="text-[10px] text-slate-400 hover:text-sky-600 px-1.5 py-0.5 rounded hover:bg-sky-50 transition-colors shrink-0 whitespace-nowrap"
                          >
                            のみ
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
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
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-md border text-xs font-semibold backdrop-blur-md transition-all ${
              isFiltered
                ? 'bg-sky-50/95 text-sky-800 border-sky-300 ring-2 ring-sky-400/20'
                : 'bg-white/95 text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="表示絞り込み"
          >
            <Filter className={`w-3.5 h-3.5 ${isFiltered ? 'text-sky-600' : 'text-slate-500'} shrink-0`} />
            <span className="whitespace-nowrap">絞り込み</span>
            {isFiltered && (
              <span className="w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white shrink-0" />
            )}
          </button>

          {/* モバイル用 ボトムシートモーダル (親の overflow-x-auto で隠れないよう createPortal で document.body に描画) */}
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
                  className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-h-[85vh] overflow-y-auto space-y-4 animate-in slide-in-from-bottom-6 duration-200 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {/* ヘッダー */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                    <span className="font-bold text-slate-800 text-base flex items-center gap-2">
                      <Filter className="w-5 h-5 text-sky-600" />
                      表示フィルター
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
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-slate-600 font-bold text-xs">
                      <span>表示路線</span>
                      <button
                        type="button"
                        onClick={handleSelectAllLines}
                        className="text-sky-600 hover:underline text-xs font-semibold"
                      >
                        全選択
                      </button>
                    </div>
                    <div className="space-y-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                      {allLines.map((line) => {
                        const isChecked = selectedLineIds.includes(line.id);
                        const isOnly = selectedLineIds.length === 1 && isChecked;

                        return (
                          <div
                            key={line.id}
                            onClick={() => handleToggleLine(line.id)}
                            className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-100 cursor-pointer active:bg-slate-200/60 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4 text-sky-600 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 shrink-0" />
                              )}
                              <span
                                className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                                style={{ backgroundColor: line.lineColor }}
                              />
                              <span className="font-semibold text-slate-800 text-sm leading-snug">{line.name}</span>
                            </div>
                            {!isOnly && (
                              <button
                                type="button"
                                onClick={(e) => handleSelectOnlyLine(line.id, e)}
                                className="text-xs text-slate-500 hover:text-sky-600 px-2 py-0.5 rounded bg-white border border-slate-200 shadow-xs shrink-0 whitespace-nowrap self-center"
                              >
                                のみ
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 進行方向 */}
                  <div className="space-y-2">
                    <div className="text-slate-600 font-bold text-xs">進行方向</div>
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
                    <div className="text-slate-600 font-bold text-xs">列車種別</div>
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
