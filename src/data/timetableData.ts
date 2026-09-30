import type { TimetableTrip, TrainTypeKey, Direction } from '../types';
import { STATION_MAP } from './stations';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

// 時間文字列 (HH:MM:SS) を一日の秒数に変換（深夜0〜3時は翌日24〜27時として扱う）
export function timeStringToSeconds(t: string): number {
  const [h, m, s] = t.split(':').map(Number);
  const normalizedHour = h < 4 ? h + 24 : h;
  return normalizedHour * 3600 + m * 60 + (s || 0);
}

// 秒数から時間文字列 (HH:MM:SS) に変換
export function secondsToTimeString(sec: number): string {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// 列車番号の表示用フォーマッター (例: 'WD_INB_TJ-33_1534_1044レ' -> '1044レ')
export function formatTrainNumber(trainNumber?: string, tripId?: string): string {
  if (trainNumber && !trainNumber.includes('_')) return trainNumber;
  const target = tripId || trainNumber || '';
  if (target.includes('_')) {
    const parts = target.split('_');
    return parts[parts.length - 1];
  }
  return target;
}

// 駅探公式 全39駅時刻表データ（平日・土休日、上下線全便）
export interface RawStationDeparture {
  h: number;
  m: number;
  time: string;
  t: TrainTypeKey;
  d: string;
  no: string;
  sec: number;
}

export type StationTimetableStore = {
  [day in 'weekday' | 'holiday']: {
    [stationId: string]: {
      inbound: RawStationDeparture[];
      outbound: RawStationDeparture[];
    };
  };
};

export const STATION_TIMETABLES = rawStationTimetables as unknown as StationTimetableStore;

// 列車シミュレーション用リアルタイムダイヤ
export const GLOBAL_TIMETABLE: TimetableTrip[] = rawGlobalTimetable as unknown as TimetableTrip[];

// 特定駅の時刻表一覧（直近の発車情報）を取得（駅探公式データ直接参照）
export function getStationDepartures(
  stationId: string,
  currentTimeSec: number,
  isHoliday: boolean,
  limit: number = 6
): { inbound: TimetableTrip[]; outbound: TimetableTrip[] } {
  const dayKey = isHoliday ? 'holiday' : 'weekday';
  const stData = STATION_TIMETABLES[dayKey]?.[stationId] || { inbound: [], outbound: [] };

  function convertToTrips(deps: RawStationDeparture[], direction: Direction): TimetableTrip[] {
    const valid = deps.filter((d) => {
      let sec = d.sec;
      if (d.h === 0 && currentTimeSec >= 20 * 3600) {
        sec += 86400;
      }
      return sec >= currentTimeSec - 180 && sec <= currentTimeSec + 7200;
    });
    valid.sort((a, b) => {
      const secA = a.h === 0 && currentTimeSec >= 20 * 3600 ? a.sec + 86400 : a.sec;
      const secB = b.h === 0 && currentTimeSec >= 20 * 3600 ? b.sec + 86400 : b.sec;
      return secA - secB;
    });

    return valid.slice(0, limit).map((d, idx) => {
      const destSt = Array.from(STATION_MAP.values()).find(s => s.name === d.d);
      const destId = destSt ? destSt.id : direction === 'outbound' ? 'TJ-33' : 'TJ-01';
      const depTime = `${d.h.toString().padStart(2, '0')}:${d.m.toString().padStart(2, '0')}:00`;

      return {
        tripId: `DEP_${stationId}_${direction}_${d.h}_${d.m}_${idx}`,
        trainNumber: d.no,
        trainType: d.t,
        direction,
        originStationId: stationId,
        destinationStationId: destId,
        customDestination: d.d,
        cars: 10,
        isHoliday,
        stops: [
          {
            stationId,
            arrivalTime: depTime,
            departureTime: depTime,
            isPassing: false
          }
        ]
      };
    });
  }

  return {
    inbound: convertToTrips(stData.inbound, 'inbound'),
    outbound: convertToTrips(stData.outbound, 'outbound')
  };
}

// 特定駅の全日時刻表（1時間ごと）を取得（駅探公式データ直接参照）
export interface HourlyStationTimetable {
  hour: number;
  displayHour: string;
  inbound: { time: string; tripId: string; trainNumber: string; type: TrainTypeKey; destination: string }[];
  outbound: { time: string; tripId: string; trainNumber: string; type: TrainTypeKey; destination: string }[];
}

export function getFullDayStationTimetable(
  stationId: string,
  isHoliday: boolean
): HourlyStationTimetable[] {
  const dayKey = isHoliday ? 'holiday' : 'weekday';
  const stData = STATION_TIMETABLES[dayKey]?.[stationId] || { inbound: [], outbound: [] };

  const hourly: HourlyStationTimetable[] = [];
  for (let h = 4; h <= 24; h++) {
    hourly.push({
      hour: h,
      displayHour: h === 24 ? '24' : String(h),
      inbound: [],
      outbound: []
    });
  }

  for (const dep of stData.inbound) {
    const targetHour = dep.h === 0 ? 24 : dep.h;
    const target = hourly.find(item => item.hour === targetHour);
    if (target) {
      target.inbound.push({
        time: dep.time,
        tripId: `IN_${stationId}_${dep.h}_${dep.m}_${dep.no}`,
        trainNumber: dep.no,
        type: dep.t,
        destination: dep.d
      });
    }
  }

  for (const dep of stData.outbound) {
    const targetHour = dep.h === 0 ? 24 : dep.h;
    const target = hourly.find(item => item.hour === targetHour);
    if (target) {
      target.outbound.push({
        time: dep.time,
        tripId: `OUT_${stationId}_${dep.h}_${dep.m}_${dep.no}`,
        trainNumber: dep.no,
        type: dep.t,
        destination: dep.d
      });
    }
  }

  for (const item of hourly) {
    item.inbound.sort((a, b) => Number(a.time) - Number(b.time));
    item.outbound.sort((a, b) => Number(a.time) - Number(b.time));
  }

  return hourly;
}
