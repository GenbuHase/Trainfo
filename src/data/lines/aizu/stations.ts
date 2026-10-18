import type { Station } from '../../../types';

export const AIZU_STATIONS: Station[] = [
  {
    "id": "AIZ-01",
    "lineId": "aizu",
    "number": 1,
    "name": "会津高原尾瀬口",
    "nameKana": "あいづこうげんおぜぐち",
    "nameEn": "Aizu-Kogen-Ozeguchi",
    "lat": 37.089971,
    "lng": 139.705192,
    "transfers": [
      "野岩鉄道会津鬼怒川線",
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町滝原字羽根原",
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
      "limitedExp",
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-02",
    "lineId": "aizu",
    "number": 2,
    "name": "七ヶ岳登山口",
    "nameKana": "ななつがたけとざんぐち",
    "nameEn": "Nanatsugatake-Tozanguchi",
    "lat": 37.1241018,
    "lng": 139.717334,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町糸沢字下平",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-03",
    "lineId": "aizu",
    "number": 3,
    "name": "会津山村道場",
    "nameKana": "あいづさんそんどうじょう",
    "nameEn": "Aizu-Sanson-Dojo",
    "lat": 37.1448708,
    "lng": 139.7320494,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町糸沢字今泉",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-04",
    "lineId": "aizu",
    "number": 4,
    "name": "会津荒海",
    "nameKana": "あいづあらかい",
    "nameEn": "Aizu-Arakai",
    "lat": 37.1534056,
    "lng": 139.7337399,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町関本字百刈",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-05",
    "lineId": "aizu",
    "number": 5,
    "name": "中荒井",
    "nameKana": "なかあらい",
    "nameEn": "Naka-Arai",
    "lat": 37.1802912,
    "lng": 139.7509627,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町中荒井字長宿",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-06",
    "lineId": "aizu",
    "number": 6,
    "name": "会津田島",
    "nameKana": "あいづたじま",
    "nameEn": "Aizu-Tajima",
    "lat": 37.2033415,
    "lng": 139.7742598,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町田島字西町甲",
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
      "limitedExp",
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-07",
    "lineId": "aizu",
    "number": 7,
    "name": "田島高校前",
    "nameKana": "たじまこうこうまえ",
    "nameEn": "Tajima-Kokomae",
    "lat": 37.2096156,
    "lng": 139.8007239,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町田島字田島裏",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-08",
    "lineId": "aizu",
    "number": 8,
    "name": "会津長野",
    "nameKana": "あいづながの",
    "nameEn": "Aizu-Nagano",
    "lat": 37.215269,
    "lng": 139.8238737,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡南会津町長野字下川原",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-09",
    "lineId": "aizu",
    "number": 9,
    "name": "養鱒公園",
    "nameKana": "ようそんこうえん",
    "nameEn": "Yoson-Koen",
    "lat": 37.2245222,
    "lng": 139.8417837,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡下郷町大字落合字下ノ原",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-10",
    "lineId": "aizu",
    "number": 10,
    "name": "ふるさと公園",
    "nameKana": "ふるさとうこうえん",
    "nameEn": "Furusato-Koen",
    "lat": 37.2431317,
    "lng": 139.8589422,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡下郷町大字沢田字下林",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-11",
    "lineId": "aizu",
    "number": 11,
    "name": "会津下郷",
    "nameKana": "あいづしもごう",
    "nameEn": "Aizu-Shimogo",
    "lat": 37.2551492,
    "lng": 139.8649061,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡下郷町大字豊成字下モ",
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
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-12",
    "lineId": "aizu",
    "number": 12,
    "name": "弥五島",
    "nameKana": "やごしま",
    "nameEn": "Yagoshima",
    "lat": 37.2664369,
    "lng": 139.8900924,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡下郷町大字弥五島字寺下",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-13",
    "lineId": "aizu",
    "number": 13,
    "name": "塔のへつり",
    "nameKana": "とうのへつり",
    "nameEn": "Tonohetsuri",
    "lat": 37.274789,
    "lng": 139.9016766,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡下郷町大字弥五島字下林",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-14",
    "lineId": "aizu",
    "number": 14,
    "name": "湯野上温泉",
    "nameKana": "ゆのかみおんせん",
    "nameEn": "Yunokami-Onsen",
    "lat": 37.3039977,
    "lng": 139.89514,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県南会津郡下郷町大字湯野上字大島",
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
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-15",
    "lineId": "aizu",
    "number": 15,
    "name": "芦ノ牧温泉南",
    "nameKana": "あしのまきおんせんみなみ",
    "nameEn": "Ashinomaki-Onsen-Minami",
    "lat": 37.3346097,
    "lng": 139.9187333,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市大戸町大字大川乙",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-16",
    "lineId": "aizu",
    "number": 16,
    "name": "大川ダム公園",
    "nameKana": "おおかわだむこうえん",
    "nameEn": "Okawa-Dam-Koen",
    "lat": 37.347152,
    "lng": 139.920871,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市大戸町大字大川甲",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-17",
    "lineId": "aizu",
    "number": 17,
    "name": "芦ノ牧温泉",
    "nameKana": "あしのまきおんせん",
    "nameEn": "Ashinomaki-Onsen",
    "lat": 37.3955469,
    "lng": 139.9322392,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市大戸町大字上三寄乙",
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
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-18",
    "lineId": "aizu",
    "number": 18,
    "name": "あまや",
    "nameKana": "あまや",
    "nameEn": "Amaya",
    "lat": 37.4167365,
    "lng": 139.9176788,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市大戸町大字雨屋",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-19",
    "lineId": "aizu",
    "number": 19,
    "name": "門田",
    "nameKana": "もんでん",
    "nameEn": "Monden",
    "lat": 37.4423911,
    "lng": 139.9137528,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市門田町大字面川",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-20",
    "lineId": "aizu",
    "number": 20,
    "name": "南若松",
    "nameKana": "みなみわかまつ",
    "nameEn": "Minami-Wakamatsu",
    "lat": 37.4591041,
    "lng": 139.9144772,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市門田町大字一ノ後",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-21",
    "lineId": "aizu",
    "number": 21,
    "name": "西若松",
    "nameKana": "にしわかまつ",
    "nameEn": "Nishi-Wakamatsu",
    "lat": 37.4859438,
    "lng": 139.9142758,
    "transfers": [
      "会津鉄道会津線",
      "JR只見線"
    ],
    "address": "福島県会津若松市材木町一丁目9-1",
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
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "AIZ-22",
    "lineId": "aizu",
    "number": 22,
    "name": "会津若松",
    "nameKana": "あいづわかまつ",
    "nameEn": "Aizu-Wakamatsu",
    "lat": 37.4879726,
    "lng": 139.9141994,
    "transfers": [
      "JR磐越西線",
      "JR只見線",
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市駅前町1-1",
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
      "aizu_ozeto"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  }
];
