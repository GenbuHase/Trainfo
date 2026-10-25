import React from 'react';
import {
  Clock,
  RotateCcw,
  Search,
  X,
  Circle,
  CheckCircle2,
  Pin,
} from 'lucide-react';
import { getLine } from '../../../data/linesRegistry';
import { STATION_MAP } from '../../../data/stations';
import { StationBadge, TrainTypeBadge } from '../../Common/Badges';
import {
  recalculatePlanSchedule,
  secondsToHHMM,
  secondsToTimeString,
  hhmmToSeconds,
  type CustomTrainPlan,
} from '../../../services/testTrainService';

interface StopsTabProps {
  computedPlan: CustomTrainPlan;
  currentSec: number;
  selectedStopSegmentFilter: string;
  stationSearchQuery: string;
  onSetPlan: React.Dispatch<React.SetStateAction<CustomTrainPlan>>;
  onSetSelectedStopSegmentFilter: (filter: string) => void;
  onSetStationSearchQuery: (query: string) => void;
  onResetAllManualTimes: () => void;
  onApplyBatchStopPattern: (
    pattern: 'type_default' | 'all_stop' | 'major_only' | 'nonstop'
  ) => void;
  onToggleStationPassing: (segIdx: number, stopIdx: number) => void;
  onManualArrivalTimeChange: (segIdx: number, stopIdx: number, newHHMM: string) => void;
  onManualDepartureTimeChange: (segIdx: number, stopIdx: number, newHHMM: string) => void;
  onManualStopDurationChange: (segIdx: number, stopIdx: number, newDurationSec: number) => void;
}

export const StopsTab: React.FC<StopsTabProps> = ({
  computedPlan,
  currentSec,
  selectedStopSegmentFilter,
  stationSearchQuery,
  onSetPlan,
  onSetSelectedStopSegmentFilter,
  onSetStationSearchQuery,
  onResetAllManualTimes,
  onApplyBatchStopPattern,
  onToggleStationPassing,
  onManualArrivalTimeChange,
  onManualDepartureTimeChange,
  onManualStopDurationChange,
}) => {
  return (
    <div className="space-y-4">
      {/* 始発時刻・停車時間・一括停車設定コントロール */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
          {/* 始発駅の発車時刻モード */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>発車時刻</span>
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() =>
                    onSetPlan((prev) =>
                      recalculatePlanSchedule(
                        { ...prev, departureMode: 'now' },
                        currentSec
                      )
                    )
                  }
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    computedPlan.departureMode === 'now'
                      ? 'bg-white text-sky-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  現在時刻 ({secondsToHHMM(currentSec)})
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSetPlan((prev) =>
                      recalculatePlanSchedule(
                        {
                          ...prev,
                          departureMode: 'scheduled',
                          scheduledStartSec:
                            prev.scheduledStartSec || Math.floor(currentSec / 60) * 60,
                        },
                        currentSec
                      )
                    )
                  }
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    computedPlan.departureMode === 'scheduled'
                      ? 'bg-white text-sky-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  時刻指定
                </button>
              </div>

              {computedPlan.departureMode === 'scheduled' && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={secondsToHHMM(computedPlan.scheduledStartSec)}
                    onChange={(e) => {
                      const newSec = hhmmToSeconds(e.target.value);
                      onSetPlan((prev) =>
                        recalculatePlanSchedule(
                          { ...prev, scheduledStartSec: newSec },
                          currentSec
                        )
                      );
                    }}
                    className="px-2 py-1 border border-sky-300 rounded-lg text-xs font-mono font-bold text-slate-800 bg-sky-50/40"
                  />
                  <label className="inline-flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={computedPlan.seekToStartOnLaunch}
                      onChange={(e) =>
                        onSetPlan((prev) => ({
                          ...prev,
                          seekToStartOnLaunch: e.target.checked,
                        }))
                      }
                      className="rounded text-sky-600"
                    />
                    <span>発車時に指定された時刻へ移動</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* 標準停車時間 & 手動時刻リセット */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold text-slate-700">
                各駅の標準停車時間
              </label>
              <button
                type="button"
                onClick={onResetAllManualTimes}
                className="text-[10px] font-bold text-slate-500 hover:text-sky-700 flex items-center gap-1"
                title="個別に編集した時刻をすべて自動計算に戻します"
              >
                <RotateCcw className="w-3 h-3" />
                設定された時刻を自動計算に戻す
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              {[15, 20, 30, 60, 120].map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() =>
                    onSetPlan((prev) => {
                      const nextSegments = prev.segments.map((seg) => ({
                        ...seg,
                        stops: seg.stops.map((st) => ({
                          ...st,
                          stopDurationSec: st.isPassing
                            ? 0
                            : st.manualStopDurationSec ?? sec,
                        })),
                      }));
                      return recalculatePlanSchedule(
                        { ...prev, defaultStopSec: sec, segments: nextSegments },
                        currentSec
                      );
                    })
                  }
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    computedPlan.defaultStopSec === sec
                      ? 'bg-sky-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sec >= 60 ? `${sec / 60}分` : `${sec}秒`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 一括停車駅プリセット & 駅名クイック検索 */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-500 mr-1">停車駅一括設定:</span>
            <button
              type="button"
              onClick={() => onApplyBatchStopPattern('type_default')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              種別標準
            </button>
            <button
              type="button"
              onClick={() => onApplyBatchStopPattern('all_stop')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              全駅停車
            </button>
            <button
              type="button"
              onClick={() => onApplyBatchStopPattern('major_only')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              主要駅のみ停車
            </button>
            <button
              type="button"
              onClick={() => onApplyBatchStopPattern('nonstop')}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
              title="始発・終着以外をすべて通過にします。その後、停めたい駅（池袋・川越・坂戸など）をクリックするだけで独自の臨時列車が作れます"
            >
              始発・終着以外をすべて通過
            </button>
          </div>

          {/* 駅名検索フィルター */}
          <div className="relative w-full sm:w-52">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={stationSearchQuery}
              onChange={(e) => onSetStationSearchQuery(e.target.value)}
              placeholder="駅名で検索 (例: 川越, 坂戸)..."
              className="w-full pl-8 pr-6 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
            {stationSearchQuery && (
              <button
                type="button"
                onClick={() => onSetStationSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 複数路線時の路線絞り込みピル */}
      {computedPlan.segments.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => onSetSelectedStopSegmentFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              selectedStopSegmentFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            全路線を表示 ({computedPlan.segments.length}路線)
          </button>
          {computedPlan.segments.map((seg, idx) => {
            const l = getLine(seg.lineId);
            const stopCount = seg.stops.filter((s) => !s.isPassing).length;
            return (
              <button
                key={seg.id}
                type="button"
                onClick={() => onSetSelectedStopSegmentFilter(seg.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedStopSegmentFilter === seg.id
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: l?.lineColor }}
                />
                <span>
                  区間{idx + 1}: {l?.shortName} ({stopCount}/{seg.stops.length}駅停車)
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 停車駅・着発時刻タイムラインエディタ */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="grid grid-cols-12 bg-slate-100/90 border-b border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600">
          <div className="col-span-5 sm:col-span-4">駅名 / 路線</div>
          <div className="col-span-3 sm:col-span-2 text-center">停車 / 通過</div>
          <div className="col-span-4 sm:col-span-6 text-right sm:text-left sm:pl-4">
            到着時刻 / 発車時刻 / 停車時間
          </div>
        </div>

        <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
          {computedPlan.segments.map((seg, segIdx) => {
            if (
              selectedStopSegmentFilter !== 'all' &&
              selectedStopSegmentFilter !== seg.id
            ) {
              return null;
            }
            const line = getLine(seg.lineId);
            const q = stationSearchQuery.trim().toLowerCase();

            return (
              <React.Fragment key={seg.id}>
                {/* 路線セクション見出し */}
                <div
                  className="px-3 py-1.5 text-[11px] font-extrabold text-white flex items-center justify-between sticky top-0 z-10 shadow-2xs"
                  style={{ backgroundColor: line?.lineColor || '#334155' }}
                >
                  <span>
                    区間 {segIdx + 1}: {line?.name}
                  </span>
                  <TrainTypeBadge
                    type={seg.trainType}
                    size="sm"
                    lineId={seg.lineId}
                    customType={
                      computedPlan.useCustomType ? computedPlan.customTrainType : undefined
                    }
                  />
                </div>

                {seg.stops.map((stop, stopIdx) => {
                  const st = STATION_MAP.get(stop.stationId);
                  if (!st) return null;

                  if (
                    q &&
                    !st.name.toLowerCase().includes(q) &&
                    !st.nameKana.toLowerCase().includes(q) &&
                    !st.nameEn.toLowerCase().includes(q) &&
                    !st.id.toLowerCase().includes(q)
                  ) {
                    return null;
                  }

                  const isGlobalFirst = segIdx === 0 && stopIdx === 0;
                  const isGlobalLast =
                    segIdx === computedPlan.segments.length - 1 &&
                    stopIdx === seg.stops.length - 1;
                  const isEndpointLock = isGlobalFirst || isGlobalLast;
                  const hasManualOverride =
                    stop.manualArrivalSec !== undefined ||
                    stop.manualStopDurationSec !== undefined;

                  return (
                    <div
                      key={`${seg.id}_${stop.stationId}_${stopIdx}`}
                      className={`grid grid-cols-12 items-center px-3 py-2 text-xs transition-colors ${
                        stop.isPassing
                          ? 'bg-slate-50/60 text-slate-400'
                          : 'bg-white text-slate-800 hover:bg-sky-50/30'
                      }`}
                    >
                      {/* 駅名・駅ナンバリング */}
                      <div className="col-span-5 sm:col-span-4 flex items-center gap-2 min-w-0 pr-1">
                        {st.stationNumber && (
                          <StationBadge id={st.stationNumber} size="sm" />
                        )}
                        <div className="truncate">
                          <span
                            className={`font-bold ${
                              stop.isPassing ? 'text-slate-400 font-medium' : 'text-slate-900'
                            }`}
                          >
                            {st.name}
                          </span>
                          {isGlobalFirst && (
                            <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
                              始発
                            </span>
                          )}
                          {isGlobalLast && (
                            <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                              終着
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 停車 / 通過 トグルボタン */}
                      <div className="col-span-3 sm:col-span-2 flex justify-center">
                        <button
                          type="button"
                          disabled={isEndpointLock}
                          onClick={() => onToggleStationPassing(segIdx, stopIdx)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                            stop.isPassing
                              ? 'bg-slate-200/70 text-slate-500 hover:bg-slate-300/70'
                              : 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                          } ${isEndpointLock ? 'opacity-90 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {stop.isPassing ? (
                            <>
                              <Circle className="w-3 h-3" />
                              <span>通過</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>停車</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* 到着時刻・発車時刻・停車時間 編集 */}
                      <div className="col-span-4 sm:col-span-6 flex items-center justify-end sm:justify-start sm:pl-4 gap-2 flex-wrap">
                        {stop.isPassing ? (
                          <span className="text-[11px] font-mono text-slate-400">
                            {secondsToTimeString(stop.arrivalSec).slice(0, 8)} 通過予定
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* 到着時刻（始発駅以外） */}
                            {!isGlobalFirst && (
                              <label className="inline-flex items-center gap-1 text-[11px]">
                                <span className="text-slate-400 text-[10px]">着</span>
                                <input
                                  type="time"
                                  value={secondsToHHMM(stop.arrivalSec)}
                                  onChange={(e) =>
                                    onManualArrivalTimeChange(
                                      segIdx,
                                      stopIdx,
                                      e.target.value
                                    )
                                  }
                                  className={`px-1.5 py-0.5 rounded border text-xs font-mono font-bold ${
                                    stop.manualArrivalSec !== undefined
                                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                                      : 'border-slate-200 bg-slate-50 text-slate-700'
                                  }`}
                                />
                              </label>
                            )}

                            {/* 発車時刻（終着駅以外） */}
                            {!isGlobalLast && (
                              <label className="inline-flex items-center gap-1 text-[11px]">
                                <span className="text-slate-400 text-[10px]">発</span>
                                <input
                                  type="time"
                                  value={secondsToHHMM(stop.departureSec)}
                                  onChange={(e) =>
                                    onManualDepartureTimeChange(
                                      segIdx,
                                      stopIdx,
                                      e.target.value
                                    )
                                  }
                                  className={`px-1.5 py-0.5 rounded border text-xs font-mono font-bold ${
                                    stop.manualStopDurationSec !== undefined
                                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                                      : 'border-slate-200 bg-white text-slate-900'
                                  }`}
                                />
                              </label>
                            )}

                            {/* 停車秒数セレクタ（途中停車駅のみ） */}
                            {!isGlobalFirst && !isGlobalLast && (
                              <select
                                value={stop.stopDurationSec}
                                onChange={(e) =>
                                  onManualStopDurationChange(
                                    segIdx,
                                    stopIdx,
                                    Number(e.target.value)
                                  )
                                }
                                className="px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[11px] text-slate-600 font-mono"
                                title="この駅での停車時間"
                              >
                                <option value={15}>15秒停</option>
                                <option value={20}>20秒停</option>
                                <option value={30}>30秒停</option>
                                <option value={45}>45秒停</option>
                                <option value={60}>1分停</option>
                                <option value={120}>2分停</option>
                                <option value={180}>3分停</option>
                                <option value={300}>5分停</option>
                                {![15, 20, 30, 45, 60, 120, 180, 300].includes(
                                  stop.stopDurationSec
                                ) && (
                                  <option value={stop.stopDurationSec}>
                                    {stop.stopDurationSec}秒停
                                  </option>
                                )}
                              </select>
                            )}

                            {hasManualOverride && (
                              <span
                                className="inline-flex items-center gap-0.5 text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-bold"
                                title="手動設定された時刻"
                              >
                                <Pin className="w-2.5 h-2.5" />
                                固定
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
