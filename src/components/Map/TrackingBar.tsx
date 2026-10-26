import React from 'react';
import type { ActiveTrain } from '../../types';
import { LocateFixed, X, ExternalLink, Gauge, AlertCircle, Eye, EyeOff, ArrowLeftRight } from 'lucide-react';
import { useSelection } from '../../contexts/SelectionContext';
import { STATION_MAP } from '../../data/stations';
import { formatTrainNumber, getGlobalTripMap } from '../../data/timetableData';
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
  const { hideOtherTrainsOnTracking, setHideOtherTrainsOnTracking, setSelectedTrainId } = useSelection();
  const line = getLine(train.lineId);
  const lineColor = line?.lineColor || '#004b97';
  const destStation = STATION_MAP.get(train.destinationStationId);
  const currentStation = train.currentStationId ? STATION_MAP.get(train.currentStationId) : null;
  const nextStation = STATION_MAP.get(train.nextStationId);

  // 併結運転中の相手編成行先の解決
  const coupledDestinationText =
    train.coupling?.coupledDestination ||
    (train.coupling?.coupledTripId
      ? STATION_MAP.get(getGlobalTripMap().get(train.coupling.coupledTripId)?.destinationStationId || '')?.name
      : undefined);

  return (
    <div className="pointer-events-auto w-full sm:max-w-[480px] md:max-w-[520px] bg-slate-900/95 backdrop-blur-md text-white rounded-xl shadow-2xl border border-slate-700/80 p-2.5 sm:p-3 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* 1段目: 追尾中ステータス・列車識別情報 ＆ アクションボタン群 */}
      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        {/* 左側: 路線・種別・愛称・列車番号 */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
          {line && (
            <span
              className="inline-flex items-center justify-center text-[10px] px-1.5 py-0.5 font-medium rounded text-white shadow-xs shrink-0"
              style={{
                backgroundColor: lineColor,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              {line.shortName}
            </span>
          )}

          <TrainTypeBadge
            type={train.trainType}
            size="sm"
            lineId={train.lineId}
            customType={train.customTrainType}
          />

          {train.trainName && (
            <span className="text-xs font-bold text-amber-200 truncate">
              {train.trainName}
            </span>
          )}

          <span className="font-mono text-xs text-amber-300 font-bold shrink-0">
            {formatTrainNumber(train.trainNumber, train.trainId, train.tripId)}
          </span>

          <span className="text-[10px] text-slate-400 shrink-0 hidden sm:inline">
            ({train.cars}両{train.isCoupledActive ? '・併結' : ''})
          </span>
        </div>

        {/* 右側: ツール操作ボタン（他列車非表示・詳細・閉じる） */}
        <div className="flex items-center gap-1 shrink-0">
          {/* 他の列車非表示トグルボタン */}
          <button
            type="button"
            onClick={() => setHideOtherTrainsOnTracking((prev) => !prev)}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold border transition-all shadow-sm cursor-pointer ${
              hideOtherTrainsOnTracking
                ? 'bg-amber-500/25 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-600'
            }`}
            title={
              hideOtherTrainsOnTracking
                ? '他の列車を再表示する'
                : '追尾列車以外の列車を非表示にする'
            }
          >
            {hideOtherTrainsOnTracking ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline text-[10px]">追尾のみ</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline text-[10px]">全列車</span>
              </>
            )}
          </button>

          {/* 詳細パネルを開くボタン */}
          <button
            type="button"
            onClick={onOpenSidebar}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-colors shadow-sm cursor-pointer"
            title="列車詳細パネルを開く"
          >
            <span className="text-xs">詳細</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>

          {/* 追尾解除ボタン */}
          <button
            type="button"
            onClick={onStopTracking}
            className="p-1 rounded-lg bg-slate-800/80 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-700/60 transition-colors cursor-pointer"
            title="自動追尾を解除"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2段目: 行先・遅延 ＆ 走行状況（2段構え） ＆ 併結切替ボタン */}
      <div className="flex items-center justify-between gap-2 pt-2">
        {/* 左側: 行先 ＆ 遅延情報 */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm font-black text-white whitespace-nowrap">
            {train.customDestination || destStation?.name || '行先未定'} 行
          </span>
          {train.delayMinutes > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[10px] text-rose-400 bg-rose-950/80 border border-rose-800 px-1 py-0.2 rounded shrink-0">
              <AlertCircle className="w-3 h-3" />+{train.delayMinutes}分
            </span>
          )}
        </div>

        {/* 右側: 走行状況の2段構え ＆ 併結切替ボタン */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 走行状況の2段構え（上: 駅名へ走行中／停車中、下: メーター＋速度） */}
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] text-slate-400 whitespace-nowrap leading-tight">
              {train.status === 'STOPPING'
                ? `${currentStation?.name || ''} 停車中`
                : `${nextStation?.name || ''} へ走行中`}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-200 flex items-center gap-1 whitespace-nowrap leading-tight mt-0.5">
              <Gauge className="w-3 h-3 text-slate-400" />
              {train.status === 'STOPPING' ? '停車中' : `${train.speedKmh} km/h`}
            </span>
          </div>

          {/* 併結編成フォーカス切替ボタン */}
          {train.isCoupledActive && train.coupling?.coupledTripId && (
            <div className="pl-2 border-l border-slate-700/80">
              <button
                type="button"
                onClick={() => setSelectedTrainId(train.coupling!.coupledTripId)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold border border-sky-400/60 bg-sky-950/90 hover:bg-sky-900 active:scale-95 text-sky-200 transition-all shadow-sm cursor-pointer group"
                title={`併結相手 (${train.coupling.coupledTrainNumber}${coupledDestinationText ? ` ${coupledDestinationText}行` : ''}) にフォーカスを切り替える`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-180 transition-transform duration-300 shrink-0" />
                <span className="font-mono text-xs text-white">{train.coupling.coupledTrainNumber}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
