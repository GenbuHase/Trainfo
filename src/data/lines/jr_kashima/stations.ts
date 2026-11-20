import type { Station } from '../../../types';

export const JR_KASHIMA_STATIONS: Station[] = [
  {
    "id": "KSJ-01",
    "lineId": "jr_kashima",
    "number": 1,
    "name": "香取",
    "nameKana": "かとり",
    "nameEn": "Katori",
    "lat": 35.89795,
    "lng": 140.5337,
    "transfers": [
      "ＪＲ成田線"
    ],
    "address": "千葉県香取駅",
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
    "lat": 35.91756,
    "lng": 140.54586,
    "transfers": [],
    "address": "千葉県十二橋駅",
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
    "lat": 35.93844,
    "lng": 140.54998,
    "transfers": [],
    "address": "茨城県潮来駅",
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
    "lat": 35.95794,
    "lng": 140.58931,
    "transfers": [],
    "address": "茨城県延方駅",
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
    "lat": 35.97061,
    "lng": 140.62543,
    "transfers": [],
    "address": "茨城県鹿島神宮駅",
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
    "lat": 35.99338,
    "lng": 140.63577,
    "transfers": [],
    "address": "茨城県鹿島サッカースタジアム駅",
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