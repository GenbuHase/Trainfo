import type { Station } from '../../../types';

export const AKITA_SHINKANSEN_STATIONS: Station[] = [
  {
    "id": "AS-01",
    "lineId": "akita_shinkansen",
    "number": 1,
    "name": "盛岡",
    "nameKana": "もりおか",
    "nameEn": "Morioka",
    "lat": 39.7014809,
    "lng": 141.136534,
    "transfers": [
      "東北新幹線",
      "JR東北本線",
      "JR山田線",
      "いわて銀河鉄道線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
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
    "id": "AS-02",
    "lineId": "akita_shinkansen",
    "number": 2,
    "name": "雫石",
    "nameKana": "しずくいし",
    "nameEn": "Shizuishi",
    "lat": 39.6889532,
    "lng": 140.9759241,
    "transfers": [],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
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
    "id": "AS-03",
    "lineId": "akita_shinkansen",
    "number": 3,
    "name": "田沢湖",
    "nameKana": "たざわこ",
    "nameEn": "Tazawako",
    "lat": 39.7004492,
    "lng": 140.7223114,
    "transfers": [],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
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
    "id": "AS-04",
    "lineId": "akita_shinkansen",
    "number": 4,
    "name": "角館",
    "nameKana": "かくのだて",
    "nameEn": "Kakunodate",
    "lat": 39.5925352,
    "lng": 140.5717095,
    "transfers": [
      "秋田内陸縦貫鉄道"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
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
    "id": "AS-05",
    "lineId": "akita_shinkansen",
    "number": 5,
    "name": "大曲",
    "nameKana": "おおまがり",
    "nameEn": "Omagari",
    "lat": 39.4655956,
    "lng": 140.479913,
    "transfers": [
      "JR奥羽本線（新庄～大曲）",
      "JR奥羽本線（大曲～秋田）",
      "JR田沢湖線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
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
    "id": "AS-06",
    "lineId": "akita_shinkansen",
    "number": 6,
    "name": "秋田",
    "nameKana": "あきた",
    "nameEn": "Akita",
    "lat": 39.7185949,
    "lng": 140.1299529,
    "transfers": [
      "JR奥羽本線（大曲～秋田）",
      "JR奥羽本線（秋田～青森）",
      "JR羽越本線",
      "JR男鹿線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
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
