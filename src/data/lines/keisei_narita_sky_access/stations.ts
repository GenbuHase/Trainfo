import type { Station } from '../../../types';

export const KEISEI_NARITA_SKY_ACCESS_STATIONS: Station[] = [
  {
    "id": "KSSA-01",
    "stationNumber": "KS10",
    "lineId": "keisei_narita_sky_access",
    "number": 1,
    "name": "京成高砂",
    "nameKana": "けいせいたかさご",
    "nameEn": "Keiseitakasago",
    "lat": 35.7508287,
    "lng": 139.8657204,
    "transfers": [
      "京成本線",
      "京成金町線",
      "北総鉄道北総線"
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
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSSA-02",
    "stationNumber": "HS05",
    "lineId": "keisei_narita_sky_access",
    "number": 2,
    "name": "東松戸",
    "nameKana": "ひがしまつど",
    "nameEn": "Higashimatsudo",
    "lat": 35.7695398,
    "lng": 139.9423287,
    "transfers": [
      "ＪＲ武蔵野線",
      "北総鉄道北総線"
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
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSSA-03",
    "stationNumber": "HS08",
    "lineId": "keisei_narita_sky_access",
    "number": 3,
    "name": "新鎌ケ谷",
    "nameKana": "しんかまがや",
    "nameEn": "Shinkamagaya",
    "lat": 35.7797903,
    "lng": 139.9993664,
    "transfers": [
      "東武アーバンパークライン",
      "京成松戸線",
      "北総鉄道北総線"
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
      "rapid_exp",
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
    "id": "KSSA-04",
    "stationNumber": "HS12",
    "lineId": "keisei_narita_sky_access",
    "number": 4,
    "name": "千葉ニュータウン中央",
    "nameKana": "ちばにゅーたうんちゅうおう",
    "nameEn": "Chibanyutaunchuuou",
    "lat": 35.8003781,
    "lng": 140.1167562,
    "transfers": [
      "北総鉄道北総線"
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
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSSA-05",
    "stationNumber": "HS14",
    "lineId": "keisei_narita_sky_access",
    "number": 5,
    "name": "印旛日本医大",
    "nameKana": "いんばにほんいだい",
    "nameEn": "Imbanihonidai",
    "lat": 35.78792,
    "lng": 140.2024841,
    "transfers": [
      "北総鉄道北総線"
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
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSSA-06",
    "stationNumber": "KS43",
    "lineId": "keisei_narita_sky_access",
    "number": 6,
    "name": "成田湯川",
    "nameKana": "なりたゆかわ",
    "nameEn": "Naritayukawa",
    "lat": 35.7995626,
    "lng": 140.2906585,
    "transfers": [],
    "address": "千葉県成田市松崎",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSSA-07",
    "stationNumber": "KS41",
    "lineId": "keisei_narita_sky_access",
    "number": 7,
    "name": "空港第２ビル",
    "nameKana": "くうこうだいにびる",
    "nameEn": "Kuukoudainibiru",
    "lat": 35.7741127,
    "lng": 140.386701,
    "transfers": [
      "ＪＲ成田線",
      "京成本線"
    ],
    "address": "千葉県成田市古込",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid_exp",
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
    "id": "KSSA-08",
    "stationNumber": "KS42",
    "lineId": "keisei_narita_sky_access",
    "number": 8,
    "name": "成田空港",
    "nameKana": "なりたくうこう",
    "nameEn": "Naritakuukou",
    "lat": 35.7669541,
    "lng": 140.3870463,
    "transfers": [
      "ＪＲ成田線",
      "京成本線"
    ],
    "address": "千葉県成田市天浪",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid_exp",
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
