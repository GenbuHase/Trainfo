import type { Station } from '../../../types';

export const TAMA_MONORAIL_STATIONS: Station[] = [
  {
    "id": "TT-01",
    "stationNumber": "TT01",
    "lineId": "tama_monorail",
    "number": 1,
    "name": "上北台",
    "nameKana": "かみきただい",
    "nameEn": "Kamikitadai",
    "lat": 35.7460298,
    "lng": 139.4158394,
    "transfers": [],
    "address": "東京都東大和市上北台一丁目",
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
    "id": "TT-02",
    "stationNumber": "TT02",
    "lineId": "tama_monorail",
    "number": 2,
    "name": "桜街道",
    "nameKana": "さくらかいどう",
    "nameEn": "Sakurakaidou",
    "lat": 35.73933,
    "lng": 139.4165851,
    "transfers": [],
    "address": "東京都東大和市上北台三丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-03",
    "stationNumber": "TT03",
    "lineId": "tama_monorail",
    "number": 3,
    "name": "玉川上水",
    "nameKana": "たまがわじょうすい",
    "nameEn": "Tamagawajousui",
    "lat": 35.7320474,
    "lng": 139.4178898,
    "transfers": [
      "西武拝島線"
    ],
    "address": "東京都東大和市桜が丘四丁目",
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
    "id": "TT-04",
    "stationNumber": "TT04",
    "lineId": "tama_monorail",
    "number": 4,
    "name": "砂川七番",
    "nameKana": "すながわななばん",
    "nameEn": "Sunagawananaban",
    "lat": 35.72367,
    "lng": 139.4181116,
    "transfers": [],
    "address": "東京都立川市幸町五丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-05",
    "stationNumber": "TT05",
    "lineId": "tama_monorail",
    "number": 5,
    "name": "泉体育館",
    "nameKana": "いずみたいいくかん",
    "nameEn": "Izumitaiikukan",
    "lat": 35.7191159,
    "lng": 139.4193692,
    "transfers": [],
    "address": "東京都立川市幸町一丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-06",
    "stationNumber": "TT06",
    "lineId": "tama_monorail",
    "number": 6,
    "name": "立飛",
    "nameKana": "たちひ",
    "nameEn": "Tachihi",
    "lat": 35.7140792,
    "lng": 139.4168242,
    "transfers": [],
    "address": "東京都立川市泉町",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-07",
    "stationNumber": "TT07",
    "lineId": "tama_monorail",
    "number": 7,
    "name": "高松",
    "nameKana": "たかまつ",
    "nameEn": "Takamatsu",
    "lat": 35.7098854,
    "lng": 139.4129992,
    "transfers": [],
    "address": "東京都立川市緑町",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-08",
    "stationNumber": "TT08",
    "lineId": "tama_monorail",
    "number": 8,
    "name": "立川北",
    "nameKana": "たちかわきた",
    "nameEn": "Tachikawakita",
    "lat": 35.6999754,
    "lng": 139.4124907,
    "transfers": [],
    "address": "東京都立川市曙町二丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-09",
    "stationNumber": "TT09",
    "lineId": "tama_monorail",
    "number": 9,
    "name": "立川南",
    "nameKana": "たちかわみなみ",
    "nameEn": "Tachikawaminami",
    "lat": 35.6958669,
    "lng": 139.4124183,
    "transfers": [],
    "address": "東京都立川市柴崎町三丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-10",
    "stationNumber": "TT10",
    "lineId": "tama_monorail",
    "number": 10,
    "name": "柴崎体育館",
    "nameKana": "しばさきたいいくかん",
    "nameEn": "Shibasakitaiikukan",
    "lat": 35.6895269,
    "lng": 139.4092087,
    "transfers": [],
    "address": "東京都立川市柴崎町六丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-11",
    "stationNumber": "TT11",
    "lineId": "tama_monorail",
    "number": 11,
    "name": "甲州街道",
    "nameKana": "こうしゅうかいどう",
    "nameEn": "Koushuukaidou",
    "lat": 35.6781056,
    "lng": 139.409495,
    "transfers": [],
    "address": "東京都日野市大字日野",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-12",
    "stationNumber": "TT12",
    "lineId": "tama_monorail",
    "number": 12,
    "name": "万願寺",
    "nameKana": "まんがんじ",
    "nameEn": "Manganji",
    "lat": 35.6710596,
    "lng": 139.4201424,
    "transfers": [],
    "address": "東京都日野市万願寺四丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-13",
    "stationNumber": "TT13",
    "lineId": "tama_monorail",
    "number": 13,
    "name": "高幡不動",
    "nameKana": "たかはたふどう",
    "nameEn": "Takahatafudou",
    "lat": 35.6616428,
    "lng": 139.4152542,
    "transfers": [
      "京王線",
      "京王動物園線"
    ],
    "address": "東京都日野市高幡",
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
    "id": "TT-14",
    "stationNumber": "TT14",
    "lineId": "tama_monorail",
    "number": 14,
    "name": "程久保",
    "nameKana": "ほどくぼ",
    "nameEn": "Hodokubo",
    "lat": 35.6555427,
    "lng": 139.410933,
    "transfers": [],
    "address": "東京都日野市程久保八丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-15",
    "stationNumber": "TT15",
    "lineId": "tama_monorail",
    "number": 15,
    "name": "多摩動物公園",
    "nameKana": "たまどうぶつこうえん",
    "nameEn": "Tamadoubutsukouen",
    "lat": 35.6488819,
    "lng": 139.4037608,
    "transfers": [
      "京王動物園線"
    ],
    "address": "東京都日野市程久保七丁目",
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
    "id": "TT-16",
    "stationNumber": "TT16",
    "lineId": "tama_monorail",
    "number": 16,
    "name": "中央大学・明星大学",
    "nameKana": "ちゅうおうだいがくめいせいだいがく",
    "nameEn": "Chuuoudaigakumeiseidaigaku",
    "lat": 35.6420295,
    "lng": 139.4083633,
    "transfers": [],
    "address": "東京都八王子市東中野",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-17",
    "stationNumber": "TT17",
    "lineId": "tama_monorail",
    "number": 17,
    "name": "大塚・帝京大学",
    "nameKana": "おおつかていきょうだいがく",
    "nameEn": "Ootsukateikyoudaigaku",
    "lat": 35.6370822,
    "lng": 139.4161523,
    "transfers": [],
    "address": "東京都八王子市大塚",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-18",
    "stationNumber": "TT18",
    "lineId": "tama_monorail",
    "number": 18,
    "name": "松が谷",
    "nameKana": "まつがや",
    "nameEn": "Matsugaya",
    "lat": 35.6321275,
    "lng": 139.4219522,
    "transfers": [],
    "address": "東京都八王子市松が谷",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TT-19",
    "stationNumber": "TT19",
    "lineId": "tama_monorail",
    "number": 19,
    "name": "多摩センター",
    "nameKana": "たませんたー",
    "nameEn": "Tamasenta",
    "lat": 35.6241832,
    "lng": 139.4229317,
    "transfers": [],
    "address": "東京都多摩市落合一丁目",
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
  }
];
