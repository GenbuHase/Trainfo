import type { Station } from '../../../types';

export const JR_YUMESAKI_STATIONS: Station[] = [
  {
    "id": "jr_yumesaki-01",
    "stationNumber": "JR-P14",
    "lineId": "jr_yumesaki",
    "number": 1,
    "name": "西九条",
    "nameKana": "にしくじょう",
    "nameEn": "Nishi-Kujo",
    "lat": 34.68275,
    "lng": 135.4669,
    "transfers": [
      "ＪＲ大阪環状線外回り",
      "ＪＲ大阪環状線内回り",
      "阪神なんば線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "jr_yumesaki-02",
    "stationNumber": "JR-P15",
    "lineId": "jr_yumesaki",
    "number": 2,
    "name": "安治川口",
    "nameKana": "あじかわぐち",
    "nameEn": "Ajikawaguchi",
    "lat": 34.67369,
    "lng": 135.4442,
    "transfers": [],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "jr_yumesaki-03",
    "stationNumber": "JR-P16",
    "lineId": "jr_yumesaki",
    "number": 3,
    "name": "ユニバーサルシティ",
    "nameKana": "ゆにばーさるしてぃ",
    "nameEn": "Universal City",
    "lat": 34.66725,
    "lng": 135.43802,
    "transfers": [],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "jr_yumesaki-04",
    "stationNumber": "JR-P17",
    "lineId": "jr_yumesaki",
    "number": 4,
    "name": "桜島",
    "nameKana": "さくらじま",
    "nameEn": "Sakurajima",
    "lat": 34.66188,
    "lng": 135.43209,
    "transfers": [],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  }
];
