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
    "lat": 35.7664646,
    "lng": 139.4425799,
    "transfers": [
      "西武多摩湖線"
    ],
    "address": "東京都東村山市多摩湖町三丁目",
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
    "lat": 35.7692752,
    "lng": 139.4399697,
    "transfers": [],
    "address": "埼玉県所沢市大字山口",
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
    "lat": 35.7705036,
    "lng": 139.4198787,
    "transfers": [
      "西武狭山線"
    ],
    "address": "埼玉県所沢市大字上山口",
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
