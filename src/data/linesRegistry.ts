import type { LineDefinition, LineId, Station, TrackSegment, TrainTypeConfig, TimetableTrip, StationTimetableStore } from '../types';
import { tojoLine } from './lines/tojo';
import { saikyoLine } from './lines/saikyo';
import { musashinoLine } from './lines/musashino';
import { tsukubaExpressLine } from './lines/tsukuba_express';
import { chuoLine } from './lines/chuo';
import { chuoMainLine } from './lines/chuo_main';
import { shinonoiLine } from './lines/shinonoi';

// 登録路線マップ（将来新しい路線を追加する場合はここに追記するだけ）
export const LINES_REGISTRY: Record<string, LineDefinition> = {
  tojo: tojoLine,
  saikyo: saikyoLine,
  musashino: musashinoLine,
  tsukuba_express: tsukubaExpressLine,
  chuo: chuoLine,
  chuo_main: chuoMainLine,
  shinonoi: shinonoiLine,
};

// 登録されている全路線の配列を取得
export function getAllLines(): LineDefinition[] {
  return Object.values(LINES_REGISTRY);
}

// 路線IDによる路線定義の取得
export function getLine(lineId: LineId): LineDefinition | undefined {
  return LINES_REGISTRY[lineId];
}

// 選択された路線（または全路線）の駅リストを取得（駅ID重複を除外してユニーク化）
export function getCombinedStations(selectedLineIds?: LineId[]): Station[] {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const seen = new Set<string>();
  const result: Station[] = [];
  for (const line of lines) {
    for (const st of line.stations) {
      if (!seen.has(st.id)) {
        seen.add(st.id);
        result.push(st);
      }
    }
  }
  return result;
}

// 選択された路線（または全路線）の線路セグメントを取得
export function getCombinedTrackSegments(selectedLineIds?: LineId[]): TrackSegment[] {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  return lines.flatMap((l) => l.trackSegments);
}

// 選択された路線（または全路線）の列車種別設定を取得
export function getCombinedTrainTypes(selectedLineIds?: LineId[]): Record<string, TrainTypeConfig> {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const combined: Record<string, TrainTypeConfig> = {};
  for (const line of lines) {
    for (const [key, conf] of Object.entries(line.trainTypes)) {
      // 共通キー（local 等）は先行路線（東上線の #1e1c1c 普通）を維持
      if (!combined[key]) {
        combined[key] = conf;
      }
      combined[`${line.id}_${key}`] = conf;
    }
  }
  return combined;
}

// 路線と種別キーから種別設定を取得（路線固有の設定を優先、未指定時は全登録路線から検索）
export function getTrainTypeConfig(type: string, lineId?: LineId): TrainTypeConfig {
  if (lineId && LINES_REGISTRY[lineId]) {
    const config = LINES_REGISTRY[lineId].trainTypes[type];
    if (config) return config;
  }
  for (const line of getAllLines()) {
    if (line.trainTypes[type]) return line.trainTypes[type];
  }
  return {
    key: type,
    name: type,
    nameEn: type,
    shortName: type,
    color: '#1e1c1c',
    textColor: '#ffffff',
    bgColor: '#1e1c1c',
    borderColor: '#4a4646',
  };
}

// 選択された路線（または全路線）のダイヤ（全列車）を取得
export function getCombinedGlobalTimetable(selectedLineIds?: LineId[]): TimetableTrip[] {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  return lines.flatMap((l) => l.globalTimetable);
}

// 選択された路線（または全路線）の各駅時刻表ストアを取得
export function getCombinedStationTimetables(selectedLineIds?: LineId[]): StationTimetableStore {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const combined: StationTimetableStore = {
    weekday: {},
    holiday: {},
  };

  for (const line of lines) {
    for (const day of ['weekday', 'holiday'] as const) {
      if (!line.stationTimetables[day]) continue;
      for (const [stId, tt] of Object.entries(line.stationTimetables[day])) {
        if (!combined[day][stId]) {
          combined[day][stId] = {
            inbound: [...(tt.inbound || [])],
            outbound: [...(tt.outbound || [])],
          };
        } else {
          // 境界駅（高尾等）で同一駅が存在する場合、重複なくマージして時刻順ソート
          const existing = combined[day][stId];
          const mergeDepartures = (curr: typeof existing.inbound, incoming: typeof existing.inbound) => {
            const seen = new Set(curr.map((d) => `${d.sec}_${d.d}_${d.no}`));
            for (const inc of incoming) {
              const key = `${inc.sec}_${inc.d}_${inc.no}`;
              if (!seen.has(key)) {
                curr.push(inc);
                seen.add(key);
              }
            }
            curr.sort((a, b) => a.sec - b.sec);
          };
          mergeDepartures(existing.inbound, tt.inbound || []);
          mergeDepartures(existing.outbound, tt.outbound || []);
        }
      }
    }
  }

  return combined;
}

// 選択された路線群のすべての駅をピッタリ包含するバウンディングボックスを計算
export function calculateBoundsForLines(selectedLineIds: LineId[]): [[number, number], [number, number]] {
  const stations = getCombinedStations(selectedLineIds);
  if (stations.length === 0) {
    // デフォルト（東京・埼玉広域）
    return [
      [35.60, 139.15],
      [36.15, 139.75],
    ];
  }

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const st of stations) {
    if (st.lat < minLat) minLat = st.lat;
    if (st.lat > maxLat) maxLat = st.lat;
    if (st.lng < minLng) minLng = st.lng;
    if (st.lng > maxLng) maxLng = st.lng;
  }

  // 余白パディング（約0.015度 = 約1.5km）
  const latPadding = 0.015;
  const lngPadding = 0.015;

  return [
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding],
  ];
}
