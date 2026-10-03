import type { Station } from '../../../types';

// JR中央本線 (高尾 〜 大月 〜 甲府 〜 塩尻 全38駅)
export const CHUO_MAIN_STATIONS: Station[] = [
  {
    "id": "JC-24",
    "lineId": "chuo_main",
    "number": 24,
    "name": "高尾",
    "nameKana": "たかお",
    "nameEn": "Takao",
    "lat": 35.642152,
    "lng": 139.282487,
    "transfers": [
      "JR中央線",
      "京王高尾線"
    ],
    "address": "東京都八王子市高尾町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JC-25",
    "lineId": "chuo_main",
    "number": 25,
    "name": "相模湖",
    "nameKana": "さがみこ",
    "nameEn": "Sagamiko",
    "lat": 35.617344,
    "lng": 139.188473,
    "transfers": [],
    "address": "神奈川県相模原市緑区与瀬本町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-26",
    "lineId": "chuo_main",
    "number": 26,
    "name": "藤野",
    "nameKana": "ふじの",
    "nameEn": "Fujino",
    "lat": 35.615916,
    "lng": 139.152408,
    "transfers": [],
    "address": "神奈川県相模原市緑区小渕",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-27",
    "lineId": "chuo_main",
    "number": 27,
    "name": "上野原",
    "nameKana": "うえのはら",
    "nameEn": "Uenohara",
    "lat": 35.618805,
    "lng": 139.116111,
    "transfers": [],
    "address": "山梨県上野原市新田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-28",
    "lineId": "chuo_main",
    "number": 28,
    "name": "四方津",
    "nameKana": "しおつ",
    "nameEn": "Shiotsu",
    "lat": 35.613947,
    "lng": 139.06752,
    "transfers": [],
    "address": "山梨県上野原市四方津",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-29",
    "lineId": "chuo_main",
    "number": 29,
    "name": "梁川",
    "nameKana": "やながわ",
    "nameEn": "Yanagawa",
    "lat": 35.608176,
    "lng": 139.032079,
    "transfers": [],
    "address": "山梨県大月市梁川町綱の上",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-30",
    "lineId": "chuo_main",
    "number": 30,
    "name": "鳥沢",
    "nameKana": "とりさわ",
    "nameEn": "Torisawa",
    "lat": 35.60813,
    "lng": 138.998749,
    "transfers": [],
    "address": "山梨県大月市富浜町鳥沢",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-31",
    "lineId": "chuo_main",
    "number": 31,
    "name": "猿橋",
    "nameKana": "さるはし",
    "nameEn": "Saruhashi",
    "lat": 35.612736,
    "lng": 138.968119,
    "transfers": [],
    "address": "山梨県大月市猿橋町猿橋",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-32",
    "lineId": "chuo_main",
    "number": 32,
    "name": "大月",
    "nameKana": "おおつき",
    "nameEn": "Otsuki",
    "lat": 35.613106,
    "lng": 138.942176,
    "transfers": [
      "富士急行線"
    ],
    "address": "山梨県大月市大月一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "4・5番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "CO-33",
    "lineId": "chuo_main",
    "number": 33,
    "name": "初狩",
    "nameKana": "はつかり",
    "nameEn": "Hatsukari",
    "lat": 35.594186,
    "lng": 138.884328,
    "transfers": [],
    "address": "山梨県大月市初狩町下初狩",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-34",
    "lineId": "chuo_main",
    "number": 34,
    "name": "笹子",
    "nameKana": "ささご",
    "nameEn": "Sasago",
    "lat": 35.603961,
    "lng": 138.825828,
    "transfers": [],
    "address": "山梨県大月市笹子町黒野田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-35",
    "lineId": "chuo_main",
    "number": 35,
    "name": "甲斐大和",
    "nameKana": "かいやまと",
    "nameEn": "Kai-Yamato",
    "lat": 35.642851,
    "lng": 138.774506,
    "transfers": [],
    "address": "山梨県甲州市大和町初鹿野",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-36",
    "lineId": "chuo_main",
    "number": 36,
    "name": "勝沼ぶどう郷",
    "nameKana": "かつぬまぶどうきょう",
    "nameEn": "Katsunuma-budokyo",
    "lat": 35.672049,
    "lng": 138.74317,
    "transfers": [],
    "address": "山梨県甲州市勝沼町菱山",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-37",
    "lineId": "chuo_main",
    "number": 37,
    "name": "塩山",
    "nameKana": "えんざん",
    "nameEn": "Enzan",
    "lat": 35.705631,
    "lng": 138.723415,
    "transfers": [],
    "address": "山梨県甲州市塩山上於曽",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-38",
    "lineId": "chuo_main",
    "number": 38,
    "name": "東山梨",
    "nameKana": "ひがしやまなし",
    "nameEn": "Higashi-Yamanashi",
    "lat": 35.694804,
    "lng": 138.703936,
    "transfers": [],
    "address": "山梨県山梨市上石森",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-39",
    "lineId": "chuo_main",
    "number": 39,
    "name": "山梨市",
    "nameKana": "やまなしし",
    "nameEn": "Yamanashishi",
    "lat": 35.684945,
    "lng": 138.685112,
    "transfers": [],
    "address": "山梨県山梨市上神内川",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-40",
    "lineId": "chuo_main",
    "number": 40,
    "name": "春日居町",
    "nameKana": "かすがいちょう",
    "nameEn": "Kasugaicho",
    "lat": 35.673482,
    "lng": 138.658984,
    "transfers": [],
    "address": "山梨県笛吹市春日居町別田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-41",
    "lineId": "chuo_main",
    "number": 41,
    "name": "石和温泉",
    "nameKana": "いさわおんせん",
    "nameEn": "Isawa-onsen",
    "lat": 35.657674,
    "lng": 138.635439,
    "transfers": [],
    "address": "山梨県笛吹市石和町駅前",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-42",
    "lineId": "chuo_main",
    "number": 42,
    "name": "酒折",
    "nameKana": "さかおり",
    "nameEn": "Sakaori",
    "lat": 35.659614,
    "lng": 138.599106,
    "transfers": [],
    "address": "山梨県甲府市酒折一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-43",
    "lineId": "chuo_main",
    "number": 43,
    "name": "甲府",
    "nameKana": "こうふ",
    "nameEn": "Kofu",
    "lat": 35.667151,
    "lng": 138.568991,
    "transfers": [
      "JR身延線"
    ],
    "address": "山梨県甲府市丸の内一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "1・2・3番線"
    }
  },
  {
    "id": "CO-44",
    "lineId": "chuo_main",
    "number": 44,
    "name": "竜王",
    "nameKana": "りゅうおう",
    "nameEn": "Ryuo",
    "lat": 35.668802,
    "lng": 138.519503,
    "transfers": [],
    "address": "山梨県甲斐市竜王新町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-45",
    "lineId": "chuo_main",
    "number": 45,
    "name": "塩崎",
    "nameKana": "しおざき",
    "nameEn": "Shiozaki",
    "lat": 35.687848,
    "lng": 138.487494,
    "transfers": [],
    "address": "山梨県甲斐市下今井",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-46",
    "lineId": "chuo_main",
    "number": 46,
    "name": "韮崎",
    "nameKana": "にらさき",
    "nameEn": "Nirasaki",
    "lat": 35.710422,
    "lng": 138.450887,
    "transfers": [],
    "address": "山梨県韮崎市若宮一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-47",
    "lineId": "chuo_main",
    "number": 47,
    "name": "新府",
    "nameKana": "しんぷ",
    "nameEn": "Shimpu",
    "lat": 35.737151,
    "lng": 138.433256,
    "transfers": [],
    "address": "山梨県韮崎市中田町中条",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-48",
    "lineId": "chuo_main",
    "number": 48,
    "name": "穴山",
    "nameKana": "あなやま",
    "nameEn": "Anayama",
    "lat": 35.751153,
    "lng": 138.414278,
    "transfers": [],
    "address": "山梨県韮崎市穴山町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-49",
    "lineId": "chuo_main",
    "number": 49,
    "name": "日野春",
    "nameKana": "ひのはる",
    "nameEn": "Hinoharu",
    "lat": 35.790032,
    "lng": 138.39477,
    "transfers": [],
    "address": "山梨県北杜市長坂町富岡",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-50",
    "lineId": "chuo_main",
    "number": 50,
    "name": "長坂",
    "nameKana": "ながさか",
    "nameEn": "Nagasaka",
    "lat": 35.827527,
    "lng": 138.366794,
    "transfers": [],
    "address": "山梨県北杜市長坂町長坂上条",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-51",
    "lineId": "chuo_main",
    "number": 51,
    "name": "小淵沢",
    "nameKana": "こぶちざわ",
    "nameEn": "Kobuchizawa",
    "lat": 35.863918,
    "lng": 138.315962,
    "transfers": [
      "JR小海線"
    ],
    "address": "山梨県北杜市小淵沢町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "2・3番線"
    }
  },
  {
    "id": "CO-52",
    "lineId": "chuo_main",
    "number": 52,
    "name": "信濃境",
    "nameKana": "しなのざかい",
    "nameEn": "Shinano-Sakai",
    "lat": 35.884739,
    "lng": 138.27582,
    "transfers": [],
    "address": "長野県諏訪郡富士見町境",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-53",
    "lineId": "chuo_main",
    "number": 53,
    "name": "富士見",
    "nameKana": "ふじみ",
    "nameEn": "Fujimi",
    "lat": 35.91204,
    "lng": 138.238427,
    "transfers": [],
    "address": "長野県諏訪郡富士見町富士見",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-54",
    "lineId": "chuo_main",
    "number": 54,
    "name": "すずらんの里",
    "nameKana": "すずらんのさと",
    "nameEn": "Suzurannosato",
    "lat": 35.930327,
    "lng": 138.211947,
    "transfers": [],
    "address": "長野県諏訪郡富士見町富士見",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-55",
    "lineId": "chuo_main",
    "number": 55,
    "name": "青柳",
    "nameKana": "あおやぎ",
    "nameEn": "Aoyagi",
    "lat": 35.942371,
    "lng": 138.197806,
    "transfers": [],
    "address": "長野県茅野市金沢",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-56",
    "lineId": "chuo_main",
    "number": 56,
    "name": "茅野",
    "nameKana": "ちの",
    "nameEn": "Chino",
    "lat": 35.994339,
    "lng": 138.152315,
    "transfers": [],
    "address": "長野県茅野市ちの",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-57",
    "lineId": "chuo_main",
    "number": 57,
    "name": "上諏訪",
    "nameKana": "かみすわ",
    "nameEn": "Kami-Suwa",
    "lat": 36.046642,
    "lng": 138.11626,
    "transfers": [],
    "address": "長野県諏訪市諏訪一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-58",
    "lineId": "chuo_main",
    "number": 58,
    "name": "下諏訪",
    "nameKana": "しもすわ",
    "nameEn": "Shimo-Suwa",
    "lat": 36.072019,
    "lng": 138.084858,
    "transfers": [],
    "address": "長野県諏訪郡下諏訪町広瀬町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-59",
    "lineId": "chuo_main",
    "number": 59,
    "name": "岡谷",
    "nameKana": "おかや",
    "nameEn": "Okaya",
    "lat": 36.056577,
    "lng": 138.044758,
    "transfers": [
      "JR飯田線",
      "JR中央本線(辰野支線)"
    ],
    "address": "長野県岡谷市本町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-60",
    "lineId": "chuo_main",
    "number": 60,
    "name": "みどり湖",
    "nameKana": "みどりこ",
    "nameEn": "Midoriko",
    "lat": 36.09404,
    "lng": 137.982116,
    "transfers": [],
    "address": "長野県塩尻市大字西条",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-61",
    "lineId": "chuo_main",
    "number": 61,
    "name": "塩尻",
    "nameKana": "しおじり",
    "nameEn": "Shiojiri",
    "lat": 36.114384,
    "lng": 137.947792,
    "transfers": [
      "JR中央本線(西線)",
      "JR篠ノ井線"
    ],
    "address": "長野県塩尻市大字大門八番町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "4・5・6番線"
    }
  }
];
