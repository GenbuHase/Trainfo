module.exports = {
  lineId: 'jomo',
  name: '上毛電気鉄道上毛線',
  stationsFilePath: 'src/data/lines/jomo/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jomo/stationTimetables.json',
    globalTimetable: 'src/data/lines/jomo/globalTimetable.json',
  },
  stations: [
  {
    "id": "JOM-01",
    "name": "中央前橋",
    "yahooStationId": "21916",
    "inGroupId": null,
    "outGroupId": "4731"
  },
  {
    "id": "JOM-02",
    "name": "城東",
    "yahooStationId": "21906",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-03",
    "name": "三俣",
    "yahooStationId": "21952",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-04",
    "name": "片貝",
    "yahooStationId": "21862",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-05",
    "name": "上泉",
    "yahooStationId": "21865",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-06",
    "name": "赤坂",
    "yahooStationId": "21841",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-07",
    "name": "心臓血管センター",
    "yahooStationId": "21900",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-08",
    "name": "江木",
    "yahooStationId": "21854",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-09",
    "name": "大胡",
    "yahooStationId": "21855",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-10",
    "name": "樋越",
    "yahooStationId": "21941",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-11",
    "name": "北原",
    "yahooStationId": "21872",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-12",
    "name": "新屋",
    "yahooStationId": "21843",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-13",
    "name": "粕川",
    "yahooStationId": "21861",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-14",
    "name": "膳",
    "yahooStationId": "21911",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-15",
    "name": "新里",
    "yahooStationId": "21926",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-16",
    "name": "新川",
    "yahooStationId": "21925",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-17",
    "name": "東新川",
    "yahooStationId": "21940",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-18",
    "name": "赤城",
    "yahooStationId": "21840",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-19",
    "name": "桐生球場前",
    "yahooStationId": "29577",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-20",
    "name": "天王宿",
    "yahooStationId": "21918",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-21",
    "name": "富士山下",
    "yahooStationId": "21943",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-22",
    "name": "丸山下",
    "yahooStationId": "21949",
    "inGroupId": "4730",
    "outGroupId": "4731"
  },
  {
    "id": "JOM-23",
    "name": "西桐生",
    "yahooStationId": "21927",
    "inGroupId": "4730",
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
  "2": 60,
  "3": 60,
  "4": 90,
  "5": 90,
  "6": 120,
  "7": 60,
  "8": 180,
  "9": 120,
  "10": 90,
  "11": 90,
  "12": 120,
  "13": 90,
  "14": 120,
  "15": 150,
  "16": 90,
  "17": 60,
  "18": 180,
  "19": 90,
  "20": 60,
  "21": 60,
  "22": 90
},
};
