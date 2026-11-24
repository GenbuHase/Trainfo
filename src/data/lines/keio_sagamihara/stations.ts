import type { Station } from '../../../types';

export const KEIO_SAGAMIHARA_STATIONS: Station[] = [
  {
    "id": "KOS-01",
    "stationNumber": "KO18",
    "lineId": "keio_sagamihara",
    "number": 1,
    "name": "調布",
    "nameKana": "ちょうふ",
    "nameEn": "Choufu",
    "lat": 35.6513943,
    "lng": 139.545864,
    "transfers": [
      "京王線"
    ],
    "address": "東京都調布市布田四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-02",
    "stationNumber": "KO35",
    "lineId": "keio_sagamihara",
    "number": 2,
    "name": "京王多摩川",
    "nameKana": "けいおうたまがわ",
    "nameEn": "Keioutamagawa",
    "lat": 35.6439893,
    "lng": 139.5361597,
    "transfers": [],
    "address": "東京都調布市多摩川四丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-03",
    "stationNumber": "KO36",
    "lineId": "keio_sagamihara",
    "number": 3,
    "name": "京王よみうりランド",
    "nameKana": "けいおうよみうりらんど",
    "nameEn": "Keiouyomiurirando",
    "lat": 35.6329367,
    "lng": 139.51674,
    "transfers": [],
    "address": "東京都稲城市矢野口",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "limited_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-04",
    "stationNumber": "KO37",
    "lineId": "keio_sagamihara",
    "number": 4,
    "name": "稲城",
    "nameKana": "いなぎ",
    "nameEn": "Inagi",
    "lat": 35.6362273,
    "lng": 139.5004987,
    "transfers": [],
    "address": "東京都稲城市東長沼",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-05",
    "stationNumber": "KO38",
    "lineId": "keio_sagamihara",
    "number": 5,
    "name": "京王永山",
    "nameKana": "けいおうながやま",
    "nameEn": "Keiounagayama",
    "lat": 35.6305118,
    "lng": 139.4473211,
    "transfers": [],
    "address": "東京都多摩市永山一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-06",
    "stationNumber": "KO39",
    "lineId": "keio_sagamihara",
    "number": 6,
    "name": "京王多摩センター",
    "nameKana": "けいおうたませんたー",
    "nameEn": "Keioutamasenta",
    "lat": 35.6248416,
    "lng": 139.4231859,
    "transfers": [],
    "address": "東京都多摩市落合一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-07",
    "stationNumber": "KO40",
    "lineId": "keio_sagamihara",
    "number": 7,
    "name": "京王堀之内",
    "nameKana": "けいおうほりのうち",
    "nameEn": "Keiouhorinouchi",
    "lat": 35.6239497,
    "lng": 139.399364,
    "transfers": [],
    "address": "東京都八王子市堀之内三丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-08",
    "stationNumber": "KO41",
    "lineId": "keio_sagamihara",
    "number": 8,
    "name": "南大沢",
    "nameKana": "みなみおおさわ",
    "nameEn": "Minamioosawa",
    "lat": 35.6139429,
    "lng": 139.3796026,
    "transfers": [],
    "address": "東京都八王子市南大沢二丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-09",
    "stationNumber": "KO42",
    "lineId": "keio_sagamihara",
    "number": 9,
    "name": "多摩境",
    "nameKana": "たまさかい",
    "nameEn": "Tamasakai",
    "lat": 35.6017578,
    "lng": 139.3669244,
    "transfers": [],
    "address": "東京都町田市小山ヶ丘三丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-10",
    "stationNumber": "KO43",
    "lineId": "keio_sagamihara",
    "number": 10,
    "name": "京王稲田堤",
    "nameKana": "けいおういなだづつみ",
    "nameEn": "Keiouinadazutsumi",
    "lat": 35.6341159,
    "lng": 139.5318452,
    "transfers": [],
    "address": "神奈川県川崎市多摩区菅四丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-11",
    "stationNumber": "KO44",
    "lineId": "keio_sagamihara",
    "number": 11,
    "name": "若葉台",
    "nameKana": "わかばだい",
    "nameEn": "Wakabadai",
    "lat": 35.6194535,
    "lng": 139.4712605,
    "transfers": [],
    "address": "神奈川県川崎市麻生区黒川",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KOS-12",
    "stationNumber": "KO45",
    "lineId": "keio_sagamihara",
    "number": 12,
    "name": "橋本",
    "nameKana": "はしもと",
    "nameEn": "Hashimoto",
    "lat": 35.595731,
    "lng": 139.3427108,
    "transfers": [
      "ＪＲ横浜線",
      "ＪＲ相模線"
    ],
    "address": "神奈川県相模原市緑区橋本二丁目",
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
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
