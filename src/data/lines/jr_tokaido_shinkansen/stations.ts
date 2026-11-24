import type { Station } from '../../../types';

export const TOKAIDO_SHINKANSEN_STATIONS: Station[] = [
  {
    "id": "TKS-01",
    "lineId": "jr_tokaido_shinkansen",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6810367,
    "lng": 139.7674402,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR中央線",
      "JR総武快速線",
      "JR横須賀線",
      "JR京葉線",
      "JR上野東京ライン",
      "JR東北新幹線",
      "JR上越新幹線",
      "JR北陸新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "nozomi",
      "hikari",
      "kodama"
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
    "id": "TKS-02",
    "lineId": "jr_tokaido_shinkansen",
    "number": 2,
    "name": "品川",
    "nameKana": "しながわ",
    "nameEn": "Shinagawa",
    "lat": 35.62907,
    "lng": 139.73993,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR横須賀線",
      "JR上野東京ライン",
      "京急本線"
    ],
    "address": "東京都港区高輪三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "nozomi",
      "hikari",
      "kodama"
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
    "id": "TKS-03",
    "lineId": "jr_tokaido_shinkansen",
    "number": 3,
    "name": "新横浜",
    "nameKana": "しんよこはま",
    "nameEn": "Shin-Yokohama",
    "lat": 35.50691,
    "lng": 139.61711,
    "transfers": [
      "JR横浜線",
      "相鉄新横浜線",
      "東急新横浜線",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県横浜市港北区新横浜三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "nozomi",
      "hikari",
      "kodama"
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
    "id": "TKS-04",
    "lineId": "jr_tokaido_shinkansen",
    "number": 4,
    "name": "小田原",
    "nameKana": "おだわら",
    "nameEn": "Odawara",
    "lat": 35.25741,
    "lng": 139.15582,
    "transfers": [
      "JR東海道線",
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
      "hikari",
      "kodama"
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
    "id": "TKS-05",
    "lineId": "jr_tokaido_shinkansen",
    "number": 5,
    "name": "熱海",
    "nameKana": "あたみ",
    "nameEn": "Atami",
    "lat": 35.104081,
    "lng": 139.0779086,
    "transfers": [
      "JR東海道線",
      "JR伊東線",
      "JR東海道本線（熱海～豊橋）"
    ],
    "address": "静岡県熱海市田原本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-06",
    "lineId": "jr_tokaido_shinkansen",
    "number": 6,
    "name": "三島",
    "nameKana": "みしま",
    "nameEn": "Mishima",
    "lat": 35.1265664,
    "lng": 138.911144,
    "transfers": [
      "伊豆箱根鉄道駿豆線"
    ],
    "address": "静岡県三島市一番町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-07",
    "lineId": "jr_tokaido_shinkansen",
    "number": 7,
    "name": "新富士",
    "nameKana": "しんふじ",
    "nameEn": "Shin-Fuji",
    "lat": 35.142,
    "lng": 138.66255,
    "transfers": [],
    "address": "静岡県富士市川成島",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kodama"
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
    "id": "TKS-08",
    "lineId": "jr_tokaido_shinkansen",
    "number": 8,
    "name": "静岡",
    "nameKana": "しずおか",
    "nameEn": "Shizuoka",
    "lat": 34.97116,
    "lng": 138.3886,
    "transfers": [
      "静岡鉄道静岡清水線"
    ],
    "address": "静岡県静岡市葵区黒金町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-09",
    "lineId": "jr_tokaido_shinkansen",
    "number": 9,
    "name": "掛川",
    "nameKana": "かけがわ",
    "nameEn": "Kakegawa",
    "lat": 34.76929,
    "lng": 138.01637,
    "transfers": [
      "天竜浜名湖鉄道天竜浜名湖線"
    ],
    "address": "静岡県掛川市南一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kodama"
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
    "id": "TKS-10",
    "lineId": "jr_tokaido_shinkansen",
    "number": 10,
    "name": "浜松",
    "nameKana": "はままつ",
    "nameEn": "Hamamatsu",
    "lat": 34.70384,
    "lng": 137.73548,
    "transfers": [
      "遠州鉄道鉄道線"
    ],
    "address": "静岡県浜松市中央区砂山町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-11",
    "lineId": "jr_tokaido_shinkansen",
    "number": 11,
    "name": "豊橋",
    "nameKana": "とよはし",
    "nameEn": "Toyohashi",
    "lat": 34.76166,
    "lng": 137.38294,
    "transfers": [
      "JR飯田線",
      "名鉄名古屋本線",
      "豊橋鉄道渥美線",
      "豊橋鉄道東田本線"
    ],
    "address": "愛知県豊橋市花田町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-12",
    "lineId": "jr_tokaido_shinkansen",
    "number": 12,
    "name": "三河安城",
    "nameKana": "みかわあんじょう",
    "nameEn": "Mikawa-Anjo",
    "lat": 34.96901,
    "lng": 137.06032,
    "transfers": [],
    "address": "愛知県安城市三河安城町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kodama"
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
    "id": "TKS-13",
    "lineId": "jr_tokaido_shinkansen",
    "number": 13,
    "name": "名古屋",
    "nameKana": "なごや",
    "nameEn": "Nagoya",
    "lat": 35.17208,
    "lng": 136.88033,
    "transfers": [
      "JR中央本線（名古屋～塩尻）",
      "JR関西本線（名古屋～亀山）",
      "名鉄名古屋本線",
      "近鉄名古屋線",
      "あおなみ線",
      "名古屋市営地下鉄東山線",
      "名古屋市営地下鉄桜通線"
    ],
    "address": "愛知県名古屋市中村区名駅一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "nozomi",
      "hikari",
      "kodama"
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
    "id": "TKS-14",
    "lineId": "jr_tokaido_shinkansen",
    "number": 14,
    "name": "岐阜羽島",
    "nameKana": "ぎふはしま",
    "nameEn": "Gifu-Hashima",
    "lat": 35.31447,
    "lng": 136.68726,
    "transfers": [
      "名鉄羽島線"
    ],
    "address": "岐阜県羽島市舟橋町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-15",
    "lineId": "jr_tokaido_shinkansen",
    "number": 15,
    "name": "米原",
    "nameKana": "まいばら",
    "nameEn": "Maibara",
    "lat": 35.31579,
    "lng": 136.290606,
    "transfers": [
      "JR北陸本線（米原～敦賀）",
      "近江鉄道本線"
    ],
    "address": "滋賀県米原市米原",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hikari",
      "kodama"
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
    "id": "TKS-16",
    "lineId": "jr_tokaido_shinkansen",
    "number": 16,
    "name": "京都",
    "nameKana": "きょうと",
    "nameEn": "Kyoto",
    "lat": 34.98574,
    "lng": 135.75869,
    "transfers": [
      "JR山陰本線（嵯峨野線）",
      "JR奈良線",
      "近鉄京都線",
      "京都市営地下鉄烏丸線"
    ],
    "address": "京都府京都市下京区東塩小路釜殿町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "nozomi",
      "hikari",
      "kodama"
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
    "id": "TKS-17",
    "lineId": "jr_tokaido_shinkansen",
    "number": 17,
    "name": "新大阪",
    "nameKana": "しんおおさか",
    "nameEn": "Shin-Osaka",
    "lat": 34.73443,
    "lng": 135.50225,
    "transfers": [
      "JRおおさか東線",
      "Osaka Metro御堂筋線"
    ],
    "address": "大阪府大阪市淀川区西中島五丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "nozomi",
      "hikari",
      "kodama"
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
