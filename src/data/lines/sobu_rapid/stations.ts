import type { Station } from '../../../types';

export const SOBU_RAPID_STATIONS: Station[] = [
  {
    "id": "JO-19",
    "stationNumber": "JO-19",
    "lineId": "sobu_rapid",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6818223,
    "lng": 139.7655658,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR中央線",
      "JR東海道線",
      "JR横須賀線",
      "JR総武快速線",
      "JR京葉線",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東海道新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "commuter_rapid",
      "limitedExp",
      "local"
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
    "id": "JO-20",
    "stationNumber": "JO-20",
    "lineId": "sobu_rapid",
    "number": 2,
    "name": "新日本橋",
    "nameKana": "しんにほんばし",
    "nameEn": "Shin-Nihombashi",
    "lat": 35.6890433,
    "lng": 139.7741801,
    "transfers": [
      "JR総武快速線",
      "東京メトロ銀座線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都中央区日本橋室町四丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "commuter_rapid",
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-21",
    "stationNumber": "JO-21",
    "lineId": "sobu_rapid",
    "number": 3,
    "name": "馬喰町",
    "nameKana": "ばくろちょう",
    "nameEn": "Bakurocho",
    "lat": 35.6933851,
    "lng": 139.7824152,
    "transfers": [
      "JR総武快速線",
      "都営浅草線",
      "都営新宿線"
    ],
    "address": "東京都中央区日本橋馬喰町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "commuter_rapid",
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-22",
    "stationNumber": "JO-22",
    "lineId": "sobu_rapid",
    "number": 4,
    "name": "錦糸町",
    "nameKana": "きんしちょう",
    "nameEn": "Kinshicho",
    "lat": 35.6969287,
    "lng": 139.8139442,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都墨田区江東橋三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "commuter_rapid",
      "limitedExp",
      "local"
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
    "id": "JO-23",
    "stationNumber": "JO-23",
    "lineId": "sobu_rapid",
    "number": 5,
    "name": "新小岩",
    "nameKana": "しんこいわ",
    "nameEn": "Shin-Koiwa",
    "lat": 35.7170544,
    "lng": 139.8578694,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車"
    ],
    "address": "東京都葛飾区新小岩一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-24",
    "stationNumber": "JO-24",
    "lineId": "sobu_rapid",
    "number": 6,
    "name": "市川",
    "nameKana": "いちかわ",
    "nameEn": "Ichikawa",
    "lat": 35.7289842,
    "lng": 139.9082651,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車"
    ],
    "address": "千葉県市川市市川一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "local"
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
    "id": "JO-25",
    "stationNumber": "JO-25",
    "lineId": "sobu_rapid",
    "number": 7,
    "name": "船橋",
    "nameKana": "ふなばし",
    "nameEn": "Funabashi",
    "lat": 35.7018128,
    "lng": 139.9852737,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車",
      "東武アーバンパークライン",
      "京成本線"
    ],
    "address": "千葉県船橋市本町七丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "commuter_rapid",
      "limitedExp",
      "local"
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
    "id": "JO-26",
    "stationNumber": "JO-26",
    "lineId": "sobu_rapid",
    "number": 8,
    "name": "津田沼",
    "nameKana": "つだぬま",
    "nameEn": "Tsudanuma",
    "lat": 35.691534,
    "lng": 140.0203671,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車",
      "新京成線"
    ],
    "address": "千葉県習志野市津田沼一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "local"
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
    "id": "JO-27",
    "stationNumber": "JO-27",
    "lineId": "sobu_rapid",
    "number": 9,
    "name": "稲毛",
    "nameKana": "いなげ",
    "nameEn": "Inage",
    "lat": 35.6371305,
    "lng": 140.0927036,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車",
      "京成千葉線"
    ],
    "address": "千葉県千葉市稲毛区稲毛東三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-28",
    "stationNumber": "JO-28",
    "lineId": "sobu_rapid",
    "number": 10,
    "name": "千葉",
    "nameKana": "ちば",
    "nameEn": "Chiba",
    "lat": 35.6138757,
    "lng": 140.1128979,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車",
      "JR総武本線",
      "JR成田線",
      "JR内房線",
      "JR外房線",
      "千葉都市モノレール"
    ],
    "address": "千葉県千葉市中央区新千葉一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "rapid",
      "commuter_rapid",
      "limitedExp",
      "local"
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
