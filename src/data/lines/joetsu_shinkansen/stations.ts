import type { Station } from '../../../types';

export const JOETSU_SHINKANSEN_STATIONS: Station[] = [
  {
    "id": "JOS-01",
    "lineId": "joetsu_shinkansen",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6810367,
    "lng": 139.7674402,
    "transfers": [
      "JR東北新幹線",
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR中央線",
      "JR総武快速線",
      "JR横須賀線",
      "JR京葉線",
      "JR上野東京ライン",
      "東海道新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
    "platforms": {
      "inbound": "20-23番線",
      "outbound": "20-23番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-02",
    "lineId": "joetsu_shinkansen",
    "number": 2,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7138757,
    "lng": 139.7778322,
    "transfers": [
      "JR東北新幹線",
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
      "JR高崎線",
      "JR常磐線",
      "JR上野東京ライン",
      "東京メトロ銀座線",
      "東京メトロ日比谷線",
      "京成本線"
    ],
    "address": "東京都台東区上野七丁目",
    "platforms": {
      "inbound": "19-22番線",
      "outbound": "19-22番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-03",
    "lineId": "joetsu_shinkansen",
    "number": 3,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "lat": 35.9095251,
    "lng": 139.6217107,
    "transfers": [
      "JR東北新幹線",
      "JR埼京線",
      "JR川越線",
      "JR京浜東北線",
      "JR宇都宮線",
      "JR高崎線",
      "JR湘南新宿ライン",
      "JR上野東京ライン",
      "東武野田線",
      "埼玉新都市交通伊奈線"
    ],
    "address": "埼玉県さいたま市大宮区錦町",
    "platforms": {
      "inbound": "13-18番線",
      "outbound": "13-18番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-04",
    "lineId": "joetsu_shinkansen",
    "number": 4,
    "name": "熊谷",
    "nameKana": "くまがや",
    "nameEn": "Kumagaya",
    "lat": 36.138544,
    "lng": 139.3921709,
    "transfers": [
      "JR高崎線",
      "JR湘南新宿ライン",
      "JR上野東京ライン",
      "秩父鉄道秩父本線"
    ],
    "address": "埼玉県熊谷市桜木町一丁目202-1",
    "platforms": {
      "inbound": "11・12番線",
      "outbound": "11・12番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-05",
    "lineId": "joetsu_shinkansen",
    "number": 5,
    "name": "本庄早稲田",
    "nameKana": "ほんじょうわせだ",
    "nameEn": "Honjo-Waseda",
    "lat": 36.2194767,
    "lng": 139.1781883,
    "transfers": [],
    "address": "埼玉県本庄市早稲田の杜一丁目1-1",
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
      "limitedExp"
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
    "id": "JOS-06",
    "lineId": "joetsu_shinkansen",
    "number": 6,
    "name": "高崎",
    "nameKana": "たかさき",
    "nameEn": "Takasaki",
    "lat": 36.3223662,
    "lng": 139.0130152,
    "transfers": [
      "JR北陸新幹線",
      "JR高崎線",
      "JR上越線",
      "JR信越本線",
      "JR八高線",
      "JR両毛線",
      "JR吾妻線",
      "上信電鉄上信線"
    ],
    "address": "群馬県高崎市八島町222",
    "platforms": {
      "inbound": "13・14番線",
      "outbound": "11・12番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-07",
    "lineId": "joetsu_shinkansen",
    "number": 7,
    "name": "上毛高原",
    "nameKana": "じょうもうこうげん",
    "nameEn": "Jomo-Kogen",
    "lat": 36.6931647,
    "lng": 138.9775692,
    "transfers": [],
    "address": "群馬県利根郡みなかみ町月夜野1756",
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
      "limitedExp"
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
    "id": "JOS-08",
    "lineId": "joetsu_shinkansen",
    "number": 8,
    "name": "越後湯沢",
    "nameKana": "えちごゆざわ",
    "nameEn": "Echigo-Yuzawa",
    "lat": 36.9358386,
    "lng": 138.8092615,
    "transfers": [
      "JR上越線",
      "北越急行ほくほく線"
    ],
    "address": "新潟県南魚沼郡湯沢町大字湯沢主水2427-1",
    "platforms": {
      "inbound": "13・14番線",
      "outbound": "11・12番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-09",
    "lineId": "joetsu_shinkansen",
    "number": 9,
    "name": "浦佐",
    "nameKana": "うらさ",
    "nameEn": "Urasa",
    "lat": 37.1673817,
    "lng": 138.9225912,
    "transfers": [
      "JR上越線"
    ],
    "address": "新潟県南魚沼市浦佐719-2",
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
      "limitedExp"
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
    "id": "JOS-10",
    "lineId": "joetsu_shinkansen",
    "number": 10,
    "name": "長岡",
    "nameKana": "ながおか",
    "nameEn": "Nagaoka",
    "lat": 37.447836,
    "lng": 138.8539585,
    "transfers": [
      "JR信越本線",
      "JR上越線"
    ],
    "address": "新潟県長岡市城内町二丁目794-4",
    "platforms": {
      "inbound": "12番線",
      "outbound": "11番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
    "id": "JOS-11",
    "lineId": "joetsu_shinkansen",
    "number": 11,
    "name": "燕三条",
    "nameKana": "つばめさんじょう",
    "nameEn": "Tsubamesanjo",
    "lat": 37.6495292,
    "lng": 138.9395902,
    "transfers": [
      "JR弥彦線"
    ],
    "address": "新潟県三条市下須頃497",
    "platforms": {
      "inbound": "12番線",
      "outbound": "11番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
      "limitedExp"
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
    "id": "JOS-12",
    "lineId": "joetsu_shinkansen",
    "number": 12,
    "name": "新潟",
    "nameKana": "にいがた",
    "nameEn": "Niigata",
    "lat": 37.9119375,
    "lng": 139.0614492,
    "transfers": [
      "JR信越本線",
      "JR白新線",
      "JR越後線"
    ],
    "address": "新潟県新潟市中央区花園一丁目1-1",
    "platforms": {
      "inbound": "11-14番線",
      "outbound": "11-14番線"
    },
    "stoppingTypes": [
      "toki",
      "tanigawa",
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
