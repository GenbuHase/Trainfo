import type { Station } from '../../../types';

export const KANTO_RYUGASAKI_STATIONS: Station[] = [
  {
    "id": "KRG-01",
    "lineId": "kanto_ryugasaki",
    "number": 1,
    "name": "佐貫",
    "nameKana": "さぬき",
    "nameEn": "Sanuki",
    "lat": 35.9297295,
    "lng": 140.138408,
    "transfers": [],
    "address": "茨城県龍ケ崎市佐貫町",
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
    "id": "KRG-02",
    "lineId": "kanto_ryugasaki",
    "number": 2,
    "name": "入地",
    "nameKana": "いれじ",
    "nameEn": "Ireji",
    "lat": 35.9189151,
    "lng": 140.1576207,
    "transfers": [],
    "address": "茨城県龍ケ崎市川原代町",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KRG-03",
    "lineId": "kanto_ryugasaki",
    "number": 3,
    "name": "竜ケ崎",
    "nameKana": "りゅうがさき",
    "nameEn": "Ryuugasaki",
    "lat": 35.9085276,
    "lng": 140.1792383,
    "transfers": [],
    "address": "茨城県龍ケ崎市−",
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
