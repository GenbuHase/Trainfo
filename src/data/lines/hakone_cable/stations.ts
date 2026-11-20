import type { Station } from '../../../types';

export const HAKONE_CABLE_STATIONS: Station[] = [
  {
    "id": "OHC-01",
    "stationNumber": "OH57",
    "lineId": "hakone_cable",
    "number": 1,
    "name": "強羅",
    "nameKana": "ごうら",
    "nameEn": "Goura",
    "lat": 35.2506,
    "lng": 139.04762,
    "transfers": [
      "箱根登山線"
    ],
    "address": "神奈川県強羅駅",
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
    "id": "OHC-02",
    "stationNumber": "OH58",
    "lineId": "hakone_cable",
    "number": 2,
    "name": "公園下",
    "nameKana": "こうえんしも",
    "nameEn": "Kouenshimo",
    "lat": 35.24996,
    "lng": 139.04568,
    "transfers": [],
    "address": "神奈川県公園下駅",
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
    "id": "OHC-03",
    "stationNumber": "OH59",
    "lineId": "hakone_cable",
    "number": 3,
    "name": "公園上",
    "nameKana": "こうえんかみ",
    "nameEn": "Kouenkami",
    "lat": 35.2491,
    "lng": 139.04323,
    "transfers": [],
    "address": "神奈川県公園上駅",
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
    "id": "OHC-04",
    "stationNumber": "OH60",
    "lineId": "hakone_cable",
    "number": 4,
    "name": "中強羅",
    "nameKana": "なかごうら",
    "nameEn": "Nakagoura",
    "lat": 35.24795,
    "lng": 139.03997,
    "transfers": [],
    "address": "神奈川県中強羅駅",
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
    "id": "OHC-05",
    "stationNumber": "OH61",
    "lineId": "hakone_cable",
    "number": 5,
    "name": "上強羅",
    "nameKana": "かみごうら",
    "nameEn": "Kamigoura",
    "lat": 35.24701,
    "lng": 139.03735,
    "transfers": [],
    "address": "神奈川県上強羅駅",
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
    "id": "OHC-06",
    "stationNumber": "OH62",
    "lineId": "hakone_cable",
    "number": 6,
    "name": "早雲山",
    "nameKana": "そううんざん",
    "nameEn": "Souunzan",
    "lat": 35.24631,
    "lng": 139.03543,
    "transfers": [
      "箱根ロープウェイ"
    ],
    "address": "神奈川県早雲山駅",
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
