const fs = require('fs');
const path = require('path');
const linesMaster = require('./kanto_jr_master_definitions.cjs');
const { distMeters } = require('./common/geometryBuilderUtils.cjs');

console.log('Auditing all 13 lines and 311 segments for raw intermediate nodes...\n');

let totalSegs = 0;
let linearSegs = 0;
let okSegs = 0;

for (const lineDef of linesMaster) {
  const lineDir = path.resolve(`src/data/lines/${lineDef.lineId}`);
  const segContent = fs.readFileSync(path.join(lineDir, 'trackGeometry.ts'), 'utf8');
  const segJsonStr = segContent.substring(segContent.indexOf('['), segContent.lastIndexOf(']') + 1);
  const segments = eval(segJsonStr);

  let lineLinearCount = 0;

  for (const seg of segments) {
    totalSegs++;
    const coords = seg.coordinates;
    const pStart = coords[0];
    const pEnd = coords[coords.length - 1];
    const totalD = distMeters(pStart, pEnd);

    // 点列が直線かどうかを判定（始点と終点を結ぶ直線からの最大乖離距離を計算）
    let maxDeviation = 0;
    for (let i = 1; i < coords.length - 1; i++) {
      const p = coords[i];
      // 線分 pStart - pEnd への距離
      const t = ((p[0] - pStart[0]) * (pEnd[0] - pStart[0]) + (p[1] - pStart[1]) * (pEnd[1] - pStart[1])) /
                (Math.pow(pEnd[0] - pStart[0], 2) + Math.pow(pEnd[1] - pStart[1], 2));
      const proj = [
        pStart[0] + t * (pEnd[0] - pStart[0]),
        pStart[1] + t * (pEnd[1] - pStart[1]),
      ];
      const dev = distMeters(p, proj);
      if (dev > maxDeviation) maxDeviation = dev;
    }

    if (maxDeviation < 0.5 && coords.length > 2) {
      // ほぼ完全な直線
      lineLinearCount++;
      linearSegs++;
      // console.log(`  [${lineDef.lineId}] Seg ${seg.id} (${seg.fromStationId} -> ${seg.toStationId}): Linear (dist: ${(totalD/1000).toFixed(2)}km, maxDev: ${maxDeviation.toFixed(2)}m)`);
    } else {
      okSegs++;
    }
  }

  console.log(`[${lineDef.lineId}] Total segs: ${segments.length}, Curved segs: ${segments.length - lineLinearCount}, Linear segs: ${lineLinearCount}`);
}

console.log(`\nSummary: Total segs: ${totalSegs}, Curved segs: ${okSegs}, Linear segs: ${linearSegs}`);
