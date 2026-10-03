// 東京臨海高速鉄道りんかい線 駅メタデータ定義 (新木場 〜 大崎 全8駅)
import type { Station } from '../../../types';

export const RINKAI_STATIONS: Station[] = [
  {
    "id": "R-01",
    "lineId": "rinkai",
    "number": 1,
    "name": "新木場",
    "nameKana": "しんきば",
    "nameEn": "Shin-kiba",
    "lat": 35.646087,
    "lng": 139.8273163,
    "transfers": [
      "JR京葉線",
      "東京メトロ有楽町線"
    ],
    "address": "東京都江東区新木場一丁目5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "R-02",
    "lineId": "rinkai",
    "number": 2,
    "name": "東雲",
    "nameKana": "しののめ",
    "nameEn": "Shinonome",
    "lat": 35.6407228,
    "lng": 139.8036277,
    "transfers": [],
    "address": "東京都江東区東雲二丁目11",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "R-03",
    "lineId": "rinkai",
    "number": 3,
    "name": "国際展示場",
    "nameKana": "こくさいてんじじょう",
    "nameEn": "Kokusai-tenjijo",
    "lat": 35.6344122,
    "lng": 139.7917771,
    "transfers": [
      "ゆりかもめ(有明駅)"
    ],
    "address": "東京都江東区有明三丁目7-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "R-04",
    "lineId": "rinkai",
    "number": 4,
    "name": "東京テレポート",
    "nameKana": "とうきょうてれぽーと",
    "nameEn": "Tokyo Teleport",
    "lat": 35.6270752,
    "lng": 139.7780966,
    "transfers": [
      "ゆりかもめ(お台場海浜公園駅・青海駅)"
    ],
    "address": "東京都江東区青海一丁目1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "R-05",
    "lineId": "rinkai",
    "number": 5,
    "name": "天王洲アイル",
    "nameKana": "てんのうずあいる",
    "nameEn": "Tennozu Isle",
    "lat": 35.6205792,
    "lng": 139.750912,
    "transfers": [
      "東京モノレール"
    ],
    "address": "東京都品川区東品川二丁目2-22",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "R-06",
    "lineId": "rinkai",
    "number": 6,
    "name": "品川シーサイド",
    "nameKana": "しながわしーさいど",
    "nameEn": "Shinagawa Seaside",
    "lat": 35.6097205,
    "lng": 139.7499312,
    "transfers": [],
    "address": "東京都品川区東品川四丁目12-22",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "R-07",
    "lineId": "rinkai",
    "number": 7,
    "name": "大井町",
    "nameKana": "おおいまち",
    "nameEn": "Oimachi",
    "lat": 35.6074205,
    "lng": 139.7344023,
    "transfers": [
      "JR京浜東北線",
      "東急大井町線"
    ],
    "address": "東京都品川区大井一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "R-08",
    "lineId": "rinkai",
    "number": 8,
    "name": "大崎",
    "nameKana": "おおさき",
    "nameEn": "Osaki",
    "lat": 35.6192833,
    "lng": 139.7282629,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄線直通列車"
    ],
    "address": "東京都品川区大崎一丁目21-4",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "5〜8番線",
      "outbound": "5〜8番線"
    }
  }
];
