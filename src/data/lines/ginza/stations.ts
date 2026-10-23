import type { Station } from '../../../types';

export const GINZA_STATIONS: Station[] = [
  {
    "lineId": "ginza",
    "id": "G-01",
    "stationNumber": "G-01",
    "number": 1,
    "name": "渋谷",
    "nameKana": "しぶや",
    "nameEn": "Shibuya",
    "lat": 35.6590617,
    "lng": 139.7024251,
    "transfers": [
      "東京メトロ半蔵門線",
      "東京メトロ副都心線",
      "東急田園都市線",
      "東急東横線",
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "京王井の頭線"
    ],
    "address": "東京都渋谷区道玄坂一丁目1-2",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-02",
    "stationNumber": "G-02",
    "number": 2,
    "name": "表参道",
    "nameKana": "おもてさんどう",
    "nameEn": "Omote-sando",
    "lat": 35.6650556,
    "lng": 139.7124195,
    "transfers": [
      "東京メトロ千代田線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都港区北青山三丁目6-12",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-03",
    "stationNumber": "G-03",
    "number": 3,
    "name": "外苑前",
    "nameKana": "がいえんまえ",
    "nameEn": "Gaiemmae",
    "lat": 35.6705551,
    "lng": 139.7178217,
    "transfers": [],
    "address": "東京都港区北青山二丁目7-16",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-04",
    "stationNumber": "G-04",
    "number": 4,
    "name": "青山一丁目",
    "nameKana": "あおやまいっちょうめ",
    "nameEn": "Aoyama-itchome",
    "lat": 35.6726745,
    "lng": 139.7239341,
    "transfers": [
      "東京メトロ半蔵門線",
      "都営大江戸線"
    ],
    "address": "東京都港区南青山一丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-05",
    "stationNumber": "G-05",
    "number": 5,
    "name": "赤坂見附",
    "nameKana": "あかさかみつけ",
    "nameEn": "Akasaka-mitsuke",
    "lat": 35.6763066,
    "lng": 139.7374601,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ有楽町線（永田町駅）",
      "東京メトロ半蔵門線（永田町駅）",
      "東京メトロ南北線（永田町駅）"
    ],
    "address": "東京都港区赤坂三丁目1-6",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-06",
    "stationNumber": "G-06",
    "number": 6,
    "name": "溜池山王",
    "nameKana": "ためいけさんのう",
    "nameEn": "Tameike-sanno",
    "lat": 35.6715818,
    "lng": 139.742043,
    "transfers": [
      "東京メトロ南北線",
      "東京メトロ丸ノ内線（国会議事堂前駅）",
      "東京メトロ千代田線（国会議事堂前駅）"
    ],
    "address": "東京都千代田区永田町二丁目11-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-07",
    "stationNumber": "G-07",
    "number": 7,
    "name": "虎ノ門",
    "nameKana": "とらのもん",
    "nameEn": "Toranomon",
    "lat": 35.67015,
    "lng": 139.750011,
    "transfers": [
      "東京メトロ日比谷線（虎ノ門ヒルズ駅）"
    ],
    "address": "東京都港区虎ノ門一丁目1-21",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-08",
    "stationNumber": "G-08",
    "number": 8,
    "name": "新橋",
    "nameKana": "しんばし",
    "nameEn": "Shimbashi",
    "lat": 35.6672291,
    "lng": 139.7588763,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR横須賀線",
      "都営浅草線",
      "ゆりかもめ"
    ],
    "address": "東京都港区新橋二丁目16-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-09",
    "stationNumber": "G-09",
    "number": 9,
    "name": "銀座",
    "nameKana": "ぎんざ",
    "nameEn": "Ginza",
    "lat": 35.6714902,
    "lng": 139.7652566,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ日比谷線"
    ],
    "address": "東京都中央区銀座四丁目1-2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-10",
    "stationNumber": "G-10",
    "number": 10,
    "name": "京橋",
    "nameKana": "きょうばし",
    "nameEn": "Kyobashi",
    "lat": 35.6767641,
    "lng": 139.7700459,
    "transfers": [
      "都営浅草線（宝町駅）"
    ],
    "address": "東京都中央区京橋二丁目2-10",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-11",
    "stationNumber": "G-11",
    "number": 11,
    "name": "日本橋",
    "nameKana": "にほんばし",
    "nameEn": "Nihombashi",
    "lat": 35.682087,
    "lng": 139.7733413,
    "transfers": [
      "東京メトロ東西線",
      "都営浅草線"
    ],
    "address": "東京都中央区日本橋一丁目3-11",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-12",
    "stationNumber": "G-12",
    "number": 12,
    "name": "三越前",
    "nameKana": "みつこしまえ",
    "nameEn": "Mitsukoshimae",
    "lat": 35.6870749,
    "lng": 139.7735518,
    "transfers": [
      "東京メトロ半蔵門線",
      "JR総武快速線（新日本橋駅）"
    ],
    "address": "東京都中央区日本橋室町一丁目4-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-13",
    "stationNumber": "G-13",
    "number": 13,
    "name": "神田",
    "nameKana": "かんだ",
    "nameEn": "Kanda",
    "lat": 35.6937035,
    "lng": 139.7708227,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR中央線"
    ],
    "address": "東京都千代田区神田須田町一丁目2-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-14",
    "stationNumber": "G-14",
    "number": 14,
    "name": "末広町",
    "nameKana": "すえひろちょう",
    "nameEn": "Suehirocho",
    "lat": 35.7029435,
    "lng": 139.7716554,
    "transfers": [],
    "address": "東京都千代田区外神田四丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-15",
    "stationNumber": "G-15",
    "number": 15,
    "name": "上野広小路",
    "nameKana": "うえのひろこうじ",
    "nameEn": "Ueno-hirokoji",
    "lat": 35.7078315,
    "lng": 139.7729685,
    "transfers": [
      "都営大江戸線（上野御徒町駅）",
      "東京メトロ日比谷線（仲御徒町駅）",
      "JR山手線（御徒町駅）",
      "JR京浜東北線（御徒町駅）"
    ],
    "address": "東京都台東区上野三丁目29-5",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-16",
    "stationNumber": "G-16",
    "number": 16,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7117224,
    "lng": 139.776143,
    "transfers": [
      "東京メトロ日比谷線",
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
      "JR高崎線",
      "JR常磐線快速",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "京成本線"
    ],
    "address": "東京都台東区東上野三丁目19-6",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "lineId": "ginza",
    "id": "G-17",
    "stationNumber": "G-17",
    "number": 17,
    "name": "稲荷町",
    "nameKana": "いなりちょう",
    "nameEn": "Inaricho",
    "lat": 35.7114032,
    "lng": 139.7826812,
    "transfers": [],
    "address": "東京都台東区東上野三丁目33-11",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-18",
    "stationNumber": "G-18",
    "number": 18,
    "name": "田原町",
    "nameKana": "たわらまち",
    "nameEn": "Tawaramachi",
    "lat": 35.7099006,
    "lng": 139.7907726,
    "transfers": [
      "つくばエクスプレス（浅草駅）"
    ],
    "address": "東京都台東区西浅草一丁目1-18",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "ginza",
    "id": "G-19",
    "stationNumber": "G-19",
    "number": 19,
    "name": "浅草",
    "nameKana": "あさくさ",
    "nameEn": "Asakusa",
    "lat": 35.7108521,
    "lng": 139.7978001,
    "transfers": [
      "東武スカイツリーライン",
      "都営浅草線",
      "つくばエクスプレス"
    ],
    "address": "東京都台東区浅草一丁目1-3",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local"
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
