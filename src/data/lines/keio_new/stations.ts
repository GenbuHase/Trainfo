import type { Station } from '../../../types';

export const KEIO_NEW_STATIONS: Station[] = [
  {
    "id": "KON-01",
    "stationNumber": "KO01",
    "lineId": "keio_new",
    "number": 1,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.6895077,
    "lng": 139.6993171,
    "transfers": [
      "ＪＲ湘南新宿ライン",
      "ＪＲ埼京線",
      "ＪＲ中央線快速",
      "ＪＲ中央・総武線各駅停車",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "京王線",
      "小田急小田原線",
      "都営地下鉄新宿線",
      "都営地下鉄大江戸線"
    ],
    "address": "東京都新宿駅",
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
    "id": "KON-02",
    "stationNumber": "KO02",
    "lineId": "keio_new",
    "number": 2,
    "name": "初台",
    "nameKana": "はつだい",
    "nameEn": "Hatsudai",
    "lat": 35.6812907,
    "lng": 139.6877348,
    "transfers": [],
    "address": "東京都初台駅",
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
    "id": "KON-03",
    "stationNumber": "KO03",
    "lineId": "keio_new",
    "number": 3,
    "name": "幡ケ谷",
    "nameKana": "はたがや",
    "nameEn": "Hatagaya",
    "lat": 35.6768566,
    "lng": 139.6771453,
    "transfers": [],
    "address": "東京都幡ケ谷駅",
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
    "id": "KON-04",
    "stationNumber": "KO04",
    "lineId": "keio_new",
    "number": 4,
    "name": "笹塚",
    "nameKana": "ささづか",
    "nameEn": "Sasazuka",
    "lat": 35.6733099,
    "lng": 139.6665249,
    "transfers": [
      "京王線"
    ],
    "address": "東京都笹塚駅",
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
