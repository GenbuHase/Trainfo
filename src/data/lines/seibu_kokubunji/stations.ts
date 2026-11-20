import type { Station } from '../../../types';

export const SEIBU_KOKUBUNJI_STATIONS: Station[] = [
  {
    "id": "SK-01",
    "stationNumber": "SK01",
    "lineId": "seibu_kokubunji",
    "number": 1,
    "name": "国分寺",
    "nameKana": "こくぶんじ",
    "nameEn": "Kokubunji",
    "lat": 35.700256,
    "lng": 139.4800128,
    "transfers": [
      "ＪＲ中央線快速",
      "西武多摩湖線"
    ],
    "address": "東京都国分寺駅",
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
    "id": "SK-02",
    "stationNumber": "SK02",
    "lineId": "seibu_kokubunji",
    "number": 2,
    "name": "恋ケ窪",
    "nameKana": "こいがくぼ",
    "nameEn": "Koigakubo",
    "lat": 35.7117748,
    "lng": 139.4636453,
    "transfers": [],
    "address": "東京都恋ケ窪駅",
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
    "id": "SK-03",
    "stationNumber": "SK03",
    "lineId": "seibu_kokubunji",
    "number": 3,
    "name": "鷹の台",
    "nameKana": "たかのだい",
    "nameEn": "Takanodai",
    "lat": 35.7234351,
    "lng": 139.4611753,
    "transfers": [],
    "address": "東京都鷹の台駅",
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
    "id": "SK-04",
    "stationNumber": "SK04",
    "lineId": "seibu_kokubunji",
    "number": 4,
    "name": "小川",
    "nameKana": "おがわ",
    "nameEn": "Ogawa",
    "lat": 35.7381334,
    "lng": 139.4636495,
    "transfers": [
      "西武拝島線"
    ],
    "address": "東京都小川駅",
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
    "id": "SK-05",
    "stationNumber": "SK05",
    "lineId": "seibu_kokubunji",
    "number": 5,
    "name": "東村山",
    "nameKana": "ひがしむらやま",
    "nameEn": "Higashimurayama",
    "lat": 35.7609038,
    "lng": 139.4657796,
    "transfers": [
      "西武新宿線",
      "西武西武園線"
    ],
    "address": "東京都東村山駅",
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
