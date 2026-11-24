import type { Station } from '../../../types';

export const SENDAI_AIRPORT_STATIONS: Station[] = [
  {
    "id": "SA-01",
    "lineId": "sendai_airport",
    "number": 1,
    "name": "名取",
    "nameKana": "なとり",
    "nameEn": "Natori",
    "lat": 38.1733513,
    "lng": 140.8827087,
    "transfers": [
      "JR東北本線（福島～仙台）",
      "JR常磐線（いわき～仙台）"
    ],
    "address": "宮城県名取市増田二丁目5-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "SA-02",
    "lineId": "sendai_airport",
    "number": 2,
    "name": "杜せきのした",
    "nameKana": "もりせきのした",
    "nameEn": "Morisekinoshita",
    "lat": 38.1653873,
    "lng": 140.8960128,
    "transfers": [],
    "address": "宮城県名取市増田",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "SA-03",
    "lineId": "sendai_airport",
    "number": 3,
    "name": "美田園",
    "nameKana": "みたぞの",
    "nameEn": "Mitazono",
    "lat": 38.1596683,
    "lng": 140.9174637,
    "transfers": [],
    "address": "宮城県名取市美田園五丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "SA-04",
    "lineId": "sendai_airport",
    "number": 4,
    "name": "仙台空港",
    "nameKana": "せんだいくうこう",
    "nameEn": "Sendai Airport",
    "lat": 38.1371602,
    "lng": 140.9290141,
    "transfers": [],
    "address": "宮城県名取市下増田",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
