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
    "lat": 35.7108037,
    "lng": 139.8131715,
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ半蔵門線",
      "都営地下鉄浅草線"
    ],
    "address": "東京都墨田区押上一丁目10-2",
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
    "lat": 35.7191409,
    "lng": 139.8209532,
    "transfers": [],
    "address": "東京都墨田区京島一丁目",
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
    "id": "KSO-03",
    "stationNumber": "KS47",
    "lineId": "keisei_oshiage",
    "number": 3,
    "name": "八広",
    "nameKana": "やひろ",
    "nameEn": "Yahiro",
    "lat": 35.7271404,
    "lng": 139.8283384,
    "transfers": [],
    "address": "東京都墨田区八広六丁目",
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
    "id": "KSO-04",
    "stationNumber": "KS48",
    "lineId": "keisei_oshiage",
    "number": 4,
    "name": "四ツ木",
    "nameKana": "よつぎ",
    "nameEn": "Yotsugi",
    "lat": 35.7321303,
    "lng": 139.835376,
    "transfers": [],
    "address": "東京都葛飾区四つ木一丁目",
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
    "id": "KSO-05",
    "stationNumber": "KS49",
    "lineId": "keisei_oshiage",
    "number": 5,
    "name": "京成立石",
    "nameKana": "けいせいたていし",
    "nameEn": "Keiseitateishi",
    "lat": 35.7383318,
    "lng": 139.8489822,
    "transfers": [],
    "address": "東京都葛飾区立石四丁目",
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
    "id": "KSO-06",
    "stationNumber": "KS09",
    "lineId": "keisei_oshiage",
    "number": 6,
    "name": "青砥",
    "nameKana": "あおと",
    "nameEn": "Aoto",
    "lat": 35.7463877,
    "lng": 139.8567584,
    "transfers": [
      "京成本線"
    ],
    "address": "東京都葛飾区青戸三丁目",
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
