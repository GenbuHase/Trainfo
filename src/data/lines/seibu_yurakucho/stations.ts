import type { Station } from '../../../types';

export const SEIBU_YURAKUCHO_STATIONS: Station[] = [
  {
    "id": "SI-37",
    "lineId": "seibu_yurakucho",
    "number": 1,
    "name": "小竹向原",
    "nameKana": "こたけむかいはら",
    "nameEn": "Kotake-mukaihara",
    "lat": 35.743596,
    "lng": 139.679006,
    "transfers": [
      "東京メトロ有楽町線",
      "東京メトロ副都心線"
    ],
    "address": "東京都練馬区小竹町二丁目16-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "express",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-38",
    "lineId": "seibu_yurakucho",
    "number": 2,
    "name": "新桜台",
    "nameKana": "しんさくらだい",
    "nameEn": "Shin-Sakuradai",
    "lat": 35.741075,
    "lng": 139.668648,
    "transfers": [],
    "address": "東京都練馬区桜台二丁目28-11",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-06",
    "lineId": "seibu_yurakucho",
    "number": 3,
    "name": "練馬",
    "nameKana": "ねりま",
    "nameEn": "Nerima",
    "lat": 35.737737,
    "lng": 139.654138,
    "transfers": [
      "西武池袋線",
      "西武豊島線",
      "都営大江戸線"
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
      "strain",
      "rapidExp",
      "express",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  }
];
