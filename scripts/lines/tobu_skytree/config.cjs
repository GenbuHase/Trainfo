// 東武スカイツリーライン Yahoo! 路線情報スクレイパー設定
module.exports = {
  lineId: 'tobu_skytree',
  name: '東武スカイツリーライン',
  stationsFilePath: 'src/data/lines/tobu_skytree/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/tobu_skytree/stationTimetables.json',
    globalTimetable: 'src/data/lines/tobu_skytree/globalTimetable.json',
  },
  stations: [
  {
    "id": "TSK-01",
    "name": "浅草",
    "yahooStationId": "22495",
    "inGroupId": null,
    "outGroupId": "2661"
  },
  {
    "id": "TSK-02",
    "name": "とうきょうスカイツリー",
    "yahooStationId": "22859",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-03",
    "name": "押上",
    "yahooStationId": "22578",
    "inGroupId": null,
    "outGroupId": "2670"
  },
  {
    "id": "TSK-04",
    "name": "曳舟",
    "yahooStationId": "22946",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-05",
    "name": "東向島",
    "yahooStationId": "22943",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-06",
    "name": "鐘ヶ淵",
    "yahooStationId": "22600",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-07",
    "name": "堀切",
    "yahooStationId": "22971",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-08",
    "name": "牛田",
    "yahooStationId": "22532",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-09",
    "name": "北千住",
    "yahooStationId": "22630",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-10",
    "name": "小菅",
    "yahooStationId": "22678",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-11",
    "name": "五反野",
    "yahooStationId": "22692",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-12",
    "name": "梅島",
    "yahooStationId": "22537",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-13",
    "name": "西新井",
    "yahooStationId": "22863",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-14",
    "name": "竹ノ塚",
    "yahooStationId": "22796",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-15",
    "name": "谷塚",
    "yahooStationId": "22161",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-16",
    "name": "草加",
    "yahooStationId": "22068",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-17",
    "name": "獨協大学前",
    "yahooStationId": "22133",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-18",
    "name": "新田",
    "yahooStationId": "22059",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-19",
    "name": "蒲生",
    "yahooStationId": "22014",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-20",
    "name": "新越谷",
    "yahooStationId": "22055",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-21",
    "name": "越谷",
    "yahooStationId": "22034",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-22",
    "name": "北越谷",
    "yahooStationId": "22021",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-23",
    "name": "大袋",
    "yahooStationId": "21986",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-24",
    "name": "せんげん台",
    "yahooStationId": "22067",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-25",
    "name": "武里",
    "yahooStationId": "22071",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-26",
    "name": "一ノ割",
    "yahooStationId": "21974",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-27",
    "name": "春日部",
    "yahooStationId": "22002",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-28",
    "name": "北春日部",
    "yahooStationId": "22019",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-29",
    "name": "姫宮",
    "yahooStationId": "22120",
    "inGroupId": "2660",
    "outGroupId": "2661"
  },
  {
    "id": "TSK-30",
    "name": "東武動物公園",
    "yahooStationId": "22079",
    "inGroupId": "2660",
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
  defaultCars: 10,
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
  "21": 150,
  "22": 150,
  "23": 150,
  "24": 150,
  "25": 150,
  "26": 150,
  "27": 150,
  "28": 150,
  "29": 150
},
  boundaryPassingRules: [
    {
      boundaryStationId: 'TSK-30',
      throughStations: [
        '杉戸高野台', '幸手', '南栗橋', '栗橋', '新古河', '柳生', '板倉東洋大前', '藤岡', '静和', '新大平下', '栃木', '新栃木', '合戦場', '家中', '東武金崎', '楡木', '樅山', '新鹿沼', '北鹿沼', '板荷', '下小代', '明神', '下今市', '上今市', '東武日光',
        '和戸', '久喜', '鷲宮', '花崎', '加須', '南羽生', '羽生', '川俣', '茂林寺前', '館林', '多々良', '県', '福居', '東武和泉', '足利市', '野州山辺', '韮川', '太田', '細谷', '木崎', '世良田', '境町', '剛志', '新伊勢崎', '伊勢崎',
        '新高徳', '東武ワールドスクウェア', '鬼怒川温泉', '鬼怒川公園', '新藤原', '会津高原尾瀬口', '会津田島',
        '浅草', 'とうきょうスカイツリー', '曳舟', '北千住', '春日部'
      ]
    }
  ],
  branchExclusionRules: [
    {
      ifContains: [1, 2], // 浅草・とうきょうスカイツリーを通る列車
      excludeNumbers: [3], // 押上を除外
    },
    {
      ifContains: [3], // 押上を通る列車
      excludeNumbers: [1, 2], // 浅草・とうきょうスカイツリーを除外
    },
  ],
};
