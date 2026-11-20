module.exports = {
  lineId: 'kominato',
  name: '小湊鉄道線',
  stationsFilePath: 'src/data/lines/kominato/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kominato/stationTimetables.json',
    globalTimetable: 'src/data/lines/kominato/globalTimetable.json',
  },
  stations: [
  {
    "id": "KMN-01",
    "name": "五井",
    "yahooStationId": "22302",
    "inGroupId": null,
    "outGroupId": "4851"
  },
  {
    "id": "KMN-02",
    "name": "上総村上",
    "yahooStationId": "22244",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-03",
    "name": "海士有木",
    "yahooStationId": "22184",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-04",
    "name": "上総三又",
    "yahooStationId": "22242",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-05",
    "name": "上総山田",
    "yahooStationId": "22245",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-06",
    "name": "光風台",
    "yahooStationId": "22295",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-07",
    "name": "馬立",
    "yahooStationId": "22204",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-08",
    "name": "上総牛久",
    "yahooStationId": "22231",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-09",
    "name": "上総川間",
    "yahooStationId": "22235",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-10",
    "name": "上総鶴舞",
    "yahooStationId": "22238",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-11",
    "name": "上総久保",
    "yahooStationId": "22237",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-12",
    "name": "高滝",
    "yahooStationId": "22344",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-13",
    "name": "里見",
    "yahooStationId": "22309",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-14",
    "name": "飯給",
    "yahooStationId": "22192",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-15",
    "name": "月崎",
    "yahooStationId": "22369",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-16",
    "name": "上総大久保",
    "yahooStationId": "22232",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-17",
    "name": "養老渓谷",
    "yahooStationId": "22476",
    "inGroupId": "4850",
    "outGroupId": "4851"
  },
  {
    "id": "KMN-18",
    "name": "上総中野",
    "yahooStationId": "22240",
    "inGroupId": "4850",
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
  "1": 210,
  "2": 240,
  "3": 150,
  "4": 120,
  "5": 150,
  "6": 150,
  "7": 330,
  "8": 150,
  "9": 120,
  "10": 150,
  "11": 150,
  "12": 150,
  "13": 150,
  "14": 180,
  "15": 210,
  "16": 210,
  "17": 330
},
};
