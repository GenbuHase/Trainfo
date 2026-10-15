import type { Station } from '../../../types';

export const ITO_STATIONS: Station[] = [
  {
    "id": "JT-21",
    "lineId": "ito",
    "number": 1,
    "name": "熱海",
    "nameKana": "あたみ",
    "nameEn": "Atami",
    "lat": 35.1039035,
    "lng": 139.0780587,
    "transfers": [
      "JR東海道線",
      "JR伊東線",
      "東海道新幹線"
    ],
    "address": "静岡県熱海市田原本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
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
    "id": "JT-22",
    "lineId": "ito",
    "number": 2,
    "name": "来宮",
    "nameKana": "きのみや",
    "nameEn": "Kinomiya",
    "lat": 35.0988553,
    "lng": 139.0655865,
    "transfers": [
      "JR伊東線"
    ],
    "address": "静岡県熱海市福道町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JT-23",
    "lineId": "ito",
    "number": 3,
    "name": "伊豆多賀",
    "nameKana": "いずたが",
    "nameEn": "Izu-Taga",
    "lat": 35.058848,
    "lng": 139.0668437,
    "transfers": [
      "JR伊東線"
    ],
    "address": "静岡県熱海市上多賀",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JT-24",
    "lineId": "ito",
    "number": 4,
    "name": "網代",
    "nameKana": "あじろ",
    "nameEn": "Ajiro",
    "lat": 35.0436971,
    "lng": 139.0811393,
    "transfers": [
      "JR伊東線"
    ],
    "address": "静岡県熱海市網代",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
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
    "id": "JT-25",
    "lineId": "ito",
    "number": 5,
    "name": "宇佐美",
    "nameKana": "うさみ",
    "nameEn": "Usami",
    "lat": 35.0059064,
    "lng": 139.0797254,
    "transfers": [
      "JR伊東線"
    ],
    "address": "静岡県伊東市宇佐美",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JT-26",
    "lineId": "ito",
    "number": 6,
    "name": "伊東",
    "nameKana": "いとう",
    "nameEn": "Ito",
    "lat": 34.9755861,
    "lng": 139.0922222,
    "transfers": [
      "JR伊東線",
      "伊豆急行線"
    ],
    "address": "静岡県伊東市湯川三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
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
