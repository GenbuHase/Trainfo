import type { Station } from '../../../types';

export const UENO_TOKYO_STATIONS: Station[] = [
  {
    "id": "UT-01",
    "stationNumber": "JU-01",
    "lineId": "jr_ueno_tokyo",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6811274,
    "lng": 139.7671827,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR中央線",
      "JR東海道線",
      "JR横須賀線",
      "JR総武快速線",
      "JR京葉線",
      "JR東北新幹線",
      "JR上越新幹線",
      "JR北陸新幹線",
      "JR東海道新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
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
    "id": "UT-02",
    "stationNumber": "JU-02",
    "lineId": "jr_ueno_tokyo",
    "number": 2,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7134394,
    "lng": 139.7764768,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
      "JR高崎線",
      "JR常磐線快速",
      "JR東北新幹線",
      "JR上越新幹線",
      "JR北陸新幹線",
      "東京メトロ銀座線",
      "東京メトロ日比谷線",
      "京成本線"
    ],
    "address": "東京都台東区上野七丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
