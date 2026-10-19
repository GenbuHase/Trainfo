// 東武鬼怒川線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_kinugawa',
  name: '東武鬼怒川線',
  stationsFilePath: 'src/data/lines/tobu_kinugawa/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_kinugawa/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_kinugawa/globalTimetable.json',
  },
  stations: [
  {
    "id": "TN-23",
    "name": "下今市",
    "yahooStationId": "21774",
    "inGroupId": null,
    "outGroupId": "2761"
  },
  {
    "id": "TN-51",
    "name": "大谷向",
    "yahooStationId": "21791",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-52",
    "name": "大桑",
    "yahooStationId": "21739",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-53",
    "name": "新高徳",
    "yahooStationId": "21780",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-54",
    "name": "小佐越",
    "yahooStationId": "21768",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-55",
    "name": "東武ワールドスクウェア",
    "yahooStationId": "29784",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-56",
    "name": "鬼怒川温泉",
    "yahooStationId": "21759",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-57",
    "name": "鬼怒川公園",
    "yahooStationId": "21760",
    "inGroupId": "2760",
    "outGroupId": "2761"
  },
  {
    "id": "TN-58",
    "name": "新藤原",
    "yahooStationId": "21782",
    "inGroupId": "2760",
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
  "8": 150
},
};
