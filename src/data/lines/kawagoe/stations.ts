import type { Station } from '../../../types';

// JR川越線 (大宮 〜 高麗川 全11駅)
export const KAWAGOE_STATIONS: Station[] = [
  {
    "id": "JA-26",
    "lineId": "kawagoe",
    "number": 26,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "lat": 35.906126,
    "lng": 139.623148,
    "transfers": [
      "JR埼京線",
      "JR新幹線各線",
      "JR宇都宮線",
      "JR高崎線",
      "JR京浜東北線",
      "JR湘南新宿ライン",
      "東武アーバンパークライン",
      "埼玉新都市交通ニューシャトル"
    ],
    "address": "埼玉県さいたま市大宮区錦町630",
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
      "limitedExp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "19〜22番線",
      "outbound": "19〜22番線"
    }
  },
  {
    "id": "JA-27",
    "lineId": "kawagoe",
    "number": 27,
    "name": "日進",
    "nameKana": "にっしん",
    "nameEn": "Nisshin",
    "lat": 35.93154,
    "lng": 139.606149,
    "transfers": [],
    "address": "埼玉県さいたま市北区日進町二丁目1030",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JA-28",
    "lineId": "kawagoe",
    "number": 28,
    "name": "西大宮",
    "nameKana": "にしおおみや",
    "nameEn": "Nishi-Omiya",
    "lat": 35.922329,
    "lng": 139.579806,
    "transfers": [],
    "address": "埼玉県さいたま市西区西大宮一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JA-29",
    "lineId": "kawagoe",
    "number": 29,
    "name": "指扇",
    "nameKana": "さしおうぎ",
    "nameEn": "Sashiogi",
    "lat": 35.917128,
    "lng": 139.565056,
    "transfers": [],
    "address": "埼玉県さいたま市西区大字宝来前新田188-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JA-30",
    "lineId": "kawagoe",
    "number": 30,
    "name": "南古谷",
    "nameKana": "みなみふるや",
    "nameEn": "Minami-Furuya",
    "lat": 35.903436,
    "lng": 139.519426,
    "transfers": [],
    "address": "埼玉県川越市大字並木197",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "commuter",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JA-31",
    "lineId": "kawagoe",
    "number": 31,
    "name": "川越",
    "nameKana": "かわごえ",
    "nameEn": "Kawagoe",
    "lat": 35.906862,
    "lng": 139.482991,
    "transfers": [
      "JR八高線(直通)",
      "東武東上線",
      "西武新宿線(本川越駅)"
    ],
    "address": "埼玉県川越市脇田本町39-19",
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
      "limitedExp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3〜6番線",
      "outbound": "3〜6番線"
    }
  },
  {
    "id": "JA-32",
    "lineId": "kawagoe",
    "number": 32,
    "name": "西川越",
    "nameKana": "にしかわごえ",
    "nameEn": "Nishi-Kawagoe",
    "lat": 35.9192275,
    "lng": 139.4595141,
    "transfers": [],
    "address": "埼玉県川越市大字小室414-2",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JA-33",
    "lineId": "kawagoe",
    "number": 33,
    "name": "的場",
    "nameKana": "まとば",
    "nameEn": "Matoba",
    "lat": 35.9176166,
    "lng": 139.4356381,
    "transfers": [],
    "address": "埼玉県川越市大字的場2165",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JA-34",
    "lineId": "kawagoe",
    "number": 34,
    "name": "笠幡",
    "nameKana": "かさはた",
    "nameEn": "Kasahata",
    "lat": 35.907626,
    "lng": 139.4064215,
    "transfers": [],
    "address": "埼玉県川越市大字笠幡4434",
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
      "inbound": "1番線",
      "outbound": "1番線"
    }
  },
  {
    "id": "JA-35",
    "lineId": "kawagoe",
    "number": 35,
    "name": "武蔵高萩",
    "nameKana": "むさしたかはぎ",
    "nameEn": "Musashi-Takahagi",
    "lat": 35.901735,
    "lng": 139.3713355,
    "transfers": [],
    "address": "埼玉県日高市大字高萩615",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "JA-36",
    "lineId": "kawagoe",
    "number": 36,
    "name": "高麗川",
    "nameKana": "こまがわ",
    "nameEn": "Komagawa",
    "lat": 35.8962994,
    "lng": 139.3380819,
    "transfers": [
      "JR八高線"
    ],
    "address": "埼玉県日高市大字原宿331-4",
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
      "inbound": "1〜3番線",
      "outbound": "1〜3番線"
    }
  }
];

export const KAWAGOE_STATION_MAP = new Map<string, Station>(
  KAWAGOE_STATIONS.map((s) => [s.id, s])
);
