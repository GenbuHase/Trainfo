const fs = require('fs');

const file = 'scripts/bridgeJobanLimitedExpress.cjs';
let content = fs.readFileSync(file, 'utf8');

const target1 = `      // 境界駅（取手駅）の通過時刻を完全一致
      const finalLastR = r.stops[r.stops.length - 1];
      const finalFirstN = match.stops[0];
      if (finalLastR && finalFirstN) {
        finalFirstN.arrivalTime = finalLastR.departureTime || finalLastR.arrivalTime;
        finalFirstN.departureTime = finalFirstN.arrivalTime;
      }`;

const replacement1 = `      // 境界駅（取手駅）の通過時刻を完全一致（通過駅ならarrivalTimeとdepartureTimeを通過時刻に一致）
      const finalLastR = r.stops[r.stops.length - 1];
      const finalFirstN = match.stops[0];
      if (finalLastR && finalFirstN) {
        const passTime = finalLastR.isPassing ? finalLastR.arrivalTime : (finalLastR.departureTime || finalLastR.arrivalTime);
        finalLastR.departureTime = passTime;
        finalFirstN.arrivalTime = passTime;
        finalFirstN.departureTime = passTime;
      }`;

const target2 = `      // 境界駅（取手駅）の通過時刻を完全一致
      const finalLastN = match.stops[match.stops.length - 1];
      const finalFirstR = r.stops[0];
      if (finalLastN && finalFirstR) {
        finalFirstR.arrivalTime = finalLastN.departureTime || finalLastN.arrivalTime;
        finalFirstR.departureTime = finalFirstR.arrivalTime;
      }`;

const replacement2 = `      // 境界駅（取手駅）の通過時刻を完全一致（通過駅ならarrivalTimeとdepartureTimeを通過時刻に一致）
      const finalLastN = match.stops[match.stops.length - 1];
      const finalFirstR = r.stops[0];
      if (finalLastN && finalFirstR) {
        const passTime = finalLastN.isPassing ? finalLastN.arrivalTime : (finalLastN.departureTime || finalLastN.arrivalTime);
        finalLastN.departureTime = passTime;
        finalFirstR.arrivalTime = passTime;
        finalFirstR.departureTime = passTime;
      }`;

const isCrlf = content.includes('\r\n');
const norm = (s) => isCrlf ? s.replace(/\n/g, '\r\n') : s;

content = content.replace(norm(target1), norm(replacement1));
content = content.replace(norm(target2), norm(replacement2));

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated bridgeJobanLimitedExpress.cjs!');
