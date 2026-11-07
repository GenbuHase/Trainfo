// JR東海道本線（熱海～豊橋） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: "tokaido_atami_toyohashi",
  name: "JR東海道本線（熱海～豊橋）",
  stationsFilePath: "src/data/lines/tokaido_atami_toyohashi/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/tokaido_atami_toyohashi/stationTimetables.json",
    "globalTimetable": "src/data/lines/tokaido_atami_toyohashi/globalTimetable.json"
  },
  stations: [
    {
      "id": "CA-00",
      "name": "熱海",
      "yahooStationId": "23452",
      "inGroupId": null,
      "outGroupId": "1361"
    },
    {
      "id": "CA-01",
      "name": "函南",
      "yahooStationId": "23515",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-02",
      "name": "三島",
      "yahooStationId": "23636",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-03",
      "name": "沼津",
      "yahooStationId": "23600",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-04",
      "name": "片浜",
      "yahooStationId": "23503",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-05",
      "name": "原",
      "yahooStationId": "23607",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-06",
      "name": "東田子の浦",
      "yahooStationId": "23611",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-07",
      "name": "吉原",
      "yahooStationId": "23650",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-08",
      "name": "富士",
      "yahooStationId": "23619",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-09",
      "name": "富士川",
      "yahooStationId": "23622",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-10",
      "name": "新蒲原",
      "yahooStationId": "23554",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-11",
      "name": "蒲原",
      "yahooStationId": "23516",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-12",
      "name": "由比",
      "yahooStationId": "23647",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-13",
      "name": "興津",
      "yahooStationId": "23493",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-14",
      "name": "清水",
      "yahooStationId": "23548",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-15",
      "name": "草薙",
      "yahooStationId": "23527",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-16",
      "name": "東静岡",
      "yahooStationId": "29231",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-17",
      "name": "静岡",
      "yahooStationId": "23545",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-18",
      "name": "安倍川",
      "yahooStationId": "23454",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-19",
      "name": "用宗",
      "yahooStationId": "23645",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-20",
      "name": "焼津",
      "yahooStationId": "23646",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-21",
      "name": "西焼津",
      "yahooStationId": "23596",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-22",
      "name": "藤枝",
      "yahooStationId": "23620",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-23",
      "name": "六合",
      "yahooStationId": "23653",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-24",
      "name": "島田",
      "yahooStationId": "23547",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-25",
      "name": "金谷",
      "yahooStationId": "23505",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-26",
      "name": "菊川",
      "yahooStationId": "23523",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-27",
      "name": "掛川",
      "yahooStationId": "23500",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-28",
      "name": "愛野",
      "yahooStationId": "29357",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-29",
      "name": "袋井",
      "yahooStationId": "23618",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-30",
      "name": "御厨",
      "yahooStationId": "29826",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-31",
      "name": "磐田",
      "yahooStationId": "23475",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-32",
      "name": "豊田町",
      "yahooStationId": "23586",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-33",
      "name": "天竜川",
      "yahooStationId": "23582",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-34",
      "name": "浜松",
      "yahooStationId": "23604",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-35",
      "name": "高塚",
      "yahooStationId": "23571",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-36",
      "name": "舞阪",
      "yahooStationId": "23631",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-37",
      "name": "弁天島",
      "yahooStationId": "23628",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-38",
      "name": "新居町",
      "yahooStationId": "23455",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-39",
      "name": "鷲津",
      "yahooStationId": "23654",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-40",
      "name": "新所原",
      "yahooStationId": "23557",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-41",
      "name": "二川",
      "yahooStationId": "25144",
      "inGroupId": "1360",
      "outGroupId": "1361"
    },
    {
      "id": "CA-42",
      "name": "豊橋",
      "yahooStationId": "25063",
      "inGroupId": "1360",
      "outGroupId": null
    }
  ],
  trainTypeMap: {
    "普通": "local",
    "各駅停車": "local",
    "快速": "rapid",
    "ホームライナー": "homeliner",
    "特急": "limitedExp",
    "踊り子": "limitedExp",
    "サフィール踊り子": "limitedExp",
    "ふじかわ": "limitedExp",
    "サンライズ瀬戸": "limitedExp",
    "サンライズ出雲": "limitedExp"
  },
  defaultCars: 3,
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
    "19": 180,
    "20": 180,
    "21": 180,
    "22": 180,
    "23": 180,
    "24": 180,
    "25": 180,
    "26": 180,
    "27": 180,
    "28": 180,
    "29": 180,
    "30": 180,
    "31": 180,
    "32": 180,
    "33": 180,
    "34": 180,
    "35": 180,
    "36": 180,
    "37": 180,
    "38": 180,
    "39": 180,
    "40": 180,
    "41": 180,
    "42": 180
  },
};
