// JR東日本 大糸線 駅メタデータ定義 (松本 〜 南小谷 全33駅)
import type { Station } from '../../../types';

export const OITO_EAST_STATIONS: Station[] = [
  {
    "id": "OIE-01",
    "lineId": "oito_east",
    "number": 1,
    "name": "松本",
    "nameKana": "まつもと",
    "nameEn": "Matsumoto",
    "lat": 36.2307332,
    "lng": 137.9644409,
    "transfers": [
      "JR篠ノ井線",
      "アルピコ交通上高地線"
    ],
    "address": "長野県松本市深志1丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "7番線",
      "outbound": "7番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OIE-02",
    "lineId": "oito_east",
    "number": 2,
    "name": "北松本",
    "nameKana": "きたまつもと",
    "nameEn": "Kita-Matsumoto",
    "lat": 36.2372268,
    "lng": 137.9608288,
    "transfers": [],
    "address": "長野県松本市白板1丁目",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-03",
    "lineId": "oito_east",
    "number": 3,
    "name": "島内",
    "nameKana": "しまうち",
    "nameEn": "Shimauchi",
    "lat": 36.2469638,
    "lng": 137.9450869,
    "transfers": [],
    "address": "長野県松本市大字島内",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-04",
    "lineId": "oito_east",
    "number": 4,
    "name": "島高松",
    "nameKana": "しまたかまつ",
    "nameEn": "Shimatakamatsu",
    "lat": 36.2463693,
    "lng": 137.9316008,
    "transfers": [],
    "address": "長野県松本市大字島内高松",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-05",
    "lineId": "oito_east",
    "number": 5,
    "name": "梓橋",
    "nameKana": "あずさばし",
    "nameEn": "Azusabashi",
    "lat": 36.250318,
    "lng": 137.9180932,
    "transfers": [],
    "address": "長野県安曇野市豊科高家",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-06",
    "lineId": "oito_east",
    "number": 6,
    "name": "一日市場",
    "nameKana": "ひといちば",
    "nameEn": "Hitoichiba",
    "lat": 36.2597548,
    "lng": 137.9042034,
    "transfers": [],
    "address": "長野県安曇野市三郷温",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-07",
    "lineId": "oito_east",
    "number": 7,
    "name": "中萱",
    "nameKana": "なかがや",
    "nameEn": "Nakagaya",
    "lat": 36.2733565,
    "lng": 137.9032901,
    "transfers": [],
    "address": "長野県安曇野市三郷明盛",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-08",
    "lineId": "oito_east",
    "number": 8,
    "name": "南豊科",
    "nameKana": "みなみとよしな",
    "nameEn": "Minami-Toyoshina",
    "lat": 36.2915817,
    "lng": 137.9034132,
    "transfers": [],
    "address": "長野県安曇野市豊科",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-09",
    "lineId": "oito_east",
    "number": 9,
    "name": "豊科",
    "nameKana": "とよしな",
    "nameEn": "Toyoshina",
    "lat": 36.300236,
    "lng": 137.900805,
    "transfers": [],
    "address": "長野県安曇野市豊科",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OIE-10",
    "lineId": "oito_east",
    "number": 10,
    "name": "柏矢町",
    "nameKana": "はくやちょう",
    "nameEn": "Hakuyachō",
    "lat": 36.3230992,
    "lng": 137.8882536,
    "transfers": [],
    "address": "長野県安曇野市穂高柏原",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-11",
    "lineId": "oito_east",
    "number": 11,
    "name": "穂高",
    "nameKana": "ほたか",
    "nameEn": "Hotaka",
    "lat": 36.339565,
    "lng": 137.8817573,
    "transfers": [],
    "address": "長野県安曇野市穂高",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OIE-12",
    "lineId": "oito_east",
    "number": 12,
    "name": "有明",
    "nameKana": "ありあけ",
    "nameEn": "Ariake",
    "lat": 36.3594344,
    "lng": 137.8784072,
    "transfers": [],
    "address": "長野県安曇野市穂高北穂高",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-13",
    "lineId": "oito_east",
    "number": 13,
    "name": "安曇追分",
    "nameKana": "あずみおいわけ",
    "nameEn": "Azumi-Oiwake",
    "lat": 36.3714275,
    "lng": 137.8731033,
    "transfers": [],
    "address": "長野県安曇野市穂高北穂高",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-14",
    "lineId": "oito_east",
    "number": 14,
    "name": "細野",
    "nameKana": "ほその",
    "nameEn": "Hosono",
    "lat": 36.3970063,
    "lng": 137.8656351,
    "transfers": [],
    "address": "長野県北安曇郡松川村細野",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-15",
    "lineId": "oito_east",
    "number": 15,
    "name": "北細野",
    "nameKana": "きたほその",
    "nameEn": "Kita-Hosono",
    "lat": 36.406168,
    "lng": 137.8628424,
    "transfers": [],
    "address": "長野県北安曇郡松川村北細野",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-16",
    "lineId": "oito_east",
    "number": 16,
    "name": "信濃松川",
    "nameKana": "しなのまつかわ",
    "nameEn": "Shinano-Matsukawa",
    "lat": 36.4252515,
    "lng": 137.8584757,
    "transfers": [],
    "address": "長野県北安曇郡松川村",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OIE-17",
    "lineId": "oito_east",
    "number": 17,
    "name": "安曇沓掛",
    "nameKana": "あずみくつかけ",
    "nameEn": "Azumi-Kutsukake",
    "lat": 36.4478797,
    "lng": 137.8546502,
    "transfers": [],
    "address": "長野県大町市大町沓掛",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-18",
    "lineId": "oito_east",
    "number": 18,
    "name": "信濃常盤",
    "nameKana": "しなのときわ",
    "nameEn": "Shinano-Tokiwa",
    "lat": 36.4671986,
    "lng": 137.8471729,
    "transfers": [],
    "address": "長野県大町市常盤",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-19",
    "lineId": "oito_east",
    "number": 19,
    "name": "南大町",
    "nameKana": "みなみおおまち",
    "nameEn": "Minami-Ōmachi",
    "lat": 36.4914786,
    "lng": 137.8562891,
    "transfers": [],
    "address": "長野県大町市大町南大町",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-20",
    "lineId": "oito_east",
    "number": 20,
    "name": "信濃大町",
    "nameKana": "しなのおおまち",
    "nameEn": "Shinano-Ōmachi",
    "lat": 36.5000485,
    "lng": 137.8615603,
    "transfers": [],
    "address": "長野県大町市大町名店街",
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OIE-21",
    "lineId": "oito_east",
    "number": 21,
    "name": "北大町",
    "nameKana": "きたおおまち",
    "nameEn": "Kita-Ōmachi",
    "lat": 36.5175965,
    "lng": 137.8579739,
    "transfers": [],
    "address": "長野県大町市大町北大町",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-22",
    "lineId": "oito_east",
    "number": 22,
    "name": "信濃木崎",
    "nameKana": "しなのきざき",
    "nameEn": "Shinano-Kizaki",
    "lat": 36.5357273,
    "lng": 137.8459689,
    "transfers": [],
    "address": "長野県大町市平木崎",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-23",
    "lineId": "oito_east",
    "number": 23,
    "name": "稲尾",
    "nameKana": "いなお",
    "nameEn": "Inao",
    "lat": 36.554287,
    "lng": 137.8426393,
    "transfers": [],
    "address": "長野県大町市平稲尾",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-24",
    "lineId": "oito_east",
    "number": 24,
    "name": "海ノ口",
    "nameKana": "うみのくち",
    "nameEn": "Uminokuchi",
    "lat": 36.5656042,
    "lng": 137.8419319,
    "transfers": [],
    "address": "長野県大町市平海ノ口",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-25",
    "lineId": "oito_east",
    "number": 25,
    "name": "簗場",
    "nameKana": "やなば",
    "nameEn": "Yanaba",
    "lat": 36.5946882,
    "lng": 137.844503,
    "transfers": [],
    "address": "長野県大町市平簗場",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-26",
    "lineId": "oito_east",
    "number": 26,
    "name": "南神城",
    "nameKana": "みなみかみしろ",
    "nameEn": "Minami-Kamishiro",
    "lat": 36.6369373,
    "lng": 137.8413579,
    "transfers": [],
    "address": "長野県北安曇郡白馬村大字神城南神城",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-27",
    "lineId": "oito_east",
    "number": 27,
    "name": "神城",
    "nameKana": "かみしろ",
    "nameEn": "Kamishiro",
    "lat": 36.6578773,
    "lng": 137.8465252,
    "transfers": [],
    "address": "長野県北安曇郡白馬村大字神城",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-28",
    "lineId": "oito_east",
    "number": 28,
    "name": "飯森",
    "nameKana": "いいもり",
    "nameEn": "Iimori",
    "lat": 36.6706633,
    "lng": 137.8500449,
    "transfers": [],
    "address": "長野県北安曇郡白馬村大字神城飯森",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-29",
    "lineId": "oito_east",
    "number": 29,
    "name": "白馬",
    "nameKana": "はくば",
    "nameEn": "Hakuba",
    "lat": 36.6957897,
    "lng": 137.8637087,
    "transfers": [],
    "address": "長野県北安曇郡白馬村大字北城四ッ谷",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OIE-30",
    "lineId": "oito_east",
    "number": 30,
    "name": "信濃森上",
    "nameKana": "しなのもりがみ",
    "nameEn": "Shinano-Morigami",
    "lat": 36.7109825,
    "lng": 137.8715797,
    "transfers": [],
    "address": "長野県北安曇郡白馬村大字北城森上",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-31",
    "lineId": "oito_east",
    "number": 31,
    "name": "白馬大池",
    "nameKana": "はくばおおいけ",
    "nameEn": "Hakuba-Ōike",
    "lat": 36.7406069,
    "lng": 137.8854413,
    "transfers": [],
    "address": "長野県北安曇郡小谷村大字千国",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-32",
    "lineId": "oito_east",
    "number": 32,
    "name": "千国",
    "nameKana": "ちくに",
    "nameEn": "Chikuni",
    "lat": 36.7635493,
    "lng": 137.9008761,
    "transfers": [],
    "address": "長野県北安曇郡小谷村大字千国",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OIE-33",
    "lineId": "oito_east",
    "number": 33,
    "name": "南小谷",
    "nameKana": "みなみおたり",
    "nameEn": "Minami-Otari",
    "lat": 36.7747757,
    "lng": 137.9083742,
    "transfers": [
      "JR西日本 大糸線"
    ],
    "address": "長野県北安曇郡小谷村大字千国乙",
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "limitedExp"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
