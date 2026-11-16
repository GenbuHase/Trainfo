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
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
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
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ]
  }
];
