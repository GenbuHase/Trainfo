import type { Station } from '../../../types';

// JR中央線 (東京 〜 高尾 全24駅)
export const CHUO_STATIONS: Station[] = [
  {
    "id": "JC-01",
    "lineId": "chuo",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.681767,
    "lng": 139.766411,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR東海道線",
      "JR上野東京ライン",
      "JR総武線快速",
      "JR横須賀線",
      "JR京葉線",
      "JR新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JC-02",
    "lineId": "chuo",
    "number": 2,
    "name": "神田",
    "nameKana": "かんだ",
    "nameEn": "Kanda",
    "lat": 35.691846,
    "lng": 139.770699,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "東京メトロ銀座線"
    ],
    "address": "東京都千代田区鍛冶町二丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid"
    ],
    "platforms": {
      "inbound": "5番線",
      "outbound": "6番線"
    }
  },
  {
    "id": "JC-03",
    "lineId": "chuo",
    "number": 3,
    "name": "御茶ノ水",
    "nameKana": "おちゃのみず",
    "nameEn": "Ochanomizu",
    "lat": 35.699484,
    "lng": 139.76498,
    "transfers": [
      "JR総武線各駅停車",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区神田駿河台二丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-04",
    "lineId": "chuo",
    "number": 4,
    "name": "四ツ谷",
    "nameKana": "よつや",
    "nameEn": "Yotsuya",
    "lat": 35.685957,
    "lng": 139.730556,
    "transfers": [
      "JR総武線各駅停車",
      "東京メトロ丸ノ内線",
      "東京メトロ南北線"
    ],
    "address": "東京都新宿区四谷一丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-05",
    "lineId": "chuo",
    "number": 5,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.689525,
    "lng": 139.70035,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "JR総武線各駅停車",
      "小田急小田原線",
      "京王線",
      "京王新線",
      "東京メトロ丸ノ内線",
      "都営新宿線",
      "都営大江戸線"
    ],
    "address": "東京都新宿区新宿三丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "7・8番線",
      "outbound": "9・10・11・12番線"
    }
  },
  {
    "id": "JC-06",
    "lineId": "chuo",
    "number": 6,
    "name": "中野",
    "nameKana": "なかの",
    "nameEn": "Nakano",
    "lat": 35.705946,
    "lng": 139.66553,
    "transfers": [
      "JR総武線各駅停車",
      "東京メトロ東西線"
    ],
    "address": "東京都中野区中野五丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid"
    ],
    "platforms": {
      "inbound": "7・8番線",
      "outbound": "6番線"
    }
  },
  {
    "id": "JC-07",
    "lineId": "chuo",
    "number": 7,
    "name": "高円寺",
    "nameKana": "こうえんじ",
    "nameEn": "Koenji",
    "lat": 35.705352,
    "lng": 139.649952,
    "transfers": [
      "JR総武線各駅停車"
    ],
    "address": "東京都杉並区高円寺南四丁目",
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
    "platforms": {
      "inbound": "4番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JC-08",
    "lineId": "chuo",
    "number": 8,
    "name": "阿佐ケ谷",
    "nameKana": "あさがや",
    "nameEn": "Asagaya",
    "lat": 35.704957,
    "lng": 139.636148,
    "transfers": [
      "JR総武線各駅停車"
    ],
    "address": "東京都杉並区阿佐谷南二丁目",
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
    "platforms": {
      "inbound": "4番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JC-09",
    "lineId": "chuo",
    "number": 9,
    "name": "荻窪",
    "nameKana": "おぎくぼ",
    "nameEn": "Ogikubo",
    "lat": 35.704499,
    "lng": 139.620232,
    "transfers": [
      "JR総武線各駅停車",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都杉並区上荻一丁目",
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
      "commuter"
    ],
    "platforms": {
      "inbound": "4番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JC-10",
    "lineId": "chuo",
    "number": 10,
    "name": "西荻窪",
    "nameKana": "にしおぎくぼ",
    "nameEn": "Nishi-Ogikubo",
    "lat": 35.703811,
    "lng": 139.599581,
    "transfers": [
      "JR総武線各駅停車"
    ],
    "address": "東京都杉並区西荻南三丁目",
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
    "platforms": {
      "inbound": "4番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JC-11",
    "lineId": "chuo",
    "number": 11,
    "name": "吉祥寺",
    "nameKana": "きちじょうじ",
    "nameEn": "Kichijoji",
    "lat": 35.703155,
    "lng": 139.580218,
    "transfers": [
      "JR総武線各駅停車",
      "京王井の頭線"
    ],
    "address": "東京都武蔵野市吉祥寺南町一丁目",
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
      "commuter",
      "commuter_special_rapid"
    ],
    "platforms": {
      "inbound": "4番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JC-12",
    "lineId": "chuo",
    "number": 12,
    "name": "三鷹",
    "nameKana": "みたか",
    "nameEn": "Mitaka",
    "lat": 35.70267,
    "lng": 139.56093,
    "transfers": [
      "JR総武線各駅停車"
    ],
    "address": "東京都三鷹市下連雀三丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "JC-13",
    "lineId": "chuo",
    "number": 13,
    "name": "武蔵境",
    "nameKana": "むさしさかい",
    "nameEn": "Musashi-Sakai",
    "lat": 35.702111,
    "lng": 139.544081,
    "transfers": [
      "西武多摩川線"
    ],
    "address": "東京都武蔵野市境四丁目",
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
      "commuter"
    ],
    "platforms": {
      "inbound": "4番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "JC-14",
    "lineId": "chuo",
    "number": 14,
    "name": "東小金井",
    "nameKana": "ひがしこがねい",
    "nameEn": "Higashi-Koganei",
    "lat": 35.701542,
    "lng": 139.524643,
    "transfers": [],
    "address": "東京都小金井市梶野町五丁目",
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
      "commuter"
    ],
    "platforms": {
      "inbound": "3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-15",
    "lineId": "chuo",
    "number": 15,
    "name": "武蔵小金井",
    "nameKana": "むさしこがねい",
    "nameEn": "Musashi-Koganei",
    "lat": 35.701007,
    "lng": 139.50679,
    "transfers": [],
    "address": "東京都小金井市本町六丁目",
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
      "commuter"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JC-16",
    "lineId": "chuo",
    "number": 16,
    "name": "国分寺",
    "nameKana": "こくぶんじ",
    "nameEn": "Kokubunji",
    "lat": 35.700082,
    "lng": 139.48036,
    "transfers": [
      "西武国分寺線",
      "西武多摩湖線"
    ],
    "address": "東京都国分寺市南町三丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid"
    ],
    "platforms": {
      "inbound": "4番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JC-17",
    "lineId": "chuo",
    "number": 17,
    "name": "西国分寺",
    "nameKana": "にしこくぶんじ",
    "nameEn": "Nishi-Kokubunji",
    "lat": 35.699715,
    "lng": 139.465736,
    "transfers": [
      "JR武蔵野線"
    ],
    "address": "東京都国分寺市西恋ヶ窪二丁目",
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
      "commuter"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-18",
    "lineId": "chuo",
    "number": 18,
    "name": "国立",
    "nameKana": "くにたち",
    "nameEn": "Kunitachi",
    "lat": 35.699222,
    "lng": 139.446532,
    "transfers": [
      "JR武蔵野線直通（むさしの号）"
    ],
    "address": "東京都国立市北一丁目",
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
      "commuter",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-19",
    "lineId": "chuo",
    "number": 19,
    "name": "立川",
    "nameKana": "たちかわ",
    "nameEn": "Tachikawa",
    "lat": 35.697771,
    "lng": 139.413715,
    "transfers": [
      "JR青梅線",
      "JR南武線",
      "多摩都市モノレール線"
    ],
    "address": "東京都立川市曙町二丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "3・4・5番線",
      "outbound": "5・6番線"
    }
  },
  {
    "id": "JC-20",
    "lineId": "chuo",
    "number": 20,
    "name": "日野",
    "nameKana": "ひの",
    "nameEn": "Hino",
    "lat": 35.679117,
    "lng": 139.393763,
    "transfers": [],
    "address": "東京都日野市大坂上一丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-21",
    "lineId": "chuo",
    "number": 21,
    "name": "豊田",
    "nameKana": "とよだ",
    "nameEn": "Toyoda",
    "lat": 35.65952,
    "lng": 139.381522,
    "transfers": [],
    "address": "東京都日野市豊田四丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "JC-22",
    "lineId": "chuo",
    "number": 22,
    "name": "八王子",
    "nameKana": "はちおうじ",
    "nameEn": "Hachioji",
    "lat": 35.655349,
    "lng": 139.33947,
    "transfers": [
      "JR横浜線",
      "JR八高線",
      "京王線（京王八王子駅）"
    ],
    "address": "東京都八王子市旭町",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JC-23",
    "lineId": "chuo",
    "number": 23,
    "name": "西八王子",
    "nameKana": "にしはちおうじ",
    "nameEn": "Nishi-Hachioji",
    "lat": 35.656514,
    "lng": 139.312442,
    "transfers": [],
    "address": "東京都八王子市千人町二丁目",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-24",
    "lineId": "chuo",
    "number": 24,
    "name": "高尾",
    "nameKana": "たかお",
    "nameEn": "Takao",
    "lat": 35.642152,
    "lng": 139.282487,
    "transfers": [
      "JR中央本線",
      "京王高尾線"
    ],
    "address": "東京都八王子市高尾町",
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
      "commuter",
      "special_rapid",
      "chuo_special_rapid",
      "ome_special_rapid",
      "commuter_special_rapid",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3・4番線",
      "outbound": "1・2番線"
    }
  }
];
