import type { Station } from '../../../types';

export const TOKAIDO_MINOAKASAKA_STATIONS: Station[] = [
  {
    "id": "MA-01",
    "stationNumber": "CA-77",
    "lineId": "tokaido_minoakasaka",
    "number": 1,
    "name": "大垣",
    "nameKana": "おおがき",
    "nameEn": "Ogaki",
    "lat": 35.36713,
    "lng": 136.61699,
    "transfers": [
      "養老鉄道養老線",
      "樽見鉄道樽見線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "MA-02",
    "lineId": "tokaido_minoakasaka",
    "number": 2,
    "name": "荒尾",
    "nameKana": "あらお",
    "nameEn": "Arao",
    "lat": 35.37338,
    "lng": 136.58344,
    "transfers": [],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "MA-03",
    "lineId": "tokaido_minoakasaka",
    "number": 3,
    "name": "美濃赤坂",
    "nameKana": "みのあかさか",
    "nameEn": "Mino-Akasaka",
    "lat": 35.38735,
    "lng": 136.58218,
    "transfers": [
      "西濃鉄道市橋線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
