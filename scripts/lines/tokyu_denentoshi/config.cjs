module.exports = {
  lineId: 'tokyu_denentoshi',
  name: '東急田園都市線',
  stationsFilePath: 'src/data/lines/tokyu_denentoshi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tokyu_denentoshi/stationTimetables.json',
    globalTimetable: 'src/data/lines/tokyu_denentoshi/globalTimetable.json',
  },
  stations: [
  {
    "id": "DT-01",
    "name": "渋谷",
    "yahooStationId": "22715",
    "inGroupId": null,
    "outGroupId": "3161"
  },
  {
    "id": "DT-02",
    "name": "池尻大橋",
    "yahooStationId": "22511",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-03",
    "name": "三軒茶屋",
    "yahooStationId": "22703",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-04",
    "name": "駒沢大学",
    "yahooStationId": "22684",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-05",
    "name": "桜新町",
    "yahooStationId": "22695",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-06",
    "name": "用賀",
    "yahooStationId": "23039",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-07",
    "name": "二子玉川",
    "yahooStationId": "22958",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-08",
    "name": "つくし野",
    "yahooStationId": "22822",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-09",
    "name": "すずかけ台",
    "yahooStationId": "22762",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-10",
    "name": "南町田グランベリーパーク",
    "yahooStationId": "22998",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-11",
    "name": "二子新地",
    "yahooStationId": "23309",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-12",
    "name": "高津",
    "yahooStationId": "23226",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-13",
    "name": "溝の口",
    "yahooStationId": "23328",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-14",
    "name": "梶が谷",
    "yahooStationId": "23106",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-15",
    "name": "宮崎台",
    "yahooStationId": "23338",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-16",
    "name": "宮前平",
    "yahooStationId": "23340",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-17",
    "name": "鷺沼",
    "yahooStationId": "23178",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-18",
    "name": "たまプラーザ",
    "yahooStationId": "23228",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-19",
    "name": "あざみ野",
    "yahooStationId": "23058",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-20",
    "name": "江田",
    "yahooStationId": "23085",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-21",
    "name": "市が尾",
    "yahooStationId": "23074",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-22",
    "name": "藤が丘",
    "yahooStationId": "23303",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-23",
    "name": "青葉台",
    "yahooStationId": "23056",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-24",
    "name": "田奈",
    "yahooStationId": "23227",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-25",
    "name": "長津田",
    "yahooStationId": "23260",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-26",
    "name": "つきみ野",
    "yahooStationId": "23236",
    "inGroupId": "3160",
    "outGroupId": "3161"
  },
  {
    "id": "DT-27",
    "name": "中央林間",
    "yahooStationId": "23231",
    "inGroupId": "3160",
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
  
  defaultCars: 10,
  baseSectionSeconds: {
  "1": 150,
  "2": 120,
  "3": 120,
  "4": 120,
  "5": 90,
  "6": 150,
  "7": 1380,
  "8": 90,
  "9": 90,
  "10": 1530,
  "11": 60,
  "12": 60,
  "13": 60,
  "14": 120,
  "15": 60,
  "16": 90,
  "17": 120,
  "18": 90,
  "19": 90,
  "20": 90,
  "21": 120,
  "22": 90,
  "23": 120,
  "24": 90,
  "25": 390,
  "26": 90
},
};
