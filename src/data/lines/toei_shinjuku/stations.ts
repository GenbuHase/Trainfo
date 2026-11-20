import type { Station } from '../../../types';

export const TOEI_SHINJUKU_STATIONS: Station[] = [
  {
    "id": "S-01",
    "stationNumber": "S01",
    "lineId": "toei_shinjuku",
    "number": 1,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.68815,
    "lng": 139.69791,
    "transfers": [
      "ＪＲ湘南新宿ライン",
      "ＪＲ埼京線",
      "ＪＲ中央線快速",
      "ＪＲ中央・総武線各駅停車",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "京王線",
      "京王新線",
      "小田急小田原線",
      "都営地下鉄大江戸線"
    ],
    "address": "東京都新宿駅",
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
    "id": "S-02",
    "stationNumber": "S02",
    "lineId": "toei_shinjuku",
    "number": 2,
    "name": "新宿三丁目",
    "nameKana": "しんじゅくさんちょうめ",
    "nameEn": "Shinjukusanchoume",
    "lat": 35.69054,
    "lng": 139.70558,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ副都心線"
    ],
    "address": "東京都新宿三丁目駅",
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
    "id": "S-03",
    "stationNumber": "S03",
    "lineId": "toei_shinjuku",
    "number": 3,
    "name": "曙橋",
    "nameKana": "あけぼのばし",
    "nameEn": "Akebonobashi",
    "lat": 35.69236,
    "lng": 139.72159,
    "transfers": [],
    "address": "東京都曙橋駅",
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
    "id": "S-04",
    "stationNumber": "S04",
    "lineId": "toei_shinjuku",
    "number": 4,
    "name": "市ケ谷",
    "nameKana": "いちがや",
    "nameEn": "Ichigaya",
    "lat": 35.6912,
    "lng": 139.73649,
    "transfers": [
      "ＪＲ中央・総武線各駅停車",
      "東京メトロ有楽町線",
      "東京メトロ南北線"
    ],
    "address": "東京都市ケ谷駅",
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
    "id": "S-05",
    "stationNumber": "S05",
    "lineId": "toei_shinjuku",
    "number": 5,
    "name": "九段下",
    "nameKana": "くだんした",
    "nameEn": "Kudanshita",
    "lat": 35.69554,
    "lng": 139.7514,
    "transfers": [
      "東京メトロ東西線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都九段下駅",
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
    "id": "S-06",
    "stationNumber": "S06",
    "lineId": "toei_shinjuku",
    "number": 6,
    "name": "神保町",
    "nameKana": "じんぼうちょう",
    "nameEn": "Jimbouchou",
    "lat": 35.69598749,
    "lng": 139.7580105,
    "transfers": [
      "東京メトロ半蔵門線",
      "都営地下鉄三田線"
    ],
    "address": "東京都神保町駅",
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
    "id": "S-07",
    "stationNumber": "S07",
    "lineId": "toei_shinjuku",
    "number": 7,
    "name": "小川町",
    "nameKana": "おがわまち",
    "nameEn": "Ogawamachi",
    "lat": 35.69504,
    "lng": 139.76639,
    "transfers": [],
    "address": "東京都小川町駅",
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
    "id": "S-08",
    "stationNumber": "S08",
    "lineId": "toei_shinjuku",
    "number": 8,
    "name": "岩本町",
    "nameKana": "いわもとちょう",
    "nameEn": "Iwamotochou",
    "lat": 35.69558,
    "lng": 139.77513,
    "transfers": [],
    "address": "東京都岩本町駅",
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
    "id": "S-09",
    "stationNumber": "S09",
    "lineId": "toei_shinjuku",
    "number": 9,
    "name": "馬喰横山",
    "nameKana": "ばくろよこやま",
    "nameEn": "Bakuroyokoyama",
    "lat": 35.69228,
    "lng": 139.78261,
    "transfers": [],
    "address": "東京都馬喰横山駅",
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
    "id": "S-10",
    "stationNumber": "S10",
    "lineId": "toei_shinjuku",
    "number": 10,
    "name": "浜町",
    "nameKana": "はまちょう",
    "nameEn": "Hamachou",
    "lat": 35.68879,
    "lng": 139.78727,
    "transfers": [],
    "address": "東京都浜町駅",
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
    "id": "S-11",
    "stationNumber": "S11",
    "lineId": "toei_shinjuku",
    "number": 11,
    "name": "森下",
    "nameKana": "もりした",
    "nameEn": "Morishita",
    "lat": 35.68804,
    "lng": 139.79734,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都森下駅",
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
    "id": "S-12",
    "stationNumber": "S12",
    "lineId": "toei_shinjuku",
    "number": 12,
    "name": "菊川",
    "nameKana": "きくかわ",
    "nameEn": "Kikukawa",
    "lat": 35.6884,
    "lng": 139.80606,
    "transfers": [],
    "address": "東京都菊川駅",
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
    "id": "S-13",
    "stationNumber": "S13",
    "lineId": "toei_shinjuku",
    "number": 13,
    "name": "住吉",
    "nameKana": "すみよし",
    "nameEn": "Sumiyoshi",
    "lat": 35.68895,
    "lng": 139.81564,
    "transfers": [
      "東京メトロ半蔵門線"
    ],
    "address": "東京都住吉駅",
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
    "id": "S-14",
    "stationNumber": "S14",
    "lineId": "toei_shinjuku",
    "number": 14,
    "name": "西大島",
    "nameKana": "にしおおじま",
    "nameEn": "Nishioojima",
    "lat": 35.68936,
    "lng": 139.82625,
    "transfers": [],
    "address": "東京都西大島駅",
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
    "id": "S-15",
    "stationNumber": "S15",
    "lineId": "toei_shinjuku",
    "number": 15,
    "name": "大島",
    "nameKana": "おおじま",
    "nameEn": "Oojima",
    "lat": 35.68975,
    "lng": 139.83425,
    "transfers": [],
    "address": "東京都大島駅",
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
    "id": "S-16",
    "stationNumber": "S16",
    "lineId": "toei_shinjuku",
    "number": 16,
    "name": "東大島",
    "nameKana": "ひがしおおじま",
    "nameEn": "Higashioojima",
    "lat": 35.68985,
    "lng": 139.84756,
    "transfers": [],
    "address": "東京都東大島駅",
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
    "id": "S-17",
    "stationNumber": "S17",
    "lineId": "toei_shinjuku",
    "number": 17,
    "name": "船堀",
    "nameKana": "ふなぼり",
    "nameEn": "Funabori",
    "lat": 35.68375,
    "lng": 139.86284,
    "transfers": [],
    "address": "東京都船堀駅",
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
    "id": "S-18",
    "stationNumber": "S18",
    "lineId": "toei_shinjuku",
    "number": 18,
    "name": "一之江",
    "nameKana": "いちのえ",
    "nameEn": "Ichinoe",
    "lat": 35.6858,
    "lng": 139.88188,
    "transfers": [],
    "address": "東京都一之江駅",
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
    "id": "S-19",
    "stationNumber": "S19",
    "lineId": "toei_shinjuku",
    "number": 19,
    "name": "瑞江",
    "nameKana": "みずえ",
    "nameEn": "Mizue",
    "lat": 35.69268,
    "lng": 139.89731,
    "transfers": [],
    "address": "東京都瑞江駅",
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
    "id": "S-20",
    "stationNumber": "S20",
    "lineId": "toei_shinjuku",
    "number": 20,
    "name": "篠崎",
    "nameKana": "しのざき",
    "nameEn": "Shinozaki",
    "lat": 35.70543,
    "lng": 139.90318,
    "transfers": [],
    "address": "東京都篠崎駅",
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
    "id": "S-21",
    "stationNumber": "S21",
    "lineId": "toei_shinjuku",
    "number": 21,
    "name": "本八幡",
    "nameKana": "もとやわた",
    "nameEn": "Motoyawata",
    "lat": 35.72263,
    "lng": 139.92627,
    "transfers": [],
    "address": "千葉県本八幡駅",
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