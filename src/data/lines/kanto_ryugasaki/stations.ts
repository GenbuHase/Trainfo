import type { Station } from '../../../types';

export const KANTO_RYUGASAKI_STATIONS: Station[] = [
  {
    "id": "KRG-01",
    "lineId": "kanto_ryugasaki",
    "number": 1,
    "name": "佐貫",
    "nameKana": "さぬき",
    "nameEn": "Sanuki",
    "lat": 35.92975,
    "lng": 140.13833,
    "transfers": [],
    "address": "茨城県佐貫駅",
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
    "lat": 35.91887,
    "lng": 140.15759,
    "transfers": [],
    "address": "茨城県入地駅",
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
    "lat": 35.90843,
    "lng": 140.17926,
    "transfers": [],
    "address": "茨城県竜ケ崎駅",
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
