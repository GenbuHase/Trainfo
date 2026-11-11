// JR東北本線（福島～仙台） Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tohoku_fukushima_sendai',
  name: 'JR東北本線（福島～仙台）',
  stationsFilePath: 'src/data/lines/tohoku_fukushima_sendai/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tohoku_fukushima_sendai/stationTimetables.json',
    globalTimetable: 'src/data/lines/tohoku_fukushima_sendai/globalTimetable.json',
  },
  stations: [
      {
          "id": "TFS-01",
          "name": "福島",
          "yahooStationId": "21551",
          "inGroupId": null,
          "outGroupId": "611"
      },
      {
          "id": "TFS-02",
          "name": "東福島",
          "yahooStationId": "21544",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-03",
          "name": "伊達",
          "yahooStationId": "21511",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-04",
          "name": "桑折",
          "yahooStationId": "21482",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-05",
          "name": "藤田",
          "yahooStationId": "21553",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-06",
          "name": "貝田",
          "yahooStationId": "21462",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-07",
          "name": "越河",
          "yahooStationId": "21027",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-08",
          "name": "白石",
          "yahooStationId": "21039",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-09",
          "name": "東白石",
          "yahooStationId": "21078",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-10",
          "name": "北白川",
          "yahooStationId": "21009",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-11",
          "name": "大河原",
          "yahooStationId": "20991",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-12",
          "name": "船岡",
          "yahooStationId": "21086",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-13",
          "name": "槻木",
          "yahooStationId": "21053",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-14",
          "name": "岩沼",
          "yahooStationId": "20985",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-15",
          "name": "館腰",
          "yahooStationId": "21050",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-16",
          "name": "名取",
          "yahooStationId": "21066",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-17",
          "name": "南仙台",
          "yahooStationId": "21101",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-18",
          "name": "太子堂",
          "yahooStationId": "29588",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-19",
          "name": "長町",
          "yahooStationId": "21063",
          "inGroupId": "610",
          "outGroupId": "611"
      },
      {
          "id": "TFS-20",
          "name": "仙台",
          "yahooStationId": "21044",
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
      "1": 381,
      "2": 211,
      "3": 269,
      "4": 223,
      "5": 363,
      "6": 244,
      "7": 518,
      "8": 281,
      "9": 277,
      "10": 316,
      "11": 202,
      "12": 302,
      "13": 413,
      "14": 249,
      "15": 234,
      "16": 185,
      "17": 162,
      "18": 90,
      "19": 289
  },
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: (trainDetail) => {
    const names = (trainDetail.stopStation || []).map((s) => s.stationName || '');
    if (names.some((n) => n.includes('新幹線'))) return true;
    // 常磐線（いわき〜逢隈）を経由する常磐線直通列車（ひたち含む）は joban_iwaki_sendai 側で統合運行するため除外
    const jobanSouth = [
      '逢隈', '亘理', '浜吉田', '山下', '坂元', '新地', '駒ケ嶺', '相馬',
      '日立木', '鹿島', '原ノ町', '磐城太田', '小高', '桃内', '浪江',
      '双葉', '大野', '夜ノ森', '富岡', '竜田', '木戸', 'Ｊヴィレッジ',
      '広野', '末続', '久ノ浜', '四ツ倉', '草野', 'いわき',
    ];
    return names.some((n) => jobanSouth.some((j) => n.startsWith(j)));
  },
};
