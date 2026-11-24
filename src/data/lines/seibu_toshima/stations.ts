import type { Station } from '../../../types';

export const SEIBU_TOSHIMA_STATIONS: Station[] = [
  {
    "id": "SIT-01",
    "stationNumber": "SI06",
    "lineId": "seibu_toshima",
    "number": 1,
    "name": "練馬",
    "nameKana": "ねりま",
    "nameEn": "Nerima",
    "lat": 35.7378707,
    "lng": 139.654113,
    "transfers": [
      "西武池袋線",
      "西武有楽町線",
      "都営地下鉄大江戸線"
    ],
    "address": "東京都練馬区練馬一丁目3-5",
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
  },
  {
    "id": "SIT-02",
    "stationNumber": "SI39",
    "lineId": "seibu_toshima",
    "number": 2,
    "name": "豊島園",
    "nameKana": "としまえん",
    "nameEn": "Toshimaen",
    "lat": 35.7415986,
    "lng": 139.6480192,
    "transfers": [],
    "address": "東京都練馬区練馬四丁目",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
