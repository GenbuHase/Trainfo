// 統合実軌道ジオメトリデータ＆補間計算エンジン
import type { TrackSegment, LineId } from '../types';
import { getCombinedTrackSegments, getCombinedStations } from './linesRegistry';

// 全登録路線の統合線路セグメント（静的アクセス互換用）
export const STATION_TRACK_SEGMENTS: TrackSegment[] = getCombinedTrackSegments();

// 全線の連続座標リスト（地図描画ポリライン用・互換用）
export const ENTIRE_LINE_COORDINATES: [number, number][] = (() => {
  const coords: [number, number][] = [];
  STATION_TRACK_SEGMENTS.forEach((seg, index) => {
    if (index === 0) {
      coords.push(...seg.coordinates);
    } else {
      coords.push(...seg.coordinates.slice(1));
    }
  });
  return coords;
})();

// 路線ID指定で線路セグメントを取得
export function getTrackSegments(selectedLineIds?: LineId[]): TrackSegment[] {
  return getCombinedTrackSegments(selectedLineIds);
}

// 2点間の距離をメートルで算出 (Haversine Formula)
export function getDistanceMeters(p1: [number, number], p2: [number, number]): number {
  const R = 6371000; // 地球の半径 (m)
  const dLat = ((p2[0] - p1[0]) * Math.PI) / 180;
  const dLon = ((p2[1] - p1[1]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((p1[0] * Math.PI) / 180) *
      Math.cos((p2[0] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 2点間の距離（km）
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  return getDistanceMeters([lat1, lon1], [lat2, lon2]) / 1000;
}

// 2点間の方位角・進行方向角度（度: 0=北, 90=東, 180=南, 270=西）
export function calculateHeading(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const pLat1 = (lat1 * Math.PI) / 180;
  const pLat2 = (lat2 * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const y = Math.sin(dLon) * Math.cos(pLat2);
  const x = Math.cos(pLat1) * Math.sin(pLat2) - Math.sin(pLat1) * Math.cos(pLat2) * Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

// 駅間進行比率 ratio (0.0〜1.0) に基づいて、精密な実線路上の座標と方位角を算出
export function interpolateTrackPosition(
  fromStationId: string,
  toStationId: string,
  ratio: number,
  customSegments?: TrackSegment[]
): { lat: number; lng: number; heading: number; bearing: number } {
  const segments = customSegments || getCombinedTrackSegments();
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  let segment = segments.find(
    (s) => s.fromStationId === fromStationId && s.toStationId === toStationId
  );
  let isReverse = false;

  if (!segment) {
    segment = segments.find(
      (s) => s.fromStationId === toStationId && s.toStationId === fromStationId
    );
    isReverse = true;
  }

  if (!segment || segment.coordinates.length < 2) {
    const stations = getCombinedStations();
    const fromSt = stations.find((s) => s.id === fromStationId);
    const toSt = stations.find((s) => s.id === toStationId);
    if (fromSt && toSt) {
      const lat = fromSt.lat + (toSt.lat - fromSt.lat) * clampedRatio;
      const lng = fromSt.lng + (toSt.lng - fromSt.lng) * clampedRatio;
      const heading = calculateHeading(fromSt.lat, fromSt.lng, toSt.lat, toSt.lng);
      return { lat, lng, heading, bearing: heading };
    }
    if (fromSt) {
      return { lat: fromSt.lat, lng: fromSt.lng, heading: 0, bearing: 0 };
    }
    return { lat: 35.73, lng: 139.71, heading: 0, bearing: 0 };
  }

  const coords = isReverse ? [...segment.coordinates].reverse() : segment.coordinates;

  const distances: number[] = [];
  let totalDist = 0;
  for (let i = 0; i < coords.length - 1; i++) {
    const d = getDistanceMeters(coords[i], coords[i + 1]);
    distances.push(d);
    totalDist += d;
  }

  if (totalDist === 0) {
    return { lat: coords[0][0], lng: coords[0][1], heading: 0, bearing: 0 };
  }

  const targetDist = clampedRatio * totalDist;
  let accumulated = 0;

  for (let i = 0; i < distances.length; i++) {
    const nextAcc = accumulated + distances[i];
    if (targetDist <= nextAcc || i === distances.length - 1) {
      const segRatio = distances[i] > 0 ? (targetDist - accumulated) / distances[i] : 0;
      const p1 = coords[i];
      const p2 = coords[i + 1];

      const lat = p1[0] + (p2[0] - p1[0]) * segRatio;
      const lng = p1[1] + (p2[1] - p1[1]) * segRatio;
      const heading = calculateHeading(p1[0], p1[1], p2[0], p2[1]);

      return { lat, lng, heading, bearing: heading };
    }
    accumulated = nextAcc;
  }

  const last = coords[coords.length - 1];
  return { lat: last[0], lng: last[1], heading: 0, bearing: 0 };
}
