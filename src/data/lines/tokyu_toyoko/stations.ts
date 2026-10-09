// 東急東横線 駅メタデータ定義 (渋谷 〜 横浜 全21駅)
import type { Station } from '../../../types';

export const TOKYU_TOYOKO_STATIONS: Station[] = [
  {
    "id": "TY-01",
    "lineId": "tokyu_toyoko",
    "number": 1,
    "name": "渋谷",
    "nameKana": "しぶや",
    "nameEn": "Shibuya",
    "lat": 35.6586186,
    "lng": 139.7027508,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "東京メトロ副都心線",
      "東京メトロ半蔵門線",
      "東京メトロ銀座線",
      "東急田園都市線",
      "京王井の頭線"
    ],
    "address": "東京都渋谷区渋谷二丁目21-13",
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
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "5・6番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-02",
    "lineId": "tokyu_toyoko",
    "number": 2,
    "name": "代官山",
    "nameKana": "だいかんやま",
    "nameEn": "Daikanyama",
    "lat": 35.6489814,
    "lng": 139.7032128,
    "transfers": [],
    "address": "東京都渋谷区代官山町19-4",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-03",
    "lineId": "tokyu_toyoko",
    "number": 3,
    "name": "中目黒",
    "nameKana": "なかめぐろ",
    "nameEn": "Naka-meguro",
    "lat": 35.6441774,
    "lng": 139.6990479,
    "transfers": [
      "東京メトロ日比谷線"
    ],
    "address": "東京都目黒区上目黒三丁目4-1",
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
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-04",
    "lineId": "tokyu_toyoko",
    "number": 4,
    "name": "祐天寺",
    "nameKana": "ゆうてんじ",
    "nameEn": "Yutenji",
    "lat": 35.6373859,
    "lng": 139.6917409,
    "transfers": [],
    "address": "東京都目黒区祐天寺二丁目13-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-05",
    "lineId": "tokyu_toyoko",
    "number": 5,
    "name": "学芸大学",
    "nameKana": "がくげいだいがく",
    "nameEn": "Gakugei-daigaku",
    "lat": 35.6289947,
    "lng": 139.6853765,
    "transfers": [],
    "address": "東京都目黒区鷹番三丁目2-1",
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
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-06",
    "lineId": "tokyu_toyoko",
    "number": 6,
    "name": "都立大学",
    "nameKana": "とりつだいがく",
    "nameEn": "Toritsu-daigaku",
    "lat": 35.6181745,
    "lng": 139.6775607,
    "transfers": [],
    "address": "東京都目黒区中根一丁目3-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-07",
    "lineId": "tokyu_toyoko",
    "number": 7,
    "name": "自由が丘",
    "nameKana": "じゆうがおか",
    "nameEn": "Jiyugaoka",
    "lat": 35.6074213,
    "lng": 139.6687002,
    "transfers": [
      "東急大井町線"
    ],
    "address": "東京都目黒区自由が丘一丁目9-8",
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
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-08",
    "lineId": "tokyu_toyoko",
    "number": 8,
    "name": "田園調布",
    "nameKana": "でんえんちょうふ",
    "nameEn": "Denen-chofu",
    "lat": 35.5968212,
    "lng": 139.6670868,
    "transfers": [
      "東急目黒線"
    ],
    "address": "東京都大田区田園調布三丁目25-18",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-09",
    "lineId": "tokyu_toyoko",
    "number": 9,
    "name": "多摩川",
    "nameKana": "たまがわ",
    "nameEn": "Tamagawa",
    "lat": 35.5893322,
    "lng": 139.6689617,
    "transfers": [
      "東急目黒線",
      "東急東急多摩川線"
    ],
    "address": "東京都大田区田園調布一丁目53-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-10",
    "lineId": "tokyu_toyoko",
    "number": 10,
    "name": "新丸子",
    "nameKana": "しんまるこ",
    "nameEn": "Shin-maruko",
    "lat": 35.5796931,
    "lng": 139.6622434,
    "transfers": [
      "東急目黒線"
    ],
    "address": "神奈川県川崎市中原区新丸子町766",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "TY-11",
    "lineId": "tokyu_toyoko",
    "number": 11,
    "name": "武蔵小杉",
    "nameKana": "むさしこすぎ",
    "nameEn": "Musashi-kosugi",
    "lat": 35.5750242,
    "lng": 139.6596956,
    "transfers": [
      "JR南武線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "JR相鉄線直通列車",
      "東急目黒線",
      "相鉄新横浜線"
    ],
    "address": "神奈川県川崎市中原区小杉町三丁目472",
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
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-12",
    "lineId": "tokyu_toyoko",
    "number": 12,
    "name": "元住吉",
    "nameKana": "もとすみよし",
    "nameEn": "Motosumiyoshi",
    "lat": 35.5645511,
    "lng": 139.6542797,
    "transfers": [
      "東急目黒線"
    ],
    "address": "神奈川県川崎市中原区木月三丁目2-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "2・3番線"
    }
  },
  {
    "id": "TY-13",
    "lineId": "tokyu_toyoko",
    "number": 13,
    "name": "日吉",
    "nameKana": "ひよし",
    "nameEn": "Hiyoshi",
    "lat": 35.553255,
    "lng": 139.6468453,
    "transfers": [
      "東急目黒線",
      "東急新横浜線",
      "横浜市営地下鉄グリーンライン"
    ],
    "address": "神奈川県横浜市港北区日吉二丁目1-1",
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
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-14",
    "lineId": "tokyu_toyoko",
    "number": 14,
    "name": "綱島",
    "nameKana": "つなしま",
    "nameEn": "Tsunashima",
    "lat": 35.5367375,
    "lng": 139.6358742,
    "transfers": [],
    "address": "神奈川県横浜市港北区綱島西一丁目1-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-15",
    "lineId": "tokyu_toyoko",
    "number": 15,
    "name": "大倉山",
    "nameKana": "おおくらやま",
    "nameEn": "Okurayama",
    "lat": 35.521855,
    "lng": 139.6310237,
    "transfers": [],
    "address": "神奈川県横浜市港北区大倉山一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-16",
    "lineId": "tokyu_toyoko",
    "number": 16,
    "name": "菊名",
    "nameKana": "きくな",
    "nameEn": "Kikuna",
    "lat": 35.5096856,
    "lng": 139.6302732,
    "transfers": [
      "JR横浜線"
    ],
    "address": "神奈川県横浜市港北区菊名七丁目1-1",
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
      "commuter_ltd_exp",
      "ltd_exp"
    ],
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "TY-17",
    "lineId": "tokyu_toyoko",
    "number": 17,
    "name": "妙蓮寺",
    "nameKana": "みょうれんじ",
    "nameEn": "Myorenji",
    "lat": 35.4985364,
    "lng": 139.6332256,
    "transfers": [],
    "address": "神奈川県横浜市港北区菊名一丁目1-38",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-18",
    "lineId": "tokyu_toyoko",
    "number": 18,
    "name": "白楽",
    "nameKana": "はくらく",
    "nameEn": "Hakuraku",
    "lat": 35.4896753,
    "lng": 139.6279215,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区白楽100",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-19",
    "lineId": "tokyu_toyoko",
    "number": 19,
    "name": "東白楽",
    "nameKana": "ひがしはくらく",
    "nameEn": "Higashi-hakuraku",
    "lat": 35.4832475,
    "lng": 139.6294747,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区白楽12",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-20",
    "lineId": "tokyu_toyoko",
    "number": 20,
    "name": "反町",
    "nameKana": "たんまち",
    "nameEn": "Tammachi",
    "lat": 35.4746815,
    "lng": 139.6252491,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区上反町一丁目1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "TY-21",
    "lineId": "tokyu_toyoko",
    "number": 21,
    "name": "横浜",
    "nameKana": "よこはま",
    "nameEn": "Yokohama",
    "lat": 35.466292,
    "lng": 139.6220811,
    "transfers": [
      "JR東海道線",
      "JR京浜東北線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "JR横浜線",
      "JR根岸線",
      "京急本線",
      "相鉄本線",
      "横浜市営地下鉄ブルーライン",
      "みなとみらい線"
    ],
    "address": "神奈川県横浜市西区南幸一丁目1-1",
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
      "commuter_ltd_exp",
      "ltd_exp",
      "strain"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  }
];
