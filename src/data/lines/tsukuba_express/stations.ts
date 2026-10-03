// 首都圏新都市鉄道つくばエクスプレス 駅定義（全20駅）
import type { Station } from '../../../types';

export const TX_STATIONS: Station[] = [
  {
    "id": "TX-01",
    "lineId": "tsukuba_express",
    "number": 1,
    "name": "秋葉原",
    "nameKana": "あきはばら",
    "nameEn": "Akihabara",
    "lat": 35.698837,
    "lng": 139.774261,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR総武線各駅停車",
      "東京メトロ日比谷線"
    ],
    "address": "東京都千代田区神田佐久間町一丁目",
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
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "TX-02",
    "lineId": "tsukuba_express",
    "number": 2,
    "name": "新御徒町",
    "nameKana": "しんおかちまち",
    "nameEn": "Shin-Okachimachi",
    "lat": 35.707072,
    "lng": 139.782048,
    "transfers": [
      "都営大江戸線"
    ],
    "address": "東京都台東区小島二丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid",
      "rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-03",
    "lineId": "tsukuba_express",
    "number": 3,
    "name": "浅草",
    "nameKana": "あさくさ",
    "nameEn": "Asakusa",
    "lat": 35.713595,
    "lng": 139.792367,
    "transfers": [
      "東京メトロ銀座線",
      "都営浅草線",
      "東武スカイツリーライン"
    ],
    "address": "東京都台東区西浅草三丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-04",
    "lineId": "tsukuba_express",
    "number": 4,
    "name": "南千住",
    "nameKana": "みなみせんじゅ",
    "nameEn": "Minami-Senju",
    "lat": 35.732877,
    "lng": 139.79882,
    "transfers": [
      "JR常磐線各駅停車",
      "JR常磐線快速",
      "東京メトロ日比谷線"
    ],
    "address": "東京都荒川区南千住四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid",
      "rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-05",
    "lineId": "tsukuba_express",
    "number": 5,
    "name": "北千住",
    "nameKana": "きたせんじゅ",
    "nameEn": "Kita-Senju",
    "lat": 35.74874,
    "lng": 139.804772,
    "transfers": [
      "JR常磐線各駅停車",
      "JR常磐線快速",
      "東京メトロ日比谷線",
      "東京メトロ千代田線",
      "東武スカイツリーライン"
    ],
    "address": "東京都足立区千住旭町",
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
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-06",
    "lineId": "tsukuba_express",
    "number": 6,
    "name": "青井",
    "nameKana": "あおい",
    "nameEn": "Aoi",
    "lat": 35.771746,
    "lng": 139.820289,
    "transfers": [],
    "address": "東京都足立区青井三丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-07",
    "lineId": "tsukuba_express",
    "number": 7,
    "name": "六町",
    "nameKana": "ろくちょう",
    "nameEn": "Rokucho",
    "lat": 35.784858,
    "lng": 139.821846,
    "transfers": [],
    "address": "東京都足立区六町四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-08",
    "lineId": "tsukuba_express",
    "number": 8,
    "name": "八潮",
    "nameKana": "やしお",
    "nameEn": "Yashio",
    "lat": 35.807815,
    "lng": 139.84482,
    "transfers": [],
    "address": "埼玉県八潮市大字大瀬",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "TX-09",
    "lineId": "tsukuba_express",
    "number": 9,
    "name": "三郷中央",
    "nameKana": "みさとちゅうおう",
    "nameEn": "Misato-chuo",
    "lat": 35.824528,
    "lng": 139.87838,
    "transfers": [],
    "address": "埼玉県三郷市中央一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-10",
    "lineId": "tsukuba_express",
    "number": 10,
    "name": "南流山",
    "nameKana": "みなみながれやま",
    "nameEn": "Minami-Nagareyama",
    "lat": 35.838574,
    "lng": 139.903018,
    "transfers": [
      "JR武蔵野線"
    ],
    "address": "千葉県流山市南流山二丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-11",
    "lineId": "tsukuba_express",
    "number": 11,
    "name": "流山セントラルパーク",
    "nameKana": "ながれやまぜんとらるぱーく",
    "nameEn": "Nagareyama-centralpark",
    "lat": 35.854589,
    "lng": 139.915218,
    "transfers": [],
    "address": "千葉県流山市前平井",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-12",
    "lineId": "tsukuba_express",
    "number": 12,
    "name": "流山おおたかの森",
    "nameKana": "ながれやまおおたかのもり",
    "nameEn": "Nagareyama-otakanomori",
    "lat": 35.87183,
    "lng": 139.925038,
    "transfers": [
      "東武アーバンパークライン"
    ],
    "address": "千葉県流山市おおたかの森西一丁目",
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
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "TX-13",
    "lineId": "tsukuba_express",
    "number": 13,
    "name": "柏の葉キャンパス",
    "nameKana": "かしわのはきゃんぱす",
    "nameEn": "Kashiwanoha-campus",
    "lat": 35.893419,
    "lng": 139.952506,
    "transfers": [],
    "address": "千葉県柏市若柴",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-14",
    "lineId": "tsukuba_express",
    "number": 14,
    "name": "柏たなか",
    "nameKana": "かしわたなか",
    "nameEn": "Kashiwa-tanaka",
    "lat": 35.910974,
    "lng": 139.957546,
    "transfers": [],
    "address": "千葉県柏市小青田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-15",
    "lineId": "tsukuba_express",
    "number": 15,
    "name": "守谷",
    "nameKana": "もりや",
    "nameEn": "Moriya",
    "lat": 35.950173,
    "lng": 139.991771,
    "transfers": [
      "関東鉄道常総線"
    ],
    "address": "茨城県守谷市中央四丁目",
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
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "TX-16",
    "lineId": "tsukuba_express",
    "number": 16,
    "name": "みらい平",
    "nameKana": "みらいだいら",
    "nameEn": "Miraidaira",
    "lat": 35.994399,
    "lng": 140.038207,
    "transfers": [],
    "address": "茨城県つくばみらい市陽光台一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-17",
    "lineId": "tsukuba_express",
    "number": 17,
    "name": "みどりの",
    "nameKana": "みどりの",
    "nameEn": "Midorino",
    "lat": 36.029889,
    "lng": 140.056196,
    "transfers": [],
    "address": "茨城県つくば市みどりの一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-18",
    "lineId": "tsukuba_express",
    "number": 18,
    "name": "万博記念公園",
    "nameKana": "ばんぱくきねんこうえん",
    "nameEn": "Bampaku-kinenkoen",
    "lat": 36.058324,
    "lng": 140.059404,
    "transfers": [],
    "address": "茨城県つくば市島名",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-19",
    "lineId": "tsukuba_express",
    "number": 19,
    "name": "研究学園",
    "nameKana": "けんきゅうがくえん",
    "nameEn": "Kenkyu-gakuen",
    "lat": 36.082153,
    "lng": 140.082391,
    "transfers": [],
    "address": "茨城県つくば市研究学園五丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_rapid",
      "commuter_rapid"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TX-20",
    "lineId": "tsukuba_express",
    "number": 20,
    "name": "つくば",
    "nameKana": "つくば",
    "nameEn": "Tsukuba",
    "lat": 36.082669,
    "lng": 140.111172,
    "transfers": [],
    "address": "茨城県つくば市吾妻二丁目",
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
      "commuter_rapid",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  }
];
