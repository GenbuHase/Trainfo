// 全路線の併結（Coupling）および欠落支線トリップ復元に関する宣言的設定ファイル
module.exports = {
  // 1. 東武特急（リバティけごん・会津・きぬ等）設定
  tobu: {
    downPairs: [
      { nikkoId: '25128', otherId: '25154', otherDest: '会津田島' },
      { nikkoId: '25116', otherId: '25151', otherDest: '会津田島' },
      { nikkoId: '25120', otherId: '25152', otherDest: '会津田島' },
      { nikkoId: '25123', otherId: '116490', otherDest: '鬼怒川温泉' },
      { nikkoId: '25124', otherId: '25153', otherDest: '会津田島' },
    ],
    upPairs: [
      { nikkoId: '38046', otherId: '116504' },
      { nikkoId: '38050', otherId: '42865' },
      { nikkoId: '38055', otherId: '42866' },
      { nikkoId: '38065', otherId: '42868' },
      { nikkoId: '38060', otherId: '116501' },
    ],
    segments: [
      { lineId: 'tobu_skytree', fromStationId: 'TSK-01', toStationId: 'TSK-30', primaryDestOut: '東武日光', destIn: '浅草', cars: 3 },
      { lineId: 'tobu_nikko', fromStationId: 'TSK-30', toStationId: 'TN-23', primaryDestOut: '東武日光', destIn: '浅草', cars: 3 },
    ],
    libertyTrainIds: [
      // 会津
      '25154', '25151', '25152', '25153', '42865', '42866', '42868', '42867',
      // きぬ
      '116490', '116504', '116501', '116488', '116489', '116499', '116500',
      // けごん
      '25109', '25116', '25120', '25123', '25124', '25126', '25128', '25129', '25130', '25131', '25132',
      '38046', '38047', '38050', '38055', '38060', '38065',
      // りょうもう
      '116453', '116454',
    ],
    libertyTrainNumberPatterns: [
      /^(1001|1003|1013|1014|1018|1019|1027|1028|1031|1035|1036|1042|1043|1046|1047|1049|1101|1105|1109|1113|1114|1119|1122|1124|1127|1128|1131|1136|1142|1146|1154|1255)レ?$/,
      /^(1101|1113|1119|1131|1128|1136|1142|1154)M$/,
    ],
  },

  // 2. 東北新幹線（やまびこ＋つばさ、はやぶさ＋こまち）設定
  tohokuShinkansen: {
    lineId: 'tohoku_shinkansen',
    branchRestorations: [
      {
        branchLineId: 'yamagata_shinkansen',
        keyword: 'つばさ',
        terminalName: '東京',
        trainNumberFormula: (num) => `${num >= 70 && num <= 99 ? 8000 + num : num}M`,
      },
      {
        branchLineId: 'akita_shinkansen',
        keyword: 'こまち',
        terminalName: '東京',
        trainNumberFormula: (num) => `${num >= 60 && num <= 99 ? 8000 + num : 3000 + num}M`,
      },
    ],
    pairs: [
      {
        name: 'やまびこ + つばさ',
        primaryType: 'yamabiko',
        secondaryType: 'tsubasa',
        refStationId: 'TS-01',
        defaultSplitStationId: 'TS-09',
        primaryCars: 10,
        secondaryCars: 7,
        defaultPrimaryDestOut: '仙台',
        defaultSecondaryDestOut: '新庄',
        defaultDestIn: '東京',
        maxTimeDiffSec: 60,
      },
      {
        name: 'はやぶさ + こまち',
        primaryType: 'hayabusa',
        secondaryType: 'komachi',
        refStationId: 'TS-01',
        defaultSplitStationId: 'TS-18',
        primaryCars: 10,
        secondaryCars: 7,
        defaultPrimaryDestOut: '新函館北斗',
        defaultSecondaryDestOut: '秋田',
        defaultDestIn: '東京',
        maxTimeDiffSec: 60,
      },
    ],
  },

  // 3. 中央線快速・中央本線（あずさ/かいじ ＋ 富士回遊）設定
  chuoFujiKaiyu: {
    fujiTrainNumbers: [
      '2103M', '2107M', '2111M', '2115M', '8111M', '9193M',
      '2132M', '2136M', '2144M', '2148M', '8194M', '9178M',
    ],
    fujiSpecialTrainIds: ['39448'],
    branchLineId: 'fujikyu',
    branchDestName: '河口湖',
    defaultMainDestName: '甲府',
    defaultInboundDestName: '新宿',
    boundaryStationId: 'JC-24',
    splitStationId: 'JC-32',
    defaultTerminalStationId: 'JC-05',
    primaryCars: 9,
    secondaryCars: 3,
    maxTimeDiffCM: 120,
    maxTimeDiffChuo: 60,
  },

  // 4. 東海道線（特急踊り子 伊豆急下田行 ＋ 修善寺行）設定
  tokaidoOdoriko: {
    lineId: 'tokaido',
    branchLineId: 'izuhakone_sunzu',
    keyword: '踊り子',
    terminalName: '東京',
    redundantTripIds: [
      'WD_OUT_JT-01_0900_41961',
      'WD_OUT_JT-01_1200_41963',
      'HD_OUT_JT-01_0900_41961',
      'HD_OUT_JT-01_1030_41962',
      'HD_OUT_JT-01_1200_41963',
    ],
    terminalStationId: 'JT-01',
    splitStationId: 'JT-21',
    primaryCars: 9,
    secondaryCars: 5,
    primaryDestOut: '伊豆急下田',
    secondaryDestOut: '修善寺',
    destIn: '東京',
    secondaryPrevStationMarker: 'CA-02',
    secondaryTrainNumberRegex: /^4\d{3}/,
    maxTimeDiffSec: 300,
  },

  // 5. 小田急線（特急ロマンスカー はこね ＋ えのしま）設定
  odakyuRomancecar: {
    lineId: 'odakyu_odawara',
    terminalStationId: 'OH-01',
    splitStationId: 'OH-28',
    primaryCars: 6,
    secondaryCars: 4,
    defaultPrimaryDest: '箱根湯本',
    defaultSecondaryDest: '片瀬江ノ島',
    secondaryDestKeyword: '江ノ島',
    secondaryTrainKeyword: 'えのしま',
    maxTimeDiffSec: 60,
  },
};
