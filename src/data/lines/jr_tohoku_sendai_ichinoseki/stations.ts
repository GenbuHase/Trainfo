import type { Station } from '../../../types';

export const TOHOKU_SENDAI_ICHINOSEKI_STATIONS: Station[] = [
  {
    "id": "TSI-01",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 1,
    "name": "仙台",
    "nameKana": "せんだい",
    "nameEn": "Sendai",
    "lat": 38.260742,
    "lng": 140.8823894,
    "transfers": [
      "JR東北本線（福島～仙台）",
      "JR常磐線（いわき～仙台）",
      "JR仙山線",
      "JR仙石線",
      "JR仙石東北ライン",
      "仙台空港アクセス線",
      "JR東北新幹線",
      "秋田新幹線",
      "仙台市地下鉄南北線",
      "仙台市地下鉄東西線"
    ],
    "address": "宮城県仙台市青葉区中央一丁目1-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "special_rapid",
      "limited_exp"
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
    "id": "TSI-02",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 2,
    "name": "東仙台",
    "nameKana": "ひがしせんだい",
    "nameEn": "Higashi-Sendai",
    "lat": 38.2764727,
    "lng": 140.9200215,
    "transfers": [],
    "address": "宮城県仙台市宮城野区新田一丁目",
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
    "id": "TSI-03",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 3,
    "name": "岩切",
    "nameKana": "いわきり",
    "nameEn": "Iwakiri",
    "lat": 38.3008614,
    "lng": 140.9552962,
    "transfers": [
      "JR東北本線（利府支線）"
    ],
    "address": "宮城県仙台市宮城野区岩切",
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
    "id": "TSI-04",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 4,
    "name": "陸前山王",
    "nameKana": "りくぜんさんのう",
    "nameEn": "Rikuzen-Sannō",
    "lat": 38.2995796,
    "lng": 140.9792267,
    "transfers": [],
    "address": "宮城県多賀城市山王",
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
    "id": "TSI-05",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 5,
    "name": "国府多賀城",
    "nameKana": "こくふたがじょう",
    "nameEn": "Kokufu-Tagajo",
    "lat": 38.300934,
    "lng": 140.9941949,
    "transfers": [],
    "address": "宮城県多賀城市高崎一丁目",
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
    "id": "TSI-06",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 6,
    "name": "塩釜",
    "nameKana": "しおがま",
    "nameEn": "Shiogama",
    "lat": 38.3095493,
    "lng": 141.0095384,
    "transfers": [
      "JR仙石東北ライン"
    ],
    "address": "宮城県塩竈市東玉川町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
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
  },
  {
    "id": "TSI-07",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 7,
    "name": "松島",
    "nameKana": "まつしま",
    "nameEn": "Matsushima",
    "lat": 38.3800111,
    "lng": 141.0658381,
    "transfers": [],
    "address": "宮城県松島町松島",
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
    "id": "TSI-08",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 8,
    "name": "愛宕",
    "nameKana": "あたご",
    "nameEn": "Atago",
    "lat": 38.3973719,
    "lng": 141.0650553,
    "transfers": [],
    "address": "宮城県松島町高城",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "TSI-09",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 9,
    "name": "品井沼",
    "nameKana": "しないぬま",
    "nameEn": "Shinainuma",
    "lat": 38.4315514,
    "lng": 141.0823998,
    "transfers": [],
    "address": "宮城県松島町幡谷",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "TSI-10",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 10,
    "name": "鹿島台",
    "nameKana": "かしまだい",
    "nameEn": "Kashimadai",
    "lat": 38.4746618,
    "lng": 141.0980102,
    "transfers": [],
    "address": "宮城県大崎市鹿島台平渡",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-11",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 11,
    "name": "松山町",
    "nameKana": "まつやままち",
    "nameEn": "Matsuyamamachi",
    "lat": 38.5123065,
    "lng": 141.0752624,
    "transfers": [],
    "address": "宮城県大崎市松山金谷",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-12",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 12,
    "name": "小牛田",
    "nameKana": "こごた",
    "nameEn": "Kogota",
    "lat": 38.5411042,
    "lng": 141.0643405,
    "transfers": [
      "JR陸羽東線",
      "JR石巻線"
    ],
    "address": "宮城県美里町字藤ケ崎",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limited_exp"
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
    "id": "TSI-13",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 13,
    "name": "田尻",
    "nameKana": "たじり",
    "nameEn": "Tajiri",
    "lat": 38.5961705,
    "lng": 141.0590147,
    "transfers": [],
    "address": "宮城県大崎市田尻沼部",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-14",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 14,
    "name": "瀬峰",
    "nameKana": "せみね",
    "nameEn": "Semine",
    "lat": 38.6552561,
    "lng": 141.0738865,
    "transfers": [],
    "address": "宮城県栗原市瀬峰",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-15",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 15,
    "name": "梅ケ沢",
    "nameKana": "うめがさわ",
    "nameEn": "Umegasawa",
    "lat": 38.6817619,
    "lng": 141.0854159,
    "transfers": [],
    "address": "宮城県登米市迫町新田",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-16",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 16,
    "name": "新田",
    "nameKana": "にった",
    "nameEn": "Nitta",
    "lat": 38.7118261,
    "lng": 141.1198197,
    "transfers": [],
    "address": "宮城県登米市迫町新田",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-17",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 17,
    "name": "石越",
    "nameKana": "いしこし",
    "nameEn": "Ishikoshi",
    "lat": 38.7686968,
    "lng": 141.1590722,
    "transfers": [],
    "address": "宮城県登米市石越町南郷",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "limited_exp"
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
    "id": "TSI-18",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 18,
    "name": "油島",
    "nameKana": "ゆしま",
    "nameEn": "Yushima",
    "lat": 38.7970428,
    "lng": 141.1757121,
    "transfers": [],
    "address": "岩手県一関市花泉町油島",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "TSI-19",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 19,
    "name": "花泉",
    "nameKana": "はないずみ",
    "nameEn": "Hanaizumi",
    "lat": 38.8334051,
    "lng": 141.1800007,
    "transfers": [],
    "address": "岩手県一関市花泉町花泉",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "TSI-20",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 20,
    "name": "清水原",
    "nameKana": "しみずはら",
    "nameEn": "Shimizuhara",
    "lat": 38.8547426,
    "lng": 141.1567948,
    "transfers": [],
    "address": "岩手県一関市花泉町花泉",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "TSI-21",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 21,
    "name": "有壁",
    "nameKana": "ありかべ",
    "nameEn": "Arikabe",
    "lat": 38.8673477,
    "lng": 141.1211282,
    "transfers": [],
    "address": "宮城県栗原市金成有壁",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "TSI-22",
    "lineId": "jr_tohoku_sendai_ichinoseki",
    "number": 22,
    "name": "一ノ関",
    "nameKana": "いちのせき",
    "nameEn": "Ichinoseki",
    "lat": 38.9264352,
    "lng": 141.1380476,
    "transfers": [
      "JR東北本線（一ノ関～盛岡）",
      "JR東北新幹線",
      "JR大船渡線"
    ],
    "address": "岩手県一関市駅前",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
