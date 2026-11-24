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
    "lat": 35.6387669,
    "lng": 139.7401761,
    "transfers": [
      "都営地下鉄浅草線"
    ],
    "address": "東京都港区高輪二丁目",
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
    "lat": 35.6277399,
    "lng": 139.7379921,
    "transfers": [
      "ＪＲ東海道新幹線",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "ＪＲ京浜東北線",
      "ＪＲ横須賀線",
      "ＪＲ東海道本線"
    ],
    "address": "東京都港区高輪三丁目",
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
    "lat": 35.6224006,
    "lng": 139.7392937,
    "transfers": [],
    "address": "東京都品川区北品川一丁目",
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
    "lat": 35.6167128,
    "lng": 139.7414384,
    "transfers": [],
    "address": "東京都品川区北品川二丁目",
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
    "lat": 35.6097241,
    "lng": 139.7429176,
    "transfers": [],
    "address": "東京都品川区南品川三丁目",
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
    "lat": 35.6054674,
    "lng": 139.74271,
    "transfers": [],
    "address": "東京都品川区東大井一丁目",
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
    "lat": 35.598848,
    "lng": 139.7390741,
    "transfers": [],
    "address": "東京都品川区東大井二丁目",
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
    "lat": 35.5873639,
    "lng": 139.7353773,
    "transfers": [],
    "address": "東京都大田区大森北二丁目",
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
    "lat": 35.5786189,
    "lng": 139.7349545,
    "transfers": [],
    "address": "東京都大田区大森北六丁目",
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
    "lat": 35.572181,
    "lng": 139.731908,
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
    "lat": 35.5664627,
    "lng": 139.7280114,
    "transfers": [],
    "address": "東京都大田区蒲田二丁目",
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
    "lat": 35.5616345,
    "lng": 139.7242907,
    "transfers": [
      "京急空港線"
    ],
    "address": "東京都大田区蒲田四丁目",
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
    "lat": 35.5494898,
    "lng": 139.7148704,
    "transfers": [],
    "address": "東京都大田区仲六郷二丁目",
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
    "lat": 35.5402508,
    "lng": 139.7073186,
    "transfers": [],
    "address": "東京都大田区仲六郷四丁目",
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
    "lat": 35.5326165,
    "lng": 139.7005976,
    "transfers": [
      "京急大師線"
    ],
    "address": "神奈川県川崎市川崎区駅前本町",
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
    "lat": 35.5227382,
    "lng": 139.6911828,
    "transfers": [
      "ＪＲ南武線"
    ],
    "address": "神奈川県川崎市川崎区池田一丁目",
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
    "lat": 35.5171615,
    "lng": 139.6862304,
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
    "lat": 35.5065346,
    "lng": 139.677401,
    "transfers": [],
    "address": "神奈川県横浜市鶴見区鶴見中央一丁目",
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
    "lat": 35.5006111,
    "lng": 139.6732257,
    "transfers": [],
    "address": "神奈川県横浜市鶴見区生麦五丁目",
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
    "lat": 35.4959432,
    "lng": 139.6677814,
    "transfers": [],
    "address": "神奈川県横浜市鶴見区生麦三丁目",
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
    "lat": 35.4874084,
    "lng": 139.6563409,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区子安通三丁目",
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
    "lat": 35.4846631,
    "lng": 139.6452486,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区子安通一丁目",
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
    "lat": 35.4819971,
    "lng": 139.6407717,
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
    "lat": 35.4779142,
    "lng": 139.6354283,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区東神奈川二丁目",
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
    "lat": 35.471552,
    "lng": 139.6275714,
    "transfers": [],
    "address": "神奈川県横浜市神奈川区青木町",
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
    "lat": 35.4671937,
    "lng": 139.6239397,
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
      "横浜高速鉄道みなとみらい線"
    ],
    "address": "神奈川県横浜市西区高島二丁目",
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
    "lat": 35.45714,
    "lng": 139.6193915,
    "transfers": [],
    "address": "神奈川県横浜市西区戸部本町",
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
    "lat": 35.4455554,
    "lng": 139.6267285,
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
    "lat": 35.4394828,
    "lng": 139.6219818,
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
    "lat": 35.4367815,
    "lng": 139.6130019,
    "transfers": [],
    "address": "神奈川県横浜市南区南太田一丁目",
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
    "lat": 35.4337621,
    "lng": 139.5998591,
    "transfers": [],
    "address": "神奈川県横浜市南区永田東一丁目",
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
    "lat": 35.4237069,
    "lng": 139.5970147,
    "transfers": [],
    "address": "神奈川県横浜市南区弘明寺町",
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
    "lat": 35.4084304,
    "lng": 139.5966624,
    "transfers": [
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県横浜市港南区上大岡西一丁目",
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
    "lat": 35.3937073,
    "lng": 139.6109488,
    "transfers": [],
    "address": "神奈川県横浜市磯子区森五丁目",
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
    "lat": 35.3835708,
    "lng": 139.6158991,
    "transfers": [],
    "address": "神奈川県横浜市磯子区杉田二丁目",
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
    "lat": 35.3672365,
    "lng": 139.6297375,
    "transfers": [],
    "address": "神奈川県横浜市金沢区富岡西七丁目",
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
    "lat": 35.3603866,
    "lng": 139.629297,
    "transfers": [],
    "address": "神奈川県横浜市金沢区能見台通",
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
    "lat": 35.3433139,
    "lng": 139.6217112,
    "transfers": [],
    "address": "神奈川県横浜市金沢区谷津町",
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
    "lat": 35.3317904,
    "lng": 139.6201581,
    "transfers": [
      "京急逗子線"
    ],
    "address": "神奈川県横浜市金沢区瀬戸",
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
    "lat": 35.3156032,
    "lng": 139.6249216,
    "transfers": [],
    "address": "神奈川県横須賀市追浜町三丁目",
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
    "lat": 35.3009409,
    "lng": 139.6252516,
    "transfers": [],
    "address": "神奈川県横須賀市船越町五丁目",
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
    "lat": 35.2867148,
    "lng": 139.6427107,
    "transfers": [],
    "address": "神奈川県横須賀市長浦町二丁目",
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
    "lat": 35.2805479,
    "lng": 139.6528612,
    "transfers": [],
    "address": "神奈川県横須賀市東逸見町二丁目",
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
    "lat": 35.280342,
    "lng": 139.6631899,
    "transfers": [],
    "address": "神奈川県横須賀市本町三丁目",
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
    "lat": 35.2788905,
    "lng": 139.6696496,
    "transfers": [],
    "address": "神奈川県横須賀市若松町二丁目",
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
    "lat": 35.2696787,
    "lng": 139.6772004,
    "transfers": [],
    "address": "神奈川県横須賀市安浦町三丁目",
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
    "lat": 35.2628052,
    "lng": 139.6877307,
    "transfers": [
      "京急久里浜線"
    ],
    "address": "神奈川県横須賀市三春町四丁目",
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
    "lat": 35.2607051,
    "lng": 139.6961551,
    "transfers": [],
    "address": "神奈川県横須賀市大津町一丁目",
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
    "lat": 35.259531,
    "lng": 139.708839,
    "transfers": [],
    "address": "神奈川県横須賀市馬堀町三丁目",
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
    "lat": 35.2519004,
    "lng": 139.715055,
    "transfers": [],
    "address": "神奈川県横須賀市浦賀一丁目",
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
