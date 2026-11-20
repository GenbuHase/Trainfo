import type { Station } from '../../../types';

export const KEISEI_CHIHARA_STATIONS: Station[] = [
  {
    "id": "KSCH-01",
    "stationNumber": "KS60",
    "lineId": "keisei_chihara",
    "number": 1,
    "name": "千葉中央",
    "nameKana": "ちばちゅうおう",
    "nameEn": "Chibachuuou",
    "lat": 35.60674,
    "lng": 140.11814,
    "transfers": [
      "京成千葉線"
    ],
    "address": "千葉県千葉中央駅",
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
    "id": "KSCH-02",
    "stationNumber": "KS61",
    "lineId": "keisei_chihara",
    "number": 2,
    "name": "千葉寺",
    "nameKana": "ちばでら",
    "nameEn": "Chibadera",
    "lat": 35.59052,
    "lng": 140.1316,
    "transfers": [],
    "address": "千葉県千葉寺駅",
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
    "id": "KSCH-03",
    "stationNumber": "KS62",
    "lineId": "keisei_chihara",
    "number": 3,
    "name": "大森台",
    "nameKana": "おおもりだい",
    "nameEn": "Oomoridai",
    "lat": 35.58427,
    "lng": 140.14922,
    "transfers": [],
    "address": "千葉県大森台駅",
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
    "id": "KSCH-04",
    "stationNumber": "KS63",
    "lineId": "keisei_chihara",
    "number": 4,
    "name": "学園前",
    "nameKana": "がくえんまえ",
    "nameEn": "Gakuemmae",
    "lat": 35.56072,
    "lng": 140.15845,
    "transfers": [],
    "address": "千葉県学園前駅",
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
    "id": "KSCH-05",
    "stationNumber": "KS64",
    "lineId": "keisei_chihara",
    "number": 5,
    "name": "おゆみ野",
    "nameKana": "おゆみの",
    "nameEn": "Oyumino",
    "lat": 35.55018,
    "lng": 140.16589,
    "transfers": [],
    "address": "千葉県おゆみ野駅",
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
    "id": "KSCH-06",
    "stationNumber": "KS65",
    "lineId": "keisei_chihara",
    "number": 6,
    "name": "ちはら台",
    "nameKana": "ちはらだい",
    "nameEn": "Chiharadai",
    "lat": 35.53441,
    "lng": 140.17023,
    "transfers": [],
    "address": "千葉県ちはら台駅",
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
