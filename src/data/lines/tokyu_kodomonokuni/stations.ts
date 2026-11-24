import type { Station } from '../../../types';

export const TOKYU_KODOMONOKUNI_STATIONS: Station[] = [
  {
    "id": "KD-01",
    "stationNumber": "KD01",
    "lineId": "tokyu_kodomonokuni",
    "number": 1,
    "name": "長津田",
    "nameKana": "ながつた",
    "nameEn": "Nagatsuta",
    "lat": 35.532036,
    "lng": 139.4928431,
    "transfers": [
      "ＪＲ横浜線",
      "東急田園都市線"
    ],
    "address": "神奈川県横浜市緑区長津田四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KD-02",
    "stationNumber": "KD02",
    "lineId": "tokyu_kodomonokuni",
    "number": 2,
    "name": "恩田",
    "nameKana": "おんだ",
    "nameEn": "Onda",
    "lat": 35.5455769,
    "lng": 139.492274,
    "transfers": [],
    "address": "神奈川県横浜市青葉区恩田町",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KD-03",
    "stationNumber": "KD03",
    "lineId": "tokyu_kodomonokuni",
    "number": 3,
    "name": "こどもの国",
    "nameKana": "こどものくに",
    "nameEn": "Kodomonokuni",
    "lat": 35.5583809,
    "lng": 139.4864927,
    "transfers": [],
    "address": "神奈川県横浜市青葉区奈良町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
