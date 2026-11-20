module.exports = {
  lineId: 'chiba_monorail_2',
  name: '千葉都市モノレール2号線',
  stationsFilePath: 'src/data/lines/chiba_monorail_2/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/chiba_monorail_2/stationTimetables.json',
    globalTimetable: 'src/data/lines/chiba_monorail_2/globalTimetable.json',
  },
  stations: [
  {
    "id": "CM2-01",
    "name": "千葉",
    "yahooStationId": "22361",
    "inGroupId": null,
    "outGroupId": "4841"
  },
  {
    "id": "CM2-02",
    "name": "千葉公園",
    "yahooStationId": "22362",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-03",
    "name": "作草部",
    "yahooStationId": "22305",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-04",
    "name": "天台",
    "yahooStationId": "22371",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-05",
    "name": "穴川",
    "yahooStationId": "22181",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-06",
    "name": "スポーツセンター",
    "yahooStationId": "22339",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-07",
    "name": "動物公園",
    "yahooStationId": "22380",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-08",
    "name": "みつわ台",
    "yahooStationId": "22450",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-09",
    "name": "都賀",
    "yahooStationId": "22368",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-10",
    "name": "桜木",
    "yahooStationId": "22307",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-11",
    "name": "小倉台",
    "yahooStationId": "22219",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-12",
    "name": "千城台北",
    "yahooStationId": "22359",
    "inGroupId": "4840",
    "outGroupId": "4841"
  },
  {
    "id": "CM2-13",
    "name": "千城台",
    "yahooStationId": "22358",
    "inGroupId": "4840",
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
  
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 90,
  "2": 60,
  "3": 60,
  "4": 90,
  "5": 60,
  "6": 90,
  "7": 60,
  "8": 120,
  "9": 90,
  "10": 90,
  "11": 90,
  "12": 60
},
};
