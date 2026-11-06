// JR山陽新幹線 Yahoo! 路線情報スクレイパー設定
const SYSTEM_NAMES = ["のぞみ","ひかり","こだま","みずほ","さくら","つばめ"];

module.exports = {
  lineId: "sanyo_shinkansen",
  name: "JR山陽新幹線",
  stationsFilePath: "src/data/lines/sanyo_shinkansen/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/sanyo_shinkansen/stationTimetables.json",
    "globalTimetable": "src/data/lines/sanyo_shinkansen/globalTimetable.json"
  },
  stations: [
    {
      "id": "SYS-01",
      "name": "新大阪",
      "yahooStationId": "25978",
      "inGroupId": null,
      "outGroupId": "1461"
    },
    {
      "id": "SYS-02",
      "name": "新神戸",
      "yahooStationId": "26400",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-03",
      "name": "西明石",
      "yahooStationId": "26478",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-04",
      "name": "姫路",
      "yahooStationId": "26524",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-05",
      "name": "相生",
      "yahooStationId": "26242",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-06",
      "name": "岡山",
      "yahooStationId": "27051",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-07",
      "name": "新倉敷",
      "yahooStationId": "27090",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-08",
      "name": "福山",
      "yahooStationId": "27388",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-09",
      "name": "新尾道",
      "yahooStationId": "27294",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-10",
      "name": "三原",
      "yahooStationId": "27417",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-11",
      "name": "東広島",
      "yahooStationId": "27358",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-12",
      "name": "広島",
      "yahooStationId": "27365",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-13",
      "name": "新岩国",
      "yahooStationId": "27505",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-14",
      "name": "徳山",
      "yahooStationId": "27528",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-15",
      "name": "新山口",
      "yahooStationId": "27468",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-16",
      "name": "厚狭",
      "yahooStationId": "27444",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-17",
      "name": "新下関",
      "yahooStationId": "27506",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-18",
      "name": "小倉",
      "yahooStationId": "28155",
      "inGroupId": "1460",
      "outGroupId": "1461"
    },
    {
      "id": "SYS-19",
      "name": "博多",
      "yahooStationId": "28283",
      "inGroupId": "1460",
      "outGroupId": null
    }
  ],
  shouldExcludeDeparture: ({ rawKindName }) => {
    return !SYSTEM_NAMES.some(name => rawKindName.includes(name));
  },
  shouldExcludeTrip: (trainDetail) => {
    const name = trainDetail.displayName || '';
    return !SYSTEM_NAMES.some(trainName => name.includes(trainName));
  },
  trainTypeMap: {
    "のぞみ": "nozomi",
    "ひかり": "hikari",
    "こだま": "kodama",
    "みずほ": "mizuho",
    "さくら": "sakura",
    "つばめ": "tsubame"
  },
  preserveAllStopsTypes: [
    "nozomi",
    "hikari",
    "kodama",
    "mizuho",
    "sakura",
    "tsubame"
  ],
  defaultCars: 16,
  baseSectionSeconds: {
    "1": 360,
    "2": 360,
    "3": 360,
    "4": 360,
    "5": 360,
    "6": 360,
    "7": 360,
    "8": 360,
    "9": 360,
    "10": 360,
    "11": 360,
    "12": 360,
    "13": 360,
    "14": 360,
    "15": 360,
    "16": 360,
    "17": 360,
    "18": 360
  },
};
