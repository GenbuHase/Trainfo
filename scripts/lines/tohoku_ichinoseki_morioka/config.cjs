// JR東北本線（一ノ関～盛岡） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tohoku_ichinoseki_morioka',
  name: 'JR東北本線（一ノ関～盛岡）',
  stationsFilePath: 'src/data/lines/tohoku_ichinoseki_morioka/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tohoku_ichinoseki_morioka/stationTimetables.json',
    globalTimetable: 'src/data/lines/tohoku_ichinoseki_morioka/globalTimetable.json',
  },
  stations: [
      {
          "id": "TIM-01",
          "name": "一ノ関",
          "yahooStationId": "20806",
          "inGroupId": null,
          "outGroupId": "621"
      },
      {
          "id": "TIM-02",
          "name": "山ノ目",
          "yahooStationId": "20945",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-03",
          "name": "平泉",
          "yahooStationId": "20915",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-04",
          "name": "前沢",
          "yahooStationId": "20927",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-05",
          "name": "陸中折居",
          "yahooStationId": "20959",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-06",
          "name": "水沢",
          "yahooStationId": "20933",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-07",
          "name": "金ケ崎",
          "yahooStationId": "20838",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-08",
          "name": "六原",
          "yahooStationId": "20968",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-09",
          "name": "北上",
          "yahooStationId": "20844",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-10",
          "name": "村崎野",
          "yahooStationId": "20938",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-11",
          "name": "花巻",
          "yahooStationId": "20906",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-12",
          "name": "花巻空港",
          "yahooStationId": "20907",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-13",
          "name": "石鳥谷",
          "yahooStationId": "20805",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-14",
          "name": "日詰",
          "yahooStationId": "20914",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-15",
          "name": "紫波中央",
          "yahooStationId": "29219",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-16",
          "name": "古館",
          "yahooStationId": "20921",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-17",
          "name": "矢幅",
          "yahooStationId": "20943",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-18",
          "name": "岩手飯岡",
          "yahooStationId": "20811",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-19",
          "name": "仙北町",
          "yahooStationId": "20877",
          "inGroupId": "620",
          "outGroupId": "621"
      },
      {
          "id": "TIM-20",
          "name": "盛岡",
          "yahooStationId": "20940",
          "inGroupId": "620",
          "outGroupId": null
      }
  ],
  stationNameAliases: {
    '郡山(福島県)': '郡山',
    '本宮(福島県)': '本宮',
    '杉田(福島県)': '杉田',
    '福島(福島県)': '福島',
    '白石(宮城県)': '白石',
    '大河原(宮城県)': '大河原',
    '船岡(宮城県)': '船岡',
    '愛宕(宮城県)': '愛宕',
    '松山町(宮城県)': '松山町',
    '田尻(宮城県)': '田尻',
    '新田(宮城県)': '新田',
    '梅ヶ沢': '梅ケ沢',
    '金ヶ崎': '金ケ崎',
    '花巻空港(東北本線)': '花巻空港',
    '古館(岩手県)': '古館',
    '青山(岩手県)': '青山',
    '下田(青森県)': '下田',
    '三沢(青森県)': '三沢',
    '小柳(青森県)': '小柳',
    '筒井(青森県)': '筒井',
  },
  trainTypeMap: {
    '普通': 'regular',
    '各駅停車': 'regular',
    '特別快速館鼻岸壁朝市リレー号': 'special_rapid',
    '館鼻岸壁朝市リレー号': 'special_rapid',
    '特別快速': 'special_rapid',
    '特急イブニングウェイ': 'limitedExp',
    'イブニングウェイ': 'limitedExp',
    '特急': 'limitedExp',
    '快速はまゆり': 'rapid',
    '快速しもきた': 'rapid',
    '快速おもいで湯けむり': 'rapid',
    '快速風っこ女川シーパル号': 'rapid',
    '快速あさむし・あおもり': 'rapid',
    '快速ひなび': 'rapid',
    '快速ふるさと大湊': 'rapid',
    '快速': 'rapid',
  },
  preserveAllStopsTypes: ['regular', 'rapid', 'limitedExp', 'special_rapid'],
  defaultTrainType: 'regular',
  defaultCars: 2,
  baseSectionSeconds: {
      "1": 197,
      "2": 282,
      "3": 483,
      "4": 339,
      "5": 328,
      "6": 478,
      "7": 228,
      "8": 412,
      "9": 301,
      "10": 496,
      "11": 370,
      "12": 364,
      "13": 349,
      "14": 133,
      "15": 201,
      "16": 243,
      "17": 297,
      "18": 250,
      "19": 133
  },
  shouldExcludeTrip: (trainDetail) => {
    const names = (trainDetail.stopStation || []).map((s) => s.stationName || '');
    return names.some((n) => n.includes('新幹線'));
  },
};
