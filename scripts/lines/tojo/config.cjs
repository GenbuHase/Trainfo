// 東武東上線 Yahoo! 路線情報スクレイパー設定
const fs = require('fs');
const path = require('path');

const stations = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../cache/tojo_stations_final.json'), 'utf8'));

module.exports = {
  lineId: 'tojo',
  name: '東武東上線',
  stationsFilePath: 'src/data/lines/tojo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tojo/stationTimetables.json',
    globalTimetable: 'src/data/lines/tojo/globalTimetable.json',
  },
  stations: stations.map(s => ({
    id: s.id,
    name: s.name,
    yahooStationId: s.yahooStationId,
    inGroupId: s.inGroupId,
    outGroupId: s.outGroupId,
  })),
  stationNameAliases: {
    '霞ケ関(埼玉県)': '霞ヶ関',
    '霞ヶ関(埼玉県)': '霞ヶ関',
    '森林公園(埼玉県)': '森林公園',
    '小川町(埼玉県)': '小川町',
    '坂戸(埼玉県)': '坂戸',
    '大山(東京都)': '大山',
    'ときわ台(東京都)': 'ときわ台',
    '鶴ケ島': '鶴ヶ島',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '準急': 'semiExp',
    '急行': 'express',
    '快速急行': 'rapidExp',
    '川越特急': 'kawagoeExp',
    'TJライナー': 'tjLiner',
    'ＴＪライナー': 'tjLiner',
    'ライナー': 'tjLiner',
    '特急': 'rapidExp',
    '通勤急行': 'express',
    '通勤特急': 'rapidExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    // 基準駅間秒数（標準2分〜3分）
    1: 120, 2: 120, 3: 120, 4: 120, 5: 120, 6: 120, 7: 120, 8: 120, 9: 120, 10: 180,
    11: 180, 12: 120, 13: 120, 14: 120, 15: 120, 16: 120, 17: 120, 18: 120, 19: 120, 20: 180,
    21: 120, 22: 180, 23: 180, 24: 120, 25: 120, 26: 120, 27: 180, 28: 180, 29: 180, 30: 240,
    31: 180, 32: 240, 33: 240, 34: 180, 35: 180, 36: 180, 37: 120, 38: 120,
  },
};
