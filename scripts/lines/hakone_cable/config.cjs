module.exports = {
  lineId: 'hakone_cable',
  name: '小田急箱根鋼索線（箱根登山ケーブルカー）',
  stationsFilePath: 'src/data/lines/hakone_cable/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hakone_cable/stationTimetables.json',
    globalTimetable: 'src/data/lines/hakone_cable/globalTimetable.json',
  },
  stations: [
  {
    "id": "OHC-01",
    "name": "強羅",
    "yahooStationId": "23168",
    "inGroupId": null,
    "outGroupId": "4981"
  },
  {
    "id": "OHC-02",
    "name": "公園下",
    "yahooStationId": "29728",
    "inGroupId": "4980",
    "outGroupId": "4981"
  },
  {
    "id": "OHC-03",
    "name": "公園上",
    "yahooStationId": "29729",
    "inGroupId": "4980",
    "outGroupId": "4981"
  },
  {
    "id": "OHC-04",
    "name": "中強羅",
    "yahooStationId": "29730",
    "inGroupId": "4980",
    "outGroupId": "4981"
  },
  {
    "id": "OHC-05",
    "name": "上強羅",
    "yahooStationId": "29731",
    "inGroupId": "4980",
    "outGroupId": "4981"
  },
  {
    "id": "OHC-06",
    "name": "早雲山",
    "yahooStationId": "29732",
    "inGroupId": "4980",
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
  "5": 60
},
};
