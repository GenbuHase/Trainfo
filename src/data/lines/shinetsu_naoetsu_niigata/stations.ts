import type { Station } from '../../../types';

export const SHINETSU_STATIONS: Station[] = [
  {
    "id": "SE-01",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 1,
    "name": "直江津",
    "nameKana": "なおえつ",
    "nameEn": "Naoetsu",
    "lat": 37.170251,
    "lng": 138.242265,
    "transfers": [
      "えちごトキめき鉄道妙高はねうまライン",
      "えちごトキめき鉄道日本海ひすいライン",
      "北越急行ほくほく線"
    ],
    "address": "新潟県直江津駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-02",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 2,
    "name": "黒井",
    "nameKana": "くろい",
    "nameEn": "Kuroi",
    "lat": 37.1834865,
    "lng": 138.2675381,
    "transfers": [],
    "address": "新潟県黒井駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-03",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 3,
    "name": "犀潟",
    "nameKana": "さいがた",
    "nameEn": "Saigata",
    "lat": 37.210345,
    "lng": 138.305154,
    "transfers": [
      "北越急行ほくほく線"
    ],
    "address": "新潟県犀潟駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-04",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 4,
    "name": "土底浜",
    "nameKana": "どそこはま",
    "nameEn": "Dosokohama",
    "lat": 37.2228273,
    "lng": 138.3250084,
    "transfers": [],
    "address": "新潟県土底浜駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-05",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 5,
    "name": "潟町",
    "nameKana": "かたまち",
    "nameEn": "Katamachi",
    "lat": 37.2338005,
    "lng": 138.3398007,
    "transfers": [],
    "address": "新潟県潟町駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-06",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 6,
    "name": "上下浜",
    "nameKana": "じょうげはま",
    "nameEn": "Joge-hama",
    "lat": 37.2525746,
    "lng": 138.362006,
    "transfers": [],
    "address": "新潟県上下浜駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-07",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 7,
    "name": "柿崎",
    "nameKana": "かきざき",
    "nameEn": "Kakizaki",
    "lat": 37.2778382,
    "lng": 138.3860734,
    "transfers": [],
    "address": "新潟県柿崎駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
    },
    "stoppingTypes": [
      "local",
      "limitedExp"
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
    "id": "SE-08",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 8,
    "name": "米山",
    "nameKana": "よねやま",
    "nameEn": "Yoneyama",
    "lat": 37.3170347,
    "lng": 138.4314806,
    "transfers": [],
    "address": "新潟県米山駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-09",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 9,
    "name": "笠島",
    "nameKana": "かさしま",
    "nameEn": "Kasashima",
    "lat": 37.335794,
    "lng": 138.467221,
    "transfers": [],
    "address": "新潟県笠島駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-10",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 10,
    "name": "青海川",
    "nameKana": "おうみがわ",
    "nameEn": "Omigawa",
    "lat": 37.346143,
    "lng": 138.486169,
    "transfers": [],
    "address": "新潟県青海川駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-11",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 11,
    "name": "鯨波",
    "nameKana": "くじらなみ",
    "nameEn": "Kujiranami",
    "lat": 37.3557485,
    "lng": 138.5167593,
    "transfers": [],
    "address": "新潟県鯨波駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-12",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 12,
    "name": "柏崎",
    "nameKana": "かしわざき",
    "nameEn": "Kashiwazaki",
    "lat": 37.363495,
    "lng": 138.556303,
    "transfers": [
      "JR越後線"
    ],
    "address": "新潟県柏崎駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-13",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 13,
    "name": "茨目",
    "nameKana": "いばらめ",
    "nameEn": "Ibarame",
    "lat": 37.3570971,
    "lng": 138.5864588,
    "transfers": [],
    "address": "新潟県茨目駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-14",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 14,
    "name": "安田",
    "nameKana": "やすだ",
    "nameEn": "Yasuda",
    "lat": 37.341155,
    "lng": 138.612057,
    "transfers": [],
    "address": "新潟県安田駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-15",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 15,
    "name": "北条",
    "nameKana": "きたじょう",
    "nameEn": "Kitajo",
    "lat": 37.3386688,
    "lng": 138.6372948,
    "transfers": [],
    "address": "新潟県北条駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-16",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 16,
    "name": "越後広田",
    "nameKana": "えちごひろた",
    "nameEn": "Echigo-Hirota",
    "lat": 37.357354,
    "lng": 138.661243,
    "transfers": [],
    "address": "新潟県越後広田駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-17",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 17,
    "name": "長鳥",
    "nameKana": "ながとり",
    "nameEn": "Nagatori",
    "lat": 37.3665408,
    "lng": 138.6839148,
    "transfers": [],
    "address": "新潟県長鳥駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-18",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 18,
    "name": "塚山",
    "nameKana": "つかやま",
    "nameEn": "Tsukayama",
    "lat": 37.354974,
    "lng": 138.7296593,
    "transfers": [],
    "address": "新潟県塚山駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-19",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 19,
    "name": "越後岩塚",
    "nameKana": "えちごいわつか",
    "nameEn": "Echigo-Iwatsuka",
    "lat": 37.38629,
    "lng": 138.756372,
    "transfers": [],
    "address": "新潟県越後岩塚駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-20",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 20,
    "name": "来迎寺",
    "nameKana": "らいこうじ",
    "nameEn": "Raikoji",
    "lat": 37.3972487,
    "lng": 138.7838122,
    "transfers": [],
    "address": "新潟県来迎寺駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-21",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 21,
    "name": "前川",
    "nameKana": "まえかわ",
    "nameEn": "Maekawa",
    "lat": 37.401935,
    "lng": 138.8240178,
    "transfers": [],
    "address": "新潟県前川駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-22",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 22,
    "name": "宮内",
    "nameKana": "みやうち",
    "nameEn": "Miyauchi",
    "lat": 37.4228265,
    "lng": 138.840411,
    "transfers": [
      "JR上越線"
    ],
    "address": "新潟県長岡市宮内三丁目",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-23",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 23,
    "name": "長岡",
    "nameKana": "ながおか",
    "nameEn": "Nagaoka",
    "lat": 37.447787,
    "lng": 138.853927,
    "transfers": [
      "上越新幹線",
      "JR上越線"
    ],
    "address": "新潟県長岡駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-24",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 24,
    "name": "北長岡",
    "nameKana": "きたながおか",
    "nameEn": "Kita-Nagaoka",
    "lat": 37.468768,
    "lng": 138.86247,
    "transfers": [],
    "address": "新潟県北長岡駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-25",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 25,
    "name": "押切",
    "nameKana": "おしきり",
    "nameEn": "Oshikiri",
    "lat": 37.5047526,
    "lng": 138.8812197,
    "transfers": [],
    "address": "新潟県押切駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-26",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 26,
    "name": "見附",
    "nameKana": "みつけ",
    "nameEn": "Mitsuke",
    "lat": 37.540094,
    "lng": 138.904792,
    "transfers": [],
    "address": "新潟県見附駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-27",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 27,
    "name": "帯織",
    "nameKana": "おびおり",
    "nameEn": "Obiori",
    "lat": 37.572975,
    "lng": 138.92848,
    "transfers": [],
    "address": "新潟県帯織駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-28",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 28,
    "name": "東光寺",
    "nameKana": "とうこうじ",
    "nameEn": "Tokoji",
    "lat": 37.5940323,
    "lng": 138.9436914,
    "transfers": [],
    "address": "新潟県東光寺駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-29",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 29,
    "name": "三条",
    "nameKana": "さんじょう",
    "nameEn": "Sanjo",
    "lat": 37.6211398,
    "lng": 138.960895,
    "transfers": [],
    "address": "新潟県三条駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-30",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 30,
    "name": "東三条",
    "nameKana": "ひがしさんじょう",
    "nameEn": "Higashi-Sanjo",
    "lat": 37.628366,
    "lng": 138.9733152,
    "transfers": [
      "JR弥彦線"
    ],
    "address": "新潟県東三条駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-31",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 31,
    "name": "保内",
    "nameKana": "ほない",
    "nameEn": "Honai",
    "lat": 37.639322,
    "lng": 139.014608,
    "transfers": [],
    "address": "新潟県保内駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-32",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 32,
    "name": "加茂",
    "nameKana": "かも",
    "nameEn": "Kamo",
    "lat": 37.6586869,
    "lng": 139.0488533,
    "transfers": [],
    "address": "新潟県加茂駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-33",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 33,
    "name": "羽生田",
    "nameKana": "はにゅうだ",
    "nameEn": "Hanyuda",
    "lat": 37.6934505,
    "lng": 139.0606049,
    "transfers": [],
    "address": "新潟県羽生田駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-34",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 34,
    "name": "田上",
    "nameKana": "たがみ",
    "nameEn": "Tagami",
    "lat": 37.719418,
    "lng": 139.0748184,
    "transfers": [],
    "address": "新潟県田上駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-35",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 35,
    "name": "矢代田",
    "nameKana": "やしろだ",
    "nameEn": "Yashiroda",
    "lat": 37.7491452,
    "lng": 139.0956439,
    "transfers": [],
    "address": "新潟県矢代田駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-36",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 36,
    "name": "古津",
    "nameKana": "ふるつ",
    "nameEn": "Furutsu",
    "lat": 37.7728979,
    "lng": 139.1144269,
    "transfers": [],
    "address": "新潟県古津駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-37",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 37,
    "name": "新津",
    "nameKana": "にいつ",
    "nameEn": "Niitsu",
    "lat": 37.8000228,
    "lng": 139.1213036,
    "transfers": [
      "JR羽越本線",
      "JR磐越西線"
    ],
    "address": "新潟県新津駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-38",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 38,
    "name": "さつき野",
    "nameKana": "さつきの",
    "nameEn": "Satsukino",
    "lat": 37.8133093,
    "lng": 139.117155,
    "transfers": [],
    "address": "新潟県さつき野駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-39",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 39,
    "name": "荻川",
    "nameKana": "おぎかわ",
    "nameEn": "Ogikawa",
    "lat": 37.833307,
    "lng": 139.111477,
    "transfers": [],
    "address": "新潟県荻川駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-40",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 40,
    "name": "亀田",
    "nameKana": "かめだ",
    "nameEn": "Kameda",
    "lat": 37.877154,
    "lng": 139.108065,
    "transfers": [],
    "address": "新潟県亀田駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-41",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 41,
    "name": "越後石山",
    "nameKana": "えちごいしやま",
    "nameEn": "Echigo-Ishiyama",
    "lat": 37.8965401,
    "lng": 139.0952171,
    "transfers": [],
    "address": "新潟県越後石山駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
    "id": "SE-42",
    "lineId": "shinetsu_naoetsu_niigata",
    "number": 42,
    "name": "新潟",
    "nameKana": "にいがた",
    "nameEn": "Niigata",
    "lat": 37.912323,
    "lng": 139.0612537,
    "transfers": [
      "上越新幹線",
      "JR白新線",
      "JR越後線"
    ],
    "address": "新潟県新潟駅",
    "platforms": {
      "inbound": "上り 直江津方面",
      "outbound": "下り 新潟方面"
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
