import type { Station } from '../../../types';

export const KEIO_DOBUTSUEN_STATIONS: Station[] = [
  {
    "id": "KOD-01",
    "stationNumber": "KO29",
    "lineId": "keio_dobutsuen",
    "number": 1,
    "name": "高幡不動",
    "nameKana": "たかはたふどう",
    "nameEn": "Takahatafudou",
    "lat": 35.66267,
    "lng": 139.41223,
    "transfers": [
      "京王線",
      "多摩モノレール"
    ],
    "address": "東京都高幡不動駅",
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
    "id": "KOD-02",
    "stationNumber": "KO47",
    "lineId": "keio_dobutsuen",
    "number": 2,
    "name": "多摩動物公園",
    "nameKana": "たまどうぶつこうえん",
    "nameEn": "Tamadoubutsukouen",
    "lat": 35.64987,
    "lng": 139.40608,
    "transfers": [
      "多摩モノレール"
    ],
    "address": "東京都多摩動物公園駅",
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