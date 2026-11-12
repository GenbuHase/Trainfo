import type { Station } from '../../../types';

export const TOHOKU_RIFU_STATIONS: Station[] = [
  {
    "id": "TRF-01",
    "lineId": "tohoku_rifu",
    "number": 1,
    "name": "岩切",
    "nameKana": "いわきり",
    "nameEn": "Iwakiri",
    "lat": 38.3008614,
    "lng": 140.9552962,
    "transfers": [
      "JR東北本線（仙台～一ノ関）"
    ],
    "address": "宮城県岩切駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "TRF-02",
    "lineId": "tohoku_rifu",
    "number": 2,
    "name": "新利府",
    "nameKana": "しんりふ",
    "nameEn": "Shin-Rifu",
    "lat": 38.3169649,
    "lng": 140.9728498,
    "transfers": [],
    "address": "宮城県新利府駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "TRF-03",
    "lineId": "tohoku_rifu",
    "number": 3,
    "name": "利府",
    "nameKana": "りふ",
    "nameEn": "Rifu",
    "lat": 38.329289,
    "lng": 140.9847502,
    "transfers": [],
    "address": "宮城県利府駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
