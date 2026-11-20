module.exports = {
  lineId: 'seibu_haijima',
  name: '西武拝島線',
  stationsFilePath: 'src/data/lines/seibu_haijima/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seibu_haijima/stationTimetables.json',
    globalTimetable: 'src/data/lines/seibu_haijima/globalTimetable.json',
  },
  stations: [
  {
    "id": "SSH-01",
    "name": "小平",
    "yahooStationId": "22680",
    "inGroupId": null,
    "outGroupId": "2901"
  },
  {
    "id": "SSH-02",
    "name": "萩山",
    "yahooStationId": "22896",
    "inGroupId": "2900",
    "outGroupId": "2901"
  },
  {
    "id": "SSH-03",
    "name": "小川",
    "yahooStationId": "22571",
    "inGroupId": "2900",
    "outGroupId": "2901"
  },
  {
    "id": "SSH-04",
    "name": "東大和市",
    "yahooStationId": "22945",
    "inGroupId": "2900",
    "outGroupId": "2901"
  },
  {
    "id": "SSH-05",
    "name": "玉川上水",
    "yahooStationId": "22805",
    "inGroupId": "2900",
    "outGroupId": "2901"
  },
  {
    "id": "SSH-06",
    "name": "武蔵砂川",
    "yahooStationId": "23009",
    "inGroupId": "2900",
    "outGroupId": "2901"
  },
  {
    "id": "SSH-07",
    "name": "西武立川",
    "yahooStationId": "22769",
    "inGroupId": "2900",
    "outGroupId": "2901"
  },
  {
    "id": "SSH-08",
    "name": "拝島",
    "yahooStationId": "22895",
    "inGroupId": "2900",
    "outGroupId": null
  }
],
  stationNameAliases: {
    '新鎌ケ谷': '新鎌ヶ谷',
    '空港第２ビル': '空港第2ビル',
    '幡ケ谷': '幡ヶ谷',
    '長者ケ浜潮騒はまなす公園前': '長者ヶ浜潮騒はまなす公園前',
  },
  trainTypeMap: {
  "特急": "limited_exp",
  "小江戸": "limited_exp",
  "拝島ライナー": "liner",
  "快速急行": "rapid_exp",
  "通勤急行": "commuter_exp",
  "急行": "express",
  "準急": "semi_exp",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 90,
  "2": 120,
  "3": 240,
  "4": 120,
  "5": 180,
  "6": 150,
  "7": 210
},
};
