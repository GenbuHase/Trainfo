import type { Station } from '../../../types';

export const KEISEI_HIGASHI_NARITA_STATIONS: Station[] = [
  {
    "id": "KSH-01",
    "stationNumber": "KS40",
    "lineId": "keisei_higashi_narita",
    "number": 1,
    "name": "京成成田",
    "nameKana": "けいせいなりた",
    "nameEn": "Keiseinarita",
    "lat": 35.7758408,
    "lng": 140.3148003,
    "transfers": [
      "京成本線"
    ],
    "address": "千葉県京成成田駅",
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
    "id": "KSH-02",
    "stationNumber": "KS44",
    "lineId": "keisei_higashi_narita",
    "number": 2,
    "name": "東成田",
    "nameKana": "ひがしなりた",
    "nameEn": "Higashinarita",
    "lat": 35.7703684,
    "lng": 140.386796,
    "transfers": [
      "芝山鉄道"
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
  }
];
