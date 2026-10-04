// 秩父鉄道秩父本線 駅定義 (羽生 〜 三峰口 全37駅)
import type { Station } from '../../../types';

export const CHICHIBU_STATIONS: Station[] = [
  {
    "id": "CR-01",
    "lineId": "chichibu",
    "number": 1,
    "name": "羽生",
    "nameKana": "はにゅう",
    "nameEn": "Hanyū",
    "lat": 36.1703156,
    "lng": 139.5336907,
    "transfers": [
      "東武伊勢崎線"
    ],
    "address": "埼玉県羽生市南1丁目1-62",
    "platforms": {
      "inbound": "4・5番線",
      "outbound": "4・5番線"
    },
    "stoppingTypes": [
      "local",
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
    "id": "CR-02",
    "lineId": "chichibu",
    "number": 2,
    "name": "西羽生",
    "nameKana": "にしはにゅう",
    "nameEn": "Nishi-Hanyū",
    "lat": 36.1764491,
    "lng": 139.5238142,
    "transfers": [],
    "address": "埼玉県羽生市西5丁目32-2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-03",
    "lineId": "chichibu",
    "number": 3,
    "name": "新郷",
    "nameKana": "しんごう",
    "nameEn": "Shingō",
    "lat": 36.1710666,
    "lng": 139.5099799,
    "transfers": [],
    "address": "埼玉県羽生市大字上新郷1950",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-04",
    "lineId": "chichibu",
    "number": 4,
    "name": "武州荒木",
    "nameKana": "ぶしゅうあらき",
    "nameEn": "Bushū-Araki",
    "lat": 36.1623398,
    "lng": 139.4881675,
    "transfers": [],
    "address": "埼玉県行田市大字荒木1411",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-05",
    "lineId": "chichibu",
    "number": 5,
    "name": "東行田",
    "nameKana": "ひがしぎょうだ",
    "nameEn": "Higashi-Gyōda",
    "lat": 36.1474163,
    "lng": 139.4685245,
    "transfers": [],
    "address": "埼玉県行田市桜町2丁目23-12",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-06",
    "lineId": "chichibu",
    "number": 6,
    "name": "行田市",
    "nameKana": "ぎょうだし",
    "nameEn": "Gyōdashi",
    "lat": 36.1435614,
    "lng": 139.4590398,
    "transfers": [],
    "address": "埼玉県行田市中央19-18",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-07",
    "lineId": "chichibu",
    "number": 7,
    "name": "持田",
    "nameKana": "もちだ",
    "nameEn": "Mochida",
    "lat": 36.1377617,
    "lng": 139.4422305,
    "transfers": [],
    "address": "埼玉県行田市城西4丁目6-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-08",
    "lineId": "chichibu",
    "number": 8,
    "name": "ソシオ流通センター",
    "nameKana": "そしおりゅうつうせんたー",
    "nameEn": "Socio Distribution Center",
    "lat": 36.1365449,
    "lng": 139.4244046,
    "transfers": [],
    "address": "埼玉県熊谷市戸出102-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-09",
    "lineId": "chichibu",
    "number": 9,
    "name": "熊谷",
    "nameKana": "くまがや",
    "nameEn": "Kumagaya",
    "lat": 36.1392175,
    "lng": 139.389546,
    "transfers": [
      "JR高崎線",
      "上越新幹線",
      "北陸新幹線"
    ],
    "address": "埼玉県熊谷市桜木町1丁目202-1",
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "5・6番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
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
    "id": "CR-10",
    "lineId": "chichibu",
    "number": 10,
    "name": "上熊谷",
    "nameKana": "かみくまがや",
    "nameEn": "Kami-Kumagaya",
    "lat": 36.142693,
    "lng": 139.3813634,
    "transfers": [],
    "address": "埼玉県熊谷市宮本町255",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-11",
    "lineId": "chichibu",
    "number": 11,
    "name": "石原",
    "nameKana": "いしわら",
    "nameEn": "Ishiwara",
    "lat": 36.1479023,
    "lng": 139.3683435,
    "transfers": [],
    "address": "埼玉県熊谷市石原1485-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-12",
    "lineId": "chichibu",
    "number": 12,
    "name": "ひろせ野鳥の森",
    "nameKana": "ひろせやちょうのもり",
    "nameEn": "Hirose-Yachō-no-Mori",
    "lat": 36.1461795,
    "lng": 139.3520463,
    "transfers": [],
    "address": "埼玉県熊谷市広瀬1040-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-13",
    "lineId": "chichibu",
    "number": 13,
    "name": "大麻生",
    "nameKana": "おおあそう",
    "nameEn": "Ōasō",
    "lat": 36.144622,
    "lng": 139.3319695,
    "transfers": [],
    "address": "埼玉県熊谷市大麻生1921-6",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-14",
    "lineId": "chichibu",
    "number": 14,
    "name": "明戸",
    "nameKana": "あけと",
    "nameEn": "Aketo",
    "lat": 36.1429979,
    "lng": 139.3039926,
    "transfers": [],
    "address": "埼玉県深谷市瀬山578-8",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-15",
    "lineId": "chichibu",
    "number": 15,
    "name": "武川",
    "nameKana": "たけかわ",
    "nameEn": "Takekawa",
    "lat": 36.1422595,
    "lng": 139.2831449,
    "transfers": [],
    "address": "埼玉県深谷市田中77",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-16",
    "lineId": "chichibu",
    "number": 16,
    "name": "永田",
    "nameKana": "ながた",
    "nameEn": "Nagata",
    "lat": 36.1351058,
    "lng": 139.2588323,
    "transfers": [],
    "address": "埼玉県深谷市永田155-4",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-17",
    "lineId": "chichibu",
    "number": 17,
    "name": "ふかや花園",
    "nameKana": "ふかやはなぞの",
    "nameEn": "Fukaya-Hanazono",
    "lat": 36.1308504,
    "lng": 139.2485959,
    "transfers": [],
    "address": "埼玉県深谷市黒田113",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-18",
    "lineId": "chichibu",
    "number": 18,
    "name": "小前田",
    "nameKana": "おまえだ",
    "nameEn": "Omaeda",
    "lat": 36.1288966,
    "lng": 139.2206423,
    "transfers": [],
    "address": "埼玉県深谷市小前田1680-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-19",
    "lineId": "chichibu",
    "number": 19,
    "name": "桜沢",
    "nameKana": "さくらざわ",
    "nameEn": "Sakurazawa",
    "lat": 36.1286416,
    "lng": 139.2070989,
    "transfers": [],
    "address": "埼玉県大里郡寄居町大字桜沢1987-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-20",
    "lineId": "chichibu",
    "number": 20,
    "name": "寄居",
    "nameKana": "よりい",
    "nameEn": "Yorii",
    "lat": 36.1178408,
    "lng": 139.1946701,
    "transfers": [
      "JR八高線",
      "東武東上線"
    ],
    "address": "埼玉県大里郡寄居町大字寄居1071-2",
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "5・6番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
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
    "id": "CR-21",
    "lineId": "chichibu",
    "number": 21,
    "name": "波久礼",
    "nameKana": "はぐれ",
    "nameEn": "Hagure",
    "lat": 36.1265725,
    "lng": 139.1581458,
    "transfers": [],
    "address": "埼玉県大里郡寄居町大字末野81-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-22",
    "lineId": "chichibu",
    "number": 22,
    "name": "樋口",
    "nameKana": "ひぐち",
    "nameEn": "Higuchi",
    "lat": 36.1309863,
    "lng": 139.1219958,
    "transfers": [],
    "address": "埼玉県秩父郡長瀞町大字野上下郷939-4",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-23",
    "lineId": "chichibu",
    "number": 23,
    "name": "野上",
    "nameKana": "のがみ",
    "nameEn": "Nogami",
    "lat": 36.1124186,
    "lng": 139.1108563,
    "transfers": [],
    "address": "埼玉県秩父郡長瀞町大字本野上281-3",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-24",
    "lineId": "chichibu",
    "number": 24,
    "name": "長瀞",
    "nameKana": "ながとろ",
    "nameEn": "Nagatoro",
    "lat": 36.0952558,
    "lng": 139.1124578,
    "transfers": [],
    "address": "埼玉県秩父郡長瀞町大字長瀞529",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-25",
    "lineId": "chichibu",
    "number": 25,
    "name": "上長瀞",
    "nameKana": "かみながとろ",
    "nameEn": "Kami-Nagatoro",
    "lat": 36.0863848,
    "lng": 139.1131309,
    "transfers": [],
    "address": "埼玉県秩父郡長瀞町大字長瀞1524-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-26",
    "lineId": "chichibu",
    "number": 26,
    "name": "親鼻",
    "nameKana": "おやはな",
    "nameEn": "Oyahana",
    "lat": 36.0776023,
    "lng": 139.1061868,
    "transfers": [],
    "address": "埼玉県秩父郡皆野町大字皆野2499-2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-27",
    "lineId": "chichibu",
    "number": 27,
    "name": "皆野",
    "nameKana": "みなの",
    "nameEn": "Minano",
    "lat": 36.0686183,
    "lng": 139.0939109,
    "transfers": [],
    "address": "埼玉県秩父郡皆野町大字皆野971-2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-28",
    "lineId": "chichibu",
    "number": 28,
    "name": "和銅黒谷",
    "nameKana": "わどうくろや",
    "nameEn": "Wadō-Kuroya",
    "lat": 36.046882,
    "lng": 139.1016716,
    "transfers": [],
    "address": "埼玉県秩父市黒谷412-4",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-29",
    "lineId": "chichibu",
    "number": 29,
    "name": "大野原",
    "nameKana": "おおのはら",
    "nameEn": "Ōnohara",
    "lat": 36.0189803,
    "lng": 139.0943072,
    "transfers": [],
    "address": "埼玉県秩父市大野原309-2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-30",
    "lineId": "chichibu",
    "number": 30,
    "name": "秩父",
    "nameKana": "ちちぶ",
    "nameEn": "Chichibu",
    "lat": 35.9984196,
    "lng": 139.0858208,
    "transfers": [],
    "address": "埼玉県秩父市宮側町1-7",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-31",
    "lineId": "chichibu",
    "number": 31,
    "name": "御花畑",
    "nameKana": "おはなばたけ",
    "nameEn": "Ohanabatake",
    "lat": 35.991981,
    "lng": 139.0835402,
    "transfers": [
      "西武秩父線"
    ],
    "address": "埼玉県秩父市東町21-3",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-32",
    "lineId": "chichibu",
    "number": 32,
    "name": "影森",
    "nameKana": "かげもり",
    "nameEn": "Kagemori",
    "lat": 35.9722989,
    "lng": 139.0684554,
    "transfers": [],
    "address": "埼玉県秩父市上影森71-4",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-33",
    "lineId": "chichibu",
    "number": 33,
    "name": "浦山口",
    "nameKana": "うらやまぐち",
    "nameEn": "Urayamaguchi",
    "lat": 35.9639481,
    "lng": 139.0583433,
    "transfers": [],
    "address": "埼玉県秩父市荒川久那3895",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-34",
    "lineId": "chichibu",
    "number": 34,
    "name": "武州中川",
    "nameKana": "ぶしゅうなかがわ",
    "nameEn": "Bushū-Nakagawa",
    "lat": 35.9583099,
    "lng": 139.0351387,
    "transfers": [],
    "address": "埼玉県秩父市荒川上田野1451-5",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-35",
    "lineId": "chichibu",
    "number": 35,
    "name": "武州日野",
    "nameKana": "ぶしゅうひの",
    "nameEn": "Bushū-Hino",
    "lat": 35.9539254,
    "lng": 139.0205002,
    "transfers": [],
    "address": "埼玉県秩父市荒川日野822-2",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-36",
    "lineId": "chichibu",
    "number": 36,
    "name": "白久",
    "nameKana": "しろく",
    "nameEn": "Shiroku",
    "lat": 35.9590405,
    "lng": 138.9936347,
    "transfers": [],
    "address": "埼玉県秩父市荒川白久524-8",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "CR-37",
    "lineId": "chichibu",
    "number": 37,
    "name": "三峰口",
    "nameKana": "みつみねぐち",
    "nameEn": "Mitsumineguchi",
    "lat": 35.9601509,
    "lng": 138.9784246,
    "transfers": [],
    "address": "埼玉県秩父市荒川白久1625",
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "1・2・3番線"
    },
    "stoppingTypes": [
      "local",
      "express",
      "sl"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
