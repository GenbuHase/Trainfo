// 会津鉄道会津線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'aizu',
  name: '会津鉄道会津線',
  stationsFilePath: 'src/data/lines/aizu/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/aizu/stationTimetables.json',
    globalTimetable: 'src/data/lines/aizu/globalTimetable.json',
  },
  stations: [
  {
    "id": "AIZ-01",
    "name": "会津高原尾瀬口",
    "yahooStationId": "21402",
    "inGroupId": null,
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-02",
    "name": "七ヶ岳登山口",
    "yahooStationId": "21524",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-03",
    "name": "会津山村道場",
    "yahooStationId": "29367",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-04",
    "name": "会津荒海",
    "yahooStationId": "21398",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-05",
    "name": "中荒井",
    "yahooStationId": "21519",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-06",
    "name": "会津田島",
    "yahooStationId": "21408",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-07",
    "name": "田島高校前",
    "yahooStationId": "21508",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-08",
    "name": "会津長野",
    "yahooStationId": "21411",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-09",
    "name": "養鱒公園",
    "yahooStationId": "21575",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-10",
    "name": "ふるさと公園",
    "yahooStationId": "29433",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-11",
    "name": "会津下郷",
    "yahooStationId": "21406",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-12",
    "name": "弥五島",
    "yahooStationId": "21567",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-13",
    "name": "塔のへつり",
    "yahooStationId": "21514",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-14",
    "name": "湯野上温泉",
    "yahooStationId": "21573",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-15",
    "name": "芦ノ牧温泉南",
    "yahooStationId": "21426",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-16",
    "name": "大川ダム公園",
    "yahooStationId": "21451",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-17",
    "name": "芦ノ牧温泉",
    "yahooStationId": "21425",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-18",
    "name": "あまや",
    "yahooStationId": "29293",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-19",
    "name": "門田",
    "yahooStationId": "21566",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-20",
    "name": "南若松",
    "yahooStationId": "29046",
    "inGroupId": "4641",
    "outGroupId": "4640"
  },
  {
    "id": "AIZ-21",
    "name": "西若松",
    "yahooStationId": "21531",
    "inGroupId": "4641",
    "outGroupId": "700"
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
  "21": 150
},
};
