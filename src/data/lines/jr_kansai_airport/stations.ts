import type { Station } from '../../../types';

export const JR_KANSAI_AIRPORT_STATIONS: Station[] = [
  {
    "id": "jr_kansai_airport-01",
    "stationNumber": "JR-S45",
    "lineId": "jr_kansai_airport",
    "number": 1,
    "name": "日根野",
    "nameKana": "ひねの",
    "nameEn": "Hineno",
    "lat": 34.39149,
    "lng": 135.3317,
    "transfers": [
      "ＪＲ阪和線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "kanku_rapid",
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
    "id": "jr_kansai_airport-02",
    "stationNumber": "JR-S46",
    "lineId": "jr_kansai_airport",
    "number": 2,
    "name": "りんくうタウン",
    "nameKana": "りんくうたうん",
    "nameEn": "Rinku-Town",
    "lat": 34.41143,
    "lng": 135.29887,
    "transfers": [
      "南海空港線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "kanku_rapid",
      "limitedExp"
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
    "id": "jr_kansai_airport-03",
    "stationNumber": "JR-S47",
    "lineId": "jr_kansai_airport",
    "number": 3,
    "name": "関西空港",
    "nameKana": "かんさいくうこう",
    "nameEn": "Kansai-Airport",
    "lat": 34.43439,
    "lng": 135.24057,
    "transfers": [
      "南海空港線"
    ],
    "address": "",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "kanku_rapid",
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
