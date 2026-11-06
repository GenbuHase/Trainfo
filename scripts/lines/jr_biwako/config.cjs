// JR琵琶湖線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: "jr_biwako",
  name: "JR琵琶湖線",
  stationsFilePath: "src/data/lines/jr_biwako/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/jr_biwako/stationTimetables.json",
    "globalTimetable": "src/data/lines/jr_biwako/globalTimetable.json"
  },
  stations: [
    {
      "id": "JR-A12",
      "name": "米原",
      "yahooStationId": "25565",
      "inGroupId": null,
      "outGroupId": "1591"
    },
    {
      "id": "JR-A13",
      "name": "彦根",
      "yahooStationId": "25558",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A14",
      "name": "南彦根",
      "yahooStationId": "25576",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A15",
      "name": "河瀬",
      "yahooStationId": "25507",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A16",
      "name": "稲枝",
      "yahooStationId": "25485",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A17",
      "name": "能登川",
      "yahooStationId": "25555",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A18",
      "name": "安土",
      "yahooStationId": "25474",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A19",
      "name": "近江八幡",
      "yahooStationId": "25495",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A20",
      "name": "篠原",
      "yahooStationId": "25530",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A21",
      "name": "野洲",
      "yahooStationId": "25579",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A22",
      "name": "守山",
      "yahooStationId": "25578",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A23",
      "name": "栗東",
      "yahooStationId": "25582",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A24",
      "name": "草津",
      "yahooStationId": "25514",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A25",
      "name": "南草津",
      "yahooStationId": "25574",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A26",
      "name": "瀬田",
      "yahooStationId": "25534",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A27",
      "name": "石山",
      "yahooStationId": "25482",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A28",
      "name": "膳所",
      "yahooStationId": "25535",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A29",
      "name": "大津",
      "yahooStationId": "25498",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A30",
      "name": "山科",
      "yahooStationId": "25786",
      "inGroupId": "1590",
      "outGroupId": "1591"
    },
    {
      "id": "JR-A31",
      "name": "京都",
      "yahooStationId": "25647",
      "inGroupId": "1590",
      "outGroupId": null
    }
  ],
  trainTypeMap: {
    "新快速": "special_rapid",
    "快速": "rapid",
    "普通": "local",
    "各駅停車": "local",
    "特急": "limitedExp",
    "はるか": "limitedExp",
    "びわこエクスプレス": "limitedExp",
    "らくラクびわこ": "limitedExp",
    "ひだ": "limitedExp",
    "サンライズ瀬戸": "limitedExp",
    "サンライズ出雲": "limitedExp"
  },
  defaultCars: 8,
  baseSectionSeconds: {
    "1": 180,
    "2": 180,
    "3": 180,
    "4": 180,
    "5": 180,
    "6": 180,
    "7": 180,
    "8": 180,
    "9": 180,
    "10": 180,
    "11": 180,
    "12": 180,
    "13": 180,
    "14": 180,
    "15": 180,
    "16": 180,
    "17": 180,
    "18": 180,
    "19": 180
  },
};
