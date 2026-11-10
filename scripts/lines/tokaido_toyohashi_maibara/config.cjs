// JR東海道本線（豊橋～米原） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: "tokaido_toyohashi_maibara",
  name: "JR東海道本線（豊橋～米原）",
  stationsFilePath: "src/data/lines/tokaido_toyohashi_maibara/stations.ts",
  outputPaths: {
    "stationTimetables": "src/data/lines/tokaido_toyohashi_maibara/stationTimetables.json",
    "globalTimetable": "src/data/lines/tokaido_toyohashi_maibara/globalTimetable.json"
  },
  stations: [
    {
      "id": "CA-42",
      "name": "豊橋",
      "yahooStationId": "25063",
      "inGroupId": null,
      "outGroupId": "1371"
    },
    {
      "id": "CA-43",
      "name": "西小坂井",
      "yahooStationId": "25092",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-44",
      "name": "愛知御津",
      "yahooStationId": "24782",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-45",
      "name": "三河大塚",
      "yahooStationId": "25178",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-46",
      "name": "三河三谷",
      "yahooStationId": "25196",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-47",
      "name": "蒲郡",
      "yahooStationId": "24899",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-48",
      "name": "三河塩津",
      "yahooStationId": "25185",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-49",
      "name": "三ヶ根",
      "yahooStationId": "24957",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-50",
      "name": "幸田",
      "yahooStationId": "24924",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-51",
      "name": "相見",
      "yahooStationId": "29698",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-52",
      "name": "岡崎",
      "yahooStationId": "24851",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-53",
      "name": "西岡崎",
      "yahooStationId": "25090",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-54",
      "name": "安城",
      "yahooStationId": "24803",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-55",
      "name": "三河安城",
      "yahooStationId": "25175",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-56",
      "name": "東刈谷",
      "yahooStationId": "25113",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-57",
      "name": "野田新町",
      "yahooStationId": "29591",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-58",
      "name": "刈谷",
      "yahooStationId": "24892",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-59",
      "name": "逢妻",
      "yahooStationId": "24783",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-60",
      "name": "大府",
      "yahooStationId": "24848",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-61",
      "name": "共和",
      "yahooStationId": "24901",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-62",
      "name": "南大高",
      "yahooStationId": "29659",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-63",
      "name": "大高",
      "yahooStationId": "24846",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-64",
      "name": "笠寺",
      "yahooStationId": "24870",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-65",
      "name": "熱田",
      "yahooStationId": "24798",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-66",
      "name": "金山",
      "yahooStationId": "24877",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-67",
      "name": "尾頭橋",
      "yahooStationId": "29038",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-68",
      "name": "名古屋",
      "yahooStationId": "25077",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-69",
      "name": "枇杷島",
      "yahooStationId": "25131",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-70",
      "name": "清洲",
      "yahooStationId": "24910",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-71",
      "name": "稲沢",
      "yahooStationId": "24810",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-72",
      "name": "尾張一宮",
      "yahooStationId": "24862",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-73",
      "name": "木曽川",
      "yahooStationId": "24902",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-74",
      "name": "岐阜",
      "yahooStationId": "24429",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-75",
      "name": "西岐阜",
      "yahooStationId": "24527",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-76",
      "name": "穂積",
      "yahooStationId": "24566",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-77",
      "name": "大垣",
      "yahooStationId": "24388",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-78",
      "name": "垂井",
      "yahooStationId": "24499",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-79",
      "name": "関ケ原",
      "yahooStationId": "24482",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-80",
      "name": "柏原",
      "yahooStationId": "25501",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-81",
      "name": "近江長岡",
      "yahooStationId": "25494",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-82",
      "name": "醒ヶ井",
      "yahooStationId": "25525",
      "inGroupId": "1370",
      "outGroupId": "1371"
    },
    {
      "id": "CA-83",
      "name": "米原",
      "yahooStationId": "25565",
      "inGroupId": "1370",
      "outGroupId": null
    }
  ],
  trainTypeMap: {
    "特別快速": "special_rapid",
    "新快速": "new_rapid",
    "快速": "rapid",
    "区間快速": "section_rapid",
    "普通": "local",
    "各駅停車": "local",
    "ホームライナー": "homeliner",
    "特急": "limitedExp",
    "しらさぎ": "limitedExp",
    "ひだ": "limitedExp",
    "サンライズ瀬戸": "limitedExp",
    "サンライズ出雲": "limitedExp"
  },
  defaultCars: 6,
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
    "41": 180
  },
  branchExclusionRules: [
    {
      direction: 'outbound',
      ifNotContains: ['CA-78'], // 垂井駅に停車しない下り列車（特急しらさぎ・ひだ等）
      excludeStations: ['CA-78'], // 垂井駅を通過駅から除外、大垣〜関ケ原間を新垂井線経由（CA-77_CA-79_shintarui）で走行
    },
  ],
};
