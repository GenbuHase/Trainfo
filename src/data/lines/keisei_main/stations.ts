import type { Station } from '../../../types';

export const KEISEI_MAIN_STATIONS: Station[] = [
  {
    "id": "KSM-01",
    "stationNumber": "KS01",
    "lineId": "keisei_main",
    "number": 1,
    "name": "京成上野",
    "nameKana": "けいせいうえの",
    "nameEn": "Keiseiueno",
    "lat": 35.7118019,
    "lng": 139.7733573,
    "transfers": [],
    "address": "東京都台東区上野公園",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
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
    "id": "KSM-02",
    "stationNumber": "KS02",
    "lineId": "keisei_main",
    "number": 2,
    "name": "日暮里",
    "nameKana": "にっぽり",
    "nameEn": "Nippori",
    "lat": 35.7283419,
    "lng": 139.7710799,
    "transfers": [
      "ＪＲ常磐線快速",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "ＪＲ京浜東北線"
    ],
    "address": "東京都荒川区西日暮里二丁目19-1",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
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
    "id": "KSM-03",
    "stationNumber": "KS03",
    "lineId": "keisei_main",
    "number": 3,
    "name": "新三河島",
    "nameKana": "しんみかわしま",
    "nameEn": "Shimmikawashima",
    "lat": 35.7375253,
    "lng": 139.7745333,
    "transfers": [],
    "address": "東京都荒川区西日暮里六丁目",
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
    "id": "KSM-04",
    "stationNumber": "KS04",
    "lineId": "keisei_main",
    "number": 4,
    "name": "町屋",
    "nameKana": "まちや",
    "nameEn": "Machiya",
    "lat": 35.7424016,
    "lng": 139.78167,
    "transfers": [],
    "address": "東京都町屋駅",
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
    "id": "KSM-05",
    "stationNumber": "KS05",
    "lineId": "keisei_main",
    "number": 5,
    "name": "千住大橋",
    "nameKana": "せんじゅおおはし",
    "nameEn": "Senjuoohashi",
    "lat": 35.7422272,
    "lng": 139.7974724,
    "transfers": [],
    "address": "東京都足立区千住橋戸町",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-06",
    "stationNumber": "KS06",
    "lineId": "keisei_main",
    "number": 6,
    "name": "京成関屋",
    "nameKana": "けいせいせきや",
    "nameEn": "Keiseisekiya",
    "lat": 35.7440178,
    "lng": 139.8122577,
    "transfers": [],
    "address": "東京都足立区千住曙町",
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
    "id": "KSM-07",
    "stationNumber": "KS07",
    "lineId": "keisei_main",
    "number": 7,
    "name": "堀切菖蒲園",
    "nameKana": "ほりきりしょうぶえん",
    "nameEn": "Horikirishoubuen",
    "lat": 35.7476763,
    "lng": 139.8280188,
    "transfers": [],
    "address": "東京都葛飾区堀切五丁目",
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
    "id": "KSM-08",
    "stationNumber": "KS08",
    "lineId": "keisei_main",
    "number": 8,
    "name": "お花茶屋",
    "nameKana": "おはなぢゃや",
    "nameEn": "Ohanajiyaya",
    "lat": 35.7475447,
    "lng": 139.8403286,
    "transfers": [],
    "address": "東京都葛飾区宝町二丁目",
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
    "id": "KSM-09",
    "stationNumber": "KS09",
    "lineId": "keisei_main",
    "number": 9,
    "name": "青砥",
    "nameKana": "あおと",
    "nameEn": "Aoto",
    "lat": 35.7464324,
    "lng": 139.8566638,
    "transfers": [
      "京成押上線"
    ],
    "address": "東京都葛飾区青戸三丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
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
    "id": "KSM-10",
    "stationNumber": "KS10",
    "lineId": "keisei_main",
    "number": 10,
    "name": "京成高砂",
    "nameKana": "けいせいたかさご",
    "nameEn": "Keiseitakasago",
    "lat": 35.7507955,
    "lng": 139.8657293,
    "transfers": [
      "京成金町線",
      "京成成田スカイアクセス線",
      "北総鉄道北総線"
    ],
    "address": "東京都葛飾区高砂五丁目",
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
      "commuter_limited_exp",
      "express",
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
    "id": "KSM-11",
    "stationNumber": "KS11",
    "lineId": "keisei_main",
    "number": 11,
    "name": "京成小岩",
    "nameKana": "けいせいこいわ",
    "nameEn": "Keiseikoiwa",
    "lat": 35.7426008,
    "lng": 139.883031,
    "transfers": [],
    "address": "東京都江戸川区北小岩二丁目",
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
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-12",
    "stationNumber": "KS12",
    "lineId": "keisei_main",
    "number": 12,
    "name": "江戸川",
    "nameKana": "えどがわ",
    "nameEn": "Edogawa",
    "lat": 35.7377557,
    "lng": 139.8958164,
    "transfers": [],
    "address": "東京都江戸川区北小岩三丁目",
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
    "id": "KSM-13",
    "stationNumber": "KS13",
    "lineId": "keisei_main",
    "number": 13,
    "name": "国府台",
    "nameKana": "こうのだい",
    "nameEn": "Kounodai",
    "lat": 35.7363582,
    "lng": 139.9028004,
    "transfers": [],
    "address": "千葉県市川市市川三丁目",
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
    "id": "KSM-14",
    "stationNumber": "KS14",
    "lineId": "keisei_main",
    "number": 14,
    "name": "市川真間",
    "nameKana": "いちかわまま",
    "nameEn": "Ichikawamama",
    "lat": 35.7313952,
    "lng": 139.9115346,
    "transfers": [],
    "address": "千葉県市川真間駅",
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
    "id": "KSM-15",
    "stationNumber": "KS15",
    "lineId": "keisei_main",
    "number": 15,
    "name": "菅野",
    "nameKana": "すがの",
    "nameEn": "Sugano",
    "lat": 35.7285257,
    "lng": 139.9188468,
    "transfers": [],
    "address": "千葉県市川市菅野二丁目",
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
    "id": "KSM-16",
    "stationNumber": "KS16",
    "lineId": "keisei_main",
    "number": 16,
    "name": "京成八幡",
    "nameKana": "けいせいやわた",
    "nameEn": "Keiseiyawata",
    "lat": 35.7240606,
    "lng": 139.9277562,
    "transfers": [],
    "address": "千葉県市川市八幡三丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-17",
    "stationNumber": "KS17",
    "lineId": "keisei_main",
    "number": 17,
    "name": "鬼越",
    "nameKana": "おにごえ",
    "nameEn": "Onigoe",
    "lat": 35.7199848,
    "lng": 139.9374343,
    "transfers": [],
    "address": "千葉県市川市鬼越一丁目",
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
    "id": "KSM-18",
    "stationNumber": "KS18",
    "lineId": "keisei_main",
    "number": 18,
    "name": "京成中山",
    "nameKana": "けいせいなかやま",
    "nameEn": "Keiseinakayama",
    "lat": 35.7172151,
    "lng": 139.9438585,
    "transfers": [],
    "address": "千葉県船橋市本中山一丁目",
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
    "id": "KSM-19",
    "stationNumber": "KS19",
    "lineId": "keisei_main",
    "number": 19,
    "name": "東中山",
    "nameKana": "ひがしなかやま",
    "nameEn": "Higashinakayama",
    "lat": 35.7145664,
    "lng": 139.9521805,
    "transfers": [],
    "address": "千葉県船橋市東中山二丁目",
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
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-20",
    "stationNumber": "KS20",
    "lineId": "keisei_main",
    "number": 20,
    "name": "京成西船",
    "nameKana": "けいせいにしふな",
    "nameEn": "Keiseinishifuna",
    "lat": 35.7119467,
    "lng": 139.9584437,
    "transfers": [],
    "address": "千葉県船橋市印内一丁目",
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
    "id": "KSM-21",
    "stationNumber": "KS21",
    "lineId": "keisei_main",
    "number": 21,
    "name": "海神",
    "nameKana": "かいじん",
    "nameEn": "Kaijin",
    "lat": 35.7061589,
    "lng": 139.9714389,
    "transfers": [],
    "address": "千葉県船橋市海神五丁目",
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
    "id": "KSM-22",
    "stationNumber": "KS22",
    "lineId": "keisei_main",
    "number": 22,
    "name": "京成船橋",
    "nameKana": "けいせいふなばし",
    "nameEn": "Keiseifunabashi",
    "lat": 35.6999743,
    "lng": 139.9847661,
    "transfers": [],
    "address": "千葉県船橋市本町一丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-23",
    "stationNumber": "KS23",
    "lineId": "keisei_main",
    "number": 23,
    "name": "大神宮下",
    "nameKana": "だいじんぐうした",
    "nameEn": "Daijinguushita",
    "lat": 35.6939614,
    "lng": 139.9913748,
    "transfers": [],
    "address": "千葉県船橋市宮本二丁目",
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
    "id": "KSM-24",
    "stationNumber": "KS24",
    "lineId": "keisei_main",
    "number": 24,
    "name": "船橋競馬場",
    "nameKana": "ふなばしけいばじょう",
    "nameEn": "Funabashikeibajou",
    "lat": 35.6896335,
    "lng": 139.9979867,
    "transfers": [],
    "address": "千葉県船橋市宮本八丁目",
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
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-25",
    "stationNumber": "KS25",
    "lineId": "keisei_main",
    "number": 25,
    "name": "谷津",
    "nameKana": "やつ",
    "nameEn": "Yatsu",
    "lat": 35.6852243,
    "lng": 140.0075842,
    "transfers": [],
    "address": "千葉県習志野市谷津五丁目",
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
    "id": "KSM-26",
    "stationNumber": "KS26",
    "lineId": "keisei_main",
    "number": 26,
    "name": "京成津田沼",
    "nameKana": "けいせいつだぬま",
    "nameEn": "Keiseitsudanuma",
    "lat": 35.6837046,
    "lng": 140.0240823,
    "transfers": [
      "京成千葉線",
      "京成松戸線"
    ],
    "address": "千葉県習志野市津田沼三丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-27",
    "stationNumber": "KS27",
    "lineId": "keisei_main",
    "number": 27,
    "name": "京成大久保",
    "nameKana": "けいせいおおくぼ",
    "nameEn": "Keiseiookubo",
    "lat": 35.6859433,
    "lng": 140.0480404,
    "transfers": [],
    "address": "千葉県習志野市本大久保三丁目",
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
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-28",
    "stationNumber": "KS28",
    "lineId": "keisei_main",
    "number": 28,
    "name": "実籾",
    "nameKana": "みもみ",
    "nameEn": "Mimomi",
    "lat": 35.6867018,
    "lng": 140.067418,
    "transfers": [],
    "address": "千葉県習志野市実籾二丁目",
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
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-29",
    "stationNumber": "KS29",
    "lineId": "keisei_main",
    "number": 29,
    "name": "八千代台",
    "nameKana": "やちよだい",
    "nameEn": "Yachiyodai",
    "lat": 35.7008926,
    "lng": 140.0901868,
    "transfers": [],
    "address": "千葉県八千代市八千代台南一丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-30",
    "stationNumber": "KS30",
    "lineId": "keisei_main",
    "number": 30,
    "name": "京成大和田",
    "nameKana": "けいせいおおわだ",
    "nameEn": "Keiseioowada",
    "lat": 35.7120872,
    "lng": 140.1080359,
    "transfers": [],
    "address": "千葉県八千代市大和田",
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
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-31",
    "stationNumber": "KS31",
    "lineId": "keisei_main",
    "number": 31,
    "name": "勝田台",
    "nameKana": "かつただい",
    "nameEn": "Katsutadai",
    "lat": 35.7153596,
    "lng": 140.1252324,
    "transfers": [],
    "address": "千葉県八千代市勝田台北一丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-32",
    "stationNumber": "KS32",
    "lineId": "keisei_main",
    "number": 32,
    "name": "志津",
    "nameKana": "しづ",
    "nameEn": "Shizu",
    "lat": 35.7175081,
    "lng": 140.1453174,
    "transfers": [],
    "address": "千葉県佐倉市上志津",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-33",
    "stationNumber": "KS33",
    "lineId": "keisei_main",
    "number": 33,
    "name": "ユーカリが丘",
    "nameKana": "ゆーかりがおか",
    "nameEn": "Yukarigaoka",
    "lat": 35.7217295,
    "lng": 140.1564476,
    "transfers": [
      "山万ユーカリが丘線"
    ],
    "address": "千葉県佐倉市ユーカリが丘四丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-34",
    "stationNumber": "KS34",
    "lineId": "keisei_main",
    "number": 34,
    "name": "京成臼井",
    "nameKana": "けいせいうすい",
    "nameEn": "Keiseiusui",
    "lat": 35.7295044,
    "lng": 140.1803342,
    "transfers": [],
    "address": "千葉県佐倉市王子台三丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-35",
    "stationNumber": "KS35",
    "lineId": "keisei_main",
    "number": 35,
    "name": "京成佐倉",
    "nameKana": "けいせいさくら",
    "nameEn": "Keiseisakura",
    "lat": 35.725146,
    "lng": 140.2290113,
    "transfers": [],
    "address": "千葉県佐倉市栄町",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-36",
    "stationNumber": "KS36",
    "lineId": "keisei_main",
    "number": 36,
    "name": "大佐倉",
    "nameKana": "おおさくら",
    "nameEn": "Oosakura",
    "lat": 35.7300373,
    "lng": 140.2510513,
    "transfers": [],
    "address": "千葉県佐倉市大佐倉",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-37",
    "stationNumber": "KS37",
    "lineId": "keisei_main",
    "number": 37,
    "name": "京成酒々井",
    "nameKana": "けいせいしすい",
    "nameEn": "Keiseishisui",
    "lat": 35.7373849,
    "lng": 140.270658,
    "transfers": [],
    "address": "千葉県酒々井町中川",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-38",
    "stationNumber": "KS38",
    "lineId": "keisei_main",
    "number": 38,
    "name": "宗吾参道",
    "nameKana": "そうごさんどう",
    "nameEn": "Sougosandou",
    "lat": 35.7527297,
    "lng": 140.2811163,
    "transfers": [],
    "address": "千葉県酒々井町下岩橋",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-39",
    "stationNumber": "KS39",
    "lineId": "keisei_main",
    "number": 39,
    "name": "公津の杜",
    "nameKana": "こうづのもり",
    "nameEn": "Kouzunomori",
    "lat": 35.760339,
    "lng": 140.2948558,
    "transfers": [],
    "address": "千葉県成田市公津の杜四丁目",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-40",
    "stationNumber": "KS40",
    "lineId": "keisei_main",
    "number": 40,
    "name": "京成成田",
    "nameKana": "けいせいなりた",
    "nameEn": "Keiseinarita",
    "lat": 35.7758408,
    "lng": 140.3148003,
    "transfers": [
      "京成東成田線"
    ],
    "address": "千葉県成田市花崎町",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-41",
    "stationNumber": "KS41",
    "lineId": "keisei_main",
    "number": 41,
    "name": "空港第２ビル",
    "nameKana": "くうこうだいにびる",
    "nameEn": "Kuukoudainibiru",
    "lat": 35.7740802,
    "lng": 140.3866324,
    "transfers": [
      "ＪＲ成田線",
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県成田市古込",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSM-42",
    "stationNumber": "KS42",
    "lineId": "keisei_main",
    "number": 42,
    "name": "成田空港",
    "nameKana": "なりたくうこう",
    "nameEn": "Naritakuukou",
    "lat": 35.7669541,
    "lng": 140.3870463,
    "transfers": [
      "ＪＲ成田線",
      "京成成田スカイアクセス線"
    ],
    "address": "千葉県成田市天浪",
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
      "commuter_limited_exp",
      "express",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
