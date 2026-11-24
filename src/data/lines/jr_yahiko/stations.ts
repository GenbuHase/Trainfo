import type { Station } from '../../../types';

export const JR_YAHIKO_STATIONS: Station[] = [
  {
    "id": "YH-01",
    "lineId": "jr_yahiko",
    "number": 1,
    "name": "弥彦",
    "nameKana": "やひこ",
    "nameEn": "Yahiko",
    "lat": 37.6993912,
    "lng": 138.8323896,
    "transfers": [],
    "address": "新潟県弥彦村大字弥彦",
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
    "lat": 37.6904888,
    "lng": 138.8520192,
    "transfers": [],
    "address": "新潟県弥彦村大字矢作",
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
    "lat": 37.6863251,
    "lng": 138.877543,
    "transfers": [
      "ＪＲ越後線"
    ],
    "address": "新潟県燕市吉田堤町",
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
    "lat": 37.6800991,
    "lng": 138.9089088,
    "transfers": [],
    "address": "新潟県燕市花見",
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
    "lat": 37.6674953,
    "lng": 138.9295941,
    "transfers": [],
    "address": "新潟県燕市本町二丁目",
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
    "lat": 37.6485567,
    "lng": 138.9401291,
    "transfers": [
      "ＪＲ上越新幹線"
    ],
    "address": "新潟県三条市下須頃497",
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
    "lat": 37.6325847,
    "lng": 138.9563653,
    "transfers": [],
    "address": "新潟県三条市元町",
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
    "address": "新潟県三条市東三条一丁目",
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
