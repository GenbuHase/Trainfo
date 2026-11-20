import type { Station } from '../../../types';

export const JR_NIKKO_STATIONS: Station[] = [
  {
    "id": "NK-01",
    "lineId": "jr_nikko",
    "number": 1,
    "name": "宇都宮",
    "nameKana": "うつのみや",
    "nameEn": "Utsunomiya",
    "lat": 36.5592714,
    "lng": 139.8983239,
    "transfers": [
      "ＪＲ東北新幹線",
      "ＪＲ山形新幹線",
      "ＪＲ宇都宮線"
    ],
    "address": "栃木県宇都宮駅",
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
    "id": "NK-02",
    "lineId": "jr_nikko",
    "number": 2,
    "name": "鶴田",
    "nameKana": "つるた",
    "nameEn": "Tsuruta",
    "lat": 36.5381792,
    "lng": 139.8581454,
    "transfers": [],
    "address": "栃木県鶴田駅",
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
    "id": "NK-03",
    "lineId": "jr_nikko",
    "number": 3,
    "name": "鹿沼",
    "nameKana": "かぬま",
    "nameEn": "Kanuma",
    "lat": 36.5717837,
    "lng": 139.7626036,
    "transfers": [],
    "address": "栃木県鹿沼駅",
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
    "id": "NK-04",
    "lineId": "jr_nikko",
    "number": 4,
    "name": "文挾",
    "nameKana": "ふばさみ",
    "nameEn": "Fubasami",
    "lat": 36.63725,
    "lng": 139.7280101,
    "transfers": [],
    "address": "栃木県文挾駅",
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
    "id": "NK-05",
    "lineId": "jr_nikko",
    "number": 5,
    "name": "下野大沢",
    "nameKana": "しもつけおおさわ",
    "nameEn": "Shimotsukeoosawa",
    "lat": 36.6871858,
    "lng": 139.7320364,
    "transfers": [],
    "address": "栃木県下野大沢駅",
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
    "id": "NK-06",
    "lineId": "jr_nikko",
    "number": 6,
    "name": "今市",
    "nameKana": "いまいち",
    "nameEn": "Imaichi",
    "lat": 36.7208703,
    "lng": 139.6865959,
    "transfers": [],
    "address": "栃木県今市駅",
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
    "id": "NK-07",
    "lineId": "jr_nikko",
    "number": 7,
    "name": "日光",
    "nameKana": "にっこう",
    "nameEn": "Nikkou",
    "lat": 36.7478668,
    "lng": 139.6214693,
    "transfers": [],
    "address": "栃木県日光駅",
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
