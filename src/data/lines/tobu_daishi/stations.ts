import type { Station } from '../../../types';

export const TOBU_DAISHI_STATIONS: Station[] = [
  {
    "id": "TSK-13",
    "stationNumber": "TS-13",
    "lineId": "tobu_daishi",
    "number": 1,
    "name": "西新井",
    "nameKana": "にしあらい",
    "nameEn": "Nishi-Arai",
    "lat": 35.7772965,
    "lng": 139.7900257,
    "transfers": [
      "東武スカイツリーライン",
      "東武大師線"
    ],
    "address": "東京都足立区西新井栄町二丁目1-1",
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
    "id": "TSK-51",
    "stationNumber": "TS-51",
    "lineId": "tobu_daishi",
    "number": 2,
    "name": "大師前",
    "nameKana": "だいしまえ",
    "nameEn": "Daishimae",
    "lat": 35.7788876,
    "lng": 139.7817593,
    "transfers": [
      "東武大師線"
    ],
    "address": "東京都足立区西新井一丁目3-1",
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
