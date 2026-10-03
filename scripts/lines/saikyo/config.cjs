// JR埼京線 Yahoo! 路線情報スクレイパー設定 (大崎 〜 大宮 全19駅)
const fs = require('fs');
const path = require('path');

const allStations = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../cache/saikyo_stations_final.json'), 'utf8'));
// 大崎(JA-08) 〜 大宮(JA-26)
const stations = allStations.filter(s => {
  const num = parseInt(s.id.replace('JA-', ''), 10);
  return num >= 8 && num <= 26;
}).map(s => {
  if (s.id === 'JA-26') {
    // 終着駅大宮
    return { ...s, outGroupId: null };
  }
  return s;
});

module.exports = {
  lineId: 'saikyo',
  name: 'JR埼京線',
  stationsFilePath: 'src/data/lines/saikyo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/saikyo/stationTimetables.json',
    globalTimetable: 'src/data/lines/saikyo/globalTimetable.json',
  },
  stations: stations.map(s => ({
    id: s.id,
    name: s.name,
    yahooStationId: s.yahooStationId,
    inGroupId: s.inGroupId,
    outGroupId: s.outGroupId,
  })),
  stationNameAliases: {
    '十条(東京都)': '十条',
    '大宮(埼玉県)': '大宮',
    '戸田(埼玉県)': '戸田',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特急': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    8: 180, // 大崎 -> 恵比寿
    9: 120, // 恵比寿 -> 渋谷
    10: 300, // 渋谷 -> 新宿
    11: 300, // 新宿 -> 池袋
    12: 180, // 池袋 -> 板橋
    13: 120, // 板橋 -> 十条
    14: 180, // 十条 -> 赤羽
    15: 180, // 赤羽 -> 北赤羽
    16: 120, // 北赤羽 -> 浮間舟渡
    17: 180, // 浮間舟渡 -> 戸田公園
    18: 120, // 戸田公園 -> 戸田
    19: 120, // 戸田 -> 北戸田
    20: 180, // 北戸田 -> 武蔵浦和
    21: 120, // 武蔵浦和 -> 中浦和
    22: 120, // 中浦和 -> 南与野
    23: 120, // 南与野 -> 与野本町
    24: 120, // 与野本町 -> 北与野
    25: 180, // 北与野 -> 大宮
  },
};
