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
    "lat": 35.6560794,
    "lng": 139.7569159,
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
    "lat": 35.6224053,
    "lng": 139.7510336,
    "transfers": [
      "東京臨海高速鉄道りんかい線"
    ],
    "address": "東京都品川区東品川二丁目2-22",
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
    "lat": 35.5955558,
    "lng": 139.7470962,
    "transfers": [],
    "address": "東京都品川区勝島二丁目",
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
    "lat": 35.5818956,
    "lng": 139.7490536,
    "transfers": [],
    "address": "東京都大田区平和島六丁目",
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
    "lat": 35.5707622,
    "lng": 139.7499971,
    "transfers": [],
    "address": "東京都大田区昭和島二丁目",
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
    "lat": 35.5555398,
    "lng": 139.7533828,
    "transfers": [],
    "address": "東京都大田区羽田空港一丁目",
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
    "lat": 35.5491881,
    "lng": 139.7543247,
    "transfers": [
      "京急空港線"
    ],
    "address": "東京都大田区羽田空港一丁目",
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
    "lat": 35.5441362,
    "lng": 139.7684677,
    "transfers": [],
    "address": "東京都大田区羽田空港二丁目",
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
    "lat": 35.5426583,
    "lng": 139.7867181,
    "transfers": [],
    "address": "東京都大田区羽田空港三丁目",
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
    "lat": 35.5492159,
    "lng": 139.7844598,
    "transfers": [],
    "address": "東京都大田区羽田空港三丁目",
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
    "lat": 35.5504731,
    "lng": 139.7884883,
    "transfers": [],
    "address": "東京都大田区羽田空港三丁目",
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
