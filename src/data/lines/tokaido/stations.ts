import type { Station } from '../../../types';

export const TOKAIDO_STATIONS: Station[] = [
  {
    "id": "JT-01",
    "lineId": "tokaido",
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
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-02",
    "lineId": "tokaido",
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
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-03",
    "lineId": "tokaido",
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
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-04",
    "lineId": "tokaido",
    "number": 4,
    "name": "川崎",
    "nameKana": "かわさき",
    "nameEn": "Kawasaki",
    "lat": 35.5312563,
    "lng": 139.697085,
    "transfers": [
      "JR東海道線",
      "JR京浜東北線",
      "JR南武線",
      "京急本線",
      "京急大師線"
    ],
    "address": "神奈川県川崎市川崎区駅前本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid"
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
    "id": "JT-05",
    "lineId": "tokaido",
    "number": 5,
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
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-06",
    "lineId": "tokaido",
    "number": 6,
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
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid"
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
    "id": "JT-07",
    "lineId": "tokaido",
    "number": 7,
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
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-08",
    "lineId": "tokaido",
    "number": 8,
    "name": "藤沢",
    "nameKana": "ふじさわ",
    "nameEn": "Fujisawa",
    "lat": 35.3386826,
    "lng": 139.4862632,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン",
      "小田急江ノ島線",
      "江ノ島電鉄線"
    ],
    "address": "神奈川県藤沢市藤沢",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-09",
    "lineId": "tokaido",
    "number": 9,
    "name": "辻堂",
    "nameKana": "つじどう",
    "nameEn": "Tsujido",
    "lat": 35.3367611,
    "lng": 139.4464206,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県藤沢市辻堂一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-10",
    "lineId": "tokaido",
    "number": 10,
    "name": "茅ケ崎",
    "nameKana": "ちがさき",
    "nameEn": "Chigasaki",
    "lat": 35.3304237,
    "lng": 139.407581,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン",
      "JR相模線"
    ],
    "address": "神奈川県茅ヶ崎市元町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-11",
    "lineId": "tokaido",
    "number": 11,
    "name": "平塚",
    "nameKana": "ひらつか",
    "nameEn": "Hiratsuka",
    "lat": 35.3272631,
    "lng": 139.3492239,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県平塚市宝町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid"
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
    "id": "JT-12",
    "lineId": "tokaido",
    "number": 12,
    "name": "大磯",
    "nameKana": "おおいそ",
    "nameEn": "Oiso",
    "lat": 35.3112739,
    "lng": 139.3134213,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県中郡大磯町大磯",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-13",
    "lineId": "tokaido",
    "number": 13,
    "name": "二宮",
    "nameKana": "にのみや",
    "nameEn": "Ninomiya",
    "lat": 35.2987247,
    "lng": 139.2576496,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県中郡二宮町二宮",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-14",
    "lineId": "tokaido",
    "number": 14,
    "name": "国府津",
    "nameKana": "こうづ",
    "nameEn": "Kozu",
    "lat": 35.2812092,
    "lng": 139.2142253,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン",
      "JR御殿場線"
    ],
    "address": "神奈川県小田原市国府津四丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid"
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
    "id": "JT-15",
    "lineId": "tokaido",
    "number": 15,
    "name": "鴨宮",
    "nameKana": "かものみや",
    "nameEn": "Kamonomiya",
    "lat": 35.2756843,
    "lng": 139.180261,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県小田原市鴨宮",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-16",
    "lineId": "tokaido",
    "number": 16,
    "name": "小田原",
    "nameKana": "おだわら",
    "nameEn": "Odawara",
    "lat": 35.2561433,
    "lng": 139.1558376,
    "transfers": [
      "JR東海道線",
      "JR湘南新宿ライン",
      "東海道新幹線",
      "小田急小田原線",
      "箱根登山鉄道線",
      "伊豆箱根鉄道大雄山線"
    ],
    "address": "神奈川県小田原市栄町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
      "commuter_rapid",
      "special_rapid",
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
    "id": "JT-17",
    "lineId": "tokaido",
    "number": 17,
    "name": "早川",
    "nameKana": "はやかわ",
    "nameEn": "Hayakawa",
    "lat": 35.2391958,
    "lng": 139.1451554,
    "transfers": [
      "JR東海道線"
    ],
    "address": "神奈川県小田原市早川一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-18",
    "lineId": "tokaido",
    "number": 18,
    "name": "根府川",
    "nameKana": "ねぶかわ",
    "nameEn": "Nebukawa",
    "lat": 35.2026861,
    "lng": 139.1386693,
    "transfers": [
      "JR東海道線"
    ],
    "address": "神奈川県小田原市根府川",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-19",
    "lineId": "tokaido",
    "number": 19,
    "name": "真鶴",
    "nameKana": "まなづる",
    "nameEn": "Manazuru",
    "lat": 35.1569849,
    "lng": 139.1322196,
    "transfers": [
      "JR東海道線"
    ],
    "address": "神奈川県足柄下郡真鶴町真鶴",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "JT-20",
    "lineId": "tokaido",
    "number": 20,
    "name": "湯河原",
    "nameKana": "ゆがわら",
    "nameEn": "Yugawara",
    "lat": 35.1462899,
    "lng": 139.102151,
    "transfers": [
      "JR東海道線"
    ],
    "address": "神奈川県足柄下郡湯河原町宮下",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
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
    "id": "JT-21",
    "lineId": "tokaido",
    "number": 21,
    "name": "熱海",
    "nameKana": "あたみ",
    "nameEn": "Atami",
    "lat": 35.1039035,
    "lng": 139.0780587,
    "transfers": [
      "JR東海道線",
      "JR伊東線",
      "東海道新幹線"
    ],
    "address": "静岡県熱海市田原本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
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
    "id": "CA-01",
    "lineId": "tokaido",
    "number": 22,
    "name": "函南",
    "nameKana": "かんなみ",
    "nameEn": "Kannami",
    "lat": 35.1087265,
    "lng": 138.9709903,
    "transfers": [
      "JR東海道線"
    ],
    "address": "静岡県田方郡函南町大竹",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty"
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
    "id": "CA-02",
    "lineId": "tokaido",
    "number": 23,
    "name": "三島",
    "nameKana": "みしま",
    "nameEn": "Mishima",
    "lat": 35.1262974,
    "lng": 138.9115159,
    "transfers": [
      "JR東海道線",
      "東海道新幹線",
      "伊豆箱根鉄道駿豆線"
    ],
    "address": "静岡県三島市一番町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
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
    "id": "CA-03",
    "lineId": "tokaido",
    "number": 24,
    "name": "沼津",
    "nameKana": "ぬまづ",
    "nameEn": "Numazu",
    "lat": 35.1031271,
    "lng": 138.8593352,
    "transfers": [
      "JR東海道線",
      "JR御殿場線"
    ],
    "address": "静岡県沼津市大手町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_acty",
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
  }
];
