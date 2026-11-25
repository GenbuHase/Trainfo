import type { Station } from '../../../types';

export const HOKUSO_STATIONS: Station[] = [
  {
    "id": "HOK-01",
    "stationNumber": "KS10",
    "lineId": "hokuso",
    "number": 1,
    "name": "京成高砂",
    "nameKana": "けいせいたかさご",
    "nameEn": "Keiseitakasago",
    "lat": 35.7508287,
    "lng": 139.8657204,
    "transfers": [
      "京成本線",
      "京成金町線",
      "京成成田スカイアクセス線"
    ],
    "address": "東京都葛飾区高砂五丁目",
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
      "access_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-02",
    "stationNumber": "HS01",
    "lineId": "hokuso",
    "number": 2,
    "name": "新柴又",
    "nameKana": "しんしばまた",
    "nameEn": "Shinshibamata",
    "lat": 35.7509611,
    "lng": 139.8791173,
    "transfers": [],
    "address": "東京都葛飾区柴又五丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-03",
    "stationNumber": "HS02",
    "lineId": "hokuso",
    "number": 3,
    "name": "矢切",
    "nameKana": "やぎり",
    "nameEn": "Yagiri",
    "lat": 35.7572736,
    "lng": 139.8997261,
    "transfers": [],
    "address": "千葉県松戸市下矢切",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-04",
    "stationNumber": "HS03",
    "lineId": "hokuso",
    "number": 4,
    "name": "北国分",
    "nameKana": "きたこくぶん",
    "nameEn": "Kitakokubun",
    "lat": 35.7628348,
    "lng": 139.9132665,
    "transfers": [],
    "address": "千葉県市川市堀之内三丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-05",
    "stationNumber": "HS04",
    "lineId": "hokuso",
    "number": 5,
    "name": "秋山",
    "nameKana": "あきやま",
    "nameEn": "Akiyama",
    "lat": 35.7654385,
    "lng": 139.9316462,
    "transfers": [],
    "address": "千葉県松戸市秋山二丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-06",
    "stationNumber": "HS05",
    "lineId": "hokuso",
    "number": 6,
    "name": "東松戸",
    "nameKana": "ひがしまつど",
    "nameEn": "Higashimatsudo",
    "lat": 35.7695398,
    "lng": 139.9423287,
    "transfers": [
      "ＪＲ武蔵野線",
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県松戸市東松戸一丁目",
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
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-07",
    "stationNumber": "HS06",
    "lineId": "hokuso",
    "number": 7,
    "name": "松飛台",
    "nameKana": "まつひだい",
    "nameEn": "Matsuhidai",
    "lat": 35.7753237,
    "lng": 139.9571969,
    "transfers": [],
    "address": "千葉県松戸市紙敷一丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-08",
    "stationNumber": "HS07",
    "lineId": "hokuso",
    "number": 8,
    "name": "大町",
    "nameKana": "おおまち",
    "nameEn": "Oomachi",
    "lat": 35.7751589,
    "lng": 139.9731792,
    "transfers": [],
    "address": "千葉県大町駅",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-09",
    "stationNumber": "HS08",
    "lineId": "hokuso",
    "number": 9,
    "name": "新鎌ケ谷",
    "nameKana": "しんかまがや",
    "nameEn": "Shinkamagaya",
    "lat": 35.7797903,
    "lng": 139.9993664,
    "transfers": [
      "東武アーバンパークライン",
      "京成松戸線",
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県鎌ケ谷市新鎌ケ谷一丁目",
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
      "access_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-10",
    "stationNumber": "HS09",
    "lineId": "hokuso",
    "number": 10,
    "name": "西白井",
    "nameKana": "にししろい",
    "nameEn": "Nishishiroi",
    "lat": 35.7844361,
    "lng": 140.0325903,
    "transfers": [],
    "address": "千葉県白井市根",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-11",
    "stationNumber": "HS10",
    "lineId": "hokuso",
    "number": 11,
    "name": "白井",
    "nameKana": "しろい",
    "nameEn": "Shiroi",
    "lat": 35.7847918,
    "lng": 140.0543489,
    "transfers": [],
    "address": "千葉県白井市復",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-12",
    "stationNumber": "HS11",
    "lineId": "hokuso",
    "number": 12,
    "name": "小室",
    "nameKana": "こむろ",
    "nameEn": "Komuro",
    "lat": 35.7869998,
    "lng": 140.0764343,
    "transfers": [],
    "address": "千葉県船橋市小室町",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-13",
    "stationNumber": "HS12",
    "lineId": "hokuso",
    "number": 13,
    "name": "千葉ニュータウン中央",
    "nameKana": "ちばにゅーたうんちゅうおう",
    "nameEn": "Chibanyutaunchuuou",
    "lat": 35.8003781,
    "lng": 140.1167562,
    "transfers": [
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県印西市中央南一丁目",
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
      "access_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-14",
    "stationNumber": "HS13",
    "lineId": "hokuso",
    "number": 14,
    "name": "印西牧の原",
    "nameKana": "いんざいまきのはら",
    "nameEn": "Inzaimakinohara",
    "lat": 35.8037121,
    "lng": 140.1672118,
    "transfers": [],
    "address": "千葉県印西市原一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "HOK-15",
    "stationNumber": "HS14",
    "lineId": "hokuso",
    "number": 15,
    "name": "印旛日本医大",
    "nameKana": "いんばにほんいだい",
    "nameEn": "Imbanihonidai",
    "lat": 35.78792,
    "lng": 140.2024841,
    "transfers": [
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県印西市若萩一丁目",
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
      "access_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
