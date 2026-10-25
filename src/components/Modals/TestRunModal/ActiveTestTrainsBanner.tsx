import React from 'react';
import { LocateFixed, Trash2, Navigation, X } from 'lucide-react';
import { TrainTypeBadge } from '../../Common/Badges';
import type { RegisteredCustomChain } from './constants';

interface ActiveTestTrainsBannerProps {
  registeredCustomChains: RegisteredCustomChain[];
  onClearTestTrains: () => void;
  onTrackTrain: (tripId: string, startSec?: number, isRunning?: boolean) => void;
  onRemoveTestTrain: (tripId: string) => void;
}

export const ActiveTestTrainsBanner: React.FC<ActiveTestTrainsBannerProps> = ({
  registeredCustomChains,
  onClearTestTrains,
  onTrackTrain,
  onRemoveTestTrain,
}) => {
  if (registeredCustomChains.length === 0) return null;

  return (
    <div className="bg-sky-50/90 border-b border-sky-200 px-4 sm:px-6 py-2.5 shrink-0">
      <div className="flex items-center justify-between text-xs font-bold text-sky-950 mb-1.5">
        <span className="flex items-center gap-1.5">
          <LocateFixed className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
          登録済み ({registeredCustomChains.length}編成)
        </span>
        <button
          onClick={onClearTestTrains}
          className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 hover:underline"
        >
          <Trash2 className="w-3 h-3" />
          全列車を停止・消去
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {registeredCustomChains.map((item) => {
          const { firstTrip, liveTrain, startTime, endTime, startSec } = item;
          const isRunning = Boolean(liveTrain);
          return (
            <div
              key={item.chainKey}
              className="flex items-center justify-between gap-2.5 bg-white px-2.5 py-1.5 rounded-lg border border-sky-200/80 text-xs shadow-2xs shrink-0 min-w-[240px]"
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <TrainTypeBadge
                  type={liveTrain?.trainType || firstTrip.trainType}
                  size="sm"
                  lineId={liveTrain?.lineId || firstTrip.lineId}
                  customType={liveTrain?.customTrainType || firstTrip.customTrainType}
                />
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    {firstTrip.trainName && (
                      <span className="font-extrabold text-amber-600 text-[11px] truncate max-w-[90px]">
                        {firstTrip.trainName}
                      </span>
                    )}
                    <span className="font-bold text-slate-800 text-[11px] truncate">
                      {firstTrip.customOrigin} ➔ {firstTrip.customDestination}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {isRunning
                      ? `走行中 (${Math.round(liveTrain!.speedKmh)}km/h)`
                      : `${startTime}〜${endTime} 運行予定`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() =>
                    onTrackTrain(
                      liveTrain?.tripId || firstTrip.tripId,
                      startSec,
                      isRunning
                    )
                  }
                  className="px-2 py-1 bg-sky-600 text-white rounded text-[10px] font-bold hover:bg-sky-700 transition-colors flex items-center gap-1"
                  title={isRunning ? 'この列車をマップで追尾' : '発車時刻へジャンプして追尾'}
                >
                  <Navigation className="w-2.5 h-2.5" />
                  {isRunning ? '追尾' : '時刻へ移動'}
                </button>
                <button
                  onClick={() => onRemoveTestTrain(firstTrip.tripId)}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  title="この列車を削除"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
