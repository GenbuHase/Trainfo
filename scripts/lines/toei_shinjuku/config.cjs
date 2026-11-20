module.exports = {
  lineId: 'toei_shinjuku',
  name: '都営新宿線',
  stationsFilePath: 'src/data/lines/toei_shinjuku/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/toei_shinjuku/stationTimetables.json',
    globalTimetable: 'src/data/lines/toei_shinjuku/globalTimetable.json',
  },
  stations: [
  {
    "id": "S-01",
    "name": "新宿",
    "yahooStationId": "22741",
    "inGroupId": null,
    "outGroupId": "3401"
  },
  {
    "id": "S-02",
    "name": "新宿三丁目",
    "yahooStationId": "22743",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-03",
    "name": "曙橋",
    "yahooStationId": "22493",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-04",
    "name": "市ケ谷",
    "yahooStationId": "22520",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-05",
    "name": "九段下",
    "yahooStationId": "22645",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-06",
    "name": "神保町",
    "yahooStationId": "22756",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-07",
    "name": "小川町",
    "yahooStationId": "22572",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-08",
    "name": "岩本町",
    "yahooStationId": "22527",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-09",
    "name": "馬喰横山",
    "yahooStationId": "22919",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-10",
    "name": "浜町",
    "yahooStationId": "22913",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-11",
    "name": "森下",
    "yahooStationId": "23023",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-12",
    "name": "菊川",
    "yahooStationId": "22624",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-13",
    "name": "住吉",
    "yahooStationId": "22763",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-14",
    "name": "西大島",
    "yahooStationId": "22866",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-15",
    "name": "大島",
    "yahooStationId": "22561",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-16",
    "name": "東大島",
    "yahooStationId": "22927",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-17",
    "name": "船堀",
    "yahooStationId": "22965",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-18",
    "name": "一之江",
    "yahooStationId": "22521",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-19",
    "name": "瑞江",
    "yahooStationId": "22984",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-20",
    "name": "篠崎",
    "yahooStationId": "22711",
    "inGroupId": "3400",
    "outGroupId": "3401"
  },
  {
    "id": "S-21",
    "name": "本八幡",
    "yahooStationId": "22464",
    "inGroupId": "3400",
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
  "急行": "express",
  "各駅停車": "local",
  "普通": "local",
  "各停": "local"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 10,
  baseSectionSeconds: {
  "1": 60,
  "2": 120,
  "3": 120,
  "4": 120,
  "5": 60,
  "6": 60,
  "7": 60,
  "8": 60,
  "9": 60,
  "10": 60,
  "11": 60,
  "12": 60,
  "13": 90,
  "14": 60,
  "15": 90,
  "16": 120,
  "17": 150,
  "18": 120,
  "19": 120,
  "20": 240
},
};
