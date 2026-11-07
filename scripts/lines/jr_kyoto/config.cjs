// JR京都線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: "jr_kyoto",
  name: "JR京都線",
  stationsFilePath: "src/data/lines/jr_kyoto/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/jr_kyoto/stationTimetables.json",
    "globalTimetable": "src/data/lines/jr_kyoto/globalTimetable.json"
  },
  stations: [
    {
      "id": "JR-A31",
      "name": "京都",
      "yahooStationId": "25647",
      "inGroupId": null,
      "outGroupId": "1771"
    },
    {
      "id": "JR-A32",
      "name": "西大路",
      "yahooStationId": "25735",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A33",
      "name": "桂川",
      "yahooStationId": "29648",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A34",
      "name": "向日町",
      "yahooStationId": "25777",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A35",
      "name": "長岡京",
      "yahooStationId": "25663",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A36",
      "name": "山崎",
      "yahooStationId": "25785",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A37",
      "name": "島本",
      "yahooStationId": "29607",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A38",
      "name": "高槻",
      "yahooStationId": "26018",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A39",
      "name": "摂津富田",
      "yahooStationId": "25998",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A40",
      "name": "JR総持寺",
      "yahooStationId": "29788",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A41",
      "name": "茨木",
      "yahooStationId": "25834",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A42",
      "name": "千里丘",
      "yahooStationId": "26004",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A43",
      "name": "岸辺",
      "yahooStationId": "25906",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A44",
      "name": "吹田",
      "yahooStationId": "25986",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A45",
      "name": "東淀川",
      "yahooStationId": "26149",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A46",
      "name": "新大阪",
      "yahooStationId": "25978",
      "inGroupId": "1770",
      "outGroupId": "1771"
    },
    {
      "id": "JR-A47",
      "name": "大阪",
      "yahooStationId": "25853",
      "inGroupId": "1770",
      "outGroupId": null
    }
  ],
  trainTypeMap: {
    "新快速": "new_rapid",
    "快速": "rapid",
    "普通": "local",
    "各駅停車": "local",
    "特急": "limitedExp",
    "はるか": "limitedExp",
    "サンダーバード": "limitedExp",
    "くろしお": "limitedExp",
    "スーパーはくと": "limitedExp",
    "びわこエクスプレス": "limitedExp",
    "らくラクびわこ": "limitedExp",
    "ひだ": "limitedExp",
    "サンライズ瀬戸": "limitedExp",
    "サンライズ出雲": "limitedExp"
  },
  defaultCars: 8,
  baseSectionSeconds: {
    "1": 150,
    "2": 150,
    "3": 150,
    "4": 150,
    "5": 150,
    "6": 150,
    "7": 150,
    "8": 150,
    "9": 150,
    "10": 150,
    "11": 150,
    "12": 150,
    "13": 150,
    "14": 150,
    "15": 150,
    "16": 150
  },
};
