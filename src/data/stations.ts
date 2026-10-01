import type { Station, LineId } from '../types';
import { getCombinedStations } from './linesRegistry';

// 全登録路線の統合駅一覧（静的アクセス互換用）
export const STATIONS: Station[] = getCombinedStations();

export const STATION_MAP = new Map<string, Station>(
  STATIONS.map((s) => [s.id, s])
);

export const STATION_BY_NAME = new Map<string, Station>(
  STATIONS.map((s) => [s.name, s])
);

// 路線ID指定で駅一覧を取得するヘルパー関数
export function getStations(selectedLineIds?: LineId[]): Station[] {
  return getCombinedStations(selectedLineIds);
}

// 路線ID指定で駅Mapを取得するヘルパー関数
export function getStationMap(selectedLineIds?: LineId[]): Map<string, Station> {
  const stations = getCombinedStations(selectedLineIds);
  return new Map(stations.map((s) => [s.id, s]));
}
