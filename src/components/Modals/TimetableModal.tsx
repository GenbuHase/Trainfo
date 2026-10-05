import React, { useState, useEffect } from 'react';
import type { Station, Direction } from '../../types';
import { getFullDayStationTimetable, formatTrainNumber } from '../../data/timetableData';
import { StationBadge } from '../Common/Badges';
import { TRAIN_TYPES } from '../../data/trainTypes';
import { getLine, getAllLines } from '../../data/linesRegistry';
import { X, Download, ArrowLeftRight } from 'lucide-react';

interface TimetableModalProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
  defaultIsHoliday: boolean;
  onSwitchStation?: (station: Station) => void;
}

export const TimetableModal: React.FC<TimetableModalProps> = ({
  station,
  isOpen,
  onClose,
  defaultIsHoliday,
  onSwitchStation,
}) => {
  const line = station ? getLine(station.lineId) : undefined;
  const isFirstStation = line ? line.stations[0]?.id === station?.id : false;
  const isLastStation = line ? line.stations[line.stations.length - 1]?.id === station?.id : false;

  const [direction, setDirection] = useState<Direction>(() => (isFirstStation ? 'outbound' : 'inbound'));
  const [isHoliday, setIsHoliday] = useState<boolean>(defaultIsHoliday);

  // 駅が切り替わったときに始発・終点に合わせて方向を更新
  useEffect(() => {
    if (isFirstStation) {
      setDirection('outbound');
    } else if (isLastStation) {
      setDirection('inbound');
    }
  }, [station?.id, isFirstStation, isLastStation]);

  if (!isOpen || !station) return null;

  const lineName = line?.name || '路線';
  const directionFullName = direction === 'inbound'
    ? (line?.directionNames.inboundFull || '上り方面')
    : (line?.directionNames.outboundFull || '下り方面');
  const inboundButtonLabel = line?.directionNames.inboundShort || '上り';
  const outboundButtonLabel = line?.directionNames.outboundShort || '下り';
  const trainTypesMap = line?.trainTypes || TRAIN_TYPES;
  const themeColor = line?.lineColor || '#004b97';

  // 同名駅（他路線）の検索（例: 東上線川越駅 <-> JR川越駅）
  const allLines = getAllLines();
  const alternateStations: { station: Station; lineName: string }[] = [];
  allLines.forEach((l) => {
    if (l.id !== station.lineId) {
      const match = l.stations.find((s) => s.name === station.name);
      if (match) {
        alternateStations.push({ station: match, lineName: l.name });
      }
    }
  });

  // 全日時刻表データの取得
  const fullDayData = getFullDayStationTimetable(station.id, isHoliday, station.lineId);

  // CSVダウンロード
  const handleDownloadCsv = () => {
    let csv = `時,分,種別,行先,列車番号\n`;
    for (const row of fullDayData) {
      const departures = direction === 'inbound' ? row.inbound : row.outbound;
      for (const dep of departures) {
        const typeName = trainTypesMap[dep.type]?.name || dep.type;
        const csvHour = row.hour >= 24 ? String(row.hour - 24) : String(row.hour);
        csv += `${csvHour},${dep.time},${typeName},${dep.destination},${formatTrainNumber(dep.trainNumber, dep.tripId)}\n`;
      }
    }
    const blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lineName}_${station.name}駅_${direction === 'inbound' ? '上り' : '下り'}_時刻表.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* モーダルヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <StationBadge id={station.id} size="lg" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded text-white shadow-2xs"
                  style={{ backgroundColor: themeColor }}
                >
                  {lineName}
                </span>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span>{station.name}駅 時刻表</span>
                  <span className="text-xs font-normal text-slate-500">({station.nameKana})</span>
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {lineName} {directionFullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 他路線の同名駅への切り替え */}
            {alternateStations.length > 0 && onSwitchStation && (
              <div className="hidden md:flex items-center gap-1.5">
                {alternateStations.map((alt) => (
                  <button
                    key={`${alt.station.lineId}_${alt.station.id}`}
                    onClick={() => onSwitchStation(alt.station)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
                    title={`${alt.lineName} ${alt.station.name}駅の時刻表に切り替え`}
                  >
                    <ArrowLeftRight className="w-3.5 h-3.5 text-slate-400" />
                    <span>{alt.lineName}へ切替</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleDownloadCsv}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV保存</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* コントロール・凡例バー */}
        <div className="p-3 sm:px-5 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* 方向切り替え */}
          <div className="flex rounded-lg bg-slate-100 p-0.5 font-bold">
            <button
              onClick={() => setDirection('inbound')}
              disabled={isFirstStation}
              className={`px-3 py-1.5 rounded-md transition-all ${
                direction === 'inbound' ? 'bg-white shadow-xs' : 'text-slate-500 disabled:opacity-30'
              }`}
              style={direction === 'inbound' ? { color: themeColor } : undefined}
            >
              {inboundButtonLabel}
            </button>
            <button
              onClick={() => setDirection('outbound')}
              disabled={isLastStation}
              className={`px-3 py-1.5 rounded-md transition-all ${
                direction === 'outbound' ? 'bg-white shadow-xs' : 'text-slate-500 disabled:opacity-30'
              }`}
              style={direction === 'outbound' ? { color: themeColor } : undefined}
            >
              {outboundButtonLabel}
            </button>
          </div>

          {/* 平日/土休日 */}
          <div className="flex rounded-lg bg-slate-100 p-0.5 font-bold">
            <button
              onClick={() => setIsHoliday(false)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                !isHoliday ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              平日ダイヤ
            </button>
            <button
              onClick={() => setIsHoliday(true)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                isHoliday ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-500'
              }`}
            >
              土休日ダイヤ
            </button>
          </div>

          {/* 種別凡例 */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-400 font-medium">種別凡例:</span>
            {Object.values(trainTypesMap).map((type) => (
              <span
                key={type.key}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white shadow-2xs"
                style={{ backgroundColor: type.bgColor }}
              >
                {type.shortName}
              </span>
            ))}
          </div>
        </div>

        {/* 時刻表グリッド本体 */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
            <div className="divide-y divide-slate-100">
              {fullDayData.map((row) => {
                const departures = direction === 'inbound' ? row.inbound : row.outbound;
                if ((row.hour < 4 || row.hour >= 26) && departures.length === 0) return null;

                return (
                  <div key={row.hour} className="flex items-start hover:bg-slate-50/80 transition-colors">
                    {/* 時間ヘッダー (左カラム) */}
                    <div className="w-14 sm:w-16 py-3 px-2 text-center bg-slate-100 font-black text-slate-800 text-base font-mono border-r border-slate-200 shrink-0">
                      {row.displayHour || row.hour}
                    </div>

                    {/* 発車分グリッド */}
                    <div className="flex-1 p-2 sm:p-3 flex flex-wrap gap-2 items-center">
                      {departures.length === 0 ? (
                        <span className="text-slate-300 text-xs font-mono">-</span>
                      ) : (
                        departures.map((dep, idx) => {
                          const conf = trainTypesMap[dep.type] || trainTypesMap.local || TRAIN_TYPES.local;
                          return (
                            <div
                              key={idx}
                              className="group relative flex flex-col items-center cursor-default"
                              title={`${conf.name} ${dep.destination}行 (${formatTrainNumber(dep.trainNumber, dep.tripId)})`}
                            >
                              <div
                                className="px-2 py-1 rounded text-xs font-black font-mono shadow-2xs transition-transform group-hover:scale-110 text-white"
                                style={{ backgroundColor: conf.bgColor }}
                              >
                                {dep.time}
                              </div>
                              <span className="text-[10px] text-slate-500 font-sans mt-0.5 max-w-[42px] truncate">
                                {dep.destination}
                              </span>

                              {/* ホバーツールチップ */}
                              <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-50 whitespace-nowrap bg-slate-900 text-white text-[11px] py-1 px-2 rounded shadow-lg">
                                <span className="font-bold">{conf.name} {dep.destination}行</span>
                                <span className="text-[10px] text-slate-300">{row.hour}:{dep.time}発 ({formatTrainNumber(dep.trainNumber, dep.tripId)})</span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
