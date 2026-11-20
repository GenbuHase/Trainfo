import type { Station } from '../../../types';

export const KEIKYU_AIRPORT_STATIONS: Station[] = [
  {
    "id": "KKA-01",
    "stationNumber": "KK11",
    "lineId": "keikyu_airport",
    "number": 1,
    "name": "京急蒲田",
    "nameKana": "けいきゅうかまた",
    "nameEn": "Keikyuukamata",
    "lat": 35.5615693,
    "lng": 139.724429,
    "transfers": [
      "京急本線"
    ],
    "address": "東京都京急蒲田駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
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
    "id": "KKA-02",
    "stationNumber": "KK12",
    "lineId": "keikyu_airport",
    "number": 2,
    "name": "糀谷",
    "nameKana": "こうじや",
    "nameEn": "Koujiya",
    "lat": 35.5547328,
    "lng": 139.7294068,
    "transfers": [],
    "address": "東京都糀谷駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KKA-03",
    "stationNumber": "KK13",
    "lineId": "keikyu_airport",
    "number": 3,
    "name": "大鳥居",
    "nameKana": "おおとりい",
    "nameEn": "Ootorii",
    "lat": 35.552529,
    "lng": 139.7393914,
    "transfers": [],
    "address": "東京都大鳥居駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KKA-04",
    "stationNumber": "KK14",
    "lineId": "keikyu_airport",
    "number": 4,
    "name": "穴守稲荷",
    "nameKana": "あなもりいなり",
    "nameEn": "Anamoriinari",
    "lat": 35.5502973,
    "lng": 139.7467638,
    "transfers": [],
    "address": "東京都穴守稲荷駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KKA-05",
    "stationNumber": "KK15",
    "lineId": "keikyu_airport",
    "number": 5,
    "name": "天空橋",
    "nameKana": "てんくうばし",
    "nameEn": "Tenkuubashi",
    "lat": 35.5480189,
    "lng": 139.7547892,
    "transfers": [
      "東京モノレール羽田空港線"
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
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KKA-06",
    "stationNumber": "KK16",
    "lineId": "keikyu_airport",
    "number": 6,
    "name": "羽田空港第３ターミナル",
    "nameKana": "はねだくうこうだいさんたーみなる",
    "nameEn": "Hanedakuukoudaisantaminaru",
    "lat": 35.5448556,
    "lng": 139.7680766,
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
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KKA-07",
    "stationNumber": "KK17",
    "lineId": "keikyu_airport",
    "number": 7,
    "name": "羽田空港第１・第２ターミナル",
    "nameKana": "はねだくうこうだいいちだいにたーみなる",
    "nameEn": "Hanedakuukoudaiichidainitaminaru",
    "lat": 35.5499375,
    "lng": 139.7864385,
    "transfers": [],
    "address": "東京都羽田空港第１・第２ターミナル駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
