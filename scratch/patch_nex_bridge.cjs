const fs = require('fs');

const file = 'scripts/bridgeNexAndAyame.cjs';
let content = fs.readFileSync(file, 'utf8');

// 下り方向の佐倉通過時刻計算の改善
const targetDown = `      // (3) 佐倉通過時刻
      const sakuraPassSec = chibaDepSec + 840; // 約14分走行`;

const replDown = `      // (3) 佐倉通過時刻 (千葉 SM-01 〜 佐倉 SM-06: 16.1km, 佐倉 NR-01 〜 空港第2ビル NR-36: 20.4km, 全長 36.5km)
      let chibaToNr36Dur = nr36ArrSec - chibaDepSec;
      if (chibaToNr36Dur <= 300) {
        // 千葉発時刻が異常な場合は第2ビルから逆算
        chibaDepSec = nr36ArrSec - 1800;
        chibaToNr36Dur = 1800;
      }
      const sakuraPassSec = Math.round(chibaDepSec + chibaToNr36Dur * (16.1 / 36.5));`;

// 上り方向の佐倉通過時刻計算の改善
const targetUp = `      // (3) 佐倉通過時刻
      const sakuraPassSec = chibaDepSec - 840; // 千葉通過の約14分前`;

const replUp = `      // (3) 佐倉通過時刻 (成田空港側 NR-36 〜 佐倉 NR-01: 20.4km, 佐倉 SM-06 〜 千葉 SM-01: 16.1km)
      let nr36ToChibaDur = chibaDepSec - nr36DepSec;
      if (nr36ToChibaDur <= 300) {
        chibaDepSec = nr36DepSec + 1800;
        nr36ToChibaDur = 1800;
      }
      const sakuraPassSec = Math.round(nr36DepSec + nr36ToChibaDur * (20.4 / 36.5));`;

const isCrlf = content.includes('\r\n');
const norm = (s) => isCrlf ? s.replace(/\n/g, '\r\n') : s;

content = content.replace(norm(targetDown), norm(replDown));
content = content.replace(norm(targetUp), norm(replUp));

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated bridgeNexAndAyame.cjs with proportional Sakura pass calculation!');
