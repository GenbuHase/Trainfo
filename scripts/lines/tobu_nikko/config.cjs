// 東武日光線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_nikko',
  name: '東武日光線',
  stationsFilePath: 'src/data/lines/tobu_nikko/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_nikko/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_nikko/globalTimetable.json',
  },
  stations: [
  {
    "id": "TS-30",
    "name": "東武動物公園",
    "yahooStationId": "22079",
    "inGroupId": null,
    "outGroupId": "2741"
  },
  {
    "id": "TN-01",
    "name": "杉戸高野台",
    "yahooStationId": "22064",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-02",
    "name": "幸手",
    "yahooStationId": "22040",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-03",
    "name": "南栗橋",
    "yahooStationId": "22144",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-04",
    "name": "栗橋",
    "yahooStationId": "22030",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-05",
    "name": "新古河",
    "yahooStationId": "22054",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-06",
    "name": "柳生",
    "yahooStationId": "22159",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-07",
    "name": "板倉東洋大前",
    "yahooStationId": "29179",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-08",
    "name": "藤岡",
    "yahooStationId": "21817",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-09",
    "name": "静和",
    "yahooStationId": "21773",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-10",
    "name": "新大平下",
    "yahooStationId": "21778",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-11",
    "name": "栃木",
    "yahooStationId": "21800",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-12",
    "name": "新栃木",
    "yahooStationId": "21781",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-13",
    "name": "合戦場",
    "yahooStationId": "21747",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-14",
    "name": "家中",
    "yahooStationId": "21729",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-15",
    "name": "東武金崎",
    "yahooStationId": "21798",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-16",
    "name": "楡木",
    "yahooStationId": "21811",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-17",
    "name": "樅山",
    "yahooStationId": "21829",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-18",
    "name": "新鹿沼",
    "yahooStationId": "21779",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-19",
    "name": "北鹿沼",
    "yahooStationId": "21756",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-20",
    "name": "板荷",
    "yahooStationId": "21731",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-21",
    "name": "下小代",
    "yahooStationId": "21775",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-22",
    "name": "明神",
    "yahooStationId": "21824",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-23",
    "name": "下今市",
    "yahooStationId": "21774",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-24",
    "name": "上今市",
    "yahooStationId": "21751",
    "inGroupId": "2740",
    "outGroupId": "2741"
  },
  {
    "id": "TN-25",
    "name": "東武日光",
    "yahooStationId": "21799",
    "inGroupId": "2740",
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
  "25": 150
},
};
