// Trainfo 共通型定義ファイル

export type LineId =
  | 'tojo'
  | 'ogose'
  | 'saikyo'
  | 'kawagoe'
  | 'rinkai'
  | 'hachiko'
  | 'itsukaichi'
  | 'musashino'
  | 'tsukuba_express'
  | 'chuo'
  | 'chuo_main'
  | 'shinonoi'
  | 'oito_east'
  | 'oito_west'
  | 'yurakucho'
  | 'fukutoshin'
  | 'hibiya'
  | 'marunouchi'
  | 'hanzomon'
  | 'ginza'
  | 'namboku'
  | 'tozai'
  | 'seibu_ikebukuro'
  | 'seibu_yurakucho'
  | 'ome'
  | 'chichibu'
  | 'odakyu_odawara'
  | 'odakyu_enoshima'
  | 'odakyu_tama'
  | 'tokyu_toyoko'
  | 'minatomirai'
  | 'tokyu_shin_yokohama'
  | 'sotetsu_shin_yokohama'
  | 'sotetsu_main'
  | 'sotetsu_izumino'
  | 'sotetsu_jr_direct'
  | 'chiyoda'
  | 'joban_local'
  | 'joban_rapid'
  | 'joban_toride_iwaki'
  | 'joban_iwaki_sendai'
  | 'tohoku_shinkansen'
  | 'joetsu_shinkansen'
  | 'tokaido'
  | 'tokaido_shizuoka'
  | 'takasaki'
  | 'utsunomiya'
  | 'ueno_tokyo'
  | 'shonan_shinjuku'
  | 'yokosuka'
  | 'sobu_rapid'
  | 'ito'
  | 'ryomo'
  | 'joetsu'
  | 'shinetsu_naoetsu_niigata'
  | 'shinetsu_takasaki_yokokawa'
  | 'hakushin'
  | 'uetsu_main'
  | 'tadami'
  | 'banetsu_west'
  | 'banetsu_east'
  | 'myoko_haneuma'
  | 'kita_shinano'
  | 'nihonkai_hisui'
  | 'hokuhoku'
  | 'hokuriku_shinkansen'
  | 'tobu_skytree'
  | 'tobu_isesaki'
  | 'tobu_kameido'
  | 'tobu_daishi'
  | 'tobu_sano'
  | 'tobu_koizumi'
  | 'tobu_kiryu'
  | 'tobu_nikko'
  | 'tobu_utsunomiya'
  | 'tobu_kinugawa'
  | 'tobu_urban_park'
  | 'yagan'
  | 'aizu'
  | 'yamagata_shinkansen'
  | 'akita_shinkansen'
  | 'ou_fukushima_shinjo'
  | 'ou_shinjo_omagari'
  | 'ou_omagari_akita'
  | 'ou_akita_aomori'
  | 'fujikyu'
  | 'gotemba'
  | 'izukyu'
  | 'izuhakone_sunzu'
  | 'yamanote'
  | 'keiyo'
  | 'sotobo'
  | 'sobu_main'
  | 'narita'
  | 'togane'
  | 'kururi'
  | 'chuo_sobu_local'
  | 'keihin_tohoku_negishi'
  | 'yokohama'
  | 'nambu'
  | 'tsurumi'
  | 'uchibo'
  | (string & {});



// 列車種別キー（東上線＋埼京線＋武蔵野線＋つくばエクスプレス＋中央線＋東京メトロ＋西武線＋秩父鉄道＋新幹線＋汎用）
export type TrainTypeKey =
  | 'local'                   // 普通 / 各駅停車
  | 'regular'                 // 普通（むさしの号・しもうさ号・中央本線・篠ノ井線・大糸線等）
  | 'section_semi'            // 区間準急（東武線等）
  | 'semiExp'                 // 準急
  | 'commuter_semi'           // 通勤準急（西武線等）
  | 'section_exp'             // 区間急行（東武線等）
  | 'express'                 // 急行（急行秩父路、東武線等）
  | 'commuter_exp'            // 通勤急行（副都心線、西武線等）
  | 'rapid'                   // 快速（埼京線、つくばエクスプレス、中央線、西武線、会津・野岩線等）
  | 'rapid_acty'              // 快速アクティー（東海道線）
  | 'rapid_rabbit'            // 快速ラビット（宇都宮線）
  | 'rapid_urban'             // 快速アーバン（高崎線）
  | 'commuter'                // 通勤快速（埼京線、中央線等）
  | 'semi_rapid'              // 区間快速（つくばエクスプレス、東武線等）
  | 'commuter_rapid'          // 通勤快速（つくばエクスプレス等）
  | 'special_rapid'           // 特別快速（中央線等）
  | 'chuo_special_rapid'      // 中央特快（中央線）
  | 'ome_special_rapid'       // 青梅特快（中央線）
  | 'commuter_special_rapid'  // 通勤特快（中央線）
  | 'limitedExp'              // 特急（あずさ・かいじ・スペーシア・リバティ・りょうもう・きぬ・けごん等）
  | 'commuter_ltd_exp'        // 通勤特急（東急東横線・みなとみらい線等）
  | 'ltd_exp'                 // 特急（東急東横線・みなとみらい線等）
  | 'rapidExp'                // 快速急行
  | 'kawagoeExp'              // 川越特急
  | 'tjLiner'                 // TJライナー
  | 'th_liner'                // THライナー（日比谷線・東武スカイツリーライン直通）
  | 'strain'                  // S-TRAIN（西武・メトロ・東急直通）
  | 'sl'                      // SL（パレオエクスプレス）
  | 'sl_taiju'                // SL大樹（東武鬼怒川線・日光線）
  | 'aizu_mount_exp'          // AIZUマウントエクスプレス（会津鉄道・野岩鉄道・東武線）
  | 'hayabusa'                // はやぶさ（東北新幹線）
  | 'hayate'                  // はやて（東北新幹線）
  | 'yamabiko'                // やまびこ（東北新幹線）
  | 'nasuno'                  // なすの（東北新幹線）
  | 'tsubasa'                 // つばさ（山形新幹線直通）
  | 'komachi'                 // こまち（秋田新幹線直通）
  | 'toki'                    // とき（上越新幹線）
  | 'tanigawa'                // たにがわ（上越新幹線）
  | 'kagayaki'                // かがやき（北陸新幹線）
  | 'hakutaka'                // はくたか（北陸新幹線）
  | 'asama'                   // あさま（北陸新幹線）
  | 'tsurugi'                 // つるぎ（北陸新幹線）
  | 'test_run'                // 試運転・臨時列車デフォルト
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

/**
 * 試運転・臨時列車用のカスタム種別設定
 */
export interface CustomTrainTypeConfig {
  name: string;        // 任意の種別名 (例: '試運転', '臨時', '団体', 'Fライナー急行')
  shortName?: string;  // 任意の略称 (例: '試', '臨', '団')
  color?: string;      // 任意のバッジ・ピンカラー (HEX, 例: '#0284c7')
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
  stationNumber?: string; // 公式・表示用駅ナンバリング (例: 'JU-01', 'TJ-01')。ナンバリングなし駅は未定義
  lineId: LineId;      // 所属路線 ('tojo', 'saikyo' 等)
  number: number;      // ナンバリング番号または駅順
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
  trainNumber?: string;  // この駅発車時から適用される列車番号（オプショナル）
}

/**
 * 区間別列車番号定義
 * 同一運行（Trip）内で途中で列車番号が変わる場合に使用
 */
export interface TrainNumberSection {
  trainNumber: string;    // その区間での公式列車番号 (例: '9028M', '9731M', 'E151K')
  fromStationId: string;  // 適用開始駅ID (例: 'ueno', 'TJ-11')
  toStationId?: string;   // 適用終了駅ID（省略時は次セクションまで、または終着駅）
  trainType?: TrainTypeKey; // 区間内で種別も変化する場合に指定 (例: 'rapidExp' -> 'express')
  reason?: 'DIRECTION_REVERSAL' | 'THROUGH_LINE' | 'OPERATOR_BOUNDARY';
}

/**
 * 併結運転情報
 */
export interface CouplingConfig {
  coupledTripId: string;       // 併結相手の tripId
  coupledTrainNumber: string;  // 併結相手の公式列車番号 (例: '9028M')
  coupledCars: number;         // 併結相手の車両両数 (例: 5)
  fromStationId: string;       // 併結開始駅 (例: 'atami')
  toStationId: string;         // 併結終了駅 (例: 'tokyo')
  role: 'PRIMARY' | 'SECONDARY'; // 主編成（親）または従属編成（子）
  coupledDestination?: string; // 併結相手の行先名 (例: '長瀞')
}

export interface TimetableTrip {
  tripId: string;         // 一意の内部識別ID
  lineId: LineId;         // 所属路線
  trainId?: string;       // データソース内部の列車識別ID (例: '113841', '42765')
  trainNumber?: string;   // 鉄道公式の列車番号 (代表値 / 始発駅発車時) (例: '1001レ', '1044K')
  trainNumberSections?: TrainNumberSection[]; // 区間別列車番号リスト
  coupling?: CouplingConfig;                  // 併結運転設定
  trainType: TrainTypeKey;
  customTrainType?: CustomTrainTypeConfig;    // カスタム種別名・カラー設定
  trainName?: string;         // 列車名・愛称・号数 (例: 'あずさ9号', 'DLばんえつ物語', 'ひたち1号')
  isTestTrain?: boolean;      // 試運転・臨時列車クリエイターによる生成フラグ
  direction: Direction;
  originStationId: string;
  destinationStationId: string;
  customOrigin?: string;      // 直通列車の本来の始発駅名 (例: 新宿, 東京, 松本)
  customDestination?: string; // 直通列車の行先名 (例: 元町・中華街, 新木場, 海老名)
  throughTripId?: string;     // 直通先トリップID（境界駅で接続する他路線側のトリップID）
  throughLineId?: LineId;     // 直通先路線ID
  prevTripId?: string;        // 直通元トリップID
  prevLineId?: LineId;        // 直通元路線ID
  cars: number;           // 10両, 8両, 4両
  isHoliday: boolean;     // 平日 / 土休日
  stops: StationStopTime[];
}

export type TrainStatus = 'RUNNING' | 'STOPPING' | 'TERMINATED';

export interface ActiveTrain {
  tripId: string;
  lineId: LineId;            // 所属路線
  trainId?: string;          // 内部ID
  trainNumber?: string;      // 現在走行区間の公式列車番号（併結時は '8078M + 9028M'）
  trainName?: string;        // 列車名・愛称・号数 (例: 'あずさ9号', 'DLばんえつ物語')
  trainNumberSections?: TrainNumberSection[];
  coupling?: CouplingConfig;
  isCoupledActive?: boolean; // 現在併結状態で走行中か
  totalCars?: number;        // 併結時の合計両数 (例: 14両)
  trainType: TrainTypeKey;
  customTrainType?: CustomTrainTypeConfig;
  isTestTrain?: boolean;
  direction: Direction;
  originStationId: string;
  destinationStationId: string;
  customOrigin?: string;
  customDestination?: string;
  throughTripId?: string;    // 直通先トリップID
  throughLineId?: LineId;    // 直通先路線ID
  prevTripId?: string;       // 直通元トリップID
  prevLineId?: LineId;       // 直通元路線ID
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
  customTrainType?: CustomTrainTypeConfig;
  trainName?: string;
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
  id?: string;
  segmentId?: string;
  fromStationId: string;
  toStationId: string;
  fromName?: string;
  toName?: string;
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
  tripId?: string;
  trainName?: string;
  customTrainType?: CustomTrainTypeConfig;
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
  defaultCars?: number;     // 路線の標準両数 (例: 10, 6, 4, 3)
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

/**
 * 直通運転連結タイムライン用の駅停車情報
 */
export interface ThroughChainStop {
  stationId: string;
  stationName: string;
  stationNumber?: string;
  lineId: LineId;
  lineName: string;
  lineShortName: string;
  lineColor: string;
  arrivalTime: string;
  departureTime: string;
  isPassing: boolean;
  tripId: string;
  trainType: TrainTypeKey;
  customTrainType?: CustomTrainTypeConfig;
  trainNumber?: string;
  trainName?: string;
  isBoundary?: boolean;
  boundaryInfo?: {
    prevLineId: LineId;
    nextLineId: LineId;
    prevLineName: string;
    nextLineName: string;
    prevTrainType?: TrainTypeKey;
    nextTrainType?: TrainTypeKey;
    prevCustomTrainType?: CustomTrainTypeConfig;
    nextCustomTrainType?: CustomTrainTypeConfig;
    prevTrainNumber?: string;
    nextTrainNumber?: string;
  };
  trainNumberChange?: string;
  couplingStart?: boolean;
  couplingEnd?: boolean;
}

/**
 * 列車詳細における直通運行チェーン全体のサマリー
 */
export interface ThroughChainSummary {
  trips: TimetableTrip[];
  stops: ThroughChainStop[];
  lines: {
    lineId: LineId;
    name: string;
    shortName: string;
    lineColor: string;
    initialTrainType: TrainTypeKey;
    initialCustomTrainType?: CustomTrainTypeConfig;
    initialTrainNumber?: string;
  }[];
  hasMultipleLines: boolean;
}
