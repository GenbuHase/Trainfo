// 野岩鉄道会津鬼怒川線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'yagan',
  name: '野岩鉄道会津鬼怒川線',
  stationsFilePath: 'src/data/lines/yagan/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/yagan/stationTimetables.json',
    globalTimetable: 'src/data/lines/yagan/globalTimetable.json',
  },
  stations: [
  {
    "id": "YAG-01",
    "name": "新藤原",
    "yahooStationId": "21782",
    "inGroupId": null,
    "outGroupId": "4701"
  },
  {
    "id": "YAG-02",
    "name": "龍王峡",
    "yahooStationId": "21838",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-03",
    "name": "川治温泉",
    "yahooStationId": "21754",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-04",
    "name": "川治湯元",
    "yahooStationId": "21755",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-05",
    "name": "湯西川温泉",
    "yahooStationId": "21836",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-06",
    "name": "中三依温泉",
    "yahooStationId": "21803",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-07",
    "name": "上三依塩原温泉口",
    "yahooStationId": "21752",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-08",
    "name": "男鹿高原",
    "yahooStationId": "21742",
    "inGroupId": "4700",
    "outGroupId": "4701"
  },
  {
    "id": "YAG-09",
    "name": "会津高原尾瀬口",
    "yahooStationId": "21402",
    "inGroupId": "4700",
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
  "6": 150,
  "7": 150,
  "8": 150
},
};
