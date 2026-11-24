import type { Station } from '../../../types';

export const JR_WADAMISAKI_STATIONS: Station[] = [
  {
    "id": "jr_wadamisaki-01",
    "lineId": "jr_wadamisaki",
    "number": 1,
    "name": "兵庫",
    "nameKana": "ひょうご",
    "nameEn": "Hyogo",
    "lat": 34.668,
    "lng": 135.16477,
    "transfers": [],
    "address": "兵庫県神戸市兵庫区駅南通五丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ]
  },
  {
    "id": "jr_wadamisaki-02",
    "lineId": "jr_wadamisaki",
    "number": 2,
    "name": "和田岬",
    "nameKana": "わだみさき",
    "nameEn": "Wadamisaki",
    "lat": 34.65722,
    "lng": 135.17442,
    "transfers": [],
    "address": "兵庫県神戸市兵庫区和田宮通三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": false,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ]
  }
];
