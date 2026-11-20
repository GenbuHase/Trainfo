module.exports = {
  lineId: 'kashima_rinkai',
  name: '鹿島臨海鉄道大洗鹿島線',
  stationsFilePath: 'src/data/lines/kashima_rinkai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kashima_rinkai/stationTimetables.json',
    globalTimetable: 'src/data/lines/kashima_rinkai/globalTimetable.json',
  },
  stations: [
  {
    "id": "KRL-01",
    "name": "水戸",
    "yahooStationId": "21710",
    "inGroupId": null,
    "outGroupId": "4691"
  },
  {
    "id": "KRL-02",
    "name": "東水戸",
    "yahooStationId": "21689",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-03",
    "name": "常澄",
    "yahooStationId": "21664",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-04",
    "name": "大洗",
    "yahooStationId": "21598",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-05",
    "name": "涸沼",
    "yahooStationId": "21701",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-06",
    "name": "鹿島旭",
    "yahooStationId": "21610",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-07",
    "name": "徳宿",
    "yahooStationId": "21668",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-08",
    "name": "新鉾田",
    "yahooStationId": "21650",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-09",
    "name": "北浦湖畔",
    "yahooStationId": "21626",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-10",
    "name": "大洋",
    "yahooStationId": "21654",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-11",
    "name": "鹿島灘",
    "yahooStationId": "21614",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-12",
    "name": "鹿島大野",
    "yahooStationId": "21611",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-13",
    "name": "長者ケ浜潮騒はまなす公園前",
    "yahooStationId": "21687",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-14",
    "name": "荒野台",
    "yahooStationId": "21630",
    "inGroupId": "4690",
    "outGroupId": "4691"
  },
  {
    "id": "KRL-15",
    "name": "鹿島サッカースタジアム",
    "yahooStationId": "21612",
    "inGroupId": "4690",
    "outGroupId": null
  },
  {
    "id": "KRL-16",
    "name": "鹿島神宮",
    "yahooStationId": "21613",
    "inGroupId": null,
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
  "1": 300,
  "2": 360,
  "3": 270,
  "4": 510,
  "5": 390,
  "6": 300,
  "7": 330,
  "8": 300,
  "9": 330,
  "10": 330,
  "11": 240,
  "12": 180,
  "13": 150,
  "14": 240,
  "15": 270
},
};
