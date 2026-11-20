import type { Station } from '../../../types';

export const SEIBU_TAMAKO_STATIONS: Station[] = [
  {
    "id": "SBT-01",
    "stationNumber": "ST01",
    "lineId": "seibu_tamako",
    "number": 1,
    "name": "国分寺",
    "nameKana": "こくぶんじ",
    "nameEn": "Kokubunji",
    "lat": 35.7010764,
    "lng": 139.4793706,
    "transfers": [
      "ＪＲ中央線快速",
      "西武国分寺線"
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
    "id": "SBT-02",
    "stationNumber": "ST02",
    "lineId": "seibu_tamako",
    "number": 2,
    "name": "一橋学園",
    "nameKana": "ひとつばしがくえん",
    "nameEn": "Hitotsubashigakuen",
    "lat": 35.7225092,
    "lng": 139.4800153,
    "transfers": [],
    "address": "東京都一橋学園駅",
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
    "id": "SBT-03",
    "stationNumber": "ST03",
    "lineId": "seibu_tamako",
    "number": 3,
    "name": "青梅街道",
    "nameKana": "おうめかいどう",
    "nameEn": "Oumekaidou",
    "lat": 35.7313366,
    "lng": 139.4766586,
    "transfers": [],
    "address": "東京都青梅街道駅",
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
    "id": "SBT-04",
    "stationNumber": "ST04",
    "lineId": "seibu_tamako",
    "number": 4,
    "name": "萩山",
    "nameKana": "はぎやま",
    "nameEn": "Hagiyama",
    "lat": 35.740944,
    "lng": 139.4766842,
    "transfers": [
      "西武拝島線"
    ],
    "address": "東京都萩山駅",
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
    "id": "SBT-05",
    "stationNumber": "ST05",
    "lineId": "seibu_tamako",
    "number": 5,
    "name": "八坂",
    "nameKana": "やさか",
    "nameEn": "Yasaka",
    "lat": 35.7452353,
    "lng": 139.4670896,
    "transfers": [],
    "address": "東京都八坂駅",
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
    "id": "SBT-06",
    "stationNumber": "ST06",
    "lineId": "seibu_tamako",
    "number": 6,
    "name": "武蔵大和",
    "nameKana": "むさしやまと",
    "nameEn": "Musashiyamato",
    "lat": 35.7567932,
    "lng": 139.4437913,
    "transfers": [],
    "address": "東京都武蔵大和駅",
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
    "id": "SBT-07",
    "stationNumber": "ST07",
    "lineId": "seibu_tamako",
    "number": 7,
    "name": "多摩湖",
    "nameKana": "たまこ",
    "nameEn": "Tamako",
    "lat": 35.7664484,
    "lng": 139.4424673,
    "transfers": [
      "西武山口線"
    ],
    "address": "東京都多摩湖駅",
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
