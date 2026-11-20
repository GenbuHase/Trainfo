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
    "lat": 35.77035,
    "lng": 140.38676,
    "transfers": [
      "京成東成田線"
    ],
    "address": "千葉県東成田駅",
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
    "id": "SBY-02",
    "stationNumber": "SR01",
    "lineId": "shibayama",
    "number": 2,
    "name": "芝山千代田",
    "nameKana": "しばやまちよだ",
    "nameEn": "Shibayamachiyoda",
    "lat": 35.75375,
    "lng": 140.40027,
    "transfers": [],
    "address": "千葉県芝山千代田駅",
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
