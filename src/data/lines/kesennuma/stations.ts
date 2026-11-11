import type { Station } from '../../../types';

export const KESENNUMA_STATIONS: Station[] = [
  {
    "id": "KS-01",
    "lineId": "kesennuma",
    "number": 1,
    "name": "前谷地",
    "nameKana": "まえやち",
    "nameEn": "Maeyachi",
    "lat": 38.5123152,
    "lng": 141.1938703,
    "transfers": [
      "JR石巻線",
      "JR気仙沼線"
    ],
    "address": "宮城県前谷地駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "KS-02",
    "lineId": "kesennuma",
    "number": 2,
    "name": "和渕",
    "nameKana": "わぶち",
    "nameEn": "Wabuchi",
    "lat": 38.5262126,
    "lng": 141.2207116,
    "transfers": [],
    "address": "宮城県和渕駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "KS-03",
    "lineId": "kesennuma",
    "number": 3,
    "name": "のの岳",
    "nameKana": "ののだけ",
    "nameEn": "Nonodake",
    "lat": 38.5531667,
    "lng": 141.2257896,
    "transfers": [],
    "address": "宮城県のの岳駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "KS-04",
    "lineId": "kesennuma",
    "number": 4,
    "name": "陸前豊里",
    "nameKana": "りくぜんとよさと",
    "nameEn": "Rikuzen-Toyosato",
    "lat": 38.5825764,
    "lng": 141.2444137,
    "transfers": [],
    "address": "宮城県陸前豊里駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "KS-05",
    "lineId": "kesennuma",
    "number": 5,
    "name": "御岳堂",
    "nameKana": "みたけどう",
    "nameEn": "Mitakedō",
    "lat": 38.6056937,
    "lng": 141.2648016,
    "transfers": [],
    "address": "宮城県御岳堂駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "KS-06",
    "lineId": "kesennuma",
    "number": 6,
    "name": "柳津",
    "nameKana": "やないづ",
    "nameEn": "Yanaizu",
    "lat": 38.6116887,
    "lng": 141.3059037,
    "transfers": [
      "JR気仙沼線",
      "JR気仙沼線BRT"
    ],
    "address": "宮城県柳津駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
