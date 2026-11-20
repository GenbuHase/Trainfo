import type { Station } from '../../../types';

export const TOKYU_MEGURO_STATIONS: Station[] = [
  {
    "id": "MG-01",
    "stationNumber": "MG01",
    "lineId": "tokyu_meguro",
    "number": 1,
    "name": "目黒",
    "nameKana": "めぐろ",
    "nameEn": "Meguro",
    "lat": 35.6324892,
    "lng": 139.7156838,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "東京メトロ南北線",
      "都営地下鉄三田線"
    ],
    "address": "東京都目黒駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-02",
    "stationNumber": "MG02",
    "lineId": "tokyu_meguro",
    "number": 2,
    "name": "不動前",
    "nameKana": "ふどうまえ",
    "nameEn": "Fudoumae",
    "lat": 35.62536,
    "lng": 139.71304,
    "transfers": [],
    "address": "東京都不動前駅",
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
    "id": "MG-03",
    "stationNumber": "MG03",
    "lineId": "tokyu_meguro",
    "number": 3,
    "name": "武蔵小山",
    "nameKana": "むさしこやま",
    "nameEn": "Musashikoyama",
    "lat": 35.62082,
    "lng": 139.70502,
    "transfers": [],
    "address": "東京都武蔵小山駅",
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
    "id": "MG-04",
    "stationNumber": "MG04",
    "lineId": "tokyu_meguro",
    "number": 4,
    "name": "西小山",
    "nameKana": "にしこやま",
    "nameEn": "Nishikoyama",
    "lat": 35.61574,
    "lng": 139.69897,
    "transfers": [],
    "address": "東京都西小山駅",
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
    "id": "MG-05",
    "stationNumber": "MG05",
    "lineId": "tokyu_meguro",
    "number": 5,
    "name": "洗足",
    "nameKana": "せんぞく",
    "nameEn": "Senzoku",
    "lat": 35.61043,
    "lng": 139.69444,
    "transfers": [],
    "address": "東京都洗足駅",
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
    "id": "MG-06",
    "stationNumber": "MG06",
    "lineId": "tokyu_meguro",
    "number": 6,
    "name": "大岡山",
    "nameKana": "おおおかやま",
    "nameEn": "Oookayama",
    "lat": 35.60725,
    "lng": 139.68501,
    "transfers": [
      "東急大井町線"
    ],
    "address": "東京都大岡山駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-07",
    "stationNumber": "MG07",
    "lineId": "tokyu_meguro",
    "number": 7,
    "name": "奥沢",
    "nameKana": "おくさわ",
    "nameEn": "Okusawa",
    "lat": 35.60406,
    "lng": 139.67285,
    "transfers": [],
    "address": "東京都奥沢駅",
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
    "id": "MG-08",
    "stationNumber": "MG08",
    "lineId": "tokyu_meguro",
    "number": 8,
    "name": "田園調布",
    "nameKana": "でんえんちょうふ",
    "nameEn": "Denenchoufu",
    "lat": 35.59663,
    "lng": 139.66731,
    "transfers": [
      "東急東横線"
    ],
    "address": "東京都田園調布駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-09",
    "stationNumber": "MG09",
    "lineId": "tokyu_meguro",
    "number": 9,
    "name": "多摩川",
    "nameKana": "たまがわ",
    "nameEn": "Tamagawa",
    "lat": 35.58894,
    "lng": 139.66889,
    "transfers": [
      "東急東横線",
      "東急多摩川線"
    ],
    "address": "東京都多摩川駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-10",
    "stationNumber": "MG10",
    "lineId": "tokyu_meguro",
    "number": 10,
    "name": "新丸子",
    "nameKana": "しんまるこ",
    "nameEn": "Shimmaruko",
    "lat": 35.57992,
    "lng": 139.66168,
    "transfers": [
      "東急東横線"
    ],
    "address": "神奈川県新丸子駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-11",
    "stationNumber": "MG11",
    "lineId": "tokyu_meguro",
    "number": 11,
    "name": "武蔵小杉",
    "nameKana": "むさしこすぎ",
    "nameEn": "Musashikosugi",
    "lat": 35.57656,
    "lng": 139.66003,
    "transfers": [
      "ＪＲ湘南新宿ライン・埼京・相鉄直通線",
      "ＪＲ湘南新宿ライン",
      "ＪＲ埼京・相鉄直通線",
      "ＪＲ横須賀線",
      "ＪＲ南武線",
      "東急東横線"
    ],
    "address": "神奈川県武蔵小杉駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-12",
    "stationNumber": "MG12",
    "lineId": "tokyu_meguro",
    "number": 12,
    "name": "元住吉",
    "nameKana": "もとすみよし",
    "nameEn": "Motosumiyoshi",
    "lat": 35.56511,
    "lng": 139.65443,
    "transfers": [
      "東急東横線"
    ],
    "address": "神奈川県元住吉駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MG-13",
    "stationNumber": "MG13",
    "lineId": "tokyu_meguro",
    "number": 13,
    "name": "日吉",
    "nameKana": "ひよし",
    "nameEn": "Hiyoshi",
    "lat": 35.5534595,
    "lng": 139.646943,
    "transfers": [
      "東急東横線",
      "東急新横浜線",
      "横浜市営地下鉄グリーンライン"
    ],
    "address": "神奈川県日吉駅",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];