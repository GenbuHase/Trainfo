import type { Station } from '../../../types';

export const YOKOSUKA_STATIONS: Station[] = [
  {
    "id": "JO-19",
    "lineId": "yokosuka",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6811274,
    "lng": 139.7671827,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR中央線",
      "JR東海道線",
      "JR横須賀線",
      "JR総武快速線",
      "JR京葉線",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東海道新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-18",
    "lineId": "yokosuka",
    "number": 2,
    "name": "新橋",
    "nameKana": "しんばし",
    "nameEn": "Shimbashi",
    "lat": 35.6662033,
    "lng": 139.7585094,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR横須賀線",
      "東京メトロ銀座線",
      "都営浅草線",
      "ゆりかもめ"
    ],
    "address": "東京都港区新橋二丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-17",
    "lineId": "yokosuka",
    "number": 3,
    "name": "品川",
    "nameKana": "しながわ",
    "nameEn": "Shinagawa",
    "lat": 35.628676,
    "lng": 139.7394901,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR横須賀線",
      "東海道新幹線",
      "京急本線"
    ],
    "address": "東京都港区高輪三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-16",
    "lineId": "yokosuka",
    "number": 4,
    "name": "西大井",
    "nameKana": "にしおおい",
    "nameEn": "Nishi-Oi",
    "lat": 35.6018553,
    "lng": 139.7216911,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線"
    ],
    "address": "東京都品川区西大井一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-15",
    "lineId": "yokosuka",
    "number": 5,
    "name": "武蔵小杉",
    "nameKana": "むさしこすぎ",
    "nameEn": "Musashi-Kosugi",
    "lat": 35.5745045,
    "lng": 139.6634772,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン",
      "JR南武線",
      "相鉄・JR直通線",
      "東急東横線",
      "東急目黒線"
    ],
    "address": "神奈川県川崎市中原区小杉町三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-14",
    "lineId": "yokosuka",
    "number": 6,
    "name": "新川崎",
    "nameKana": "しんかわさき",
    "nameEn": "Shin-Kawasaki",
    "lat": 35.5516018,
    "lng": 139.6718421,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県川崎市幸区鹿島田一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-13",
    "lineId": "yokosuka",
    "number": 7,
    "name": "横浜",
    "nameKana": "よこはま",
    "nameEn": "Yokohama",
    "lat": 35.4657932,
    "lng": 139.6222892,
    "transfers": [
      "JR東海道線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "JR京浜東北線",
      "JR根岸線",
      "JR横浜線",
      "東急東横線",
      "横浜高速鉄道みなとみらい線",
      "京急本線",
      "相鉄本線",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県横浜市西区高島二丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-12",
    "lineId": "yokosuka",
    "number": 8,
    "name": "保土ケ谷",
    "nameKana": "ほどがや",
    "nameEn": "Hodogaya",
    "lat": 35.4466264,
    "lng": 139.5997794,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県横浜市保土ケ谷区岩井町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-11",
    "lineId": "yokosuka",
    "number": 9,
    "name": "東戸塚",
    "nameKana": "ひがしとつか",
    "nameEn": "Higashi-Totsuka",
    "lat": 35.4303663,
    "lng": 139.5568268,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県横浜市戸塚区品濃町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-10",
    "lineId": "yokosuka",
    "number": 10,
    "name": "戸塚",
    "nameKana": "とつか",
    "nameEn": "Totsuka",
    "lat": 35.400582,
    "lng": 139.5342993,
    "transfers": [
      "JR東海道線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県横浜市戸塚区戸塚町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-09",
    "lineId": "yokosuka",
    "number": 11,
    "name": "大船",
    "nameKana": "おおふな",
    "nameEn": "Ofuna",
    "lat": 35.3543387,
    "lng": 139.5313165,
    "transfers": [
      "JR東海道線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "JR根岸線",
      "湘南モノレール"
    ],
    "address": "神奈川県鎌倉市大船一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-08",
    "lineId": "yokosuka",
    "number": 12,
    "name": "北鎌倉",
    "nameKana": "きたかまくら",
    "nameEn": "Kita-Kamakura",
    "lat": 35.337416,
    "lng": 139.5451771,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県鎌倉市山ノ内",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-07",
    "lineId": "yokosuka",
    "number": 13,
    "name": "鎌倉",
    "nameKana": "かまくら",
    "nameEn": "Kamakura",
    "lat": 35.3191834,
    "lng": 139.5504957,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン",
      "江ノ島電鉄線"
    ],
    "address": "神奈川県鎌倉市小町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-06",
    "lineId": "yokosuka",
    "number": 14,
    "name": "逗子",
    "nameKana": "ずし",
    "nameEn": "Zushi",
    "lat": 35.2977187,
    "lng": 139.5790738,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン",
      "京急逗子線"
    ],
    "address": "神奈川県逗子市逗子一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-05",
    "lineId": "yokosuka",
    "number": 15,
    "name": "東逗子",
    "nameKana": "ひがしずし",
    "nameEn": "Higashi-Zushi",
    "lat": 35.298836,
    "lng": 139.6016507,
    "transfers": [
      "JR横須賀線"
    ],
    "address": "神奈川県逗子市沼間一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-04",
    "lineId": "yokosuka",
    "number": 16,
    "name": "田浦",
    "nameKana": "たうら",
    "nameEn": "Taura",
    "lat": 35.2928548,
    "lng": 139.6369531,
    "transfers": [
      "JR横須賀線"
    ],
    "address": "神奈川県横須賀市田浦町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-03",
    "lineId": "yokosuka",
    "number": 17,
    "name": "横須賀",
    "nameKana": "よこすか",
    "nameEn": "Yokosuka",
    "lat": 35.2841074,
    "lng": 139.655214,
    "transfers": [
      "JR横須賀線",
      "京急本線"
    ],
    "address": "神奈川県横須賀市東逸見町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-02",
    "lineId": "yokosuka",
    "number": 18,
    "name": "衣笠",
    "nameKana": "きぬがさ",
    "nameEn": "Kinugasa",
    "lat": 35.2571568,
    "lng": 139.6611857,
    "transfers": [
      "JR横須賀線"
    ],
    "address": "神奈川県横須賀市衣笠栄町二丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JO-01",
    "lineId": "yokosuka",
    "number": 19,
    "name": "久里浜",
    "nameKana": "くりはま",
    "nameEn": "Kurihama",
    "lat": 35.2326762,
    "lng": 139.7012101,
    "transfers": [
      "JR横須賀線",
      "京急久里浜線"
    ],
    "address": "神奈川県横須賀市久里浜一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
