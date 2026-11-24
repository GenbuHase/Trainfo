import type { Station } from '../../../types';

export const KEIKYU_ZUSHI_STATIONS: Station[] = [
  {
    "id": "KKZ-01",
    "stationNumber": "KK50",
    "lineId": "keikyu_zushi",
    "number": 1,
    "name": "金沢八景",
    "nameKana": "かなざわはっけい",
    "nameEn": "Kanazawahakkei",
    "lat": 35.33179,
    "lng": 139.6201172,
    "transfers": [
      "京急本線"
    ],
    "address": "神奈川県横浜市金沢区瀬戸",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KKZ-02",
    "stationNumber": "KK51",
    "lineId": "keikyu_zushi",
    "number": 2,
    "name": "六浦",
    "nameKana": "むつうら",
    "nameEn": "Mutsuura",
    "lat": 35.3228575,
    "lng": 139.611871,
    "transfers": [],
    "address": "神奈川県横浜市金沢区六浦五丁目",
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
    "id": "KKZ-03",
    "stationNumber": "KK52",
    "lineId": "keikyu_zushi",
    "number": 3,
    "name": "神武寺",
    "nameKana": "じんむじ",
    "nameEn": "Jimmuji",
    "lat": 35.3065105,
    "lng": 139.593234,
    "transfers": [],
    "address": "神奈川県逗子市池子",
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
    "id": "KKZ-04",
    "stationNumber": "KK53",
    "lineId": "keikyu_zushi",
    "number": 4,
    "name": "逗子・葉山",
    "nameKana": "ずしはやま",
    "nameEn": "Zushihayama",
    "lat": 35.2943039,
    "lng": 139.5803593,
    "transfers": [],
    "address": "神奈川県逗子市逗子五丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
