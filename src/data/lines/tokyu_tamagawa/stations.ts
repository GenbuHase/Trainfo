import type { Station } from '../../../types';

export const TOKYU_TAMAGAWA_STATIONS: Station[] = [
  {
    "id": "TM-01",
    "stationNumber": "TM01",
    "lineId": "tokyu_tamagawa",
    "number": 1,
    "name": "多摩川",
    "nameKana": "たまがわ",
    "nameEn": "Tamagawa",
    "lat": 35.5889596,
    "lng": 139.6690058,
    "transfers": [
      "東急東横線",
      "東急目黒線"
    ],
    "address": "東京都大田区田園調布一丁目53-8",
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
    "id": "TM-02",
    "stationNumber": "TM02",
    "lineId": "tokyu_tamagawa",
    "number": 2,
    "name": "沼部",
    "nameKana": "ぬまべ",
    "nameEn": "Numabe",
    "lat": 35.582313,
    "lng": 139.6735623,
    "transfers": [],
    "address": "東京都大田区田園調布本町",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TM-03",
    "stationNumber": "TM03",
    "lineId": "tokyu_tamagawa",
    "number": 3,
    "name": "鵜の木",
    "nameKana": "うのき",
    "nameEn": "Unoki",
    "lat": 35.5751939,
    "lng": 139.6808707,
    "transfers": [],
    "address": "東京都大田区鵜の木二丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TM-04",
    "stationNumber": "TM04",
    "lineId": "tokyu_tamagawa",
    "number": 4,
    "name": "下丸子",
    "nameKana": "しもまるこ",
    "nameEn": "Shimomaruko",
    "lat": 35.5712395,
    "lng": 139.6859229,
    "transfers": [],
    "address": "東京都大田区下丸子三丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TM-05",
    "stationNumber": "TM05",
    "lineId": "tokyu_tamagawa",
    "number": 5,
    "name": "武蔵新田",
    "nameKana": "むさしにった",
    "nameEn": "Musashinitta",
    "lat": 35.5676268,
    "lng": 139.6928431,
    "transfers": [],
    "address": "東京都大田区矢口一丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TM-06",
    "stationNumber": "TM06",
    "lineId": "tokyu_tamagawa",
    "number": 6,
    "name": "矢口渡",
    "nameKana": "やぐちのわたし",
    "nameEn": "Yaguchinowatashi",
    "lat": 35.5623815,
    "lng": 139.7007899,
    "transfers": [],
    "address": "東京都大田区多摩川一丁目",
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
    "isMajor": false,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "TM-07",
    "stationNumber": "TM07",
    "lineId": "tokyu_tamagawa",
    "number": 7,
    "name": "蒲田",
    "nameKana": "かまた",
    "nameEn": "Kamata",
    "lat": 35.5617016,
    "lng": 139.7148297,
    "transfers": [
      "ＪＲ京浜東北線",
      "東急池上線"
    ],
    "address": "東京都大田区西蒲田七丁目",
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
