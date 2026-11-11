// 青い森鉄道線 Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'aoimori',
  name: '青い森鉄道線',
  stationsFilePath: 'src/data/lines/aoimori/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/aoimori/stationTimetables.json',
    globalTimetable: 'src/data/lines/aoimori/globalTimetable.json',
  },
  stations: [
      {
          "id": "AMR-01",
          "name": "目時",
          "yahooStationId": "20788",
          "inGroupId": null,
          "outGroupId": "6811"
      },
      {
          "id": "AMR-02",
          "name": "三戸",
          "yahooStationId": "20689",
          "inGroupId": "6810",
          "outGroupId": "6811"
      },
      {
          "id": "AMR-03",
          "name": "諏訪ノ平",
          "yahooStationId": "20701",
          "inGroupId": "6810",
          "outGroupId": "6811"
      },
      {
          "id": "AMR-04",
          "name": "剣吉",
          "yahooStationId": "20674",
          "inGroupId": "6810",
          "outGroupId": "6811"
      },
      {
          "id": "AMR-05",
          "name": "苫米地",
          "yahooStationId": "20731",
          "inGroupId": "6810",
          "outGroupId": "6811"
      },
      {
          "id": "AMR-06",
          "name": "北高岩",
          "yahooStationId": "20668",
          "inGroupId": "6810",
          "outGroupId": "6811"
      },
      {
          "id": "AMR-07",
          "name": "八戸",
          "yahooStationId": "20750",
          "inGroupId": "6810",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-08",
          "name": "陸奥市川",
          "yahooStationId": "20777",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-09",
          "name": "下田",
          "yahooStationId": "20696",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-10",
          "name": "向山",
          "yahooStationId": "20775",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-11",
          "name": "三沢",
          "yahooStationId": "20771",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-12",
          "name": "小川原",
          "yahooStationId": "20676",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-13",
          "name": "上北町",
          "yahooStationId": "20661",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-14",
          "name": "乙供",
          "yahooStationId": "20653",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-15",
          "name": "千曳",
          "yahooStationId": "20712",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-16",
          "name": "野辺地",
          "yahooStationId": "20747",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-17",
          "name": "狩場沢",
          "yahooStationId": "20662",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-18",
          "name": "清水川",
          "yahooStationId": "20694",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-19",
          "name": "小湊",
          "yahooStationId": "20680",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-20",
          "name": "西平内",
          "yahooStationId": "20744",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-21",
          "name": "浅虫温泉",
          "yahooStationId": "20622",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-22",
          "name": "野内",
          "yahooStationId": "20746",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-23",
          "name": "矢田前",
          "yahooStationId": "20790",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-24",
          "name": "小柳",
          "yahooStationId": "20681",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-25",
          "name": "東青森",
          "yahooStationId": "20752",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-26",
          "name": "筒井",
          "yahooStationId": "29725",
          "inGroupId": "6820",
          "outGroupId": "6821"
      },
      {
          "id": "AMR-27",
          "name": "青森",
          "yahooStationId": "20619",
          "inGroupId": "6820",
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
  buildStationTimetablesFromTrips: true,
  // Yahoo路線情報上で同一列車(3225D/3228D)が大湊線直通版(14259/14265)と線内止まり重複版(2777/2794)として二重登録されているため、直通版を残して除外する
  shouldExcludeTrip: (trainDetail) => ['2777', '2794'].includes(String(trainDetail.trainId)),
  baseSectionSeconds: {
      "1": 354,
      "2": 263,
      "3": 344,
      "4": 224,
      "5": 200,
      "6": 315,
      "7": 438,
      "8": 274,
      "9": 343,
      "10": 306,
      "11": 419,
      "12": 258,
      "13": 438,
      "14": 419,
      "15": 408,
      "16": 417,
      "17": 303,
      "18": 385,
      "19": 251,
      "20": 406,
      "21": 413,
      "22": 121,
      "23": 143,
      "24": 116,
      "25": 103,
      "26": 296
  },
};
