module.exports = {
  lineId: 'nagano_dentetsu',
  name: '長野電鉄長野線',
  stationsFilePath: 'src/data/lines/nagano_dentetsu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/nagano_dentetsu/stationTimetables.json',
    globalTimetable: 'src/data/lines/nagano_dentetsu/globalTimetable.json',
  },
  stations: [
  {
    "id": "NGD-01",
    "name": "長野",
    "yahooStationId": "24282",
    "inGroupId": null,
    "outGroupId": "5191"
  },
  {
    "id": "NGD-02",
    "name": "市役所前",
    "yahooStationId": "24236",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-03",
    "name": "権堂",
    "yahooStationId": "24192",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-04",
    "name": "善光寺下",
    "yahooStationId": "24245",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-05",
    "name": "本郷",
    "yahooStationId": "24321",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-06",
    "name": "桐原",
    "yahooStationId": "24182",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-07",
    "name": "信濃吉田",
    "yahooStationId": "24224",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-08",
    "name": "朝陽",
    "yahooStationId": "24101",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-09",
    "name": "附属中学前",
    "yahooStationId": "24316",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-10",
    "name": "柳原",
    "yahooStationId": "24351",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-11",
    "name": "村山",
    "yahooStationId": "24342",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-12",
    "name": "日野",
    "yahooStationId": "24310",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-13",
    "name": "須坂",
    "yahooStationId": "24241",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-14",
    "name": "北須坂",
    "yahooStationId": "24173",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-15",
    "name": "小布施",
    "yahooStationId": "24147",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-16",
    "name": "都住",
    "yahooStationId": "24264",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-17",
    "name": "桜沢",
    "yahooStationId": "24197",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-18",
    "name": "延徳",
    "yahooStationId": "24135",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-19",
    "name": "信州中野",
    "yahooStationId": "24238",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-20",
    "name": "中野松川",
    "yahooStationId": "24281",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-21",
    "name": "信濃竹原",
    "yahooStationId": "24219",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-22",
    "name": "夜間瀬",
    "yahooStationId": "24357",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-23",
    "name": "上条",
    "yahooStationId": "24159",
    "inGroupId": "5190",
    "outGroupId": "5191"
  },
  {
    "id": "NGD-24",
    "name": "湯田中",
    "yahooStationId": "24355",
    "inGroupId": "5190",
    "outGroupId": null
  }
],
  stationNameAliases: {},
  trainTypeMap: {
  "特急": "limited_exp",
  "A特急": "limited_exp",
  "B特急": "limited_exp",
  "S特急": "limited_exp",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 90,
  "2": 90,
  "3": 90,
  "4": 90,
  "5": 90,
  "6": 90,
  "7": 150,
  "8": 90,
  "9": 90,
  "10": 180,
  "11": 90,
  "12": 120,
  "13": 210,
  "14": 210,
  "15": 90,
  "16": 210,
  "17": 150,
  "18": 180,
  "19": 120,
  "20": 180,
  "21": 90,
  "22": 120,
  "23": 120
},
};
