import type { Station } from '../../../types';

export const KEISEI_OSHIAGE_STATIONS: Station[] = [
  {
    "id": "KSO-01",
    "stationNumber": "KS45",
    "lineId": "keisei_oshiage",
    "number": 1,
    "name": "押上",
    "nameKana": "おしあげ",
    "nameEn": "Oshiage",
    "lat": 35.71072,
    "lng": 139.81324,
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ半蔵門線",
      "都営地下鉄浅草線"
    ],
    "address": "東京都押上駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSO-02",
    "stationNumber": "KS46",
    "lineId": "keisei_oshiage",
    "number": 2,
    "name": "京成曳舟",
    "nameKana": "けいせいひきふね",
    "nameEn": "Keiseihikifune",
    "lat": 35.71916,
    "lng": 139.82093,
    "transfers": [],
    "address": "東京都京成曳舟駅",
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
    "id": "KSO-03",
    "stationNumber": "KS47",
    "lineId": "keisei_oshiage",
    "number": 3,
    "name": "八広",
    "nameKana": "やひろ",
    "nameEn": "Yahiro",
    "lat": 35.7272,
    "lng": 139.82827,
    "transfers": [],
    "address": "東京都八広駅",
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
    "id": "KSO-04",
    "stationNumber": "KS48",
    "lineId": "keisei_oshiage",
    "number": 4,
    "name": "四ツ木",
    "nameKana": "よつぎ",
    "nameEn": "Yotsugi",
    "lat": 35.73217,
    "lng": 139.83533,
    "transfers": [],
    "address": "東京都四ツ木駅",
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
    "id": "KSO-05",
    "stationNumber": "KS49",
    "lineId": "keisei_oshiage",
    "number": 5,
    "name": "京成立石",
    "nameKana": "けいせいたていし",
    "nameEn": "Keiseitateishi",
    "lat": 35.73834,
    "lng": 139.84898,
    "transfers": [],
    "address": "東京都京成立石駅",
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
    "id": "KSO-06",
    "stationNumber": "KS09",
    "lineId": "keisei_oshiage",
    "number": 6,
    "name": "青砥",
    "nameKana": "あおと",
    "nameEn": "Aoto",
    "lat": 35.74642,
    "lng": 139.85669,
    "transfers": [
      "京成本線"
    ],
    "address": "東京都青砥駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];