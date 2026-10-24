import type { Station } from '../../../types';

/**
 * JR白新線 駅メタデータ（新潟 → 新発田、10駅）
 *
 * lat/lng は OSM 実軌道（ルートリレーション 1876846・route=railway）の
 * トポロジカル連結パス端点に完全一致（0.0m）した座標です
 *（ROUTE_EXPANSION_PLAYBOOK.md Phase 2・第35条 準拠）。
 */
export const HAKUSHIN_STATIONS: Station[] = [
  {
    "id": "HS-01",
    "lineId": "hakushin",
    "number": 1,
    "name": "新潟",
    "nameKana": "にいがた",
    "nameEn": "Niigata",
    "lat": 37.912323,
    "lng": 139.0612537,
    "transfers": [
      "JR信越本線",
      "JR上越新幹線",
      "JR越後線"
    ],
    "address": "新潟県新潟市中央区東大通1-1",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
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
    "id": "HS-02",
    "lineId": "hakushin",
    "number": 2,
    "name": "東新潟",
    "nameKana": "ひがしにいがた",
    "nameEn": "Higashi-Niigata",
    "lat": 37.9100654,
    "lng": 139.111471,
    "transfers": [],
    "address": "新潟県新潟市東区逢谷内1-1",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-03",
    "lineId": "hakushin",
    "number": 3,
    "name": "大形",
    "nameKana": "おおがた",
    "nameEn": "Ogata",
    "lat": 37.9158002,
    "lng": 139.1305988,
    "transfers": [],
    "address": "新潟県新潟市東区大形本町3-1",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-04",
    "lineId": "hakushin",
    "number": 4,
    "name": "新崎",
    "nameKana": "しんざき",
    "nameEn": "Shinazaki",
    "lat": 37.9223261,
    "lng": 139.1582702,
    "transfers": [],
    "address": "新潟県新潟市東区新松崎3-1",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-05",
    "lineId": "hakushin",
    "number": 5,
    "name": "早通",
    "nameKana": "はやどおり",
    "nameEn": "Hayadori",
    "lat": 37.9210973,
    "lng": 139.1784585,
    "transfers": [],
    "address": "新潟県新潟市東区早通",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-06",
    "lineId": "hakushin",
    "number": 6,
    "name": "豊栄",
    "nameKana": "とよさか",
    "nameEn": "Toyosaka",
    "lat": 37.919711,
    "lng": 139.2156019,
    "transfers": [],
    "address": "新潟県新潟市北区",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid"
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
    "id": "HS-07",
    "lineId": "hakushin",
    "number": 7,
    "name": "黒山",
    "nameKana": "くろやま",
    "nameEn": "Kuroyama",
    "lat": 37.9373288,
    "lng": 139.2413839,
    "transfers": [],
    "address": "新潟県新発田市",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-08",
    "lineId": "hakushin",
    "number": 8,
    "name": "佐々木",
    "nameKana": "ささき",
    "nameEn": "Sasaki",
    "lat": 37.9499914,
    "lng": 139.2692322,
    "transfers": [],
    "address": "新潟県新発田市",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-09",
    "lineId": "hakushin",
    "number": 9,
    "name": "西新発田",
    "nameKana": "にししばた",
    "nameEn": "Nishi-Shibata",
    "lat": 37.9414186,
    "lng": 139.3067756,
    "transfers": [],
    "address": "新潟県新発田市",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "HS-10",
    "lineId": "hakushin",
    "number": 10,
    "name": "新発田",
    "nameKana": "しばた",
    "nameEn": "Shibata",
    "lat": 37.9439154,
    "lng": 139.3349564,
    "transfers": [
      "JR羽越本線"
    ],
    "address": "新潟県新発田市中央町",
    "platforms": {
      "inbound": "上り 新潟方面",
      "outbound": "下り 新発田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limitedExp"
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
