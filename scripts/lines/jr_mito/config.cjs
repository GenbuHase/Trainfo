module.exports = {
  lineId: 'jr_mito',
  name: 'JR水戸線',
  stationsFilePath: 'src/data/lines/jr_mito/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/jr_mito/stationTimetables.json',
    globalTimetable: 'src/data/lines/jr_mito/globalTimetable.json',
  },
  stations: [
  {
    "id": "MT-01",
    "name": "小山",
    "yahooStationId": "21746",
    "inGroupId": null,
    "outGroupId": "801"
  },
  {
    "id": "MT-02",
    "name": "小田林",
    "yahooStationId": "21607",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-03",
    "name": "結城",
    "yahooStationId": "21723",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-04",
    "name": "東結城",
    "yahooStationId": "21690",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-05",
    "name": "川島",
    "yahooStationId": "21621",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-06",
    "name": "玉戸",
    "yahooStationId": "21659",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-07",
    "name": "下館",
    "yahooStationId": "21644",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-08",
    "name": "新治",
    "yahooStationId": "21679",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-09",
    "name": "大和",
    "yahooStationId": "21722",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-10",
    "name": "岩瀬",
    "yahooStationId": "21592",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-11",
    "name": "羽黒",
    "yahooStationId": "21684",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-12",
    "name": "福原",
    "yahooStationId": "21703",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-13",
    "name": "稲田",
    "yahooStationId": "21589",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-14",
    "name": "笠間",
    "yahooStationId": "21609",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-15",
    "name": "宍戸",
    "yahooStationId": "21640",
    "inGroupId": "800",
    "outGroupId": "801"
  },
  {
    "id": "MT-16",
    "name": "友部",
    "yahooStationId": "21672",
    "inGroupId": "800",
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
  
  defaultCars: 5,
  baseSectionSeconds: {
  "1": 390,
  "2": 120,
  "3": 150,
  "4": 180,
  "5": 150,
  "6": 270,
  "7": 510,
  "8": 300,
  "9": 270,
  "10": 240,
  "11": 330,
  "12": 240,
  "13": 270,
  "14": 420,
  "15": 150
},
};
