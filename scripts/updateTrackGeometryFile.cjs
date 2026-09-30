const fs = require('fs');

const segments = JSON.parse(fs.readFileSync('scripts/accurate_track_segments.json', 'utf8'));

// 距離計算 (km)
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const formattedSegments = segments.map(seg => {
  let dist = 0;
  for (let j = 0; j < seg.coordinates.length - 1; j++) {
    dist += calculateDistanceKm(
      seg.coordinates[j][0],
      seg.coordinates[j][1],
      seg.coordinates[j + 1][0],
      seg.coordinates[j + 1][1]
    );
  }
  return {
    fromStationId: seg.fromStationId,
    toStationId: seg.toStationId,
    coordinates: seg.coordinates,
    distanceKm: Math.round(dist * 1000) / 1000
  };
});

const tsContent = `// 東武東上線 実線路ジオメトリ（OpenStreetMap 鉄道線路実座標データ準拠）
import { STATION_MAP } from './stations';

export interface TrackSegment {
  fromStationId: string;
  toStationId: string;
  coordinates: [number, number][];
  distanceKm: number;
}

// 2点間の距離(km)を計算 (球面三角法/ハバーサイン)
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 2点間の方位角 (度: 0=北, 90=東, 180=南, 270=西)
export function calculateHeading(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.cos(dLon);
  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

// 全38区間の実線路高精度ポリラインセグメント (合計${segments.reduce((acc, s) => acc + s.coordinates.length, 0)}座標点)
export const TRACK_SEGMENTS: TrackSegment[] = ${JSON.stringify(formattedSegments, null, 2)};

// 全線路のポリライン座標（池袋〜寄居、全線連続パス）
export const ENTIRE_LINE_COORDINATES: [number, number][] = TRACK_SEGMENTS.flatMap(
  (seg, idx) => (idx === 0 ? seg.coordinates : seg.coordinates.slice(1))
);

// 2駅間の線路座標を取得（順方向・逆方向対応）
export function getTrackBetweenStations(stationIdA: string, stationIdB: string): [number, number][] {
  const sA = STATION_MAP.get(stationIdA);
  const sB = STATION_MAP.get(stationIdB);
  if (!sA || !sB) return [];

  const forward = sA.number < sB.number;
  const startNum = Math.min(sA.number, sB.number);
  const endNum = Math.max(sA.number, sB.number);

  const points: [number, number][] = [];

  for (let num = startNum; num < endNum; num++) {
    const seg = TRACK_SEGMENTS[num - 1];
    if (seg) {
      if (points.length === 0) {
        points.push(...seg.coordinates);
      } else {
        points.push(...seg.coordinates.slice(1));
      }
    }
  }

  return forward ? points : points.slice().reverse();
}

// セグメント内の進捗率 (0.0〜1.0) から現在の [lat, lng] と heading を補間
export function interpolateTrackPosition(
  fromStationId: string,
  toStationId: string,
  progress: number
): { lat: number; lng: number; heading: number } {
  const track = getTrackBetweenStations(fromStationId, toStationId);
  const sFrom = STATION_MAP.get(fromStationId);

  if (!track || track.length < 2) {
    if (sFrom) return { lat: sFrom.lat, lng: sFrom.lng, heading: 0 };
    return { lat: 35.7289, lng: 139.7113, heading: 0 };
  }

  const clampedProgress = Math.max(0, Math.min(1, progress));

  // 各小区間の距離を計算
  const subDistances: number[] = [];
  let totalDist = 0;
  for (let i = 0; i < track.length - 1; i++) {
    const d = calculateDistanceKm(track[i][0], track[i][1], track[i + 1][0], track[i + 1][1]);
    subDistances.push(d);
    totalDist += d;
  }

  if (totalDist === 0) {
    return { lat: track[0][0], lng: track[0][1], heading: 0 };
  }

  const targetDist = totalDist * clampedProgress;
  let accumulated = 0;

  for (let i = 0; i < subDistances.length; i++) {
    const nextAcc = accumulated + subDistances[i];
    if (targetDist <= nextAcc || i === subDistances.length - 1) {
      const segRatio = subDistances[i] > 0 ? (targetDist - accumulated) / subDistances[i] : 0;
      const p1 = track[i];
      const p2 = track[i + 1];

      const lat = p1[0] + (p2[0] - p1[0]) * segRatio;
      const lng = p1[1] + (p2[1] - p1[1]) * segRatio;
      const heading = calculateHeading(p1[0], p1[1], p2[0], p2[1]);

      return { lat, lng, heading };
    }
    accumulated = nextAcc;
  }

  const last = track[track.length - 1];
  const secondLast = track[track.length - 2];
  return {
    lat: last[0],
    lng: last[1],
    heading: calculateHeading(secondLast[0], secondLast[1], last[0], last[1]),
  };
}
`;

fs.writeFileSync('src/data/trackGeometry.ts', tsContent, 'utf8');
console.log('Successfully updated src/data/trackGeometry.ts with 1,269 accurate railway points!');
