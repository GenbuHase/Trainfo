import type { Station } from '../../../types';

export const SEIBU_YAMAGUCHI_STATIONS: Station[] = [
  {
    "id": "SY-01",
    "stationNumber": "SY01",
    "lineId": "seibu_yamaguchi",
    "number": 1,
    "name": "多摩湖",
    "nameKana": "たまこ",
    "nameEn": "Tamako",
    "lat": 35.76646,
    "lng": 139.44255,
    "transfers": [
      "西武多摩湖線"
    ],
    "address": "東京都多摩湖駅",
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
    "id": "SY-02",
    "stationNumber": "SY02",
    "lineId": "seibu_yamaguchi",
    "number": 2,
    "name": "西武園ゆうえんち",
    "nameKana": "せいぶえんゆうえんち",
    "nameEn": "Seibuenyuuenchi",
    "lat": 35.7693,
    "lng": 139.44001,
    "transfers": [],
    "address": "埼玉県西武園ゆうえんち駅",
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
    "id": "SY-03",
    "stationNumber": "SY03",
    "lineId": "seibu_yamaguchi",
    "number": 3,
    "name": "西武球場前",
    "nameKana": "せいぶきゅうじょうまえ",
    "nameEn": "Seibukyuujoumae",
    "lat": 35.77047,
    "lng": 139.41994,
    "transfers": [
      "西武狭山線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
