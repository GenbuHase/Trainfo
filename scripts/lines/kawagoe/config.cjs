// JR川越線 Yahoo! 路線情報スクレイパー設定 (大宮 〜 川越 全6駅)
const fs = require('fs');
const path = require('path');

const allStations = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../cache/saikyo_stations_final.json'), 'utf8'));
// 大宮(JA-26) 〜 川越(JA-31)
const stations = allStations.filter(s => {
  const num = parseInt(s.id.replace('JA-', ''), 10);
  return num >= 26 && num <= 31;
}).map(s => {
  if (s.id === 'JA-26') {
    // 起点駅大宮: 上りは終着のためinGroupId null, 下り川越方面は1041
    return { ...s, inGroupId: null, outGroupId: '1041' };
  }
  return s;
});

module.exports = {
  lineId: 'kawagoe',
  name: 'JR川越線',
  stationsFilePath: 'src/data/lines/kawagoe/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kawagoe/stationTimetables.json',
    globalTimetable: 'src/data/lines/kawagoe/globalTimetable.json',
  },
  stations: stations.map(s => ({
    id: s.id,
    name: s.name,
    yahooStationId: s.yahooStationId,
    inGroupId: s.inGroupId,
    outGroupId: s.outGroupId,
  })),
  stationNameAliases: {
    '日進(埼玉県)': '日進',
    '大宮(埼玉県)': '大宮',
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
    26: 240, // 大宮 -> 日進
    27: 180, // 日進 -> 西大宮
    28: 180, // 西大宮 -> 指扇
    29: 240, // 指扇 -> 南古谷
    30: 240, // 南古谷 -> 川越
  },
};
