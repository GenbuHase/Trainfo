// 東武宇都宮線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_utsunomiya',
  name: '東武宇都宮線',
  stationsFilePath: 'src/data/lines/tobu_utsunomiya/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_utsunomiya/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_utsunomiya/globalTimetable.json',
  },
  stations: [
  {
    "id": "TN-12",
    "name": "新栃木",
    "yahooStationId": "21781",
    "inGroupId": null,
    "outGroupId": "2751"
  },
  {
    "id": "TN-31",
    "name": "野州平川",
    "yahooStationId": "21832",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-32",
    "name": "野州大塚",
    "yahooStationId": "21831",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-33",
    "name": "壬生",
    "yahooStationId": "21826",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-34",
    "name": "国谷",
    "yahooStationId": "21763",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-35",
    "name": "おもちゃのまち",
    "yahooStationId": "21745",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-36",
    "name": "安塚",
    "yahooStationId": "21834",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-37",
    "name": "西川田",
    "yahooStationId": "21808",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-38",
    "name": "江曽島",
    "yahooStationId": "21737",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-39",
    "name": "南宇都宮",
    "yahooStationId": "21825",
    "inGroupId": "2750",
    "outGroupId": "2751"
  },
  {
    "id": "TN-40",
    "name": "東武宇都宮",
    "yahooStationId": "21797",
    "inGroupId": "2750",
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
  defaultCars: 4,
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
  "10": 150
},
};
