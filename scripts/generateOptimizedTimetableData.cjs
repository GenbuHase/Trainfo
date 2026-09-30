const fs = require('fs');

const rawData = JSON.parse(fs.readFileSync('scripts/ekitan_all_stations_timetables.json', 'utf8'));

// 駅名とID
const STATIONS = [
  { id: 'TJ-01', number: 1, name: '池袋' },
  { id: 'TJ-02', number: 2, name: '北池袋' },
  { id: 'TJ-03', number: 3, name: '下板橋' },
  { id: 'TJ-04', number: 4, name: '大山' },
  { id: 'TJ-05', number: 5, name: '中板橋' },
  { id: 'TJ-06', number: 6, name: 'ときわ台' },
  { id: 'TJ-07', number: 7, name: '上板橋' },
  { id: 'TJ-08', number: 8, name: '東武練馬' },
  { id: 'TJ-09', number: 9, name: '下赤塚' },
  { id: 'TJ-10', number: 10, name: '成増' },
  { id: 'TJ-11', number: 11, name: '和光市' },
  { id: 'TJ-12', number: 12, name: '朝霞' },
  { id: 'TJ-13', number: 13, name: '朝霞台' },
  { id: 'TJ-14', number: 14, name: '志木' },
  { id: 'TJ-15', number: 15, name: '柳瀬川' },
  { id: 'TJ-16', number: 16, name: 'みずほ台' },
  { id: 'TJ-17', number: 17, name: '鶴瀬' },
  { id: 'TJ-18', number: 18, name: 'ふじみ野' },
  { id: 'TJ-19', number: 19, name: '上福岡' },
  { id: 'TJ-20', number: 20, name: '新河岸' },
  { id: 'TJ-21', number: 21, name: '川越' },
  { id: 'TJ-22', number: 22, name: '川越市' },
  { id: 'TJ-23', number: 23, name: '霞ヶ関' },
  { id: 'TJ-24', number: 24, name: '鶴ヶ島' },
  { id: 'TJ-25', number: 25, name: '若葉' },
  { id: 'TJ-26', number: 26, name: '坂戸' },
  { id: 'TJ-27', number: 27, name: '北坂戸' },
  { id: 'TJ-28', number: 28, name: '高坂' },
  { id: 'TJ-29', number: 29, name: '東松山' },
  { id: 'TJ-30', number: 30, name: '森林公園' },
  { id: 'TJ-31', number: 31, name: 'つきのわ' },
  { id: 'TJ-32', number: 32, name: '武蔵嵐山' },
  { id: 'TJ-33', number: 33, name: '小川町' },
  { id: 'TJ-34', number: 34, name: '東武竹沢' },
  { id: 'TJ-35', number: 35, name: 'みなみ寄居' },
  { id: 'TJ-36', number: 36, name: '男衾' },
  { id: 'TJ-37', number: 37, name: '鉢形' },
  { id: 'TJ-38', number: 38, name: '玉淀' },
  { id: 'TJ-39', number: 39, name: '寄居' },
];

const STATION_MAP = new Map(STATIONS.map(s => [s.id, s]));
const NAME_TO_STATION_ID = new Map(STATIONS.map(s => [s.name, s.id]));
NAME_TO_STATION_ID.set('森林公園(埼玉)', 'TJ-30');
NAME_TO_STATION_ID.set('小川町(埼玉)', 'TJ-33');
NAME_TO_STATION_ID.set('坂戸(埼玉)', 'TJ-26');
NAME_TO_STATION_ID.set('大山(東京)', 'TJ-04');
NAME_TO_STATION_ID.set('ときわ台(東京)', 'TJ-06');
NAME_TO_STATION_ID.set('霞ケ関(埼玉)', 'TJ-23');
NAME_TO_STATION_ID.set('鶴ケ島', 'TJ-24');

// 停車駅判定（現行2023年3月ダイヤ改正準拠）
function doesTrainStopAt(type, stNum) {
  if (type === 'local') return true;
  // 準急: 池袋(1)、上板橋(7)、成増(10)以北各駅停車
  if (type === 'semiExp') return stNum === 1 || stNum === 7 || stNum >= 10;
  // 急行: 池袋(1)、成増(10)、和光市(11)、朝霞(12)、朝霞台(13)、志木(14)、ふじみ野(18)、川越(21)、川越市(22)以北各駅停車
  if (type === 'express') {
    return stNum === 1 || stNum === 10 || stNum === 11 || stNum === 12 || stNum === 13 || stNum === 14 || stNum === 18 || stNum >= 21;
  }
  // 快速急行: 池袋(1)、和光市(11)、朝霞台(13)、川越(21)、川越市(22)以北各駅停車
  if (type === 'rapidExp') {
    return stNum === 1 || stNum === 11 || stNum === 13 || stNum >= 21;
  }
  // 川越特急: 池袋(1)、朝霞台(13)、川越(21)、川越市(22)、坂戸(26)、東松山(29)以北各駅停車
  if (type === 'kawagoeExp') {
    return stNum === 1 || stNum === 13 || stNum === 21 || stNum === 22 || stNum === 26 || stNum >= 29;
  }
  // TJライナー: 池袋(1)、ふじみ野(18)、川越(21)、川越市(22)、坂戸(26)、東松山(29)以北各駅停車
  if (type === 'tjLiner') {
    return stNum === 1 || stNum === 18 || stNum === 21 || stNum === 22 || stNum === 26 || stNum >= 29;
  }
  return true;
}

function secondsToTimeString(sec) {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

// 駅間標準所要時間 (秒)
function getHopSeconds(fromNum, toNum, isPassing) {
  const diff = Math.abs(toNum - fromNum);
  if (isPassing) return diff * 62;
  return diff * 105;
}

// 1. 各駅時刻表のコンパクト構造作成
const stationTimetables = {
  weekday: {},
  holiday: {}
};

for (const dayType of ['weekday', 'holiday']) {
  for (const st of STATIONS) {
    const rawSt = rawData[dayType]?.[st.id] || { inbound: [], outbound: [] };
    stationTimetables[dayType][st.id] = {
      inbound: rawSt.inbound.map(d => ({
        h: d.hour,
        m: d.minute,
        time: `${d.minute < 10 ? '0' : ''}${d.minute}`,
        t: d.type,
        d: d.destination,
        no: d.trainNo,
        sec: d.hour * 3600 + d.minute * 60
      })),
      outbound: rawSt.outbound.map(d => ({
        h: d.hour,
        m: d.minute,
        time: `${d.minute < 10 ? '0' : ''}${d.minute}`,
        t: d.type,
        d: d.destination,
        no: d.trainNo,
        sec: d.hour * 3600 + d.minute * 60
      }))
    };
  }
}

// JSONファイルとして保存
fs.writeFileSync('src/data/stationTimetables.json', JSON.stringify(stationTimetables), 'utf8');
console.log('src/data/stationTimetables.json written.');

// 2. 走行シミュレーション用 GLOBAL_TIMETABLE の構築（重複便の完全排除＆Track & Merge）
const allTrips = [];
const seenTripIds = new Set();

// 下りの始発駅候補（上流順: TJ-01 -> TJ-33）
const OUT_ORIGINS = ['TJ-01', 'TJ-11', 'TJ-14', 'TJ-22', 'TJ-26', 'TJ-30', 'TJ-33'];
// 上りの始発駅候補（上流順: TJ-39 -> TJ-10）
const IN_ORIGINS = ['TJ-39', 'TJ-33', 'TJ-30', 'TJ-26', 'TJ-22', 'TJ-14', 'TJ-11', 'TJ-10'];

const ST_NUM = {};
for (let i = 1; i <= 39; i++) {
  ST_NUM[`TJ-${i < 10 ? '0' : ''}${i}`] = i;
}

for (const dayType of ['weekday', 'holiday']) {
  const isHoliday = dayType === 'holiday';

  // 下り処理
  const stationScheduleOut = {};
  for (let i = 1; i <= 39; i++) stationScheduleOut[`TJ-${i < 10 ? '0' : ''}${i}`] = [];

  for (const stId of OUT_ORIGINS) {
    const deps = stationTimetables[dayType][stId]?.outbound || [];
    const originNum = ST_NUM[stId];

    for (const dep of deps) {
      // 既存列車がこの駅を通過・停車する時刻と一致するか照合
      const existing = stationScheduleOut[stId];
      const match = existing.find(sched => {
        if (dep.no && sched.trainNo && dep.no === sched.trainNo) return true;
        const timeDiff = Math.abs(sched.sec - dep.sec);
        if (timeDiff <= 180 && sched.type === dep.t) {
          if (sched.dest === dep.d || sched.dest.includes(dep.d) || dep.d.includes(sched.dest)) {
            return true;
          }
        }
        return false;
      });

      if (match) continue; // 先行駅始発の重複便をスキップ

      let destId = NAME_TO_STATION_ID.get(dep.d);
      if (!destId) {
        if (dep.d.includes('川越')) destId = 'TJ-22';
        else if (dep.d.includes('森林')) destId = 'TJ-30';
        else if (dep.d.includes('小川')) destId = 'TJ-33';
        else if (dep.d.includes('寄居')) destId = 'TJ-39';
        else if (dep.d.includes('志木')) destId = 'TJ-14';
        else if (dep.d.includes('成増')) destId = 'TJ-10';
        else destId = 'TJ-30';
      }

      const destNum = STATION_MAP.get(destId)?.number || 30;
      if (destNum <= originNum) continue;

      const hhmm = `${dep.h.toString().padStart(2, '0')}${dep.m.toString().padStart(2, '0')}`;
      const tripId = `${isHoliday ? 'HOL' : 'WD'}_OUT_${stId}_${hhmm}_${dep.no}`;
      if (seenTripIds.has(tripId)) continue;
      seenTripIds.add(tripId);

      const count = destNum - originNum + 1;
      let currentSec = dep.sec;
      const stops = [];

      for (let i = 0; i < count; i++) {
        const curNum = originNum + i;
        const curStId = `TJ-${curNum < 10 ? '0' : ''}${curNum}`;
        const isOrigin = i === 0;
        const isDest = i === count - 1;
        const stopsHere = doesTrainStopAt(dep.t, curNum);

        let arrSec = currentSec;
        let depSec = currentSec;

        if (!isOrigin) {
          const prevNum = originNum + (i - 1);
          const hop = getHopSeconds(prevNum, curNum, !stopsHere);
          arrSec = currentSec + hop;
        }

        if (stopsHere) {
          const dwell = isOrigin || isDest ? 60 : [1, 10, 11, 12, 13, 14, 18, 21, 22, 26, 30, 33].includes(curNum) ? 45 : 30;
          depSec = isDest ? arrSec : arrSec + dwell;
          currentSec = depSec;
        } else {
          depSec = arrSec;
          currentSec = arrSec;
        }

        stops.push({
          stationId: curStId,
          arrivalTime: secondsToTimeString(arrSec),
          departureTime: secondsToTimeString(depSec),
          isPassing: !stopsHere && !isOrigin && !isDest
        });

        // 通過予定時刻を記録して下流駅での重複を防ぐ
        stationScheduleOut[curStId].push({
          sec: depSec,
          trainNo: dep.no,
          type: dep.t,
          dest: dep.d
        });
      }

      const isOneMan = originNum >= 33 && destNum >= 33;
      const cars = isOneMan ? 4 : 10;

      allTrips.push({
        tripId,
        trainNumber: dep.no,
        trainType: dep.t,
        direction: 'outbound',
        originStationId: stId,
        destinationStationId: destId,
        customDestination: dep.d,
        cars,
        isHoliday,
        stops
      });
    }
  }

  // 上り処理
  const stationScheduleIn = {};
  for (let i = 1; i <= 39; i++) stationScheduleIn[`TJ-${i < 10 ? '0' : ''}${i}`] = [];

  for (const stId of IN_ORIGINS) {
    const deps = stationTimetables[dayType][stId]?.inbound || [];
    const originNum = ST_NUM[stId];

    for (const dep of deps) {
      // 既存列車がこの駅を通過・停車する時刻と一致するか照合
      const existing = stationScheduleIn[stId];
      const match = existing.find(sched => {
        if (dep.no && sched.trainNo && dep.no === sched.trainNo) return true;
        const timeDiff = Math.abs(sched.sec - dep.sec);
        if (timeDiff <= 180 && sched.type === dep.t) {
          if (sched.dest === dep.d || sched.dest.includes(dep.d) || dep.d.includes(sched.dest)) {
            return true;
          }
        }
        return false;
      });

      if (match) continue; // 先行駅始発の重複便をスキップ

      let destId = NAME_TO_STATION_ID.get(dep.d);
      if (!destId) {
        if (dep.d.includes('小川')) destId = 'TJ-33';
        else if (dep.d.includes('元町') || dep.d.includes('新木場') || dep.d.includes('湘南') || dep.d.includes('武蔵小杉') || dep.d.includes('渋谷') || dep.d.includes('新宿')) {
          destId = 'TJ-11';
        } else {
          destId = 'TJ-01';
        }
      }

      const destNum = STATION_MAP.get(destId)?.number || 1;
      if (destNum >= originNum) continue;

      const hhmm = `${dep.h.toString().padStart(2, '0')}${dep.m.toString().padStart(2, '0')}`;
      const tripId = `${isHoliday ? 'HOL' : 'WD'}_INB_${stId}_${hhmm}_${dep.no}`;
      if (seenTripIds.has(tripId)) continue;
      seenTripIds.add(tripId);

      const count = originNum - destNum + 1;
      let currentSec = dep.sec;
      const stops = [];

      for (let i = 0; i < count; i++) {
        const curNum = originNum - i;
        const curStId = `TJ-${curNum < 10 ? '0' : ''}${curNum}`;
        const isOrigin = i === 0;
        const isDest = i === count - 1;
        const stopsHere = doesTrainStopAt(dep.t, curNum);

        let arrSec = currentSec;
        let depSec = currentSec;

        if (!isOrigin) {
          const prevNum = originNum - (i - 1);
          const hop = getHopSeconds(prevNum, curNum, !stopsHere);
          arrSec = currentSec + hop;
        }

        if (stopsHere) {
          const dwell = isOrigin || isDest ? 60 : [1, 10, 11, 12, 13, 14, 18, 21, 22, 26, 30, 33].includes(curNum) ? 45 : 30;
          depSec = isDest ? arrSec : arrSec + dwell;
          currentSec = depSec;
        } else {
          depSec = arrSec;
          currentSec = arrSec;
        }

        stops.push({
          stationId: curStId,
          arrivalTime: secondsToTimeString(arrSec),
          departureTime: secondsToTimeString(depSec),
          isPassing: !stopsHere && !isOrigin && !isDest
        });

        // 通過予定時刻を記録して下流駅での重複を防ぐ
        stationScheduleIn[curStId].push({
          sec: depSec,
          trainNo: dep.no,
          type: dep.t,
          dest: dep.d
        });
      }

      const isOneMan = originNum >= 33 && destNum >= 33;
      const cars = isOneMan ? 4 : 10;

      allTrips.push({
        tripId,
        trainNumber: dep.no,
        trainType: dep.t,
        direction: 'inbound',
        originStationId: stId,
        destinationStationId: destId,
        customDestination: dep.d,
        cars,
        isHoliday,
        stops
      });
    }
  }
}

// JSONファイルとして保存
fs.writeFileSync('src/data/globalTimetable.json', JSON.stringify(allTrips), 'utf8');
console.log(`src/data/globalTimetable.json written with ${allTrips.length} trips.`);

// 3. src/data/timetableData.ts を出力（JSONを直接読み込み型安全にexport）
const fileContent = `import type { TimetableTrip, TrainTypeKey, Direction } from '../types';
import { STATION_MAP } from './stations';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

// 時間文字列 (HH:MM:SS) を一日の秒数 (0〜86399) に変換
export function timeStringToSeconds(t: string): number {
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + (s || 0);
}

// 秒数から時間文字列 (HH:MM:SS) に変換
export function secondsToTimeString(sec: number): string {
  const norm = (Math.floor(sec) + 86400 * 2) % 86400;
  const h = Math.floor(norm / 3600).toString().padStart(2, '0');
  const m = Math.floor((norm % 3600) / 60).toString().padStart(2, '0');
  const s = (norm % 60).toString().padStart(2, '0');
  return \`\${h}:\${m}:\${s}\`;
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
    const valid = deps.filter(d => d.sec >= currentTimeSec - 180 && d.sec <= currentTimeSec + 7200);
    valid.sort((a, b) => a.sec - b.sec);

    return valid.slice(0, limit).map((d, idx) => {
      const destSt = Array.from(STATION_MAP.values()).find(s => s.name === d.d);
      const destId = destSt ? destSt.id : direction === 'outbound' ? 'TJ-33' : 'TJ-01';
      const depTime = \`\${d.h.toString().padStart(2, '0')}:\${d.m.toString().padStart(2, '0')}:00\`;

      return {
        tripId: \`DEP_\${stationId}_\${direction}_\${d.h}_\${d.m}_\${idx}\`,
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
    hourly.push({ hour: h, inbound: [], outbound: [] });
  }

  for (const dep of stData.inbound) {
    const target = hourly.find(item => item.hour === dep.h);
    if (target) {
      target.inbound.push({
        time: dep.time,
        tripId: \`IN_\${stationId}_\${dep.h}_\${dep.m}_\${dep.no}\`,
        trainNumber: dep.no,
        type: dep.t,
        destination: dep.d
      });
    }
  }

  for (const dep of stData.outbound) {
    const target = hourly.find(item => item.hour === dep.h);
    if (target) {
      target.outbound.push({
        time: dep.time,
        tripId: \`OUT_\${stationId}_\${dep.h}_\${dep.m}_\${dep.no}\`,
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
`;

fs.writeFileSync('src/data/timetableData.ts', fileContent, 'utf8');
console.log('src/data/timetableData.ts generated cleanly!');
