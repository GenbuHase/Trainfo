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
    "lat": 34.68278,
    "lng": 135.46667,
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
    "lat": 34.67308,
    "lng": 135.44354,
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
    "lat": 34.66843,
    "lng": 135.43911,
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
    "lat": 34.66208,
    "lng": 135.43199,
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
