import type { Station } from '../../../types';

export const NAMBOKU_STATIONS: Station[] = [
  {
    "lineId": "namboku",
    "id": "N-01",
    "stationNumber": "N-01",
    "number": 1,
    "name": "目黒",
    "nameKana": "めぐろ",
    "nameEn": "Meguro",
    "lat": 35.6324892,
    "lng": 139.7156838,
    "transfers": [
      "東急目黒線",
      "都営三田線",
      "JR山手線"
    ],
    "address": "東京都品川区上大崎二丁目16-9",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "namboku",
    "id": "N-02",
    "stationNumber": "N-02",
    "number": 2,
    "name": "白金台",
    "nameKana": "しろかねだい",
    "nameEn": "Shirokanedai",
    "lat": 35.6381169,
    "lng": 139.7265558,
    "transfers": [
      "都営三田線"
    ],
    "address": "東京都港区白金台四丁目5-10",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-03",
    "stationNumber": "N-03",
    "number": 3,
    "name": "白金高輪",
    "nameKana": "しろかねたかなわ",
    "nameEn": "Shirokane-takanawa",
    "lat": 35.6429466,
    "lng": 139.7341229,
    "transfers": [
      "都営三田線"
    ],
    "address": "東京都港区高輪一丁目3-20",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
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
    "lineId": "namboku",
    "id": "N-04",
    "stationNumber": "N-04",
    "number": 4,
    "name": "麻布十番",
    "nameKana": "あざぶじゅうばん",
    "nameEn": "Azabu-juban",
    "lat": 35.6551771,
    "lng": 139.7370659,
    "transfers": [
      "都営大江戸線"
    ],
    "address": "東京都港区麻布十番四丁目4-9",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "namboku",
    "id": "N-05",
    "stationNumber": "N-05",
    "number": 5,
    "name": "六本木一丁目",
    "nameKana": "ろっぽんぎいっちょうめ",
    "nameEn": "Roppongi-itchome",
    "lat": 35.6649588,
    "lng": 139.738939,
    "transfers": [],
    "address": "東京都港区六本木一丁目4-1",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-06",
    "stationNumber": "N-06",
    "number": 6,
    "name": "溜池山王",
    "nameKana": "ためいけさんのう",
    "nameEn": "Tameike-sanno",
    "lat": 35.6730057,
    "lng": 139.7413433,
    "transfers": [
      "東京メトロ銀座線",
      "東京メトロ丸ノ内線（国会議事堂前駅）",
      "東京メトロ千代田線（国会議事堂前駅）"
    ],
    "address": "東京都千代田区永田町二丁目11-1",
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
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
    "lineId": "namboku",
    "id": "N-07",
    "stationNumber": "N-07",
    "number": 7,
    "name": "永田町",
    "nameKana": "ながたちょう",
    "nameEn": "Nagatacho",
    "lat": 35.6784978,
    "lng": 139.7391381,
    "transfers": [
      "東京メトロ有楽町線",
      "東京メトロ半蔵門線",
      "東京メトロ銀座線（赤坂見附駅）",
      "東京メトロ丸ノ内線（赤坂見附駅）"
    ],
    "address": "東京都千代田区永田町一丁目11-28",
    "platforms": {
      "inbound": "5番線",
      "outbound": "6番線"
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
    "lineId": "namboku",
    "id": "N-08",
    "stationNumber": "N-08",
    "number": 8,
    "name": "四ツ谷",
    "nameKana": "よつや",
    "nameEn": "Yotsuya",
    "lat": 35.6855806,
    "lng": 139.7294234,
    "transfers": [
      "東京メトロ丸ノ内線",
      "JR中央線",
      "JR中央・総武線各駅停車"
    ],
    "address": "東京都新宿区四谷一丁目1",
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
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
    "lineId": "namboku",
    "id": "N-09",
    "stationNumber": "N-09",
    "number": 9,
    "name": "市ケ谷",
    "nameKana": "いちがや",
    "nameEn": "Ichigaya",
    "lat": 35.6933168,
    "lng": 139.7366992,
    "transfers": [
      "東京メトロ有楽町線",
      "都営新宿線",
      "JR中央・総武線各駅停車"
    ],
    "address": "東京都新宿区市谷田町一丁目1",
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
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
    "lineId": "namboku",
    "id": "N-10",
    "stationNumber": "N-10",
    "number": 10,
    "name": "飯田橋",
    "nameKana": "いいだばし",
    "nameEn": "Iidabashi",
    "lat": 35.7015212,
    "lng": 139.7436617,
    "transfers": [
      "東京メトロ東西線",
      "東京メトロ有楽町線",
      "都営大江戸線",
      "JR中央・総武線各駅停車"
    ],
    "address": "東京都新宿区神楽坂一丁目13",
    "platforms": {
      "inbound": "5番線",
      "outbound": "6番線"
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
    "lineId": "namboku",
    "id": "N-11",
    "stationNumber": "N-11",
    "number": 11,
    "name": "後楽園",
    "nameKana": "こうらくえん",
    "nameEn": "Korakuen",
    "lat": 35.7082166,
    "lng": 139.7517502,
    "transfers": [
      "東京メトロ丸ノ内線",
      "都営三田線（春日駅）",
      "都営大江戸線（春日駅）"
    ],
    "address": "東京都文京区春日一丁目2-3",
    "platforms": {
      "inbound": "2番線",
      "outbound": "3番線"
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
    "lineId": "namboku",
    "id": "N-12",
    "stationNumber": "N-12",
    "number": 12,
    "name": "東大前",
    "nameKana": "とうだいまえ",
    "nameEn": "Todaimae",
    "lat": 35.7173083,
    "lng": 139.7581322,
    "transfers": [],
    "address": "東京都文京区向丘一丁目19-2",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-13",
    "stationNumber": "N-13",
    "number": 13,
    "name": "本駒込",
    "nameKana": "ほんこまごめ",
    "nameEn": "Hon-komagome",
    "lat": 35.7247547,
    "lng": 139.7536398,
    "transfers": [],
    "address": "東京都文京区向丘二丁目37-1",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-14",
    "stationNumber": "N-14",
    "number": 14,
    "name": "駒込",
    "nameKana": "こまごめ",
    "nameEn": "Komagome",
    "lat": 35.7359676,
    "lng": 139.7466942,
    "transfers": [
      "JR山手線"
    ],
    "address": "東京都豊島区駒込二丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "namboku",
    "id": "N-15",
    "stationNumber": "N-15",
    "number": 15,
    "name": "西ケ原",
    "nameKana": "にしがはら",
    "nameEn": "Nishigahara",
    "lat": 35.7460173,
    "lng": 139.7421173,
    "transfers": [],
    "address": "東京都北区西ケ原二丁目1-6",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-16",
    "stationNumber": "N-16",
    "number": 16,
    "name": "王子",
    "nameKana": "おうじ",
    "nameEn": "Oji",
    "lat": 35.7539405,
    "lng": 139.7374489,
    "transfers": [
      "JR京浜東北線",
      "都電荒川線（王子駅前停留場）"
    ],
    "address": "東京都北区王子一丁目10-18",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
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
    "lineId": "namboku",
    "id": "N-17",
    "stationNumber": "N-17",
    "number": 17,
    "name": "王子神谷",
    "nameKana": "おうじかみや",
    "nameEn": "Oji-kamiya",
    "lat": 35.765049,
    "lng": 139.7357007,
    "transfers": [],
    "address": "東京都北区王子五丁目2-11",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-18",
    "stationNumber": "N-18",
    "number": 18,
    "name": "志茂",
    "nameKana": "しも",
    "nameEn": "Shimo",
    "lat": 35.7778789,
    "lng": 139.7324778,
    "transfers": [],
    "address": "東京都北区志茂二丁目1-18",
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
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "lineId": "namboku",
    "id": "N-19",
    "stationNumber": "N-19",
    "number": 19,
    "name": "赤羽岩淵",
    "nameKana": "あかばねいわぶち",
    "nameEn": "Akabane-iwabuchi",
    "lat": 35.7833904,
    "lng": 139.7219088,
    "transfers": [
      "埼玉高速鉄道線"
    ],
    "address": "東京都北区赤羽一丁目52-8",
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
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
  }
];
