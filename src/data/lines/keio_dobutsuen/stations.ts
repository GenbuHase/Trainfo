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
    "lat": 35.6625539,
    "lng": 139.4122024,
    "transfers": [
      "京王線",
      "多摩都市モノレール線"
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
    "lat": 35.6498845,
    "lng": 139.4060678,
    "transfers": [
      "多摩都市モノレール線"
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
