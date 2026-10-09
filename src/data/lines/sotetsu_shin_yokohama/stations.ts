// 相鉄新横浜線 駅メタデータ定義
import type { Station } from '../../../types';

export const SOTETSU_SHIN_YOKOHAMA_STATIONS: Station[] = [
  {
    "id": "SO-52",
    "lineId": "sotetsu_shin_yokohama",
    "number": 1,
    "name": "新横浜",
    "nameKana": "しんよこはま",
    "nameEn": "Shin-yokohama",
    "lat": 35.5088707,
    "lng": 139.6171662,
    "transfers": [
      "JR東海道新幹線",
      "JR横浜線",
      "東急新横浜線",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県横浜市港北区新横浜三丁目",
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
      "commuter_exp",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-51",
    "lineId": "sotetsu_shin_yokohama",
    "number": 2,
    "name": "羽沢横浜国大",
    "nameKana": "はざわよこはまこくだい",
    "nameEn": "Hazawa yokohama-kokudai",
    "lat": 35.4812677,
    "lng": 139.5862425,
    "transfers": [
      "JR埼京線(相鉄・JR直通線)"
    ],
    "address": "神奈川県横浜市神奈川区羽沢南二丁目44",
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
      "commuter_exp",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-08",
    "lineId": "sotetsu_shin_yokohama",
    "number": 3,
    "name": "西谷",
    "nameKana": "にしや",
    "nameEn": "Nishiya",
    "lat": 35.4780622,
    "lng": 139.5654649,
    "transfers": [
      "相鉄本線"
    ],
    "address": "神奈川県横浜市保土ケ谷区西谷町1101",
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
      "commuter_exp",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  }
];
