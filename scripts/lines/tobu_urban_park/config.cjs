// 東武アーバンパークライン Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_urban_park',
  name: '東武アーバンパークライン',
  stationsFilePath: 'src/data/lines/tobu_urban_park/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_urban_park/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_urban_park/globalTimetable.json',
  },
  stations: [
  {
    "id": "TUP-01",
    "name": "大宮",
    "yahooStationId": "21987",
    "inGroupId": null,
    "outGroupId": "2771"
  },
  {
    "id": "TUP-02",
    "name": "北大宮",
    "yahooStationId": "22018",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-03",
    "name": "大宮公園",
    "yahooStationId": "21988",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-04",
    "name": "大和田",
    "yahooStationId": "21989",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-05",
    "name": "七里",
    "yahooStationId": "22088",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-06",
    "name": "岩槻",
    "yahooStationId": "21979",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-07",
    "name": "東岩槻",
    "yahooStationId": "22108",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-08",
    "name": "豊春",
    "yahooStationId": "22083",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-09",
    "name": "八木崎",
    "yahooStationId": "22160",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-10",
    "name": "春日部",
    "yahooStationId": "22002",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-11",
    "name": "藤の牛島",
    "yahooStationId": "22123",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-12",
    "name": "南桜井",
    "yahooStationId": "22146",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-13",
    "name": "川間",
    "yahooStationId": "22253",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-14",
    "name": "七光台",
    "yahooStationId": "22386",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-15",
    "name": "清水公園",
    "yahooStationId": "22316",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-16",
    "name": "愛宕",
    "yahooStationId": "22180",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-17",
    "name": "野田市",
    "yahooStationId": "22402",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-18",
    "name": "梅郷",
    "yahooStationId": "22205",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-19",
    "name": "運河",
    "yahooStationId": "22207",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-20",
    "name": "江戸川台",
    "yahooStationId": "22208",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-21",
    "name": "初石",
    "yahooStationId": "22403",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-22",
    "name": "流山おおたかの森",
    "yahooStationId": "29403",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-23",
    "name": "豊四季",
    "yahooStationId": "22378",
    "inGroupId": "2770",
    "outGroupId": "2771"
  },
  {
    "id": "TUP-24",
    "name": "柏",
    "yahooStationId": "22228",
    "inGroupId": "2770",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-25",
    "name": "新柏",
    "yahooStationId": "22325",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-26",
    "name": "増尾",
    "yahooStationId": "22441",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-27",
    "name": "逆井",
    "yahooStationId": "22304",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-28",
    "name": "高柳",
    "yahooStationId": "22347",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-29",
    "name": "六実",
    "yahooStationId": "22460",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-30",
    "name": "新鎌ヶ谷",
    "yahooStationId": "22326",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-31",
    "name": "鎌ヶ谷",
    "yahooStationId": "22249",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-32",
    "name": "馬込沢",
    "yahooStationId": "22440",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-33",
    "name": "塚田",
    "yahooStationId": "22367",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-34",
    "name": "新船橋",
    "yahooStationId": "22331",
    "inGroupId": "2780",
    "outGroupId": "2781"
  },
  {
    "id": "TUP-35",
    "name": "船橋",
    "yahooStationId": "22427",
    "inGroupId": "2780",
    "outGroupId": null
  }
],
  stationNameAliases: {},
  trainTypeMap: {
  "普通": "local",
  "各駅停車": "local",
  "区間準急": "section_semi",
  "準急": "semiExp",
  "区間急行": "section_exp",
  "急行": "express",
  "快速急行": "rapidExp",
  "快速": "rapid",
  "区間快速": "section_rapid",
  "ＴＨライナー": "th_liner",
  "THライナー": "th_liner",
  "ライナー": "th_liner",
  "特急": "limitedExp",
  "スペーシア": "limitedExp",
  "リバティ": "limitedExp",
  "けごん": "limitedExp",
  "きぬ": "limitedExp",
  "りょうもう": "limitedExp",
  "日光": "limitedExp",
  "きぬがわ": "limitedExp",
  "会津": "limitedExp",
  "ＳＬ大樹": "sl_taiju",
  "SL大樹": "sl_taiju",
  "ＳＬふたら": "sl_taiju",
  "SLふたら": "sl_taiju",
  "ＡＩＺＵマウントエクスプレス": "aizu_mount_exp",
  "AIZUマウントエクスプレス": "aizu_mount_exp",
  "お座敷": "aizu_ozeto",
  "展望列車": "aizu_ozeto",
  "会津浪漫": "aizu_ozeto"
},
  preserveAllStopsTypes: ['th_liner', 'sl_taiju', 'aizu_mount_exp', 'aizu_ozeto'],
  defaultCars: 6,
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
  "16": 150,
  "17": 150,
  "18": 150,
  "19": 150,
  "20": 150,
  "21": 150,
  "22": 150,
  "23": 150,
  "24": 150,
  "25": 150,
  "26": 150,
  "27": 150,
  "28": 150,
  "29": 150,
  "30": 150,
  "31": 150,
  "32": 150,
  "33": 150,
  "34": 150
},
};
