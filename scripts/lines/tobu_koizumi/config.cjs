// 東武小泉線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_koizumi',
  name: '東武小泉線',
  stationsFilePath: 'src/data/lines/tobu_koizumi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_koizumi/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_koizumi/globalTimetable.json',
  },
  stations: [
  {
    "id": "TI-10",
    "name": "館林",
    "yahooStationId": "21915",
    "inGroupId": null,
    "outGroupId": "2721"
  },
  {
    "id": "TI-41",
    "name": "成島",
    "yahooStationId": "21923",
    "inGroupId": "2720",
    "outGroupId": "2721"
  },
  {
    "id": "TI-42",
    "name": "本中野",
    "yahooStationId": "21945",
    "inGroupId": "2720",
    "outGroupId": "2721"
  },
  {
    "id": "TI-43",
    "name": "篠塚",
    "yahooStationId": "21892",
    "inGroupId": "2720",
    "outGroupId": "2721"
  },
  {
    "id": "TI-44",
    "name": "東小泉",
    "yahooStationId": "21938",
    "inGroupId": "2720",
    "outGroupId": "2721"
  },
  {
    "id": "TI-45",
    "name": "小泉町",
    "yahooStationId": "21882",
    "inGroupId": "2720",
    "outGroupId": "2721"
  },
  {
    "id": "TI-46",
    "name": "西小泉",
    "yahooStationId": "21928",
    "inGroupId": "2720",
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
  "1": 150,
  "2": 150,
  "3": 150,
  "4": 150,
  "5": 150,
  "6": 150
},
};
