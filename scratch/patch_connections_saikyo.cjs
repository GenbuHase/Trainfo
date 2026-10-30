const fs = require('fs');

const file = 'scripts/common/throughLinker/connectionsConfig.cjs';
let content = fs.readFileSync(file, 'utf8');

const target = `    {
      "name": "相鉄・JR直通線 -> 埼京線 (下り/北行)",
      "lineA": "sotetsu_jr_direct",
      "lineB": "saikyo",
      "stationA": "JS-20",
      "stationB": "JA-11",
      "dirA": "outbound",
      "dirB": "outbound",
      "maxTimeDiff": 300,
      "allowMidStationB": true
    },
    {
      "name": "埼京線 -> 相鉄・JR直通線 (上り/南行)",
      "lineA": "saikyo",
      "lineB": "sotetsu_jr_direct",
      "stationA": "JA-11",
      "stationB": "JS-20",
      "dirA": "inbound",
      "dirB": "inbound",
      "maxTimeDiff": 300,
      "allowMidStationA": true
    },`;

const replacement = `    {
      "name": "相鉄・JR直通線 -> 埼京線 (下り/北行)",
      "lineA": "sotetsu_jr_direct",
      "lineB": "saikyo",
      "stationA": "JS-20",
      "stationB": "JA-11",
      "dirA": "outbound",
      "dirB": "outbound",
      "maxTimeDiff": 300,
      "allowMidStationB": true,
      "truncateBFromStation": true
    },
    {
      "name": "埼京線 -> 相鉄・JR直通線 (上り/南行)",
      "lineA": "saikyo",
      "lineB": "sotetsu_jr_direct",
      "stationA": "JA-11",
      "stationB": "JS-20",
      "dirA": "inbound",
      "dirB": "inbound",
      "maxTimeDiff": 300,
      "allowMidStationA": true,
      "truncateAAtStation": true
    },`;

const isCrlf = content.includes('\r\n');
const normalizedTarget = isCrlf ? target.replace(/\n/g, '\r\n') : target;
const normalizedReplacement = isCrlf ? replacement.replace(/\n/g, '\r\n') : replacement;

if (content.includes(normalizedTarget)) {
  content = content.replace(normalizedTarget, normalizedReplacement);
  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated connectionsConfig.cjs!');
} else {
  console.log('Target not found!');
}
