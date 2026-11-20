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
    "lat": 35.69605,
    "lng": 139.70004,
    "transfers": [],
    "address": "東京都西武新宿駅",
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
    "lat": 35.71258,
    "lng": 139.70401,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "東京メトロ東西線"
    ],
    "address": "東京都高田馬場駅",
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
    "lat": 35.71567,
    "lng": 139.69506,
    "transfers": [],
    "address": "東京都下落合駅",
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
    "lat": 35.71501,
    "lng": 139.68594,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都中井駅",
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
    "lat": 35.71592,
    "lng": 139.67207,
    "transfers": [],
    "address": "東京都新井薬師前駅",
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
    "lat": 35.71926,
    "lng": 139.66407,
    "transfers": [],
    "address": "東京都沼袋駅",
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
    "lat": 35.7196,
    "lng": 139.65345,
    "transfers": [],
    "address": "東京都野方駅",
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
    "lat": 35.72236,
    "lng": 139.64482,
    "transfers": [],
    "address": "東京都都立家政駅",
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
    "lat": 35.72263,
    "lng": 139.63905,
    "transfers": [],
    "address": "東京都鷺ノ宮駅",
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
    "lat": 35.72395,
    "lng": 139.62409,
    "transfers": [],
    "address": "東京都下井草駅",
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
    "lat": 35.72467,
    "lng": 139.61541,
    "transfers": [],
    "address": "東京都井荻駅",
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
    "lat": 35.7253,
    "lng": 139.60222,
    "transfers": [],
    "address": "東京都上井草駅",
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
    "lat": 35.72628,
    "lng": 139.59158,
    "transfers": [],
    "address": "東京都上石神井駅",
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
    "lat": 35.72769,
    "lng": 139.57552,
    "transfers": [],
    "address": "東京都武蔵関駅",
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
    "lat": 35.72883,
    "lng": 139.5628,
    "transfers": [],
    "address": "東京都東伏見駅",
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
    "lat": 35.72853,
    "lng": 139.55186,
    "transfers": [],
    "address": "東京都西武柳沢駅",
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
    "lat": 35.7271,
    "lng": 139.5381,
    "transfers": [],
    "address": "東京都田無駅",
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
    "lat": 35.72641,
    "lng": 139.5127,
    "transfers": [],
    "address": "東京都花小金井駅",
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
    "lat": 35.73735,
    "lng": 139.48745,
    "transfers": [
      "西武拝島線"
    ],
    "address": "東京都小平駅",
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
    "lat": 35.75003,
    "lng": 139.47209,
    "transfers": [],
    "address": "東京都久米川駅",
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
    "lat": 35.7609,
    "lng": 139.46591,
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
    "lat": 35.78742,
    "lng": 139.47339,
    "transfers": [
      "西武池袋線"
    ],
    "address": "埼玉県所沢駅",
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
    "lat": 35.79894,
    "lng": 139.46491,
    "transfers": [],
    "address": "埼玉県航空公園駅",
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
    "lat": 35.80662,
    "lng": 139.45626,
    "transfers": [],
    "address": "埼玉県新所沢駅",
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
    "lat": 35.83292,
    "lng": 139.42658,
    "transfers": [],
    "address": "埼玉県入曽駅",
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
    "lat": 35.85738,
    "lng": 139.41337,
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
    "lat": 35.87373,
    "lng": 139.43324,
    "transfers": [],
    "address": "埼玉県新狭山駅",
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
    "lat": 35.88935,
    "lng": 139.45373,
    "transfers": [],
    "address": "埼玉県南大塚駅",
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
    "lat": 35.91205,
    "lng": 139.48037,
    "transfers": [],
    "address": "埼玉県本川越駅",
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