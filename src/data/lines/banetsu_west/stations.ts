import type { Station } from '../../../types';

export const BANETSU_WEST_STATIONS: Station[] = [
  {
    "id": "BW-01",
    "lineId": "banetsu_west",
    "number": 1,
    "name": "郡山",
    "nameKana": "こおりやま",
    "nameEn": "Koriyama",
    "lat": 37.3981971,
    "lng": 140.3897215,
    "transfers": [
      "東北新幹線",
      "山形新幹線",
      "JR東北本線",
      "JR磐越東線",
      "JR水郡線"
    ],
    "address": "福島県/新潟県郡山駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-02",
    "lineId": "banetsu_west",
    "number": 2,
    "name": "郡山富田",
    "nameKana": "こおりやま とみた",
    "nameEn": "Koriyama-Tomita",
    "lat": 37.420361,
    "lng": 140.3695,
    "transfers": [],
    "address": "福島県/新潟県郡山富田駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
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
    "id": "BW-03",
    "lineId": "banetsu_west",
    "number": 3,
    "name": "喜久田",
    "nameKana": "きくた",
    "nameEn": "Kikuta",
    "lat": 37.451746,
    "lng": 140.341912,
    "transfers": [],
    "address": "福島県/新潟県喜久田駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-04",
    "lineId": "banetsu_west",
    "number": 4,
    "name": "安子ケ島",
    "nameKana": "あんこがしま",
    "nameEn": "Ankogashima",
    "lat": 37.472048,
    "lng": 140.310133,
    "transfers": [],
    "address": "福島県/新潟県安子ケ島駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-05",
    "lineId": "banetsu_west",
    "number": 5,
    "name": "磐梯熱海",
    "nameKana": "ばんだいあたみ",
    "nameEn": "Bandai-Atami",
    "lat": 37.480743,
    "lng": 140.2707,
    "transfers": [],
    "address": "福島県/新潟県磐梯熱海駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-06",
    "lineId": "banetsu_west",
    "number": 6,
    "name": "中山宿",
    "nameKana": "なかやまじゅく",
    "nameEn": "Nakayamajuku",
    "lat": 37.495648,
    "lng": 140.219401,
    "transfers": [],
    "address": "福島県/新潟県中山宿駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-07",
    "lineId": "banetsu_west",
    "number": 7,
    "name": "上戸",
    "nameKana": "じょうこ",
    "nameEn": "Joko",
    "lat": 37.487689,
    "lng": 140.163935,
    "transfers": [],
    "address": "福島県/新潟県上戸駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-08",
    "lineId": "banetsu_west",
    "number": 8,
    "name": "関都",
    "nameKana": "せきと",
    "nameEn": "Sekito",
    "lat": 37.515577,
    "lng": 140.143619,
    "transfers": [],
    "address": "福島県/新潟県関都駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-09",
    "lineId": "banetsu_west",
    "number": 9,
    "name": "川桁",
    "nameKana": "かわげた",
    "nameEn": "Kawageta",
    "lat": 37.5358412,
    "lng": 140.1366292,
    "transfers": [],
    "address": "福島県/新潟県川桁駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-10",
    "lineId": "banetsu_west",
    "number": 10,
    "name": "猪苗代",
    "nameKana": "いなわしろ",
    "nameEn": "Inawashiro",
    "lat": 37.546286,
    "lng": 140.103122,
    "transfers": [],
    "address": "福島県/新潟県猪苗代駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-11",
    "lineId": "banetsu_west",
    "number": 11,
    "name": "翁島",
    "nameKana": "おきなしま",
    "nameEn": "Okinashima",
    "lat": 37.552837,
    "lng": 140.054079,
    "transfers": [],
    "address": "福島県/新潟県翁島駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-12",
    "lineId": "banetsu_west",
    "number": 12,
    "name": "磐梯町",
    "nameKana": "ばんだいまち",
    "nameEn": "Bandaimachi",
    "lat": 37.557305,
    "lng": 139.993413,
    "transfers": [],
    "address": "福島県/新潟県磐梯町駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-13",
    "lineId": "banetsu_west",
    "number": 13,
    "name": "東長原",
    "nameKana": "ひがしながはら",
    "nameEn": "Higashi-Nagahara",
    "lat": 37.566465,
    "lng": 139.948239,
    "transfers": [],
    "address": "福島県/新潟県東長原駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-14",
    "lineId": "banetsu_west",
    "number": 14,
    "name": "広田",
    "nameKana": "ひろた",
    "nameEn": "Hirota",
    "lat": 37.549235,
    "lng": 139.933343,
    "transfers": [],
    "address": "福島県/新潟県広田駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-15",
    "lineId": "banetsu_west",
    "number": 15,
    "name": "会津若松",
    "nameKana": "あいづわかまつ",
    "nameEn": "Aizu-Wakamatsu",
    "lat": 37.508824,
    "lng": 139.930159,
    "transfers": [
      "JR只見線",
      "会津鉄道会津線"
    ],
    "address": "福島県/新潟県会津若松駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-16",
    "lineId": "banetsu_west",
    "number": 16,
    "name": "堂島",
    "nameKana": "どうじま",
    "nameEn": "Dojima",
    "lat": 37.5545985,
    "lng": 139.9119261,
    "transfers": [],
    "address": "福島県/新潟県堂島駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-17",
    "lineId": "banetsu_west",
    "number": 17,
    "name": "笈川",
    "nameKana": "おいかわ",
    "nameEn": "Oikawa",
    "lat": 37.579519,
    "lng": 139.8952506,
    "transfers": [],
    "address": "福島県/新潟県笈川駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-18",
    "lineId": "banetsu_west",
    "number": 18,
    "name": "塩川",
    "nameKana": "しおかわ",
    "nameEn": "Shiokawa",
    "lat": 37.59393,
    "lng": 139.88716,
    "transfers": [],
    "address": "福島県/新潟県塩川駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-19",
    "lineId": "banetsu_west",
    "number": 19,
    "name": "姥堂",
    "nameKana": "うばどう",
    "nameEn": "Ubado",
    "lat": 37.6160875,
    "lng": 139.8810081,
    "transfers": [],
    "address": "福島県/新潟県姥堂駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-20",
    "lineId": "banetsu_west",
    "number": 20,
    "name": "会津豊川",
    "nameKana": "あいづとよかわ",
    "nameEn": "Aizu-Toyokawa",
    "lat": 37.633499,
    "lng": 139.876787,
    "transfers": [],
    "address": "福島県/新潟県会津豊川駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-21",
    "lineId": "banetsu_west",
    "number": 21,
    "name": "喜多方",
    "nameKana": "きたかた",
    "nameEn": "Kitakata",
    "lat": 37.643838,
    "lng": 139.868792,
    "transfers": [],
    "address": "福島県/新潟県喜多方駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-22",
    "lineId": "banetsu_west",
    "number": 22,
    "name": "山都",
    "nameKana": "やまと",
    "nameEn": "Yamato",
    "lat": 37.6388135,
    "lng": 139.7657496,
    "transfers": [],
    "address": "福島県/新潟県山都駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
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
    "id": "BW-23",
    "lineId": "banetsu_west",
    "number": 23,
    "name": "荻野",
    "nameKana": "おぎの",
    "nameEn": "Ogino",
    "lat": 37.6179157,
    "lng": 139.721421,
    "transfers": [],
    "address": "福島県/新潟県荻野駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-24",
    "lineId": "banetsu_west",
    "number": 24,
    "name": "尾登",
    "nameKana": "おぼりと",
    "nameEn": "Oborito",
    "lat": 37.6088517,
    "lng": 139.6913211,
    "transfers": [],
    "address": "福島県/新潟県尾登駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-25",
    "lineId": "banetsu_west",
    "number": 25,
    "name": "野沢",
    "nameKana": "のざわ",
    "nameEn": "Nozawa",
    "lat": 37.5909222,
    "lng": 139.6443845,
    "transfers": [],
    "address": "福島県/新潟県野沢駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-26",
    "lineId": "banetsu_west",
    "number": 26,
    "name": "上野尻",
    "nameKana": "かみのじり",
    "nameEn": "Kaminojiri",
    "lat": 37.6248328,
    "lng": 139.63409,
    "transfers": [],
    "address": "福島県/新潟県上野尻駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-27",
    "lineId": "banetsu_west",
    "number": 27,
    "name": "徳沢",
    "nameKana": "とくさわ",
    "nameEn": "Tokusawa",
    "lat": 37.666876,
    "lng": 139.602879,
    "transfers": [],
    "address": "福島県/新潟県徳沢駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-28",
    "lineId": "banetsu_west",
    "number": 28,
    "name": "豊実",
    "nameKana": "とよみ",
    "nameEn": "Toyomi",
    "lat": 37.680541,
    "lng": 139.576348,
    "transfers": [],
    "address": "福島県/新潟県豊実駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-29",
    "lineId": "banetsu_west",
    "number": 29,
    "name": "日出谷",
    "nameKana": "ひでや",
    "nameEn": "Hideya",
    "lat": 37.7057552,
    "lng": 139.5344616,
    "transfers": [],
    "address": "福島県/新潟県日出谷駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-30",
    "lineId": "banetsu_west",
    "number": 30,
    "name": "鹿瀬",
    "nameKana": "かのせ",
    "nameEn": "Kanose",
    "lat": 37.6957135,
    "lng": 139.4790482,
    "transfers": [],
    "address": "福島県/新潟県鹿瀬駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
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
    "id": "BW-31",
    "lineId": "banetsu_west",
    "number": 31,
    "name": "津川",
    "nameKana": "つがわ",
    "nameEn": "Tsugawa",
    "lat": 37.6880475,
    "lng": 139.4472634,
    "transfers": [],
    "address": "福島県/新潟県津川駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-32",
    "lineId": "banetsu_west",
    "number": 32,
    "name": "三川",
    "nameKana": "みかわ",
    "nameEn": "Mikawa",
    "lat": 37.7079001,
    "lng": 139.3815813,
    "transfers": [],
    "address": "福島県/新潟県三川駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
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
    "id": "BW-33",
    "lineId": "banetsu_west",
    "number": 33,
    "name": "五十島",
    "nameKana": "いがしま",
    "nameEn": "Igashima",
    "lat": 37.715974,
    "lng": 139.353419,
    "transfers": [],
    "address": "福島県/新潟県五十島駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-34",
    "lineId": "banetsu_west",
    "number": 34,
    "name": "東下条",
    "nameKana": "ひがしげじょう",
    "nameEn": "Higashi-Gejo",
    "lat": 37.736876,
    "lng": 139.321815,
    "transfers": [],
    "address": "福島県/新潟県東下条駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-35",
    "lineId": "banetsu_west",
    "number": 35,
    "name": "咲花",
    "nameKana": "さきはな",
    "nameEn": "Sakihana",
    "lat": 37.735003,
    "lng": 139.29095,
    "transfers": [],
    "address": "福島県/新潟県咲花駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
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
    "id": "BW-36",
    "lineId": "banetsu_west",
    "number": 36,
    "name": "馬下",
    "nameKana": "まおろし",
    "nameEn": "Maoroshi",
    "lat": 37.737569,
    "lng": 139.260466,
    "transfers": [],
    "address": "福島県/新潟県馬下駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
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
    "id": "BW-37",
    "lineId": "banetsu_west",
    "number": 37,
    "name": "猿和田",
    "nameKana": "さるわだ",
    "nameEn": "Saruwada",
    "lat": 37.729594,
    "lng": 139.222481,
    "transfers": [],
    "address": "福島県/新潟県猿和田駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-38",
    "lineId": "banetsu_west",
    "number": 38,
    "name": "五泉",
    "nameKana": "ごせん",
    "nameEn": "Gosen",
    "lat": 37.7342694,
    "lng": 139.1798962,
    "transfers": [],
    "address": "福島県/新潟県五泉駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "BW-39",
    "lineId": "banetsu_west",
    "number": 39,
    "name": "北五泉",
    "nameKana": "きたごせん",
    "nameEn": "Kita-Gosen",
    "lat": 37.7469155,
    "lng": 139.1697061,
    "transfers": [],
    "address": "福島県/新潟県北五泉駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-40",
    "lineId": "banetsu_west",
    "number": 40,
    "name": "新関",
    "nameKana": "しんせき",
    "nameEn": "Shinseki",
    "lat": 37.7683848,
    "lng": 139.1625008,
    "transfers": [],
    "address": "福島県/新潟県新関駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-41",
    "lineId": "banetsu_west",
    "number": 41,
    "name": "東新津",
    "nameKana": "ひがしにいつ",
    "nameEn": "Higashi-Niitsu",
    "lat": 37.7874583,
    "lng": 139.14419,
    "transfers": [],
    "address": "福島県/新潟県東新津駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local"
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
    "id": "BW-42",
    "lineId": "banetsu_west",
    "number": 42,
    "name": "新津",
    "nameKana": "にいつ",
    "nameEn": "Niitsu",
    "lat": 37.8000228,
    "lng": 139.1213036,
    "transfers": [
      "JR信越本線",
      "JR羽越本線"
    ],
    "address": "福島県/新潟県新津駅",
    "platforms": {
      "inbound": "上り 郡山方面",
      "outbound": "下り 会津若松・新津方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
