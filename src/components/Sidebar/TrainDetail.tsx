import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { ActiveTrain, Station, LineId, TrainTypeKey, ThroughChainStop, TimetableTrip, CustomTrainTypeConfig } from '../../types';
import { TrainTypeBadge, StationBadge } from '../Common/Badges';
import { STATION_MAP } from '../../data/stations';
import { formatTrainNumber, getThroughChainTrips, buildThroughChainSummary } from '../../data/timetableData';
import { loadLinesTimetables, isLineLoaded, subscribeTimetableLoad } from '../../data/timetableLoader';
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

interface DisplayStop {
  stationId: string;
  name: string;
  stationNumber?: string;
  arrivalTime: string;
  departureTime: string;
  isPassing: boolean;
  lineId: LineId;
  lineColor: string;
  lineShortName: string;
  trainType: TrainTypeKey;
  customTrainType?: CustomTrainTypeConfig;
  trainNumber?: string;
  trainName?: string;
  isCurrent: boolean;
  isBoundary?: boolean;
  boundaryInfo?: ThroughChainStop['boundaryInfo'];
  trainNumberChange?: string;
  couplingStart?: boolean;
  couplingEnd?: boolean;
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

  // 表示モード（初期表示は「〇〇線内」）
  const [timelineMode, setTimelineMode] = useState<'current' | 'full'>('current');
  const [chainTrips, setChainTrips] = useState<TimetableTrip[]>(() => getThroughChainTrips(train.tripId));

  // 直前の直通チェーンに含まれる tripId の Set を記憶（直通先への切り替わり時にモードを維持するため）
  const prevChainTripIdsRef = useRef<Set<string>>(new Set(chainTrips.map((t) => t.tripId)));

  useEffect(() => {
    const newChain = getThroughChainTrips(train.tripId);
    setChainTrips(newChain);

    const isSameChain = prevChainTripIdsRef.current.has(train.tripId);
    if (!isSameChain) {
      // 完全に別の列車へ切り替わった場合は初期表示の「〇〇線内」に設定
      setTimelineMode('current');
    }
    // 同一直通チェーン内での直通先への移行時は、現在の timelineMode（全区間 / 線内）をそのまま維持

    prevChainTripIdsRef.current = new Set(newChain.map((t) => t.tripId));
  }, [train.tripId]);

  // 直通先・直通元路線の自動非同期ロード & ロード完了リスナー
  useEffect(() => {
    const needed: LineId[] = [];
    if (train.throughLineId && !isLineLoaded(train.throughLineId) && !needed.includes(train.throughLineId)) {
      needed.push(train.throughLineId);
    }
    if (train.prevLineId && !isLineLoaded(train.prevLineId) && !needed.includes(train.prevLineId)) {
      needed.push(train.prevLineId);
    }
    for (const t of chainTrips) {
      if (t.lineId && !isLineLoaded(t.lineId) && !needed.includes(t.lineId)) {
        needed.push(t.lineId);
      }
    }

    if (needed.length > 0) {
      loadLinesTimetables(needed);
    }

    const unsubscribe = subscribeTimetableLoad(() => {
      setChainTrips(getThroughChainTrips(train.tripId));
    });

    return unsubscribe;
  }, [train.tripId, train.throughLineId, train.prevLineId, chainTrips]);

  // 直通運行チェーン全体のサマリーを計算
  const throughSummary = useMemo(() => {
    if (chainTrips.length > 0) {
      return buildThroughChainSummary(chainTrips);
    }
    return buildThroughChainSummary([
      {
        tripId: train.tripId,
        lineId: train.lineId,
        trainId: train.trainId,
        trainNumber: train.trainNumber,
        trainType: train.trainType,
        customTrainType: train.customTrainType,
        trainName: train.trainName,
        direction: train.direction,
        originStationId: train.originStationId,
        destinationStationId: train.destinationStationId,
        cars: train.cars,
        isHoliday: false,
        stops: train.stops,
      } as TimetableTrip,
    ]);
  }, [chainTrips, train]);

  const hasThroughLines = throughSummary.hasMultipleLines || Boolean(train.throughLineId || train.prevLineId);

  // 路線内スコープ名（例: 埼京線内、東上線内）
  const lineShortName = line?.shortName || line?.name || '当線';
  const currentLineScopeLabel = lineShortName.endsWith('線') ? `${lineShortName}内` : `${lineShortName}線内`;

  const isFullMode = timelineMode === 'full' && hasThroughLines;

  // 表示する停車駅リストの作成
  const displayStops: DisplayStop[] = useMemo(() => {
    if (isFullMode && throughSummary.stops.length > 0) {
      return throughSummary.stops.map((s) => {
        const isCurrent = train.currentStationId === s.stationId;
        return {
          stationId: s.stationId,
          name: s.stationName,
          stationNumber: s.stationNumber,
          arrivalTime: s.arrivalTime,
          departureTime: s.departureTime,
          isPassing: s.isPassing,
          lineId: s.lineId,
          lineColor: s.lineColor,
          lineShortName: s.lineShortName,
          trainType: s.trainType,
          customTrainType: s.customTrainType,
          trainNumber: s.trainNumber,
          trainName: s.trainName,
          isCurrent,
          isBoundary: s.isBoundary,
          boundaryInfo: s.boundaryInfo,
          trainNumberChange: s.trainNumberChange,
          couplingStart: s.couplingStart,
          couplingEnd: s.couplingEnd,
        };
      });
    }

    // 運行区間（自路線のみ）モード
    const curTripIdx = chainTrips.findIndex((t) => t.tripId === train.tripId);
    const prevTrip = curTripIdx > 0 ? chainTrips[curTripIdx - 1] : undefined;
    const nextTrip = curTripIdx >= 0 && curTripIdx < chainTrips.length - 1 ? chainTrips[curTripIdx + 1] : undefined;
    const continuesCouplingFromPrev = Boolean(prevTrip?.coupling && train.coupling);
    const continuesCouplingToNext = Boolean(train.coupling && nextTrip?.coupling);

    const firstStopId = train.stops[0]?.stationId;
    const lastStopId = train.stops[train.stops.length - 1]?.stationId;
    const isChainLastStop = !nextTrip || curTripIdx === chainTrips.length - 1;

    return train.stops.map((s) => {
      const st = STATION_MAP.get(s.stationId);
      const isCurrent = train.currentStationId === s.stationId;
      const trainNumberChange = train.trainNumberSections?.find((sec) => sec.fromStationId === s.stationId)?.trainNumber;
      
      let couplingStart = Boolean(train.coupling?.fromStationId === s.stationId);
      if (s.stationId === firstStopId && continuesCouplingFromPrev) {
        couplingStart = false;
      }

      let couplingEnd = Boolean(train.coupling?.toStationId === s.stationId);
      if ((s.stationId === lastStopId && continuesCouplingToNext) || (s.stationId === lastStopId && isChainLastStop)) {
        couplingEnd = false;
      }

      return {
        stationId: s.stationId,
        name: st?.name || s.stationId,
        stationNumber: st?.stationNumber,
        arrivalTime: s.arrivalTime,
        departureTime: s.departureTime,
        isPassing: Boolean(s.isPassing),
        lineId: train.lineId,
        lineColor,
        lineShortName,
        trainType: train.trainType,
        customTrainType: train.customTrainType,
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        isCurrent,
        isBoundary: false,
        trainNumberChange,
        couplingStart,
        couplingEnd,
      };
    });
  }, [isFullMode, throughSummary.stops, train, lineColor, lineShortName, chainTrips]);

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
              <div className="flex items-center gap-1.5">
                <TrainTypeBadge
                  type={train.trainType}
                  size="md"
                  lineId={train.lineId}
                  customType={train.customTrainType}
                />
                {train.trainName && (
                  <span className="font-bold text-sm tracking-wide text-white drop-shadow-xs">
                    {train.trainName}
                  </span>
                )}
              </div>
              <span className="font-mono text-sm tracking-wider text-amber-300 font-bold">
                {formatTrainNumber(train.trainNumber, train.trainId, train.tripId)}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                ({train.cars}両編成{train.isCoupledActive ? '・併結運行' : ''})
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <span>{train.customDestination || destStation?.name || '行先未定'} 行</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                {train.direction === 'inbound' ? '上り' : '下り'}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              始発: {train.customOrigin || originStation?.name || '始発駅'} 発
            </p>
            {train.isCoupledActive && train.coupling && (
              <p className="text-[11px] text-sky-300 mt-1.5 flex items-center gap-1 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/60">
                <span>🔗 併結相手:</span>
                <strong className="font-mono">{train.coupling.coupledTrainNumber}</strong>
                <span>({train.coupling.coupledCars}両)</span>
              </p>
            )}
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
          {isTracking && (
            <p className="text-[11px] text-amber-300 text-center mt-2 leading-relaxed">
              ※ パネルを閉じると全画面マップで列車を追尾できます
            </p>
          )}
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-slate-500" />
              <span>運行ルート・停車駅</span>
            </h3>

            {/* 「〇〇線内 / 全区間」切り替えタブ */}
            {hasThroughLines && (
              <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200 text-xs">
                <button
                  onClick={() => setTimelineMode('current')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all ${
                    !isFullMode
                      ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {currentLineScopeLabel}
                </button>
                <button
                  onClick={() => setTimelineMode('full')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all flex items-center gap-1.5 ${
                    isFullMode
                      ? 'bg-white text-slate-900 shadow-2xs font-extrabold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span>全区間</span>
                  {throughSummary.lines.length > 1 && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-slate-200/90 text-slate-700 rounded-full font-mono">
                      {throughSummary.lines.length}路線
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="relative pl-7 space-y-4 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {displayStops.map((stop, idx) => {
              const st = STATION_MAP.get(stop.stationId);
              if (!st) return null;

              const isPassing = stop.isPassing;
              const isLast = idx === displayStops.length - 1;
              const itemLineColor = isFullMode ? stop.lineColor : lineColor;

              return (
                <React.Fragment key={`${stop.lineId}_${stop.stationId}_${idx}`}>
                  <div
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
                    {/* ピンマーカー (コンテナ中央揃えにより停車・通過・現在位置を行の上下中央に完全同軸化) */}
                    <div className="absolute -left-7 inset-y-0 w-6 flex items-center justify-center pointer-events-none z-10">
                      <div
                        className={`rounded-full transition-transform group-hover:scale-125 ${
                          stop.isCurrent
                            ? 'w-3.5 h-3.5 bg-amber-500 border-2 border-white ring-4 ring-amber-300 ring-opacity-70 animate-pulse'
                            : isPassing
                            ? 'w-2 h-2 bg-slate-300 border border-slate-300'
                            : 'w-3.5 h-3.5 bg-white border-2'
                        }`}
                        style={!stop.isCurrent && !isPassing ? { borderColor: itemLineColor } : {}}
                      />
                    </div>

                    {/* 駅名と時刻 */}
                    <div className="flex items-center justify-between text-xs py-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`font-semibold ${
                            stop.isCurrent
                              ? 'text-amber-600 font-black'
                              : isPassing
                              ? 'text-slate-400 text-[11px]'
                              : 'text-slate-800'
                          }`}
                        >
                          {st.name}
                        </span>
                        {!isPassing && st.stationNumber && <StationBadge id={st.stationNumber} size="sm" />}
                        {/* 区間別列車番号切り替えインジケーター */}
                        {stop.trainNumberChange && (
                          <span className="text-[9px] text-amber-800 bg-amber-100/80 border border-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
                            ここから {stop.trainNumberChange}
                          </span>
                        )}
                        {/* 併結開始駅インジケーター */}
                        {stop.couplingStart && (
                          <span className="text-[9px] text-sky-800 bg-sky-100/80 border border-sky-300 px-1.5 py-0.5 rounded font-bold">
                            🔗 併結開始
                          </span>
                        )}
                        {/* 切り離し（解結）駅インジケーター */}
                        {stop.couplingEnd && (
                          <span className="text-[9px] text-amber-800 bg-amber-100/80 border border-amber-300 px-1.5 py-0.5 rounded font-bold">
                            ✂️ 切り離し
                          </span>
                        )}
                        {isPassing && (
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded flex items-center gap-1">
                            通過
                            {!isFullMode && idx === 0 && <span className="text-[9px] text-sky-600 font-medium">直通元</span>}
                            {!isFullMode && isLast && <span className="text-[9px] text-sky-600 font-medium">直通先</span>}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {stop.isCurrent && (
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

                  {/* 路線境界ヘッダー（全区間モード時: 境界駅の下） */}
                  {isFullMode && stop.isBoundary && stop.boundaryInfo && (() => {
                    const nextLine = getLine(stop.boundaryInfo.nextLineId);
                    const nextLineColor = nextLine?.lineColor || '#004b97';
                    return (
                      <div className="relative py-1 -ml-6 flex items-center gap-2 select-none">
                        {/* 左側の水平線 */}
                        <div className="w-5 border-t-2" style={{ borderColor: nextLineColor }} />

                        {/* セパレータ本体 */}
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-2xs shrink-0"
                          style={{ backgroundColor: nextLineColor }}
                        >
                          <span className="font-extrabold">{stop.boundaryInfo.nextLineName}</span>
                          {stop.boundaryInfo.nextTrainType && (
                            <TrainTypeBadge
                              type={stop.boundaryInfo.nextTrainType}
                              size="sm"
                              lineId={stop.boundaryInfo.nextLineId}
                              customType={stop.boundaryInfo.nextCustomTrainType}
                            />
                          )}
                          {stop.boundaryInfo.nextTrainNumber && (
                            <span className="font-mono text-[10px] font-bold bg-black/20 px-1.5 py-0.5 rounded text-white">
                              {formatTrainNumber(stop.boundaryInfo.nextTrainNumber)}
                            </span>
                          )}
                        </div>

                        {/* 右側に伸びる水平線 */}
                        <div className="flex-1 border-t-2 opacity-30" style={{ borderColor: nextLineColor }} />
                      </div>
                    );
                  })()}
                </React.Fragment>
              );
            })}

          </div>
        </section>
      </div>
    </div>
  );
};
