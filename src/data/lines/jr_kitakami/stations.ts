import type { Station } from '../../../types';

export const KITAKAMI_STATIONS: Station[] = [
  {
    "id": "KT-01",
    "lineId": "jr_kitakami",
    "number": 1,
    "name": "北上",
    "nameKana": "きたかみ",
    "nameEn": "Kitakami",
    "lat": 39.2818198,
    "lng": 141.1216713,
    "transfers": [
      "JR東北新幹線",
      "JR東北本線（一ノ関～盛岡）"
    ],
    "address": "岩手県北上市大通り一丁目",
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
    "id": "KT-02",
    "lineId": "jr_kitakami",
    "number": 2,
    "name": "柳原",
    "nameKana": "やなぎはら",
    "nameEn": "Yanagihara",
    "lat": 39.2945921,
    "lng": 141.1117438,
    "transfers": [],
    "address": "岩手県北上市柳原町四丁目",
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
    "id": "KT-03",
    "lineId": "jr_kitakami",
    "number": 3,
    "name": "江釣子",
    "nameKana": "えづりこ",
    "nameEn": "Ezuriko",
    "lat": 39.29839,
    "lng": 141.0758365,
    "transfers": [],
    "address": "岩手県北上市上江釣子",
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
    "id": "KT-04",
    "lineId": "jr_kitakami",
    "number": 4,
    "name": "藤根",
    "nameKana": "ふじね",
    "nameEn": "Fujine",
    "lat": 39.3010205,
    "lng": 141.040073,
    "transfers": [],
    "address": "岩手県北上市和賀町藤根",
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
    "id": "KT-05",
    "lineId": "jr_kitakami",
    "number": 5,
    "name": "立川目",
    "nameKana": "たてかわめ",
    "nameEn": "Tatekawame",
    "lat": 39.3077084,
    "lng": 140.9976417,
    "transfers": [],
    "address": "岩手県北上市和賀町竪川目",
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
    "id": "KT-06",
    "lineId": "jr_kitakami",
    "number": 6,
    "name": "横川目",
    "nameKana": "よこかわめ",
    "nameEn": "Yokokawame",
    "lat": 39.3092376,
    "lng": 140.9724789,
    "transfers": [],
    "address": "岩手県北上市和賀町横川目",
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
    "id": "KT-07",
    "lineId": "jr_kitakami",
    "number": 7,
    "name": "岩沢",
    "nameKana": "いわさわ",
    "nameEn": "Iwasawa",
    "lat": 39.3011127,
    "lng": 140.9318093,
    "transfers": [],
    "address": "岩手県北上市和賀町岩沢",
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
    "id": "KT-08",
    "lineId": "jr_kitakami",
    "number": 8,
    "name": "和賀仙人",
    "nameKana": "わがせんにん",
    "nameEn": "Wagasennin",
    "lat": 39.30844,
    "lng": 140.909233,
    "transfers": [],
    "address": "岩手県北上市和賀町仙人",
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
    "id": "KT-09",
    "lineId": "jr_kitakami",
    "number": 9,
    "name": "ゆだ錦秋湖",
    "nameKana": "ゆだきんしゅうこ",
    "nameEn": "Yudakinshūko",
    "lat": 39.295263,
    "lng": 140.8356048,
    "transfers": [],
    "address": "岩手県西和賀町耳取",
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
    "id": "KT-10",
    "lineId": "jr_kitakami",
    "number": 10,
    "name": "ほっとゆだ",
    "nameKana": "ほっとゆだ",
    "nameEn": "Hotto-Yuda",
    "lat": 39.31485,
    "lng": 140.7760961,
    "transfers": [],
    "address": "岩手県西和賀町川尻",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "KT-11",
    "lineId": "jr_kitakami",
    "number": 11,
    "name": "ゆだ高原",
    "nameKana": "ゆだこうげん",
    "nameEn": "Yudakōgen",
    "lat": 39.3008533,
    "lng": 140.7367001,
    "transfers": [],
    "address": "岩手県西和賀町白木野",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "substitution_bus"
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
    "id": "KT-12",
    "lineId": "jr_kitakami",
    "number": 12,
    "name": "黒沢",
    "nameKana": "くろさわ",
    "nameEn": "Kurosawa",
    "lat": 39.2763263,
    "lng": 140.699651,
    "transfers": [],
    "address": "秋田県横手市山内黒沢",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "substitution_bus"
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
    "id": "KT-13",
    "lineId": "jr_kitakami",
    "number": 13,
    "name": "小松川",
    "nameKana": "こまつかわ",
    "nameEn": "Komatsukawa",
    "lat": 39.2935264,
    "lng": 140.6464807,
    "transfers": [],
    "address": "秋田県横手市山内小松川",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "substitution_bus"
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
    "id": "KT-14",
    "lineId": "jr_kitakami",
    "number": 14,
    "name": "相野々",
    "nameKana": "あいのの",
    "nameEn": "Ainono",
    "lat": 39.2780858,
    "lng": 140.6187106,
    "transfers": [],
    "address": "秋田県横手市山内土渕",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "substitution_bus"
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
    "id": "KT-15",
    "lineId": "jr_kitakami",
    "number": 15,
    "name": "横手",
    "nameKana": "よこて",
    "nameEn": "Yokote",
    "lat": 39.3103014,
    "lng": 140.5604512,
    "transfers": [
      "JR奥羽本線（新庄～大曲）"
    ],
    "address": "秋田県横手市駅前町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "substitution_bus"
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
