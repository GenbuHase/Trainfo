import React from 'react';
import { Palette, Sliders } from 'lucide-react';
import { getTrainTypeConfig } from '../../../data/linesRegistry';
import { TrainTypeBadge } from '../../Common/Badges';
import type { CustomTrainPlan } from '../../../services/testTrainService';
import {
  CUSTOM_TYPE_PRESETS,
  COLOR_SWATCHES,
  type RouteSummaryInfo,
} from './constants';

interface CustomizeTabProps {
  computedPlan: CustomTrainPlan;
  routeSummary: RouteSummaryInfo | null;
  onSetPlan: React.Dispatch<React.SetStateAction<CustomTrainPlan>>;
}

export const CustomizeTab: React.FC<CustomizeTabProps> = ({
  computedPlan,
  routeSummary,
  onSetPlan,
}) => {
  return (
    <div className="space-y-4">
      {/* リアルタイム表示プレビュー */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <TrainTypeBadge
                type={computedPlan.segments[0]?.trainType || 'test_run'}
                size="md"
                lineId={computedPlan.segments[0]?.lineId}
                customType={
                  computedPlan.useCustomType ? computedPlan.customTrainType : undefined
                }
              />
              {computedPlan.trainName.trim() && (
                <span className="font-extrabold text-sm text-amber-300 tracking-wide">
                  {computedPlan.trainName}
                </span>
              )}
              <span className="font-mono text-xs text-amber-200 font-bold">
                {computedPlan.defaultTrainNumber || '試9001レ'}
              </span>
              <span className="text-xs text-slate-400">({computedPlan.cars}両編成)</span>
            </div>
            <div className="text-lg font-black">
              {routeSummary?.destName || '終着'} 行
              <span className="text-xs font-normal text-slate-300 ml-2">
                （始発：{routeSummary?.originName} {routeSummary?.depTimeStr}発）
              </span>
            </div>
          </div>

          {/* マップピン風プレビュー */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-700">
            {(() => {
              const previewConf = getTrainTypeConfig(
                computedPlan.segments[0]?.trainType || 'test_run',
                computedPlan.segments[0]?.lineId,
                computedPlan.useCustomType ? computedPlan.customTrainType : undefined
              );
              return (
                <>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md"
                    style={{ backgroundColor: previewConf.bgColor }}
                  >
                    電車
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] text-white"
                      style={{ backgroundColor: previewConf.bgColor }}
                    >
                      {previewConf.shortName}
                    </span>
                    {computedPlan.trainName.trim() && (
                      <span className="text-amber-300">{computedPlan.trainName.trim()}</span>
                    )}
                    <span>{routeSummary?.destName}</span>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* 種別名・カラー設定カード */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-sky-600" />
              <span>種別名</span>
            </h4>
          </div>

          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
            <button
              type="button"
              onClick={() => onSetPlan((prev) => ({ ...prev, useCustomType: true }))}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                computedPlan.useCustomType
                  ? 'bg-white text-sky-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              任意の種別
            </button>
            <button
              type="button"
              onClick={() => onSetPlan((prev) => ({ ...prev, useCustomType: false }))}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                !computedPlan.useCustomType
                  ? 'bg-white text-sky-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              標準種別
            </button>
          </div>
        </div>

        {computedPlan.useCustomType && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            {/* クイック種別チップ */}
            <div>
              <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
                プリセット：
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CUSTOM_TYPE_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() =>
                      onSetPlan((prev) => ({
                        ...prev,
                        useCustomType: true,
                        customTrainType: { ...preset },
                      }))
                    }
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span>{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  種別名
                </label>
                <input
                  type="text"
                  value={computedPlan.customTrainType.name}
                  onChange={(e) => {
                    const val = e.target.value;
                    onSetPlan((prev) => ({
                      ...prev,
                      customTrainType: {
                        ...prev.customTrainType,
                        name: val,
                        shortName: val.trim().slice(0, 2) || '試',
                      },
                    }));
                  }}
                  placeholder="試運転"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  種別略称
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={computedPlan.customTrainType.shortName || ''}
                  onChange={(e) =>
                    onSetPlan((prev) => ({
                      ...prev,
                      customTrainType: {
                        ...prev.customTrainType,
                        shortName: e.target.value,
                      },
                    }))
                  }
                  placeholder="試"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">
                  カラー
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {COLOR_SWATCHES.map((hex) => (
                    <button
                      key={hex}
                      type="button"
                      onClick={() =>
                        onSetPlan((prev) => ({
                          ...prev,
                          customTrainType: {
                            ...prev.customTrainType,
                            color: hex,
                          },
                        }))
                      }
                      className={`w-5 h-5 rounded-full transition-transform ${
                        computedPlan.customTrainType.color === hex
                          ? 'scale-125 ring-2 ring-slate-800 ring-offset-1'
                          : 'hover:scale-110'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                  <input
                    type="color"
                    value={computedPlan.customTrainType.color || '#0284c7'}
                    onChange={(e) =>
                      onSetPlan((prev) => ({
                        ...prev,
                        customTrainType: {
                          ...prev.customTrainType,
                          color: e.target.value,
                        },
                      }))
                    }
                    className="w-6 h-6 rounded cursor-pointer border border-slate-200"
                    title="自由な色を選択"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 固有列車名称・列車番号・両数・再生倍速 */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-2xs">
        <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-sky-600" />
          <span>列車名称・列車番号・両数</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              列車名称
            </label>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={computedPlan.trainName}
                onChange={(e) =>
                  onSetPlan((prev) => ({ ...prev, trainName: e.target.value }))
                }
                placeholder="なし（例: Fライナー, ミステリー号, 小川町観光号）"
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
              {computedPlan.trainName && (
                <button
                  type="button"
                  onClick={() => onSetPlan((prev) => ({ ...prev, trainName: '' }))}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
                >
                  クリア
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              列車番号
            </label>
            <input
              type="text"
              value={computedPlan.defaultTrainNumber}
              onChange={(e) =>
                onSetPlan((prev) => ({ ...prev, defaultTrainNumber: e.target.value }))
              }
              placeholder="試9001レ"
              className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* 両数設定 */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
              編成両数 ({computedPlan.cars}両編成)
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[2, 4, 6, 8, 10, 12, 15].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onSetPlan((prev) => ({ ...prev, cars: c }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    computedPlan.cars === c
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {c}両
                </button>
              ))}
            </div>
          </div>

          {/* 観測再生倍速 */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
              観測再生倍速
            </label>
            <div className="flex items-center gap-1.5 flex-wrap">
              {[1, 2, 5, 10, 30, 60].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onSetPlan((prev) => ({ ...prev, speedMultiplier: s }))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    computedPlan.speedMultiplier === s
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
