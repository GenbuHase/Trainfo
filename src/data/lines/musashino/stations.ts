import type { Station } from '../../../types';

export const MUSASHINO_STATIONS: Station[] = [
  {
    "id": "JM-35",
    "stationNumber": "JM-35",
    "number": 35,
    "name": "府中本町",
    "nameKana": "ふちゅうほんまち",
    "nameEn": "Fuchu-Hommachi",
    "transfers": [
      "JR南武線"
    ],
    "address": "東京都府中市本町一丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "lineId": "musashino",
    "lat": 35.666091,
    "lng": 139.477026,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-34",
    "stationNumber": "JM-34",
    "number": 34,
    "name": "北府中",
    "nameKana": "きたふちゅう",
    "nameEn": "Kita-Fuchu",
    "transfers": [],
    "address": "東京都府中市晴見町二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "lineId": "musashino",
    "lat": 35.680753,
    "lng": 139.471688,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-33",
    "stationNumber": "JM-33",
    "number": 33,
    "name": "西国分寺",
    "nameKana": "にしこくぶんじ",
    "nameEn": "Nishi-Kokubunji",
    "transfers": [
      "JR中央線"
    ],
    "address": "東京都国分寺市西恋ヶ窪二丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "lineId": "musashino",
    "lat": 35.700237,
    "lng": 139.466003,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-32",
    "stationNumber": "JM-32",
    "number": 32,
    "name": "新小平",
    "nameKana": "しんこだいら",
    "nameEn": "Shin-Kodaira",
    "transfers": [
      "西武多摩湖線（青梅街道駅）"
    ],
    "address": "東京都小平市小川町二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.731214,
    "lng": 139.470657,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-31",
    "stationNumber": "JM-31",
    "number": 31,
    "name": "新秋津",
    "nameKana": "しんあきつ",
    "nameEn": "Shin-Akitsu",
    "transfers": [
      "西武池袋線（秋津駅）"
    ],
    "address": "東京都東村山市秋津町五丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.778382,
    "lng": 139.493752,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-30",
    "stationNumber": "JM-30",
    "number": 30,
    "name": "東所沢",
    "nameKana": "ひがしところざわ",
    "nameEn": "Higashi-Tokorozawa",
    "transfers": [],
    "address": "埼玉県所沢市東所沢五丁目",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.795024,
    "lng": 139.514484,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-29",
    "stationNumber": "JM-29",
    "number": 29,
    "name": "新座",
    "nameKana": "にいざ",
    "nameEn": "Niiza",
    "transfers": [],
    "address": "埼玉県新座市野火止五丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.803766,
    "lng": 139.556185,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-28",
    "stationNumber": "JM-28",
    "number": 28,
    "name": "北朝霞",
    "nameKana": "きたあさか",
    "nameEn": "Kita-Asaka",
    "transfers": [
      "東武東上線（朝霞台駅）"
    ],
    "address": "埼玉県朝霞市浜崎一丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.815358,
    "lng": 139.586949,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-27",
    "stationNumber": "JM-27",
    "number": 27,
    "name": "西浦和",
    "nameKana": "にしうらわ",
    "nameEn": "Nishi-Urawa",
    "transfers": [],
    "address": "埼玉県さいたま市桜区田島五丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "lineId": "musashino",
    "lat": 35.844247,
    "lng": 139.627881,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-26",
    "stationNumber": "JM-26",
    "number": 26,
    "name": "武蔵浦和",
    "nameKana": "むさしうらわ",
    "nameEn": "Musashi-Urawa",
    "transfers": [
      "JR埼京線"
    ],
    "address": "埼玉県さいたま市南区別所七丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.846225,
    "lng": 139.647276,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-25",
    "stationNumber": "JM-25",
    "number": 25,
    "name": "南浦和",
    "nameKana": "みなみうらわ",
    "nameEn": "Minami-Urawa",
    "transfers": [
      "JR京浜東北線"
    ],
    "address": "埼玉県さいたま市南区南浦和二丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "5番線",
      "outbound": "6番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "lineId": "musashino",
    "lat": 35.847746,
    "lng": 139.669128,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-24",
    "stationNumber": "JM-24",
    "number": 24,
    "name": "東浦和",
    "nameKana": "ひがしうらわ",
    "nameEn": "Higashi-Urawa",
    "transfers": [],
    "address": "埼玉県さいたま市緑区東浦和一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.864001,
    "lng": 139.704201,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-23",
    "stationNumber": "JM-23",
    "number": 23,
    "name": "東川口",
    "nameKana": "ひがしかわぐち",
    "nameEn": "Higashi-Kawaguchi",
    "transfers": [
      "埼玉高速鉄道線"
    ],
    "address": "埼玉県川口市東川口一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.875311,
    "lng": 139.744293,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-22",
    "stationNumber": "JM-22",
    "number": 22,
    "name": "南越谷",
    "nameKana": "みなみこしがや",
    "nameEn": "Minami-Koshigaya",
    "transfers": [
      "東武スカイツリーライン（新越谷駅）"
    ],
    "address": "埼玉県越谷市南越谷一丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "lineId": "musashino",
    "lat": 35.876068,
    "lng": 139.790926,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-21",
    "stationNumber": "JM-21",
    "number": 21,
    "name": "越谷レイクタウン",
    "nameKana": "こしがやれいくたうん",
    "nameEn": "Koshigaya-Laketown",
    "transfers": [],
    "address": "埼玉県越谷市レイクタウン八丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.876295,
    "lng": 139.822273,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-20",
    "stationNumber": "JM-20",
    "number": 20,
    "name": "吉川",
    "nameKana": "よしかわ",
    "nameEn": "Yoshikawa",
    "transfers": [],
    "address": "埼玉県吉川市木売一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.876632,
    "lng": 139.84351,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-19",
    "stationNumber": "JM-19",
    "number": 19,
    "name": "吉川美南",
    "nameKana": "よしかわみなみ",
    "nameEn": "Yoshikawa-Minami",
    "transfers": [],
    "address": "埼玉県吉川市美南二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "lineId": "musashino",
    "lat": 35.868129,
    "lng": 139.858148,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-18",
    "stationNumber": "JM-18",
    "number": 18,
    "name": "新三郷",
    "nameKana": "しんみさと",
    "nameEn": "Shin-Misato",
    "transfers": [],
    "address": "埼玉県三郷市新三郷ららシティ二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.858844,
    "lng": 139.869213,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-17",
    "stationNumber": "JM-17",
    "number": 17,
    "name": "三郷",
    "nameKana": "みさと",
    "nameEn": "Misato",
    "transfers": [],
    "address": "埼玉県三郷市三郷一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.844942,
    "lng": 139.886728,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-16",
    "stationNumber": "JM-16",
    "number": 16,
    "name": "南流山",
    "nameKana": "みなみながれやま",
    "nameEn": "Minami-Nagareyama",
    "transfers": [
      "つくばエクスプレス"
    ],
    "address": "千葉県流山市南流山二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.838791,
    "lng": 139.903371,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-15",
    "stationNumber": "JM-15",
    "number": 15,
    "name": "新松戸",
    "nameKana": "しんまつど",
    "nameEn": "Shin-Matsudo",
    "transfers": [
      "JR常磐線各駅停車",
      "流鉄流山線（幸谷駅）"
    ],
    "address": "千葉県松戸市幸谷",
    "isMajor": true,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.825503,
    "lng": 139.921192,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-14",
    "stationNumber": "JM-14",
    "number": 14,
    "name": "新八柱",
    "nameKana": "しんやはしら",
    "nameEn": "Shin-Yahashira",
    "transfers": [
      "新京成線（八柱駅）"
    ],
    "address": "千葉県松戸市日暮一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.791955,
    "lng": 139.938409,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-13",
    "stationNumber": "JM-13",
    "number": 13,
    "name": "東松戸",
    "nameKana": "ひがしまつど",
    "nameEn": "Higashi-Matsudo",
    "transfers": [
      "北総線",
      "京成成田空港線（成田スカイアクセス）"
    ],
    "address": "千葉県松戸市東松戸一丁目",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.770279,
    "lng": 139.944018,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-12",
    "stationNumber": "JM-12",
    "number": 12,
    "name": "市川大野",
    "nameKana": "いちかわおおの",
    "nameEn": "Ichikawa-Ono",
    "transfers": [],
    "address": "千葉県市川市大野町三丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.755406,
    "lng": 139.951316,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-11",
    "stationNumber": "JM-11",
    "number": 11,
    "name": "船橋法典",
    "nameKana": "ふなばしほうてん",
    "nameEn": "Funabashi-Hoten",
    "transfers": [],
    "address": "千葉県船橋市藤原二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.730895,
    "lng": 139.966657,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-10",
    "stationNumber": "JM-10",
    "number": 10,
    "name": "西船橋",
    "nameKana": "にしふなばし",
    "nameEn": "Nishi-Funabashi",
    "transfers": [
      "JR総武線",
      "JR京葉線",
      "東京メトロ東西線",
      "東葉高速鉄道線"
    ],
    "address": "千葉県船橋市西船四丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "9・10番線",
      "outbound": "11・12番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.707171,
    "lng": 139.95966,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JE-09",
    "stationNumber": "JE-09",
    "number": 9,
    "name": "市川塩浜",
    "nameKana": "いちかわしおはま",
    "nameEn": "Ichikawa-Shiohama",
    "transfers": [
      "JR京葉線（蘇我方面）"
    ],
    "address": "千葉県市川市塩浜二丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "lineId": "musashino",
    "lat": 35.66742,
    "lng": 139.92413,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JE-11",
    "stationNumber": "JE-11",
    "number": 11,
    "name": "南船橋",
    "nameKana": "みなみふなばし",
    "nameEn": "Minami-Funabashi",
    "transfers": [
      "JR京葉線（東京方面）"
    ],
    "address": "千葉県船橋市若松二丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.68131,
    "lng": 139.99643,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JM-00",
    "stationNumber": "JU-07",
    "number": 0,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR埼京線",
      "JR川越線",
      "JR湘南新宿ライン",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東武野田線",
      "埼玉新都市交通ニューシャトル"
    ],
    "address": "埼玉県さいたま市大宮区錦町",
    "isMajor": true,
    "platforms": {
      "inbound": "3番線",
      "outbound": "3番線"
    },
    "stoppingTypes": [
      "regular",
      "limitedExp"
    ],
    "lineId": "musashino",
    "lat": 35.9064378,
    "lng": 139.6246184,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-18",
    "stationNumber": "JC-18",
    "number": 18,
    "name": "国立",
    "nameKana": "くにたち",
    "nameEn": "Kunitachi",
    "transfers": [
      "JR中央線"
    ],
    "address": "東京都国立市北一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.699222,
    "lng": 139.446532,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-19",
    "stationNumber": "JC-19",
    "number": 19,
    "name": "立川",
    "nameKana": "たちかわ",
    "nameEn": "Tachikawa",
    "transfers": [
      "JR青梅線",
      "JR南武線",
      "多摩都市モノレール"
    ],
    "address": "東京都立川市曙町二丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "5・6番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.697771,
    "lng": 139.413715,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-20",
    "stationNumber": "JC-20",
    "number": 20,
    "name": "日野",
    "nameKana": "ひの",
    "nameEn": "Hino",
    "transfers": [],
    "address": "東京都日野市大坂上一丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.679117,
    "lng": 139.393763,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-21",
    "stationNumber": "JC-21",
    "number": 21,
    "name": "豊田",
    "nameKana": "とよだ",
    "nameEn": "Toyoda",
    "transfers": [],
    "address": "東京都日野市豊田四丁目",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.65952,
    "lng": 139.381522,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    }
  },
  {
    "id": "JC-22",
    "stationNumber": "JC-22",
    "number": 22,
    "name": "八王子",
    "nameKana": "はちおうじ",
    "nameEn": "Hachioji",
    "transfers": [
      "JR横浜線",
      "JR八高線",
      "京王線（京王八王子駅）"
    ],
    "address": "東京都八王子市旭町",
    "isMajor": true,
    "platforms": {
      "inbound": "2番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "lineId": "musashino",
    "lat": 35.655349,
    "lng": 139.33947,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
