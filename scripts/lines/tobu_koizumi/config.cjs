// 東武小泉線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_koizumi',
  name: '東武小泉線',
  stationsFilePath: 'src/data/lines/tobu_koizumi/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_koizumi/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_koizumi/globalTimetable.json',
  },
  directStops: true,
  resolveDirection: (firstSt, lastSt) => (firstSt.number < lastSt.number ? 'outbound' : 'inbound'),
  junctionPassingRules: [
    { fromId: 'TI-44', toId: 'TI-47', viaIds: [] },
    { fromId: 'TI-47', toId: 'TI-44', viaIds: [] },
  ],
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
      "outGroupId": ["2721", "2730"]
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
    },
    {
      "id": "TI-47",
      "name": "竜舞",
      "yahooStationId": "21971",
      "inGroupId": "2731",
      "outGroupId": "2730"
    },
    {
      "id": "TI-18",
      "name": "太田",
      "yahooStationId": "21855",
      "inGroupId": "2731",
      "outGroupId": null
    }
  ],
  stationNameAliases: {
    "太田(群馬県)": "太田",
    "太田（群馬県）": "太田"
  },
  trainTypeMap: {
  "普通": "local",
  "各駅停車": "local",
  "区間準急": "section_semi_exp",
  "準急": "semi_exp",
  "区間急行": "section_exp",
  "急行": "express",
  "快速急行": "rapid_exp",
  "快速": "rapid",
  "区間快速": "section_rapid",
  "ＴＨライナー": "th_liner",
  "THライナー": "th_liner",
  "ライナー": "th_liner",
  "特急": "limited_exp",
  "スペーシア": "limited_exp",
  "リバティ": "limited_exp",
  "けごん": "limited_exp",
  "きぬ": "limited_exp",
  "りょうもう": "limited_exp",
  "日光": "limited_exp",
  "きぬがわ": "limited_exp",
  "会津": "limited_exp",
  "ＳＬ大樹": "sl_taiju",
  "SL大樹": "sl_taiju",
  "ＳＬふたら": "sl_taiju",
  "SLふたら": "sl_taiju",
  "ＡＩＺＵマウントエクスプレス": "rapid",
  "AIZUマウントエクスプレス": "rapid",
  "お座敷": "aizu_ozatoro",
  "展望列車": "aizu_ozatoro",
  "会津浪漫": "aizu_ozatoro"
},
  preserveAllStopsTypes: ['th_liner', 'sl_taiju', 'aizu_ozatoro'],
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
