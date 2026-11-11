// JR東北本線（黒磯～福島） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tohoku_kuroiso_fukushima',
  name: 'JR東北本線（黒磯～福島）',
  stationsFilePath: 'src/data/lines/tohoku_kuroiso_fukushima/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tohoku_kuroiso_fukushima/stationTimetables.json',
    globalTimetable: 'src/data/lines/tohoku_kuroiso_fukushima/globalTimetable.json',
  },
  stations: [
      {
          "id": "TKF-01",
          "name": "黒磯",
          "yahooStationId": "21764",
          "inGroupId": null,
          "outGroupId": "611"
      },
      {
          "id": "TKF-02",
          "name": "高久",
          "yahooStationId": "21785",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-03",
          "name": "黒田原",
          "yahooStationId": "21765",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-04",
          "name": "豊原",
          "yahooStationId": "21802",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-05",
          "name": "白坂",
          "yahooStationId": "21493",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-06",
          "name": "新白河",
          "yahooStationId": "21494",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-07",
          "name": "白河",
          "yahooStationId": "21492",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-08",
          "name": "久田野",
          "yahooStationId": "21481",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-09",
          "name": "泉崎",
          "yahooStationId": "21433",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-10",
          "name": "矢吹",
          "yahooStationId": "21570",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-11",
          "name": "鏡石",
          "yahooStationId": "21463",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-12",
          "name": "須賀川",
          "yahooStationId": "21498",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-13",
          "name": "安積永盛",
          "yahooStationId": "21424",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-14",
          "name": "郡山",
          "yahooStationId": "21483",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-15",
          "name": "日和田",
          "yahooStationId": "21549",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-16",
          "name": "五百川",
          "yahooStationId": "21486",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-17",
          "name": "本宮",
          "yahooStationId": "21564",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-18",
          "name": "杉田",
          "yahooStationId": "21500",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-19",
          "name": "二本松",
          "yahooStationId": "21532",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-20",
          "name": "安達",
          "yahooStationId": "21427",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-21",
          "name": "松川",
          "yahooStationId": "21558",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-22",
          "name": "金谷川",
          "yahooStationId": "21466",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-23",
          "name": "南福島",
          "yahooStationId": "21560",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TKF-24",
          "name": "福島",
          "yahooStationId": "21551",
          "inGroupId": "610",
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
  defaultCars: 4,
  baseSectionSeconds: {
      "1": 260,
      "2": 283,
      "3": 332,
      "4": 343,
      "5": 230,
      "6": 186,
      "7": 312,
      "8": 294,
      "9": 387,
      "10": 347,
      "11": 399,
      "12": 425,
      "13": 329,
      "14": 358,
      "15": 299,
      "16": 248,
      "17": 378,
      "18": 251,
      "19": 281,
      "20": 320,
      "21": 294,
      "22": 345,
      "23": 235
  },
  shouldExcludeTrip: (trainDetail) => {
    const names = (trainDetail.stopStation || []).map((s) => s.stationName || '');
    return names.some((n) => n.includes('新幹線'));
  },
};
