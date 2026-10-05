// JR五日市線 駅定義 (拝島 〜 武蔵五日市 全7駅)
import type { Station } from '../../../types';

export const ITSUKAICHI_STATIONS: Station[] = [
  {
    "id": "JC-55",
    "lineId": "itsukaichi",
    "number": 1,
    "name": "拝島",
    "nameKana": "はいじま",
    "nameEn": "Haijima",
    "lat": 35.7211549,
    "lng": 139.3434109,
    "transfers": [
      "JR青梅線",
      "JR八高線",
      "西武拝島線"
    ],
    "address": "東京都昭島市松原町四丁目14-4",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid",
      "limitedExp"
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
    "id": "JC-81",
    "lineId": "itsukaichi",
    "number": 2,
    "name": "熊川",
    "nameKana": "くまがわ",
    "nameEn": "Kumagawa",
    "lat": 35.7284669,
    "lng": 139.3354099,
    "transfers": [],
    "address": "東京都福生市大字熊川1407",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-82",
    "lineId": "itsukaichi",
    "number": 3,
    "name": "東秋留",
    "nameKana": "ひがしあきる",
    "nameEn": "Higashi-Akiru",
    "lat": 35.7258724,
    "lng": 139.3111937,
    "transfers": [],
    "address": "東京都あきる野市二宮1144",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-83",
    "lineId": "itsukaichi",
    "number": 4,
    "name": "秋川",
    "nameKana": "あきがわ",
    "nameEn": "Akigawa",
    "lat": 35.7280568,
    "lng": 139.2866849,
    "transfers": [],
    "address": "東京都あきる野市油平130",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-84",
    "lineId": "itsukaichi",
    "number": 5,
    "name": "武蔵引田",
    "nameKana": "むさしひきた",
    "nameEn": "Musashi-Hikida",
    "lat": 35.7297171,
    "lng": 139.2700981,
    "transfers": [],
    "address": "東京都あきる野市引田505",
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-85",
    "lineId": "itsukaichi",
    "number": 6,
    "name": "武蔵増戸",
    "nameKana": "むさしますど",
    "nameEn": "Musashi-Masuko",
    "lat": 35.7309564,
    "lng": 139.2562005,
    "transfers": [],
    "address": "東京都あきる野市伊奈436",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    }
  },
  {
    "id": "JC-86",
    "lineId": "itsukaichi",
    "number": 7,
    "name": "武蔵五日市",
    "nameKana": "むさしいつかいち",
    "nameEn": "Musashi-Itsukaichi",
    "lat": 35.7322027,
    "lng": 139.2279385,
    "transfers": [],
    "address": "東京都あきる野市舘谷223",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "rapid",
      "special_rapid",
      "commuter_special_rapid",
      "limitedExp"
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
