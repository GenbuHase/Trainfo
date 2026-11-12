// JR東北本線（仙台～一ノ関） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tohoku_sendai_ichinoseki',
  name: 'JR東北本線（仙台～一ノ関）',
  stationsFilePath: 'src/data/lines/tohoku_sendai_ichinoseki/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tohoku_sendai_ichinoseki/stationTimetables.json',
    globalTimetable: 'src/data/lines/tohoku_sendai_ichinoseki/globalTimetable.json',
  },
  stations: [
      {
          "id": "TSI-01",
          "name": "仙台",
          "yahooStationId": "21044",
          "inGroupId": null,
          "outGroupId": "7631"
      },
      {
          "id": "TSI-02",
          "name": "東仙台",
          "yahooStationId": "21079",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-03",
          "name": "岩切",
          "yahooStationId": "20983",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-04",
          "name": "陸前山王",
          "yahooStationId": "21116",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-05",
          "name": "国府多賀城",
          "yahooStationId": "29373",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-06",
          "name": "塩釜",
          "yahooStationId": "21034",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-07",
          "name": "松島",
          "yahooStationId": "21093",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-08",
          "name": "愛宕",
          "yahooStationId": "20972",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-09",
          "name": "品井沼",
          "yahooStationId": "21038",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-10",
          "name": "鹿島台",
          "yahooStationId": "21000",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-11",
          "name": "松山町",
          "yahooStationId": "21095",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-12",
          "name": "小牛田",
          "yahooStationId": "21026",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-13",
          "name": "田尻",
          "yahooStationId": "21049",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-14",
          "name": "瀬峰",
          "yahooStationId": "21043",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-15",
          "name": "梅ケ沢",
          "yahooStationId": "20988",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-16",
          "name": "新田",
          "yahooStationId": "21068",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-17",
          "name": "石越",
          "yahooStationId": "20979",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-18",
          "name": "油島",
          "yahooStationId": "20946",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-19",
          "name": "花泉",
          "yahooStationId": "20905",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-20",
          "name": "清水原",
          "yahooStationId": "20870",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-21",
          "name": "有壁",
          "yahooStationId": "20977",
          "inGroupId": "7630",
          "outGroupId": "7631"
      },
      {
          "id": "TSI-22",
          "name": "一ノ関",
          "yahooStationId": "20806",
          "inGroupId": "7630",
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
      "1": 265,
      "2": 275,
      "3": 155,
      "4": 104,
      "5": 130,
      "6": 621,
      "7": 144,
      "8": 288,
      "9": 327,
      "10": 318,
      "11": 231,
      "12": 393,
      "13": 432,
      "14": 241,
      "15": 307,
      "16": 465,
      "17": 234,
      "18": 276,
      "19": 214,
      "20": 231,
      "21": 463
  },
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: (trainDetail) => {
    const names = (trainDetail.stopStation || []).map((s) => s.stationName || '');
    if (names.some((n) => n.includes('新幹線'))) return true;
    // 利府支線内完結（岩切〜新利府〜利府）で仙台・東仙台を通らない列車は tohoku_rifu 専任とするため除外
    const hasMainline = names.some((n) => ['仙台', '東仙台', '陸前山王', '国府多賀城', '塩釜', '松島', '小牛田', '一ノ関'].includes(n.replace(/\([^)]+\)$/, '')));
    if (!hasMainline) return true;
    return false;
  },
};
