import React from 'react';
import {
  Save,
  GripVertical,
  Check,
  X,
  Pencil,
  Trash2,
} from 'lucide-react';
import { getLine } from '../../../data/linesRegistry';
import { STATION_MAP } from '../../../data/stations';
import {
  recalculatePlanSchedule,
  deleteCustomTrainPreset,
  type CustomTrainPlan,
} from '../../../services/testTrainService';
import type { CreatorTab } from './constants';

interface PresetsTabProps {
  currentSec: number;
  presetNameInput: string;
  saveSuccessMessage: string | null;
  savedPresets: CustomTrainPlan[];
  draggedPresetIdx: number | null;
  dragOverPresetIdx: number | null;
  editingPresetId: string | null;
  editingPresetNameValue: string;
  onSetPresetNameInput: (val: string) => void;
  onSavePreset: () => void;
  onPresetDragStart: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onPresetDragOver: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  onPresetDrop: (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => void;
  onPresetDragEnd: () => void;
  onSetEditingPresetNameValue: (val: string) => void;
  onStartRenamePreset: (preset: CustomTrainPlan) => void;
  onCommitRenamePreset: (presetId: string) => void;
  onCancelRenamePreset: () => void;
  onSetPlan: React.Dispatch<React.SetStateAction<CustomTrainPlan>>;
  onSetActiveTab: (tab: CreatorTab) => void;
  onSetSavedPresets: React.Dispatch<React.SetStateAction<CustomTrainPlan[]>>;
}

export const PresetsTab: React.FC<PresetsTabProps> = ({
  currentSec,
  presetNameInput,
  saveSuccessMessage,
  savedPresets,
  draggedPresetIdx,
  dragOverPresetIdx,
  editingPresetId,
  editingPresetNameValue,
  onSetPresetNameInput,
  onSavePreset,
  onPresetDragStart,
  onPresetDragOver,
  onPresetDrop,
  onPresetDragEnd,
  onSetEditingPresetNameValue,
  onStartRenamePreset,
  onCommitRenamePreset,
  onCancelRenamePreset,
  onSetPlan,
  onSetActiveTab,
  onSetSavedPresets,
}) => {
  return (
    <div className="space-y-4">
      {/* 現在の設定を保存 */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
        <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
          <Save className="w-4 h-4 text-sky-600" />
          <span>新規保存</span>
        </h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={presetNameInput}
            onChange={(e) => onSetPresetNameInput(e.target.value)}
            placeholder="プリセット名"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          />
          <button
            type="button"
            onClick={onSavePreset}
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            <span>保存する</span>
          </button>
        </div>
        {saveSuccessMessage && (
          <p className="text-xs font-bold text-emerald-600">{saveSuccessMessage}</p>
        )}
      </div>

      {/* プリセット一覧 */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-extrabold text-slate-800">
            プリセット ({savedPresets.length}件)
          </h4>
          {savedPresets.length > 1 && (
            <span className="text-[10px] text-slate-400 font-medium">
              ドラッグ＆ドロップで並び替え
            </span>
          )}
        </div>
        {savedPresets.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            保存されたプリセットはありません
          </p>
        ) : (
          <div className="space-y-2">
            {savedPresets.map((p, idx) => {
              const firstLine = getLine(p.segments[0]?.lineId);
              const lastLine = getLine(p.segments[p.segments.length - 1]?.lineId);
              const isDragging = draggedPresetIdx === idx;
              const isDragOver =
                dragOverPresetIdx === idx &&
                draggedPresetIdx !== null &&
                draggedPresetIdx !== idx;
              const isEditingName = editingPresetId === p.id;

              return (
                <div
                  key={p.id}
                  draggable={!isEditingName}
                  onDragStart={(e) => onPresetDragStart(e, idx)}
                  onDragOver={(e) => onPresetDragOver(e, idx)}
                  onDrop={(e) => onPresetDrop(e, idx)}
                  onDragEnd={onPresetDragEnd}
                  className={`group flex items-center justify-between gap-2 p-3 rounded-xl border transition-all select-none ${
                    isDragging
                      ? 'opacity-45 border-sky-400 bg-sky-50/40'
                      : isDragOver
                      ? 'border-sky-500 ring-2 ring-sky-500/20 bg-sky-50/70'
                      : 'border-slate-200 hover:border-sky-300 bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div
                      className="p-1 -ml-1 text-slate-400 group-hover:text-slate-600 cursor-grab active:cursor-grabbing shrink-0"
                      title="ドラッグして並び替え"
                    >
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      {isEditingName ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={editingPresetNameValue}
                            onChange={(e) => onSetEditingPresetNameValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') onCommitRenamePreset(p.id);
                              if (e.key === 'Escape') onCancelRenamePreset();
                            }}
                            autoFocus
                            className="flex-1 min-w-0 px-2 py-1 bg-white border border-sky-400 rounded-md text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                          />
                          <button
                            type="button"
                            onClick={() => onCommitRenamePreset(p.id)}
                            className="p-1 rounded-md bg-sky-600 text-white hover:bg-sky-700 transition-colors shrink-0"
                            title="名前を保存"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={onCancelRenamePreset}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/70 transition-colors shrink-0"
                            title="キャンセル"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-xs text-slate-800 truncate">
                            {p.presetName || 'マイプリセット'}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-bold shrink-0">
                            {p.segments.length}路線
                          </span>
                          {p.trainName && (
                            <span className="text-[10px] font-bold text-amber-700 truncate">
                              「{p.trainName}」
                            </span>
                          )}
                        </div>
                      )}
                      <p className="text-[11px] text-slate-500 truncate">
                        {firstLine?.shortName} (
                        {STATION_MAP.get(p.segments[0]?.fromStationId)?.name}) ➔{' '}
                        {lastLine?.shortName} (
                        {
                          STATION_MAP.get(
                            p.segments[p.segments.length - 1]?.toStationId
                          )?.name
                        }
                        )
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSetPlan(recalculatePlanSchedule(p, currentSec));
                        onSetPresetNameInput(p.presetName || '');
                        onSetActiveTab('customize');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors"
                    >
                      読込
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartRenamePreset(p)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-colors"
                      title="プリセット名を変更"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onSetSavedPresets(deleteCustomTrainPreset(p.id))}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
