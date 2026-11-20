module.exports = {
  lineId: 'seaside_line',
  name: '横浜シーサイドライン',
  stationsFilePath: 'src/data/lines/seaside_line/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/seaside_line/stationTimetables.json',
    globalTimetable: 'src/data/lines/seaside_line/globalTimetable.json',
  },
  stations: [
  {
    "id": "SSL-01",
    "name": "新杉田",
    "yahooStationId": "23207",
    "inGroupId": null,
    "outGroupId": "4911"
  },
  {
    "id": "SSL-02",
    "name": "南部市場",
    "yahooStationId": "23264",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-03",
    "name": "鳥浜",
    "yahooStationId": "23254",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-04",
    "name": "並木北",
    "yahooStationId": "23262",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-05",
    "name": "並木中央",
    "yahooStationId": "23263",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-06",
    "name": "幸浦",
    "yahooStationId": "23181",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-07",
    "name": "産業振興センター",
    "yahooStationId": "23184",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-08",
    "name": "福浦",
    "yahooStationId": "23302",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-09",
    "name": "市大医学部",
    "yahooStationId": "23197",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-10",
    "name": "八景島",
    "yahooStationId": "23276",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-11",
    "name": "海の公園柴口",
    "yahooStationId": "23082",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-12",
    "name": "海の公園南口",
    "yahooStationId": "23083",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-13",
    "name": "野島公園",
    "yahooStationId": "23273",
    "inGroupId": "4910",
    "outGroupId": "4911"
  },
  {
    "id": "SSL-14",
    "name": "金沢八景",
    "yahooStationId": "23114",
    "inGroupId": "4910",
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
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 5,
  baseSectionSeconds: {
  "1": 90,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 90,
  "10": 60,
  "11": 60,
  "12": 60,
  "13": 90
},
};
