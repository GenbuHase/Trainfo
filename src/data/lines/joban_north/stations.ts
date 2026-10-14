import type { Station } from '../../../types';

export const JOBAN_NORTH_STATIONS: Station[] = [
  {
    "id": "JN-01",
    "lineId": "joban_north",
    "number": 1,
    "name": "取手",
    "nameKana": "とりで",
    "nameEn": "Toride",
    "lat": 35.8956226,
    "lng": 140.0627766,
    "transfers": [
      "JR常磐線快速",
      "JR常磐線各駅停車",
      "関東鉄道常総線"
    ],
    "address": "茨城県取手市中央町1-1",
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
      "special_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JN-02",
    "lineId": "joban_north",
    "number": 2,
    "name": "藤代",
    "nameKana": "ふじしろ",
    "nameEn": "Fujishiro",
    "lat": 35.9206022,
    "lng": 140.1182209,
    "transfers": [],
    "address": "茨城県取手市藤代676",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-03",
    "lineId": "joban_north",
    "number": 3,
    "name": "龍ケ崎市",
    "nameKana": "りゅうがさきし",
    "nameEn": "Ryugasakishi",
    "lat": 35.9301071,
    "lng": 140.1380364,
    "transfers": [
      "関東鉄道竜ヶ崎線"
    ],
    "address": "茨城県龍ケ崎市佐貫町647",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-04",
    "lineId": "joban_north",
    "number": 4,
    "name": "牛久",
    "nameKana": "うしく",
    "nameEn": "Ushiku",
    "lat": 35.975511,
    "lng": 140.1409829,
    "transfers": [],
    "address": "茨城県牛久市牛久町282",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-05",
    "lineId": "joban_north",
    "number": 5,
    "name": "ひたち野うしく",
    "nameKana": "ひたちのうしく",
    "nameEn": "Hitachinoushiku",
    "lat": 36.0074136,
    "lng": 140.1583239,
    "transfers": [],
    "address": "茨城県牛久市ひたち野西三丁目41-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JN-06",
    "lineId": "joban_north",
    "number": 6,
    "name": "荒川沖",
    "nameKana": "あらかわおき",
    "nameEn": "Arakawaoki",
    "lat": 36.0307524,
    "lng": 140.1661125,
    "transfers": [],
    "address": "茨城県土浦市荒川沖東二丁目1-6",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-07",
    "lineId": "joban_north",
    "number": 7,
    "name": "土浦",
    "nameKana": "つちうら",
    "nameEn": "Tsuchiura",
    "lat": 36.0784011,
    "lng": 140.2061127,
    "transfers": [],
    "address": "茨城県土浦市有明町1-30",
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
      "special_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-08",
    "lineId": "joban_north",
    "number": 8,
    "name": "神立",
    "nameKana": "かんだつ",
    "nameEn": "Kandatsu",
    "lat": 36.1203544,
    "lng": 140.248401,
    "transfers": [],
    "address": "茨城県土浦市神立中央一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-09",
    "lineId": "joban_north",
    "number": 9,
    "name": "高浜",
    "nameKana": "たかはま",
    "nameEn": "Takahama",
    "lat": 36.1637863,
    "lng": 140.2947047,
    "transfers": [],
    "address": "茨城県石岡市北高浜1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-10",
    "lineId": "joban_north",
    "number": 10,
    "name": "石岡",
    "nameKana": "いしおか",
    "nameEn": "Ishioka",
    "lat": 36.1910664,
    "lng": 140.2800099,
    "transfers": [],
    "address": "茨城県石岡市国府一丁目1-17",
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
      "special_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-11",
    "lineId": "joban_north",
    "number": 11,
    "name": "羽鳥",
    "nameKana": "はとり",
    "nameEn": "Hatori",
    "lat": 36.2473133,
    "lng": 140.2868929,
    "transfers": [],
    "address": "茨城県小美玉市羽鳥2683",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-12",
    "lineId": "joban_north",
    "number": 12,
    "name": "岩間",
    "nameKana": "いわま",
    "nameEn": "Iwama",
    "lat": 36.2952962,
    "lng": 140.2764178,
    "transfers": [],
    "address": "茨城県笠間市下郷5140",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-13",
    "lineId": "joban_north",
    "number": 13,
    "name": "友部",
    "nameKana": "ともべ",
    "nameEn": "Tomobe",
    "lat": 36.3507475,
    "lng": 140.3063097,
    "transfers": [
      "JR水戸線"
    ],
    "address": "茨城県笠間市友部駅前1-1",
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
      "special_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-14",
    "lineId": "joban_north",
    "number": 14,
    "name": "内原",
    "nameKana": "うちはら",
    "nameEn": "Uchihara",
    "lat": 36.3704589,
    "lng": 140.3532703,
    "transfers": [],
    "address": "茨城県水戸市内原町141",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-15",
    "lineId": "joban_north",
    "number": 15,
    "name": "赤塚",
    "nameKana": "あかつか",
    "nameEn": "Akatsuka",
    "lat": 36.3818996,
    "lng": 140.4152566,
    "transfers": [],
    "address": "茨城県水戸市赤塚一丁目1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JN-16",
    "lineId": "joban_north",
    "number": 16,
    "name": "偕楽園",
    "nameKana": "かいらくえん",
    "nameEn": "Kairakuen",
    "lat": 36.373119,
    "lng": 140.4562314,
    "transfers": [],
    "address": "茨城県水戸市常磐町一丁目3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "なし（下りのみ）",
      "outbound": "下り臨時ホーム"
    }
  },
  {
    "id": "JN-17",
    "lineId": "joban_north",
    "number": 17,
    "name": "水戸",
    "nameKana": "みと",
    "nameEn": "Mito",
    "lat": 36.3709421,
    "lng": 140.4769045,
    "transfers": [
      "JR水郡線",
      "鹿島臨海鉄道大洗鹿島線"
    ],
    "address": "茨城県水戸市宮町一丁目1-1",
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
      "special_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "5・6番線"
    }
  },
  {
    "id": "JN-18",
    "lineId": "joban_north",
    "number": 18,
    "name": "勝田",
    "nameKana": "かつた",
    "nameEn": "Katsuta",
    "lat": 36.3944425,
    "lng": 140.5241522,
    "transfers": [
      "ひたちなか海浜鉄道湊線"
    ],
    "address": "茨城県ひたちなか市勝田中央1-1",
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
      "special_rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2番線",
      "outbound": "3・4番線"
    }
  }
];
