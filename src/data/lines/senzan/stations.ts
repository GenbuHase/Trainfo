import type { Station } from '../../../types';

export const SENZAN_STATIONS: Station[] = [
  {
    "id": "SZ-01",
    "lineId": "senzan",
    "number": 1,
    "name": "仙台",
    "nameKana": "せんだい",
    "nameEn": "Sendai",
    "lat": 38.260742,
    "lng": 140.8823894,
    "transfers": [
      "JR東北新幹線",
      "JR東北本線",
      "JR常磐線",
      "JR仙石線",
      "JR仙石東北ライン",
      "仙台空港アクセス線",
      "仙台市地下鉄南北線",
      "仙台市地下鉄東西線"
    ],
    "address": "宮城県仙台駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "SZ-02",
    "lineId": "senzan",
    "number": 2,
    "name": "東照宮",
    "nameKana": "とうしょうぐう",
    "nameEn": "Tōshōgū",
    "lat": 38.2773598,
    "lng": 140.8863968,
    "transfers": [],
    "address": "宮城県東照宮駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-03",
    "lineId": "senzan",
    "number": 3,
    "name": "北仙台",
    "nameKana": "きたせんだい",
    "nameEn": "Kita-Sendai",
    "lat": 38.2817626,
    "lng": 140.8696768,
    "transfers": [],
    "address": "宮城県北仙台駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "SZ-04",
    "lineId": "senzan",
    "number": 4,
    "name": "北山",
    "nameKana": "きたやま",
    "nameEn": "Kitayama",
    "lat": 38.2850866,
    "lng": 140.8513927,
    "transfers": [],
    "address": "宮城県北山駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-05",
    "lineId": "senzan",
    "number": 5,
    "name": "東北福祉大前",
    "nameKana": "とうほくふくしだいまえ",
    "nameEn": "Tōhokufukushidaimae",
    "lat": 38.2803707,
    "lng": 140.842515,
    "transfers": [],
    "address": "宮城県東北福祉大前駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-06",
    "lineId": "senzan",
    "number": 6,
    "name": "国見",
    "nameKana": "くにみ",
    "nameEn": "Kunimi",
    "lat": 38.2747792,
    "lng": 140.8339343,
    "transfers": [],
    "address": "宮城県国見駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-07",
    "lineId": "senzan",
    "number": 7,
    "name": "葛岡",
    "nameKana": "くずおか",
    "nameEn": "Kuzuoka",
    "lat": 38.2689104,
    "lng": 140.8186299,
    "transfers": [],
    "address": "宮城県葛岡駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-08",
    "lineId": "senzan",
    "number": 8,
    "name": "陸前落合",
    "nameKana": "りくぜんおちあい",
    "nameEn": "Rikuzen-Ochiai",
    "lat": 38.2733989,
    "lng": 140.7903422,
    "transfers": [],
    "address": "宮城県陸前落合駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-09",
    "lineId": "senzan",
    "number": 9,
    "name": "愛子",
    "nameKana": "あやし",
    "nameEn": "Ayashi",
    "lat": 38.2726948,
    "lng": 140.7616128,
    "transfers": [],
    "address": "宮城県愛子駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "SZ-10",
    "lineId": "senzan",
    "number": 10,
    "name": "陸前白沢",
    "nameKana": "りくぜんしらさわ",
    "nameEn": "Rikuzen-Shirasawa",
    "lat": 38.2781762,
    "lng": 140.7022141,
    "transfers": [],
    "address": "宮城県陸前白沢駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-11",
    "lineId": "senzan",
    "number": 11,
    "name": "熊ケ根",
    "nameKana": "くまがね",
    "nameEn": "Kumagane",
    "lat": 38.2980518,
    "lng": 140.6806585,
    "transfers": [],
    "address": "宮城県熊ケ根駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-12",
    "lineId": "senzan",
    "number": 12,
    "name": "作並",
    "nameKana": "さくなみ",
    "nameEn": "Sakunami",
    "lat": 38.3178791,
    "lng": 140.6324489,
    "transfers": [],
    "address": "宮城県作並駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "SZ-13",
    "lineId": "senzan",
    "number": 13,
    "name": "奥新川",
    "nameKana": "おくにっかわ",
    "nameEn": "Okunikkawa",
    "lat": 38.3259555,
    "lng": 140.5941751,
    "transfers": [],
    "address": "宮城県奥新川駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-14",
    "lineId": "senzan",
    "number": 14,
    "name": "面白山高原",
    "nameKana": "おもしろやまこうげん",
    "nameEn": "Omoshiroyama-Kōgen",
    "lat": 38.3330726,
    "lng": 140.4969224,
    "transfers": [],
    "address": "山形県面白山高原駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-15",
    "lineId": "senzan",
    "number": 15,
    "name": "山寺",
    "nameKana": "やまでら",
    "nameEn": "Yamadera",
    "lat": 38.3095946,
    "lng": 140.434729,
    "transfers": [],
    "address": "山形県山寺駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "SZ-16",
    "lineId": "senzan",
    "number": 16,
    "name": "高瀬",
    "nameKana": "たかせ",
    "nameEn": "Takase",
    "lat": 38.3015554,
    "lng": 140.3960091,
    "transfers": [],
    "address": "山形県高瀬駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-17",
    "lineId": "senzan",
    "number": 17,
    "name": "楯山",
    "nameKana": "たてやま",
    "nameEn": "Tateyama",
    "lat": 38.3016195,
    "lng": 140.370593,
    "transfers": [],
    "address": "山形県楯山駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "SZ-18",
    "lineId": "senzan",
    "number": 18,
    "name": "羽前千歳",
    "nameKana": "うぜんちとせ",
    "nameEn": "Uzen-Chitose",
    "lat": 38.2872626,
    "lng": 140.3421907,
    "transfers": [
      "JR奥羽本線（山形線）"
    ],
    "address": "山形県羽前千歳駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
