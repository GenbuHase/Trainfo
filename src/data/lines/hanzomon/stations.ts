import type { Station } from '../../../types';

export const HANZOMON_STATIONS: Station[] = [
  {
    "lineId": "hanzomon",
    "id": "Z-01",
    "stationNumber": "Z-01",
    "number": 1,
    "name": "渋谷",
    "nameKana": "しぶや",
    "nameEn": "Shibuya",
    "lat": 35.6595562,
    "lng": 139.7020805,
    "transfers": [
      "東急田園都市線",
      "東急東横線",
      "東京メトロ銀座線",
      "東京メトロ副都心線",
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "京王井の頭線"
    ],
    "address": "東京都渋谷区道玄坂二丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-02",
    "stationNumber": "Z-02",
    "number": 2,
    "name": "表参道",
    "nameKana": "おもてさんどう",
    "nameEn": "Omote-sando",
    "lat": 35.6651381,
    "lng": 139.7122804,
    "transfers": [
      "東京メトロ銀座線",
      "東京メトロ千代田線"
    ],
    "address": "東京都港区北青山三丁目6-12",
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-03",
    "stationNumber": "Z-03",
    "number": 3,
    "name": "青山一丁目",
    "nameKana": "あおやまいっちょうめ",
    "nameEn": "Aoyama-itchome",
    "lat": 35.6728653,
    "lng": 139.7238851,
    "transfers": [
      "東京メトロ銀座線",
      "都営大江戸線"
    ],
    "address": "東京都港区南青山一丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-04",
    "stationNumber": "Z-04",
    "number": 4,
    "name": "永田町",
    "nameKana": "ながたちょう",
    "nameEn": "Nagatacho",
    "lat": 35.6784077,
    "lng": 139.7386335,
    "transfers": [
      "東京メトロ有楽町線",
      "東京メトロ南北線",
      "東京メトロ銀座線（赤坂見附駅）",
      "東京メトロ丸ノ内線（赤坂見附駅）"
    ],
    "address": "東京都千代田区永田町一丁目11-28",
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-05",
    "stationNumber": "Z-05",
    "number": 5,
    "name": "半蔵門",
    "nameKana": "はんぞうもん",
    "nameEn": "Hanzomon",
    "lat": 35.685237,
    "lng": 139.741536,
    "transfers": [],
    "address": "東京都千代田区麹町一丁目6",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-06",
    "stationNumber": "Z-06",
    "number": 6,
    "name": "九段下",
    "nameKana": "くだんした",
    "nameEn": "Kudanshita",
    "lat": 35.695261,
    "lng": 139.7505399,
    "transfers": [
      "東京メトロ東西線",
      "都営新宿線"
    ],
    "address": "東京都千代田区九段南一丁目6-1",
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-07",
    "stationNumber": "Z-07",
    "number": 7,
    "name": "神保町",
    "nameKana": "じんぼうちょう",
    "nameEn": "Jimbocho",
    "lat": 35.6959843,
    "lng": 139.756919,
    "transfers": [
      "都営三田線",
      "都営新宿線"
    ],
    "address": "東京都千代田区神田神保町二丁目2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-08",
    "stationNumber": "Z-08",
    "number": 8,
    "name": "大手町",
    "nameKana": "おおてまち",
    "nameEn": "Otemachi",
    "lat": 35.6867555,
    "lng": 139.7650427,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ東西線",
      "東京メトロ千代田線",
      "都営三田線"
    ],
    "address": "東京都千代田区大手町一丁目6-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-09",
    "stationNumber": "Z-09",
    "number": 9,
    "name": "三越前",
    "nameKana": "みつこしまえ",
    "nameEn": "Mitsukoshimae",
    "lat": 35.6850014,
    "lng": 139.773095,
    "transfers": [
      "東京メトロ銀座線",
      "JR総武快速線（新日本橋駅）"
    ],
    "address": "東京都中央区日本橋室町二丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-10",
    "stationNumber": "Z-10",
    "number": 10,
    "name": "水天宮前",
    "nameKana": "すいてんぐうまえ",
    "nameEn": "Suitengumae",
    "lat": 35.6825678,
    "lng": 139.7856731,
    "transfers": [
      "都営浅草線（人形町駅）",
      "東京メトロ日比谷線（人形町駅）"
    ],
    "address": "東京都中央区日本橋蛎殻町二丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-11",
    "stationNumber": "Z-11",
    "number": 11,
    "name": "清澄白河",
    "nameKana": "きよすみしらかわ",
    "nameEn": "Kiyosumi-shirakawa",
    "lat": 35.6821208,
    "lng": 139.7992375,
    "transfers": [
      "都営大江戸線"
    ],
    "address": "東京都江東区清澄三丁目3-24",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-12",
    "stationNumber": "Z-12",
    "number": 12,
    "name": "住吉",
    "nameKana": "すみよし",
    "nameEn": "Sumiyoshi",
    "lat": 35.6887348,
    "lng": 139.8156756,
    "transfers": [
      "都営新宿線"
    ],
    "address": "東京都江東区住吉二丁目24-12",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-13",
    "stationNumber": "Z-13",
    "number": 13,
    "name": "錦糸町",
    "nameKana": "きんしちょう",
    "nameEn": "Kinshicho",
    "lat": 35.6963482,
    "lng": 139.8149535,
    "transfers": [
      "JR総武快速線",
      "JR中央・総武線各駅停車"
    ],
    "address": "東京都墨田区江東橋三丁目14-5",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
    "lineId": "hanzomon",
    "id": "Z-14",
    "stationNumber": "Z-14",
    "number": 14,
    "name": "押上",
    "nameKana": "おしあげ",
    "nameEn": "Oshiage",
    "lat": 35.7099434,
    "lng": 139.8133278,
    "transfers": [
      "東武スカイツリーライン",
      "京成押上線",
      "都営浅草線"
    ],
    "address": "東京都墨田区押上一丁目1-2",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express"
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
