import React, { useState, useEffect, useMemo } from 'react';
import type { ActiveTrain, Station, LineId, TrainTypeKey, ThroughChainStop, TimetableTrip, CustomTrainTypeConfig } from '../../types';
import { TrainTypeBadge, StationBadge } from '../Common/Badges';
import { STATION_MAP } from '../../data/stations';
import { formatTrainNumber, getThroughChainTrips, buildThroughChainSummary, getGlobalTripMap } from '../../data/timetableData';
import { loadLinesTimetables, isLineLoaded, subscribeTimetableLoad } from '../../data/timetableLoader';
import { getLine } from '../../data/linesRegistry';
import {
  Navigation,
  Gauge,
  MapPin,
  CheckCircle2,
  AlertCircle,
  LocateFixed,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  TrainFront,
  ArrowLeftRight,
  Link2,
} from 'lucide-react';
import { useSelection } from '../../contexts/SelectionContext';

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
  const { hideOtherTrainsOnTracking, setHideOtherTrainsOnTracking, setSelectedTrainId } = useSelection();

  // 併結運転中の相手編成情報の取得
  const coupledTrip = useMemo(() => {
    if (!train.isCoupledActive || !train.coupling?.coupledTripId) return null;
    return getGlobalTripMap().get(train.coupling.coupledTripId) || null;
  }, [train.isCoupledActive, train.coupling]);

  const coupledTrainName = coupledTrip?.trainName;
  const coupledDestination =
    train.coupling?.coupledDestination ||
    coupledTrip?.customDestination ||
    (coupledTrip?.destinationStationId ? STATION_MAP.get(coupledTrip.destinationStationId)?.name : undefined);

  const handleSwitchCoupledFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (train.coupling?.coupledTripId) {
      setSelectedTrainId(train.coupling.coupledTripId);
    }
  };
  const line = getLine(train.lineId);
  const lineColor = line?.lineColor || '#004b97';
  const originStation = STATION_MAP.get(train.originStationId);
  const destStation = STATION_MAP.get(train.destinationStationId);
  const currentStation = train.currentStationId ? STATION_MAP.get(train.currentStationId) : null;
  const nextStation = STATION_MAP.get(train.nextStationId);
  const nextStopStation = STATION_MAP.get(train.nextStopStationId);

  // 直通運行チェーンの動的再計算用トリガー
  const [timetableLoadTick, setTimetableLoadTick] = useState(0);
  const chainTrips = useMemo(() => {
    void timetableLoadTick;
    return getThroughChainTrips(train.tripId);
  }, [train.tripId, timetableLoadTick]);

  // 直通チェーンの起点 tripId をキーとして表示モードを保持（同一チェーン内の直通移行時は維持、別列車選択時は 'current' にリセット）
  const currentChainRootId = chainTrips[0]?.tripId || train.tripId;
  const [timelineModeState, setTimelineModeState] = useState<{
    chainRootId: string;
    mode: 'current' | 'full';
  }>({ chainRootId: currentChainRootId, mode: 'current' });

  const timelineMode: 'current' | 'full' =
    timelineModeState.chainRootId === currentChainRootId ? timelineModeState.mode : 'current';

  const setTimelineMode = (mode: 'current' | 'full') => {
    setTimelineModeState({ chainRootId: currentChainRootId, mode });
  };

  const isTerminated = train.status === 'TERMINATED';
  const [passedCollapsedState, setPassedCollapsedState] = useState<{
    tripId: string;
    isCollapsed: boolean;
  }>({ tripId: train.tripId, isCollapsed: !isTerminated });

  const isPassedCollapsed =
    passedCollapsedState.tripId === train.tripId ? passedCollapsedState.isCollapsed : !isTerminated;

  const setIsPassedCollapsed = (isCollapsed: boolean) => {
    setPassedCollapsedState({ tripId: train.tripId, isCollapsed });
  };

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
      setTimetableLoadTick((tick) => tick + 1);
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
        const isCurrent =
          train.status === 'STOPPING' &&
          train.currentStationId === s.stationId &&
          (!train.lineId || s.lineId === train.lineId);
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
      const isCurrent = train.status === 'STOPPING' && train.currentStationId === s.stationId;
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

  // 通過済み停車駅数の算出
  const passedCount = useMemo(() => {
    if (displayStops.length === 0) return 0;
    if (train.status === 'TERMINATED') {
      return displayStops.length;
    }

    if (train.status === 'STOPPING') {
      // 停車中: 停車駅より前の駅が通過済み
      let curIdx = displayStops.findIndex(
        (s) => s.stationId === train.currentStationId && (!isFullMode || s.lineId === train.lineId)
      );
      if (curIdx === -1) {
        curIdx = displayStops.findIndex((s) => s.stationId === train.currentStationId);
      }
      return curIdx > 0 ? curIdx : 0;
    } else {
      // 走行中: 次駅（nextStationId）より前の駅が通過済み（現駅 currentStationId も発車済みのため含む）
      let nextIdx = displayStops.findIndex(
        (s) => s.stationId === train.nextStationId && (!isFullMode || s.lineId === train.lineId)
      );
      if (nextIdx === -1) {
        nextIdx = displayStops.findIndex((s) => s.stationId === train.nextStationId);
      }
      if (nextIdx > 0) {
        return nextIdx;
      }
      let curIdx = displayStops.findIndex(
        (s) => s.stationId === train.currentStationId && (!isFullMode || s.lineId === train.lineId)
      );
      if (curIdx === -1) {
        curIdx = displayStops.findIndex((s) => s.stationId === train.currentStationId);
      }
      return curIdx >= 0 ? curIdx + 1 : 0;
    }
  }, [displayStops, train.status, train.currentStationId, train.nextStationId, train.lineId, isFullMode]);

  // 直前駅（一駅前）以外の通過済み駅数（折り畳み対象数）
  const olderPassedCount = Math.max(0, passedCount - 1);

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
          </div>
        </div>

        {/* 併結フォーカス切替パネル（追尾ボタンと同等のフル幅で配置） */}
        {train.isCoupledActive && train.coupling && (
          <div className="mt-3.5 bg-slate-900/90 rounded-xl p-2.5 border border-sky-500/30 shadow-inner w-full">
            <div className="flex items-center justify-between mb-2 text-[11px]">
              <span className="font-bold text-sky-300 flex items-center gap-1">
                <Link2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                併結 ({train.totalCars || train.cars + train.coupling.coupledCars}両)
              </span>
              <span className="text-[10px] text-slate-400">タップして切替</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {/* 現在フォーカス中の編成 */}
              <div className="bg-sky-500/20 border border-sky-400/80 rounded-lg p-2 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="font-bold text-sky-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-sky-400" />
                      {train.coupling.role === 'PRIMARY' ? '主編成' : '併結編成'}
                    </span>
                    <span className="text-slate-300 font-mono text-[10px]">{train.cars}両</span>
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {train.trainName ? `${train.trainName} ` : ''}
                    <span className="font-mono">{formatTrainNumber(train.trainNumber, train.trainId, train.tripId)}</span>
                  </div>
                </div>
                <div className="text-[11px] text-sky-200/90 truncate mt-1">
                  {train.customDestination || destStation?.name} 行
                </div>
              </div>

              {/* 併結相手の編成（クリックで切り替え） */}
              <button
                type="button"
                onClick={handleSwitchCoupledFocus}
                className="bg-slate-800/90 hover:bg-slate-700 active:scale-98 border border-slate-700 hover:border-sky-400/60 rounded-lg p-2 flex flex-col justify-between text-left transition-all group cursor-pointer shadow-xs"
                title="この編成にフォーカスを切り替える"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-0.5">
                    <span className="text-slate-400 group-hover:text-sky-300 font-medium flex items-center gap-1 transition-colors">
                      <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-180 transition-transform duration-300" />
                      {train.coupling.role === 'PRIMARY' ? '併結編成' : '主編成'}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{train.coupling.coupledCars}両</span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white truncate">
                    {coupledTrainName ? `${coupledTrainName} ` : ''}
                    <span className="font-mono">{train.coupling.coupledTrainNumber}</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 group-hover:text-slate-200 truncate mt-1 flex items-center justify-between">
                  <span className="truncate">{coupledDestination || '行先未定'} 行</span>
                  <span className="text-[10px] text-sky-400 font-bold ml-1 shrink-0">切替</span>
                </div>
              </button>
            </div>
          </div>
        )}

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
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-800/90 border border-slate-700 shadow-xs">
                <div className="flex items-center gap-2 min-w-0">
                  {hideOtherTrainsOnTracking ? (
                    <EyeOff className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate">他の列車を非表示</span>
                    <span className="text-[10px] text-slate-400 truncate">追尾中の列車のみをマップに表示</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHideOtherTrainsOnTracking((prev) => !prev)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                    hideOtherTrainsOnTracking ? 'bg-amber-500' : 'bg-slate-600'
                  }`}
                  title="他の列車を非表示にする"
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      hideOtherTrainsOnTracking ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-amber-300 text-center leading-relaxed">
                ※ パネルを閉じると全画面マップで列車を追尾できます
              </p>
            </div>
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
          <div className="flex items-center justify-between mb-2">
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

          <div className="relative pl-7 pt-1 space-y-4 before:absolute before:left-[11px] before:top-3 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {/* 停車駅一覧 */}
            {displayStops.map((stop, idx) => {
              const isPrevStop = passedCount > 0 && idx === passedCount - 1 && train.status !== 'TERMINATED';
              const isPrevStopShadowed = isPrevStop && isPassedCollapsed && olderPassedCount > 0;
              const isOlderPassed = idx < passedCount - 1;
              const isPassed = idx < passedCount;

              // 2駅以上前の通過駅のみ折り畳み時に非表示（一駅前は常時表示）
              if (isOlderPassed && isPassedCollapsed) {
                return null;
              }

              const st = STATION_MAP.get(stop.stationId);
              if (!st) return null;

              const isPassing = stop.isPassing;
              const isLast = idx === displayStops.length - 1;
              const itemLineColor = isFullMode ? stop.lineColor : lineColor;

              // 通過済み区切りヘッダーの表示判定: 直前駅（一駅前）の直後、未通過区間の直前に配置
              const showPassedDividerBeforeThis = passedCount > 0 && idx === passedCount && train.status !== 'TERMINATED';

              // 走行中（RUNNING）かつ通過済み区間の直後の駅の手前に「区間走行中」インジケーターを表示
              const showRunningIndicatorBeforeThis = train.status === 'RUNNING' && idx === passedCount;

              return (
                <React.Fragment key={`${stop.lineId}_${stop.stationId}_${idx}`}>
                  {/* 通過済みディバイダー */}
                  {showPassedDividerBeforeThis && (
                    <div className="relative py-2 -ml-7 flex items-center select-none z-20">
                      {/* ディバイダー */}
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-slate-200" />
                      </div>

                      {/* 開閉ボタン */}
                      <div className="relative flex items-center ml-7">
                        {olderPassedCount > 0 ? (
                          <button
                            type="button"
                            onClick={() => setIsPassedCollapsed(!isPassedCollapsed)}
                            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-800 border border-slate-300 shadow-2xs transition-colors cursor-pointer"
                            title={isPassedCollapsed ? '通過済みの駅を展開' : '通過済みの駅を折り畳む'}
                          >
                            <span>通過済み</span>
                            <span className="text-[10px] text-slate-500 font-normal font-mono">
                              ({olderPassedCount}駅)
                            </span>
                            {isPassedCollapsed ? (
                              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                            ) : (
                              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>
                        ) : (
                          <div className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-500 border border-slate-200 shadow-2xs">
                            <span>通過済み</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {showRunningIndicatorBeforeThis && (
                    <div className="relative py-1.5 select-none flex items-center">
                      {/* [走行中] トレインバッジ */}
                      <div className="absolute -left-7 inset-y-0 w-6 flex items-center justify-center pointer-events-none z-10">
                        <div className="relative flex items-center justify-center">
                          <div
                            className="w-5 h-5 rounded-md animate-ping absolute opacity-30"
                            style={{ backgroundColor: itemLineColor }}
                          />
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center text-white shadow-2xs border border-white/40"
                            style={{ backgroundColor: itemLineColor }}
                          >
                            <TrainFront className="w-3.5 h-3.5 stroke-[2.2]" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs py-0.5 flex-1">
                        <span className="font-semibold text-slate-700 text-[11px]">
                          走行中
                        </span>
                        {train.speedKmh > 0 && (
                          <>
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[10px] font-semibold border border-slate-200/80 shadow-2xs">
                              {Math.round(train.speedKmh)} km/h
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  <div
                    role="button"
                    tabIndex={0}
                    className={`relative group cursor-pointer select-none transition-all ${
                      isPassed ? 'opacity-70 hover:opacity-100' : ''
                    }`}
                    onClick={() => onSelectStation(st)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectStation(st);
                      }
                    }}
                  >
                    {/* 折りたたみ時の直前駅上部シャドウオーバーレイ */}
                    {isPrevStopShadowed && (
                      <div
                        className="absolute -left-7 right-0 -top-1 h-7 pointer-events-none z-10 transition-opacity group-hover:opacity-0"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.75) 25%, rgba(15, 23, 42, 0.05) 50%, transparent 100%)',
                        }}
                      />
                    )}

                    {/* ピンマーカー */}
                    <div className={`absolute -left-7 inset-y-0 w-6 flex items-center justify-center pointer-events-none z-10 ${
                      isPrevStopShadowed ? 'prev-stop-faded' : ''
                    }`}>
                      {stop.isCurrent ? (
                        /* [停車中] トレインバッジ */
                        <div className="relative flex items-center justify-center">
                          <div
                            className="w-5 h-5 rounded-md animate-ping absolute opacity-30"
                            style={{ backgroundColor: itemLineColor }}
                          />
                          <div
                            className="w-5 h-5 rounded-md flex items-center justify-center text-white shadow-2xs border border-white/40"
                            style={{ backgroundColor: itemLineColor }}
                          >
                            <TrainFront className="w-3.5 h-3.5 stroke-[2.2]" />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`rounded-full transition-transform group-hover:scale-125 ${
                            isPassing
                              ? 'w-2 h-2 bg-slate-300 border border-slate-300'
                              : 'w-3.5 h-3.5 bg-white border-2'
                          }`}
                          style={!isPassing ? { borderColor: itemLineColor } : {}}
                        />
                      )}
                    </div>

                    {/* 駅名と時刻 */}
                    <div className={`flex items-center justify-between text-xs py-0.5 ${
                      isPrevStopShadowed ? 'prev-stop-faded' : ''
                    }`}>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`font-semibold ${
                            stop.isCurrent
                              ? 'text-amber-600 font-black'
                              : isPassing
                              ? 'text-slate-400 text-[11px]'
                              : isPassed
                              ? 'text-slate-600 font-semibold'
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
                        {/* 併結駅インジケーター */}
                        {stop.couplingStart && (
                          <span className="text-[9px] text-sky-800 bg-sky-100/80 border border-sky-300 px-1.5 py-0.5 rounded font-bold">
                            併結
                          </span>
                        )}
                        {/* 切り離し駅インジケーター */}
                        {stop.couplingEnd && (
                          <span className="text-[9px] text-amber-800 bg-amber-100/80 border border-amber-300 px-1.5 py-0.5 rounded font-bold">
                            切り離し
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
                              <span className="text-slate-600 font-medium">
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
                      <div
                        className={`relative py-1 -ml-6 flex items-center gap-2 select-none transition-opacity ${
                          isPassed ? 'opacity-70 hover:opacity-100' : ''
                        }`}
                      >
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

            {/* 運行終了インジケーター */}
            {train.status === 'TERMINATED' && (
              <div className="relative py-1 select-none flex items-center gap-2">
                <div className="absolute -left-7 inset-y-0 w-6 flex items-center justify-center pointer-events-none z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                </div>
                <div className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                  運行終了（全区間走破）
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
