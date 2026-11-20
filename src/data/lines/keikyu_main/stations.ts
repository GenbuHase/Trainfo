import type { Station } from '../../../types';

export const KEIKYU_MAIN_STATIONS: Station[] = [
  {
    "id": "KK-01",
    "stationNumber": "KK01",
    "lineId": "keikyu_main",
    "number": 1,
    "name": "泉岳寺",
    "nameKana": "せんがくじ",
    "nameEn": "Sengakuji",
    "lat": 35.6388,
    "lng": 139.74008,
    "transfers": [
      "都営地下鉄浅草線"
    ],
    "address": "東京都泉岳寺駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-02",
    "stationNumber": "KK02",
    "lineId": "keikyu_main",
    "number": 2,
    "name": "品川",
    "nameKana": "しながわ",
    "nameEn": "Shinagawa",
    "lat": 35.62774,
    "lng": 139.73799,
    "transfers": [
      "ＪＲ東海道新幹線",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "ＪＲ京浜東北線",
      "ＪＲ横須賀線",
      "ＪＲ東海道本線"
    ],
    "address": "東京都品川駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-03",
    "stationNumber": "KK03",
    "lineId": "keikyu_main",
    "number": 3,
    "name": "北品川",
    "nameKana": "きたしながわ",
    "nameEn": "Kitashinagawa",
    "lat": 35.6224,
    "lng": 139.73929,
    "transfers": [],
    "address": "東京都北品川駅",
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
    "id": "KK-04",
    "stationNumber": "KK04",
    "lineId": "keikyu_main",
    "number": 4,
    "name": "新馬場",
    "nameKana": "しんばんば",
    "nameEn": "Shimbamba",
    "lat": 35.61672,
    "lng": 139.74149,
    "transfers": [],
    "address": "東京都新馬場駅",
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
    "id": "KK-05",
    "stationNumber": "KK05",
    "lineId": "keikyu_main",
    "number": 5,
    "name": "青物横丁",
    "nameKana": "あおものよこちょう",
    "nameEn": "Aomonoyokochou",
    "lat": 35.60974,
    "lng": 139.74303,
    "transfers": [],
    "address": "東京都青物横丁駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-06",
    "stationNumber": "KK06",
    "lineId": "keikyu_main",
    "number": 6,
    "name": "鮫洲",
    "nameKana": "さめず",
    "nameEn": "Samezu",
    "lat": 35.60545,
    "lng": 139.74275,
    "transfers": [],
    "address": "東京都鮫洲駅",
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
    "id": "KK-07",
    "stationNumber": "KK07",
    "lineId": "keikyu_main",
    "number": 7,
    "name": "立会川",
    "nameKana": "たちあいがわ",
    "nameEn": "Tachiaigawa",
    "lat": 35.59884,
    "lng": 139.7391,
    "transfers": [],
    "address": "東京都立会川駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-08",
    "stationNumber": "KK08",
    "lineId": "keikyu_main",
    "number": 8,
    "name": "大森海岸",
    "nameKana": "おおもりかいがん",
    "nameEn": "Oomorikaigan",
    "lat": 35.58737,
    "lng": 139.7353,
    "transfers": [],
    "address": "東京都大森海岸駅",
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
    "id": "KK-09",
    "stationNumber": "KK09",
    "lineId": "keikyu_main",
    "number": 9,
    "name": "平和島",
    "nameKana": "へいわじま",
    "nameEn": "Heiwajima",
    "lat": 35.57862,
    "lng": 139.73495,
    "transfers": [],
    "address": "東京都平和島駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-10",
    "stationNumber": "KK10",
    "lineId": "keikyu_main",
    "number": 10,
    "name": "大森町",
    "nameKana": "おおもりまち",
    "nameEn": "Oomorimachi",
    "lat": 35.57221,
    "lng": 139.73183,
    "transfers": [],
    "address": "東京都大森町駅",
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
    "id": "KK-11",
    "stationNumber": "KK11",
    "lineId": "keikyu_main",
    "number": 11,
    "name": "梅屋敷",
    "nameKana": "うめやしき",
    "nameEn": "Umeyashiki",
    "lat": 35.5665,
    "lng": 139.72794,
    "transfers": [],
    "address": "東京都梅屋敷駅",
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
    "id": "KK-12",
    "stationNumber": "KK12",
    "lineId": "keikyu_main",
    "number": 12,
    "name": "京急蒲田",
    "nameKana": "けいきゅうかまた",
    "nameEn": "Keikyuukamata",
    "lat": 35.56163,
    "lng": 139.7243,
    "transfers": [
      "京急空港線"
    ],
    "address": "東京都京急蒲田駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-13",
    "stationNumber": "KK13",
    "lineId": "keikyu_main",
    "number": 13,
    "name": "雑色",
    "nameKana": "ぞうしき",
    "nameEn": "Zoushiki",
    "lat": 35.54949,
    "lng": 139.71487,
    "transfers": [],
    "address": "東京都雑色駅",
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
    "id": "KK-14",
    "stationNumber": "KK14",
    "lineId": "keikyu_main",
    "number": 14,
    "name": "六郷土手",
    "nameKana": "ろくごうどて",
    "nameEn": "Rokugoudote",
    "lat": 35.54025,
    "lng": 139.70732,
    "transfers": [],
    "address": "東京都六郷土手駅",
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
    "id": "KK-15",
    "stationNumber": "KK15",
    "lineId": "keikyu_main",
    "number": 15,
    "name": "京急川崎",
    "nameKana": "けいきゅうかわさき",
    "nameEn": "Keikyuukawasaki",
    "lat": 35.53264,
    "lng": 139.70056,
    "transfers": [
      "京急大師線"
    ],
    "address": "神奈川県京急川崎駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-16",
    "stationNumber": "KK16",
    "lineId": "keikyu_main",
    "number": 16,
    "name": "八丁畷",
    "nameKana": "はっちょうなわて",
    "nameEn": "Hatchounawate",
    "lat": 35.52274,
    "lng": 139.69118,
    "transfers": [
      "ＪＲ南武線"
    ],
    "address": "神奈川県八丁畷駅",
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
    "id": "KK-17",
    "stationNumber": "KK17",
    "lineId": "keikyu_main",
    "number": 17,
    "name": "鶴見市場",
    "nameKana": "つるみいちば",
    "nameEn": "Tsurumiichiba",
    "lat": 35.51717,
    "lng": 139.68621,
    "transfers": [],
    "address": "神奈川県鶴見市場駅",
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
    "id": "KK-18",
    "stationNumber": "KK18",
    "lineId": "keikyu_main",
    "number": 18,
    "name": "京急鶴見",
    "nameKana": "けいきゅうつるみ",
    "nameEn": "Keikyuutsurumi",
    "lat": 35.50652,
    "lng": 139.67743,
    "transfers": [],
    "address": "神奈川県京急鶴見駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-19",
    "stationNumber": "KK19",
    "lineId": "keikyu_main",
    "number": 19,
    "name": "花月総持寺",
    "nameKana": "かげつそうじじ",
    "nameEn": "Kagetsusoujiji",
    "lat": 35.50063,
    "lng": 139.6732,
    "transfers": [],
    "address": "神奈川県花月総持寺駅",
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
    "id": "KK-20",
    "stationNumber": "KK20",
    "lineId": "keikyu_main",
    "number": 20,
    "name": "生麦",
    "nameKana": "なまむぎ",
    "nameEn": "Namamugi",
    "lat": 35.49596,
    "lng": 139.66776,
    "transfers": [],
    "address": "神奈川県生麦駅",
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
    "id": "KK-21",
    "stationNumber": "KK21",
    "lineId": "keikyu_main",
    "number": 21,
    "name": "京急新子安",
    "nameKana": "けいきゅうしんこやす",
    "nameEn": "Keikyuushinkoyasu",
    "lat": 35.48741,
    "lng": 139.65634,
    "transfers": [],
    "address": "神奈川県京急新子安駅",
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
    "id": "KK-22",
    "stationNumber": "KK22",
    "lineId": "keikyu_main",
    "number": 22,
    "name": "子安",
    "nameKana": "こやす",
    "nameEn": "Koyasu",
    "lat": 35.48466,
    "lng": 139.64525,
    "transfers": [],
    "address": "神奈川県子安駅",
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
    "id": "KK-23",
    "stationNumber": "KK23",
    "lineId": "keikyu_main",
    "number": 23,
    "name": "神奈川新町",
    "nameKana": "かながわしんまち",
    "nameEn": "Kanagawashimmachi",
    "lat": 35.48199,
    "lng": 139.64078,
    "transfers": [],
    "address": "神奈川県神奈川新町駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-24",
    "stationNumber": "KK24",
    "lineId": "keikyu_main",
    "number": 24,
    "name": "京急東神奈川",
    "nameKana": "けいきゅうひがしかながわ",
    "nameEn": "Keikyuuhigashikanagawa",
    "lat": 35.47793,
    "lng": 139.63541,
    "transfers": [],
    "address": "神奈川県京急東神奈川駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-25",
    "stationNumber": "KK25",
    "lineId": "keikyu_main",
    "number": 25,
    "name": "神奈川",
    "nameKana": "かながわ",
    "nameEn": "Kanagawa",
    "lat": 35.47151,
    "lng": 139.62764,
    "transfers": [],
    "address": "神奈川県神奈川駅",
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
    "id": "KK-26",
    "stationNumber": "KK26",
    "lineId": "keikyu_main",
    "number": 26,
    "name": "横浜",
    "nameKana": "よこはま",
    "nameEn": "Yokohama",
    "lat": 35.46722,
    "lng": 139.62388,
    "transfers": [
      "ＪＲ湘南新宿ライン",
      "ＪＲ京浜東北線",
      "ＪＲ横須賀線",
      "ＪＲ東海道本線",
      "ＪＲ横浜線",
      "ＪＲ根岸線",
      "東急東横線",
      "相鉄本線",
      "横浜市営地下鉄ブルーライン",
      "みなとみらい線"
    ],
    "address": "神奈川県横浜駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-27",
    "stationNumber": "KK27",
    "lineId": "keikyu_main",
    "number": 27,
    "name": "戸部",
    "nameKana": "とべ",
    "nameEn": "Tobe",
    "lat": 35.45713,
    "lng": 139.61936,
    "transfers": [],
    "address": "神奈川県戸部駅",
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
    "id": "KK-28",
    "stationNumber": "KK28",
    "lineId": "keikyu_main",
    "number": 28,
    "name": "日ノ出町",
    "nameKana": "ひのでちょう",
    "nameEn": "Hinodechou",
    "lat": 35.44556,
    "lng": 139.6267,
    "transfers": [],
    "address": "神奈川県日ノ出町駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-29",
    "stationNumber": "KK29",
    "lineId": "keikyu_main",
    "number": 29,
    "name": "黄金町",
    "nameKana": "こがねちょう",
    "nameEn": "Koganechou",
    "lat": 35.43951,
    "lng": 139.62197,
    "transfers": [],
    "address": "神奈川県黄金町駅",
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
    "id": "KK-30",
    "stationNumber": "KK30",
    "lineId": "keikyu_main",
    "number": 30,
    "name": "南太田",
    "nameKana": "みなみおおた",
    "nameEn": "Minamioota",
    "lat": 35.43679,
    "lng": 139.613,
    "transfers": [],
    "address": "神奈川県南太田駅",
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
    "id": "KK-31",
    "stationNumber": "KK31",
    "lineId": "keikyu_main",
    "number": 31,
    "name": "井土ケ谷",
    "nameKana": "いどがや",
    "nameEn": "Idogaya",
    "lat": 35.43373,
    "lng": 139.59987,
    "transfers": [],
    "address": "神奈川県井土ケ谷駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-32",
    "stationNumber": "KK32",
    "lineId": "keikyu_main",
    "number": 32,
    "name": "弘明寺",
    "nameKana": "ぐみょうじ",
    "nameEn": "Gumyouji",
    "lat": 35.42371,
    "lng": 139.59703,
    "transfers": [],
    "address": "神奈川県弘明寺駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-33",
    "stationNumber": "KK33",
    "lineId": "keikyu_main",
    "number": 33,
    "name": "上大岡",
    "nameKana": "かみおおおか",
    "nameEn": "Kamioooka",
    "lat": 35.40843,
    "lng": 139.59664,
    "transfers": [
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県上大岡駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-34",
    "stationNumber": "KK34",
    "lineId": "keikyu_main",
    "number": 34,
    "name": "屏風浦",
    "nameKana": "びょうぶがうら",
    "nameEn": "Byoubugaura",
    "lat": 35.39368,
    "lng": 139.61091,
    "transfers": [],
    "address": "神奈川県屏風浦駅",
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
    "id": "KK-35",
    "stationNumber": "KK35",
    "lineId": "keikyu_main",
    "number": 35,
    "name": "杉田",
    "nameKana": "すぎた",
    "nameEn": "Sugita",
    "lat": 35.38354,
    "lng": 139.61581,
    "transfers": [],
    "address": "神奈川県杉田駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-36",
    "stationNumber": "KK36",
    "lineId": "keikyu_main",
    "number": 36,
    "name": "京急富岡",
    "nameKana": "けいきゅうとみおか",
    "nameEn": "Keikyuutomioka",
    "lat": 35.36723,
    "lng": 139.62969,
    "transfers": [],
    "address": "神奈川県京急富岡駅",
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
    "id": "KK-37",
    "stationNumber": "KK37",
    "lineId": "keikyu_main",
    "number": 37,
    "name": "能見台",
    "nameKana": "のうけんだい",
    "nameEn": "Noukendai",
    "lat": 35.36041,
    "lng": 139.62918,
    "transfers": [],
    "address": "神奈川県能見台駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-38",
    "stationNumber": "KK38",
    "lineId": "keikyu_main",
    "number": 38,
    "name": "金沢文庫",
    "nameKana": "かなざわぶんこ",
    "nameEn": "Kanazawabunko",
    "lat": 35.3433,
    "lng": 139.62179,
    "transfers": [],
    "address": "神奈川県金沢文庫駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-39",
    "stationNumber": "KK39",
    "lineId": "keikyu_main",
    "number": 39,
    "name": "金沢八景",
    "nameKana": "かなざわはっけい",
    "nameEn": "Kanazawahakkei",
    "lat": 35.33179,
    "lng": 139.62011,
    "transfers": [
      "京急逗子線"
    ],
    "address": "神奈川県金沢八景駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-40",
    "stationNumber": "KK40",
    "lineId": "keikyu_main",
    "number": 40,
    "name": "追浜",
    "nameKana": "おっぱま",
    "nameEn": "Oppama",
    "lat": 35.31561,
    "lng": 139.62495,
    "transfers": [],
    "address": "神奈川県追浜駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-41",
    "stationNumber": "KK41",
    "lineId": "keikyu_main",
    "number": 41,
    "name": "京急田浦",
    "nameKana": "けいきゅうたうら",
    "nameEn": "Keikyuutaura",
    "lat": 35.30094,
    "lng": 139.62525,
    "transfers": [],
    "address": "神奈川県京急田浦駅",
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
    "id": "KK-42",
    "stationNumber": "KK42",
    "lineId": "keikyu_main",
    "number": 42,
    "name": "安針塚",
    "nameKana": "あんじんづか",
    "nameEn": "Anjinzuka",
    "lat": 35.28671,
    "lng": 139.64271,
    "transfers": [],
    "address": "神奈川県安針塚駅",
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
    "id": "KK-43",
    "stationNumber": "KK43",
    "lineId": "keikyu_main",
    "number": 43,
    "name": "逸見",
    "nameKana": "へみ",
    "nameEn": "Hemi",
    "lat": 35.28051,
    "lng": 139.65284,
    "transfers": [],
    "address": "神奈川県逸見駅",
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
    "id": "KK-44",
    "stationNumber": "KK44",
    "lineId": "keikyu_main",
    "number": 44,
    "name": "汐入",
    "nameKana": "しおいり",
    "nameEn": "Shioiri",
    "lat": 35.28034,
    "lng": 139.66319,
    "transfers": [],
    "address": "神奈川県汐入駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-45",
    "stationNumber": "KK45",
    "lineId": "keikyu_main",
    "number": 45,
    "name": "横須賀中央",
    "nameKana": "よこすかちゅうおう",
    "nameEn": "Yokosukachuuou",
    "lat": 35.27891,
    "lng": 139.66966,
    "transfers": [],
    "address": "神奈川県横須賀中央駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-46",
    "stationNumber": "KK46",
    "lineId": "keikyu_main",
    "number": 46,
    "name": "県立大学",
    "nameKana": "けんりつだいがく",
    "nameEn": "Kenritsudaigaku",
    "lat": 35.26967,
    "lng": 139.67719,
    "transfers": [],
    "address": "神奈川県県立大学駅",
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
    "id": "KK-47",
    "stationNumber": "KK47",
    "lineId": "keikyu_main",
    "number": 47,
    "name": "堀ノ内",
    "nameKana": "ほりのうち",
    "nameEn": "Horinouchi",
    "lat": 35.26279,
    "lng": 139.68772,
    "transfers": [
      "京急久里浜線"
    ],
    "address": "神奈川県堀ノ内駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp",
      "access_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-48",
    "stationNumber": "KK48",
    "lineId": "keikyu_main",
    "number": 48,
    "name": "京急大津",
    "nameKana": "けいきゅうおおつ",
    "nameEn": "Keikyuuootsu",
    "lat": 35.26068,
    "lng": 139.69614,
    "transfers": [],
    "address": "神奈川県京急大津駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-49",
    "stationNumber": "KK49",
    "lineId": "keikyu_main",
    "number": 49,
    "name": "馬堀海岸",
    "nameKana": "まぼりかいがん",
    "nameEn": "Maborikaigan",
    "lat": 35.25954,
    "lng": 139.70884,
    "transfers": [],
    "address": "神奈川県馬堀海岸駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KK-50",
    "stationNumber": "KK50",
    "lineId": "keikyu_main",
    "number": 50,
    "name": "浦賀",
    "nameKana": "うらが",
    "nameEn": "Uraga",
    "lat": 35.2519,
    "lng": 139.71507,
    "transfers": [],
    "address": "神奈川県浦賀駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "rapid_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];