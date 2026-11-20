import type { Station } from '../../../types';

export const TOKYO_MONORAIL_STATIONS: Station[] = [
  {
    "id": "MO-01",
    "stationNumber": "MO01",
    "lineId": "tokyo_monorail",
    "number": 1,
    "name": "浜松町",
    "nameKana": "はままつちょう",
    "nameEn": "Hamamatsuchou",
    "lat": 35.65635,
    "lng": 139.75673,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "ＪＲ京浜東北線"
    ],
    "address": "東京都浜松町駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MO-02",
    "stationNumber": "MO02",
    "lineId": "tokyo_monorail",
    "number": 2,
    "name": "天王洲アイル",
    "nameKana": "てんのうずあいる",
    "nameEn": "Tennouzuairu",
    "lat": 35.62246,
    "lng": 139.75116,
    "transfers": [
      "東京臨海高速鉄道りんかい線"
    ],
    "address": "東京都天王洲アイル駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MO-03",
    "stationNumber": "MO03",
    "lineId": "tokyo_monorail",
    "number": 3,
    "name": "大井競馬場前",
    "nameKana": "おおいけいばじょうまえ",
    "nameEn": "Ooikeibajoumae",
    "lat": 35.59555,
    "lng": 139.74724,
    "transfers": [],
    "address": "東京都大井競馬場前駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MO-04",
    "stationNumber": "MO04",
    "lineId": "tokyo_monorail",
    "number": 4,
    "name": "流通センター",
    "nameKana": "りゅうつうせんたー",
    "nameEn": "Ryuutsuusenta",
    "lat": 35.58188,
    "lng": 139.749,
    "transfers": [],
    "address": "東京都流通センター駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MO-05",
    "stationNumber": "MO05",
    "lineId": "tokyo_monorail",
    "number": 5,
    "name": "昭和島",
    "nameKana": "しょうわじま",
    "nameEn": "Shouwajima",
    "lat": 35.57077,
    "lng": 139.74995,
    "transfers": [],
    "address": "東京都昭和島駅",
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
    "id": "MO-06",
    "stationNumber": "MO06",
    "lineId": "tokyo_monorail",
    "number": 6,
    "name": "整備場",
    "nameKana": "せいびじょう",
    "nameEn": "Seibijou",
    "lat": 35.55554,
    "lng": 139.75336,
    "transfers": [],
    "address": "東京都整備場駅",
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
    "id": "MO-07",
    "stationNumber": "MO07",
    "lineId": "tokyo_monorail",
    "number": 7,
    "name": "天空橋",
    "nameKana": "てんくうばし",
    "nameEn": "Tenkuubashi",
    "lat": 35.54918,
    "lng": 139.75429,
    "transfers": [
      "京急空港線"
    ],
    "address": "東京都天空橋駅",
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
    "id": "MO-08",
    "stationNumber": "MO08",
    "lineId": "tokyo_monorail",
    "number": 8,
    "name": "羽田空港第３ターミナル",
    "nameKana": "はねだくうこうだいさんたーみなる",
    "nameEn": "Hanedakuukoudaisantaminaru",
    "lat": 35.544127,
    "lng": 139.768452,
    "transfers": [],
    "address": "東京都羽田空港第３ターミナル駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MO-09",
    "stationNumber": "MO09",
    "lineId": "tokyo_monorail",
    "number": 9,
    "name": "新整備場",
    "nameKana": "しんせいびじょう",
    "nameEn": "Shinseibijou",
    "lat": 35.54265,
    "lng": 139.78674,
    "transfers": [],
    "address": "東京都新整備場駅",
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
    "id": "MO-10",
    "stationNumber": "MO10",
    "lineId": "tokyo_monorail",
    "number": 10,
    "name": "羽田空港第１ターミナル",
    "nameKana": "はねだくうこうだいいちたーみなる",
    "nameEn": "Hanedakuukoudaiichitaminaru",
    "lat": 35.54925,
    "lng": 139.78454,
    "transfers": [],
    "address": "東京都羽田空港第１ターミナル駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "MO-11",
    "stationNumber": "MO11",
    "lineId": "tokyo_monorail",
    "number": 11,
    "name": "羽田空港第２ターミナル",
    "nameKana": "はねだくうこうだいにたーみなる",
    "nameEn": "Hanedakuukoudainitaminaru",
    "lat": 35.55016,
    "lng": 139.78862,
    "transfers": [],
    "address": "東京都羽田空港第２ターミナル駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];