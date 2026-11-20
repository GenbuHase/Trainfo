module.exports = {
  lineId: 'hokuso',
  name: '北総鉄道北総線',
  stationsFilePath: 'src/data/lines/hokuso/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hokuso/stationTimetables.json',
    globalTimetable: 'src/data/lines/hokuso/globalTimetable.json',
  },
  stations: [
  {
    "id": "HOK-01",
    "name": "京成高砂",
    "yahooStationId": "22665",
    "inGroupId": null,
    "outGroupId": "4801"
  },
  {
    "id": "HOK-02",
    "name": "新柴又",
    "yahooStationId": "22740",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-03",
    "name": "矢切",
    "yahooStationId": "23026",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-04",
    "name": "北国分",
    "yahooStationId": "22259",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-05",
    "name": "秋山",
    "yahooStationId": "22176",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-06",
    "name": "東松戸",
    "yahooStationId": "22416",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-07",
    "name": "松飛台",
    "yahooStationId": "22446",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-08",
    "name": "大町",
    "yahooStationId": "22217",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-09",
    "name": "新鎌ケ谷",
    "yahooStationId": "22326",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-10",
    "name": "西白井",
    "yahooStationId": "22397",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-11",
    "name": "白井",
    "yahooStationId": "22323",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-12",
    "name": "小室",
    "yahooStationId": "22301",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-13",
    "name": "千葉ニュータウン中央",
    "yahooStationId": "22365",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-14",
    "name": "印西牧の原",
    "yahooStationId": "29033",
    "inGroupId": "4800",
    "outGroupId": "4801"
  },
  {
    "id": "HOK-15",
    "name": "印旛日本医大",
    "yahooStationId": "29322",
    "inGroupId": "4800",
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
  "スカイライナー": "limited_exp",
  "モーニングライナー": "limited_exp",
  "イブニングライナー": "limited_exp",
  "イブニング": "limited_exp",
  "モーニング": "limited_exp",
  "ライナー": "limited_exp",
  "アクセス特急": "access_exp",
  "エアポート快特": "rapid_exp",
  "快速特急": "rapid_exp",
  "快特": "rapid_exp",
  "通勤特急": "commuter_limited_exp",
  "特急": "express",
  "快速": "rapid",
  "急行": "rapid",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 120,
  "2": 150,
  "3": 120,
  "4": 120,
  "5": 90,
  "6": 120,
  "7": 120,
  "8": 210,
  "9": 240,
  "10": 150,
  "11": 150,
  "12": 330,
  "13": 360,
  "14": 300
},
};
