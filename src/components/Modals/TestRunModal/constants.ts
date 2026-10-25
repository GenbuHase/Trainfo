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
