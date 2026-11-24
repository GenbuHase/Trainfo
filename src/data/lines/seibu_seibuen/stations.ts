import type { Station } from '../../../types';

export const SEIBU_SEIBUEN_STATIONS: Station[] = [
  {
    "id": "SKW-01",
    "stationNumber": "SK05",
    "lineId": "seibu_seibuen",
    "number": 1,
    "name": "東村山",
    "nameKana": "ひがしむらやま",
    "nameEn": "Higashimurayama",
    "lat": 35.7609038,
    "lng": 139.4657796,
    "transfers": [
      "西武新宿線",
      "西武国分寺線"
    ],
    "address": "東京都東村山駅",
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
    "id": "SKW-02",
    "stationNumber": "SK06",
    "lineId": "seibu_seibuen",
    "number": 2,
    "name": "西武園",
    "nameKana": "せいぶえん",
    "nameEn": "Seibuen",
    "lat": 35.767585,
    "lng": 139.449355,
    "transfers": [],
    "address": "東京都東村山市多摩湖町四丁目",
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
