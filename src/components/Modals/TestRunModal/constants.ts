import type { ActiveTrain, TimetableTrip } from '../../../types';

export type CreatorTab = 'route' | 'stops' | 'customize' | 'presets';

export interface RegisteredCustomChain {
  chainKey: string;
  firstTrip: TimetableTrip;
  lastTrip: TimetableTrip;
  trips: TimetableTrip[];
  liveTrain?: ActiveTrain;
  startTime: string;
  endTime: string;
  startSec: number;
}

export interface RouteSummaryInfo {
  originName: string;
  destName: string;
  depTimeStr: string;
  arrTimeStr: string;
  totalStations: number;
  stoppingStations: number;
  totalMinutes: number;
}

export const CUSTOM_TYPE_PRESETS = [
  { name: '試運転', shortName: '試', color: '#0284c7' },
  { name: '臨時', shortName: '臨', color: '#7c3aed' },
  { name: '臨時特急', shortName: '臨特', color: '#e11d48' },
  { name: '臨時急行', shortName: '臨急', color: '#ea580c' },
  { name: '団体', shortName: '団', color: '#059669' },
  { name: '回送', shortName: '回', color: '#475569' },
  { name: '検測', shortName: '検', color: '#ca8a04' },
  { name: '特別快速', shortName: '特快', color: '#2563eb' },
];

export const COLOR_SWATCHES = [
  '#0284c7', // スカイブルー (試運転標準)
  '#7c3aed', // バイオレット (臨時)
  '#e11d48', // ローズレッド (特急・急行系)
  '#ea580c', // オレンジ
  '#ca8a04', // アンバーゴールド
  '#059669', // エメラルドグリーン (準急・団体)
  '#2563eb', // ロイヤルブルー
  '#9c5e31', // メトロ副都心ブラウン
  '#1e293b', // スレートブラック (普通・回送)
];

export interface SpeedPresetGroup {
  groupName: string;
  options: { value: number; label: string }[];
}

export const SPEED_PRESET_GROUPS: SpeedPresetGroup[] = [
  {
    groupName: '在来線 低速線区',
    options: [
      { value: 30, label: '30 km/h (徐行)' },
      { value: 35, label: '35 km/h' },
      { value: 45, label: '45 km/h' },
      { value: 55, label: '55 km/h (地下鉄)' },
      { value: 65, label: '65 km/h' },
      { value: 70, label: '70 km/h' },
    ],
  },
  {
    groupName: '在来線 標準・快速',
    options: [
      { value: 75, label: '75 km/h (標準)' },
      { value: 80, label: '80 km/h' },
      { value: 85, label: '85 km/h' },
      { value: 90, label: '90 km/h' },
      { value: 95, label: '95 km/h (快速)' },
      { value: 100, label: '100 km/h' },
      { value: 105, label: '105 km/h' },
      { value: 110, label: '110 km/h (幹線)' },
    ],
  },
  {
    groupName: '在来線 特急・高速線区',
    options: [
      { value: 120, label: '120 km/h' },
      { value: 130, label: '130 km/h (特急)' },
      { value: 140, label: '140 km/h' },
      { value: 160, label: '160 km/h (スカイライナー)' },
    ],
  },
  {
    groupName: '新幹線',
    options: [
      { value: 210, label: '210 km/h (新幹線初期)' },
      { value: 240, label: '240 km/h (北陸新幹線)' },
      { value: 260, label: '260 km/h (整備新幹線)' },
      { value: 275, label: '275 km/h (東北・上越新幹線)' },
      { value: 285, label: '285 km/h (東海道新幹線)' },
      { value: 300, label: '300 km/h (山陽新幹線)' },
      { value: 320, label: '320 km/h (東北新幹線)' },
    ],
  },
];

export const ALL_SPEED_PRESET_VALUES: number[] = SPEED_PRESET_GROUPS.flatMap((g) =>
  g.options.map((o) => o.value)
);
