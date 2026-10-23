import type { Station } from '../../../types';

export const TOKAIDO_SHIZUOKA_STATIONS: Station[] = [
  {
    "id": "CA-00",
    "stationNumber": "CA-00",
    "lineId": "tokaido_shizuoka",
    "number": 0,
    "name": "熱海",
    "nameKana": "あたみ",
    "nameEn": "Atami",
    "lat": 35.1039035,
    "lng": 139.0780587,
    "transfers": [
      "JR東海道線",
      "JR伊東線",
      "東海道新幹線"
    ],
    "address": "静岡県熱海市田原本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "CA-01",
    "stationNumber": "CA-01",
    "lineId": "tokaido_shizuoka",
    "number": 1,
    "name": "函南",
    "nameKana": "かんなみ",
    "nameEn": "Kannami",
    "lat": 35.1087265,
    "lng": 138.9709903,
    "transfers": [],
    "address": "静岡県田方郡函南町大竹",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
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
    "id": "CA-02",
    "stationNumber": "CA-02",
    "lineId": "tokaido_shizuoka",
    "number": 2,
    "name": "三島",
    "nameKana": "みしま",
    "nameEn": "Mishima",
    "lat": 35.1265664,
    "lng": 138.911144,
    "transfers": [
      "東海道新幹線",
      "伊豆箱根鉄道駿豆線"
    ],
    "address": "静岡県三島市一番町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "CA-03",
    "stationNumber": "CA-03",
    "lineId": "tokaido_shizuoka",
    "number": 3,
    "name": "沼津",
    "nameKana": "ぬまづ",
    "nameEn": "Numazu",
    "lat": 35.1031271,
    "lng": 138.8593352,
    "transfers": [
      "JR御殿場線"
    ],
    "address": "静岡県沼津市大手町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
  }
];
