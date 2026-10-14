// JR常磐線 駅メタデータ定義
import type { Station } from '../../../types';

export const JOBAN_LOCAL_STATIONS: Station[] = [
  {
    "id": "JL-19",
    "lineId": "joban_local",
    "number": 19,
    "name": "綾瀬",
    "nameKana": "あやせ",
    "nameEn": "Ayase",
    "lat": 35.7621739,
    "lng": 139.8248629,
    "transfers": [
      "東京メトロ千代田線"
    ],
    "address": "東京都足立区綾瀬三丁目1-1",
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
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "JL-20",
    "lineId": "joban_local",
    "number": 20,
    "name": "亀有",
    "nameKana": "かめあり",
    "nameEn": "Kameari",
    "lat": 35.7668193,
    "lng": 139.847992,
    "transfers": [],
    "address": "東京都葛飾区亀有三丁目25-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-21",
    "lineId": "joban_local",
    "number": 21,
    "name": "金町",
    "nameKana": "かなまち",
    "nameEn": "Kanamachi",
    "lat": 35.7696451,
    "lng": 139.8706816,
    "transfers": [
      "京成金町線（京成金町駅）"
    ],
    "address": "東京都葛飾区金町六丁目4-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-22",
    "lineId": "joban_local",
    "number": 22,
    "name": "松戸",
    "nameKana": "まつど",
    "nameEn": "Matsudo",
    "lat": 35.7844587,
    "lng": 139.9006882,
    "transfers": [
      "JR常磐線快速",
      "新京成線"
    ],
    "address": "千葉県松戸市松戸1181",
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
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "JL-23",
    "lineId": "joban_local",
    "number": 23,
    "name": "北松戸",
    "nameKana": "きたまつど",
    "nameEn": "Kita-Matsudo",
    "lat": 35.8006521,
    "lng": 139.9116797,
    "transfers": [],
    "address": "千葉県松戸市北松戸二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-24",
    "lineId": "joban_local",
    "number": 24,
    "name": "馬橋",
    "nameKana": "まばし",
    "nameEn": "Mabashi",
    "lat": 35.8116098,
    "lng": 139.9172261,
    "transfers": [
      "流鉄流山線"
    ],
    "address": "千葉県松戸市馬橋119",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-25",
    "lineId": "joban_local",
    "number": 25,
    "name": "新松戸",
    "nameKana": "しんまつど",
    "nameEn": "Shin-Matsudo",
    "lat": 35.8255204,
    "lng": 139.9211231,
    "transfers": [
      "JR武蔵野線",
      "流鉄流山線（幸谷駅）"
    ],
    "address": "千葉県松戸市幸谷572-8",
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
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "JL-26",
    "lineId": "joban_local",
    "number": 26,
    "name": "北小金",
    "nameKana": "きたこがね",
    "nameEn": "Kita-Kogane",
    "lat": 35.8334733,
    "lng": 139.9311657,
    "transfers": [],
    "address": "千葉県松戸市小金きよしケ丘一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-27",
    "lineId": "joban_local",
    "number": 27,
    "name": "南柏",
    "nameKana": "みなみかしわ",
    "nameEn": "Minami-Kashiwa",
    "lat": 35.8446496,
    "lng": 139.9541315,
    "transfers": [],
    "address": "千葉県柏市南柏一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-28",
    "lineId": "joban_local",
    "number": 28,
    "name": "柏",
    "nameKana": "かしわ",
    "nameEn": "Kashiwa",
    "lat": 35.8623047,
    "lng": 139.9710976,
    "transfers": [
      "JR常磐線快速",
      "東武アーバンパークライン"
    ],
    "address": "千葉県柏市柏一丁目1-1",
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
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "JL-29",
    "lineId": "joban_local",
    "number": 29,
    "name": "北柏",
    "nameKana": "きたかしわ",
    "nameEn": "Kita-Kashiwa",
    "lat": 35.8757216,
    "lng": 139.9880832,
    "transfers": [],
    "address": "千葉県柏市根戸字松葉町1906",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-30",
    "lineId": "joban_local",
    "number": 30,
    "name": "我孫子",
    "nameKana": "あびこ",
    "nameEn": "Abiko",
    "lat": 35.8726835,
    "lng": 140.0107674,
    "transfers": [
      "JR常磐線快速",
      "JR成田線（我孫子支線）"
    ],
    "address": "千葉県我孫子市本町二丁目1-1",
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
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "6・7番線"
    },
    "isMajor": true
  },
  {
    "id": "JL-31",
    "lineId": "joban_local",
    "number": 31,
    "name": "天王台",
    "nameKana": "てんのうだい",
    "nameEn": "Tenno-dai",
    "lat": 35.8725814,
    "lng": 140.0406674,
    "transfers": [
      "JR常磐線快速"
    ],
    "address": "千葉県我孫子市柴崎台一丁目19-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "JL-32",
    "lineId": "joban_local",
    "number": 32,
    "name": "取手",
    "nameKana": "とりで",
    "nameEn": "Toride",
    "lat": 35.8953081,
    "lng": 140.062923,
    "transfers": [
      "JR常磐線快速",
      "関東鉄道常総線"
    ],
    "address": "茨城県取手市中央町1-1",
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
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  }
];
