// 東武桐生線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_kiryu',
  name: '東武桐生線',
  stationsFilePath: 'src/data/lines/tobu_kiryu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_kiryu/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_kiryu/globalTimetable.json',
  },
  stations: [
  {
    "id": "TI-18",
    "name": "太田",
    "yahooStationId": "21856",
    "inGroupId": null,
    "outGroupId": "2711"
  },
  {
    "id": "TI-51",
    "name": "三枚橋",
    "yahooStationId": "21890",
    "inGroupId": "2710",
    "outGroupId": "2711"
  },
  {
    "id": "TI-52",
    "name": "治良門橋",
    "yahooStationId": "21908",
    "inGroupId": "2710",
    "outGroupId": "2711"
  },
  {
    "id": "TI-53",
    "name": "藪塚",
    "yahooStationId": "21959",
    "inGroupId": "2710",
    "outGroupId": "2711"
  },
  {
    "id": "TI-54",
    "name": "阿左美",
    "yahooStationId": "21842",
    "inGroupId": "2710",
    "outGroupId": "2711"
  },
  {
    "id": "TI-55",
    "name": "新桐生",
    "yahooStationId": "21897",
    "inGroupId": "2710",
    "outGroupId": "2711"
  },
  {
    "id": "TI-56",
    "name": "相老",
    "yahooStationId": "21839",
    "inGroupId": "2710",
    "outGroupId": "2711"
  },
  {
    "id": "TI-57",
    "name": "赤城",
    "yahooStationId": "21840",
    "inGroupId": "2710",
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
  "7": 150
},
};
