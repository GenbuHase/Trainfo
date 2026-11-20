import type { Station } from '../../../types';

export const KEIO_TAKAO_STATIONS: Station[] = [
  {
    "id": "KOT-01",
    "stationNumber": "KO33",
    "lineId": "keio_takao",
    "number": 1,
    "name": "北野",
    "nameKana": "きたの",
    "nameEn": "Kitano",
    "lat": 35.6443872,
    "lng": 139.3542541,
    "transfers": [
      "京王線"
    ],
    "address": "東京都北野駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOT-02",
    "stationNumber": "KO48",
    "lineId": "keio_takao",
    "number": 2,
    "name": "京王片倉",
    "nameKana": "けいおうかたくら",
    "nameEn": "Keioukatakura",
    "lat": 35.644242,
    "lng": 139.3373909,
    "transfers": [],
    "address": "東京都京王片倉駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOT-03",
    "stationNumber": "KO49",
    "lineId": "keio_takao",
    "number": 3,
    "name": "山田",
    "nameKana": "やまだ",
    "nameEn": "Yamada",
    "lat": 35.6443366,
    "lng": 139.3211507,
    "transfers": [],
    "address": "東京都山田駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOT-04",
    "stationNumber": "KO50",
    "lineId": "keio_takao",
    "number": 4,
    "name": "めじろ台",
    "nameKana": "めじろだい",
    "nameEn": "Mejirodai",
    "lat": 35.6436313,
    "lng": 139.3084594,
    "transfers": [],
    "address": "東京都めじろ台駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOT-05",
    "stationNumber": "KO51",
    "lineId": "keio_takao",
    "number": 5,
    "name": "狭間",
    "nameKana": "はざま",
    "nameEn": "Hazama",
    "lat": 35.6404369,
    "lng": 139.2943393,
    "transfers": [],
    "address": "東京都狭間駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOT-06",
    "stationNumber": "KO52",
    "lineId": "keio_takao",
    "number": 6,
    "name": "高尾",
    "nameKana": "たかお",
    "nameEn": "Takao",
    "lat": 35.6418299,
    "lng": 139.2824762,
    "transfers": [
      "ＪＲ中央本線",
      "ＪＲ中央線快速"
    ],
    "address": "東京都高尾駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOT-07",
    "stationNumber": "KO53",
    "lineId": "keio_takao",
    "number": 7,
    "name": "高尾山口",
    "nameKana": "たかおさんぐち",
    "nameEn": "Takaosanguchi",
    "lat": 35.6328629,
    "lng": 139.2700796,
    "transfers": [],
    "address": "東京都高尾山口駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
