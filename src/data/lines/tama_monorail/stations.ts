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
    "lat": 35.74603,
    "lng": 139.41587,
    "transfers": [],
    "address": "東京都上北台駅",
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
    "lat": 35.73932,
    "lng": 139.4165,
    "transfers": [],
    "address": "東京都桜街道駅",
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
    "id": "TT-03",
    "stationNumber": "TT03",
    "lineId": "tama_monorail",
    "number": 3,
    "name": "玉川上水",
    "nameKana": "たまがわじょうすい",
    "nameEn": "Tamagawajousui",
    "lat": 35.73203,
    "lng": 139.41776,
    "transfers": [
      "西武拝島線"
    ],
    "address": "東京都玉川上水駅",
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
    "lng": 139.4181,
    "transfers": [],
    "address": "東京都砂川七番駅",
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
    "id": "TT-05",
    "stationNumber": "TT05",
    "lineId": "tama_monorail",
    "number": 5,
    "name": "泉体育館",
    "nameKana": "いずみたいいくかん",
    "nameEn": "Izumitaiikukan",
    "lat": 35.71913,
    "lng": 139.41941,
    "transfers": [],
    "address": "東京都泉体育館駅",
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
    "id": "TT-06",
    "stationNumber": "TT06",
    "lineId": "tama_monorail",
    "number": 6,
    "name": "立飛",
    "nameKana": "たちひ",
    "nameEn": "Tachihi",
    "lat": 35.71405,
    "lng": 139.41687,
    "transfers": [],
    "address": "東京都立飛駅",
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
    "id": "TT-07",
    "stationNumber": "TT07",
    "lineId": "tama_monorail",
    "number": 7,
    "name": "高松",
    "nameKana": "たかまつ",
    "nameEn": "Takamatsu",
    "lat": 35.70984,
    "lng": 139.41308,
    "transfers": [],
    "address": "東京都高松駅",
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
    "id": "TT-08",
    "stationNumber": "TT08",
    "lineId": "tama_monorail",
    "number": 8,
    "name": "立川北",
    "nameKana": "たちかわきた",
    "nameEn": "Tachikawakita",
    "lat": 35.69997,
    "lng": 139.41269,
    "transfers": [],
    "address": "東京都立川北駅",
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
    "id": "TT-09",
    "stationNumber": "TT09",
    "lineId": "tama_monorail",
    "number": 9,
    "name": "立川南",
    "nameKana": "たちかわみなみ",
    "nameEn": "Tachikawaminami",
    "lat": 35.69587,
    "lng": 139.41241,
    "transfers": [],
    "address": "東京都立川南駅",
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
    "id": "TT-10",
    "stationNumber": "TT10",
    "lineId": "tama_monorail",
    "number": 10,
    "name": "柴崎体育館",
    "nameKana": "しばさきたいいくかん",
    "nameEn": "Shibasakitaiikukan",
    "lat": 35.68954,
    "lng": 139.40916,
    "transfers": [],
    "address": "東京都柴崎体育館駅",
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
    "id": "TT-11",
    "stationNumber": "TT11",
    "lineId": "tama_monorail",
    "number": 11,
    "name": "甲州街道",
    "nameKana": "こうしゅうかいどう",
    "nameEn": "Koushuukaidou",
    "lat": 35.67807,
    "lng": 139.40946,
    "transfers": [],
    "address": "東京都甲州街道駅",
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
    "id": "TT-12",
    "stationNumber": "TT12",
    "lineId": "tama_monorail",
    "number": 12,
    "name": "万願寺",
    "nameKana": "まんがんじ",
    "nameEn": "Manganji",
    "lat": 35.67104,
    "lng": 139.4201,
    "transfers": [],
    "address": "東京都万願寺駅",
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
    "id": "TT-13",
    "stationNumber": "TT13",
    "lineId": "tama_monorail",
    "number": 13,
    "name": "高幡不動",
    "nameKana": "たかはたふどう",
    "nameEn": "Takahatafudou",
    "lat": 35.66163,
    "lng": 139.41531,
    "transfers": [
      "京王線",
      "京王動物園線"
    ],
    "address": "東京都高幡不動駅",
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
    "lat": 35.65554,
    "lng": 139.41094,
    "transfers": [],
    "address": "東京都程久保駅",
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
    "id": "TT-15",
    "stationNumber": "TT15",
    "lineId": "tama_monorail",
    "number": 15,
    "name": "多摩動物公園",
    "nameKana": "たまどうぶつこうえん",
    "nameEn": "Tamadoubutsukouen",
    "lat": 35.64886,
    "lng": 139.40391,
    "transfers": [
      "京王動物園線"
    ],
    "address": "東京都多摩動物公園駅",
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
    "lat": 35.64204,
    "lng": 139.40837,
    "transfers": [],
    "address": "東京都中央大学・明星大学駅",
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
    "id": "TT-17",
    "stationNumber": "TT17",
    "lineId": "tama_monorail",
    "number": 17,
    "name": "大塚・帝京大学",
    "nameKana": "おおつかていきょうだいがく",
    "nameEn": "Ootsukateikyoudaigaku",
    "lat": 35.63706,
    "lng": 139.41613,
    "transfers": [],
    "address": "東京都大塚・帝京大学駅",
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
    "id": "TT-18",
    "stationNumber": "TT18",
    "lineId": "tama_monorail",
    "number": 18,
    "name": "松が谷",
    "nameKana": "まつがや",
    "nameEn": "Matsugaya",
    "lat": 35.63212,
    "lng": 139.42192,
    "transfers": [],
    "address": "東京都松が谷駅",
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
    "id": "TT-19",
    "stationNumber": "TT19",
    "lineId": "tama_monorail",
    "number": 19,
    "name": "多摩センター",
    "nameKana": "たませんたー",
    "nameEn": "Tamasenta",
    "lat": 35.62419,
    "lng": 139.4229,
    "transfers": [],
    "address": "東京都多摩センター駅",
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
