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
    "lat": 35.7609,
    "lng": 139.46591,
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
    "lat": 35.76756,
    "lng": 139.44934,
    "transfers": [],
    "address": "東京都西武園駅",
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