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
    "lat": 35.75083,
    "lng": 139.86572,
    "transfers": [
      "京成本線",
      "京成金町線",
      "京成成田スカイアクセス線"
    ],
    "address": "東京都京成高砂駅",
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
    "lat": 35.75097,
    "lng": 139.87911,
    "transfers": [],
    "address": "東京都新柴又駅",
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
    "lat": 35.75726,
    "lng": 139.89973,
    "transfers": [],
    "address": "千葉県矢切駅",
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
    "lat": 35.7627,
    "lng": 139.91331,
    "transfers": [],
    "address": "千葉県北国分駅",
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
    "lat": 35.76547,
    "lng": 139.93164,
    "transfers": [],
    "address": "千葉県秋山駅",
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
    "lat": 35.76955,
    "lng": 139.94232,
    "transfers": [
      "ＪＲ武蔵野線",
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県東松戸駅",
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
    "lat": 35.77531,
    "lng": 139.9572,
    "transfers": [],
    "address": "千葉県松飛台駅",
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
    "lat": 35.77514,
    "lng": 139.97318,
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
    "lat": 35.77989,
    "lng": 139.99932,
    "transfers": [
      "東武アーバンパークライン",
      "京成松戸線",
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県新鎌ケ谷駅",
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
    "lat": 35.78446,
    "lng": 140.03259,
    "transfers": [],
    "address": "千葉県西白井駅",
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
    "lat": 35.78476,
    "lng": 140.05435,
    "transfers": [],
    "address": "千葉県白井駅",
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
    "lat": 35.78707,
    "lng": 140.07642,
    "transfers": [],
    "address": "千葉県小室駅",
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
    "lat": 35.80037,
    "lng": 140.11676,
    "transfers": [
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県千葉ニュータウン中央駅",
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
    "lat": 35.80362,
    "lng": 140.16718,
    "transfers": [],
    "address": "千葉県印西牧の原駅",
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
    "lat": 35.78791,
    "lng": 140.20248,
    "transfers": [
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県印旛日本医大駅",
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