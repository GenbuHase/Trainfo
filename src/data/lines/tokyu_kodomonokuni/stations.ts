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
    "lat": 35.53201,
    "lng": 139.49284,
    "transfers": [
      "ＪＲ横浜線",
      "東急田園都市線"
    ],
    "address": "神奈川県長津田駅",
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
    "lat": 35.54554,
    "lng": 139.49222,
    "transfers": [],
    "address": "神奈川県恩田駅",
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
    "lat": 35.55839,
    "lng": 139.48656,
    "transfers": [],
    "address": "神奈川県こどもの国駅",
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
