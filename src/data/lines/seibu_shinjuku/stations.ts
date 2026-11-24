import type { Station } from '../../../types';

export const SEIBU_SHINJUKU_STATIONS: Station[] = [
  {
    "id": "SBS-01",
    "stationNumber": "SS01",
    "lineId": "seibu_shinjuku",
    "number": 1,
    "name": "西武新宿",
    "nameKana": "せいぶしんじゅく",
    "nameEn": "Seibushinjuku",
    "lat": 35.6960878,
    "lng": 139.6999469,
    "transfers": [],
    "address": "東京都新宿区歌舞伎町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp",
      "liner",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-02",
    "stationNumber": "SS02",
    "lineId": "seibu_shinjuku",
    "number": 2,
    "name": "高田馬場",
    "nameKana": "たかだのばば",
    "nameEn": "Takadanobaba",
    "lat": 35.7126499,
    "lng": 139.7038244,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "東京メトロ東西線"
    ],
    "address": "東京都新宿区高田馬場一丁目35-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp",
      "liner",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-03",
    "stationNumber": "SS03",
    "lineId": "seibu_shinjuku",
    "number": 3,
    "name": "下落合",
    "nameKana": "しもおちあい",
    "nameEn": "Shimoochiai",
    "lat": 35.7157455,
    "lng": 139.6950584,
    "transfers": [],
    "address": "東京都新宿区下落合一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-04",
    "stationNumber": "SS04",
    "lineId": "seibu_shinjuku",
    "number": 4,
    "name": "中井",
    "nameKana": "なかい",
    "nameEn": "Nakai",
    "lat": 35.7150312,
    "lng": 139.6859372,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都新宿区中井一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-05",
    "stationNumber": "SS05",
    "lineId": "seibu_shinjuku",
    "number": 5,
    "name": "新井薬師前",
    "nameKana": "あらいやくしまえ",
    "nameEn": "Araiyakushimae",
    "lat": 35.7158842,
    "lng": 139.6720481,
    "transfers": [],
    "address": "東京都中野区上高田五丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-06",
    "stationNumber": "SS06",
    "lineId": "seibu_shinjuku",
    "number": 6,
    "name": "沼袋",
    "nameKana": "ぬまぶくろ",
    "nameEn": "Numabukuro",
    "lat": 35.7193246,
    "lng": 139.6640837,
    "transfers": [],
    "address": "東京都中野区沼袋一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-07",
    "stationNumber": "SS07",
    "lineId": "seibu_shinjuku",
    "number": 7,
    "name": "野方",
    "nameKana": "のがた",
    "nameEn": "Nogata",
    "lat": 35.7195617,
    "lng": 139.6534309,
    "transfers": [],
    "address": "東京都中野区野方六丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-08",
    "stationNumber": "SS08",
    "lineId": "seibu_shinjuku",
    "number": 8,
    "name": "都立家政",
    "nameKana": "とりつかせい",
    "nameEn": "Toritsukasei",
    "lat": 35.7223678,
    "lng": 139.6448231,
    "transfers": [],
    "address": "東京都中野区鷺宮一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-09",
    "stationNumber": "SS09",
    "lineId": "seibu_shinjuku",
    "number": 9,
    "name": "鷺ノ宮",
    "nameKana": "さぎのみや",
    "nameEn": "Saginomiya",
    "lat": 35.722648,
    "lng": 139.6390505,
    "transfers": [],
    "address": "東京都中野区鷺宮三丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-10",
    "stationNumber": "SS10",
    "lineId": "seibu_shinjuku",
    "number": 10,
    "name": "下井草",
    "nameKana": "しもいぐさ",
    "nameEn": "Shimoigusa",
    "lat": 35.7239663,
    "lng": 139.624093,
    "transfers": [],
    "address": "東京都杉並区下井草二丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-11",
    "stationNumber": "SS11",
    "lineId": "seibu_shinjuku",
    "number": 11,
    "name": "井荻",
    "nameKana": "いおぎ",
    "nameEn": "Iogi",
    "lat": 35.7246392,
    "lng": 139.6154075,
    "transfers": [],
    "address": "東京都杉並区下井草五丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-12",
    "stationNumber": "SS12",
    "lineId": "seibu_shinjuku",
    "number": 12,
    "name": "上井草",
    "nameKana": "かみいぐさ",
    "nameEn": "Kamiigusa",
    "lat": 35.7252937,
    "lng": 139.6022195,
    "transfers": [],
    "address": "東京都杉並区上井草三丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-13",
    "stationNumber": "SS13",
    "lineId": "seibu_shinjuku",
    "number": 13,
    "name": "上石神井",
    "nameKana": "かみしゃくじい",
    "nameEn": "Kamishakujii",
    "lat": 35.7262262,
    "lng": 139.5915701,
    "transfers": [],
    "address": "東京都練馬区上石神井一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-14",
    "stationNumber": "SS14",
    "lineId": "seibu_shinjuku",
    "number": 14,
    "name": "武蔵関",
    "nameKana": "むさしせき",
    "nameEn": "Musashiseki",
    "lat": 35.7277254,
    "lng": 139.5755249,
    "transfers": [],
    "address": "東京都練馬区関町北二丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-15",
    "stationNumber": "SS15",
    "lineId": "seibu_shinjuku",
    "number": 15,
    "name": "東伏見",
    "nameKana": "ひがしふしみ",
    "nameEn": "Higashifushimi",
    "lat": 35.7288552,
    "lng": 139.5628034,
    "transfers": [],
    "address": "東京都西東京市東伏見二丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-16",
    "stationNumber": "SS16",
    "lineId": "seibu_shinjuku",
    "number": 16,
    "name": "西武柳沢",
    "nameKana": "せいぶやぎさわ",
    "nameEn": "Seibuyagisawa",
    "lat": 35.7285628,
    "lng": 139.5518557,
    "transfers": [],
    "address": "東京都西東京市柳沢六丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-17",
    "stationNumber": "SS17",
    "lineId": "seibu_shinjuku",
    "number": 17,
    "name": "田無",
    "nameKana": "たなし",
    "nameEn": "Tanashi",
    "lat": 35.7270334,
    "lng": 139.5381042,
    "transfers": [],
    "address": "東京都西東京市田無町四丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-18",
    "stationNumber": "SS18",
    "lineId": "seibu_shinjuku",
    "number": 18,
    "name": "花小金井",
    "nameKana": "はなこがねい",
    "nameEn": "Hanakoganei",
    "lat": 35.726345,
    "lng": 139.5126555,
    "transfers": [],
    "address": "東京都小平市花小金井南町一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-19",
    "stationNumber": "SS19",
    "lineId": "seibu_shinjuku",
    "number": 19,
    "name": "小平",
    "nameKana": "こだいら",
    "nameEn": "Kodaira",
    "lat": 35.7373681,
    "lng": 139.4874622,
    "transfers": [
      "西武拝島線"
    ],
    "address": "東京都小平市美園町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-20",
    "stationNumber": "SS20",
    "lineId": "seibu_shinjuku",
    "number": 20,
    "name": "久米川",
    "nameKana": "くめがわ",
    "nameEn": "Kumegawa",
    "lat": 35.7500621,
    "lng": 139.4721348,
    "transfers": [],
    "address": "東京都東村山市栄町一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-21",
    "stationNumber": "SS21",
    "lineId": "seibu_shinjuku",
    "number": 21,
    "name": "東村山",
    "nameKana": "ひがしむらやま",
    "nameEn": "Higashimurayama",
    "lat": 35.7609067,
    "lng": 139.4656999,
    "transfers": [
      "西武西武園線",
      "西武国分寺線"
    ],
    "address": "東京都東村山駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-22",
    "stationNumber": "SS22",
    "lineId": "seibu_shinjuku",
    "number": 22,
    "name": "所沢",
    "nameKana": "ところざわ",
    "nameEn": "Tokorozawa",
    "lat": 35.7874319,
    "lng": 139.4732685,
    "transfers": [
      "西武池袋線"
    ],
    "address": "埼玉県所沢市くすのき台一丁目14-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-23",
    "stationNumber": "SS23",
    "lineId": "seibu_shinjuku",
    "number": 23,
    "name": "航空公園",
    "nameKana": "こうくうこうえん",
    "nameEn": "Koukuukouen",
    "lat": 35.7989494,
    "lng": 139.4649226,
    "transfers": [],
    "address": "埼玉県所沢市並木二丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-24",
    "stationNumber": "SS24",
    "lineId": "seibu_shinjuku",
    "number": 24,
    "name": "新所沢",
    "nameKana": "しんところざわ",
    "nameEn": "Shintokorozawa",
    "lat": 35.8065889,
    "lng": 139.4562182,
    "transfers": [],
    "address": "埼玉県所沢市松葉町",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-25",
    "stationNumber": "SS25",
    "lineId": "seibu_shinjuku",
    "number": 25,
    "name": "入曽",
    "nameKana": "いりそ",
    "nameEn": "Iriso",
    "lat": 35.8329208,
    "lng": 139.4265811,
    "transfers": [],
    "address": "埼玉県狭山市大字南入曽",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-26",
    "stationNumber": "SS26",
    "lineId": "seibu_shinjuku",
    "number": 26,
    "name": "狭山市",
    "nameKana": "さやまし",
    "nameEn": "Sayamashi",
    "lat": 35.8573889,
    "lng": 139.4133344,
    "transfers": [],
    "address": "埼玉県狭山市駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-27",
    "stationNumber": "SS27",
    "lineId": "seibu_shinjuku",
    "number": 27,
    "name": "新狭山",
    "nameKana": "しんさやま",
    "nameEn": "Shinsayama",
    "lat": 35.8737757,
    "lng": 139.4331872,
    "transfers": [],
    "address": "埼玉県狭山市新狭山三丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-28",
    "stationNumber": "SS28",
    "lineId": "seibu_shinjuku",
    "number": 28,
    "name": "南大塚",
    "nameKana": "みなみおおつか",
    "nameEn": "Minamiootsuka",
    "lat": 35.8893903,
    "lng": 139.4536829,
    "transfers": [],
    "address": "埼玉県川越市南台三丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "rapid_exp"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SBS-29",
    "stationNumber": "SS29",
    "lineId": "seibu_shinjuku",
    "number": 29,
    "name": "本川越",
    "nameKana": "ほんかわごえ",
    "nameEn": "Honkawagoe",
    "lat": 35.9120462,
    "lng": 139.4803821,
    "transfers": [],
    "address": "埼玉県川越市新富町二丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp",
      "express",
      "commuter_exp",
      "rapid_exp",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
