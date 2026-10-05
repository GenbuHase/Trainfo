import type { Station } from '../../../types';

export const STATIONS: Station[] = [
  {
    "id": "TJ-26",
    "lineId": "ogose",
    "number": 26,
    "name": "坂戸",
    "nameKana": "さかど",
    "nameEn": "Sakado",
    "transfers": [
      "東武東上線"
    ],
    "address": "埼玉県坂戸市日の出町1-1",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "isMajor": true,
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
    "lat": 35.9570389,
    "lng": 139.3938992
  },
  {
    "id": "TJ-41",
    "lineId": "ogose",
    "number": 41,
    "name": "一本松",
    "nameKana": "いっぽんまつ",
    "nameEn": "Ippommatsu",
    "transfers": [],
    "address": "埼玉県鶴ヶ島市大字中新田80-3",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "lat": 35.9402905,
    "lng": 139.370354
  },
  {
    "id": "TJ-42",
    "lineId": "ogose",
    "number": 42,
    "name": "西大家",
    "nameKana": "にしおおや",
    "nameEn": "Nishi-Oya",
    "transfers": [],
    "address": "埼玉県坂戸市大字森戸623-6",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "lat": 35.9316003,
    "lng": 139.3562988
  },
  {
    "id": "TJ-43",
    "lineId": "ogose",
    "number": 43,
    "name": "川角",
    "nameKana": "かわかど",
    "nameEn": "Kawakado",
    "transfers": [],
    "address": "埼玉県入間郡毛呂山町大字川角436",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "lat": 35.9374227,
    "lng": 139.3468226
  },
  {
    "id": "TJ-44",
    "lineId": "ogose",
    "number": 44,
    "name": "武州長瀬",
    "nameKana": "ぶしゅうながせ",
    "nameEn": "Bushu-Nagase",
    "transfers": [],
    "address": "埼玉県入間郡毛呂山町南台一丁目1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "lat": 35.9419174,
    "lng": 139.3259773
  },
  {
    "id": "TJ-45",
    "lineId": "ogose",
    "number": 45,
    "name": "東毛呂",
    "nameKana": "ひがしもろ",
    "nameEn": "Higashi-Moro",
    "transfers": [
      "JR八高線（毛呂駅 徒歩約10分）"
    ],
    "address": "埼玉県入間郡毛呂山町岩井東二丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "lat": 35.9468798,
    "lng": 139.3154804
  },
  {
    "id": "TJ-46",
    "lineId": "ogose",
    "number": 46,
    "name": "武州唐沢",
    "nameKana": "ぶしゅうからさわ",
    "nameEn": "Bushu-Karasawa",
    "transfers": [],
    "address": "埼玉県入間郡越生町大字上野東二丁目1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "lat": 35.952047,
    "lng": 139.3093861
  },
  {
    "id": "TJ-47",
    "lineId": "ogose",
    "number": 47,
    "name": "越生",
    "nameKana": "おごせ",
    "nameEn": "Ogose",
    "transfers": [
      "JR八高線"
    ],
    "address": "埼玉県入間郡越生町大字越生841-2",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "isMajor": true,
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
    "lat": 35.9626661,
    "lng": 139.2995389
  }
];
