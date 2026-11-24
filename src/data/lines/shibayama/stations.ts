import type { Station } from '../../../types';

export const SHIBAYAMA_STATIONS: Station[] = [
  {
    "id": "SBY-01",
    "stationNumber": "KS44",
    "lineId": "shibayama",
    "number": 1,
    "name": "東成田",
    "nameKana": "ひがしなりた",
    "nameEn": "Higashinarita",
    "lat": 35.7703684,
    "lng": 140.386796,
    "transfers": [
      "京成東成田線"
    ],
    "address": "千葉県成田市古込",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
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
    "id": "SBY-02",
    "stationNumber": "SR01",
    "lineId": "shibayama",
    "number": 2,
    "name": "芝山千代田",
    "nameKana": "しばやまちよだ",
    "nameEn": "Shibayamachiyoda",
    "lat": 35.7537084,
    "lng": 140.4002315,
    "transfers": [],
    "address": "千葉県成田市木の根",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
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
