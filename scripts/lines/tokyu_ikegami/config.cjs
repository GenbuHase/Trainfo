module.exports = {
  lineId: 'tokyu_ikegami',
  name: '東急池上線',
  stationsFilePath: 'src/data/lines/tokyu_ikegami/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_ikegami/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_ikegami/globalTimetable.json',
  },
  stations: [
  {
    "id": "IK-01",
    "name": "五反田",
    "yahooStationId": "22691",
    "inGroupId": null,
    "outGroupId": "3181"
  },
  {
    "id": "IK-02",
    "name": "大崎広小路",
    "yahooStationId": "22560",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-03",
    "name": "戸越銀座",
    "yahooStationId": "22833",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-04",
    "name": "荏原中延",
    "yahooStationId": "22546",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-05",
    "name": "旗の台",
    "yahooStationId": "22904",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-06",
    "name": "長原",
    "yahooStationId": "22858",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-07",
    "name": "洗足池",
    "yahooStationId": "22780",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-08",
    "name": "石川台",
    "yahooStationId": "22514",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-09",
    "name": "雪が谷大塚",
    "yahooStationId": "23037",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-10",
    "name": "御嶽山",
    "yahooStationId": "22590",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-11",
    "name": "久が原",
    "yahooStationId": "22643",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-12",
    "name": "千鳥町",
    "yahooStationId": "22819",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-13",
    "name": "池上",
    "yahooStationId": "22510",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-14",
    "name": "蓮沼",
    "yahooStationId": "22901",
    "inGroupId": "3180",
    "outGroupId": "3181"
  },
  {
    "id": "IK-15",
    "name": "蒲田",
    "yahooStationId": "22602",
    "inGroupId": "3180",
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
  
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 60,
  "2": 90,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 60,
  "10": 60,
  "11": 60,
  "12": 90,
  "13": 90,
  "14": 60
},
};
