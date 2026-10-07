// odakyu_odawara 駅メタデータ定義
import type { Station } from '../../../types';

export const ODAKYU_ODAWARA_STATIONS: Station[] = [
  {
    "id": "OH-01",
    "lineId": "odakyu_odawara",
    "number": 1,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.6901052,
    "lng": 139.6996442,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR中央線",
      "京王線",
      "都営新宿線",
      "都営大江戸線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都新宿区西新宿一丁目1-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1-6番線",
      "outbound": "1-6番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-02",
    "lineId": "odakyu_odawara",
    "number": 2,
    "name": "南新宿",
    "nameKana": "みなみしんじゅく",
    "nameEn": "Minami-Shinjuku",
    "lat": 35.6837203,
    "lng": 139.698843,
    "transfers": [],
    "address": "東京都渋谷区代々木二丁目29-15",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-03",
    "lineId": "odakyu_odawara",
    "number": 3,
    "name": "参宮橋",
    "nameKana": "さんぐうばし",
    "nameEn": "Sangubashi",
    "lat": 35.6787515,
    "lng": 139.6936534,
    "transfers": [],
    "address": "東京都渋谷区代々木四丁目3-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-04",
    "lineId": "odakyu_odawara",
    "number": 4,
    "name": "代々木八幡",
    "nameKana": "よよぎはちまん",
    "nameEn": "Yoyogi-Hachiman",
    "lat": 35.6696547,
    "lng": 139.6887808,
    "transfers": [
      "東京メトロ千代田線"
    ],
    "address": "東京都渋谷区代々木五丁目6-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-05",
    "lineId": "odakyu_odawara",
    "number": 5,
    "name": "代々木上原",
    "nameKana": "よよぎうえはら",
    "nameEn": "Yoyogi-Uehara",
    "lat": 35.6691191,
    "lng": 139.6796982,
    "transfers": [
      "東京メトロ千代田線"
    ],
    "address": "東京都渋谷区西原三丁目8-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-06",
    "lineId": "odakyu_odawara",
    "number": 6,
    "name": "東北沢",
    "nameKana": "ひがしきたざわ",
    "nameEn": "Higashi-Kitazawa",
    "lat": 35.66517,
    "lng": 139.6724458,
    "transfers": [],
    "address": "東京都世田谷区北沢三丁目1-4",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-07",
    "lineId": "odakyu_odawara",
    "number": 7,
    "name": "下北沢",
    "nameKana": "しもきたざわ",
    "nameEn": "Shimo-Kitazawa",
    "lat": 35.6611459,
    "lng": 139.6668101,
    "transfers": [
      "京王井の頭線"
    ],
    "address": "東京都世田谷区北沢二丁目24-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-08",
    "lineId": "odakyu_odawara",
    "number": 8,
    "name": "世田谷代田",
    "nameKana": "せたがやだいた",
    "nameEn": "Setagaya-Daita",
    "lat": 35.6583094,
    "lng": 139.6615203,
    "transfers": [],
    "address": "東京都世田谷区代田二丁目31-12",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-09",
    "lineId": "odakyu_odawara",
    "number": 9,
    "name": "梅ヶ丘",
    "nameKana": "うめがおか",
    "nameEn": "Umegaoka",
    "lat": 35.6562191,
    "lng": 139.6541041,
    "transfers": [],
    "address": "東京都世田谷区梅丘一丁目24-10",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-10",
    "lineId": "odakyu_odawara",
    "number": 10,
    "name": "豪徳寺",
    "nameKana": "ごうとくじ",
    "nameEn": "Gotokuji",
    "lat": 35.6535982,
    "lng": 139.6468326,
    "transfers": [
      "東急世田谷線"
    ],
    "address": "東京都世田谷区豪徳寺一丁目43-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-11",
    "lineId": "odakyu_odawara",
    "number": 11,
    "name": "経堂",
    "nameKana": "きょうどう",
    "nameEn": "Kyodo",
    "lat": 35.65131,
    "lng": 139.636665,
    "transfers": [],
    "address": "東京都世田谷区経堂二丁目1-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-12",
    "lineId": "odakyu_odawara",
    "number": 12,
    "name": "千歳船橋",
    "nameKana": "ちとせふなばし",
    "nameEn": "Chitose-Funabashi",
    "lat": 35.6474177,
    "lng": 139.6238142,
    "transfers": [],
    "address": "東京都世田谷区船橋一丁目1-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-13",
    "lineId": "odakyu_odawara",
    "number": 13,
    "name": "祖師ヶ谷大蔵",
    "nameKana": "そしがやおおくら",
    "nameEn": "Soshigaya-Okura",
    "lat": 35.6433058,
    "lng": 139.6097296,
    "transfers": [],
    "address": "東京都世田谷区砧三丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-14",
    "lineId": "odakyu_odawara",
    "number": 14,
    "name": "成城学園前",
    "nameKana": "せいじょうがくえんまえ",
    "nameEn": "Seijogakuen-mae",
    "lat": 35.6399569,
    "lng": 139.5984367,
    "transfers": [],
    "address": "東京都世田谷区成城六丁目5-34",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-15",
    "lineId": "odakyu_odawara",
    "number": 15,
    "name": "喜多見",
    "nameKana": "きたみ",
    "nameEn": "Kitami",
    "lat": 35.6364805,
    "lng": 139.5868959,
    "transfers": [],
    "address": "東京都世田谷区喜多見九丁目2-11",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-16",
    "lineId": "odakyu_odawara",
    "number": 16,
    "name": "狛江",
    "nameKana": "こまえ",
    "nameEn": "Komae",
    "lat": 35.6322771,
    "lng": 139.5774708,
    "transfers": [],
    "address": "東京都狛江市東和泉一丁目17-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-17",
    "lineId": "odakyu_odawara",
    "number": 17,
    "name": "和泉多摩川",
    "nameKana": "いずみたまがわ",
    "nameEn": "Izumi-Tamagawa",
    "lat": 35.627485,
    "lng": 139.5737898,
    "transfers": [],
    "address": "東京都狛江市東和泉三丁目11-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-18",
    "lineId": "odakyu_odawara",
    "number": 18,
    "name": "登戸",
    "nameKana": "のぼりと",
    "nameEn": "Noborito",
    "lat": 35.6209011,
    "lng": 139.5694019,
    "transfers": [
      "JR南武線"
    ],
    "address": "神奈川県川崎市多摩区登戸3435",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-19",
    "lineId": "odakyu_odawara",
    "number": 19,
    "name": "向ヶ丘遊園",
    "nameKana": "むこうがおかゆうえん",
    "nameEn": "Mukogaoka-Yuen",
    "lat": 35.6171843,
    "lng": 139.5645639,
    "transfers": [],
    "address": "神奈川県川崎市多摩区登戸2099",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-20",
    "lineId": "odakyu_odawara",
    "number": 20,
    "name": "生田",
    "nameKana": "いくた",
    "nameEn": "Ikuta",
    "lat": 35.6149707,
    "lng": 139.5419345,
    "transfers": [],
    "address": "神奈川県川崎市多摩区生田七丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-21",
    "lineId": "odakyu_odawara",
    "number": 21,
    "name": "読売ランド前",
    "nameKana": "よみうりらんどまえ",
    "nameEn": "Yomiuriland-mae",
    "lat": 35.6147588,
    "lng": 139.5278851,
    "transfers": [],
    "address": "神奈川県川崎市麻生区西生田三丁目8-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-22",
    "lineId": "odakyu_odawara",
    "number": 22,
    "name": "百合ヶ丘",
    "nameKana": "ゆりがおか",
    "nameEn": "Yurigaoka",
    "lat": 35.6090125,
    "lng": 139.5160808,
    "transfers": [],
    "address": "神奈川県川崎市麻生区百合丘一丁目21-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-23",
    "lineId": "odakyu_odawara",
    "number": 23,
    "name": "新百合ヶ丘",
    "nameKana": "しんゆりがおか",
    "nameEn": "Shin-Yurigaoka",
    "lat": 35.6038037,
    "lng": 139.5077531,
    "transfers": [
      "小田急多摩線"
    ],
    "address": "神奈川県川崎市麻生区万福寺一丁目18-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4・5・6番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-24",
    "lineId": "odakyu_odawara",
    "number": 24,
    "name": "柿生",
    "nameKana": "かきお",
    "nameEn": "Kakio",
    "lat": 35.5896069,
    "lng": 139.4975991,
    "transfers": [],
    "address": "神奈川県川崎市麻生区上麻生五丁目43-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-25",
    "lineId": "odakyu_odawara",
    "number": 25,
    "name": "鶴川",
    "nameKana": "つるかわ",
    "nameEn": "Tsurukawa",
    "lat": 35.5830873,
    "lng": 139.4816069,
    "transfers": [],
    "address": "東京都町田市能ヶ谷一丁目6-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    }
  },
  {
    "id": "OH-26",
    "lineId": "odakyu_odawara",
    "number": 26,
    "name": "玉川学園前",
    "nameKana": "たまがわがくえんまえ",
    "nameEn": "Tamagawagakuen-mae",
    "lat": 35.5636418,
    "lng": 139.4635446,
    "transfers": [],
    "address": "東京都町田市玉川学園二丁目21-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-27",
    "lineId": "odakyu_odawara",
    "number": 27,
    "name": "町田",
    "nameKana": "まちだ",
    "nameEn": "Machida",
    "lat": 35.5440325,
    "lng": 139.4451447,
    "transfers": [
      "JR横浜線"
    ],
    "address": "東京都町田市原町田六丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-28",
    "lineId": "odakyu_odawara",
    "number": 28,
    "name": "相模大野",
    "nameKana": "さがみおおの",
    "nameEn": "Sagami-Ono",
    "lat": 35.5322035,
    "lng": 139.4378289,
    "transfers": [
      "小田急江ノ島線"
    ],
    "address": "神奈川県相模原市南区相模大野三丁目8-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-29",
    "lineId": "odakyu_odawara",
    "number": 29,
    "name": "小田急相模原",
    "nameKana": "おだきゅうさがみはら",
    "nameEn": "Odakyu-Sagamihara",
    "lat": 35.5155358,
    "lng": 139.4229272,
    "transfers": [],
    "address": "神奈川県相模原市南区南台三丁目20-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-30",
    "lineId": "odakyu_odawara",
    "number": 30,
    "name": "相武台前",
    "nameKana": "そうぶだいまえ",
    "nameEn": "Sobudai-mae",
    "lat": 35.4993324,
    "lng": 139.4085145,
    "transfers": [],
    "address": "神奈川県座間市相武台一丁目33-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "OH-31",
    "lineId": "odakyu_odawara",
    "number": 31,
    "name": "座間",
    "nameKana": "ざま",
    "nameEn": "Zama",
    "lat": 35.4807765,
    "lng": 139.3998998,
    "transfers": [],
    "address": "神奈川県座間市入谷東三丁目60-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-32",
    "lineId": "odakyu_odawara",
    "number": 32,
    "name": "海老名",
    "nameKana": "えびな",
    "nameEn": "Ebina",
    "lat": 35.4527731,
    "lng": 139.3909342,
    "transfers": [
      "相鉄本線",
      "JR相模線"
    ],
    "address": "神奈川県海老名市めぐみ町1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-33",
    "lineId": "odakyu_odawara",
    "number": 33,
    "name": "厚木",
    "nameKana": "あつぎ",
    "nameEn": "Atsugi",
    "lat": 35.4431861,
    "lng": 139.3784568,
    "transfers": [
      "JR相模線"
    ],
    "address": "神奈川県海老名市河原口一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-34",
    "lineId": "odakyu_odawara",
    "number": 34,
    "name": "本厚木",
    "nameKana": "ほんあつぎ",
    "nameEn": "Hon-Atsugi",
    "lat": 35.4392293,
    "lng": 139.3644015,
    "transfers": [],
    "address": "神奈川県厚木市泉町1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-35",
    "lineId": "odakyu_odawara",
    "number": 35,
    "name": "愛甲石田",
    "nameKana": "あいこういしだ",
    "nameEn": "Aiko-Ishida",
    "lat": 35.4176073,
    "lng": 139.343943,
    "transfers": [],
    "address": "神奈川県厚木市愛甲一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-36",
    "lineId": "odakyu_odawara",
    "number": 36,
    "name": "伊勢原",
    "nameKana": "いせはら",
    "nameEn": "Isehara",
    "lat": 35.3959742,
    "lng": 139.313511,
    "transfers": [],
    "address": "神奈川県伊勢原市桜台一丁目1-7",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-37",
    "lineId": "odakyu_odawara",
    "number": 37,
    "name": "鶴巻温泉",
    "nameKana": "つるまきおんせん",
    "nameEn": "Tsurumaki-Onsen",
    "lat": 35.3808339,
    "lng": 139.2776411,
    "transfers": [],
    "address": "神奈川県秦野市鶴巻北二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-38",
    "lineId": "odakyu_odawara",
    "number": 38,
    "name": "東海大学前",
    "nameKana": "とうかいだいがくまえ",
    "nameEn": "Tokaidaigaku-mae",
    "lat": 35.373169,
    "lng": 139.271254,
    "transfers": [],
    "address": "神奈川県秦野市南矢名一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-39",
    "lineId": "odakyu_odawara",
    "number": 39,
    "name": "秦野",
    "nameKana": "はだの",
    "nameEn": "Hadano",
    "lat": 35.3699792,
    "lng": 139.2259576,
    "transfers": [],
    "address": "神奈川県秦野市大秦町1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-40",
    "lineId": "odakyu_odawara",
    "number": 40,
    "name": "渋沢",
    "nameKana": "しぶさわ",
    "nameEn": "Shibusawa",
    "lat": 35.3741085,
    "lng": 139.1847113,
    "transfers": [],
    "address": "神奈川県秦野市曲松一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-41",
    "lineId": "odakyu_odawara",
    "number": 41,
    "name": "新松田",
    "nameKana": "しんまつだ",
    "nameEn": "Shin-Matsuda",
    "lat": 35.3447025,
    "lng": 139.1395994,
    "transfers": [
      "JR御殿場線 (松田駅)"
    ],
    "address": "神奈川県足柄上郡松田町松田惣領1356",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OH-42",
    "lineId": "odakyu_odawara",
    "number": 42,
    "name": "開成",
    "nameKana": "かいせい",
    "nameEn": "Kaisei",
    "lat": 35.3262907,
    "lng": 139.1359251,
    "transfers": [],
    "address": "神奈川県足柄上郡開成町吉田島4300-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-43",
    "lineId": "odakyu_odawara",
    "number": 43,
    "name": "栢山",
    "nameKana": "かやま",
    "nameEn": "Kayama",
    "lat": 35.3109356,
    "lng": 139.1425149,
    "transfers": [],
    "address": "神奈川県小田原市栢山2630",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-44",
    "lineId": "odakyu_odawara",
    "number": 44,
    "name": "富水",
    "nameKana": "とみず",
    "nameEn": "Tomizu",
    "lat": 35.2963073,
    "lng": 139.1453206,
    "transfers": [],
    "address": "神奈川県小田原市堀之内184",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-45",
    "lineId": "odakyu_odawara",
    "number": 45,
    "name": "螢田",
    "nameKana": "ほたるだ",
    "nameEn": "Hotaruda",
    "lat": 35.285015,
    "lng": 139.1520782,
    "transfers": [],
    "address": "神奈川県小田原市蓮正寺308",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OH-46",
    "lineId": "odakyu_odawara",
    "number": 46,
    "name": "足柄",
    "nameKana": "あしがら",
    "nameEn": "Ashigara",
    "lat": 35.2719386,
    "lng": 139.1544702,
    "transfers": [],
    "address": "神奈川県小田原市扇町三丁目24-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "OH-47",
    "lineId": "odakyu_odawara",
    "number": 47,
    "name": "小田原",
    "nameKana": "おだわら",
    "nameEn": "Odawara",
    "lat": 35.256282,
    "lng": 139.1553316,
    "transfers": [
      "JR東海道線",
      "JR東海道新幹線",
      "箱根登山電車",
      "伊豆箱根鉄道大雄山線"
    ],
    "address": "神奈川県小田原市栄町一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "7-11番線"
    },
    "isMajor": true
  }
];
