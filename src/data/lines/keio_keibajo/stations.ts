import type { Station } from '../../../types';

export const KEIO_KEIBAJO_STATIONS: Station[] = [
  {
    "id": "KOK-01",
    "stationNumber": "KO23",
    "lineId": "keio_keibajo",
    "number": 1,
    "name": "東府中",
    "nameKana": "ひがしふちゅう",
    "nameEn": "Higashifuchuu",
    "lat": 35.669015,
    "lng": 139.4947881,
    "transfers": [
      "京王線"
    ],
    "address": "東京都府中市清水が丘一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOK-02",
    "stationNumber": "KO46",
    "lineId": "keio_keibajo",
    "number": 2,
    "name": "府中競馬正門前",
    "nameKana": "ふちゅうけいばせいもんまえ",
    "nameEn": "Fuchuukeibaseimommae",
    "lat": 35.6685848,
    "lng": 139.4845262,
    "transfers": [],
    "address": "東京都府中市八幡町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
