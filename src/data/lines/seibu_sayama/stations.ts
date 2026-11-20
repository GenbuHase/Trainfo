import type { Station } from '../../../types';

export const SEIBU_SAYAMA_STATIONS: Station[] = [
  {
    "id": "SIS-01",
    "stationNumber": "SI19",
    "lineId": "seibu_sayama",
    "number": 1,
    "name": "西所沢",
    "nameKana": "にしところざわ",
    "nameEn": "Nishitokorozawa",
    "lat": 35.7889669,
    "lng": 139.4559042,
    "transfers": [
      "西武池袋線"
    ],
    "address": "埼玉県西所沢駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SIS-02",
    "stationNumber": "SI40",
    "lineId": "seibu_sayama",
    "number": 2,
    "name": "下山口",
    "nameKana": "しもやまぐち",
    "nameEn": "Shimoyamaguchi",
    "lat": 35.7795842,
    "lng": 139.4415103,
    "transfers": [],
    "address": "埼玉県下山口駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semi_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "SIS-03",
    "stationNumber": "SI41",
    "lineId": "seibu_sayama",
    "number": 3,
    "name": "西武球場前",
    "nameKana": "せいぶきゅうじょうまえ",
    "nameEn": "Seibukyuujoumae",
    "lat": 35.7716808,
    "lng": 139.42068,
    "transfers": [
      "西武山口線"
    ],
    "address": "埼玉県西武球場前駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semi_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
