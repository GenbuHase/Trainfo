import type { Station } from '../../../types';

export const JOBAN_SENDAI_STATIONS: Station[] = [
  {
    "id": "JSD-01",
    "lineId": "joban_sendai",
    "number": 1,
    "name": "いわき",
    "nameKana": "いわき",
    "nameEn": "Iwaki",
    "lat": 37.0583,
    "lng": 140.8922,
    "transfers": [
      "JR常磐線(取手～いわき)",
      "JR磐越東線"
    ],
    "address": "福島県いわき市平字田町1",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "3・4・5番線"
    }
  },
  {
    "id": "JSD-02",
    "lineId": "joban_sendai",
    "number": 2,
    "name": "草野",
    "nameKana": "くさの",
    "nameEn": "Kusano",
    "lat": 37.074,
    "lng": 140.9473,
    "transfers": [],
    "address": "福島県いわき市平泉崎字中島",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-03",
    "lineId": "joban_sendai",
    "number": 3,
    "name": "四ツ倉",
    "nameKana": "よつくら",
    "nameEn": "Yotsukura",
    "lat": 37.1027,
    "lng": 140.9812,
    "transfers": [],
    "address": "福島県いわき市四倉町字鬼越",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-04",
    "lineId": "joban_sendai",
    "number": 4,
    "name": "久ノ浜",
    "nameKana": "ひさのはま",
    "nameEn": "Hisanohama",
    "lat": 37.1423,
    "lng": 140.9957,
    "transfers": [],
    "address": "福島県いわき市久之浜町久之浜字北町",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-05",
    "lineId": "joban_sendai",
    "number": 5,
    "name": "末続",
    "nameKana": "すえつぎ",
    "nameEn": "Suetsugi",
    "lat": 37.1725,
    "lng": 140.9955,
    "transfers": [],
    "address": "福島県いわき市久之浜町末続字代",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-06",
    "lineId": "joban_sendai",
    "number": 6,
    "name": "広野",
    "nameKana": "ひろの",
    "nameEn": "Hirono",
    "lat": 37.2121,
    "lng": 140.9992,
    "transfers": [],
    "address": "福島県双葉郡広野町大字下北迫字苗代替",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-07",
    "lineId": "joban_sendai",
    "number": 7,
    "name": "Ｊヴィレッジ",
    "nameKana": "じぇいびれっじ",
    "nameEn": "J-Village",
    "lat": 37.242,
    "lng": 141.0074,
    "transfers": [],
    "address": "福島県双葉郡楢葉町大字山田岡字林脇",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-08",
    "lineId": "joban_sendai",
    "number": 8,
    "name": "木戸",
    "nameKana": "きど",
    "nameEn": "Kido",
    "lat": 37.2579,
    "lng": 141.0025,
    "transfers": [],
    "address": "福島県双葉郡楢葉町大字山田岡字本町",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-09",
    "lineId": "joban_sendai",
    "number": 9,
    "name": "竜田",
    "nameKana": "たつた",
    "nameEn": "Tatsuta",
    "lat": 37.2826,
    "lng": 141.0027,
    "transfers": [],
    "address": "福島県双葉郡楢葉町大字井出字木屋",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-10",
    "lineId": "joban_sendai",
    "number": 10,
    "name": "富岡",
    "nameKana": "とみおか",
    "nameEn": "Tomioka",
    "lat": 37.3352,
    "lng": 141.0225,
    "transfers": [],
    "address": "福島県双葉郡富岡町大字仏浜字釜田",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-11",
    "lineId": "joban_sendai",
    "number": 11,
    "name": "夜ノ森",
    "nameKana": "よのもり",
    "nameEn": "Yonomori",
    "lat": 37.3659,
    "lng": 140.992,
    "transfers": [],
    "address": "福島県双葉郡富岡町夜の森南二丁目",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-12",
    "lineId": "joban_sendai",
    "number": 12,
    "name": "大野",
    "nameKana": "おおの",
    "nameEn": "Ono",
    "lat": 37.4092,
    "lng": 140.9841,
    "transfers": [],
    "address": "福島県双葉郡大熊町大字下野上字大野",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-13",
    "lineId": "joban_sendai",
    "number": 13,
    "name": "双葉",
    "nameKana": "ふたば",
    "nameEn": "Futaba",
    "lat": 37.4538,
    "lng": 141.0058,
    "transfers": [],
    "address": "福島県双葉郡双葉町大字長塚字町西",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-14",
    "lineId": "joban_sendai",
    "number": 14,
    "name": "浪江",
    "nameKana": "なみえ",
    "nameEn": "Namie",
    "lat": 37.492,
    "lng": 140.9899,
    "transfers": [],
    "address": "福島県双葉郡浪江町大字権現堂字新町",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-15",
    "lineId": "joban_sendai",
    "number": 15,
    "name": "桃内",
    "nameKana": "ももうち",
    "nameEn": "Momouchi",
    "lat": 37.5289,
    "lng": 140.9845,
    "transfers": [],
    "address": "福島県南相馬市小高区耳谷字桃内",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-16",
    "lineId": "joban_sendai",
    "number": 16,
    "name": "小高",
    "nameKana": "おだか",
    "nameEn": "Odaka",
    "lat": 37.5629,
    "lng": 140.9963,
    "transfers": [],
    "address": "福島県南相馬市小高区東町一丁目",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-17",
    "lineId": "joban_sendai",
    "number": 17,
    "name": "磐城太田",
    "nameKana": "いわきおおた",
    "nameEn": "Iwaki-Ota",
    "lat": 37.6048,
    "lng": 140.9918,
    "transfers": [],
    "address": "福島県南相馬市原町区矢川原字島田",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-18",
    "lineId": "joban_sendai",
    "number": 18,
    "name": "原ノ町",
    "nameKana": "はらのまち",
    "nameEn": "Haranomachi",
    "lat": 37.6378,
    "lng": 140.9713,
    "transfers": [],
    "address": "福島県南相馬市原町区旭町二丁目",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-19",
    "lineId": "joban_sendai",
    "number": 19,
    "name": "鹿島",
    "nameKana": "かしま",
    "nameEn": "Kashima",
    "lat": 37.7026,
    "lng": 140.9703,
    "transfers": [],
    "address": "福島県南相馬市鹿島区鹿島字町",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-20",
    "lineId": "joban_sendai",
    "number": 20,
    "name": "日立木",
    "nameKana": "にったき",
    "nameEn": "Nittaki",
    "lat": 37.756,
    "lng": 140.9347,
    "transfers": [],
    "address": "福島県相馬市日立木字堀ノ内",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-21",
    "lineId": "joban_sendai",
    "number": 21,
    "name": "相馬",
    "nameKana": "そうま",
    "nameEn": "Soma",
    "lat": 37.8029,
    "lng": 140.9256,
    "transfers": [],
    "address": "福島県相馬市中村字曲田",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-22",
    "lineId": "joban_sendai",
    "number": 22,
    "name": "駒ケ嶺",
    "nameKana": "こまがみね",
    "nameEn": "Komagamine",
    "lat": 37.8421,
    "lng": 140.9251,
    "transfers": [],
    "address": "福島県相馬郡新地町駒ケ嶺字深町",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-23",
    "lineId": "joban_sendai",
    "number": 23,
    "name": "新地",
    "nameKana": "しんち",
    "nameEn": "Shinchi",
    "lat": 37.8794,
    "lng": 140.9255,
    "transfers": [],
    "address": "福島県相馬郡新地町谷地小屋",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-24",
    "lineId": "joban_sendai",
    "number": 24,
    "name": "坂元",
    "nameKana": "さかもと",
    "nameEn": "Sakamoto",
    "lat": 37.9242,
    "lng": 140.901,
    "transfers": [],
    "address": "宮城県亘理郡山元町坂元字町西",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-25",
    "lineId": "joban_sendai",
    "number": 25,
    "name": "山下",
    "nameKana": "やました",
    "nameEn": "Yamashita",
    "lat": 37.9662,
    "lng": 140.889,
    "transfers": [],
    "address": "宮城県亘理郡山元町つばめの杜一丁目",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-26",
    "lineId": "joban_sendai",
    "number": 26,
    "name": "浜吉田",
    "nameKana": "はまよしだ",
    "nameEn": "Hamayoshida",
    "lat": 38.0023,
    "lng": 140.89,
    "transfers": [],
    "address": "宮城県亘理郡亘理町吉田字流",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-27",
    "lineId": "joban_sendai",
    "number": 27,
    "name": "亘理",
    "nameKana": "わたり",
    "nameEn": "Watari",
    "lat": 38.0396,
    "lng": 140.8615,
    "transfers": [],
    "address": "宮城県亘理郡亘理町字道田",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-28",
    "lineId": "joban_sendai",
    "number": 28,
    "name": "逢隈",
    "nameKana": "おおくま",
    "nameEn": "Okuma",
    "lat": 38.0672,
    "lng": 140.8548,
    "transfers": [],
    "address": "宮城県亘理郡亘理町逢隈下郡字生勝",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-29",
    "lineId": "joban_sendai",
    "number": 29,
    "name": "岩沼",
    "nameKana": "いわぬま",
    "nameEn": "Iwanuma",
    "lat": 38.1121,
    "lng": 140.864,
    "transfers": [
      "JR東北本線"
    ],
    "address": "宮城県岩沼市館下一丁目4-1",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "4・5番線"
    }
  },
  {
    "id": "JSD-30",
    "lineId": "joban_sendai",
    "number": 30,
    "name": "館腰",
    "nameKana": "たてこし",
    "nameEn": "Tatekoshi",
    "lat": 38.1431,
    "lng": 140.8803,
    "transfers": [
      "JR東北本線"
    ],
    "address": "宮城県名取市植松四丁目",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-31",
    "lineId": "joban_sendai",
    "number": 31,
    "name": "名取",
    "nameKana": "なとり",
    "nameEn": "Natori",
    "lat": 38.1734,
    "lng": 140.8827,
    "transfers": [
      "JR東北本線",
      "仙台空港アクセス線"
    ],
    "address": "宮城県名取市増田二丁目5-1",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-32",
    "lineId": "joban_sendai",
    "number": 32,
    "name": "南仙台",
    "nameKana": "みなみせんだい",
    "nameEn": "Minami-Sendai",
    "lat": 38.1973,
    "lng": 140.8834,
    "transfers": [
      "JR東北本線"
    ],
    "address": "宮城県仙台市太白区中田五丁目1-1",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-33",
    "lineId": "joban_sendai",
    "number": 33,
    "name": "太子堂",
    "nameKana": "たいしどう",
    "nameEn": "Taishido",
    "lat": 38.2178,
    "lng": 140.8834,
    "transfers": [
      "JR東北本線"
    ],
    "address": "宮城県仙台市太白区太子堂1-1",
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
      "limited_express"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-34",
    "lineId": "joban_sendai",
    "number": 34,
    "name": "長町",
    "nameKana": "ながまち",
    "nameEn": "Nagamachi",
    "lat": 38.2268,
    "lng": 140.8855,
    "transfers": [
      "JR東北本線",
      "仙台市地下鉄南北線"
    ],
    "address": "宮城県仙台市太白区長町五丁目1-1",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JSD-35",
    "lineId": "joban_sendai",
    "number": 35,
    "name": "仙台",
    "nameKana": "せんだい",
    "nameEn": "Sendai",
    "lat": 38.2599,
    "lng": 140.8823,
    "transfers": [
      "JR東北本線",
      "JR仙山線",
      "JR仙石線",
      "東北新幹線",
      "秋田新幹線",
      "仙台市地下鉄南北線",
      "仙台市地下鉄東西線"
    ],
    "address": "宮城県仙台市青葉区中央一丁目1-1",
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
      "limited_express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2・4・5・6番線",
      "outbound": "臨時"
    }
  }
];
