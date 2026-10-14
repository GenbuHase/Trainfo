import type { Station } from '../../../types';

export const JOBAN_RAPID_STATIONS: Station[] = [
  {
    "id": "JJ-01",
    "lineId": "joban_rapid",
    "number": 1,
    "name": "品川",
    "nameKana": "しながわ",
    "nameEn": "Shinagawa",
    "lat": 35.6284,
    "lng": 139.739,
    "transfers": [
      "JR東海道線",
      "JR山手線",
      "JR京浜東北線",
      "JR横須賀線",
      "東海道新幹線",
      "京急本線"
    ],
    "address": "東京都港区高輪三丁目26-27",
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
    "isMajor": true,
    "platforms": {
      "inbound": "9・10番線",
      "outbound": "臨時"
    }
  },
  {
    "id": "JJ-02",
    "lineId": "joban_rapid",
    "number": 2,
    "name": "新橋",
    "nameKana": "しんばし",
    "nameEn": "Shimbashi",
    "lat": 35.666,
    "lng": 139.7586,
    "transfers": [
      "JR東海道線",
      "JR山手線",
      "JR京浜東北線",
      "JR横須賀線",
      "東京メトロ銀座線",
      "都営浅草線",
      "ゆりかもめ"
    ],
    "address": "東京都港区新橋二丁目17",
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
    "isMajor": true,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    }
  },
  {
    "id": "JJ-03",
    "lineId": "joban_rapid",
    "number": 3,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6811274,
    "lng": 139.7671827,
    "transfers": [
      "JR東海道線",
      "JR山手線",
      "JR京浜東北線",
      "JR中央線",
      "JR総武線快速",
      "JR横須賀線",
      "JR京葉線",
      "JR新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
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
      "inbound": "7・8番線",
      "outbound": "9・10番線"
    }
  },
  {
    "id": "JJ-04",
    "lineId": "joban_rapid",
    "number": 4,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7132392,
    "lng": 139.7769652,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
      "JR高崎線",
      "JR新幹線",
      "東京メトロ銀座線",
      "東京メトロ日比谷線",
      "京成本線"
    ],
    "address": "東京都台東区上野七丁目1-1",
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
      "outbound": "8・9・10・11・12番線"
    }
  },
  {
    "id": "JJ-05",
    "lineId": "joban_rapid",
    "number": 5,
    "name": "日暮里",
    "nameKana": "にっぽり",
    "nameEn": "Nippori",
    "lat": 35.7282503,
    "lng": 139.7707956,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "京成本線",
      "日暮里・舎人ライナー"
    ],
    "address": "東京都荒川区西日暮里二丁目19-1",
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
    "isMajor": true,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    }
  },
  {
    "id": "JJ-06",
    "lineId": "joban_rapid",
    "number": 6,
    "name": "三河島",
    "nameKana": "みかわしま",
    "nameEn": "Mikawashima",
    "lat": 35.7333691,
    "lng": 139.7775289,
    "transfers": [],
    "address": "東京都荒川区西日暮里一丁目6-12",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JJ-07",
    "lineId": "joban_rapid",
    "number": 7,
    "name": "南千住",
    "nameKana": "みなみせんじゅ",
    "nameEn": "Minami-senju",
    "lat": 35.7333239,
    "lng": 139.7989556,
    "transfers": [
      "東京メトロ日比谷線",
      "つくばエクスプレス"
    ],
    "address": "東京都荒川区南千住四丁目2-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JJ-08",
    "lineId": "joban_rapid",
    "number": 8,
    "name": "北千住",
    "nameKana": "きたせんじゅ",
    "nameEn": "Kita-senju",
    "lat": 35.7488638,
    "lng": 139.8046537,
    "transfers": [
      "JR常磐線各駅停車",
      "東武スカイツリーライン",
      "東京メトロ千代田線",
      "東京メトロ日比谷線",
      "つくばエクスプレス"
    ],
    "address": "東京都足立区千住旭町42-1",
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
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JJ-09",
    "lineId": "joban_rapid",
    "number": 9,
    "name": "松戸",
    "nameKana": "まつど",
    "nameEn": "Matsudo",
    "lat": 35.7845283,
    "lng": 139.9004334,
    "transfers": [
      "JR常磐線各駅停車",
      "新京成線"
    ],
    "address": "千葉県松戸市松戸1181",
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
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JJ-10",
    "lineId": "joban_rapid",
    "number": 10,
    "name": "柏",
    "nameKana": "かしわ",
    "nameEn": "Kashiwa",
    "lat": 35.8623843,
    "lng": 139.9709425,
    "transfers": [
      "JR常磐線各駅停車",
      "東武アーバンパークライン"
    ],
    "address": "千葉県柏市柏一丁目1-1",
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
    "id": "JJ-11",
    "lineId": "joban_rapid",
    "number": 11,
    "name": "我孫子",
    "nameKana": "あびこ",
    "nameEn": "Abiko",
    "lat": 35.8729998,
    "lng": 140.0107446,
    "transfers": [
      "JR常磐線各駅停車",
      "JR成田線"
    ],
    "address": "千葉県我孫子市本町二丁目1-1",
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
    "isMajor": true,
    "platforms": {
      "inbound": "4・5番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JJ-12",
    "lineId": "joban_rapid",
    "number": 12,
    "name": "天王台",
    "nameKana": "てんのうだい",
    "nameEn": "Tennodai",
    "lat": 35.8727292,
    "lng": 140.0406808,
    "transfers": [
      "JR常磐線各駅停車"
    ],
    "address": "千葉県我孫子市柴崎台一丁目19-1",
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
    "id": "JJ-13",
    "lineId": "joban_rapid",
    "number": 13,
    "name": "取手",
    "nameKana": "とりで",
    "nameEn": "Toride",
    "lat": 35.8956226,
    "lng": 140.0627766,
    "transfers": [
      "JR常磐線各駅停車",
      "JR常磐線(取手以北)",
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
  }
];
