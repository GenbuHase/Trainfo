// scripts/jrWestWave2Metadata.cjs
// JR西日本 アーバンネットワーク中核11路線 メタデータ定義マスタ

const LINE_SPECS_WAVE2 = {
  jr_osaka_loop: {
    lineId: 'jr_osaka_loop',
    name: 'JR大阪環状線',
    shortName: '大阪環状線',
    operator: 'JR西日本',
    lineColor: '#e72227',
    accentColor: '#ffffff',
    defaultCars: 8,
    area: 'kansai',
    directionNames: {
      inbound: '内回り（京橋・大阪方面）',
      outbound: '外回り（鶴橋・天王寺方面）',
      inboundFull: '内回り 京橋・大阪方面',
      outboundFull: '外回り 鶴橋・天王寺方面',
      inboundShort: '内回り',
      outboundShort: '外回り'
    },
    n02LineName: '大阪環状線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '天王寺', '寺田町', '桃谷', '鶴橋', '玉造', '森ノ宮', '大阪城公園', '京橋', '桜ノ宮', '天満',
      '大阪', '福島', '野田', '西九条', '弁天町', '大正', '芦原橋', '今宮', '新今宮'
    ],
    numbering: {
      '天王寺': 'JR-O01', '寺田町': 'JR-O02', '桃谷': 'JR-O03', '鶴橋': 'JR-O04', '玉造': 'JR-O05',
      '森ノ宮': 'JR-O06', '大阪城公園': 'JR-O07', '京橋': 'JR-O08', '桜ノ宮': 'JR-O09', '天満': 'JR-O10',
      '大阪': 'JR-O11', '福島': 'JR-O12', '野田': 'JR-O13', '西九条': 'JR-O14', '弁天町': 'JR-O15',
      '大正': 'JR-O16', '芦原橋': 'JR-O17', '今宮': 'JR-O18', '新今宮': 'JR-O19'
    }
  },
  jr_yumesaki: {
    lineId: 'jr_yumesaki',
    name: 'JRゆめ咲線',
    shortName: 'ゆめ咲線',
    operator: 'JR西日本',
    lineColor: '#001e62',
    accentColor: '#ffffff',
    defaultCars: 8,
    area: 'kansai',
    directionNames: {
      inbound: '西九条・大阪環状線方面',
      outbound: 'ユニバーサルシティ・桜島方面',
      inboundFull: '上り 西九条・大阪方面',
      outboundFull: '下り ユニバーサルシティ・桜島方面',
      inboundShort: '西九条方面',
      outboundShort: '桜島方面'
    },
    n02LineName: '桜島線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '西九条', '安治川口', 'ユニバーサルシティ', '桜島'
    ],
    numbering: {
      '西九条': 'JR-P14', '安治川口': 'JR-P15', 'ユニバーサルシティ': 'JR-P16', '桜島': 'JR-P17'
    }
  },
  jr_tozai: {
    lineId: 'jr_tozai',
    name: 'JR東西線',
    shortName: 'JR東西線',
    operator: 'JR西日本',
    lineColor: '#e85298',
    accentColor: '#ffffff',
    defaultCars: 7,
    area: 'kansai',
    directionNames: {
      inbound: '京橋・学研都市線方面',
      outbound: '尼崎・宝塚・神戸線方面',
      inboundFull: '上り 京橋・四条畷・同志社前方面',
      outboundFull: '下り 尼崎・宝塚・三ノ宮方面',
      inboundShort: '京橋方面',
      outboundShort: '尼崎方面'
    },
    n02LineName: 'JR東西線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '京橋', '大阪城北詰', '大阪天満宮', '北新地', '新福島', '海老江', '御幣島', '加島', '尼崎'
    ],
    numbering: {
      '京橋': 'JR-H41', '大阪城北詰': 'JR-H42', '大阪天満宮': 'JR-H43', '北新地': 'JR-H44',
      '新福島': 'JR-H45', '海老江': 'JR-H46', '御幣島': 'JR-H47', '加島': 'JR-H48', '尼崎': 'JR-H49'
    }
  },
  jr_gakken_toshi: {
    lineId: 'jr_gakken_toshi',
    name: 'JR学研都市線',
    shortName: '学研都市線',
    operator: 'JR西日本',
    lineColor: '#b2d235',
    accentColor: '#ffffff',
    defaultCars: 7,
    area: 'kansai',
    directionNames: {
      inbound: '四条畷・京橋方面',
      outbound: '松井山手・同志社前・木津方面',
      inboundFull: '上り 京橋・JR東西線方面',
      outboundFull: '下り 四条畷・松井山手・同志社前・木津方面',
      inboundShort: '京橋方面',
      outboundShort: '木津方面'
    },
    n02LineName: '片町線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '木津', '西木津', '祝園', '下狛', 'JR三山木', '同志社前', '京田辺', '大住', '松井山手',
      '長尾', '藤阪', '津田', '河内磐船', '星田', '寝屋川公園', '忍ケ丘', '四条畷', '野崎',
      '住道', '鴻池新田', '徳庵', '放出', '鴫野', '京橋'
    ],
    numbering: {
      '木津': 'JR-H18', '西木津': 'JR-H19', '祝園': 'JR-H20', '下狛': 'JR-H21', 'JR三山木': 'JR-H22',
      '同志社前': 'JR-H23', '京田辺': 'JR-H24', '大住': 'JR-H25', '松井山手': 'JR-H26', '長尾': 'JR-H27',
      '藤阪': 'JR-H28', '津田': 'JR-H29', '河内磐船': 'JR-H30', '星田': 'JR-H31', '寝屋川公園': 'JR-H32',
      '忍ケ丘': 'JR-H33', '四条畷': 'JR-H34', '野崎': 'JR-H35', '住道': 'JR-H36', '鴻池新田': 'JR-H37',
      '徳庵': 'JR-H38', '放出': 'JR-H39', '鴫野': 'JR-H40', '京橋': 'JR-H41'
    }
  },
  jr_takarazuka: {
    lineId: 'jr_takarazuka',
    name: 'JR宝塚線',
    shortName: '宝塚線',
    operator: 'JR西日本',
    lineColor: '#fcc800',
    accentColor: '#ffffff',
    defaultCars: 7,
    area: 'kansai',
    directionNames: {
      inbound: '尼崎・大阪方面',
      outbound: '宝塚・三田・篠山口方面',
      inboundFull: '上り 尼崎・大阪・JR東西線方面',
      outboundFull: '下り 宝塚・三田・篠山口方面',
      inboundShort: '尼崎方面',
      outboundShort: '篠山口方面'
    },
    n02LineName: '福知山線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '尼崎', '塚口', '猪名寺', '伊丹', '北伊丹', '川西池田', '中山寺', '宝塚', '生瀬', '西宮名塩',
      '武田尾', '道場', '三田', '新三田', '広野', '相野', '藍本', '草野', '古市', '南矢代', '篠山口'
    ],
    numbering: {
      '尼崎': 'JR-G49', '塚口': 'JR-G50', '猪名寺': 'JR-G51', '伊丹': 'JR-G52', '北伊丹': 'JR-G53',
      '川西池田': 'JR-G54', '中山寺': 'JR-G55', '宝塚': 'JR-G56', '生瀬': 'JR-G57', '西宮名塩': 'JR-G58',
      '武田尾': 'JR-G59', '道場': 'JR-G60', '三田': 'JR-G61', '新三田': 'JR-G62', '広野': 'JR-G63',
      '相野': 'JR-G64', '藍本': 'JR-G65', '草野': 'JR-G66', '古市': 'JR-G67', '南矢代': 'JR-G68',
      '篠山口': 'JR-G69'
    }
  },
  jr_fukuchiyama_north: {
    lineId: 'jr_fukuchiyama_north',
    name: 'JR福知山線（篠山口～福知山）',
    shortName: '福知山線（篠山口～福知山）',
    operator: 'JR西日本',
    lineColor: '#fcc800',
    accentColor: '#ffffff',
    defaultCars: 4,
    area: 'kansai',
    directionNames: {
      inbound: '篠山口・宝塚方面',
      outbound: '谷川・福知山方面',
      inboundFull: '上り 篠山口・三田・宝塚方面',
      outboundFull: '下り 谷川・柏原・福知山方面',
      inboundShort: '篠山口方面',
      outboundShort: '福知山方面'
    },
    n02LineName: '福知山線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '篠山口', '丹波大山', '下滝', '谷川', '柏原', '石生', '黒井', '市島', '丹波竹田', '福知山'
    ],
    numbering: {} // 路線記号Gのみ、番号未制定
  },
  jr_yamatoji: {
    lineId: 'jr_yamatoji',
    name: 'JR大和路線',
    shortName: '大和路線',
    operator: 'JR西日本',
    lineColor: '#00a960',
    accentColor: '#ffffff',
    defaultCars: 8,
    area: 'kansai',
    directionNames: {
      inbound: '天王寺・JR難波・大阪方面',
      outbound: '王寺・奈良・加茂方面',
      inboundFull: '上り 天王寺・JR難波・大阪環状線方面',
      outboundFull: '下り 王寺・奈良・木津・加茂方面',
      inboundShort: 'JR難波方面',
      outboundShort: '加茂方面'
    },
    n02LineName: '関西線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '加茂', '木津', '平城山', '奈良', '郡山', '大和小泉', '法隆寺', '王寺', '三郷',
      '河内堅上', '高井田', '柏原', '志紀', '八尾', '久宝寺', '加美', '平野', '東部市場前',
      '天王寺', '新今宮', '今宮', 'JR難波'
    ],
    numbering: {
      '加茂': 'JR-Q39', '木津': 'JR-Q38', '平城山': 'JR-Q37', '奈良': 'JR-Q36', '郡山': 'JR-Q35',
      '大和小泉': 'JR-Q34', '法隆寺': 'JR-Q33', '王寺': 'JR-Q31', '三郷': 'JR-Q30', '河内堅上': 'JR-Q29',
      '高井田': 'JR-Q28', '柏原': 'JR-Q27', '志紀': 'JR-Q26', '八尾': 'JR-Q25', '久宝寺': 'JR-Q24',
      '加美': 'JR-Q23', '平野': 'JR-Q22', '東部市場前': 'JR-Q21', '天王寺': 'JR-Q20', '新今宮': 'JR-Q19',
      '今宮': 'JR-Q18', 'JR難波': 'JR-Q17'
    }
  },
  jr_osaka_higashi: {
    lineId: 'jr_osaka_higashi',
    name: 'JRおおさか東線',
    shortName: 'おおさか東線',
    operator: 'JR西日本',
    lineColor: '#384c97',
    accentColor: '#ffffff',
    defaultCars: 6,
    area: 'kansai',
    directionNames: {
      inbound: '新大阪・大阪方面',
      outbound: '放出・久宝寺方面',
      inboundFull: '上り 新大阪・大阪方面',
      outboundFull: '下り 放出・久宝寺・奈良方面',
      inboundShort: '大阪方面',
      outboundShort: '久宝寺方面'
    },
    n02LineName: 'おおさか東線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '大阪', '新大阪', '南吹田', 'JR淡路', '城北公園通', 'JR野江', '鴫野', '放出',
      '高井田中央', 'JR河内永和', 'JR俊徳道', 'JR長瀬', '衣摺加美北', '新加美', '久宝寺'
    ],
    numbering: {
      '大阪': 'JR-F01', '新大阪': 'JR-F02', '南吹田': 'JR-F03', 'JR淡路': 'JR-F04',
      '城北公園通': 'JR-F05', 'JR野江': 'JR-F06', '鴫野': 'JR-F07', '放出': 'JR-F08',
      '高井田中央': 'JR-F09', 'JR河内永和': 'JR-F10', 'JR俊徳道': 'JR-F11', 'JR長瀬': 'JR-F12',
      '衣摺加美北': 'JR-F13', '新加美': 'JR-F14', '久宝寺': 'JR-F15'
    }
  },
  jr_hanwa: {
    lineId: 'jr_hanwa',
    name: 'JR阪和線',
    shortName: '阪和線',
    operator: 'JR西日本',
    lineColor: '#f39800',
    accentColor: '#ffffff',
    defaultCars: 8,
    area: 'kansai',
    directionNames: {
      inbound: '天王寺・大阪方面',
      outbound: '鳳・日根野・和歌山方面',
      inboundFull: '上り 天王寺・大阪環状線方面',
      outboundFull: '下り 鳳・日根野・関西空港・和歌山方面',
      inboundShort: '天王寺方面',
      outboundShort: '和歌山方面'
    },
    n02LineName: '阪和線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '天王寺', '美章園', '南田辺', '鶴ヶ丘', '長居', '我孫子町', '杉本町', '浅香', '堺市',
      '三国ヶ丘', '百舌鳥', '上野芝', '津久野', '鳳', '富木', '北信太', '信太山', '和泉府中',
      '久米田', '下松', '東岸和田', '東貝塚', '和泉橋本', '東佐野', '熊取', '日根野', '長滝',
      '新家', '和泉砂川', '和泉鳥取', '山中渓', '紀伊', '六十谷', '紀伊中ノ島', '和歌山'
    ],
    numbering: {
      '天王寺': 'JR-R20', '美章園': 'JR-R21', '南田辺': 'JR-R22', '鶴ヶ丘': 'JR-R23', '長居': 'JR-R24',
      '我孫子町': 'JR-R25', '杉本町': 'JR-R26', '浅香': 'JR-R27', '堺市': 'JR-R28', '三国ヶ丘': 'JR-R29',
      '百舌鳥': 'JR-R30', '上野芝': 'JR-R31', '津久野': 'JR-R32', '鳳': 'JR-R33', '富木': 'JR-R34',
      '北信太': 'JR-R35', '信太山': 'JR-R36', '和泉府中': 'JR-R37', '久米田': 'JR-R38', '下松': 'JR-R39',
      '東岸和田': 'JR-R40', '東貝塚': 'JR-R41', '和泉橋本': 'JR-R42', '東佐野': 'JR-R43', '熊取': 'JR-R44',
      '日根野': 'JR-R45', '長滝': 'JR-R46', '新家': 'JR-R47', '和泉砂川': 'JR-R48', '和泉鳥取': 'JR-R49',
      '山中渓': 'JR-R50', '紀伊': 'JR-R51', '六十谷': 'JR-R52', '紀伊中ノ島': 'JR-R53', '和歌山': 'JR-R54'
    }
  },
  jr_kansai_airport: {
    lineId: 'jr_kansai_airport',
    name: 'JR関西空港線',
    shortName: '関西空港線',
    operator: 'JR西日本',
    lineColor: '#0072bc',
    accentColor: '#ffffff',
    defaultCars: 8,
    area: 'kansai',
    directionNames: {
      inbound: '日根野・天王寺・大阪方面',
      outbound: '関西空港方面',
      inboundFull: '上り 日根野・天王寺・大阪方面',
      outboundFull: '下り りんくうタウン・関西空港方面',
      inboundShort: '日根野方面',
      outboundShort: '関西空港方面'
    },
    n02LineName: '関西空港線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '日根野', 'りんくうタウン', '関西空港'
    ],
    numbering: {
      '日根野': 'JR-S45', 'りんくうタウン': 'JR-S46', '関西空港': 'JR-S47'
    }
  },
  jr_hokuriku_maibara_tsuruga: {
    lineId: 'jr_hokuriku_maibara_tsuruga',
    name: 'JR北陸本線（米原～敦賀）',
    shortName: '北陸本線（米原～敦賀）',
    operator: 'JR西日本',
    lineColor: '#0072bc',
    accentColor: '#ffffff',
    defaultCars: 4,
    area: 'kansai',
    directionNames: {
      inbound: '長浜・米原方面',
      outbound: '近江塩津・敦賀方面',
      inboundFull: '上り 長浜・米原・京都方面',
      outboundFull: '下り 木ノ本・近江塩津・敦賀方面',
      inboundShort: '米原方面',
      outboundShort: '敦賀方面'
    },
    n02LineName: '北陸線',
    opFilter: ['西日本旅客鉄道'],
    stations: [
      '米原', '坂田', '田村', '長浜', '虎姫', '河毛', '高月', '木ノ本', '余呉', '近江塩津', '新疋田', '敦賀'
    ],
    numbering: {
      '敦賀': 'JR-A01', '新疋田': 'JR-A02', '近江塩津': 'JR-A03', '余呉': 'JR-A04', '木ノ本': 'JR-A05',
      '高月': 'JR-A06', '河毛': 'JR-A07', '虎姫': 'JR-A08', '長浜': 'JR-A09', '田村': 'JR-A10',
      '坂田': 'JR-A11', '米原': 'JR-A12'
    }
  }
};

module.exports = { LINE_SPECS_WAVE2 };
