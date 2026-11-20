import type { Station } from '../../../types';

export const JR_YAHIKO_STATIONS: Station[] = [
  {
    "id": "YH-01",
    "lineId": "jr_yahiko",
    "number": 1,
    "name": "弥彦",
    "nameKana": "やひこ",
    "nameEn": "Yahiko",
    "lat": 37.69935,
    "lng": 138.83241,
    "transfers": [],
    "address": "新潟県弥彦駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-02",
    "lineId": "jr_yahiko",
    "number": 2,
    "name": "矢作",
    "nameKana": "やはぎ",
    "nameEn": "Yahagi",
    "lat": 37.69049,
    "lng": 138.85202,
    "transfers": [],
    "address": "新潟県矢作駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-03",
    "lineId": "jr_yahiko",
    "number": 3,
    "name": "吉田",
    "nameKana": "よしだ",
    "nameEn": "Yoshida",
    "lat": 37.68645,
    "lng": 138.87745,
    "transfers": [
      "ＪＲ越後線"
    ],
    "address": "新潟県吉田駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-04",
    "lineId": "jr_yahiko",
    "number": 4,
    "name": "西燕",
    "nameKana": "にしつばめ",
    "nameEn": "Nishi-Tsubame",
    "lat": 37.6801,
    "lng": 138.90891,
    "transfers": [],
    "address": "新潟県西燕駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-05",
    "lineId": "jr_yahiko",
    "number": 5,
    "name": "燕",
    "nameKana": "つばめ",
    "nameEn": "Tsubame",
    "lat": 37.66752,
    "lng": 138.9296,
    "transfers": [],
    "address": "新潟県燕駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-06",
    "lineId": "jr_yahiko",
    "number": 6,
    "name": "燕三条",
    "nameKana": "つばめさんじょう",
    "nameEn": "Tsubame-Sanjo",
    "lat": 37.64852,
    "lng": 138.94008,
    "transfers": [
      "ＪＲ上越新幹線"
    ],
    "address": "新潟県燕三条駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-07",
    "lineId": "jr_yahiko",
    "number": 7,
    "name": "北三条",
    "nameKana": "きたさんじょう",
    "nameEn": "Kita-Sanjo",
    "lat": 37.63264,
    "lng": 138.95638,
    "transfers": [],
    "address": "新潟県北三条駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "YH-08",
    "lineId": "jr_yahiko",
    "number": 8,
    "name": "東三条",
    "nameKana": "ひがしさんじょう",
    "nameEn": "Higashi-Sanjo",
    "lat": 37.628366,
    "lng": 138.9733152,
    "transfers": [
      "ＪＲ信越本線"
    ],
    "address": "新潟県東三条駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];