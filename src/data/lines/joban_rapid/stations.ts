import type { Station } from '../../../types';

export const JOBAN_RAPID_STATIONS: Station[] = [
  {
    "id": "JJ-01",
    "stationNumber": "JJ-01",
    "lineId": "joban_rapid",
    "number": 1,
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
      "JR上野東京ライン",
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
      "special_rapid",
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "8・9・10・11・12・16・17番線"
    }
  },
  {
    "id": "JJ-02",
    "stationNumber": "JJ-02",
    "lineId": "joban_rapid",
    "number": 2,
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
      "special_rapid",
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    }
  },
  {
    "id": "JJ-03",
    "stationNumber": "JJ-03",
    "lineId": "joban_rapid",
    "number": 3,
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
    "id": "JJ-04",
    "stationNumber": "JJ-04",
    "lineId": "joban_rapid",
    "number": 4,
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
    "id": "JJ-05",
    "stationNumber": "JJ-05",
    "lineId": "joban_rapid",
    "number": 5,
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
      "special_rapid",
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JJ-06",
    "stationNumber": "JJ-06",
    "lineId": "joban_rapid",
    "number": 6,
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
    "id": "JJ-07",
    "stationNumber": "JJ-07",
    "lineId": "joban_rapid",
    "number": 7,
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
      "special_rapid",
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JJ-08",
    "stationNumber": "JJ-08",
    "lineId": "joban_rapid",
    "number": 8,
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
    "id": "JJ-09",
    "stationNumber": "JJ-09",
    "lineId": "joban_rapid",
    "number": 9,
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
    "id": "JJ-10",
    "stationNumber": "JJ-10",
    "lineId": "joban_rapid",
    "number": 10,
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
