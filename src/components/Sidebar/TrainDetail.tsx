import React from 'react';
import type { ActiveTrain, Station } from '../../types';
import { TrainTypeBadge, StationBadge } from '../Common/Badges';
import { STATION_MAP } from '../../data/stations';
import { formatTrainNumber } from '../../data/timetableData';
import { getLine } from '../../data/linesRegistry';
import {
  Navigation,
  Gauge,
  MapPin,
  CheckCircle2,
  AlertCircle,
  LocateFixed,
} from 'lucide-react';

interface TrainDetailProps {
  train: ActiveTrain;
  isTracking: boolean;
  onToggleTracking: () => void;
  onSelectStation: (station: Station) => void;
}

export const TrainDetail: React.FC<TrainDetailProps> = ({
  train,
  isTracking,
  onToggleTracking,
  onSelectStation,
}) => {
  const line = getLine(train.lineId);
  const lineColor = line?.lineColor || '#004b97';
  const originStation = STATION_MAP.get(train.originStationId);
  const destStation = STATION_MAP.get(train.destinationStationId);
  const currentStation = train.currentStationId ? STATION_MAP.get(train.currentStationId) : null;
  const nextStation = STATION_MAP.get(train.nextStationId);
  const nextStopStation = STATION_MAP.get(train.nextStopStationId);

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 overflow-y-auto">
      {/* 列車ヘッダー */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 pb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {line && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded text-white shadow-2xs"
                  style={{ backgroundColor: lineColor }}
                >
                  {line.name}
                </span>
              )}
              <TrainTypeBadge type={train.trainType} size="md" lineId={train.lineId} />
              <span className="font-mono text-sm tracking-wider text-amber-300 font-bold">
                {formatTrainNumber(train.trainNumber, train.tripId)}
              </span>
              <span className="text-xs text-slate-400 font-medium">({train.cars}両編成)</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{train.customDestination || destStation?.name || '行先未定'} 行</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                {train.direction === 'inbound' ? '上り' : '下り'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              始発: {originStation?.name || '始発駅'} 発
            </p>
          </div>
        </div>

        {/* 列車追尾トグルボタン */}
        <div className="mt-4">
          <button
            onClick={onToggleTracking}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-bold text-xs transition-all shadow-md ${
              isTracking
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 animate-pulse'
                : 'bg-slate-700/90 hover:bg-slate-700 text-white border border-slate-600'
            }`}
          >
            <LocateFixed className="w-4 h-4" />
            <span>{isTracking ? '列車を自動追尾中（クリックで解除）' : 'この列車をマップで追尾する'}</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* 現在の運行状況カード */}
        <section className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              現在の走行状態
            </span>
            {train.delayMinutes > 0 ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" />
                約{train.delayMinutes}分遅れ
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                定刻運行
              </span>
            )}
          </div>

          <div className="space-y-2">
            {train.status === 'STOPPING' ? (
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-sm font-bold text-slate-900">
                  {currentStation?.name}駅 に停車中
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-sm font-bold text-slate-900">
                    {currentStation?.name} 〜 {nextStation?.name} 間を走行中
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-[width] duration-200 ease-linear"
                    style={{
                      width: `${Math.round(train.progressPercent * 100)}%`,
                      backgroundColor: lineColor,
                    }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 text-right">
                  進捗: {Math.round(train.progressPercent * 100)}%
                </span>
              </div>
            )}

            {/* 速度・次停車駅 */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/70 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Gauge className="w-3.5 h-3.5 text-slate-400" />
                <span>速度: <strong className="text-slate-900 font-bold">{train.status === 'STOPPING' ? 0 : train.speedKmh} km/h</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>次停車: <strong className="text-slate-900 font-bold">{nextStopStation?.name || '--'}</strong></span>
              </div>
            </div>
          </div>
        </section>

        {/* 停車駅タイムライン (グラフィカル路線図) */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-slate-500" />
              <span>運行ルート・停車駅</span>
            </h3>
            <span className="text-[11px] text-slate-400">駅名クリックで詳細</span>
          </div>

          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {train.stops.map((stop, idx) => {
              const st = STATION_MAP.get(stop.stationId);
              if (!st) return null;

              const isCurrent = train.currentStationId === stop.stationId;
              const isPassing = stop.isPassing;
              const isLast = idx === train.stops.length - 1;

              return (
                <div
                  key={stop.stationId}
                  role="button"
                  tabIndex={0}
                  className="relative group cursor-pointer select-none"
                  onClick={() => onSelectStation(st)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectStation(st);
                    }
                  }}
                >
                  {/* ピンマーカー */}
                  <div
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 transition-transform group-hover:scale-125 ${
                      isCurrent
                        ? 'bg-amber-500 border-white ring-4 ring-amber-300 ring-opacity-70 animate-pulse'
                        : isPassing
                        ? 'bg-slate-200 border-slate-300 w-2 h-2 -left-[21px] top-1.5'
                        : 'bg-white'
                    }`}
                    style={!isCurrent && !isPassing ? { borderColor: lineColor } : {}}
                  />

                  {/* 駅名と時刻 */}
                  <div className="flex items-center justify-between text-xs py-0.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-semibold ${
                          isCurrent
                            ? 'text-amber-600 font-black'
                            : isPassing
                            ? 'text-slate-400 text-[11px]'
                            : 'text-slate-800'
                        }`}
                      >
                        {st.name}
                      </span>
                      {!isPassing && <StationBadge id={st.id} size="sm" />}
                      {isPassing && (
                        <span className="text-[10px] text-slate-400 bg-slate-100 px-1 rounded">
                          通過
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                          現在位置
                        </span>
                      )}
                      {!isPassing && (
                        <div className="text-[11px] font-mono text-right flex flex-col items-end leading-tight">
                          {idx > 0 && (
                            <span className="text-slate-500">
                              {(stop.arrivalTime || stop.departureTime).slice(0, 5)}
                              <span className="text-[9px] text-slate-400 ml-0.5">着</span>
                            </span>
                          )}
                          {!isLast && (
                            <span className="text-slate-700 font-medium">
                              {stop.departureTime.slice(0, 5)}
                              <span className="text-[9px] text-slate-400 ml-0.5">発</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
