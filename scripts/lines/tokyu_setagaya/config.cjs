module.exports = {
  lineId: 'tokyu_setagaya',
  name: '東急世田谷線',
  stationsFilePath: 'src/data/lines/tokyu_setagaya/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_setagaya/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_setagaya/globalTimetable.json',
  },
  stations: [
  {
    "id": "SGW-01",
    "name": "三軒茶屋",
    "yahooStationId": "22703",
    "inGroupId": null,
    "outGroupId": "3201"
  },
  {
    "id": "SGW-02",
    "name": "西太子堂",
    "yahooStationId": "22875",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-03",
    "name": "若林",
    "yahooStationId": "23052",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-04",
    "name": "松陰神社前",
    "yahooStationId": "22705",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-05",
    "name": "世田谷",
    "yahooStationId": "22772",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-06",
    "name": "上町",
    "yahooStationId": "22609",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-07",
    "name": "宮の坂",
    "yahooStationId": "23001",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-08",
    "name": "山下",
    "yahooStationId": "23032",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-09",
    "name": "松原",
    "yahooStationId": "22981",
    "inGroupId": "3200",
    "outGroupId": "3201"
  },
  {
    "id": "SGW-10",
    "name": "下高井戸",
    "yahooStationId": "22725",
    "inGroupId": "3200",
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
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 60
},
};
