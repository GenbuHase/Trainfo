// 東武大師線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_daishi',
  name: '東武大師線',
  stationsFilePath: 'src/data/lines/tobu_daishi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_daishi/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_daishi/globalTimetable.json',
  },
  stations: [
  {
    "id": "TSK-13",
    "name": "西新井",
    "yahooStationId": "22863",
    "inGroupId": null,
    "outGroupId": "2691"
  },
  {
    "id": "TSK-51",
    "name": "大師前",
    "yahooStationId": "22813",
    "inGroupId": "2690",
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
  defaultCars: 2,
  baseSectionSeconds: {
  "1": 150
},
};
