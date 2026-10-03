import type { Station } from '../../../types';

// JR川越線 (大宮 〜 川越 全6駅)
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
      "JR川越線(高麗川方面)",
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
  }
];

export const KAWAGOE_STATION_MAP = new Map<string, Station>(
  KAWAGOE_STATIONS.map((s) => [s.id, s])
);
