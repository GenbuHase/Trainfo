module.exports = {
  lineId: 'new_shuttle',
  name: '埼玉新都市交通伊奈線（ニューシャトル）',
  stationsFilePath: 'src/data/lines/new_shuttle/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/new_shuttle/stationTimetables.json',
    globalTimetable: 'src/data/lines/new_shuttle/globalTimetable.json',
  },
  stations: [
  {
    "id": "NS-01",
    "name": "大宮",
    "yahooStationId": "21987",
    "inGroupId": null,
    "outGroupId": "4761"
  },
  {
    "id": "NS-02",
    "name": "鉄道博物館",
    "yahooStationId": "21984",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-03",
    "name": "加茂宮",
    "yahooStationId": "22009",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-04",
    "name": "東宮原",
    "yahooStationId": "22116",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-05",
    "name": "今羽",
    "yahooStationId": "22039",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-06",
    "name": "吉野原",
    "yahooStationId": "22166",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-07",
    "name": "原市",
    "yahooStationId": "22105",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-08",
    "name": "沼南",
    "yahooStationId": "22046",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-09",
    "name": "丸山",
    "yahooStationId": "22136",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-10",
    "name": "志久",
    "yahooStationId": "22049",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-11",
    "name": "伊奈中央",
    "yahooStationId": "21975",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-12",
    "name": "羽貫",
    "yahooStationId": "22104",
    "inGroupId": "4760",
    "outGroupId": "4761"
  },
  {
    "id": "NS-13",
    "name": "内宿",
    "yahooStationId": "21980",
    "inGroupId": "4760",
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
  "2": 150,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 90,
  "10": 90,
  "11": 90,
  "12": 90
},
};
