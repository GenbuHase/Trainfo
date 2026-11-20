module.exports = {
  lineId: 'joshin',
  name: '上信電鉄上信線',
  stationsFilePath: 'src/data/lines/joshin/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/joshin/stationTimetables.json',
    globalTimetable: 'src/data/lines/joshin/globalTimetable.json',
  },
  stations: [
  {
    "id": "JSN-01",
    "name": "高崎",
    "yahooStationId": "21913",
    "inGroupId": null,
    "outGroupId": "4741"
  },
  {
    "id": "JSN-02",
    "name": "南高崎",
    "yahooStationId": "21954",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-03",
    "name": "佐野のわたし",
    "yahooStationId": "29744",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-04",
    "name": "根小屋",
    "yahooStationId": "21935",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-05",
    "name": "高崎商科大学前",
    "yahooStationId": "29379",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-06",
    "name": "山名",
    "yahooStationId": "21960",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-07",
    "name": "西山名",
    "yahooStationId": "21931",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-08",
    "name": "馬庭",
    "yahooStationId": "21948",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-09",
    "name": "吉井",
    "yahooStationId": "21963",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-10",
    "name": "西吉井",
    "yahooStationId": "21932",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-11",
    "name": "上州新屋",
    "yahooStationId": "21904",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-12",
    "name": "上州福島",
    "yahooStationId": "21905",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-13",
    "name": "東富岡",
    "yahooStationId": "21939",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-14",
    "name": "上州富岡",
    "yahooStationId": "21902",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-15",
    "name": "西富岡",
    "yahooStationId": "21929",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-16",
    "name": "上州七日市",
    "yahooStationId": "21903",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-17",
    "name": "上州一ノ宮",
    "yahooStationId": "21901",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-18",
    "name": "神農原",
    "yahooStationId": "21864",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-19",
    "name": "南蛇井",
    "yahooStationId": "21924",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-20",
    "name": "千平",
    "yahooStationId": "21910",
    "inGroupId": "4740",
    "outGroupId": "4741"
  },
  {
    "id": "JSN-21",
    "name": "下仁田",
    "yahooStationId": "21895",
    "inGroupId": "4740",
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
  "1": 60,
  "2": 120,
  "3": 120,
  "4": 90,
  "5": 90,
  "6": 90,
  "7": 180,
  "8": 210,
  "9": 120,
  "10": 90,
  "11": 150,
  "12": 210,
  "13": 60,
  "14": 60,
  "15": 60,
  "16": 90,
  "17": 180,
  "18": 210,
  "19": 150,
  "20": 300
},
};
