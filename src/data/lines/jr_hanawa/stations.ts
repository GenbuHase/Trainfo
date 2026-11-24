import type { Station } from '../../../types';

export const HANAWA_STATIONS: Station[] =  [
  {
    "id": "HNW-01",
    "lineId": "jr_hanawa",
    "number": 1,
    "name": "盛岡",
    "nameKana": "もりおか",
    "nameEn": "Morioka",
    "lat": 39.7006658,
    "lng": 141.1368084,
    "transfers": [
      "JR東北新幹線",
      "JR秋田新幹線",
      "JR東北本線（一ノ関～盛岡）",
      "IGRいわて銀河鉄道線",
      "JR田沢湖線",
      "JR山田線"
    ],
    "address": "岩手県盛岡駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "HNW-02",
    "lineId": "jr_hanawa",
    "number": 2,
    "name": "青山",
    "nameKana": "あおやま",
    "nameEn": "Aoyama",
    "lat": 39.7248775,
    "lng": 141.1183674,
    "transfers": [],
    "address": "岩手県青山駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-03",
    "lineId": "jr_hanawa",
    "number": 3,
    "name": "厨川",
    "nameKana": "くりやがわ",
    "nameEn": "Kuriyagawa",
    "lat": 39.7447184,
    "lng": 141.1292387,
    "transfers": [],
    "address": "岩手県厨川駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-04",
    "lineId": "jr_hanawa",
    "number": 4,
    "name": "巣子",
    "nameKana": "すご",
    "nameEn": "Sugo",
    "lat": 39.783546,
    "lng": 141.1488503,
    "transfers": [],
    "address": "岩手県巣子駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-05",
    "lineId": "jr_hanawa",
    "number": 5,
    "name": "滝沢",
    "nameKana": "たきざわ",
    "nameEn": "Takizawa",
    "lat": 39.7989748,
    "lng": 141.1495265,
    "transfers": [],
    "address": "岩手県滝沢駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-06",
    "lineId": "jr_hanawa",
    "number": 6,
    "name": "渋民",
    "nameKana": "しぶたみ",
    "nameEn": "Shibutami",
    "lat": 39.8349944,
    "lng": 141.1545109,
    "transfers": [],
    "address": "岩手県渋民駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-07",
    "lineId": "jr_hanawa",
    "number": 7,
    "name": "好摩",
    "nameKana": "こうま",
    "nameEn": "Kōma",
    "lat": 39.873957,
    "lng": 141.1734662,
    "transfers": [
      "IGRいわて銀河鉄道線"
    ],
    "address": "岩手県好摩駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "id": "HNW-08",
    "lineId": "jr_hanawa",
    "number": 8,
    "name": "東大更",
    "nameKana": "ひがしおおぶけ",
    "nameEn": "Higashi-Ōbuke",
    "lat": 39.902583,
    "lng": 141.142466,
    "transfers": [],
    "address": "岩手県東大更駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-09",
    "lineId": "jr_hanawa",
    "number": 9,
    "name": "大更",
    "nameKana": "おおぶけ",
    "nameEn": "Ōbuke",
    "lat": 39.9137592,
    "lng": 141.1009053,
    "transfers": [],
    "address": "岩手県大更駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "HNW-10",
    "lineId": "jr_hanawa",
    "number": 10,
    "name": "平館",
    "nameKana": "たいらだて",
    "nameEn": "Tairadate",
    "lat": 39.950774,
    "lng": 141.0855698,
    "transfers": [],
    "address": "岩手県平館駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-11",
    "lineId": "jr_hanawa",
    "number": 11,
    "name": "北森",
    "nameKana": "きたもり",
    "nameEn": "Kitamori",
    "lat": 39.9565583,
    "lng": 141.0720345,
    "transfers": [],
    "address": "岩手県北森駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-12",
    "lineId": "jr_hanawa",
    "number": 12,
    "name": "松尾八幡平",
    "nameKana": "まつおはちまんたい",
    "nameEn": "Matsuo-Hachimantai",
    "lat": 39.9693537,
    "lng": 141.0435135,
    "transfers": [],
    "address": "岩手県松尾八幡平駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-13",
    "lineId": "jr_hanawa",
    "number": 13,
    "name": "安比高原",
    "nameKana": "あっぴこうげん",
    "nameEn": "Appi-Kōgen",
    "lat": 40.0123954,
    "lng": 140.9976755,
    "transfers": [],
    "address": "岩手県安比高原駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "HNW-14",
    "lineId": "jr_hanawa",
    "number": 14,
    "name": "赤坂田",
    "nameKana": "あかさかた",
    "nameEn": "Akasakata",
    "lat": 40.048762,
    "lng": 141.004289,
    "transfers": [],
    "address": "岩手県赤坂田駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-15",
    "lineId": "jr_hanawa",
    "number": 15,
    "name": "小屋の畑",
    "nameKana": "こやのはた",
    "nameEn": "Koyanohata",
    "lat": 40.0766715,
    "lng": 141.02066,
    "transfers": [],
    "address": "岩手県小屋の畑駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-16",
    "lineId": "jr_hanawa",
    "number": 16,
    "name": "荒屋新町",
    "nameKana": "あらやしんまち",
    "nameEn": "Araya-Shinmachi",
    "lat": 40.0973548,
    "lng": 141.0491912,
    "transfers": [],
    "address": "岩手県荒屋新町駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "HNW-17",
    "lineId": "jr_hanawa",
    "number": 17,
    "name": "横間",
    "nameKana": "よこま",
    "nameEn": "Yokoma",
    "lat": 40.1074805,
    "lng": 141.0275678,
    "transfers": [],
    "address": "岩手県横間駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-18",
    "lineId": "jr_hanawa",
    "number": 18,
    "name": "田山",
    "nameKana": "たやま",
    "nameEn": "Tayama",
    "lat": 40.1396379,
    "lng": 140.9442521,
    "transfers": [],
    "address": "岩手県田山駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-19",
    "lineId": "jr_hanawa",
    "number": 19,
    "name": "兄畑",
    "nameKana": "あにはた",
    "nameEn": "Anihata",
    "lat": 40.1162368,
    "lng": 140.8822362,
    "transfers": [],
    "address": "岩手県兄畑駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-20",
    "lineId": "jr_hanawa",
    "number": 20,
    "name": "湯瀬温泉",
    "nameKana": "ゆぜおんせん",
    "nameEn": "Yuze-Onsen",
    "lat": 40.1223045,
    "lng": 140.8403769,
    "transfers": [],
    "address": "秋田県湯瀬温泉駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-21",
    "lineId": "jr_hanawa",
    "number": 21,
    "name": "八幡平",
    "nameKana": "はちまんたい",
    "nameEn": "Hachimantai",
    "lat": 40.143214,
    "lng": 140.804386,
    "transfers": [],
    "address": "秋田県八幡平駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-22",
    "lineId": "jr_hanawa",
    "number": 22,
    "name": "陸中大里",
    "nameKana": "りくちゅうおおさと",
    "nameEn": "Rikuchū-Ōsato",
    "lat": 40.158901,
    "lng": 140.793291,
    "transfers": [],
    "address": "秋田県陸中大里駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-23",
    "lineId": "jr_hanawa",
    "number": 23,
    "name": "鹿角花輪",
    "nameKana": "かづのはなわ",
    "nameEn": "Kazuno-Hanawa",
    "lat": 40.1893784,
    "lng": 140.785481,
    "transfers": [],
    "address": "秋田県鹿角花輪駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "HNW-24",
    "lineId": "jr_hanawa",
    "number": 24,
    "name": "柴平",
    "nameKana": "しばひら",
    "nameEn": "Shibahira",
    "lat": 40.2308177,
    "lng": 140.7880208,
    "transfers": [],
    "address": "秋田県柴平駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-25",
    "lineId": "jr_hanawa",
    "number": 25,
    "name": "十和田南",
    "nameKana": "とわだみなみ",
    "nameEn": "Towada-Minami",
    "lat": 40.2558781,
    "lng": 140.7707003,
    "transfers": [],
    "address": "秋田県十和田南駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "HNW-26",
    "lineId": "jr_hanawa",
    "number": 26,
    "name": "末広",
    "nameKana": "すえひろ",
    "nameEn": "Suehiro",
    "lat": 40.2298371,
    "lng": 140.7373831,
    "transfers": [],
    "address": "秋田県末広駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-27",
    "lineId": "jr_hanawa",
    "number": 27,
    "name": "土深井",
    "nameKana": "どぶかい",
    "nameEn": "Dobukai",
    "lat": 40.2224827,
    "lng": 140.7127864,
    "transfers": [],
    "address": "秋田県土深井駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-28",
    "lineId": "jr_hanawa",
    "number": 28,
    "name": "沢尻",
    "nameKana": "さわじり",
    "nameEn": "Sawajiri",
    "lat": 40.2303213,
    "lng": 140.6932989,
    "transfers": [],
    "address": "秋田県沢尻駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-29",
    "lineId": "jr_hanawa",
    "number": 29,
    "name": "十二所",
    "nameKana": "じゅうにしょ",
    "nameEn": "Jūnisho",
    "lat": 40.2143512,
    "lng": 140.6678773,
    "transfers": [],
    "address": "秋田県十二所駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-30",
    "lineId": "jr_hanawa",
    "number": 30,
    "name": "大滝温泉",
    "nameKana": "おおたきおんせん",
    "nameEn": "Ōtaki-Onsen",
    "lat": 40.2099219,
    "lng": 140.6397371,
    "transfers": [],
    "address": "秋田県大滝温泉駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-31",
    "lineId": "jr_hanawa",
    "number": 31,
    "name": "扇田",
    "nameKana": "おうぎた",
    "nameEn": "Ōgita",
    "lat": 40.2292987,
    "lng": 140.5724616,
    "transfers": [],
    "address": "秋田県扇田駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-32",
    "lineId": "jr_hanawa",
    "number": 32,
    "name": "東大館",
    "nameKana": "ひがしおおだて",
    "nameEn": "Higashi-Ōdate",
    "lat": 40.2661485,
    "lng": 140.5546407,
    "transfers": [],
    "address": "秋田県東大館駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HNW-33",
    "lineId": "jr_hanawa",
    "number": 33,
    "name": "大館",
    "nameKana": "おおだて",
    "nameEn": "Ōdate",
    "lat": 40.2882954,
    "lng": 140.5564629,
    "transfers": [
      "JR奥羽本線（秋田～青森）"
    ],
    "address": "秋田県大館駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
