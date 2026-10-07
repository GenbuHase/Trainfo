// odakyu_enoshima 駅メタデータ定義
import type { Station } from '../../../types';

export const ODAKYU_ENOSHIMA_STATIONS: Station[] = [
  {
    "id": "OH-28",
    "lineId": "odakyu_enoshima",
    "number": 1,
    "name": "相模大野",
    "nameKana": "さがみおおの",
    "nameEn": "Sagami-Ono",
    "lat": 35.5321563,
    "lng": 139.437902,
    "transfers": [
      "小田急小田原線"
    ],
    "address": "神奈川県相模原市南区相模大野三丁目8-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OE-01",
    "lineId": "odakyu_enoshima",
    "number": 2,
    "name": "東林間",
    "nameKana": "ひがしりんかん",
    "nameEn": "Higashi-Rinkan",
    "lat": 35.5202213,
    "lng": 139.4390734,
    "transfers": [],
    "address": "神奈川県相模原市南区上鶴間七丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-02",
    "lineId": "odakyu_enoshima",
    "number": 3,
    "name": "中央林間",
    "nameKana": "ちゅうおうりんかん",
    "nameEn": "Chuo-Rinkan",
    "lat": 35.5075211,
    "lng": 139.4441419,
    "transfers": [
      "東急田園都市線"
    ],
    "address": "神奈川県大和市中央林間四丁目6-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "OE-03",
    "lineId": "odakyu_enoshima",
    "number": 4,
    "name": "南林間",
    "nameKana": "みなみりんかん",
    "nameEn": "Minami-Rinkan",
    "lat": 35.4957322,
    "lng": 139.4479843,
    "transfers": [],
    "address": "神奈川県大和市南林間一丁目6-11",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-04",
    "lineId": "odakyu_enoshima",
    "number": 5,
    "name": "鶴間",
    "nameKana": "つるま",
    "nameEn": "Tsuruma",
    "lat": 35.4902403,
    "lng": 139.4508492,
    "transfers": [],
    "address": "神奈川県大和市西鶴間一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-05",
    "lineId": "odakyu_enoshima",
    "number": 6,
    "name": "大和",
    "nameKana": "やまと",
    "nameEn": "Yamato",
    "lat": 35.469783,
    "lng": 139.4614983,
    "transfers": [
      "相鉄本線"
    ],
    "address": "神奈川県大和市大和南一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OE-06",
    "lineId": "odakyu_enoshima",
    "number": 7,
    "name": "桜ヶ丘",
    "nameKana": "さくらがおか",
    "nameEn": "Sakuragaoka",
    "lat": 35.4505946,
    "lng": 139.4657942,
    "transfers": [],
    "address": "神奈川県大和市福田一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-07",
    "lineId": "odakyu_enoshima",
    "number": 8,
    "name": "高座渋谷",
    "nameKana": "こうざしぶや",
    "nameEn": "Koza-Shibuya",
    "lat": 35.4319545,
    "lng": 139.4647109,
    "transfers": [],
    "address": "神奈川県大和市福田2019",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-08",
    "lineId": "odakyu_enoshima",
    "number": 9,
    "name": "長後",
    "nameKana": "ちょうご",
    "nameEn": "Chogo",
    "lat": 35.4125447,
    "lng": 139.4654529,
    "transfers": [],
    "address": "神奈川県藤沢市下土棚472",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "OE-09",
    "lineId": "odakyu_enoshima",
    "number": 10,
    "name": "湘南台",
    "nameKana": "しょうなんだい",
    "nameEn": "Shonandai",
    "lat": 35.3964623,
    "lng": 139.4665499,
    "transfers": [
      "相鉄いずみ野線",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県藤沢市湘南台二丁目15",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3番線"
    },
    "isMajor": true
  },
  {
    "id": "OE-10",
    "lineId": "odakyu_enoshima",
    "number": 11,
    "name": "六会日大前",
    "nameKana": "むつあいにちだいまえ",
    "nameEn": "Mutsuai-Nichidaimae",
    "lat": 35.3835356,
    "lng": 139.4708488,
    "transfers": [],
    "address": "神奈川県藤沢市亀井野一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-11",
    "lineId": "odakyu_enoshima",
    "number": 12,
    "name": "善行",
    "nameKana": "ぜんぎょう",
    "nameEn": "Zengyo",
    "lat": 35.3627196,
    "lng": 139.4732594,
    "transfers": [],
    "address": "神奈川県藤沢市善行一丁目26-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-12",
    "lineId": "odakyu_enoshima",
    "number": 13,
    "name": "藤沢本町",
    "nameKana": "ふじさわほんまち",
    "nameEn": "Fujisawa-Hommachi",
    "lat": 35.347991,
    "lng": 139.4761081,
    "transfers": [],
    "address": "神奈川県藤沢市藤沢三丁目3-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-13",
    "lineId": "odakyu_enoshima",
    "number": 14,
    "name": "藤沢",
    "nameKana": "ふじさわ",
    "nameEn": "Fujisawa",
    "lat": 35.3384958,
    "lng": 139.4846513,
    "transfers": [
      "JR東海道線",
      "江ノ島電鉄線"
    ],
    "address": "神奈川県藤沢市南藤沢1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "OE-14",
    "lineId": "odakyu_enoshima",
    "number": 15,
    "name": "本鵠沼",
    "nameKana": "ほんくげぬま",
    "nameEn": "Hon-Kugenuma",
    "lat": 35.3306323,
    "lng": 139.4749482,
    "transfers": [],
    "address": "神奈川県藤沢市本鵠沼二丁目13-11",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-15",
    "lineId": "odakyu_enoshima",
    "number": 16,
    "name": "鵠沼海岸",
    "nameKana": "くげぬまかいがん",
    "nameEn": "Kugenuma-Kaigan",
    "lat": 35.3207147,
    "lng": 139.471291,
    "transfers": [],
    "address": "神奈川県藤沢市鵠沼海岸二丁目4-10",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "OE-16",
    "lineId": "odakyu_enoshima",
    "number": 17,
    "name": "片瀬江ノ島",
    "nameKana": "かたせえのしま",
    "nameEn": "Katase-Enoshima",
    "lat": 35.3089843,
    "lng": 139.4835048,
    "transfers": [
      "湘南モノレール (湘南江の島駅)",
      "江ノ島電鉄 (江ノ島駅)"
    ],
    "address": "神奈川県藤沢市片瀬海岸二丁目15-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "rapidExp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1-3番線",
      "outbound": "1-3番線"
    },
    "isMajor": true
  }
];
