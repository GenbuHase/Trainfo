module.exports = {
  lineId: 'kanto_joso',
  name: '関東鉄道常総線',
  stationsFilePath: 'src/data/lines/kanto_joso/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kanto_joso/stationTimetables.json',
    globalTimetable: 'src/data/lines/kanto_joso/globalTimetable.json',
  },
  stations: [
  {
    "id": "KJ-01",
    "name": "取手",
    "yahooStationId": "21673",
    "inGroupId": null,
    "outGroupId": "4671"
  },
  {
    "id": "KJ-02",
    "name": "西取手",
    "yahooStationId": "21680",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-03",
    "name": "寺原",
    "yahooStationId": "21665",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-04",
    "name": "新取手",
    "yahooStationId": "21649",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-05",
    "name": "ゆめみ野",
    "yahooStationId": "29689",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-06",
    "name": "稲戸井",
    "yahooStationId": "21590",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-07",
    "name": "戸頭",
    "yahooStationId": "21667",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-08",
    "name": "南守谷",
    "yahooStationId": "21715",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-09",
    "name": "守谷",
    "yahooStationId": "21718",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-10",
    "name": "新守谷",
    "yahooStationId": "21651",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-11",
    "name": "小絹",
    "yahooStationId": "21632",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-12",
    "name": "水海道",
    "yahooStationId": "21708",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-13",
    "name": "北水海道",
    "yahooStationId": "21627",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-14",
    "name": "中妻",
    "yahooStationId": "21675",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-15",
    "name": "三妻",
    "yahooStationId": "21709",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-16",
    "name": "南石下",
    "yahooStationId": "21711",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-17",
    "name": "石下",
    "yahooStationId": "21585",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-18",
    "name": "玉村",
    "yahooStationId": "21660",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-19",
    "name": "宗道",
    "yahooStationId": "21653",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-20",
    "name": "下妻",
    "yahooStationId": "21646",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-21",
    "name": "大宝",
    "yahooStationId": "21662",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-22",
    "name": "騰波ノ江",
    "yahooStationId": "21670",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-23",
    "name": "黒子",
    "yahooStationId": "21629",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-24",
    "name": "大田郷",
    "yahooStationId": "21599",
    "inGroupId": "4670",
    "outGroupId": "4671"
  },
  {
    "id": "KJ-25",
    "name": "下館",
    "yahooStationId": "21644",
    "inGroupId": "4670",
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
  
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 120,
  "2": 60,
  "3": 120,
  "4": 60,
  "5": 90,
  "6": 60,
  "7": 90,
  "8": 180,
  "9": 150,
  "10": 150,
  "11": 360,
  "12": 150,
  "13": 150,
  "14": 240,
  "15": 270,
  "16": 120,
  "17": 150,
  "18": 150,
  "19": 270,
  "20": 210,
  "21": 180,
  "22": 210,
  "23": 300,
  "24": 300
},
};
