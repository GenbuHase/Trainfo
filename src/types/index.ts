// Trainfo 共通型定義ファイル

// 路線ID型（将来の路線追加に開かれた拡張型）
export type LineId = 'tojo' | 'saikyo' | 'musashino' | 'tsukuba_express' | 'chuo' | 'chuo_main' | (string & {});

// 列車種別キー（東上線＋埼京線＋武蔵野線＋つくばエクスプレス＋中央線＋汎用）
export type TrainTypeKey =
  | 'local'                   // 普通 / 各駅停車
  | 'regular'                 // 普通（むさしの号・しもうさ号等）
  | 'semiExp'                 // 準急
  | 'express'                 // 急行
  | 'rapid'                   // 快速（埼京線、つくばエクスプレス、中央線等）
  | 'commuter'                // 通勤快速（埼京線、中央線等）
  | 'semi_rapid'              // 区間快速（つくばエクスプレス等）
  | 'commuter_rapid'          // 通勤快速（つくばエクスプレス等）
  | 'special_rapid'           // 特別快速（中央線等）
  | 'chuo_special_rapid'      // 中央特快（中央線）
  | 'ome_special_rapid'       // 青梅特快（中央線）
  | 'commuter_special_rapid'  // 通勤特快（中央線）
  | 'limitedExp'              // 特急（あずさ・かいじ・富士回遊等）
  | 'rapidExp'                // 快速急行
  | 'kawagoeExp'              // 川越特急
  | 'tjLiner'                 // TJライナー
  | (string & {});

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

export interface StationFacilities {
  elevator: boolean;
  restroom: boolean;
  multipurposeToilet: boolean;
  waitingRoom: boolean;
  ticketOffice: boolean;
}

export interface Station {
  id: string;          // 例: 'TJ-01', 'JA-12'
  lineId: LineId;      // 所属路線 ('tojo', 'saikyo' 等)
  number: number;      // ナンバリング番号
  name: string;        // '池袋'
  nameKana: string;    // 'いけぶくろ'
  nameEn: string;      // 'Ikebukuro'
  lat: number;
  lng: number;
  transfers: string[]; // 乗り換え路線
  address: string;
  facilities: StationFacilities;
  stoppingTypes: TrainTypeKey[]; // 各種別の停車有無
  isMajor?: boolean;   // 広域ズーム時にも表示する主要駅フラグ
  platforms: {
    inbound: string;  // 上りホーム番線 (例: '1・2番線')
    outbound: string; // 下りホーム番線 (例: '3・4番線')
  };
}

export type Direction = 'inbound' | 'outbound'; // inbound = 上り, outbound = 下り

export interface StationStopTime {
  stationId: string;
  arrivalTime: string;   // 'HH:MM:SS'
  departureTime: string; // 'HH:MM:SS'
  isPassing?: boolean;   // 通過駅の場合 true
}

export interface TimetableTrip {
  tripId: string;         // 一意の内部識別ID
  lineId: LineId;         // 所属路線
  trainNumber?: string;   // 列車番号 (例: '1001レ', '1044K')
  trainType: TrainTypeKey;
  direction: Direction;
  originStationId: string;
  destinationStationId: string;
  customOrigin?: string;      // 直通列車の本来の始発駅名 (例: 新宿, 東京, 松本)
  customDestination?: string; // 直通列車の行先名 (例: 元町・中華街, 新木場, 海老名)
  throughTripId?: string;     // 直通先トリップID（境界駅で接続する他路線側のトリップID）
  throughLineId?: LineId;     // 直通先路線ID
  cars: number;           // 10両, 8両, 4両
  isHoliday: boolean;     // 平日 / 土休日
  stops: StationStopTime[];
}

export type TrainStatus = 'RUNNING' | 'STOPPING' | 'TERMINATED';

export interface ActiveTrain {
  tripId: string;
  lineId: LineId;            // 所属路線
  trainNumber?: string;      // 列車番号
  trainType: TrainTypeKey;
  direction: Direction;
  originStationId: string;
  destinationStationId: string;
  customOrigin?: string;
  customDestination?: string;
  throughTripId?: string;    // 直通先トリップID
  throughLineId?: LineId;    // 直通先路線ID
  cars: number;
  status: TrainStatus;
  currentLat: number;
  currentLng: number;
  heading: number;           // 進行方向 (度数: 0〜360)
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
  lineId: LineId;
  trainType: TrainTypeKey;
  destination: string;
  departureTime: string;
  platform: string;
  cars: number;
  delayMinutes: number;
  statusText: string;
  minutesUntil: number;
}

// 線路軌道セグメント
export interface TrackSegment {
  fromStationId: string;
  toStationId: string;
  fromName: string;
  toName: string;
  coordinates: [number, number][];
}

// 発車情報生データ
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

export interface LineDirectionNames {
  inbound: string;       // 例: '池袋方面', '新宿・大崎方面'
  outbound: string;      // 例: '森林公園・小川町・寄居方面', '大宮・川越方面'
  inboundFull: string;   // 例: '上り 池袋方面', '上り 新宿・大崎方面'
  outboundFull: string;  // 例: '下り 森林公園・小川町・寄居方面', '下り 大宮・川越方面'
  inboundShort: string;  // 例: '上り (池袋方面)', '上り (大崎方面)'
  outboundShort: string; // 例: '下り (寄居方面)', '下り (川越方面)'
}

// 路線メタデータ
export interface LineMeta {
  id: LineId;
  name: string;             // '東武東上線', 'JR埼京線・川越線'
  shortName: string;        // '東上線', '埼京線'
  operator: string;         // '東武鉄道', 'JR東日本'
  lineColor: string;        // ブランドメインカラー (例: '#001e62', '#00ac9a')
  accentColor: string;      // アクセントカラー
  defaultBounds: [[number, number], [number, number]]; // 路線全体が見渡せる初期領域 [[南緯, 西経], [北緯, 東経]]
  directionNames: LineDirectionNames;
}

// 路線定義モジュール（プラグイン単位）
export interface LineDefinition extends LineMeta {
  stations: Station[];
  trackSegments: TrackSegment[];
  trainTypes: Record<string, TrainTypeConfig>;
  stationTimetables: StationTimetableStore;
  globalTimetable: TimetableTrip[];
}


