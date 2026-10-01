import React, { useState, useRef, useEffect } from 'react';
import { Layers, CheckSquare, Square } from 'lucide-react';
import type { LineId } from '../../types';
import { getAllLines } from '../../data/linesRegistry';

interface LineFilterDropdownProps {
  selectedLineIds: LineId[];
  onChangeSelectedLines: (lineIds: LineId[]) => void;
}

export const LineFilterDropdown: React.FC<LineFilterDropdownProps> = ({
  selectedLineIds,
  onChangeSelectedLines,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const allLines = getAllLines();

  // 外側クリックで閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // トグル処理
  const handleToggleLine = (lineId: LineId) => {
    if (selectedLineIds.includes(lineId)) {
      // 最低1路線は選択を残す（完全に空にはしない）
      if (selectedLineIds.length > 1) {
        onChangeSelectedLines(selectedLineIds.filter((id) => id !== lineId));
      }
    } else {
      onChangeSelectedLines([...selectedLineIds, lineId]);
    }
  };

  // すべて選択
  const handleSelectAll = () => {
    onChangeSelectedLines(allLines.map((l) => l.id));
  };

  // 単独選択（クイック切り替え）
  const handleSelectOnly = (lineId: LineId, e: React.MouseEvent) => {
    e.stopPropagation();
    onChangeSelectedLines([lineId]);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* トリガーボタン */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-lg shadow-sm border border-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
        title="表示する路線を選択"
      >
        <Layers className="w-4 h-4 text-sky-600" />
        <span className="hidden xs:inline">表示路線:</span>
        <span className="font-bold text-sky-700">
          {selectedLineIds.length === allLines.length
            ? '全路線 (同時運行)'
            : selectedLineIds.length === 1
            ? allLines.find((l) => l.id === selectedLineIds[0])?.shortName || '1路線'
            : `${selectedLineIds.length}路線`}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
          {selectedLineIds.length}/{allLines.length}
        </span>
      </button>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 sm:w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              路線フィルター
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] text-sky-600 hover:text-sky-700 hover:underline px-1.5 py-0.5 font-medium"
              >
                全選択
              </button>
            </div>
          </div>

          <div className="p-1.5 space-y-1">
            {allLines.map((line) => {
              const isChecked = selectedLineIds.includes(line.id);
              const isOnly = selectedLineIds.length === 1 && isChecked;

              return (
                <div
                  key={line.id}
                  onClick={() => handleToggleLine(line.id)}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors ${
                    isChecked ? 'bg-slate-50 hover:bg-slate-100/80' : 'hover:bg-slate-50/60 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      aria-label={`${line.name}を表示切替`}
                      className="text-slate-600 focus:outline-none"
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-sky-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </button>

                    {/* 路線カラーインジケーター */}
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0 shadow-xs"
                      style={{ backgroundColor: line.lineColor }}
                    />

                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                        {line.name}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {line.operator} • 全{line.stations.length}駅
                      </div>
                    </div>
                  </div>

                  {/* この路線だけ表示するクイックボタン */}
                  {!isOnly && (
                    <button
                      type="button"
                      onClick={(e) => handleSelectOnly(line.id, e)}
                      className="text-[10px] text-slate-400 hover:text-sky-600 px-1.5 py-0.5 rounded hover:bg-sky-50 transition-colors ml-1 flex-shrink-0"
                      title="この路線のみを表示"
                    >
                      のみ
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-3 pt-2 pb-1 border-t border-slate-100 text-[10px] text-slate-400">
            複数選択で同時運行シミュレーションが可能です
          </div>
        </div>
      )}
    </div>
  );
};
