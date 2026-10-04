// JR青梅線 駅定義 (立川 〜 奥多摩 全25駅)
import type { Station } from '../../../types';

export const OME_STATIONS: Station[] = [
  {
    "id": "JC-19",
    "lineId": "ome",
    "number": 1,
    "name": "立川",
    "nameKana": "たちかわ",
    "nameEn": "Tachikawa",
    "lat": 35.6980787,
    "lng": 139.4135506,
    "transfers": [
      "JR中央線",
      "JR中央本線",
      "JR南武線",
      "多摩都市モノレール"
    ],
    "address": "東京都立川市曙町二丁目1-1",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "special_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-51",
    "lineId": "ome",
    "number": 2,
    "name": "西立川",
    "nameKana": "にしたちかわ",
    "nameEn": "Nishi-Tachikawa",
    "lat": 35.7034586,
    "lng": 139.3935897,
    "transfers": [],
    "address": "東京都立川市富士見町一丁目36-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-52",
    "lineId": "ome",
    "number": 3,
    "name": "東中神",
    "nameKana": "ひがしなかがみ",
    "nameEn": "Higashi-Nakagami",
    "lat": 35.7064476,
    "lng": 139.3841065,
    "transfers": [],
    "address": "東京都昭島市玉川町一丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-53",
    "lineId": "ome",
    "number": 4,
    "name": "中神",
    "nameKana": "なかがみ",
    "nameEn": "Nakagami",
    "lat": 35.7090889,
    "lng": 139.3755065,
    "transfers": [],
    "address": "東京都昭島市朝日町一丁目11-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-54",
    "lineId": "ome",
    "number": 5,
    "name": "昭島",
    "nameKana": "あきしま",
    "nameEn": "Akishima",
    "lat": 35.7135235,
    "lng": 139.3608744,
    "transfers": [],
    "address": "東京都昭島市田中町562-8",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-55",
    "lineId": "ome",
    "number": 6,
    "name": "拝島",
    "nameKana": "はいじま",
    "nameEn": "Haijima",
    "lat": 35.7211908,
    "lng": 139.3434833,
    "transfers": [
      "JR八高線",
      "JR五日市線",
      "西武拝島線"
    ],
    "address": "東京都昭島市松原町四丁目14-4",
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "special_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-56",
    "lineId": "ome",
    "number": 7,
    "name": "牛浜",
    "nameKana": "うしはま",
    "nameEn": "Ushihama",
    "lat": 35.7345804,
    "lng": 139.3335638,
    "transfers": [],
    "address": "東京都福生市牛浜125",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-57",
    "lineId": "ome",
    "number": 8,
    "name": "福生",
    "nameKana": "ふっさ",
    "nameEn": "Fussa",
    "lat": 35.742328,
    "lng": 139.3278175,
    "transfers": [],
    "address": "東京都福生市大字福生768",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "special_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-58",
    "lineId": "ome",
    "number": 9,
    "name": "羽村",
    "nameKana": "はむら",
    "nameEn": "Hamura",
    "lat": 35.7583304,
    "lng": 139.3159656,
    "transfers": [],
    "address": "東京都羽村市羽東一丁目12-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-59",
    "lineId": "ome",
    "number": 10,
    "name": "小作",
    "nameKana": "おざく",
    "nameEn": "Ozaku",
    "lat": 35.7763022,
    "lng": 139.3019098,
    "transfers": [],
    "address": "東京都羽村市小作台五丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-60",
    "lineId": "ome",
    "number": 11,
    "name": "河辺",
    "nameKana": "かべ",
    "nameEn": "Kabe",
    "lat": 35.7844637,
    "lng": 139.2845896,
    "transfers": [],
    "address": "東京都青梅市河辺町十丁目1-1",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-61",
    "lineId": "ome",
    "number": 12,
    "name": "東青梅",
    "nameKana": "ひがしおうめ",
    "nameEn": "Higashi-Ome",
    "lat": 35.7899487,
    "lng": 139.272536,
    "transfers": [],
    "address": "東京都青梅市東青梅一丁目2-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-62",
    "lineId": "ome",
    "number": 13,
    "name": "青梅",
    "nameKana": "おうめ",
    "nameEn": "Ome",
    "lat": 35.79041,
    "lng": 139.2583283,
    "transfers": [],
    "address": "東京都青梅市本町130",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "special_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-63",
    "lineId": "ome",
    "number": 14,
    "name": "宮ノ平",
    "nameKana": "みやのひら",
    "nameEn": "Miyanohira",
    "lat": 35.7874947,
    "lng": 139.2370287,
    "transfers": [],
    "address": "東京都青梅市日向和田二丁目282",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-64",
    "lineId": "ome",
    "number": 15,
    "name": "日向和田",
    "nameKana": "ひなたわだ",
    "nameEn": "Hinatawada",
    "lat": 35.7881925,
    "lng": 139.2298103,
    "transfers": [],
    "address": "東京都青梅市日向和田三丁目635",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-65",
    "lineId": "ome",
    "number": 16,
    "name": "石神前",
    "nameKana": "いしがみまえ",
    "nameEn": "Ishigamimae",
    "lat": 35.7966509,
    "lng": 139.225246,
    "transfers": [],
    "address": "東京都青梅市二俣尾一丁目22",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-66",
    "lineId": "ome",
    "number": 17,
    "name": "二俣尾",
    "nameKana": "ふたまたお",
    "nameEn": "Futamatao",
    "lat": 35.8045453,
    "lng": 139.2154915,
    "transfers": [],
    "address": "東京都青梅市二俣尾四丁目1022",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-67",
    "lineId": "ome",
    "number": 18,
    "name": "軍畑",
    "nameKana": "いくさばた",
    "nameEn": "Ikusabata",
    "lat": 35.8076658,
    "lng": 139.2076536,
    "transfers": [],
    "address": "東京都青梅市沢井一丁目145",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-68",
    "lineId": "ome",
    "number": 19,
    "name": "沢井",
    "nameKana": "さわい",
    "nameEn": "Sawai",
    "lat": 35.8059112,
    "lng": 139.1937545,
    "transfers": [],
    "address": "東京都青梅市沢井二丁目832",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-69",
    "lineId": "ome",
    "number": 20,
    "name": "御嶽",
    "nameKana": "みたけ",
    "nameEn": "Mitake",
    "lat": 35.8013884,
    "lng": 139.1818845,
    "transfers": [],
    "address": "東京都青梅市御岳本町279",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-70",
    "lineId": "ome",
    "number": 21,
    "name": "川井",
    "nameKana": "かわい",
    "nameEn": "Kawai",
    "lat": 35.8137011,
    "lng": 139.164028,
    "transfers": [],
    "address": "東京都西多摩郡奥多摩町川井285",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-71",
    "lineId": "ome",
    "number": 22,
    "name": "古里",
    "nameKana": "こり",
    "nameEn": "Kori",
    "lat": 35.8162887,
    "lng": 139.1516293,
    "transfers": [],
    "address": "東京都西多摩郡奥多摩町小丹波254",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-72",
    "lineId": "ome",
    "number": 23,
    "name": "鳩ノ巣",
    "nameKana": "はとのす",
    "nameEn": "Hatonosu",
    "lat": 35.8151194,
    "lng": 139.1287096,
    "transfers": [],
    "address": "東京都西多摩郡奥多摩町棚澤240",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-73",
    "lineId": "ome",
    "number": 24,
    "name": "白丸",
    "nameKana": "しろまる",
    "nameEn": "Shiromaru",
    "lat": 35.8119675,
    "lng": 139.1148337,
    "transfers": [],
    "address": "東京都西多摩郡奥多摩町白丸109",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-74",
    "lineId": "ome",
    "number": 25,
    "name": "奥多摩",
    "nameKana": "おくたま",
    "nameEn": "Okutama",
    "lat": 35.8094299,
    "lng": 139.0968064,
    "transfers": [],
    "address": "東京都西多摩郡奥多摩町氷川210",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
