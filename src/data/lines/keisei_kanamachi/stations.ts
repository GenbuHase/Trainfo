import type { Station } from '../../../types';

export const KEISEI_KANAMACHI_STATIONS: Station[] = [
  {
    "id": "KSK-01",
    "stationNumber": "KS10",
    "lineId": "keisei_kanamachi",
    "number": 1,
    "name": "京成高砂",
    "nameKana": "けいせいたかさご",
    "nameEn": "Keiseitakasago",
    "lat": 35.75083,
    "lng": 139.86572,
    "transfers": [
      "京成本線",
      "京成成田スカイアクセス線",
      "北総鉄道北総線"
    ],
    "address": "東京都京成高砂駅",
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
    "id": "KSK-02",
    "stationNumber": "KS50",
    "lineId": "keisei_kanamachi",
    "number": 2,
    "name": "柴又",
    "nameKana": "しばまた",
    "nameEn": "Shibamata",
    "lat": 35.75642,
    "lng": 139.8753,
    "transfers": [],
    "address": "東京都柴又駅",
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
    "id": "KSK-03",
    "stationNumber": "KS51",
    "lineId": "keisei_kanamachi",
    "number": 3,
    "name": "京成金町",
    "nameKana": "けいせいかなまち",
    "nameEn": "Keiseikanamachi",
    "lat": 35.76875,
    "lng": 139.87021,
    "transfers": [],
    "address": "東京都京成金町駅",
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
