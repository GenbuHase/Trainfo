// JR東海道新幹線 Yahoo! 路線情報スクレイパー設定
const SYSTEM_NAMES = ["のぞみ","ひかり","こだま"];

module.exports = {
  lineId: "tokaido_shinkansen",
  name: "JR東海道新幹線",
  stationsFilePath: "src/data/lines/tokaido_shinkansen/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/tokaido_shinkansen/stationTimetables.json",
    "globalTimetable": "src/data/lines/tokaido_shinkansen/globalTimetable.json"
  },
  stations: [
    {
      "id": "TKS-01",
      "name": "東京",
      "yahooStationId": "22828",
      "inGroupId": null,
      "outGroupId": "1341"
    },
    {
      "id": "TKS-02",
      "name": "品川",
      "yahooStationId": "22709",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-03",
      "name": "新横浜",
      "yahooStationId": "23212",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-04",
      "name": "小田原",
      "yahooStationId": "23098",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-05",
      "name": "熱海",
      "yahooStationId": "23452",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-06",
      "name": "三島",
      "yahooStationId": "23636",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-07",
      "name": "新富士",
      "yahooStationId": "23559",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-08",
      "name": "静岡",
      "yahooStationId": "23545",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-09",
      "name": "掛川",
      "yahooStationId": "23500",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-10",
      "name": "浜松",
      "yahooStationId": "23604",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-11",
      "name": "豊橋",
      "yahooStationId": "25063",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-12",
      "name": "三河安城",
      "yahooStationId": "25175",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-13",
      "name": "名古屋",
      "yahooStationId": "25077",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-14",
      "name": "岐阜羽島",
      "yahooStationId": "24431",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-15",
      "name": "米原",
      "yahooStationId": "25565",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-16",
      "name": "京都",
      "yahooStationId": "25647",
      "inGroupId": "1340",
      "outGroupId": "1341"
    },
    {
      "id": "TKS-17",
      "name": "新大阪",
      "yahooStationId": "25978",
      "inGroupId": "1340",
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
    "こだま": "kodama"
  },
  preserveAllStopsTypes: [
    "nozomi",
    "hikari",
    "kodama"
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
    "16": 360
  },
};
