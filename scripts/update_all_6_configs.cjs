const fs = require('fs');
const path = require('path');

// 1. 富士急行線 config
const fujikyuConfig = {
  lineId: 'fujikyu',
  name: '富士急行線',
  stationsFilePath: 'src/data/lines/fujikyu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/fujikyu/stationTimetables.json',
    globalTimetable: 'src/data/lines/fujikyu/globalTimetable.json',
  },
  stations: [
    { id: 'FJ-01', name: '大月', yahooStationId: '23387', inGroupId: null, outGroupId: '5171' },
    { id: 'FJ-02', name: '上大月', yahooStationId: '23402', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-03', name: '田野倉', yahooStationId: '23423', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-04', name: '禾生', yahooStationId: '23399', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-05', name: '赤坂', yahooStationId: '23376', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-06', name: '都留市', yahooStationId: '23424', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-07', name: '谷村町', yahooStationId: '23443', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-08', name: '都留文科大学前', yahooStationId: '29506', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-09', name: '十日市場', yahooStationId: '23429', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-10', name: '東桂', yahooStationId: '23434', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-11', name: '三つ峠', yahooStationId: '23440', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-12', name: '寿', yahooStationId: '23409', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-13', name: '葭池温泉前', yahooStationId: '23448', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-14', name: '下吉田', yahooStationId: '23414', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-15', name: '月江寺', yahooStationId: '23406', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-16', name: '富士山', yahooStationId: '23437', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-17', name: '富士急ハイランド', yahooStationId: '23436', inGroupId: '5170', outGroupId: '5171' },
    { id: 'FJ-18', name: '河口湖', yahooStationId: '23403', inGroupId: '5170', outGroupId: null },
  ],
  stationNameAliases: {
    '赤坂(山梨県)': '赤坂',
    '十日市場(山梨県)': '十日市場',
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '特急': 'limitedExp',
  },
  defaultCars: 3,
  baseSectionSeconds: {
    1: 120, 2: 150, 3: 150, 4: 120, 5: 120, 6: 120, 7: 120, 8: 120, 9: 150, 10: 180, 11: 180, 12: 120, 13: 120, 14: 100, 15: 120, 16: 120, 17: 120
  }
};

// 2. 駿豆線 config
const sunzuConfig = {
  lineId: 'izuhakone_sunzu',
  name: '伊豆箱根鉄道駿豆線',
  stationsFilePath: 'src/data/lines/izuhakone_sunzu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/izuhakone_sunzu/stationTimetables.json',
    globalTimetable: 'src/data/lines/izuhakone_sunzu/globalTimetable.json',
  },
  stations: [
    { id: 'IS-01', name: '三島', yahooStationId: '23636', inGroupId: null, outGroupId: '4941' },
    { id: 'IS-02', name: '三島広小路', yahooStationId: '23638', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-03', name: '三島田町', yahooStationId: '23637', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-04', name: '三島二日町', yahooStationId: '23639', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-05', name: '大場', yahooStationId: '23577', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-06', name: '伊豆仁田', yahooStationId: '23466', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-07', name: '原木', yahooStationId: '23610', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-08', name: '韮山', yahooStationId: '23599', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-09', name: '伊豆長岡', yahooStationId: '23467', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-10', name: '田京', yahooStationId: '23572', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-11', name: '大仁', yahooStationId: '23488', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-12', name: '牧之郷', yahooStationId: '23632', inGroupId: '4940', outGroupId: '4941' },
    { id: 'IS-13', name: '修善寺', yahooStationId: '23542', inGroupId: '4940', outGroupId: null },
  ],
  stationNameAliases: {},
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '特急': 'limitedExp',
  },
  defaultCars: 3,
  baseSectionSeconds: {
    1: 100, 2: 90, 3: 90, 4: 180, 5: 120, 6: 120, 7: 120, 8: 120, 9: 150, 10: 150, 11: 120, 12: 120
  }
};

fs.writeFileSync(path.resolve('scripts/lines/fujikyu/config.cjs'), `module.exports = ${JSON.stringify(fujikyuConfig, null, 2)};\n`, 'utf8');
fs.writeFileSync(path.resolve('scripts/lines/izuhakone_sunzu/config.cjs'), `module.exports = ${JSON.stringify(sunzuConfig, null, 2)};\n`, 'utf8');

console.log('✅ Updated fujikyu and izuhakone_sunzu configs with correct Yahoo IDs!');
