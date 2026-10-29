import type { Station } from '../../../types';

export const KEIYO_STATIONS: Station[] = [
  {
    "id": "JE-01",
    "lineId": "keiyo",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.677755,
    "lng": 139.764631,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR中央線",
      "JR横須賀線",
      "JR総武快速線",
      "JR上野東京ライン",
      "東北新幹線",
      "東海道新幹線",
      "東京メトロ丸ノ内線"
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
      "commuter_rapid",
      "limitedExp"
    ],
    "stationNumber": "JE-01",
    "isMajor": true
  },
  {
    "id": "JE-02",
    "lineId": "keiyo",
    "number": 2,
    "name": "八丁堀",
    "nameKana": "はっちょうぼり",
    "nameEn": "Hatchobori",
    "lat": 35.67462,
    "lng": 139.77885,
    "transfers": [
      "東京メトロ日比谷線"
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
      "commuter_rapid"
    ],
    "stationNumber": "JE-02"
  },
  {
    "id": "JE-03",
    "lineId": "keiyo",
    "number": 3,
    "name": "越中島",
    "nameKana": "えっちゅうじま",
    "nameEn": "Etchujima",
    "lat": 35.66732,
    "lng": 139.79331,
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
    ],
    "stationNumber": "JE-03"
  },
  {
    "id": "JE-04",
    "lineId": "keiyo",
    "number": 4,
    "name": "潮見",
    "nameKana": "しおみ",
    "nameEn": "Shiomi",
    "lat": 35.6595,
    "lng": 139.81653,
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
    ],
    "stationNumber": "JE-04"
  },
  {
    "id": "JE-05",
    "lineId": "keiyo",
    "number": 5,
    "name": "新木場",
    "nameKana": "しんきば",
    "nameEn": "Shin-Kiba",
    "lat": 35.6459,
    "lng": 139.82584,
    "transfers": [
      "東京臨海高速鉄道りんかい線",
      "東京メトロ有楽町線"
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
      "commuter_rapid"
    ],
    "stationNumber": "JE-05",
    "isMajor": true
  },
  {
    "id": "JE-06",
    "lineId": "keiyo",
    "number": 6,
    "name": "葛西臨海公園",
    "nameKana": "かさいりんかいこうえん",
    "nameEn": "Kasai-Rinkai-koen",
    "lat": 35.64382,
    "lng": 139.86243,
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
    ],
    "stationNumber": "JE-06"
  },
  {
    "id": "JE-07",
    "lineId": "keiyo",
    "number": 7,
    "name": "舞浜",
    "nameKana": "まいはま",
    "nameEn": "Maihama",
    "lat": 35.63579,
    "lng": 139.88473,
    "transfers": [
      "ディズニーリゾートライン"
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
    ],
    "stationNumber": "JE-07",
    "isMajor": true
  },
  {
    "id": "JE-08",
    "lineId": "keiyo",
    "number": 8,
    "name": "新浦安",
    "nameKana": "しんうらやす",
    "nameEn": "Shin-Urayasu",
    "lat": 35.65021,
    "lng": 139.91336,
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
    ],
    "stationNumber": "JE-08",
    "isMajor": true
  },
  {
    "id": "JE-09",
    "lineId": "keiyo",
    "number": 9,
    "name": "市川塩浜",
    "nameKana": "いちかわしおはま",
    "nameEn": "Ichikawa-Shiohama",
    "lat": 35.66742,
    "lng": 139.92413,
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
    ],
    "stationNumber": "JE-09"
  },
  {
    "id": "JE-10",
    "lineId": "keiyo",
    "number": 10,
    "name": "二俣新町",
    "nameKana": "ふたまたしんまち",
    "nameEn": "Futamata-Shimmachi",
    "lat": 35.6915,
    "lng": 139.9604,
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
    ],
    "stationNumber": "JE-10"
  },
  {
    "id": "JE-11",
    "lineId": "keiyo",
    "number": 11,
    "name": "南船橋",
    "nameKana": "みなみふなばし",
    "nameEn": "Minami-Funabashi",
    "lat": 35.68131,
    "lng": 139.99643,
    "transfers": [
      "JR武蔵野線"
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
    ],
    "stationNumber": "JE-11",
    "isMajor": true
  },
  {
    "id": "JE-12",
    "lineId": "keiyo",
    "number": 12,
    "name": "新習志野",
    "nameKana": "しんならしの",
    "nameEn": "Shin-Narashino",
    "lat": 35.66685,
    "lng": 140.01392,
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
    ],
    "stationNumber": "JE-12"
  },
  {
    "id": "JE-13",
    "lineId": "keiyo",
    "number": 13,
    "name": "幕張豊砂",
    "nameKana": "まくはりとよすな",
    "nameEn": "Makuhari-Toyosuna",
    "lat": 35.65877323,
    "lng": 140.02617032,
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
    ],
    "stationNumber": "JE-13"
  },
  {
    "id": "JE-14",
    "lineId": "keiyo",
    "number": 14,
    "name": "海浜幕張",
    "nameKana": "かいひんまくはり",
    "nameEn": "Kaihimmakuhari",
    "lat": 35.64785,
    "lng": 140.04291,
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
    "stationNumber": "JE-14",
    "isMajor": true
  },
  {
    "id": "JE-15",
    "lineId": "keiyo",
    "number": 15,
    "name": "検見川浜",
    "nameKana": "けみがわはま",
    "nameEn": "Kemigawahama",
    "lat": 35.63649,
    "lng": 140.06002,
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
    ],
    "stationNumber": "JE-15"
  },
  {
    "id": "JE-16",
    "lineId": "keiyo",
    "number": 16,
    "name": "稲毛海岸",
    "nameKana": "いなげかいがん",
    "nameEn": "Inagekaigan",
    "lat": 35.62943,
    "lng": 140.07499,
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
    ],
    "stationNumber": "JE-16"
  },
  {
    "id": "JE-17",
    "lineId": "keiyo",
    "number": 17,
    "name": "千葉みなと",
    "nameKana": "ちばみなと",
    "nameEn": "Chiba-Minato",
    "lat": 35.60606,
    "lng": 140.10346,
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
    ],
    "stationNumber": "JE-17"
  },
  {
    "id": "JE-18",
    "lineId": "keiyo",
    "number": 18,
    "name": "蘇我",
    "nameKana": "そが",
    "nameEn": "Soga",
    "lat": 35.581691,
    "lng": 140.130656,
    "transfers": [
      "JR外房線",
      "JR内房線"
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
      "commuter_rapid",
      "limitedExp"
    ],
    "stationNumber": "JE-18",
    "isMajor": true
  }
];
