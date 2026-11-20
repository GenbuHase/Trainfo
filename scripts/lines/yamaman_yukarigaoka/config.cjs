module.exports = {
  lineId: 'yamaman_yukarigaoka',
  name: '山万ユーカリが丘線',
  stationsFilePath: 'src/data/lines/yamaman_yukarigaoka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yamaman_yukarigaoka/stationTimetables.json',
    globalTimetable: 'src/data/lines/yamaman_yukarigaoka/globalTimetable.json',
  },
  stations: [
  {
    "id": "YMY-01",
    "name": "ユーカリが丘",
    "yahooStationId": "22474",
    "inGroupId": null,
    "outGroupId": "4811"
  },
  {
    "id": "YMY-02",
    "name": "地区センター",
    "yahooStationId": "22356",
    "inGroupId": "4810",
    "outGroupId": "4811"
  },
  {
    "id": "YMY-03",
    "name": "公園",
    "yahooStationId": "22292",
    "inGroupId": "4810",
    "outGroupId": "4811"
  },
  {
    "id": "YMY-04",
    "name": "女子大",
    "yahooStationId": "22336",
    "inGroupId": null,
    "outGroupId": "4821"
  },
  {
    "id": "YMY-05",
    "name": "中学校",
    "yahooStationId": "22353",
    "inGroupId": null,
    "outGroupId": "4821"
  },
  {
    "id": "YMY-06",
    "name": "井野",
    "yahooStationId": "22200",
    "inGroupId": null,
    "outGroupId": "4821"
  }
],
  stationNameAliases: {
    '新鎌ケ谷': '新鎌ヶ谷',
    '空港第２ビル': '空港第2ビル',
    '幡ケ谷': '幡ヶ谷',
    '長者ケ浜潮騒はまなす公園前': '長者ヶ浜潮騒はまなす公園前',
  },
  trainTypeMap: {
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  directStops: true,
  junctionPassingRules: [
    { fromId: 'YMY-06', toId: 'YMY-03', viaIds: [] },
  ],
  resolveDirection: (_firstSt, _lastSt, trainDetail) => trainDetail.direction || 'outbound',
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 60,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60
},
};
