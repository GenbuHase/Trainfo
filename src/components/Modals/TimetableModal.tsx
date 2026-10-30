import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Station, Direction } from '../../types';
import { getFullDayStationTimetable, formatTrainNumber, getStationAvailableDirections } from '../../data/timetableData';
import { StationBadge } from '../Common/Badges';
import { TRAIN_TYPES } from '../../data/trainTypes';
import { getLine, getAlternateStations, getTrainTypeConfig } from '../../data/linesRegistry';
import { X, Download, ArrowLeftRight, ChevronDown } from 'lucide-react';

import { useUI } from '../../contexts/UIContext';
import { useSimulation } from '../../contexts/SimulationContext';
import { useSelection } from '../../contexts/SelectionContext';

export const TimetableModal: React.FC = () => {
  const ui = useUI();
  const simulation = useSimulation();
  const selection = useSelection();

  const station = ui.timetableStation;
  const isOpen = ui.isTimetableOpen;
  const onClose = ui.closeTimetable;
  const defaultIsHoliday = simulation.isHoliday;
  const onSwitchStation = (st: Station) => {
    setIsLineMenuOpen(false);
    ui.setTimetableStation(st);
    selection.selectStation(st);
  };

  const line = station ? getLine(station.lineId) : undefined;
  // 該当駅で利用可能な進行方向の判定（終着駅・起点駅・支線末端などで片方向しか運行がない場合を検知）
  const { hasInbound, hasOutbound } = useMemo(
    () => (station ? getStationAvailableDirections(station.id, station.lineId) : { hasInbound: true, hasOutbound: true }),
    [station]
  );

  const [directionState, setDirection] = useState<Direction>(() => (!hasOutbound ? 'inbound' : 'outbound'));
  const [isHoliday, setIsHoliday] = useState<boolean>(defaultIsHoliday);
  const [isLineMenuOpen, setIsLineMenuOpen] = useState<boolean>(false);
  const lineMenuRef = useRef<HTMLDivElement>(null);

  // 駅切り替えやモーダル開閉時のステートリセット
  const [prevStationKey, setPrevStationKey] = useState<string>('');
  const currentStationKey = isOpen && station ? `${station.lineId}_${station.id}` : '';
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

  const direction: Direction = useMemo(() => {
    if (!hasOutbound && hasInbound) return 'inbound';
    if (!hasInbound && hasOutbound) return 'outbound';
    return directionState;
  }, [hasInbound, hasOutbound, directionState]);

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
  const alternateStations = getAlternateStations(station);

  // 全日時刻表データの取得
  const fullDayData = getFullDayStationTimetable(station.id, isHoliday, station.lineId);

  // CSVダウンロード
  const handleDownloadCsv = () => {
    let csv = `時,分,種別,列車名,行先,列車番号\n`;
    for (const row of fullDayData) {
      const departures = direction === 'inbound' ? row.inbound : row.outbound;
      for (const dep of departures) {
        const typeConf = getTrainTypeConfig(dep.type, station.lineId, dep.customTrainType);
        const typeName = typeConf.name || dep.type;
        const csvHour = row.hour >= 24 ? String(row.hour - 24) : String(row.hour);
        const trainName = dep.trainName || '';
        csv += `${csvHour},${dep.time},${typeName},${trainName},${dep.destination},${formatTrainNumber(dep.trainNumber, dep.tripId)}\n`;
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
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between gap-3 bg-slate-50">
          <div className="flex items-center gap-3 min-w-0">
            {station.stationNumber && <StationBadge id={station.stationNumber} size="lg" />}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded text-white shadow-2xs whitespace-nowrap"
                  style={{ backgroundColor: themeColor }}
                >
                  {lineName}
                </span>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 truncate">
                  <span className="truncate">{station.name}駅 時刻表</span>
                  <span className="text-xs font-normal text-slate-500 whitespace-nowrap">({station.nameKana})</span>
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1 truncate">
                {lineName} {directionFullName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* 他路線の同名駅への切り替え */}
            {alternateStations.length === 1 && onSwitchStation && (
              <button
                key={`${alternateStations[0].station.lineId}_${alternateStations[0].station.id}`}
                onClick={() => onSwitchStation(alternateStations[0].station)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                title={`${alternateStations[0].lineName} ${alternateStations[0].station.name}駅の時刻表に切り替え`}
              >
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{alternateStations[0].lineName}へ切替</span>
              </button>
            )}

            {alternateStations.length > 1 && onSwitchStation && (
              <div className="relative" ref={lineMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsLineMenuOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                  title="他路線の時刻表へ切り替え"
                  aria-expanded={isLineMenuOpen}
                  aria-haspopup="true"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>他路線へ切替 ({alternateStations.length})</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform shrink-0 ${isLineMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLineMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-50 w-64 max-h-72 overflow-y-auto bg-white rounded-xl shadow-xl border border-slate-200 py-1 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
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
                            onClick={() => {
                              onSwitchStation(alt.station);
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

            <button
              onClick={handleDownloadCsv}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV保存</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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
              disabled={!hasInbound}
              className={`px-3 py-1.5 rounded-md transition-all ${
                direction === 'inbound' ? 'bg-white shadow-xs' : 'text-slate-500 disabled:opacity-30'
              }`}
              style={direction === 'inbound' ? { color: themeColor } : undefined}
            >
              {inboundButtonLabel}
            </button>
            <button
              onClick={() => setDirection('outbound')}
              disabled={!hasOutbound}
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
                  <div key={row.hour} className="flex hover:bg-slate-50/80 transition-colors">
                    {/* 時間ヘッダー (左カラム) */}
                    <div className="w-14 sm:w-16 py-3 px-2 flex items-center justify-center text-center bg-slate-100 font-black text-slate-800 text-base font-mono border-r border-slate-200 shrink-0">
                      {row.displayHour || row.hour}
                    </div>

                    {/* 発車分グリッド */}
                    <div className="flex-1 p-2 sm:p-3 flex flex-wrap gap-1.5 sm:gap-2 items-start">
                      {departures.length === 0 ? (
                        <span className="text-slate-300 text-xs font-mono py-1 self-center">-</span>
                      ) : (
                        departures.map((dep, idx) => {
                          const conf = getTrainTypeConfig(dep.type, station.lineId, dep.customTrainType);
                          const destLen = dep.destination.length;
                          const destClass =
                            destLen <= 2
                              ? 'text-[10px]'
                              : destLen === 3
                              ? 'text-[9.5px] tracking-tight'
                              : destLen === 4
                              ? 'text-[8.5px] tracking-tighter'
                              : 'text-[8px] tracking-tighter';
                          return (
                            <div
                              key={idx}
                              className="group relative flex flex-col items-center cursor-default w-11 sm:w-12 shrink-0"
                              title={`${conf.name}${dep.trainName ? ` ${dep.trainName}` : ''} ${dep.destination}行 (${formatTrainNumber(dep.trainNumber, dep.tripId)})`}
                            >
                              <div
                                className="w-8 py-1 rounded text-xs font-black font-mono shadow-2xs transition-transform group-hover:scale-110 text-white text-center"
                                style={{ backgroundColor: conf.bgColor }}
                              >
                                {dep.time}
                              </div>
                              <span className={`w-full ${destClass} text-slate-500 font-sans mt-0.5 truncate text-center leading-tight`}>
                                {dep.destination}
                              </span>
                              {dep.trainName && (
                                <span
                                  className="w-full text-[8.5px] text-amber-600 font-bold font-sans tracking-tighter truncate leading-tight mt-0.5 text-center"
                                  title={dep.trainName}
                                >
                                  {dep.trainName}
                                </span>
                              )}

                              {/* ホバーツールチップ */}
                              <div className="absolute bottom-full mb-1 hidden group-hover:flex flex-col items-center z-50 whitespace-nowrap bg-slate-900 text-white text-[11px] py-1 px-2 rounded shadow-lg pointer-events-none">
                                <span className="font-bold">
                                  {conf.name} {dep.trainName ? `${dep.trainName} ` : ''}{dep.destination}行
                                </span>
                                <span className="text-[10px] text-slate-300">
                                  {row.hour}:{dep.time}発 ({formatTrainNumber(dep.trainNumber, dep.tripId)})
                                </span>
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
