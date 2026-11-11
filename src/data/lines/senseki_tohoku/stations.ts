import type { Station } from '../../../types';

export const SENSEKI_TOHOKU_STATIONS: Station[] = [
  {
    "id": "ST-01",
    "lineId": "senseki_tohoku",
    "number": 1,
    "name": "塩釜",
    "nameKana": "しおがま",
    "nameEn": "Shiogama",
    "lat": 38.3095493,
    "lng": 141.0095384,
    "transfers": [
      "JR東北本線（仙台～一ノ関）"
    ],
    "address": "宮城県塩釜駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "special_rapid"
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
    "id": "ST-02",
    "lineId": "senseki_tohoku",
    "number": 2,
    "name": "高城町",
    "nameKana": "たかぎまち",
    "nameEn": "Takagimachi",
    "lat": 38.3826611,
    "lng": 141.0732011,
    "transfers": [
      "JR仙石線"
    ],
    "address": "宮城県高城町駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "special_rapid"
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
