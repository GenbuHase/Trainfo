// 東急新横浜線 駅メタデータ定義
import type { Station } from '../../../types';

export const TOKYU_SHIN_YOKOHAMA_STATIONS: Station[] = [
  {
    "id": "SH-03",
    "lineId": "tokyu_shin_yokohama",
    "number": 1,
    "name": "日吉",
    "nameKana": "ひよし",
    "nameEn": "Hiyoshi",
    "lat": 35.5534595,
    "lng": 139.646943,
    "transfers": [
      "東急東横線",
      "東急目黒線",
      "横浜市営地下鉄グリーンライン"
    ],
    "address": "神奈川県横浜市港北区日吉二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "SH-02",
    "lineId": "tokyu_shin_yokohama",
    "number": 2,
    "name": "新綱島",
    "nameKana": "しんつなしま",
    "nameEn": "Shin-tsunashima",
    "lat": 35.535865,
    "lng": 139.6361262,
    "transfers": [
      "東急東横線(綱島駅)"
    ],
    "address": "神奈川県横浜市港北区綱島東一丁目9-10",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SH-01",
    "lineId": "tokyu_shin_yokohama",
    "number": 3,
    "name": "新横浜",
    "nameKana": "しんよこはま",
    "nameEn": "Shin-yokohama",
    "lat": 35.5088707,
    "lng": 139.6171662,
    "transfers": [
      "JR東海道新幹線",
      "JR横浜線",
      "相鉄新横浜線",
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
      "express"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  }
];
