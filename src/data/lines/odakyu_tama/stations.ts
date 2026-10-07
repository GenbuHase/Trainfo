// odakyu_tama 駅メタデータ定義
import type { Station } from '../../../types';

export const ODAKYU_TAMA_STATIONS: Station[] = [
  {
    "id": "OH-23",
    "lineId": "odakyu_tama",
    "number": 1,
    "name": "新百合ヶ丘",
    "nameKana": "しんゆりがおか",
    "nameEn": "Shin-Yurigaoka",
    "lat": 35.6039019,
    "lng": 139.5076465,
    "transfers": [
      "小田急小田原線"
    ],
    "address": "神奈川県川崎市麻生区万福寺一丁目18-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4・5・6番線"
    },
    "isMajor": true
  },
  {
    "id": "OT-01",
    "lineId": "odakyu_tama",
    "number": 2,
    "name": "五月台",
    "nameKana": "さつきだい",
    "nameEn": "Satsukidai",
    "lat": 35.600141,
    "lng": 139.4936775,
    "transfers": [],
    "address": "神奈川県川崎市麻生区五力田三丁目22-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OT-02",
    "lineId": "odakyu_tama",
    "number": 3,
    "name": "栗平",
    "nameKana": "くりひら",
    "nameEn": "Kurihira",
    "lat": 35.6059996,
    "lng": 139.4808971,
    "transfers": [],
    "address": "神奈川県川崎市麻生区栗平二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "OT-03",
    "lineId": "odakyu_tama",
    "number": 4,
    "name": "黒川",
    "nameKana": "くろかわ",
    "nameEn": "Kurokawa",
    "lat": 35.6131743,
    "lng": 139.4707869,
    "transfers": [],
    "address": "神奈川県川崎市麻生区南黒川40",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OT-04",
    "lineId": "odakyu_tama",
    "number": 5,
    "name": "はるひ野",
    "nameKana": "はるひの",
    "nameEn": "Haruhino",
    "lat": 35.6187803,
    "lng": 139.4646639,
    "transfers": [],
    "address": "神奈川県川崎市麻生区はるひ野四丁目8-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OT-05",
    "lineId": "odakyu_tama",
    "number": 6,
    "name": "小田急永山",
    "nameKana": "おだきゅうながやま",
    "nameEn": "Odakyu Nagayama",
    "lat": 35.6299131,
    "lng": 139.4482154,
    "transfers": [
      "京王相模原線 (京王永山駅)"
    ],
    "address": "東京都多摩市永山一丁目18-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "OT-06",
    "lineId": "odakyu_tama",
    "number": 7,
    "name": "小田急多摩センター",
    "nameKana": "おだきゅうたませんたー",
    "nameEn": "Odakyu Tama Center",
    "lat": 35.6249666,
    "lng": 139.4244866,
    "transfers": [
      "京王相模原線 (京王多摩センター駅)",
      "多摩都市モノレール"
    ],
    "address": "東京都多摩市落合一丁目11-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "OT-07",
    "lineId": "odakyu_tama",
    "number": 8,
    "name": "唐木田",
    "nameKana": "からきだ",
    "nameEn": "Karakida",
    "lat": 35.6158855,
    "lng": 139.4111871,
    "transfers": [],
    "address": "東京都多摩市唐木田一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "commuter_semi",
      "express",
      "commuter_exp",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1-3番線",
      "outbound": "1-3番線"
    },
    "isMajor": true
  }
];
