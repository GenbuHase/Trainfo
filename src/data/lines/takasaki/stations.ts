import type { Station } from '../../../types';

export const TAKASAKI_STATIONS: Station[] = [
  {
    "id": "TK-02",
    "stationNumber": "JU-02",
    "lineId": "takasaki",
    "number": 1,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7134394,
    "lng": 139.7764768,
    "transfers": [
      "JR上野東京ライン",
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
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
      "rapid_urban",
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
    "id": "TK-03",
    "stationNumber": "JU-03",
    "lineId": "takasaki",
    "number": 2,
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
    "id": "TK-04",
    "stationNumber": "JU-04",
    "lineId": "takasaki",
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
      "rapid_urban",
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
    "id": "TK-05",
    "stationNumber": "JU-05",
    "lineId": "takasaki",
    "number": 4,
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
      "rapid_urban",
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
    "id": "TK-06",
    "stationNumber": "JU-06",
    "lineId": "takasaki",
    "number": 5,
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
    "id": "TK-07",
    "stationNumber": "JU-07",
    "lineId": "takasaki",
    "number": 6,
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
      "rapid_urban",
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
    "id": "TK-08",
    "lineId": "takasaki",
    "number": 7,
    "name": "宮原",
    "nameKana": "みやはら",
    "nameEn": "Miyahara",
    "lat": 35.9402425,
    "lng": 139.6095081,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県さいたま市北区宮原町三丁目",
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
    "id": "TK-09",
    "lineId": "takasaki",
    "number": 8,
    "name": "上尾",
    "nameKana": "あげお",
    "nameEn": "Ageo",
    "lat": 35.9733715,
    "lng": 139.5885608,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県上尾市柏座一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-10",
    "lineId": "takasaki",
    "number": 9,
    "name": "北上尾",
    "nameKana": "きたあげお",
    "nameEn": "Kita-Ageo",
    "lat": 35.9856025,
    "lng": 139.5772,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県上尾市原新町",
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
    "id": "TK-11",
    "lineId": "takasaki",
    "number": 10,
    "name": "桶川",
    "nameKana": "おけがわ",
    "nameEn": "Okegawa",
    "lat": 35.9987529,
    "lng": 139.5639704,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県桶川市南一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-12",
    "lineId": "takasaki",
    "number": 11,
    "name": "北本",
    "nameKana": "きたもと",
    "nameEn": "Kitamoto",
    "lat": 36.0316164,
    "lng": 139.533985,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県北本市北本一丁目",
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
    "id": "TK-13",
    "lineId": "takasaki",
    "number": 12,
    "name": "鴻巣",
    "nameKana": "こうのす",
    "nameEn": "Konosu",
    "lat": 36.0592264,
    "lng": 139.5096075,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県鴻巣市本町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-14",
    "lineId": "takasaki",
    "number": 13,
    "name": "北鴻巣",
    "nameKana": "きたこうのす",
    "nameEn": "Kita-Konosu",
    "lat": 36.0856122,
    "lng": 139.476987,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県鴻巣市赤見台一丁目",
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
    "id": "TK-15",
    "lineId": "takasaki",
    "number": 14,
    "name": "吹上",
    "nameKana": "ふきあげ",
    "nameEn": "Fukiage",
    "lat": 36.1032644,
    "lng": 139.4530178,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県鴻巣市吹上本町一丁目",
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
    "id": "TK-16",
    "lineId": "takasaki",
    "number": 15,
    "name": "行田",
    "nameKana": "ぎょうだ",
    "nameEn": "Gyoda",
    "lat": 36.1123751,
    "lng": 139.4336743,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県行田市壱里山町",
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
    "id": "TK-17",
    "lineId": "takasaki",
    "number": 16,
    "name": "熊谷",
    "nameKana": "くまがや",
    "nameEn": "Kumagaya",
    "lat": 36.1394555,
    "lng": 139.3902414,
    "transfers": [
      "JR高崎線",
      "上越新幹線",
      "北陸新幹線",
      "秩父鉄道秩父本線"
    ],
    "address": "埼玉県熊谷市筑波二丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-18",
    "lineId": "takasaki",
    "number": 17,
    "name": "籠原",
    "nameKana": "かごはら",
    "nameEn": "Kagohara",
    "lat": 36.1745746,
    "lng": 139.3304502,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県熊谷市新堀",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-19",
    "lineId": "takasaki",
    "number": 18,
    "name": "深谷",
    "nameKana": "ふかや",
    "nameEn": "Fukaya",
    "lat": 36.1915765,
    "lng": 139.2811131,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県深谷市西島町三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-20",
    "lineId": "takasaki",
    "number": 19,
    "name": "岡部",
    "nameKana": "おかべ",
    "nameEn": "Okabe",
    "lat": 36.2057532,
    "lng": 139.2376628,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県深谷市岡",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
      "commuter_rapid"
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
    "id": "TK-21",
    "lineId": "takasaki",
    "number": 20,
    "name": "本庄",
    "nameKana": "ほんじょう",
    "nameEn": "Honjo",
    "lat": 36.2361122,
    "lng": 139.1885785,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県本庄市銀座三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-22",
    "lineId": "takasaki",
    "number": 21,
    "name": "神保原",
    "nameKana": "じんぼはら",
    "nameEn": "Jimbohara",
    "lat": 36.2536123,
    "lng": 139.1492549,
    "transfers": [
      "JR高崎線"
    ],
    "address": "埼玉県児玉郡上里町大字神保原町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
      "commuter_rapid"
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
    "id": "TK-23",
    "lineId": "takasaki",
    "number": 22,
    "name": "新町",
    "nameKana": "しんまち",
    "nameEn": "Shim-Machi",
    "lat": 36.2731124,
    "lng": 139.1053512,
    "transfers": [
      "JR高崎線"
    ],
    "address": "群馬県高崎市新町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
    "id": "TK-24",
    "lineId": "takasaki",
    "number": 23,
    "name": "倉賀野",
    "nameKana": "くらがの",
    "nameEn": "Kuragano",
    "lat": 36.3004357,
    "lng": 139.0492175,
    "transfers": [
      "JR高崎線",
      "JR八高線"
    ],
    "address": "群馬県高崎市倉賀野町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
      "commuter_rapid"
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
    "id": "TK-25",
    "lineId": "takasaki",
    "number": 24,
    "name": "高崎",
    "nameKana": "たかさき",
    "nameEn": "Takasaki",
    "lat": 36.3223687,
    "lng": 139.0126097,
    "transfers": [
      "JR高崎線",
      "JR上越線",
      "JR信越本線",
      "JR吾妻線",
      "JR両毛線",
      "JR八高線",
      "上越新幹線",
      "北陸新幹線",
      "上信電鉄線"
    ],
    "address": "群馬県高崎市八島町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_urban",
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
