const fs = require('fs');

const exactStations = JSON.parse(fs.readFileSync('scripts/exact_stations.json', 'utf8'));
const smoothSegments = JSON.parse(fs.readFileSync('scripts/ultra_smooth_segments.json', 'utf8'));

// 1. stations.ts の更新
let stationsContent = fs.readFileSync('src/data/lines/tojo/stations.ts', 'utf8');

exactStations.forEach(st => {
  const regex = new RegExp(`(id:\\s*'${st.id}'[\\s\\S]*?lat:\\s*)([0-9.]+)([\\s\\S]*?lng:\\s*)([0-9.]+)`);
  stationsContent = stationsContent.replace(regex, `$1${st.lat}$3${st.lng}`);
});

fs.writeFileSync('src/data/lines/tojo/stations.ts', stationsContent, 'utf8');

// 2. trackGeometry.ts の生成
const trackGeometryTemplate = `import type { TrackSegment } from '../../../types';
// 東武東上線 高精度実軌道ジオメトリデータ（OpenStreetMap 本線精密トレース完全準拠）
// 全39駅が線路上に完全配置され、余計な側線・分岐・ジグザグを排除した本線軌道

export interface TrackSegment {
  fromStationId: string;
  toStationId: string;
  fromName: string;
  toName: string;
  coordinates: [number, number][];
}

// 駅間高精度セグメント定義 (池袋〜寄居 全38区間)
export const STATION_TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(smoothSegments, null, 2)};

// 全線の連続座標リスト（地図描画ポリライン用）
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

// 2点間の球面距離（メートル）を計算（ハバーサイン公式）
export function getDistanceMeters(p1: [number, number], p2: [number, number]): number {
  const R = 6371000;
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
  ratio: number
): { lat: number; lng: number; heading: number; bearing: number } {
  const clampedRatio = Math.max(0, Math.min(1, ratio));

  let segment = STATION_TRACK_SEGMENTS.find(
    (s) => s.fromStationId === fromStationId && s.toStationId === toStationId
  );
  let isReverse = false;

  if (!segment) {
    segment = STATION_TRACK_SEGMENTS.find(
      (s) => s.fromStationId === toStationId && s.toStationId === fromStationId
    );
    isReverse = true;
  }

  if (!segment || segment.coordinates.length < 2) {
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
`;

fs.writeFileSync('src/data/lines/tojo/trackGeometry.ts', trackGeometryTemplate, 'utf8');
console.log('Successfully written src/data/lines/tojo/trackGeometry.ts with 4-arg function signatures!');
