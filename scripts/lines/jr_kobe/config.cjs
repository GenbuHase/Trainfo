// JR神戸線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: "jr_kobe",
  name: "JR神戸線",
  stationsFilePath: "src/data/lines/jr_kobe/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/jr_kobe/stationTimetables.json",
    "globalTimetable": "src/data/lines/jr_kobe/globalTimetable.json"
  },
  stations: [
    {
      "id": "JR-A47",
      "name": "大阪",
      "yahooStationId": "25853",
      "inGroupId": null,
      "outGroupId": "1801"
    },
    {
      "id": "JR-A48",
      "name": "塚本",
      "yahooStationId": "26046",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A49",
      "name": "尼崎",
      "yahooStationId": "26259",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A50",
      "name": "立花",
      "yahooStationId": "26439",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A51",
      "name": "甲子園口",
      "yahooStationId": "26351",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A52",
      "name": "西宮",
      "yahooStationId": "26486",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A53",
      "name": "さくら夙川",
      "yahooStationId": "29592",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A54",
      "name": "芦屋",
      "yahooStationId": "26254",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A55",
      "name": "甲南山手",
      "yahooStationId": "29108",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A56",
      "name": "摂津本山",
      "yahooStationId": "26415",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A57",
      "name": "住吉",
      "yahooStationId": "26413",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A58",
      "name": "六甲道",
      "yahooStationId": "26591",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A59",
      "name": "摩耶",
      "yahooStationId": "29769",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A60",
      "name": "灘",
      "yahooStationId": "26470",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A61",
      "name": "三ノ宮",
      "yahooStationId": "26375",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A62",
      "name": "元町",
      "yahooStationId": "26574",
      "inGroupId": "1800",
      "outGroupId": "1801"
    },
    {
      "id": "JR-A63",
      "name": "神戸",
      "yahooStationId": "26357",
      "inGroupId": "1800",
      "outGroupId": null
    }
  ],
  trainTypeMap: {
    "新快速": "special_rapid",
    "快速": "rapid",
    "普通": "local",
    "各駅停車": "local",
    "特急": "limitedExp",
    "スーパーはくと": "limitedExp",
    "はまかぜ": "limitedExp",
    "らくラクはりま": "limitedExp",
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
