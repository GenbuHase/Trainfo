import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Station, ActiveTrain, Direction } from '../../types';
import { StationBadge, TrainTypeBadge } from '../Common/Badges';
import { getStationDepartures, getThroughChainTripIds, getStationAvailableDirections } from '../../data/timetableData';
import { STATION_MAP } from '../../data/stations';
import { getLine, getAlternateStations } from '../../data/linesRegistry';
import {
  Clock,
  Accessibility,
  Calendar,
  Layers,
  ChevronRight,
  Radio,
  ArrowLeftRight,
  ChevronDown,
} from 'lucide-react';

interface StationDetailProps {
  station: Station;
  currentSec: number;
  isHoliday: boolean;
  activeTrains: ActiveTrain[];
  onSelectTrain: (train: ActiveTrain) => void;
  onOpenFullTimetable: (station: Station) => void;
  onSelectStation?: (station: Station) => void;
}

export const StationDetail: React.FC<StationDetailProps> = ({
  station,
  currentSec,
  isHoliday,
  activeTrains,
  onSelectTrain,
  onOpenFullTimetable,
  onSelectStation,
}) => {
  const line = getLine(station.lineId);
  const themeColor = line?.lineColor || '#004b97';
  // 該当駅で利用可能な進行方向の判定（終着駅・起点駅・支線末端などで片方向しか運行がない場合を検知）
  const { hasInbound, hasOutbound } = useMemo(
    () => getStationAvailableDirections(station.id, station.lineId),
    [station.id, station.lineId]
  );

  const [selectedDirectionState, setSelectedDirection] = useState<Direction>(() =>
    !hasOutbound ? 'inbound' : 'outbound'
  );

  // 片方向しか存在しない駅（成田空港などの終着駅、起点駅など）は自動的に存在する方向に固定
  const selectedDirection: Direction = useMemo(() => {
    if (!hasOutbound && hasInbound) return 'inbound';
    if (!hasInbound && hasOutbound) return 'outbound';
    return selectedDirectionState;
  }, [hasInbound, hasOutbound, selectedDirectionState]);

  // 同名駅（他路線）の検索（例: 東上線川越駅 <-> JR川越駅）
  const alternateStations = useMemo(
    () => getAlternateStations(station),
    [station]
  );

  // 未収録（Trainfo内に駅詳細がない）乗換路線を抽出（自路線・切替可能路線を除外）
  const unregisteredTransfers = useMemo(() => {
    if (!station.transfers || station.transfers.length === 0) return [];
    const currentLineName = line?.name || '';
    const alternateLineNames = new Set(alternateStations.map((alt) => alt.lineName));
    return station.transfers.filter((tr) => {
      if (tr === currentLineName) return false;
      if (alternateLineNames.has(tr)) return false;
      return true;
    });
  }, [station.transfers, line?.name, alternateStations]);

  const [isLineMenuOpen, setIsLineMenuOpen] = useState<boolean>(false);
  const lineMenuRef = useRef<HTMLDivElement>(null);

  // 駅変更時のステートリセット
  const [prevStationKey, setPrevStationKey] = useState<string>('');
  const currentStationKey = `${station.lineId}_${station.id}`;
  if (currentStationKey !== prevStationKey) {
    setPrevStationKey(currentStationKey);
    setIsLineMenuOpen(false);
  }

  // メニュー外部クリックおよびEscapeキーで閉じる
  useEffect(() => {
    if (!isLineMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (lineMenuRef.current && !lineMenuRef.current.contains(e.target as Node)) {
        setIsLineMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLineMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLineMenuOpen]);

  // 直近の発車スケジュールを取得
  const departures = getStationDepartures(station.id, currentSec, isHoliday, 5, station.lineId);
  const activeDepartures = selectedDirection === 'inbound' ? departures.inbound : departures.outbound;

  const inboundLabel = line?.directionNames.inboundShort || '上り方面';
  const outboundLabel = line?.directionNames.outboundShort || '下り方面';

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 overflow-y-auto">
      {/* 駅ヘッダー写真風バナー */}
      <div
        className="relative text-white p-5 pb-6 transition-colors shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${themeColor} 0%, #0f172a 100%)`,
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white/20 backdrop-blur-xs text-white">
                {line?.name || '路線'}
              </span>
              <span className="text-xs text-white/70 tracking-wider font-mono">{station.nameEn}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {station.stationNumber && <StationBadge id={station.stationNumber} size="lg" />}
              <h2 className="text-2xl font-black tracking-tight">{station.name}</h2>
            </div>
            <p className="text-xs text-white/70 mt-0.5">{station.nameKana}</p>
          </div>
        </div>

        {/* 乗換路線 / 他路線（同名駅）への切り替え */}
        {(alternateStations.length > 0 || unregisteredTransfers.length > 0) && (
          <div className="mt-3 pt-2.5 border-t border-white/20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                <ArrowLeftRight className="w-3.5 h-3.5 text-white/70 shrink-0" />
                <span>
                  {alternateStations.length > 0
                    ? `乗換路線（${alternateStations.length}路線）`
                    : '乗換路線'}
                </span>
              </div>

              {/* 他路線への切り替えボタン */}
              {alternateStations.length === 1 && onSelectStation && (
                <button
                  type="button"
                  onClick={() => onSelectStation(alternateStations[0].station)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer whitespace-nowrap"
                  title={`${alternateStations[0].lineName} ${alternateStations[0].station.name}駅に切り替え`}
                >
                  <span>{alternateStations[0].lineName}へ切替</span>
                </button>
              )}

              {alternateStations.length > 1 && onSelectStation && (
                <div className="relative" ref={lineMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsLineMenuOpen((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer border border-white/20 shadow-2xs whitespace-nowrap"
                    title="他路線の駅詳細へ切り替え"
                    aria-expanded={isLineMenuOpen}
                    aria-haspopup="true"
                  >
                    <span>他路線へ切替 ({alternateStations.length})</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform shrink-0 ${isLineMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isLineMenuOpen && (
                    <div className="absolute right-0 top-full mt-1.5 z-50 w-64 max-h-72 overflow-y-auto bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 py-1 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400">
                        乗換路線を選択 ({alternateStations.length})
                      </div>
                      <div className="py-1">
                        {alternateStations.map((alt) => {
                          const altLine = getLine(alt.station.lineId);
                          const altColor = altLine?.lineColor || '#64748b';
                          return (
                            <button
                              key={`${alt.station.lineId}_${alt.station.id}`}
                              type="button"
                              onClick={() => {
                                onSelectStation(alt.station);
                                setIsLineMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 flex items-center gap-2.5 hover:bg-slate-50 transition-colors text-xs font-medium text-slate-700 cursor-pointer"
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 shadow-2xs"
                                style={{ backgroundColor: altColor }}
                              />
                              <span className="flex-1 truncate">{alt.lineName}</span>
                              {alt.station.stationNumber && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                                  {alt.station.stationNumber}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 未収録の乗換路線（もしあれば表示） */}
            {unregisteredTransfers.length > 0 && (
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-white/60">その他:</span>
                {unregisteredTransfers.map((tr) => (
                  <span
                    key={tr}
                    className="inline-flex items-center text-[10px] font-medium bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded text-white/90"
                  >
                    {tr}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 space-y-5 flex-1">
        {/* 電光掲示板風 リアルタイム発車標 */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
              <Clock className="w-4 h-4" style={{ color: themeColor }} />
              <span>発車案内（リアルタイム）</span>
            </div>

            {/* 上り / 下り タブ切り替え */}
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setSelectedDirection('inbound')}
                disabled={!hasInbound}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedDirection === 'inbound'
                    ? 'bg-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 disabled:opacity-30'
                }`}
                style={selectedDirection === 'inbound' ? { color: themeColor } : {}}
              >
                {inboundLabel}
              </button>
              <button
                onClick={() => setSelectedDirection('outbound')}
                disabled={!hasOutbound}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  selectedDirection === 'outbound'
                    ? 'bg-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 disabled:opacity-30'
                }`}
                style={selectedDirection === 'outbound' ? { color: themeColor } : {}}
              >
                {outboundLabel}
              </button>
            </div>
          </div>

          {/* LED発車標コンテナ */}
          <div className="bg-[#12161f] rounded-xl p-3 shadow-inner border border-slate-800 text-slate-100 font-mono">
            {/* LED見出し */}
            <div className="grid grid-cols-12 text-[10px] text-amber-400/90 font-bold border-b border-slate-700/60 pb-1.5 mb-2 px-1">
              <span className="col-span-3">種別</span>
              <span className="col-span-2">時刻</span>
              <span className="col-span-4">行先</span>
              <span className="col-span-3 text-right">運行情報</span>
            </div>

            {/* 発車一覧 */}
            {activeDepartures.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                本日の運行は終了、または直近の列車がありません
              </div>
            ) : (
              <div className="space-y-2">
                {activeDepartures.map((trip) => {
                  const destStation = STATION_MAP.get(trip.destinationStationId);
                  const stop = trip.stops.find((s) => s.stationId === station.id);
                  const depTime = stop ? stop.departureTime.slice(0, 5) : '--:--';
                  
                  // 該当する走行中列車が存在するか（同一tripId、直通運行チェーン、または列車番号による照合）
                  const liveTrain = activeTrains.find((t) => {
                    if (t.tripId === trip.tripId) return true;
                    if (trip.tripId && !trip.tripId.startsWith('DEP_')) {
                      const chain = getThroughChainTripIds(trip.tripId);
                      if (chain.has(t.tripId)) return true;
                    }
                    if (t.lineId === trip.lineId && t.trainNumber === trip.trainNumber) return true;
                    return false;
                  });
                  const isCurrentStation = liveTrain?.currentStationId === station.id && liveTrain.status === 'STOPPING';
                  const isApproaching = liveTrain?.nextStopStationId === station.id;

                  return (
                    <div
                      key={trip.tripId}
                      onClick={() => liveTrain && onSelectTrain(liveTrain)}
                      className={`grid grid-cols-12 items-center px-1.5 py-1.5 rounded transition-colors text-xs min-h-[38px] ${
                        liveTrain
                          ? 'cursor-pointer hover:bg-slate-800/80 bg-slate-800/40 border border-slate-700/50'
                          : 'opacity-85'
                      }`}
                    >
                      {/* 種別 */}
                      <div className="col-span-3 flex items-center overflow-hidden">
                        <TrainTypeBadge
                          type={trip.trainType}
                          size="sm"
                          lineId={station.lineId}
                          customType={trip.customTrainType || liveTrain?.customTrainType}
                        />
                      </div>

                      {/* 時刻 */}
                      <div className="col-span-2 font-bold text-amber-300 text-sm">
                        {depTime}
                      </div>

                      {/* 行先 & 列車愛称・号数 */}
                      <div className="col-span-4 flex flex-col justify-center min-w-0 pr-1">
                        {(trip.trainName || liveTrain?.trainName) && (
                          <span
                            className="text-[10px] text-amber-300 font-bold truncate leading-tight tracking-tight"
                            title={trip.trainName || liveTrain?.trainName}
                          >
                            {trip.trainName || liveTrain?.trainName}
                          </span>
                        )}
                        <div className="font-bold text-white flex items-center gap-1 truncate text-xs">
                          <span>{trip.customDestination || destStation?.name || '行先未定'}</span>
                          <span className="text-[10px] text-slate-400 font-normal shrink-0">({trip.cars}両)</span>
                        </div>
                      </div>

                      {/* 運行情報・接近表示 */}
                      <div className="col-span-3 text-right">
                        {isCurrentStation ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 animate-pulse">
                            <Radio className="w-3 h-3" />
                            停車中
                          </span>
                        ) : isApproaching ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 animate-pulse">
                            まもなく
                          </span>
                        ) : liveTrain ? (
                          <span className="text-[11px] text-sky-400 font-semibold flex items-center justify-end gap-1">
                            走行中
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-[11px] text-emerald-400">定刻</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 全日時刻表 ボタン */}
        <button
          onClick={() => onOpenFullTimetable(station)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 font-bold text-xs rounded-xl border border-slate-200 transition-colors shadow-2xs cursor-pointer"
          style={{ color: themeColor }}
        >
          <Calendar className="w-4 h-4" />
          <span>当駅の全日時刻表を見る（{isHoliday ? '土休日' : '平日'}）</span>
        </button>

        {/* 停車する列車種別 */}
        <section className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>停車種別</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {station.stoppingTypes.map((type) => (
              <TrainTypeBadge key={type} type={type} size="sm" lineId={station.lineId} />
            ))}
          </div>
        </section>

        {/* 駅設備・バリアフリー */}
        <section className="bg-slate-50 rounded-xl p-3.5 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-700 mb-2.5 flex items-center gap-1.5">
            <Accessibility className="w-3.5 h-3.5 text-slate-500" />
            <span>駅設備・バリアフリー情報</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className={station.facilities.elevator ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {station.facilities.elevator ? '●' : '×'}
              </span>
              <span className={station.facilities.elevator ? 'text-slate-800' : 'text-slate-400'}>エレベーター</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={station.facilities.multipurposeToilet ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {station.facilities.multipurposeToilet ? '●' : '×'}
              </span>
              <span className={station.facilities.multipurposeToilet ? 'text-slate-800' : 'text-slate-400'}>多機能トイレ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={station.facilities.waitingRoom ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {station.facilities.waitingRoom ? '●' : '×'}
              </span>
              <span className={station.facilities.waitingRoom ? 'text-slate-800' : 'text-slate-400'}>ホーム待合室</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={station.facilities.ticketOffice ? 'text-emerald-600 font-bold' : 'text-slate-300'}>
                {station.facilities.ticketOffice ? '●' : '×'}
              </span>
              <span className={station.facilities.ticketOffice ? 'text-slate-800' : 'text-slate-400'}>定期券・特急券売場</span>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
            <span>所在地: {station.address}</span>
          </div>
        </section>
      </div>
    </div>
  );
};
