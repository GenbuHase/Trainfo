module.exports = {
  lineId: 'keisei_matsudo',
  name: '京成松戸線',
  stationsFilePath: 'src/data/lines/keisei_matsudo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_matsudo/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_matsudo/globalTimetable.json',
  },
  stations: [
  {
    "id": "KMT-01",
    "name": "松戸",
    "yahooStationId": "22444",
    "inGroupId": null,
    "outGroupId": "8801"
  },
  {
    "id": "KMT-02",
    "name": "上本郷",
    "yahooStationId": "22252",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-03",
    "name": "松戸新田",
    "yahooStationId": "22445",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-04",
    "name": "みのり台",
    "yahooStationId": "22458",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-05",
    "name": "八柱",
    "yahooStationId": "22472",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-06",
    "name": "常盤平",
    "yahooStationId": "22375",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-07",
    "name": "五香",
    "yahooStationId": "22303",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-08",
    "name": "元山",
    "yahooStationId": "22462",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-09",
    "name": "くぬぎ山",
    "yahooStationId": "22271",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-10",
    "name": "北初富",
    "yahooStationId": "22261",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-11",
    "name": "新鎌ケ谷",
    "yahooStationId": "22326",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-12",
    "name": "初富",
    "yahooStationId": "22404",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-13",
    "name": "鎌ケ谷大仏",
    "yahooStationId": "22250",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-14",
    "name": "二和向台",
    "yahooStationId": "22425",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-15",
    "name": "三咲",
    "yahooStationId": "22449",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-16",
    "name": "滝不動",
    "yahooStationId": "22348",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-17",
    "name": "高根公団",
    "yahooStationId": "22346",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-18",
    "name": "高根木戸",
    "yahooStationId": "22345",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-19",
    "name": "北習志野",
    "yahooStationId": "22260",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-20",
    "name": "習志野",
    "yahooStationId": "22390",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-21",
    "name": "薬園台",
    "yahooStationId": "22467",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-22",
    "name": "前原",
    "yahooStationId": "22436",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-23",
    "name": "新津田沼",
    "yahooStationId": "22329",
    "inGroupId": "8800",
    "outGroupId": "8801"
  },
  {
    "id": "KMT-24",
    "name": "京成津田沼",
    "yahooStationId": "22282",
    "inGroupId": "8800",
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
  
  defaultCars: 6,
  baseSectionSeconds: {
  "1": 120,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 150,
  "6": 150,
  "7": 90,
  "8": 90,
  "9": 120,
  "10": 60,
  "11": 90,
  "12": 150,
  "13": 90,
  "14": 60,
  "15": 120,
  "16": 90,
  "17": 60,
  "18": 60,
  "19": 60,
  "20": 60,
  "21": 90,
  "22": 120,
  "23": 90
},
};
