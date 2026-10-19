// 東武佐野線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_sano',
  name: '東武佐野線',
  stationsFilePath: 'src/data/lines/tobu_sano/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_sano/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_sano/globalTimetable.json',
  },
  stations: [
  {
    "id": "TI-10",
    "name": "館林",
    "yahooStationId": "21915",
    "inGroupId": null,
    "outGroupId": "2701"
  },
  {
    "id": "TI-31",
    "name": "渡瀬",
    "yahooStationId": "21965",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-32",
    "name": "田島",
    "yahooStationId": "21787",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-33",
    "name": "佐野市",
    "yahooStationId": "21772",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-34",
    "name": "佐野",
    "yahooStationId": "21771",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-35",
    "name": "堀米",
    "yahooStationId": "21820",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-36",
    "name": "吉水",
    "yahooStationId": "21837",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-37",
    "name": "田沼",
    "yahooStationId": "21790",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-38",
    "name": "多田",
    "yahooStationId": "21789",
    "inGroupId": "2700",
    "outGroupId": "2701"
  },
  {
    "id": "TI-39",
    "name": "葛生",
    "yahooStationId": "21762",
    "inGroupId": "2700",
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
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 150,
  "2": 150,
  "3": 150,
  "4": 150,
  "5": 150,
  "6": 150,
  "7": 150,
  "8": 150,
  "9": 150
},
};
