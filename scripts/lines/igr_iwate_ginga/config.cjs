// IGRいわて銀河鉄道線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'igr_iwate_ginga',
  name: 'IGRいわて銀河鉄道線',
  stationsFilePath: 'src/data/lines/igr_iwate_ginga/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/igr_iwate_ginga/stationTimetables.json',
    globalTimetable: 'src/data/lines/igr_iwate_ginga/globalTimetable.json',
  },
  stations: [
      {
          "id": "IGR-01",
          "name": "盛岡",
          "yahooStationId": "20940",
          "inGroupId": null,
          "outGroupId": "6801"
      },
      {
          "id": "IGR-02",
          "name": "青山",
          "yahooStationId": "29564",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-03",
          "name": "厨川",
          "yahooStationId": "20850",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-04",
          "name": "巣子",
          "yahooStationId": "29565",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-05",
          "name": "滝沢",
          "yahooStationId": "20881",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-06",
          "name": "渋民",
          "yahooStationId": "20868",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-07",
          "name": "好摩",
          "yahooStationId": "20855",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-08",
          "name": "岩手川口",
          "yahooStationId": "20815",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-09",
          "name": "いわて沼宮内",
          "yahooStationId": "20902",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-10",
          "name": "御堂",
          "yahooStationId": "20935",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-11",
          "name": "奥中山高原",
          "yahooStationId": "20829",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-12",
          "name": "小繋",
          "yahooStationId": "20858",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-13",
          "name": "小鳥谷",
          "yahooStationId": "20857",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-14",
          "name": "一戸",
          "yahooStationId": "20807",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-15",
          "name": "二戸",
          "yahooStationId": "20901",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-16",
          "name": "斗米",
          "yahooStationId": "20893",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-17",
          "name": "金田一温泉",
          "yahooStationId": "20847",
          "inGroupId": "6800",
          "outGroupId": "6801"
      },
      {
          "id": "IGR-18",
          "name": "目時",
          "yahooStationId": "20788",
          "inGroupId": "6800",
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
      "1": 223,
      "2": 168,
      "3": 304,
      "4": 144,
      "5": 286,
      "6": 307,
      "7": 362,
      "8": 331,
      "9": 340,
      "10": 453,
      "11": 488,
      "12": 485,
      "13": 303,
      "14": 405,
      "15": 201,
      "16": 303,
      "17": 243
  },
};
