// 東武伊勢崎線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_isesaki',
  name: '東武伊勢崎線',
  stationsFilePath: 'src/data/lines/tobu_isesaki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_isesaki/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_isesaki/globalTimetable.json',
  },
  stations: [
  {
    "id": "TSK-30",
    "name": "東武動物公園",
    "yahooStationId": "22079",
    "inGroupId": null,
    "outGroupId": "7671"
  },
  {
    "id": "TI-01",
    "name": "和戸",
    "yahooStationId": "22173",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-02",
    "name": "久喜",
    "yahooStationId": "22028",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-03",
    "name": "鷲宮",
    "yahooStationId": "22172",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-04",
    "name": "花崎",
    "yahooStationId": "22102",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-05",
    "name": "加須",
    "yahooStationId": "22004",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-06",
    "name": "南羽生",
    "yahooStationId": "22147",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-07",
    "name": "羽生",
    "yahooStationId": "22103",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-08",
    "name": "川俣",
    "yahooStationId": "21868",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-09",
    "name": "茂林寺前",
    "yahooStationId": "21956",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-10",
    "name": "館林",
    "yahooStationId": "21915",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-11",
    "name": "多々良",
    "yahooStationId": "21914",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-12",
    "name": "県",
    "yahooStationId": "21725",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-13",
    "name": "福居",
    "yahooStationId": "21816",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-14",
    "name": "東武和泉",
    "yahooStationId": "21796",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-15",
    "name": "足利市",
    "yahooStationId": "21728",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-16",
    "name": "野州山辺",
    "yahooStationId": "21833",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-17",
    "name": "韮川",
    "yahooStationId": "21933",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-18",
    "name": "太田",
    "yahooStationId": "21856",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-19",
    "name": "細谷",
    "yahooStationId": "21944",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-20",
    "name": "木崎",
    "yahooStationId": "21870",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-21",
    "name": "世良田",
    "yahooStationId": "21909",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-22",
    "name": "境町",
    "yahooStationId": "21889",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-23",
    "name": "剛志",
    "yahooStationId": "21885",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-24",
    "name": "新伊勢崎",
    "yahooStationId": "21896",
    "inGroupId": "7670",
    "outGroupId": "7671"
  },
  {
    "id": "TI-25",
    "name": "伊勢崎",
    "yahooStationId": "21845",
    "inGroupId": "7670",
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
  "16": 150,
  "17": 150,
  "18": 150,
  "19": 150,
  "20": 150,
  "21": 150,
  "22": 150,
  "23": 150,
  "24": 150,
  "25": 150
},
  boundaryPassingRules: [
    {
      boundaryStationId: 'TSK-30',
      throughStations: [
        '浅草', 'とうきょうスカイツリー', '曳舟', '北千住', '春日部', 'せんげん台', '越谷', '新越谷', '草加'
      ]
    }
  ],
};
