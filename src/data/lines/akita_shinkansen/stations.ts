import type { Station } from '../../../types';

export const AKITA_SHINKANSEN_STATIONS: Station[] = [
  {
    "id": "AS-01",
    "stationNumber": "AS-01",
    "lineId": "akita_shinkansen",
    "number": 1,
    "name": "盛岡",
    "nameKana": "もりおか",
    "nameEn": "Morioka",
    "lat": 39.7014809,
    "lng": 141.136534,
    "transfers": [
      "ＪＲ東北新幹線",
      "ＪＲ秋田新幹線",
      "ＪＲ花輪線",
      "ＪＲ田沢湖線",
      "ＪＲ山田線",
      "ＪＲ東北本線",
      "ＩＧＲいわて銀河鉄道線"
    ],
    "address": "岩手県盛岡市盛岡駅前通1-48",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "komachi",
      "hayabusa"
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
    "id": "AS-02",
    "stationNumber": "AS-02",
    "lineId": "akita_shinkansen",
    "number": 2,
    "name": "雫石",
    "nameKana": "しずくいし",
    "nameEn": "Shizukuishi",
    "lat": 39.689364777146,
    "lng": 140.97485849152,
    "transfers": [
      "ＪＲ秋田新幹線",
      "ＪＲ田沢湖線"
    ],
    "address": "岩手県岩手郡雫石町寺の下46-3",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "komachi",
      "hayabusa"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "AS-03",
    "stationNumber": "AS-03",
    "lineId": "akita_shinkansen",
    "number": 3,
    "name": "田沢湖",
    "nameKana": "たざわこ",
    "nameEn": "Tazawako",
    "lat": 39.700270719414,
    "lng": 140.72241379568,
    "transfers": [
      "ＪＲ秋田新幹線",
      "ＪＲ田沢湖線"
    ],
    "address": "秋田県仙北市田沢湖生保内字男坂68",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "komachi",
      "hayabusa"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "AS-04",
    "stationNumber": "AS-04",
    "lineId": "akita_shinkansen",
    "number": 4,
    "name": "角館",
    "nameKana": "かくのだて",
    "nameEn": "Kakunodate",
    "lat": 39.591723447437,
    "lng": 140.57098993229,
    "transfers": [
      "ＪＲ秋田新幹線",
      "ＪＲ田沢湖線",
      "秋田内陸線"
    ],
    "address": "秋田県仙北市角館町中菅沢14",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "komachi",
      "hayabusa"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "AS-05",
    "stationNumber": "AS-05",
    "lineId": "akita_shinkansen",
    "number": 5,
    "name": "大曲",
    "nameKana": "おおまがり",
    "nameEn": "Omagari",
    "lat": 39.465433112184,
    "lng": 140.47961596399,
    "transfers": [
      "ＪＲ秋田新幹線",
      "ＪＲ奥羽本線",
      "ＪＲ田沢湖線"
    ],
    "address": "秋田県大仙市大曲通町6-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "komachi",
      "hayabusa"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "AS-06",
    "stationNumber": "AS-06",
    "lineId": "akita_shinkansen",
    "number": 6,
    "name": "秋田",
    "nameKana": "あきた",
    "nameEn": "Akita",
    "lat": 39.716835853985,
    "lng": 140.12974751859,
    "transfers": [
      "ＪＲ秋田新幹線",
      "ＪＲ奥羽本線",
      "ＪＲ男鹿線",
      "ＪＲ羽越本線"
    ],
    "address": "秋田県秋田市中通7丁目1-2",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "komachi",
      "hayabusa"
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
