const fs = require('fs');

const file = 'scripts/common/throughLinker/throughLinkerEngine.cjs';
let content = fs.readFileSync(file, 'utf8');

const target = `        // 先行路線の境界駅発車時刻も後続路線の発車時刻に同期（境界駅停車時間・発車標時刻の統一）
        if (stopB.departureTime && bDepSec !== null && bDepSec >= syncSec) {
          stopA.departureTime = stopB.departureTime;
        }`;

const replacement = `        // 先行路線の境界駅発車時刻も後続路線の発車時刻に同期（境界駅停車時間・発車標時刻の統一）
        // ただし通過駅（isPassing: true）の場合は停車時間を設けず即時通過（arrivalTimeと一致）
        const isPassingBoundary = stopA.isPassing || stopB.isPassing;
        if (isPassingBoundary) {
          stopA.departureTime = syncArr;
          stopB.departureTime = syncArr;
          bDepSec = syncSec;
        } else if (stopB.departureTime && bDepSec !== null && bDepSec >= syncSec) {
          stopA.departureTime = stopB.departureTime;
        }`;

const isCrlf = content.includes('\r\n');
const normalizedTarget = isCrlf ? target.replace(/\n/g, '\r\n') : target;
const normalizedReplacement = isCrlf ? replacement.replace(/\n/g, '\r\n') : replacement;

if (content.includes(normalizedTarget)) {
  content = content.replace(normalizedTarget, normalizedReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated throughLinkerEngine.cjs with passing station guard!');
} else {
  console.log('Target not found!');
}
