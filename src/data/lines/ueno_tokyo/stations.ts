import type { Station } from '../../../types';

export const UENO_TOKYO_STATIONS: Station[] = [
  {
    "id": "UT-01",
    "lineId": "ueno_tokyo",
    "number": 1,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "lat": 35.9064378,
    "lng": 139.6246184,
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
      "commuter_rapid",
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
    "id": "UT-02",
    "lineId": "ueno_tokyo",
    "number": 2,
    "name": "さいたま新都心",
    "nameKana": "さいたましんとしん",
    "nameEn": "Saitama-Shintoshin",
    "lat": 35.8936292,
    "lng": 139.6339271,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR京浜東北線"
    ],
    "address": "埼玉県さいたま市大宮区吉敷町四丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "UT-03",
    "lineId": "ueno_tokyo",
    "number": 3,
    "name": "浦和",
    "nameKana": "うらわ",
    "nameEn": "Urawa",
    "lat": 35.8590152,
    "lng": 139.6572525,
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
      "commuter_rapid",
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
    "id": "UT-04",
    "lineId": "ueno_tokyo",
    "number": 4,
    "name": "赤羽",
    "nameKana": "あかばね",
    "nameEn": "Akabane",
    "lat": 35.7781609,
    "lng": 139.7208447,
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
      "commuter_rapid",
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
    "id": "UT-05",
    "lineId": "ueno_tokyo",
    "number": 5,
    "name": "尾久",
    "nameKana": "おく",
    "nameEn": "Oku",
    "lat": 35.7469489,
    "lng": 139.7536899,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線"
    ],
    "address": "東京都北区昭和町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
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
    "id": "UT-06",
    "lineId": "ueno_tokyo",
    "number": 6,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7134394,
    "lng": 139.7764768,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
      "JR高崎線",
      "JR常磐線快速",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東京メトロ銀座線",
      "東京メトロ日比谷線",
      "京成本線"
    ],
    "address": "東京都台東区上野七丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "special_rapid",
      "commuter_rapid",
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
    "id": "UT-07",
    "lineId": "ueno_tokyo",
    "number": 7,
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
      "special_rapid",
      "commuter_rapid",
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
    "id": "UT-08",
    "lineId": "ueno_tokyo",
    "number": 8,
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
      "special_rapid",
      "commuter_rapid",
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
    "id": "UT-09",
    "lineId": "ueno_tokyo",
    "number": 9,
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
      "special_rapid",
      "commuter_rapid",
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
    "id": "UT-10",
    "lineId": "ueno_tokyo",
    "number": 10,
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
      "special_rapid",
      "commuter_rapid"
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
    "id": "UT-11",
    "lineId": "ueno_tokyo",
    "number": 11,
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
      "special_rapid",
      "commuter_rapid",
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
    "id": "UT-12",
    "lineId": "ueno_tokyo",
    "number": 12,
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
      "special_rapid",
      "commuter_rapid"
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
    "id": "UT-13",
    "lineId": "ueno_tokyo",
    "number": 13,
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
      "special_rapid",
      "commuter_rapid",
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
