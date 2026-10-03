import type { Station } from '../../../types';

// JR中央線・中央本線 (東京 〜 高尾 〜 大月 〜 甲府 全43駅)
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
  },
  {
    "id": "JC-25",
    "lineId": "chuo",
    "number": 25,
    "name": "相模湖",
    "nameKana": "さがみこ",
    "nameEn": "Sagamiko",
    "lat": 35.617344,
    "lng": 139.188473,
    "transfers": [],
    "address": "神奈川県相模原市緑区与瀬本町",
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
    "id": "JC-26",
    "lineId": "chuo",
    "number": 26,
    "name": "藤野",
    "nameKana": "ふじの",
    "nameEn": "Fujino",
    "lat": 35.615916,
    "lng": 139.152408,
    "transfers": [],
    "address": "神奈川県相模原市緑区小渕",
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
    "id": "JC-27",
    "lineId": "chuo",
    "number": 27,
    "name": "上野原",
    "nameKana": "うえのはら",
    "nameEn": "Uenohara",
    "lat": 35.618805,
    "lng": 139.116111,
    "transfers": [],
    "address": "山梨県上野原市新田",
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
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-28",
    "lineId": "chuo",
    "number": 28,
    "name": "四方津",
    "nameKana": "しおつ",
    "nameEn": "Shiotsu",
    "lat": 35.613947,
    "lng": 139.06752,
    "transfers": [],
    "address": "山梨県上野原市四方津",
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
      "inbound": "3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JC-29",
    "lineId": "chuo",
    "number": 29,
    "name": "梁川",
    "nameKana": "やながわ",
    "nameEn": "Yanagawa",
    "lat": 35.608176,
    "lng": 139.032079,
    "transfers": [],
    "address": "山梨県大月市梁川町綱の上",
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
    "id": "JC-30",
    "lineId": "chuo",
    "number": 30,
    "name": "鳥沢",
    "nameKana": "とりさわ",
    "nameEn": "Torisawa",
    "lat": 35.60813,
    "lng": 138.998749,
    "transfers": [],
    "address": "山梨県大月市富浜町鳥沢",
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
    "id": "JC-31",
    "lineId": "chuo",
    "number": 31,
    "name": "猿橋",
    "nameKana": "さるはし",
    "nameEn": "Saruhashi",
    "lat": 35.612736,
    "lng": 138.968119,
    "transfers": [],
    "address": "山梨県大月市猿橋町猿橋",
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
    "id": "JC-32",
    "lineId": "chuo",
    "number": 32,
    "name": "大月",
    "nameKana": "おおつき",
    "nameEn": "Otsuki",
    "lat": 35.613106,
    "lng": 138.942176,
    "transfers": [
      "富士急行線"
    ],
    "address": "山梨県大月市大月一丁目",
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
      "inbound": "4・5番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "CO-33",
    "lineId": "chuo",
    "number": 33,
    "name": "初狩",
    "nameKana": "はつかり",
    "nameEn": "Hatsukari",
    "lat": 35.594186,
    "lng": 138.884328,
    "transfers": [],
    "address": "山梨県大月市初狩町下初狩",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-34",
    "lineId": "chuo",
    "number": 34,
    "name": "笹子",
    "nameKana": "ささご",
    "nameEn": "Sasago",
    "lat": 35.603961,
    "lng": 138.825828,
    "transfers": [],
    "address": "山梨県大月市笹子町黒野田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-35",
    "lineId": "chuo",
    "number": 35,
    "name": "甲斐大和",
    "nameKana": "かいやまと",
    "nameEn": "Kai-Yamato",
    "lat": 35.642851,
    "lng": 138.774506,
    "transfers": [],
    "address": "山梨県甲州市大和町初鹿野",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-36",
    "lineId": "chuo",
    "number": 36,
    "name": "勝沼ぶどう郷",
    "nameKana": "かつぬまぶどうきょう",
    "nameEn": "Katsunuma-budokyo",
    "lat": 35.672049,
    "lng": 138.74317,
    "transfers": [],
    "address": "山梨県甲州市勝沼町菱山",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-37",
    "lineId": "chuo",
    "number": 37,
    "name": "塩山",
    "nameKana": "えんざん",
    "nameEn": "Enzan",
    "lat": 35.705631,
    "lng": 138.723415,
    "transfers": [],
    "address": "山梨県甲州市塩山上於曽",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-38",
    "lineId": "chuo",
    "number": 38,
    "name": "東山梨",
    "nameKana": "ひがしやまなし",
    "nameEn": "Higashi-Yamanashi",
    "lat": 35.694804,
    "lng": 138.703936,
    "transfers": [],
    "address": "山梨県山梨市上石森",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-39",
    "lineId": "chuo",
    "number": 39,
    "name": "山梨市",
    "nameKana": "やまなしし",
    "nameEn": "Yamanashishi",
    "lat": 35.684945,
    "lng": 138.685112,
    "transfers": [],
    "address": "山梨県山梨市上神内川",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-40",
    "lineId": "chuo",
    "number": 40,
    "name": "春日居町",
    "nameKana": "かすがいちょう",
    "nameEn": "Kasugaicho",
    "lat": 35.673482,
    "lng": 138.658984,
    "transfers": [],
    "address": "山梨県笛吹市春日居町別田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-41",
    "lineId": "chuo",
    "number": 41,
    "name": "石和温泉",
    "nameKana": "いさわおんせん",
    "nameEn": "Isawa-onsen",
    "lat": 35.657674,
    "lng": 138.635439,
    "transfers": [],
    "address": "山梨県笛吹市石和町駅前",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-42",
    "lineId": "chuo",
    "number": 42,
    "name": "酒折",
    "nameKana": "さかおり",
    "nameEn": "Sakaori",
    "lat": 35.659614,
    "lng": 138.599106,
    "transfers": [],
    "address": "山梨県甲府市酒折一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-43",
    "lineId": "chuo",
    "number": 43,
    "name": "甲府",
    "nameKana": "こうふ",
    "nameEn": "Kofu",
    "lat": 35.667151,
    "lng": 138.568991,
    "transfers": [
      "JR身延線"
    ],
    "address": "山梨県甲府市丸の内一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limitedExp",
      "regular"
    ],
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "1・2・3番線"
    }
  },
  {
    "id": "CO-44",
    "lineId": "chuo",
    "number": 44,
    "name": "竜王",
    "nameKana": "りゅうおう",
    "nameEn": "Ryuo",
    "lat": 35.668802,
    "lng": 138.519503,
    "transfers": [],
    "address": "山梨県甲斐市竜王新町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-45",
    "lineId": "chuo",
    "number": 45,
    "name": "塩崎",
    "nameKana": "しおざき",
    "nameEn": "Shiozaki",
    "lat": 35.687848,
    "lng": 138.487494,
    "transfers": [],
    "address": "山梨県甲斐市下今井",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-46",
    "lineId": "chuo",
    "number": 46,
    "name": "韮崎",
    "nameKana": "にらさき",
    "nameEn": "Nirasaki",
    "lat": 35.710422,
    "lng": 138.450887,
    "transfers": [],
    "address": "山梨県韮崎市若宮一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-47",
    "lineId": "chuo",
    "number": 47,
    "name": "新府",
    "nameKana": "しんぷ",
    "nameEn": "Shimpu",
    "lat": 35.737151,
    "lng": 138.433256,
    "transfers": [],
    "address": "山梨県韮崎市中田町中条",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-48",
    "lineId": "chuo",
    "number": 48,
    "name": "穴山",
    "nameKana": "あなやま",
    "nameEn": "Anayama",
    "lat": 35.751153,
    "lng": 138.414278,
    "transfers": [],
    "address": "山梨県韮崎市穴山町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-49",
    "lineId": "chuo",
    "number": 49,
    "name": "日野春",
    "nameKana": "ひのはる",
    "nameEn": "Hinoharu",
    "lat": 35.790032,
    "lng": 138.39477,
    "transfers": [],
    "address": "山梨県北杜市長坂町富岡",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-50",
    "lineId": "chuo",
    "number": 50,
    "name": "長坂",
    "nameKana": "ながさか",
    "nameEn": "Nagasaka",
    "lat": 35.827527,
    "lng": 138.366794,
    "transfers": [],
    "address": "山梨県北杜市長坂町長坂上条",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-51",
    "lineId": "chuo",
    "number": 51,
    "name": "小淵沢",
    "nameKana": "こぶちざわ",
    "nameEn": "Kobuchizawa",
    "lat": 35.863918,
    "lng": 138.315962,
    "transfers": [
      "JR小海線"
    ],
    "address": "山梨県北杜市小淵沢町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "2・3番線"
    }
  },
  {
    "id": "CO-52",
    "lineId": "chuo",
    "number": 52,
    "name": "信濃境",
    "nameKana": "しなのざかい",
    "nameEn": "Shinano-Sakai",
    "lat": 35.884739,
    "lng": 138.27582,
    "transfers": [],
    "address": "長野県諏訪郡富士見町境",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-53",
    "lineId": "chuo",
    "number": 53,
    "name": "富士見",
    "nameKana": "ふじみ",
    "nameEn": "Fujimi",
    "lat": 35.91204,
    "lng": 138.238427,
    "transfers": [],
    "address": "長野県諏訪郡富士見町富士見",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-54",
    "lineId": "chuo",
    "number": 54,
    "name": "すずらんの里",
    "nameKana": "すずらんのさと",
    "nameEn": "Suzurannosato",
    "lat": 35.930327,
    "lng": 138.211947,
    "transfers": [],
    "address": "長野県諏訪郡富士見町富士見",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-55",
    "lineId": "chuo",
    "number": 55,
    "name": "青柳",
    "nameKana": "あおやぎ",
    "nameEn": "Aoyagi",
    "lat": 35.942371,
    "lng": 138.197806,
    "transfers": [],
    "address": "長野県茅野市金沢",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-56",
    "lineId": "chuo",
    "number": 56,
    "name": "茅野",
    "nameKana": "ちの",
    "nameEn": "Chino",
    "lat": 35.994339,
    "lng": 138.152315,
    "transfers": [],
    "address": "長野県茅野市ちの",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-57",
    "lineId": "chuo",
    "number": 57,
    "name": "上諏訪",
    "nameKana": "かみすわ",
    "nameEn": "Kami-Suwa",
    "lat": 36.046642,
    "lng": 138.11626,
    "transfers": [],
    "address": "長野県諏訪市諏訪一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-58",
    "lineId": "chuo",
    "number": 58,
    "name": "下諏訪",
    "nameKana": "しもすわ",
    "nameEn": "Shimo-Suwa",
    "lat": 36.072019,
    "lng": 138.084858,
    "transfers": [],
    "address": "長野県諏訪郡下諏訪町広瀬町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-59",
    "lineId": "chuo",
    "number": 59,
    "name": "岡谷",
    "nameKana": "おかや",
    "nameEn": "Okaya",
    "lat": 36.056577,
    "lng": 138.044758,
    "transfers": [
      "JR飯田線",
      "JR中央本線(辰野支線)"
    ],
    "address": "長野県岡谷市本町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-60",
    "lineId": "chuo",
    "number": 60,
    "name": "みどり湖",
    "nameKana": "みどりこ",
    "nameEn": "Midoriko",
    "lat": 36.09404,
    "lng": 137.982116,
    "transfers": [],
    "address": "長野県塩尻市大字西条",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular"
    ],
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "CO-61",
    "lineId": "chuo",
    "number": 61,
    "name": "塩尻",
    "nameKana": "しおじり",
    "nameEn": "Shiojiri",
    "lat": 36.114384,
    "lng": 137.947792,
    "transfers": [
      "JR中央本線(西線)",
      "JR篠ノ井線"
    ],
    "address": "長野県塩尻市大字大門八番町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "regular",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "4・5・6番線"
    }
  }
];
