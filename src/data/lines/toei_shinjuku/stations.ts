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
    "lat": 35.6882151,
    "lng": 139.6978697,
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
    "address": "東京都新宿区新宿三丁目",
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
    "lat": 35.6904659,
    "lng": 139.7056531,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ副都心線"
    ],
    "address": "東京都新宿区新宿三丁目5-4",
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
    "lat": 35.6923576,
    "lng": 139.7215905,
    "transfers": [],
    "address": "東京都新宿区住吉町",
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
    "isMajor": false,
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
    "lat": 35.6912243,
    "lng": 139.7364809,
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
    "lat": 35.6955394,
    "lng": 139.7514002,
    "transfers": [
      "東京メトロ東西線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都千代田区九段南一丁目6-1",
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
    "lat": 35.6959745,
    "lng": 139.7580111,
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
    "lat": 35.6950524,
    "lng": 139.766382,
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
    "isMajor": false,
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
    "lat": 35.6955853,
    "lng": 139.7751303,
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
    "isMajor": false,
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
    "lat": 35.6922707,
    "lng": 139.7825973,
    "transfers": [],
    "address": "東京都中央区日本橋横山町",
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
    "isMajor": true,
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
    "lat": 35.6887403,
    "lng": 139.7872402,
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
    "isMajor": false,
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
    "lat": 35.6879516,
    "lng": 139.797344,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都江東区森下一丁目",
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
    "lat": 35.6883573,
    "lng": 139.8060633,
    "transfers": [],
    "address": "東京都墨田区菊川三丁目",
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
    "isMajor": false,
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
    "lat": 35.6889898,
    "lng": 139.8156371,
    "transfers": [
      "東京メトロ半蔵門線"
    ],
    "address": "東京都江東区住吉二丁目24-12",
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
    "lat": 35.6893125,
    "lng": 139.8262497,
    "transfers": [],
    "address": "東京都江東区大島一丁目",
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
    "isMajor": false,
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
    "lat": 35.6896227,
    "lng": 139.8342663,
    "transfers": [],
    "address": "東京都江東区大島五丁目",
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
    "isMajor": true,
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
    "lat": 35.6898456,
    "lng": 139.8475574,
    "transfers": [],
    "address": "東京都江東区大島九丁目",
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
    "isMajor": false,
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
    "lat": 35.6837555,
    "lng": 139.8628405,
    "transfers": [],
    "address": "東京都江戸川区船堀二丁目",
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
    "isMajor": true,
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
    "lat": 35.6858079,
    "lng": 139.8818782,
    "transfers": [],
    "address": "東京都江戸川区一之江七丁目",
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
    "isMajor": false,
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
    "lat": 35.6926755,
    "lng": 139.8973197,
    "transfers": [],
    "address": "東京都江戸川区瑞江二丁目",
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
    "isMajor": false,
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
    "lat": 35.7054496,
    "lng": 139.9031457,
    "transfers": [],
    "address": "東京都江戸川区篠崎町七丁目",
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
    "isMajor": false,
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
    "lat": 35.7226069,
    "lng": 139.9263329,
    "transfers": [],
    "address": "千葉県市川市八幡三丁目",
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
