import type { Station } from '../../../types';

export const TOEI_MITA_STATIONS: Station[] = [
  {
    "id": "I-01",
    "stationNumber": "I01",
    "lineId": "toei_mita",
    "number": 1,
    "name": "目黒",
    "nameKana": "めぐろ",
    "nameEn": "Meguro",
    "lat": 35.6324892,
    "lng": 139.7156838,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "東急目黒線",
      "東京メトロ南北線"
    ],
    "address": "東京都品川区上大崎二丁目16-9",
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
    "id": "I-02",
    "stationNumber": "I02",
    "lineId": "toei_mita",
    "number": 2,
    "name": "白金台",
    "nameKana": "しろかねだい",
    "nameEn": "Shirokanedai",
    "lat": 35.6381169,
    "lng": 139.7265558,
    "transfers": [
      "東京メトロ南北線"
    ],
    "address": "東京都港区白金台四丁目5-10",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "I-03",
    "stationNumber": "I03",
    "lineId": "toei_mita",
    "number": 3,
    "name": "白金高輪",
    "nameKana": "しろかねたかなわ",
    "nameEn": "Shirokanetakanawa",
    "lat": 35.6429858,
    "lng": 139.7340158,
    "transfers": [
      "東京メトロ南北線"
    ],
    "address": "東京都港区高輪一丁目3-20",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "I-04",
    "stationNumber": "I04",
    "lineId": "toei_mita",
    "number": 4,
    "name": "三田",
    "nameKana": "みた",
    "nameEn": "Mita",
    "lat": 35.6484195,
    "lng": 139.7487633,
    "transfers": [
      "都営地下鉄浅草線"
    ],
    "address": "東京都港区芝五丁目",
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
    "id": "I-05",
    "stationNumber": "I05",
    "lineId": "toei_mita",
    "number": 5,
    "name": "芝公園",
    "nameKana": "しばこうえん",
    "nameEn": "Shibakouen",
    "lat": 35.6539668,
    "lng": 139.7498361,
    "transfers": [],
    "address": "東京都港区芝公園四丁目",
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
    "id": "I-06",
    "stationNumber": "I06",
    "lineId": "toei_mita",
    "number": 6,
    "name": "御成門",
    "nameKana": "おなりもん",
    "nameEn": "Onarimon",
    "lat": 35.6609982,
    "lng": 139.7513677,
    "transfers": [],
    "address": "東京都港区芝公園三丁目",
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
    "id": "I-07",
    "stationNumber": "I07",
    "lineId": "toei_mita",
    "number": 7,
    "name": "内幸町",
    "nameKana": "うちさいわいちょう",
    "nameEn": "Uchisaiwaichou",
    "lat": 35.6695626,
    "lng": 139.7553488,
    "transfers": [],
    "address": "東京都内幸町駅",
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
    "id": "I-08",
    "stationNumber": "I08",
    "lineId": "toei_mita",
    "number": 8,
    "name": "日比谷",
    "nameKana": "ひびや",
    "nameEn": "Hibiya",
    "lat": 35.6773262,
    "lng": 139.7604965,
    "transfers": [
      "東京メトロ日比谷線",
      "東京メトロ千代田線"
    ],
    "address": "東京都千代田区有楽町一丁目5-1",
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
    "id": "I-09",
    "stationNumber": "I09",
    "lineId": "toei_mita",
    "number": 9,
    "name": "大手町",
    "nameKana": "おおてまち",
    "nameEn": "Ootemachi",
    "lat": 35.6848877,
    "lng": 139.7629266,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ東西線",
      "東京メトロ千代田線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都大手町駅",
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
    "id": "I-10",
    "stationNumber": "I10",
    "lineId": "toei_mita",
    "number": 10,
    "name": "神保町",
    "nameKana": "じんぼうちょう",
    "nameEn": "Jimbouchou",
    "lat": 35.6957679,
    "lng": 139.7580717,
    "transfers": [
      "東京メトロ半蔵門線",
      "都営地下鉄新宿線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "I-11",
    "stationNumber": "I11",
    "lineId": "toei_mita",
    "number": 11,
    "name": "水道橋",
    "nameKana": "すいどうばし",
    "nameEn": "Suidoubashi",
    "lat": 35.7038043,
    "lng": 139.7550371,
    "transfers": [
      "ＪＲ中央・総武線各駅停車"
    ],
    "address": "東京都文京区本郷一丁目",
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
    "id": "I-12",
    "stationNumber": "I12",
    "lineId": "toei_mita",
    "number": 12,
    "name": "春日",
    "nameKana": "かすが",
    "nameEn": "Kasuga",
    "lat": 35.7099512,
    "lng": 139.7531367,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都文京区本郷四丁目",
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
    "id": "I-13",
    "stationNumber": "I13",
    "lineId": "toei_mita",
    "number": 13,
    "name": "白山",
    "nameKana": "はくさん",
    "nameEn": "Hakusan",
    "lat": 35.7219856,
    "lng": 139.752148,
    "transfers": [],
    "address": "東京都文京区白山五丁目",
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
    "id": "I-14",
    "stationNumber": "I14",
    "lineId": "toei_mita",
    "number": 14,
    "name": "千石",
    "nameKana": "せんごく",
    "nameEn": "Sengoku",
    "lat": 35.7274187,
    "lng": 139.7453372,
    "transfers": [],
    "address": "東京都文京区本駒込二丁目",
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
    "id": "I-15",
    "stationNumber": "I15",
    "lineId": "toei_mita",
    "number": 15,
    "name": "巣鴨",
    "nameKana": "すがも",
    "nameEn": "Sugamo",
    "lat": 35.7333304,
    "lng": 139.7386866,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り"
    ],
    "address": "東京都豊島区巣鴨三丁目",
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
    "id": "I-16",
    "stationNumber": "I16",
    "lineId": "toei_mita",
    "number": 16,
    "name": "西巣鴨",
    "nameKana": "にしすがも",
    "nameEn": "Nishisugamo",
    "lat": 35.742815,
    "lng": 139.7293491,
    "transfers": [],
    "address": "東京都豊島区西巣鴨三丁目",
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
    "id": "I-17",
    "stationNumber": "I17",
    "lineId": "toei_mita",
    "number": 17,
    "name": "新板橋",
    "nameKana": "しんいたばし",
    "nameEn": "Shinitabashi",
    "lat": 35.7487215,
    "lng": 139.7202457,
    "transfers": [],
    "address": "東京都板橋区板橋四丁目",
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
    "id": "I-18",
    "stationNumber": "I18",
    "lineId": "toei_mita",
    "number": 18,
    "name": "板橋区役所前",
    "nameKana": "いたばしくやくしょまえ",
    "nameEn": "Itabashikuyakushomae",
    "lat": 35.7508111,
    "lng": 139.7106386,
    "transfers": [],
    "address": "東京都板橋区役所前駅",
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
    "id": "I-19",
    "stationNumber": "I19",
    "lineId": "toei_mita",
    "number": 19,
    "name": "板橋本町",
    "nameKana": "いたばしほんちょう",
    "nameEn": "Itabashihonchou",
    "lat": 35.7614842,
    "lng": 139.7054765,
    "transfers": [],
    "address": "東京都板橋本町駅",
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
    "id": "I-20",
    "stationNumber": "I20",
    "lineId": "toei_mita",
    "number": 20,
    "name": "本蓮沼",
    "nameKana": "もとはすぬま",
    "nameEn": "Motohasunuma",
    "lat": 35.769568,
    "lng": 139.701626,
    "transfers": [],
    "address": "東京都板橋区蓮沼町",
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
    "id": "I-21",
    "stationNumber": "I21",
    "lineId": "toei_mita",
    "number": 21,
    "name": "志村坂上",
    "nameKana": "しむらさかうえ",
    "nameEn": "Shimurasakaue",
    "lat": 35.7768693,
    "lng": 139.6941185,
    "transfers": [],
    "address": "東京都志村坂上駅",
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
    "id": "I-22",
    "stationNumber": "I22",
    "lineId": "toei_mita",
    "number": 22,
    "name": "志村三丁目",
    "nameKana": "しむらさんちょうめ",
    "nameEn": "Shimurasanchoume",
    "lat": 35.7772314,
    "lng": 139.6850013,
    "transfers": [],
    "address": "東京都志村三丁目駅",
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
    "id": "I-23",
    "stationNumber": "I23",
    "lineId": "toei_mita",
    "number": 23,
    "name": "蓮根",
    "nameKana": "はすね",
    "nameEn": "Hasune",
    "lat": 35.7846971,
    "lng": 139.6790601,
    "transfers": [],
    "address": "東京都板橋区蓮根二丁目",
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
    "id": "I-24",
    "stationNumber": "I24",
    "lineId": "toei_mita",
    "number": 24,
    "name": "西台",
    "nameKana": "にしだい",
    "nameEn": "Nishidai",
    "lat": 35.7871579,
    "lng": 139.6716881,
    "transfers": [],
    "address": "東京都板橋区高島平九丁目",
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
    "id": "I-25",
    "stationNumber": "I25",
    "lineId": "toei_mita",
    "number": 25,
    "name": "高島平",
    "nameKana": "たかしまだいら",
    "nameEn": "Takashimadaira",
    "lat": 35.7889875,
    "lng": 139.6603048,
    "transfers": [],
    "address": "東京都板橋区高島平八丁目",
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
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "I-26",
    "stationNumber": "I26",
    "lineId": "toei_mita",
    "number": 26,
    "name": "新高島平",
    "nameKana": "しんたかしまだいら",
    "nameEn": "Shintakashimadaira",
    "lat": 35.7904021,
    "lng": 139.6533706,
    "transfers": [],
    "address": "東京都板橋区高島平七丁目",
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
    "id": "I-27",
    "stationNumber": "I27",
    "lineId": "toei_mita",
    "number": 27,
    "name": "西高島平",
    "nameKana": "にしたかしまだいら",
    "nameEn": "Nishitakashimadaira",
    "lat": 35.7921312,
    "lng": 139.6445593,
    "transfers": [],
    "address": "東京都板橋区高島平六丁目",
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
  }
];
