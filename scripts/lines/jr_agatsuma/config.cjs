module.exports = {
  lineId: 'jr_agatsuma',
  name: 'JR吾妻線',
  stationsFilePath: 'src/data/lines/jr_agatsuma/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_agatsuma/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_agatsuma/globalTimetable.json',
  },
  stations: [
  {
    "id": "AG-01",
    "name": "渋川",
    "yahooStationId": "21893",
    "inGroupId": null,
    "outGroupId": "881"
  },
  {
    "id": "AG-02",
    "name": "金島",
    "yahooStationId": "21863",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-03",
    "name": "祖母島",
    "yahooStationId": "21852",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-04",
    "name": "小野上",
    "yahooStationId": "21859",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-05",
    "name": "小野上温泉",
    "yahooStationId": "21860",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-06",
    "name": "市城",
    "yahooStationId": "21847",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-07",
    "name": "中之条",
    "yahooStationId": "21921",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-08",
    "name": "群馬原町",
    "yahooStationId": "21879",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-09",
    "name": "郷原",
    "yahooStationId": "21887",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-10",
    "name": "矢倉",
    "yahooStationId": "21958",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-11",
    "name": "岩島",
    "yahooStationId": "21849",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-12",
    "name": "川原湯温泉",
    "yahooStationId": "21869",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-13",
    "name": "長野原草津口",
    "yahooStationId": "21922",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-14",
    "name": "群馬大津",
    "yahooStationId": "21877",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-15",
    "name": "羽根尾",
    "yahooStationId": "21937",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-16",
    "name": "袋倉",
    "yahooStationId": "21942",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-17",
    "name": "万座・鹿沢口",
    "yahooStationId": "21950",
    "inGroupId": "880",
    "outGroupId": "881"
  },
  {
    "id": "AG-18",
    "name": "大前",
    "yahooStationId": "21857",
    "inGroupId": "880",
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
  "特急": "limited_exp",
  "草津・四万": "limited_exp",
  "普通": "regular",
  "各駅停車": "regular",
  "快速": "rapid",
  "アキュム": "regular"
},
  preserveAllStopsTypes: [],
  
  defaultCars: 4,
  baseSectionSeconds: {
  "1": 450,
  "2": 180,
  "3": 330,
  "4": 150,
  "5": 210,
  "6": 270,
  "7": 240,
  "8": 270,
  "9": 120,
  "10": 210,
  "11": 510,
  "12": 390,
  "13": 180,
  "14": 180,
  "15": 240,
  "16": 240,
  "17": 240
},
};
