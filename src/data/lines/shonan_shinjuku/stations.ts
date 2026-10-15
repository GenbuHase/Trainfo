import type { Station } from '../../../types';

export const SHONAN_SHINJUKU_STATIONS: Station[] = [
  {
    "id": "JS-24",
    "lineId": "shonan_shinjuku",
    "number": 1,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "lat": 35.9063604,
    "lng": 139.624254,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR埼京線",
      "JR川越線",
      "JR湘南新宿ライン",
      "JR京浜東北線",
      "JR武蔵野線",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東武アーバンパークライン",
      "埼玉新都市交通ニューシャトル"
    ],
    "address": "埼玉県さいたま市大宮区錦町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-23",
    "lineId": "shonan_shinjuku",
    "number": 2,
    "name": "浦和",
    "nameKana": "うらわ",
    "nameEn": "Urawa",
    "lat": 35.8589467,
    "lng": 139.6570738,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR湘南新宿ライン",
      "JR京浜東北線"
    ],
    "address": "埼玉県さいたま市浦和区高砂一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-22",
    "lineId": "shonan_shinjuku",
    "number": 3,
    "name": "赤羽",
    "nameKana": "あかばね",
    "nameEn": "Akabane",
    "lat": 35.7780922,
    "lng": 139.7206948,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "JR京浜東北線"
    ],
    "address": "東京都北区赤羽一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-21",
    "lineId": "shonan_shinjuku",
    "number": 4,
    "name": "池袋",
    "nameKana": "いけぶくろ",
    "nameEn": "Ikebukuro",
    "lat": 35.7301166,
    "lng": 139.7113433,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "東武東上線",
      "西武池袋線",
      "東京メトロ丸ノ内線",
      "東京メトロ有楽町線",
      "東京メトロ副都心線"
    ],
    "address": "東京都豊島区南池袋一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-20",
    "lineId": "shonan_shinjuku",
    "number": 5,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.6891646,
    "lng": 139.7014185,
    "transfers": [
      "JR山手線",
      "JR中央線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "小田急小田原線",
      "京王線",
      "東京メトロ丸ノ内線",
      "都営新宿線",
      "都営大江戸線"
    ],
    "address": "東京都新宿区新宿三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-19",
    "lineId": "shonan_shinjuku",
    "number": 6,
    "name": "渋谷",
    "nameKana": "しぶや",
    "nameEn": "Shibuya",
    "lat": 35.6581374,
    "lng": 139.7019479,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "東急東横線",
      "東急田園都市線",
      "京王井の頭線",
      "東京メトロ銀座線",
      "東京メトロ半蔵門線",
      "東京メトロ副都心線"
    ],
    "address": "東京都渋谷区道玄坂一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-18",
    "lineId": "shonan_shinjuku",
    "number": 7,
    "name": "恵比寿",
    "nameKana": "えびす",
    "nameEn": "Ebisu",
    "lat": 35.646483,
    "lng": 139.7103229,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "東京メトロ日比谷線"
    ],
    "address": "東京都渋谷区恵比寿南一丁目",
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
    "id": "JS-17",
    "lineId": "shonan_shinjuku",
    "number": 8,
    "name": "大崎",
    "nameKana": "おおさき",
    "nameEn": "Osaki",
    "lat": 35.6193482,
    "lng": 139.7283987,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "東京臨海高速鉄道りんかい線"
    ],
    "address": "東京都品川区大崎一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "JS-15",
    "lineId": "shonan_shinjuku",
    "number": 9,
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
    "id": "JS-08",
    "lineId": "shonan_shinjuku",
    "number": 10,
    "name": "横浜",
    "nameKana": "よこはま",
    "nameEn": "Yokohama",
    "lat": 35.4658955,
    "lng": 139.6221174,
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
    "id": "JS-03",
    "lineId": "shonan_shinjuku",
    "number": 11,
    "name": "戸塚",
    "nameKana": "とつか",
    "nameEn": "Totsuka",
    "lat": 35.4006169,
    "lng": 139.5344609,
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
    "id": "JS-01",
    "lineId": "shonan_shinjuku",
    "number": 12,
    "name": "大船",
    "nameKana": "おおふな",
    "nameEn": "Ofuna",
    "lat": 35.354372,
    "lng": 139.5311941,
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
  }
];
