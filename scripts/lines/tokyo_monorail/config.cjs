module.exports = {
  lineId: 'tokyo_monorail',
  name: '東京モノレール羽田空港線',
  stationsFilePath: 'src/data/lines/tokyo_monorail/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyo_monorail/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyo_monorail/globalTimetable.json',
  },
  stations: [
  {
    "id": "MO-01",
    "name": "浜松町",
    "yahooStationId": "22914",
    "inGroupId": null,
    "outGroupId": "4881"
  },
  {
    "id": "MO-02",
    "name": "天王洲アイル",
    "yahooStationId": "22825",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-03",
    "name": "大井競馬場前",
    "yahooStationId": "22554",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-04",
    "name": "流通センター",
    "yahooStationId": "23047",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-05",
    "name": "昭和島",
    "yahooStationId": "22706",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-06",
    "name": "整備場",
    "yahooStationId": "22766",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-07",
    "name": "天空橋",
    "yahooStationId": "22910",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-08",
    "name": "羽田空港第３ターミナル",
    "yahooStationId": "29671",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-09",
    "name": "新整備場",
    "yahooStationId": "22744",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-10",
    "name": "羽田空港第１ターミナル",
    "yahooStationId": "29509",
    "inGroupId": "4880",
    "outGroupId": "4881"
  },
  {
    "id": "MO-11",
    "name": "羽田空港第２ターミナル",
    "yahooStationId": "29510",
    "inGroupId": "4880",
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
  "空港快速": "rapid",
  "区間快速": "semi_rapid",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 6,
  baseSectionSeconds: {
  "1": 330,
  "2": 240,
  "3": 120,
  "4": 90,
  "5": 150,
  "6": 60,
  "7": 120,
  "8": 180,
  "9": 60,
  "10": 90
},
};
