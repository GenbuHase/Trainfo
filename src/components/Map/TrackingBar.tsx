import React from 'react';
import type { ActiveTrain } from '../../types';
import { LocateFixed, X, ExternalLink, Gauge, AlertCircle } from 'lucide-react';
import { STATION_MAP } from '../../data/stations';
import { formatTrainNumber } from '../../data/timetableData';
import { getLine } from '../../data/linesRegistry';
import { TrainTypeBadge } from '../Common/Badges';

interface TrackingBarProps {
  train: ActiveTrain;
  onOpenSidebar: () => void;
  onStopTracking: () => void;
}

export const TrackingBar: React.FC<TrackingBarProps> = ({
  train,
  onOpenSidebar,
  onStopTracking,
}) => {
  const line = getLine(train.lineId);
  const lineColor = line?.lineColor || '#004b97';
  const destStation = STATION_MAP.get(train.destinationStationId);
  const currentStation = train.currentStationId ? STATION_MAP.get(train.currentStationId) : null;
  const nextStation = STATION_MAP.get(train.nextStationId);

  return (
    <div className="pointer-events-auto w-full sm:w-[420px] md:w-[440px] bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-slate-700/80 p-2.5 sm:px-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between gap-2">
        {/* 左側: 追尾中バッジ & 列車主要情報 */}
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {/* 追尾中アニメーションインジケーター */}
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0">
            <LocateFixed className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span className="hidden xs:inline">追尾中</span>
          </div>

          {/* 列車識別情報 */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              {line && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white shrink-0"
                  style={{ backgroundColor: lineColor }}
                >
                  {line.shortName}
                </span>
              )}
              <TrainTypeBadge type={train.trainType} size="sm" lineId={train.lineId} />
              <span className="font-mono text-xs text-amber-300 font-bold shrink-0">
                {formatTrainNumber(train.trainNumber, train.tripId)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-white truncate mt-0.5">
              <span className="truncate">{train.customDestination || destStation?.name || '行先未定'} 行</span>
              {train.delayMinutes > 0 && (
                <span className="inline-flex items-center gap-0.5 text-[10px] text-rose-400 bg-rose-950/80 border border-rose-800 px-1 rounded shrink-0">
                  <AlertCircle className="w-3 h-3" />+{train.delayMinutes}分
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 右側: 状況 & アクションボタン */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 速度または停車駅情報 */}
          <div className="hidden sm:flex flex-col items-end text-right pr-1 border-r border-slate-700/80">
            <span className="text-[10px] text-slate-400">
              {train.status === 'STOPPING' ? `${currentStation?.name || ''} 停車中` : `${nextStation?.name || ''} へ走行中`}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-200 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-slate-400" />
              {train.status === 'STOPPING' ? '停車中' : `${train.speedKmh} km/h`}
            </span>
          </div>

          {/* 詳細パネルを開くボタン */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-colors shadow-sm"
            title="列車詳細パネルを開く"
          >
            <span className="text-xs">詳細</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* 追尾解除ボタン */}
          <button
            type="button"
            onClick={onStopTracking}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60 transition-colors"
            title="自動追尾を解除"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
