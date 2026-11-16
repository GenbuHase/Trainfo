// scripts/jrCentralMetadata.cjs
// JR東海 在来線10路線 メタデータ定義マスタ

const LINE_SPECS = {
  jr_chuo_west: {
    lineId: 'jr_chuo_west',
    name: 'JR中央本線（名古屋～塩尻）',
    shortName: '中央本線（中央西線）',
    operator: 'JR東海',
    lineColor: '#187fc4',
    accentColor: '#ff7322',
    defaultCars: 8,
    area: 'tokai',
    directionNames: {
      inbound: '名古屋方面',
      outbound: '中津川・塩尻方面',
      inboundFull: '上り 多治見・名古屋方面',
      outboundFull: '下り 中津川・木曽福島・塩尻方面',
      inboundShort: '名古屋方面',
      outboundShort: '塩尻方面'
    },
    n02LineName: '中央線',
    opFilter: ['東海旅客鉄道'],
    startStation: '名古屋',
    endStation: '塩尻',
    numberingPrefix: 'CF',
    numberingMaxIdx: 19 // CF00 (名古屋) 〜 CF19 (中津川)
  },
  jr_takayama: {
    lineId: 'jr_takayama',
    name: 'JR高山本線',
    shortName: '高山本線',
    operator: 'JR東海',
    lineColor: '#9b1b30',
    accentColor: '#ff7322',
    defaultCars: 4,
    area: 'tokai',
    directionNames: {
      inbound: '岐阜方面',
      outbound: '美濃太田・高山・富山方面',
      inboundFull: '上り 美濃太田・岐阜方面',
      outboundFull: '下り 高山・富山方面',
      inboundShort: '岐阜方面',
      outboundShort: '富山方面'
    },
    n02LineName: '高山線',
    opFilter: ['東海旅客鉄道', '西日本旅客鉄道'],
    startStation: '岐阜',
    endStation: '富山',
    numberingPrefix: 'CG',
    numberingMaxIdx: 7 // CG00 (岐阜) 〜 CG07 (美濃太田)
  },
  jr_kansai_nagoya_kameyama: {
    lineId: 'jr_kansai_nagoya_kameyama',
    name: 'JR関西本線（名古屋～亀山）',
    shortName: '関西本線（名古屋～亀山）',
    operator: 'JR東海',
    lineColor: '#00a960',
    accentColor: '#ff7322',
    defaultCars: 4,
    area: 'tokai',
    directionNames: {
      inbound: '名古屋方面',
      outbound: '桑名・四日市・亀山方面',
      inboundFull: '上り 蟹江・名古屋方面',
      outboundFull: '下り 桑名・四日市・亀山方面',
      inboundShort: '名古屋方面',
      outboundShort: '亀山方面'
    },
    n02LineName: '関西線',
    opFilter: ['東海旅客鉄道'],
    startStation: '名古屋',
    endStation: '亀山',
    numberingPrefix: 'CJ',
    numberingMaxIdx: 17 // CJ00 (名古屋) 〜 CJ17 (亀山)
  },
  jr_kisei_kameyama_shingu: {
    lineId: 'jr_kisei_kameyama_shingu',
    name: 'JR紀勢本線（亀山～新宮）',
    shortName: '紀勢本線（亀山～新宮）',
    operator: 'JR東海',
    lineColor: '#ff7322',
    accentColor: '#00a7db',
    defaultCars: 4,
    area: 'tokai',
    directionNames: {
      inbound: '津・亀山方面',
      outbound: '松阪・尾鷲・新宮方面',
      inboundFull: '上り 津・亀山方面',
      outboundFull: '下り 松阪・尾鷲・新宮方面',
      inboundShort: '亀山方面',
      outboundShort: '新宮方面'
    },
    n02LineName: '紀勢線',
    opFilter: ['東海旅客鉄道', '西日本旅客鉄道'],
    startStation: '亀山',
    endStation: '新宮',
    numberingPrefix: null // 公式未制定
  },
  jr_iida: {
    lineId: 'jr_iida',
    name: 'JR飯田線',
    shortName: '飯田線',
    operator: 'JR東海',
    lineColor: '#228b22',
    accentColor: '#ff7322',
    defaultCars: 3,
    area: 'tokai',
    directionNames: {
      inbound: '豊川・豊橋方面',
      outbound: '天竜峡・飯田・辰野方面',
      inboundFull: '上り 豊川・豊橋方面',
      outboundFull: '下り 天竜峡・飯田・辰野方面',
      inboundShort: '豊橋方面',
      outboundShort: '辰野方面'
    },
    n02LineName: '飯田線',
    opFilter: ['東海旅客鉄道'],
    startStation: '豊橋',
    endStation: '辰野',
    numberingPrefix: 'CD',
    numberingMaxIdx: 5 // CD00 (豊橋) 〜 CD05 (豊川)
  },
  jr_minobu: {
    lineId: 'jr_minobu',
    name: 'JR身延線',
    shortName: '身延線',
    operator: 'JR東海',
    lineColor: '#931b2c',
    accentColor: '#ff7322',
    defaultCars: 3,
    area: 'tokai',
    directionNames: {
      inbound: '富士宮・富士方面',
      outbound: '身延・甲府方面',
      inboundFull: '上り 富士宮・富士方面',
      outboundFull: '下り 身延・甲府方面',
      inboundShort: '富士方面',
      outboundShort: '甲府方面'
    },
    n02LineName: '身延線',
    opFilter: ['東海旅客鉄道'],
    startStation: '富士',
    endStation: '甲府',
    numberingPrefix: 'CC',
    numberingMaxIdx: 7 // CC00 (富士) 〜 CC07 (西富士宮)
  },
  jr_taketoyo: {
    lineId: 'jr_taketoyo',
    name: 'JR武豊線',
    shortName: '武豊線',
    operator: 'JR東海',
    lineColor: '#6f3c1d',
    accentColor: '#ff7322',
    defaultCars: 4,
    area: 'tokai',
    directionNames: {
      inbound: '大府・名古屋方面',
      outbound: '半田・武豊方面',
      inboundFull: '上り 大府・名古屋方面',
      outboundFull: '下り 半田・武豊方面',
      inboundShort: '大府方面',
      outboundShort: '武豊方面'
    },
    n02LineName: '武豊線',
    opFilter: ['東海旅客鉄道'],
    startStation: '大府',
    endStation: '武豊',
    numberingPrefix: 'CE',
    numberingMaxIdx: 9 // CE00 (大府) 〜 CE09 (武豊)
  },
  jr_taita: {
    lineId: 'jr_taita',
    name: 'JR太多線',
    shortName: '太多線',
    operator: 'JR東海',
    lineColor: '#d97706',
    accentColor: '#ff7322',
    defaultCars: 2,
    area: 'tokai',
    directionNames: {
      inbound: '多治見方面',
      outbound: '美濃太田方面',
      inboundFull: '上り 多治見方面',
      outboundFull: '下り 美濃太田方面',
      inboundShort: '多治見方面',
      outboundShort: '美濃太田方面'
    },
    n02LineName: '太多線',
    opFilter: ['東海旅客鉄道'],
    startStation: '美濃太田',
    endStation: '多治見',
    numberingPrefix: 'CI',
    numberingMaxIdx: 7 // CI00 (美濃太田) 〜 CI07 (多治見)
  },
  jr_meisho: {
    lineId: 'jr_meisho',
    name: 'JR名松線',
    shortName: '名松線',
    operator: 'JR東海',
    lineColor: '#228b22',
    accentColor: '#ff7322',
    defaultCars: 1,
    area: 'tokai',
    directionNames: {
      inbound: '松阪方面',
      outbound: '家城・伊勢奥津方面',
      inboundFull: '上り 松阪方面',
      outboundFull: '下り 家城・伊勢奥津方面',
      inboundShort: '松阪方面',
      outboundShort: '伊勢奥津方面'
    },
    n02LineName: '名松線',
    opFilter: ['東海旅客鉄道'],
    startStation: '松阪',
    endStation: '伊勢奥津',
    numberingPrefix: null
  },
  jr_sangu: {
    lineId: 'jr_sangu',
    name: 'JR参宮線',
    shortName: '参宮線',
    operator: 'JR東海',
    lineColor: '#ff7322',
    accentColor: '#ffd700',
    defaultCars: 2,
    area: 'tokai',
    directionNames: {
      inbound: '多気・亀山・名古屋方面',
      outbound: '伊勢市・鳥羽方面',
      inboundFull: '上り 多気・亀山・名古屋方面',
      outboundFull: '下り 伊勢市・鳥羽方面',
      inboundShort: '多気方面',
      outboundShort: '鳥羽方面'
    },
    n02LineName: '参宮線',
    opFilter: ['東海旅客鉄道'],
    startStation: '多気',
    endStation: '鳥羽',
    numberingPrefix: null
  }
};

module.exports = { LINE_SPECS };
