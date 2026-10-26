import React from 'react';
import {
  Link2,
  Trash2,
  ArrowUpDown,
  Plus,
  Search,
  Gauge,
  Hash,
} from 'lucide-react';
import type { LineId, TrainTypeKey, LineDefinition } from '../../../types';
import { getLine } from '../../../data/linesRegistry';
import { STATION_MAP } from '../../../data/stations';
import type {
  CustomTrainPlan,
  ConnectingStationPair,
} from '../../../services/testTrainService';
import { SPEED_PRESET_GROUPS, ALL_SPEED_PRESET_VALUES } from './constants';

interface ConnectableNextLineItem {
  line: LineDefinition;
  bestPair: ConnectingStationPair;
  isDirectAtCurrentEnd: boolean;
}

interface RouteTabProps {
  computedPlan: CustomTrainPlan;
  connectableNextLines: ConnectableNextLineItem[];
  addingLineModalOpen: boolean;
  editingSegmentIdxForLine: number | null;
  lineSearchQuery: string;
  selectedOperator: string;
  groupedByOperator: { operator: string; lines: LineDefinition[] }[];
  filteredLines: LineDefinition[];
  onSetEditingSegmentIdxForLine: (idx: number | null) => void;
  onSetAddingLineModalOpen: (open: boolean) => void;
  onSetLineSearchQuery: (query: string) => void;
  onSetSelectedOperator: (op: string) => void;
  onRemoveSegment: (segIdx: number) => void;
  onUpdateSegmentStations: (segIdx: number, fromStationId: string, toStationId: string) => void;
  onReverseSegment: (segIdx: number) => void;
  onReverseEntireRoute: () => void;
  onUpdateSegmentTrainType: (segIdx: number, trainType: TrainTypeKey) => void;
  onUpdateSegmentMeta: (
    segIdx: number,
    patch: { trainNumber?: string; speedKmh?: number }
  ) => void;
  onAddConnectedLine: (lineId: LineId) => void;
  onReplaceSegmentLine: (segIdx: number, newLineId: LineId) => void;
}

export const RouteTab: React.FC<RouteTabProps> = ({
  computedPlan,
  connectableNextLines,
  addingLineModalOpen,
  editingSegmentIdxForLine,
  lineSearchQuery,
  selectedOperator,
  groupedByOperator,
  filteredLines,
  onSetEditingSegmentIdxForLine,
  onSetAddingLineModalOpen,
  onSetLineSearchQuery,
  onSetSelectedOperator,
  onRemoveSegment,
  onUpdateSegmentStations,
  onReverseSegment,
  onReverseEntireRoute,
  onUpdateSegmentTrainType,
  onUpdateSegmentMeta,
  onAddConnectedLine,
  onReplaceSegmentLine,
}) => {
  return (
    <div className="space-y-4">
      {/* 路線セグメント一覧 */}
      <div className="space-y-3">
        {computedPlan.segments.map((seg, segIdx) => {
          const line = getLine(seg.lineId);
          if (!line) return null;

          const availableTypes = Object.values(line.trainTypes || {});
          const prevSeg = segIdx > 0 ? computedPlan.segments[segIdx - 1] : null;
          const prevEndSt = prevSeg ? STATION_MAP.get(prevSeg.toStationId) : null;
          const curStartSt = STATION_MAP.get(seg.fromStationId);

          return (
            <React.Fragment key={seg.id}>
              {/* 直通境界コネクター表示 */}
              {segIdx > 0 && (
                <div className="flex items-center justify-center gap-2 py-0.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-300 text-sky-900 text-[11px] font-bold shadow-2xs">
                    <Link2 className="w-3.5 h-3.5 text-sky-600" />
                    <span>
                      {prevEndSt?.name || '前駅'}
                      {prevEndSt?.name !== curStartSt?.name && curStartSt
                        ? ` ➔ ${curStartSt.name}`
                        : ' 駅'}
                    </span>
                  </div>
                </div>
              )}

              {/* セグメントカード */}
              <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
                {/* カード上部バー（路線名・変更・削除） */}
                <div
                  className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100"
                  style={{
                    background: `linear-gradient(90deg, ${line.lineColor}18 0%, #f8fafc 100%)`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-black text-white shadow-2xs"
                      style={{ backgroundColor: line.lineColor }}
                    >
                      区間 {segIdx + 1}
                    </span>
                    <span className="font-extrabold text-sm text-slate-800">
                      {line.name}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                      ({line.operator})
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onSetEditingSegmentIdxForLine(segIdx);
                        onSetAddingLineModalOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
                    >
                      路線を変更
                    </button>
                    {computedPlan.segments.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveSegment(segIdx)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="この路線区間を削除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* カード本体（始発駅・終着駅・種別・列車番号） */}
                <div className="p-4 space-y-3.5">
                  {/* 開始駅 ➔ 終了駅 セレクタ */}
                  <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    <div className="sm:col-span-5">
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">
                        {segIdx === 0 ? '始発駅' : '接続駅'}
                      </label>
                      <select
                        value={seg.fromStationId}
                        onChange={(e) =>
                          onUpdateSegmentStations(
                            segIdx,
                            e.target.value,
                            seg.toStationId
                          )
                        }
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                      >
                        {line.stations.map((st) => (
                          <option
                            key={st.id}
                            value={st.id}
                            disabled={st.id === seg.toStationId}
                          >
                            {st.stationNumber ? `[${st.stationNumber}] ` : ''}
                            {st.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-1 flex justify-center pt-2 sm:pt-4">
                      <button
                        type="button"
                        onClick={() => onReverseSegment(segIdx)}
                        className="p-1.5 rounded-full bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-colors shadow-2xs"
                        title="始発駅と終着駅を入れ替え"
                      >
                        <ArrowUpDown className="w-3.5 h-3.5 rotate-90" />
                      </button>
                    </div>

                    <div className="sm:col-span-5">
                      <label className="text-[10px] font-bold text-slate-500 block mb-1">
                        {segIdx === computedPlan.segments.length - 1
                          ? '終着駅'
                          : '接続駅'}
                      </label>
                      <select
                        value={seg.toStationId}
                        onChange={(e) =>
                          onUpdateSegmentStations(
                            segIdx,
                            seg.fromStationId,
                            e.target.value
                          )
                        }
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                      >
                        {line.stations.map((st) => (
                          <option
                            key={st.id}
                            value={st.id}
                            disabled={st.id === seg.fromStationId}
                          >
                            {st.stationNumber ? `[${st.stationNumber}] ` : ''}
                            {st.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* この路線での列車種別セレクタ */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-bold text-slate-700">
                        列車種別
                      </label>
                      <span className="text-[10px] text-slate-400">
                        {seg.direction === 'outbound'
                          ? line.directionNames.outboundShort
                          : line.directionNames.inboundShort}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {/* 試運転種別ボタン */}
                      <button
                        type="button"
                        onClick={() => onUpdateSegmentTrainType(segIdx, 'test_run')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          seg.trainType === 'test_run'
                            ? 'bg-sky-600 text-white ring-2 ring-sky-600 ring-offset-1 shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-sky-400" />
                        <span>試運転 / カスタム</span>
                      </button>

                      {/* 路線固有の各列車種別ボタン */}
                      {availableTypes.map((tConf) => {
                        const isSelected = seg.trainType === tConf.key;
                        return (
                          <button
                            key={tConf.key}
                            type="button"
                            onClick={() => onUpdateSegmentTrainType(segIdx, tConf.key)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'text-white ring-2 ring-offset-1 shadow-xs'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                            style={
                              isSelected
                                ? {
                                    backgroundColor: tConf.bgColor,
                                    borderColor: tConf.borderColor,
                                  }
                                : {}
                            }
                          >
                            {!isSelected && (
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: tConf.bgColor }}
                              />
                            )}
                            <span>{tConf.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 区間固有の列車番号・巡航速度 */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pt-1.5 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
                        <Hash className="w-3.5 h-3.5 text-slate-400" />
                        列車番号:
                      </span>
                      <input
                        type="text"
                        value={seg.trainNumber || ''}
                        onChange={(e) =>
                          onUpdateSegmentMeta(segIdx, { trainNumber: e.target.value })
                        }
                        placeholder={computedPlan.defaultTrainNumber || '試9001レ'}
                        className="w-24 sm:w-28 px-2 py-0.5 border border-slate-200 rounded font-mono text-xs text-slate-700 bg-slate-50 focus:bg-white"
                      />
                    </div>
                    <div className="flex items-center justify-between sm:justify-start gap-1.5 min-w-0 flex-wrap sm:flex-nowrap">
                      <span className="text-slate-500 font-semibold flex items-center gap-1 shrink-0">
                        <Gauge className="w-3.5 h-3.5 text-slate-400" />
                        標準巡航速度:
                      </span>
                      <div className="inline-flex items-center gap-1.5 min-w-0 flex-1 sm:flex-none">
                        {/* 直接数値入力フィールド */}
                        <div className="relative flex items-center shrink-0">
                          <input
                            type="number"
                            min={1}
                            max={400}
                            step={1}
                            value={seg.speedKmh}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (!isNaN(val)) {
                                onUpdateSegmentMeta(segIdx, {
                                  speedKmh: Math.max(1, Math.min(400, val)),
                                });
                              }
                            }}
                            className="w-14 sm:w-16 px-1.5 py-0.5 border border-slate-200 rounded font-mono text-xs font-bold text-slate-800 bg-white text-right focus:border-sky-400 focus:outline-none shadow-2xs"
                            title="キーボードから任意の巡航速度(km/h)を直接入力できます"
                          />
                          <span className="ml-1 text-[11px] font-mono font-medium text-slate-500">km/h</span>
                        </div>

                        {/* 細分化プリセットドロップダウン（スマホではみ出さないよう max-w と truncate を指定） */}
                        <select
                          value={ALL_SPEED_PRESET_VALUES.includes(seg.speedKmh) ? seg.speedKmh : 'custom'}
                          onChange={(e) => {
                            if (e.target.value !== 'custom') {
                              onUpdateSegmentMeta(segIdx, {
                                speedKmh: Number(e.target.value),
                              });
                            }
                          }}
                          className="min-w-0 max-w-[130px] xs:max-w-[155px] sm:max-w-[185px] px-1.5 py-0.5 border border-slate-200 rounded font-mono text-xs text-slate-700 bg-slate-50 hover:bg-slate-100 cursor-pointer shadow-2xs truncate"
                          title="速度プリセットから選択"
                        >
                          {!ALL_SPEED_PRESET_VALUES.includes(seg.speedKmh) && (
                            <option value="custom">指定 ({seg.speedKmh}km/h)</option>
                          )}
                          {SPEED_PRESET_GROUPS.map((group) => (
                            <optgroup key={group.groupName} label={group.groupName}>
                              {group.options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </optgroup>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* 直通路線追加パネル */}
      <div className="bg-white rounded-xl border-2 border-dashed border-sky-300/90 p-4 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-sky-600" />
              <span>直通路線を追加</span>
            </h4>
          </div>
          <div className="flex items-center gap-2">
            {computedPlan.segments.length > 1 && (
              <button
                type="button"
                onClick={onReverseEntireRoute}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                title="全路線の始発駅と終着駅を反転します"
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>全ルート反転</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                onSetEditingSegmentIdxForLine(null);
                onSetAddingLineModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>全路線リストから追加...</span>
            </button>
          </div>
        </div>

        {/* おすすめ接続路線チップ */}
        {connectableNextLines.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
              🔗{' '}
              {getLine(computedPlan.segments[computedPlan.segments.length - 1].lineId)
                ?.shortName || ''}
              の接続路線：
            </span>
            <div className="flex flex-wrap gap-1.5">
              {connectableNextLines.map(({ line, bestPair, isDirectAtCurrentEnd }, idx) => (
                <button
                  key={`${line.id}_${idx}`}
                  type="button"
                  onClick={() => onAddConnectedLine(line.id)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    isDirectAtCurrentEnd
                      ? 'bg-sky-50 border-sky-300 text-sky-900 hover:bg-sky-100 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Plus className="w-3 h-3 text-sky-600" />
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: line.lineColor }}
                  />
                  <span>{line.shortName}</span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    ({bestPair.stationA.name}接続)
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 路線検索サブモーダル（路線追加・変更時） */}
      {addingLineModalOpen && (
        <div className="bg-slate-900/5 rounded-xl border border-slate-300 p-4 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-800">
              {editingSegmentIdxForLine !== null
                ? `区間 ${editingSegmentIdxForLine + 1} の路線を選択`
                : '追加する直通路線を選択'}
            </span>
            <button
              type="button"
              onClick={() => {
                onSetAddingLineModalOpen(false);
                onSetEditingSegmentIdxForLine(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              閉じる ×
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="路線名や会社名で絞り込み..."
                value={lineSearchQuery}
                onChange={(e) => onSetLineSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <select
              value={selectedOperator}
              onChange={(e) => onSetSelectedOperator(e.target.value)}
              className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white text-slate-700"
            >
              <option value="all">全事業者</option>
              {groupedByOperator.map((g) => (
                <option key={g.operator} value={g.operator}>
                  {g.operator}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto bg-white p-2 rounded-lg border border-slate-200">
            {filteredLines.map((line) => (
              <button
                key={line.id}
                type="button"
                onClick={() => {
                  if (editingSegmentIdxForLine !== null) {
                    onReplaceSegmentLine(editingSegmentIdxForLine, line.id);
                  } else {
                    onAddConnectedLine(line.id);
                  }
                }}
                className="flex items-center gap-2 p-2 rounded-lg text-left text-xs hover:bg-sky-50 text-slate-700 hover:text-sky-900 font-semibold transition-colors border border-transparent hover:border-sky-200"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: line.lineColor }}
                />
                <span className="truncate">{line.shortName}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
