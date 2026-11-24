import type { Station } from '../../../types';

export const JR_KASHIMA_STATIONS: Station[] = [
  {
    "id": "KSJ-01",
    "lineId": "jr_kashima",
    "number": 1,
    "name": "香取",
    "nameKana": "かとり",
    "nameEn": "Katori",
    "lat": 35.8979904,
    "lng": 140.5336956,
    "transfers": [
      "ＪＲ成田線"
    ],
    "address": "千葉県香取市津宮",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSJ-02",
    "lineId": "jr_kashima",
    "number": 2,
    "name": "十二橋",
    "nameKana": "じゅうにきょう",
    "nameEn": "Juunikyou",
    "lat": 35.9175596,
    "lng": 140.5458725,
    "transfers": [],
    "address": "千葉県香取市磯山",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "local"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSJ-03",
    "lineId": "jr_kashima",
    "number": 3,
    "name": "潮来",
    "nameKana": "いたこ",
    "nameEn": "Itako",
    "lat": 35.9384317,
    "lng": 140.5500254,
    "transfers": [],
    "address": "茨城県潮来市あやめ一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "local"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSJ-04",
    "lineId": "jr_kashima",
    "number": 4,
    "name": "延方",
    "nameKana": "のぶかた",
    "nameEn": "Nobukata",
    "lat": 35.9579393,
    "lng": 140.5893097,
    "transfers": [],
    "address": "茨城県潮来市宮前一丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "local"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSJ-05",
    "lineId": "jr_kashima",
    "number": 5,
    "name": "鹿島神宮",
    "nameKana": "かしまじんぐう",
    "nameEn": "Kashimajinguu",
    "lat": 35.9706172,
    "lng": 140.6254282,
    "transfers": [],
    "address": "茨城県鹿嶋市宮下四丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "local"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KSJ-06",
    "lineId": "jr_kashima",
    "number": 6,
    "name": "鹿島サッカースタジアム",
    "nameKana": "かしまさっかーすたじあむ",
    "nameEn": "Kashimasakkasutajiamu",
    "lat": 35.9933745,
    "lng": 140.6357466,
    "transfers": [],
    "address": "茨城県鹿嶋市大字宮中",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
