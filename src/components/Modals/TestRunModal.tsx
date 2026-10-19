import React, { useState, useMemo } from 'react';
import {
  X,
  Play,
  Trash2,
  LocateFixed,
  Search,
  Train,
  Navigation,
} from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useSimulation } from '../../contexts/SimulationContext';
import { useSelection } from '../../contexts/SelectionContext';
import { getAllLines, getLinesGroupedByOperator, getLine } from '../../data/linesRegistry';
import type { LineId, Direction } from '../../types';

export const TestRunModal: React.FC = () => {
  const ui = useUI();
  const sim = useSimulation();
  const sel = useSelection();

  const [selectedLineId, setSelectedLineId] = useState<LineId>('tojo');
  const [direction, setDirection] = useState<Direction>('outbound');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('all');

  const allLines = useMemo(() => getAllLines(), []);
  const groupedByOperator = useMemo(() => getLinesGroupedByOperator(), []);

  // フィルタリングされた路線リスト
  const filteredLines = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allLines.filter((l) => {
      if (selectedOperator !== 'all' && l.operator !== selectedOperator) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.shortName.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q) ||
        l.operator.toLowerCase().includes(q)
      );
    });
  }, [allLines, searchQuery, selectedOperator]);

  const currentLine = useMemo(() => getLine(selectedLineId), [selectedLineId]);

  // 始発駅・終着駅のプレビュー表示
  const startStation = useMemo(() => {
    if (!currentLine || currentLine.stations.length === 0) return null;
    return direction === 'outbound' ? currentLine.stations[0] : currentLine.stations[currentLine.stations.length - 1];
  }, [currentLine, direction]);

  const endStation = useMemo(() => {
    if (!currentLine || currentLine.stations.length === 0) return null;
    return direction === 'outbound' ? currentLine.stations[currentLine.stations.length - 1] : currentLine.stations[0];
  }, [currentLine, direction]);

  // 現在稼働中の試運転列車一覧
  const runningTestTrains = useMemo(() => {
    return sim.activeTrains.filter((t) => t.trainType === ('test_run' as any));
  }, [sim.activeTrains]);

  const handleLaunch = () => {
    const tripId = sim.launchTestTrain(selectedLineId, direction, { speedMultiplier });
    sel.setSelectedTrainId(tripId);
    sel.setIsTrackingTrain(true);
    ui.closeTestRun();
  };

  const handleTrackTrain = (tripId: string) => {
    sel.setSelectedTrainId(tripId);
    sel.setIsTrackingTrain(true);
    ui.closeTestRun();
  };

  if (!ui.isTestRunOpen) return null;

  return (
    <div className="fixed inset-0 z-[2500] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center border border-sky-500/20">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                試験走行（試運転）シミュレーター
              </h3>
              <p className="text-xs text-slate-500">
                指定路線の始点から終点まで試験走行列車を発車し、マップ上でグラフィカルに追尾確認します
              </p>
            </div>
          </div>
          <button
            onClick={ui.closeTestRun}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* 稼働中の試験走行列車がある場合の通知バナー */}
          {runningTestTrains.length > 0 && (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-sky-900">
                <span className="flex items-center gap-1.5">
                  <LocateFixed className="w-4 h-4 text-sky-600 animate-pulse" />
                  現在走行中の試験列車 ({runningTestTrains.length}本)
                </span>
                <button
                  onClick={sim.clearTestTrains}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  全試験列車を停止
                </button>
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {runningTestTrains.map((tt) => (
                  <div
                    key={tt.tripId}
                    className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-sky-100 text-xs shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">{tt.trainNumber || '試運転'}</span>
                      <span className="text-slate-500">{tt.customDestination || '終着'} 行</span>
                      <span className="text-[10px] text-slate-400 font-mono">({Math.round(tt.speedKmh)} km/h)</span>
                    </div>
                    <button
                      onClick={() => handleTrackTrain(tt.tripId)}
                      className="px-2 py-1 bg-sky-600 text-white rounded text-[11px] font-bold hover:bg-sky-700 transition-colors flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3" />
                      追尾
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 路線選択セクション */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">走行路線の選択</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="路線名や会社名で絞り込み..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <select
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                className="border border-slate-200 rounded-lg px-2.5 py-2 text-xs bg-white text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              >
                <option value="all">全事業者</option>
                {groupedByOperator.map((g) => (
                  <option key={g.operator} value={g.operator}>
                    {g.operator}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-44 overflow-y-auto border border-slate-100 rounded-xl p-2 bg-slate-50/50">
              {filteredLines.map((line) => {
                const isSelected = line.id === selectedLineId;
                return (
                  <button
                    key={line.id}
                    onClick={() => setSelectedLineId(line.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-white shadow-xs font-bold text-slate-900 ring-2 ring-sky-500'
                        : 'text-slate-600 hover:bg-white/60 hover:text-slate-800'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: line.lineColor }}
                    />
                    <span className="truncate">{line.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 方向とプレビュー */}
          {currentLine && (
            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">運行方向</span>
                <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
                  <button
                    onClick={() => setDirection('outbound')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      direction === 'outbound'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    下り ({currentLine.directionNames.outboundShort || '下り'})
                  </button>
                  <button
                    onClick={() => setDirection('inbound')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                      direction === 'inbound'
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    上り ({currentLine.directionNames.inboundShort || '上り'})
                  </button>
                </div>
              </div>

              {/* 区間プレビュー */}
              <div className="flex items-center justify-between text-xs bg-white px-3.5 py-2.5 rounded-lg border border-slate-100 shadow-xs">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-medium">始発駅</span>
                  <span className="font-bold text-slate-800 text-sm">{startStation?.name}</span>
                </div>
                <div className="flex flex-col items-center px-4">
                  <span className="text-[10px] text-sky-600 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                    全 {currentLine.stations.length} 駅走行
                  </span>
                  <div className="w-24 h-0.5 bg-sky-200 my-1 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[3px] border-y-transparent border-l-[6px] border-l-sky-500" />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">終着駅</span>
                  <span className="font-bold text-slate-800 text-sm">{endStation?.name}</span>
                </div>
              </div>

              {/* 倍速設定 */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-bold text-slate-600">観測再生倍速</span>
                <div className="flex items-center gap-1.5">
                  {[2, 5, 10, 30].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeedMultiplier(s)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                        speedMultiplier === s
                          ? 'bg-slate-800 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* フッター */}
        <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={ui.closeTestRun}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleLaunch}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-md hover:bg-sky-500 active:scale-95 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            試験走行を開始（発車）
          </button>
        </div>
      </div>
    </div>
  );
};
