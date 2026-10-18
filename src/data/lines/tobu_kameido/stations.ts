import type { Station } from '../../../types';

export const TOBU_KAMEIDO_STATIONS: Station[] = [
  {
    "id": "TSK-04",
    "stationNumber": "TS-04",
    "lineId": "tobu_kameido",
    "number": 1,
    "name": "曳舟",
    "nameKana": "ひきふね",
    "nameEn": "Hikifune",
    "lat": 35.7183011,
    "lng": 139.8168537,
    "transfers": [
      "東武スカイツリーライン",
      "東武亀戸線"
    ],
    "address": "東京都墨田区東向島二丁目26-1",
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
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TSK-41",
    "stationNumber": "TS-41",
    "lineId": "tobu_kameido",
    "number": 2,
    "name": "小村井",
    "nameKana": "おむらい",
    "nameEn": "Omurai",
    "lat": 35.71035,
    "lng": 139.827639,
    "transfers": [
      "東武亀戸線"
    ],
    "address": "東京都墨田区文花二丁目11-13",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TSK-42",
    "stationNumber": "TS-42",
    "lineId": "tobu_kameido",
    "number": 3,
    "name": "東あずま",
    "nameKana": "ひがしあずま",
    "nameEn": "Higashi-Azuma",
    "lat": 35.707072,
    "lng": 139.8318266,
    "transfers": [
      "東武亀戸線"
    ],
    "address": "東京都墨田区立花二丁目24-7",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TSK-43",
    "stationNumber": "TS-43",
    "lineId": "tobu_kameido",
    "number": 4,
    "name": "亀戸水神",
    "nameKana": "かめいどすいじん",
    "nameEn": "Kameidosuijin",
    "lat": 35.6999506,
    "lng": 139.8335131,
    "transfers": [
      "東武亀戸線"
    ],
    "address": "東京都江東区亀戸八丁目5-1",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "TSK-44",
    "stationNumber": "TS-44",
    "lineId": "tobu_kameido",
    "number": 5,
    "name": "亀戸",
    "nameKana": "かめいど",
    "nameEn": "Kameido",
    "lat": 35.697646,
    "lng": 139.8270326,
    "transfers": [
      "東武亀戸線",
      "JR中央・総武線各駅停車"
    ],
    "address": "東京都江東区亀戸五丁目1-1",
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
      "inbound": "1番線",
      "outbound": "2番線"
    }
  }
];
