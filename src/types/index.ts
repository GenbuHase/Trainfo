// 東武東上線 Trainfo 型定義ファイル

export type TrainTypeKey = 'local' | 'semiExp' | 'express' | 'rapidExp' | 'kawagoeExp' | 'tjLiner';

export interface TrainTypeConfig {
  key: TrainTypeKey;
  name: string;        // 例: '急行'
  nameEn: string;      // 例: 'Express'
  shortName: string;   // 例: '急'
  color: string;       // HEX
  textColor: string;   // HEX
  bgColor: string;     // HEX
  borderColor: string;
}

export interface Station {
  id: string;          // 例: 'TJ-01'
  number: number;      // 1 〜 39
  name: string;        // '池袋'
  nameKana: string;    // 'いけぶくろ'
  nameEn: string;      // 'Ikebukuro'
  lat: number;
  lng: number;
  transfers: string[]; // 乗り換え路線
  address: string;
  facilities: {
    elevator: boolean;
    restroom: boolean;
    multipurposeToilet: boolean;
    waitingRoom: boolean;
    ticketOffice: boolean;
  };
  // 各種別の停車有無
  stoppingTypes: TrainTypeKey[];
  platforms: {
    inbound: string;  // 上りホーム番線 (例: '1・2番線')
    outbound: string; // 下りホーム番線 (例: '3・4番線')
  };
}

export type Direction = 'inbound' | 'outbound'; // inbound = 上り(池袋方面), outbound = 下り(寄居方面)

export interface StationStopTime {
  stationId: string;
  arrivalTime: string;   // 'HH:MM:SS'
  departureTime: string; // 'HH:MM:SS'
  isPassing?: boolean;   // 通過駅の場合 true
}

export interface TimetableTrip {
  tripId: string;         // 一意の内部識別ID (例: 'WD_OUT_TJ-01_0530_1001レ')
  trainNumber?: string;   // 列車番号 (例: '1001レ', '1044レ')
  trainType: TrainTypeKey;
  direction: Direction;
  originStationId: string;
  destinationStationId: string;
  customDestination?: string; // 直通列車の行先名 (例: 元町・中華街, 新木場)
  cars: number;           // 10両, 8両, 4両
  isHoliday: boolean;     // 平日 / 土休日
  stops: StationStopTime[];
}

export type TrainStatus = 'RUNNING' | 'STOPPING' | 'TERMINATED';

export interface ActiveTrain {
  tripId: string;
  trainNumber?: string;   // 列車番号 (例: '1001レ', '1044レ')
  trainType: TrainTypeKey;
  direction: Direction;
  originStationId: string;
  destinationStationId: string;
  customDestination?: string;
  cars: number;
  status: TrainStatus;
  currentLat: number;
  currentLng: number;
  heading: number; // 進行方向 (度数: 0〜360)
  currentStationId?: string; // 停車中の駅、または直前の駅
  nextStationId: string;     // 次の停車駅または次の通過駅
  nextStopStationId: string; // 次の停車駅
  progressPercent: number;   // 駅間の進捗率 (0.0 〜 1.0)
  speedKmh: number;          // 想定時速 (km/h)
  delayMinutes: number;      // 遅延時間(分)
  departureTime: string;     // 現駅発車時刻または直前駅発車時刻
  arrivalTimeNext: string;   // 次駅到着予定時刻
  stops: StationStopTime[];
}

export interface DepartureInfo {
  tripId: string;
  trainType: TrainTypeKey;
  destination: string;
  departureTime: string;
  platform: string;
  cars: number;
  delayMinutes: number;
  statusText: string; // '定刻', '3分遅れ', '当駅停車中', 'まもなく発車'
  minutesUntil: number; // あと何分
}
