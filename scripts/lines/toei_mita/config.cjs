module.exports = {
  lineId: 'toei_mita',
  name: '都営三田線',
  stationsFilePath: 'src/data/lines/toei_mita/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/toei_mita/stationTimetables.json',
    globalTimetable: 'src/data/lines/toei_mita/globalTimetable.json',
  },
  stations: [
  {
    "id": "I-01",
    "name": "目黒",
    "yahooStationId": "23018",
    "inGroupId": null,
    "outGroupId": "3391"
  },
  {
    "id": "I-02",
    "name": "白金台",
    "yahooStationId": "29327",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-03",
    "name": "白金高輪",
    "yahooStationId": "29326",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-04",
    "name": "三田",
    "yahooStationId": "22985",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-05",
    "name": "芝公園",
    "yahooStationId": "22712",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-06",
    "name": "御成門",
    "yahooStationId": "22584",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-07",
    "name": "内幸町",
    "yahooStationId": "22534",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-08",
    "name": "日比谷",
    "yahooStationId": "22951",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-09",
    "name": "大手町",
    "yahooStationId": "22564",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-10",
    "name": "神保町",
    "yahooStationId": "22756",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-11",
    "name": "水道橋",
    "yahooStationId": "22758",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-12",
    "name": "春日",
    "yahooStationId": "22595",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-13",
    "name": "白山",
    "yahooStationId": "22897",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-14",
    "name": "千石",
    "yahooStationId": "22777",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-15",
    "name": "巣鴨",
    "yahooStationId": "22760",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-16",
    "name": "西巣鴨",
    "yahooStationId": "22874",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-17",
    "name": "新板橋",
    "yahooStationId": "22729",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-18",
    "name": "板橋区役所前",
    "yahooStationId": "22518",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-19",
    "name": "板橋本町",
    "yahooStationId": "22519",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-20",
    "name": "本蓮沼",
    "yahooStationId": "23022",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-21",
    "name": "志村坂上",
    "yahooStationId": "22716",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-22",
    "name": "志村三丁目",
    "yahooStationId": "22717",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-23",
    "name": "蓮根",
    "yahooStationId": "22902",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-24",
    "name": "西台",
    "yahooStationId": "22878",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-25",
    "name": "高島平",
    "yahooStationId": "22789",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-26",
    "name": "新高島平",
    "yahooStationId": "22746",
    "inGroupId": "3390",
    "outGroupId": "3391"
  },
  {
    "id": "I-27",
    "name": "西高島平",
    "yahooStationId": "22876",
    "inGroupId": "3390",
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
  "急行": "express",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 120,
  "2": 60,
  "3": 120,
  "4": 60,
  "5": 60,
  "6": 90,
  "7": 90,
  "8": 60,
  "9": 120,
  "10": 90,
  "11": 60,
  "12": 120,
  "13": 90,
  "14": 60,
  "15": 120,
  "16": 90,
  "17": 60,
  "18": 90,
  "19": 90,
  "20": 90,
  "21": 60,
  "22": 90,
  "23": 60,
  "24": 90,
  "25": 60,
  "26": 60
},
};
