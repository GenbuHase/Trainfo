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
    "lat": 35.65143,
    "lng": 139.54591,
    "transfers": [
      "京王線"
    ],
    "address": "東京都調布駅",
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
    "lat": 35.64397,
    "lng": 139.53616,
    "transfers": [],
    "address": "東京都京王多摩川駅",
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
    "lat": 35.63294,
    "lng": 139.51674,
    "transfers": [],
    "address": "東京都京王よみうりランド駅",
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
    "lat": 35.63622,
    "lng": 139.5005,
    "transfers": [],
    "address": "東京都稲城駅",
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
    "lat": 35.63048,
    "lng": 139.44731,
    "transfers": [],
    "address": "東京都京王永山駅",
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
    "lat": 35.62487,
    "lng": 139.42317,
    "transfers": [],
    "address": "東京都京王多摩センター駅",
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
    "lat": 35.62398,
    "lng": 139.39934,
    "transfers": [],
    "address": "東京都京王堀之内駅",
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
    "lat": 35.61396,
    "lng": 139.37959,
    "transfers": [],
    "address": "東京都南大沢駅",
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
    "lat": 35.60175,
    "lng": 139.36694,
    "transfers": [],
    "address": "東京都多摩境駅",
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
    "lat": 35.63408,
    "lng": 139.53187,
    "transfers": [],
    "address": "神奈川県京王稲田堤駅",
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
    "lat": 35.61945,
    "lng": 139.47126,
    "transfers": [],
    "address": "神奈川県若葉台駅",
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
    "lat": 35.59572,
    "lng": 139.3427,
    "transfers": [
      "ＪＲ横浜線",
      "ＪＲ相模線"
    ],
    "address": "神奈川県橋本駅",
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