import type { Station } from '../../../types';

export const SOBU_MAIN_STATIONS: Station[] = [
  {
    "id": "SM-01",
    "lineId": "sobu_main",
    "number": 1,
    "name": "千葉",
    "nameKana": "ちば",
    "nameEn": "Chiba",
    "lat": 35.61315,
    "lng": 140.11492,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車",
      "JR外房線",
      "JR内房線",
      "JR成田線",
      "千葉都市モノレール",
      "京成千葉線"
    ],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-02",
    "lineId": "sobu_main",
    "number": 2,
    "name": "東千葉",
    "nameKana": "ひがしちば",
    "nameEn": "Higashi-Chiba",
    "lat": 35.6177,
    "lng": 140.1233,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-03",
    "lineId": "sobu_main",
    "number": 3,
    "name": "都賀",
    "nameKana": "つが",
    "nameEn": "Tsuga",
    "lat": 35.63692,
    "lng": 140.15046,
    "transfers": [
      "千葉都市モノレール"
    ],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ]
  },
  {
    "id": "SM-04",
    "lineId": "sobu_main",
    "number": 4,
    "name": "四街道",
    "nameKana": "よつかいどう",
    "nameEn": "Yotsukaido",
    "lat": 35.66323,
    "lng": 140.16599,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-05",
    "lineId": "sobu_main",
    "number": 5,
    "name": "物井",
    "nameKana": "ものい",
    "nameEn": "Monoi",
    "lat": 35.68626,
    "lng": 140.20076,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ]
  },
  {
    "id": "SM-06",
    "lineId": "sobu_main",
    "number": 6,
    "name": "佐倉",
    "nameKana": "さくら",
    "nameEn": "Sakura",
    "lat": 35.70959,
    "lng": 140.22555,
    "transfers": [
      "JR成田線"
    ],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-07",
    "lineId": "sobu_main",
    "number": 7,
    "name": "南酒々井",
    "nameKana": "みなみしすい",
    "nameEn": "Minami-Shisui",
    "lat": 35.70454,
    "lng": 140.26689,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ]
  },
  {
    "id": "SM-08",
    "lineId": "sobu_main",
    "number": 8,
    "name": "榎戸",
    "nameKana": "えのきど",
    "nameEn": "Enokido",
    "lat": 35.68471,
    "lng": 140.28755,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ]
  },
  {
    "id": "SM-09",
    "lineId": "sobu_main",
    "number": 9,
    "name": "八街",
    "nameKana": "やちまた",
    "nameEn": "Yachimata",
    "lat": 35.66272,
    "lng": 140.31834,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-10",
    "lineId": "sobu_main",
    "number": 10,
    "name": "日向",
    "nameKana": "ひゅうが",
    "nameEn": "Hyuga",
    "lat": 35.62797,
    "lng": 140.36312,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ]
  },
  {
    "id": "SM-11",
    "lineId": "sobu_main",
    "number": 11,
    "name": "成東",
    "nameKana": "なるとう",
    "nameEn": "Naruto",
    "lat": 35.60855,
    "lng": 140.41218,
    "transfers": [
      "JR東金線"
    ],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-12",
    "lineId": "sobu_main",
    "number": 12,
    "name": "松尾",
    "nameKana": "まつお",
    "nameEn": "Matsuo",
    "lat": 35.63718,
    "lng": 140.45887,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-13",
    "lineId": "sobu_main",
    "number": 13,
    "name": "横芝",
    "nameKana": "よこしば",
    "nameEn": "Yokoshiba",
    "lat": 35.66233,
    "lng": 140.49187,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "limitedExp"
    ]
  },
  {
    "id": "SM-14",
    "lineId": "sobu_main",
    "number": 14,
    "name": "飯倉",
    "nameKana": "いいぐら",
    "nameEn": "Iigura",
    "lat": 35.68561,
    "lng": 140.52241,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-15",
    "lineId": "sobu_main",
    "number": 15,
    "name": "八日市場",
    "nameKana": "ようかいちば",
    "nameEn": "Yokaichiba",
    "lat": 35.69974,
    "lng": 140.55323,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-16",
    "lineId": "sobu_main",
    "number": 16,
    "name": "干潟",
    "nameKana": "ひがた",
    "nameEn": "Higata",
    "lat": 35.71813,
    "lng": 140.60239,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-17",
    "lineId": "sobu_main",
    "number": 17,
    "name": "旭",
    "nameKana": "あさひ",
    "nameEn": "Asahi",
    "lat": 35.72199,
    "lng": 140.65587,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "limitedExp"
    ],
    "isMajor": true
  },
  {
    "id": "SM-18",
    "lineId": "sobu_main",
    "number": 18,
    "name": "飯岡",
    "nameKana": "いいおか",
    "nameEn": "Iioka",
    "lat": 35.72969,
    "lng": 140.6846,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "limitedExp"
    ]
  },
  {
    "id": "SM-19",
    "lineId": "sobu_main",
    "number": 19,
    "name": "倉橋",
    "nameKana": "くらはし",
    "nameEn": "Kurahashi",
    "lat": 35.73807,
    "lng": 140.71458,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-20",
    "lineId": "sobu_main",
    "number": 20,
    "name": "猿田",
    "nameKana": "さるだ",
    "nameEn": "Saruda",
    "lat": 35.74748,
    "lng": 140.73832,
    "transfers": [],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-21",
    "lineId": "sobu_main",
    "number": 21,
    "name": "松岸",
    "nameKana": "まつぎし",
    "nameEn": "Matsugishi",
    "lat": 35.73905,
    "lng": 140.79597,
    "transfers": [
      "JR成田線"
    ],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "SM-22",
    "lineId": "sobu_main",
    "number": 22,
    "name": "銚子",
    "nameKana": "ちょうし",
    "nameEn": "Choshi",
    "lat": 35.72915,
    "lng": 140.82883,
    "transfers": [
      "銚子電鉄"
    ],
    "address": "東京都・神奈川県・千葉県・埼玉県",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "limitedExp"
    ],
    "isMajor": true
  }
];
