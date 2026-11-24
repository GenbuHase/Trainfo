import type { Station } from '../../../types';

export const TOGANE_STATIONS: Station[] = [
  {
    "id": "TG-01",
    "lineId": "jr_togane",
    "number": 1,
    "name": "大網",
    "nameKana": "おおあみ",
    "nameEn": "Oami",
    "lat": 35.52288,
    "lng": 140.31215,
    "transfers": [
      "JR外房線"
    ],
    "address": "千葉県大網白里市南玉",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true
  },
  {
    "id": "TG-02",
    "lineId": "jr_togane",
    "number": 2,
    "name": "福俵",
    "nameKana": "ふくたわら",
    "nameEn": "Fukutawara",
    "lat": 35.54662,
    "lng": 140.34239,
    "transfers": [],
    "address": "千葉県東金市福俵",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false
  },
  {
    "id": "TG-03",
    "lineId": "jr_togane",
    "number": 3,
    "name": "東金",
    "nameKana": "とうがね",
    "nameEn": "Togane",
    "lat": 35.55965,
    "lng": 140.36272,
    "transfers": [],
    "address": "千葉県東金市東金",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false
  },
  {
    "id": "TG-04",
    "lineId": "jr_togane",
    "number": 4,
    "name": "求名",
    "nameKana": "ぐみょう",
    "nameEn": "Gumyo",
    "lat": 35.57938,
    "lng": 140.39564,
    "transfers": [],
    "address": "千葉県東金市求名",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false
  },
  {
    "id": "TG-05",
    "lineId": "jr_togane",
    "number": 5,
    "name": "成東",
    "nameKana": "なるとう",
    "nameEn": "Naruto",
    "lat": 35.60855,
    "lng": 140.41218,
    "transfers": [
      "JR総武本線"
    ],
    "address": "千葉県山武市津辺",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true
  }
];
