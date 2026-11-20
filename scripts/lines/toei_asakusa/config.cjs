module.exports = {
  lineId: 'toei_asakusa',
  name: '都営浅草線',
  stationsFilePath: 'src/data/lines/toei_asakusa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/toei_asakusa/stationTimetables.json',
    globalTimetable: 'src/data/lines/toei_asakusa/globalTimetable.json',
  },
  stations: [
  {
    "id": "A-01",
    "name": "西馬込",
    "yahooStationId": "22882",
    "inGroupId": null,
    "outGroupId": "3381"
  },
  {
    "id": "A-02",
    "name": "馬込",
    "yahooStationId": "22975",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-03",
    "name": "中延",
    "yahooStationId": "22853",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-04",
    "name": "戸越",
    "yahooStationId": "22832",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-05",
    "name": "五反田",
    "yahooStationId": "22691",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-06",
    "name": "高輪台",
    "yahooStationId": "22791",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-07",
    "name": "泉岳寺",
    "yahooStationId": "22775",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-08",
    "name": "三田",
    "yahooStationId": "22985",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-09",
    "name": "大門",
    "yahooStationId": "22815",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-10",
    "name": "新橋",
    "yahooStationId": "22751",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-11",
    "name": "東銀座",
    "yahooStationId": "22930",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-12",
    "name": "宝町",
    "yahooStationId": "22794",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-13",
    "name": "日本橋",
    "yahooStationId": "22884",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-14",
    "name": "人形町",
    "yahooStationId": "22885",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-15",
    "name": "東日本橋",
    "yahooStationId": "22938",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-16",
    "name": "浅草橋",
    "yahooStationId": "22496",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-17",
    "name": "蔵前",
    "yahooStationId": "22651",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-18",
    "name": "浅草",
    "yahooStationId": "22495",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-19",
    "name": "本所吾妻橋",
    "yahooStationId": "22974",
    "inGroupId": "3380",
    "outGroupId": "3381"
  },
  {
    "id": "A-20",
    "name": "押上",
    "yahooStationId": "22578",
    "inGroupId": "3380",
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
  "モーニング・ウィング": "liner",
  "イブニング・ウィング": "liner",
  "ウィング": "liner",
  "エアポート快特": "access_exp",
  "アクセス特急": "access_exp",
  "快特": "rapid_exp",
  "快速特急": "rapid_exp",
  "特急": "limited_exp",
  "エアポート急行": "express",
  "急行": "express",
  "快速": "express",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 90,
  "2": 90,
  "3": 90,
  "4": 120,
  "5": 60,
  "6": 120,
  "7": 120,
  "8": 90,
  "9": 90,
  "10": 90,
  "11": 60,
  "12": 60,
  "13": 60,
  "14": 60,
  "15": 60,
  "16": 60,
  "17": 60,
  "18": 60,
  "19": 60
},
};
