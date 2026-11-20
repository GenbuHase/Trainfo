import type { Station } from '../../../types';

export const KANTO_JOSO_STATIONS: Station[] = [
  {
    "id": "KJ-01",
    "lineId": "kanto_joso",
    "number": 1,
    "name": "取手",
    "nameKana": "とりで",
    "nameEn": "Toride",
    "lat": 35.89761,
    "lng": 140.06403,
    "transfers": [
      "ＪＲ常磐線",
      "ＪＲ常磐線快速",
      "ＪＲ常磐線各駅停車"
    ],
    "address": "茨城県取手駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-02",
    "lineId": "kanto_joso",
    "number": 2,
    "name": "西取手",
    "nameKana": "にしとりで",
    "nameEn": "Nishitoride",
    "lat": 35.90914,
    "lng": 140.05893,
    "transfers": [],
    "address": "茨城県西取手駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-03",
    "lineId": "kanto_joso",
    "number": 3,
    "name": "寺原",
    "nameKana": "てらはら",
    "nameEn": "Terahara",
    "lat": 35.912,
    "lng": 140.05419,
    "transfers": [],
    "address": "茨城県寺原駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-04",
    "lineId": "kanto_joso",
    "number": 4,
    "name": "新取手",
    "nameKana": "しんとりで",
    "nameEn": "Shintoride",
    "lat": 35.91798,
    "lng": 140.04146,
    "transfers": [],
    "address": "茨城県新取手駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-05",
    "lineId": "kanto_joso",
    "number": 5,
    "name": "ゆめみ野",
    "nameKana": "ゆめみの",
    "nameEn": "Yumemino",
    "lat": 35.92112,
    "lng": 140.034693,
    "transfers": [],
    "address": "茨城県ゆめみ野駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-06",
    "lineId": "kanto_joso",
    "number": 6,
    "name": "稲戸井",
    "nameKana": "いなとい",
    "nameEn": "Inatoi",
    "lat": 35.92631,
    "lng": 140.02216,
    "transfers": [],
    "address": "茨城県稲戸井駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-07",
    "lineId": "kanto_joso",
    "number": 7,
    "name": "戸頭",
    "nameKana": "とがしら",
    "nameEn": "Togashira",
    "lat": 35.92958,
    "lng": 140.01379,
    "transfers": [],
    "address": "茨城県戸頭駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-08",
    "lineId": "kanto_joso",
    "number": 8,
    "name": "南守谷",
    "nameKana": "みなみもりや",
    "nameEn": "Minamimoriya",
    "lat": 35.93448,
    "lng": 140.00182,
    "transfers": [],
    "address": "茨城県南守谷駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-09",
    "lineId": "kanto_joso",
    "number": 9,
    "name": "守谷",
    "nameKana": "もりや",
    "nameEn": "Moriya",
    "lat": 35.95123,
    "lng": 139.99197,
    "transfers": [
      "つくばエクスプレス"
    ],
    "address": "茨城県守谷駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-10",
    "lineId": "kanto_joso",
    "number": 10,
    "name": "新守谷",
    "nameKana": "しんもりや",
    "nameEn": "Shimmoriya",
    "lat": 35.96652,
    "lng": 139.98574,
    "transfers": [],
    "address": "茨城県新守谷駅",
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
    "id": "KJ-11",
    "lineId": "kanto_joso",
    "number": 11,
    "name": "小絹",
    "nameKana": "こきぬ",
    "nameEn": "Kokinu",
    "lat": 35.98166,
    "lng": 139.98327,
    "transfers": [],
    "address": "茨城県小絹駅",
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
    "id": "KJ-12",
    "lineId": "kanto_joso",
    "number": 12,
    "name": "水海道",
    "nameKana": "みつかいどう",
    "nameEn": "Mitsukaidou",
    "lat": 36.0182,
    "lng": 139.99198,
    "transfers": [],
    "address": "茨城県水海道駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-13",
    "lineId": "kanto_joso",
    "number": 13,
    "name": "北水海道",
    "nameKana": "きたみつかいどう",
    "nameEn": "Kitamitsukaidou",
    "lat": 36.03248,
    "lng": 139.99278,
    "transfers": [],
    "address": "茨城県北水海道駅",
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
    "id": "KJ-14",
    "lineId": "kanto_joso",
    "number": 14,
    "name": "中妻",
    "nameKana": "なかつま",
    "nameEn": "Nakatsuma",
    "lat": 36.04765,
    "lng": 139.99065,
    "transfers": [],
    "address": "茨城県中妻駅",
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
    "id": "KJ-15",
    "lineId": "kanto_joso",
    "number": 15,
    "name": "三妻",
    "nameKana": "みつま",
    "nameEn": "Mitsuma",
    "lat": 36.07377,
    "lng": 139.983,
    "transfers": [],
    "address": "茨城県三妻駅",
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
    "id": "KJ-16",
    "lineId": "kanto_joso",
    "number": 16,
    "name": "南石下",
    "nameKana": "みなみいしげ",
    "nameEn": "Minamiishige",
    "lat": 36.10266,
    "lng": 139.97397,
    "transfers": [],
    "address": "茨城県南石下駅",
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
    "id": "KJ-17",
    "lineId": "kanto_joso",
    "number": 17,
    "name": "石下",
    "nameKana": "いしげ",
    "nameEn": "Ishige",
    "lat": 36.11755,
    "lng": 139.97423,
    "transfers": [],
    "address": "茨城県石下駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-18",
    "lineId": "kanto_joso",
    "number": 18,
    "name": "玉村",
    "nameKana": "たまむら",
    "nameEn": "Tamamura",
    "lat": 36.13519,
    "lng": 139.96994,
    "transfers": [],
    "address": "茨城県玉村駅",
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
    "id": "KJ-19",
    "lineId": "kanto_joso",
    "number": 19,
    "name": "宗道",
    "nameKana": "そうどう",
    "nameEn": "Soudou",
    "lat": 36.15292,
    "lng": 139.97065,
    "transfers": [],
    "address": "茨城県宗道駅",
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
    "id": "KJ-20",
    "lineId": "kanto_joso",
    "number": 20,
    "name": "下妻",
    "nameKana": "しもつま",
    "nameEn": "Shimotsuma",
    "lat": 36.18182,
    "lng": 139.96466,
    "transfers": [],
    "address": "茨城県下妻駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KJ-21",
    "lineId": "kanto_joso",
    "number": 21,
    "name": "大宝",
    "nameKana": "だいほう",
    "nameEn": "Daihou",
    "lat": 36.20285,
    "lng": 139.9701,
    "transfers": [],
    "address": "茨城県大宝駅",
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
    "id": "KJ-22",
    "lineId": "kanto_joso",
    "number": 22,
    "name": "騰波ノ江",
    "nameKana": "とばのえ",
    "nameEn": "Tobanoe",
    "lat": 36.22285,
    "lng": 139.97626,
    "transfers": [],
    "address": "茨城県騰波ノ江駅",
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
    "id": "KJ-23",
    "lineId": "kanto_joso",
    "number": 23,
    "name": "黒子",
    "nameKana": "くろご",
    "nameEn": "Kurogo",
    "lat": 36.24682,
    "lng": 139.97503,
    "transfers": [],
    "address": "茨城県黒子駅",
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
    "id": "KJ-24",
    "lineId": "kanto_joso",
    "number": 24,
    "name": "大田郷",
    "nameKana": "おおたごう",
    "nameEn": "Ootagou",
    "lat": 36.27889,
    "lng": 139.95949,
    "transfers": [],
    "address": "茨城県大田郷駅",
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
    "id": "KJ-25",
    "lineId": "kanto_joso",
    "number": 25,
    "name": "下館",
    "nameKana": "しもだて",
    "nameEn": "Shimodate",
    "lat": 36.30396,
    "lng": 139.97887,
    "transfers": [
      "ＪＲ水戸線",
      "真岡鐵道真岡線"
    ],
    "address": "茨城県下館駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];