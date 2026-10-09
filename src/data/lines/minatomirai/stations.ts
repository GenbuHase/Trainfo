// 横浜高速鉄道みなとみらい線 駅メタデータ定義 (横浜 〜 元町・中華街 全6駅)
import type { Station } from '../../../types';

export const MINATOMIRAI_STATIONS: Station[] = [
  {
    "id": "MM-01",
    "lineId": "minatomirai",
    "number": 1,
    "name": "横浜",
    "nameKana": "よこはま",
    "nameEn": "Yokohama",
    "lat": 35.466292,
    "lng": 139.6220811,
    "transfers": [
      "JR東海道線",
      "JR京浜東北線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "JR横浜線",
      "JR根岸線",
      "京急本線",
      "相鉄本線",
      "横浜市営地下鉄ブルーライン",
      "東急東横線"
    ],
    "address": "神奈川県横浜市西区南幸一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "MM-02",
    "lineId": "minatomirai",
    "number": 2,
    "name": "新高島",
    "nameKana": "しんたかしま",
    "nameEn": "Shin-takashima",
    "lat": 35.4619389,
    "lng": 139.6266407,
    "transfers": [],
    "address": "神奈川県横浜市西区みなとみらい五丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "MM-03",
    "lineId": "minatomirai",
    "number": 3,
    "name": "みなとみらい",
    "nameKana": "みなとみらい",
    "nameEn": "Minatomirai",
    "lat": 35.4572327,
    "lng": 139.6328453,
    "transfers": [],
    "address": "神奈川県横浜市西区みなとみらい三丁目5-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "isMajor": true
  },
  {
    "id": "MM-04",
    "lineId": "minatomirai",
    "number": 4,
    "name": "馬車道",
    "nameKana": "ばしゃみち",
    "nameEn": "Bashamichi",
    "lat": 35.4501475,
    "lng": 139.6362973,
    "transfers": [],
    "address": "神奈川県横浜市中区本町五丁目49",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "isMajor": true
  },
  {
    "id": "MM-05",
    "lineId": "minatomirai",
    "number": 5,
    "name": "日本大通り",
    "nameKana": "にほんおおどおり",
    "nameEn": "Nihon-odori",
    "lat": 35.4467354,
    "lng": 139.6426718,
    "transfers": [],
    "address": "神奈川県横浜市中区日本大通9",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "isMajor": true
  },
  {
    "id": "MM-06",
    "lineId": "minatomirai",
    "number": 6,
    "name": "元町・中華街",
    "nameKana": "もとまち・ちゅうかがい",
    "nameEn": "Motomachi-Chukagai",
    "lat": 35.4421165,
    "lng": 139.6509129,
    "transfers": [],
    "address": "神奈川県横浜市中区山下町65",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  }
];
