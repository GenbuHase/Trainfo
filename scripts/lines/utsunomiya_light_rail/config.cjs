module.exports = {
  lineId: 'utsunomiya_light_rail',
  name: '宇都宮ライトレール',
  stationsFilePath: 'src/data/lines/utsunomiya_light_rail/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/utsunomiya_light_rail/stationTimetables.json',
    globalTimetable: 'src/data/lines/utsunomiya_light_rail/globalTimetable.json',
  },
  stations: [
  {
    "id": "ULR-01",
    "name": "宇都宮駅東口",
    "yahooStationId": "29969",
    "inGroupId": null,
    "outGroupId": "8641"
  },
  {
    "id": "ULR-02",
    "name": "東宿郷",
    "yahooStationId": "29970",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-03",
    "name": "駅東公園前",
    "yahooStationId": "29971",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-04",
    "name": "峰",
    "yahooStationId": "29972",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-05",
    "name": "陽東３丁目",
    "yahooStationId": "29973",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-06",
    "name": "宇都宮大学陽東キャンパス",
    "yahooStationId": "29974",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-07",
    "name": "平石",
    "yahooStationId": "29975",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-08",
    "name": "平石中央小学校前",
    "yahooStationId": "29976",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-09",
    "name": "飛山城跡",
    "yahooStationId": "29977",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-10",
    "name": "清陵高校前",
    "yahooStationId": "29978",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-11",
    "name": "清原地区市民センター前",
    "yahooStationId": "29979",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-12",
    "name": "グリーンスタジアム前",
    "yahooStationId": "29980",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-13",
    "name": "ゆいの杜西",
    "yahooStationId": "29981",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-14",
    "name": "ゆいの杜中央",
    "yahooStationId": "29982",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-15",
    "name": "ゆいの杜東",
    "yahooStationId": "29983",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-16",
    "name": "芳賀台",
    "yahooStationId": "29984",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-17",
    "name": "芳賀町工業団地管理センター前",
    "yahooStationId": "29985",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-18",
    "name": "かしの森公園前",
    "yahooStationId": "29986",
    "inGroupId": "8640",
    "outGroupId": "8641"
  },
  {
    "id": "ULR-19",
    "name": "芳賀・高根沢工業団地",
    "yahooStationId": "29987",
    "inGroupId": "8640",
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
  "快速": "rapid",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 60,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 90,
  "7": 60,
  "8": 150,
  "9": 90,
  "10": 60,
  "11": 90,
  "12": 120,
  "13": 60,
  "14": 60,
  "15": 60,
  "16": 60,
  "17": 90,
  "18": 60
},
};
