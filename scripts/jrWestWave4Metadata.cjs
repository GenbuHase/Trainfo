// scripts/jrWestWave4Metadata.cjs
/**
 * JR西日本 周辺路線・山陽・播但・赤穂・小浜線等10路線 (Wave 4) メタデータ定義
 */

module.exports = [
  {
    id: 'jr_kinokuni',
    name: 'JRきのくに線',
    shortName: 'きのくに線',
    operator: 'JR西日本',
    lineColor: '#00a7db',
    accentColor: '#ffffff',
    defaultCars: 4,
    stationList: [
      '和歌山', '宮前', '紀三井寺', '黒江', '海南', '冷水浦', '加茂郷', '下津', '初島', '箕島',
      '紀伊宮原', '藤並', '湯浅', '広川ビーチ', '紀伊由良', '紀伊内原', '御坊', '道成寺', '和佐', '稲原',
      '印南', '切目', '岩代', '南部', '芳養', '紀伊田辺', '紀伊新庄', '朝来', '白浜', '紀伊富田',
      '椿', '紀伊日置', '周参見', '見老津', '江住', '和深', '田子', '田並', '串本', '紀伊有田',
      '古座', '紀伊田原', '紀伊浦神', '下里', '太地', '湯川', '紀伊勝浦', '那智', '宇久井', '紀伊天満',
      '紀伊佐野', '三輪崎', '新宮'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '紀勢線',
    directionNames: {
      inbound: '和歌山・天王寺・大阪方面',
      outbound: '御坊・白浜・新宮方面',
      inboundFull: '上り 和歌山・天王寺・大阪方面',
      outboundFull: '下り 御坊・白浜・新宮方面',
      inboundShort: '和歌山方面',
      outboundShort: '新宮方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#00a7db' },
      { id: 'rapid', name: '快速', shortName: '快速', color: '#ff7700' },
      { id: 'limitedExp', name: '特急', shortName: '特急', color: '#e60012' }
    ]
  },
  {
    id: 'jr_kansai_kameyama_kamo',
    name: 'JR関西本線（亀山～加茂）',
    shortName: '関西本線（亀山～加茂）',
    operator: 'JR西日本',
    lineColor: '#800080',
    accentColor: '#ffffff',
    defaultCars: 2,
    stationList: [
      '亀山', '関', '加太', '柘植', '佐那具', '伊賀上野', '島ヶ原', '月ヶ瀬口', '大河原', '笠置', '加茂'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '関西線',
    directionNames: {
      inbound: '加茂・奈良方面',
      outbound: '柘植・亀山方面',
      inboundFull: '上り 加茂・奈良方面',
      outboundFull: '下り 柘植・亀山方面',
      inboundShort: '加茂方面',
      outboundShort: '亀山方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#800080' }
    ]
  },
  {
    id: 'jr_sanyo_himeji_kamigori',
    name: 'JR山陽本線（姫路～上郡）',
    shortName: '山陽本線（姫路～上郡）',
    operator: 'JR西日本',
    lineColor: '#0072bc',
    accentColor: '#ffffff',
    defaultCars: 8,
    stationList: [
      { name: '姫路', number: 'JR-A85' },
      { name: '英賀保', number: undefined },
      { name: 'はりま勝原', number: undefined },
      { name: '網干', number: undefined },
      { name: '竜野', number: undefined },
      { name: '相生', number: undefined },
      { name: '有年', number: undefined },
      { name: '上郡', number: undefined }
    ],
    n02LineName: '山陽線',
    directionNames: {
      inbound: '姫路・神戸・大阪方面',
      outbound: '相生・上郡・岡山方面',
      inboundFull: '上り 姫路・神戸・大阪方面',
      outboundFull: '下り 相生・上郡・岡山方面',
      inboundShort: '姫路方面',
      outboundShort: '上郡方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#0072bc' },
      { id: 'special_rapid', name: '新快速', shortName: '新快', color: '#0072bc' },
      { id: 'limitedExp', name: '特急', shortName: '特急', color: '#e60012' }
    ]
  },
  {
    id: 'jr_ako',
    name: 'JR赤穂線',
    shortName: '赤穂線',
    operator: 'JR西日本',
    lineColor: '#e6b422',
    accentColor: '#ffffff',
    defaultCars: 4,
    stationList: [
      '相生', '西相生', '坂越', '播州赤穂', '天和', '備前福河', '寒河', '日生', '伊里', '備前片上',
      '西片上', '伊部', '香登', '長船', '邑久', '大富', '西大寺', '大多羅', '東岡山'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '赤穂線',
    directionNames: {
      inbound: '播州赤穂・相生・姫路方面',
      outbound: '日生・西大寺・岡山方面',
      inboundFull: '上り 播州赤穂・相生・姫路方面',
      outboundFull: '下り 日生・西大寺・岡山方面',
      inboundShort: '相生方面',
      outboundShort: '東岡山方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#e6b422' },
      { id: 'special_rapid', name: '新快速', shortName: '新快', color: '#0072bc' }
    ]
  },
  {
    id: 'jr_kakogawa',
    name: 'JR加古川線',
    shortName: '加古川線',
    operator: 'JR西日本',
    lineColor: '#008e74',
    accentColor: '#ffffff',
    defaultCars: 2,
    stationList: [
      '加古川', '日岡', '神野', '厄神', '市場', '小野町', '粟生', '河合西', '青野ヶ原', '社町',
      '滝野', '滝', '西脇市', '新西脇', '比延', '日本へそ公園', '黒田庄', '本黒田', '船町口', '久下村', '谷川'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '加古川線',
    directionNames: {
      inbound: '厄神・加古川方面',
      outbound: '西脇市・谷川方面',
      inboundFull: '上り 厄神・加古川方面',
      outboundFull: '下り 西脇市・谷川方面',
      inboundShort: '加古川方面',
      outboundShort: '谷川方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#008e74' }
    ]
  },
  {
    id: 'jr_kishin',
    name: 'JR姫新線',
    shortName: '姫新線',
    operator: 'JR西日本',
    lineColor: '#e83929',
    accentColor: '#ffffff',
    defaultCars: 2,
    stationList: [
      '姫路', '播磨高岡', '余部', '太市', '本竜野', '東觜崎', '播磨新宮', '千本', '西栗栖', '三日月',
      '播磨徳久', '佐用', '上月'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '姫新線',
    directionNames: {
      inbound: '播磨新宮・姫路方面',
      outbound: '佐用・上月方面',
      inboundFull: '上り 播磨新宮・姫路方面',
      outboundFull: '下り 佐用・上月方面',
      inboundShort: '姫路方面',
      outboundShort: '上月方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#e83929' }
    ]
  },
  {
    id: 'jr_bantan',
    name: 'JR播但線',
    shortName: '播但線',
    operator: 'JR西日本',
    lineColor: '#a22041',
    accentColor: '#ffffff',
    defaultCars: 2,
    stationList: [
      '姫路', '京口', '野里', '砥堀', '仁豊野', '香呂', '溝口', '福崎', '甘地', '鶴居',
      '新野', '寺前', '長谷', '生野', '新井', '青倉', '竹田', '和田山'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '播但線',
    directionNames: {
      inbound: '福崎・姫路方面',
      outbound: '寺前・生野・和田山方面',
      inboundFull: '上り 福崎・姫路方面',
      outboundFull: '下り 寺前・生野・和田山方面',
      inboundShort: '姫路方面',
      outboundShort: '和田山方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#a22041' },
      { id: 'limitedExp', name: '特急', shortName: '特急', color: '#e60012' }
    ]
  },
  {
    id: 'jr_maizuru',
    name: 'JR舞鶴線',
    shortName: '舞鶴線',
    operator: 'JR西日本',
    lineColor: '#008080',
    accentColor: '#ffffff',
    defaultCars: 2,
    stationList: [
      '綾部', '淵垣', '梅迫', '真倉', '西舞鶴', '東舞鶴'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '舞鶴線',
    directionNames: {
      inbound: '綾部・福知山・京都方面',
      outbound: '西舞鶴・東舞鶴方面',
      inboundFull: '上り 綾部・福知山・京都方面',
      outboundFull: '下り 西舞鶴・東舞鶴方面',
      inboundShort: '綾部方面',
      outboundShort: '東舞鶴方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#008080' },
      { id: 'limitedExp', name: '特急', shortName: '特急', color: '#e60012' }
    ]
  },
  {
    id: 'jr_obama',
    name: 'JR小浜線',
    shortName: '小浜線',
    operator: 'JR西日本',
    lineColor: '#0099cc',
    accentColor: '#ffffff',
    defaultCars: 2,
    stationList: [
      '敦賀', '西敦賀', '粟野', '東美浜', '美浜', '気山', '三方', '藤井', '十村', '大鳥羽',
      '若狭有田', '上中', '新平野', '東小浜', '小浜', '勢浜', '加斗', '若狭本郷', '若狭和田', '若狭高浜',
      '三松', '青郷', '松尾寺', '東舞鶴'
    ].map(name => ({ name, number: undefined })),
    n02LineName: '小浜線',
    directionNames: {
      inbound: '小浜・敦賀方面',
      outbound: '小浜・東舞鶴方面',
      inboundFull: '上り 小浜・敦賀方面',
      outboundFull: '下り 小浜・東舞鶴方面',
      inboundShort: '敦賀方面',
      outboundShort: '東舞鶴方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#0099cc' }
    ]
  },
  {
    id: 'jr_wadamisaki',
    name: 'JR和田岬線',
    shortName: '和田岬線',
    operator: 'JR西日本',
    lineColor: '#0072bc',
    accentColor: '#ffffff',
    defaultCars: 6,
    stationList: [
      { name: '兵庫', number: undefined },
      { name: '和田岬', number: undefined }
    ],
    n02LineName: '山陽線',
    directionNames: {
      inbound: '兵庫・神戸方面',
      outbound: '和田岬方面',
      inboundFull: '上り 兵庫方面',
      outboundFull: '下り 和田岬方面',
      inboundShort: '兵庫方面',
      outboundShort: '和田岬方面'
    },
    defaultTrainTypes: [
      { id: 'local', name: '普通', shortName: '普通', color: '#0072bc' }
    ]
  }
];
