module.exports = {
  lineId: 'tokyu_oimachi',
  name: '東急大井町線',
  stationsFilePath: 'src/data/lines/tokyu_oimachi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_oimachi/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_oimachi/globalTimetable.json',
  },
  stations: [
  {
    "id": "TOM-01",
    "name": "大井町",
    "yahooStationId": "22556",
    "inGroupId": null,
    "outGroupId": "3171"
  },
  {
    "id": "TOM-02",
    "name": "下神明",
    "yahooStationId": "22724",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-03",
    "name": "戸越公園",
    "yahooStationId": "22834",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-04",
    "name": "中延",
    "yahooStationId": "22853",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-05",
    "name": "荏原町",
    "yahooStationId": "22547",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-06",
    "name": "旗の台",
    "yahooStationId": "22904",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-07",
    "name": "北千束",
    "yahooStationId": "22631",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-08",
    "name": "大岡山",
    "yahooStationId": "22557",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-09",
    "name": "緑が丘",
    "yahooStationId": "22990",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-10",
    "name": "自由が丘",
    "yahooStationId": "22755",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-11",
    "name": "九品仏",
    "yahooStationId": "22647",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-12",
    "name": "尾山台",
    "yahooStationId": "22589",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-13",
    "name": "等々力",
    "yahooStationId": "22837",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-14",
    "name": "上野毛",
    "yahooStationId": "22608",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-15",
    "name": "二子玉川",
    "yahooStationId": "22958",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-16",
    "name": "二子新地",
    "yahooStationId": "23309",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-17",
    "name": "高津",
    "yahooStationId": "23226",
    "inGroupId": "3170",
    "outGroupId": "3171"
  },
  {
    "id": "TOM-18",
    "name": "溝の口",
    "yahooStationId": "23328",
    "inGroupId": "3170",
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
  "特急": "express",
  "急行": "express",
  "通勤特急": "express",
  "準急": "semi_exp",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 5,
  baseSectionSeconds: {
  "1": 60,
  "2": 60,
  "3": 60,
  "4": 60,
  "5": 60,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 90,
  "10": 60,
  "11": 60,
  "12": 60,
  "13": 60,
  "14": 90,
  "15": 60,
  "16": 60,
  "17": 60
},
};
