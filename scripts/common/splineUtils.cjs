const { distMeters, subdivideCoordinates } = require('./geometryBuilderUtils.cjs');

/**
 * Chaikin の角丸めアルゴリズム (Chaikin's Smoothing Algorithm)
 * 折れ線の角を滑らかに丸め、オーバーシュートや自己交差・トゲを一切発生させずに
 * 滑らかな曲線ポリラインを生成します。
 */
function chaikinSmoothing(coords, iterations = 2) {
  if (coords.length <= 2) return coords;
  let pts = coords;

  for (let it = 0; it < iterations; it++) {
    const nextPts = [pts[0]]; // 始点は固定

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];

      // Q = 0.75 * p0 + 0.25 * p1
      const q = [
        0.75 * p0[0] + 0.25 * p1[0],
        0.75 * p0[1] + 0.25 * p1[1],
      ];
      // R = 0.25 * p0 + 0.75 * p1
      const r = [
        0.25 * p0[0] + 0.75 * p1[0],
        0.25 * p0[1] + 0.75 * p1[1],
      ];

      nextPts.push(q);
      nextPts.push(r);
    }

    nextPts.push(pts[pts.length - 1]); // 終点は固定
    pts = nextPts;
  }

  return pts;
}

function smoothAndSubdivide(coords, maxStep = 15) {
  if (coords.length <= 2) {
    return subdivideCoordinates(coords, maxStep);
  }

  // 1. Chaikinアルゴリズムで角を滑らかに丸める
  const smoothed = chaikinSmoothing(coords, 2);

  // 2. 指定ピッチ (デフォルト15m) で均等に細分化
  return subdivideCoordinates(smoothed, maxStep);
}

module.exports = {
  smoothAndSubdivide,
  chaikinSmoothing,
};
