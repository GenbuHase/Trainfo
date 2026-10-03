// JR篠ノ井線 駅メタデータ定義 (塩尻 〜 松本 〜 長野 全19駅)
import type { Station } from '../../../types';

export const SHINONOI_STATIONS: Station[] = [
  {
    "id": "SN-01",
    "number": 1,
    "name": "塩尻",
    "nameKana": "しおじり",
    "nameEn": "Shiojiri",
    "transfers": [
      "JR中央本線",
      "JR中央本線(辰野支線)"
    ],
    "address": "長野県塩尻市大門八番町",
    "platforms": {
      "inbound": "1・3・4番線",
      "outbound": "1・3・4番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "lineId": "shinonoi",
    "lat": 36.1144795,
    "lng": 137.9475995,
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
    "id": "SN-02",
    "number": 2,
    "name": "広丘",
    "nameKana": "ひろおか",
    "nameEn": "Hirooka",
    "transfers": [],
    "address": "長野県塩尻市大字広丘野村",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.1481427,
    "lng": 137.9495233,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-03",
    "number": 3,
    "name": "村井",
    "nameKana": "むらい",
    "nameEn": "Murai",
    "transfers": [],
    "address": "長野県松本市村井町南一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.1751227,
    "lng": 137.956424,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-04",
    "number": 4,
    "name": "平田",
    "nameKana": "ひらた",
    "nameEn": "Hirata",
    "transfers": [],
    "address": "長野県松本市平田西二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "shinonoi",
    "lat": 36.1915589,
    "lng": 137.9624967,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-05",
    "number": 5,
    "name": "南松本",
    "nameKana": "みなみまつもと",
    "nameEn": "Minami-Matsumoto",
    "transfers": [],
    "address": "長野県松本市出川町",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.2097454,
    "lng": 137.9692029,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-06",
    "number": 6,
    "name": "松本",
    "nameKana": "まつもと",
    "nameEn": "Matsumoto",
    "transfers": [
      "JR大糸線",
      "アルピコ交通上高地線"
    ],
    "address": "長野県松本市深志一丁目",
    "platforms": {
      "inbound": "1〜5番線",
      "outbound": "1〜5番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "lineId": "shinonoi",
    "lat": 36.230739,
    "lng": 137.9643862,
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
    "id": "SN-07",
    "number": 7,
    "name": "田沢",
    "nameKana": "たざわ",
    "nameEn": "Tazawa",
    "transfers": [],
    "address": "長野県安曇野市豊科田沢",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.300706,
    "lng": 137.9412254,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-08",
    "number": 8,
    "name": "明科",
    "nameKana": "あかしな",
    "nameEn": "Akashina",
    "transfers": [],
    "address": "長野県安曇野市明科中川手",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "lineId": "shinonoi",
    "lat": 36.3543382,
    "lng": 137.9304795,
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
    "id": "SN-09",
    "number": 9,
    "name": "西条",
    "nameKana": "にしじょう",
    "nameEn": "Nishijo",
    "transfers": [],
    "address": "長野県東筑摩郡筑北村西条",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.4002534,
    "lng": 138.0121207,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-10",
    "number": 10,
    "name": "坂北",
    "nameKana": "さかきた",
    "nameEn": "Sakakita",
    "transfers": [],
    "address": "長野県東筑摩郡筑北村坂北",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.4312176,
    "lng": 138.016421,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-11",
    "number": 11,
    "name": "聖高原",
    "nameKana": "ひじりこうげん",
    "nameEn": "Hijiri-Kogen",
    "transfers": [],
    "address": "長野県東筑摩郡麻績村麻",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "lineId": "shinonoi",
    "lat": 36.4550568,
    "lng": 138.0471691,
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
    "id": "SN-12",
    "number": 12,
    "name": "冠着",
    "nameKana": "かむりき",
    "nameEn": "Kamuriki",
    "transfers": [],
    "address": "長野県千曲市大字羽生日向",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.4573387,
    "lng": 138.0793811,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-13",
    "number": 13,
    "name": "姨捨",
    "nameKana": "おばすて",
    "nameEn": "Obasute",
    "transfers": [],
    "address": "長野県千曲市大字八幡姨捨",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.502817,
    "lng": 138.093209,
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
    "id": "SN-14",
    "number": 14,
    "name": "稲荷山",
    "nameKana": "いなりやま",
    "nameEn": "Inariyama",
    "transfers": [],
    "address": "長野県千曲市大字稲荷山",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.5527281,
    "lng": 138.1080097,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-15",
    "number": 15,
    "name": "篠ノ井",
    "nameKana": "しののい",
    "nameEn": "Shinonoi",
    "transfers": [
      "しなの鉄道線"
    ],
    "address": "長野県長野市篠ノ井布施高田",
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "1・2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "lineId": "shinonoi",
    "lat": 36.5774379,
    "lng": 138.1380209,
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
    "id": "SN-16",
    "number": 16,
    "name": "今井",
    "nameKana": "いまい",
    "nameEn": "Imai",
    "transfers": [],
    "address": "長野県長野市川中島町今井",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "shinonoi",
    "lat": 36.5950297,
    "lng": 138.1451062,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-17",
    "number": 17,
    "name": "川中島",
    "nameKana": "かわなかじま",
    "nameEn": "Kawanakajima",
    "transfers": [],
    "address": "長野県長野市川中島町上氷鉋",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "lineId": "shinonoi",
    "lat": 36.6141007,
    "lng": 138.1507012,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-18",
    "number": 18,
    "name": "安茂里",
    "nameKana": "あもり",
    "nameEn": "Amori",
    "transfers": [],
    "address": "長野県長野市安茂里小市",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "shinonoi",
    "lat": 36.6302229,
    "lng": 138.1618403,
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "SN-19",
    "number": 19,
    "name": "長野",
    "nameKana": "ながの",
    "nameEn": "Nagano",
    "transfers": [
      "JR北陸新幹線",
      "しなの鉄道北しなの線",
      "長野電鉄長野線"
    ],
    "address": "長野県長野市大字栗田",
    "platforms": {
      "inbound": "2〜7番線",
      "outbound": "2〜7番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "lineId": "shinonoi",
    "lat": 36.643211,
    "lng": 138.1884854,
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
