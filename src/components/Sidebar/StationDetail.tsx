import React, { useState, useEffect, useMemo } from 'react';
import type { Station, ActiveTrain, Direction } from '../../types';
import { StationBadge, TrainTypeBadge } from '../Common/Badges';
import { getStationDepartures } from '../../data/timetableData';
import { STATION_MAP } from '../../data/stations';
import { getLine, getAllLines } from '../../data/linesRegistry';
import {
  Clock,
  Accessibility,
  Calendar,
  Layers,
  ChevronRight,
  Radio,
  ArrowLeftRight,
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
  const isFirstStation = line ? line.stations[0]?.id === station.id : station.number === 1;
  const isLastStation = line ? line.stations[line.stations.length - 1]?.id === station.id : station.number === 39;

  const [selectedDirection, setSelectedDirection] = useState<Direction>(() =>
    isFirstStation ? 'outbound' : isLastStation ? 'inbound' : 'outbound'
  );

  // 駅変更時に方向を追従
  useEffect(() => {
    if (isFirstStation) {
      setSelectedDirection('outbound');
    } else if (isLastStation) {
      setSelectedDirection('inbound');
    }
  }, [station.id, isFirstStation, isLastStation]);

  // 同名駅（他路線）の検索（例: 東上線川越駅 <-> JR川越駅）
  const alternateStations = useMemo(() => {
    const allLines = getAllLines();
    const matches: { station: Station; lineName: string }[] = [];
    allLines.forEach((l) => {
      if (l.id !== station.lineId) {
        const match = l.stations.find((s) => s.name === station.name);
        if (match) {
          matches.push({ station: match, lineName: l.name });
        }
      }
    });
    return matches;
  }, [station.name, station.lineId]);

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
              <StationBadge id={station.id} size="lg" />
              <h2 className="text-2xl font-black tracking-tight">{station.name}</h2>
            </div>
            <p className="text-xs text-white/70 mt-0.5">{station.nameKana}</p>
          </div>
        </div>

        {/* 同名駅（他路線）の切り替えリンク */}
        {alternateStations.length > 0 && onSelectStation && (
          <div className="mt-3 pt-2.5 border-t border-white/20">
            <div className="text-[11px] text-white/80 mb-1.5 font-medium">他路線の同名駅：</div>
            <div className="flex flex-wrap gap-1.5">
              {alternateStations.map((alt) => (
                <button
                  key={`${alt.station.lineId}_${alt.station.id}`}
                  type="button"
                  onClick={() => onSelectStation(alt.station)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white text-xs font-semibold backdrop-blur-xs transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>{alt.lineName}（{alt.station.id}）へ切替</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 乗り換え路線 */}
        {station.transfers.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {station.transfers.map((tr) => (
              <span
                key={tr}
                className="inline-flex items-center text-[11px] font-medium bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white"
              >
                {tr}
              </span>
            ))}
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
                disabled={isFirstStation}
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
                disabled={isLastStation}
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
                  
                  // 該当する走行中列車が存在するか
                  const liveTrain = activeTrains.find((t) => t.tripId === trip.tripId);
                  const isCurrentStation = liveTrain?.currentStationId === station.id && liveTrain.status === 'STOPPING';
                  const isApproaching = liveTrain?.nextStopStationId === station.id;

                  return (
                    <div
                      key={trip.tripId}
                      onClick={() => liveTrain && onSelectTrain(liveTrain)}
                      className={`grid grid-cols-12 items-center px-1.5 py-1.5 rounded transition-colors text-xs ${
                        liveTrain
                          ? 'cursor-pointer hover:bg-slate-800/80 bg-slate-800/40 border border-slate-700/50'
                          : 'opacity-85'
                      }`}
                    >
                      {/* 種別 */}
                      <div className="col-span-3">
                        <TrainTypeBadge type={trip.trainType} size="sm" lineId={station.lineId} />
                      </div>

                      {/* 時刻 */}
                      <div className="col-span-2 font-bold text-amber-300 text-sm">
                        {depTime}
                      </div>

                      {/* 行先 */}
                      <div className="col-span-4 font-bold text-white flex items-center gap-1 truncate">
                        <span>{trip.customDestination || destStation?.name || '行先未定'}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({trip.cars}両)</span>
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
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 font-bold text-xs rounded-xl border border-slate-200 transition-colors shadow-2xs"
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
