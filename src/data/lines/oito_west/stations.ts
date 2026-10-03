// JR西日本 大糸線 駅メタデータ定義 (南小谷 〜 糸魚川 全9駅)
import type { Station } from '../../../types';

export const OITO_WEST_STATIONS: Station[] = [
  {
    "id": "OW-01",
    "lineId": "oito_west",
    "number": 1,
    "name": "南小谷",
    "nameKana": "みなみおたり",
    "nameEn": "Minami-Otari",
    "lat": 36.7747757,
    "lng": 137.9083742,
    "transfers": [
      "JR東日本 大糸線"
    ],
    "address": "長野県北安曇郡小谷村大字千国乙",
    "isMajor": true,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OW-02",
    "lineId": "oito_west",
    "number": 2,
    "name": "中土",
    "nameKana": "なかつち",
    "nameEn": "Nakatsuchi",
    "lat": 36.805379,
    "lng": 137.908148,
    "transfers": [],
    "address": "長野県北安曇郡小谷村大字中土",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OW-03",
    "lineId": "oito_west",
    "number": 3,
    "name": "北小谷",
    "nameKana": "きたおたり",
    "nameEn": "Kita-Otari",
    "lat": 36.8421213,
    "lng": 137.9063382,
    "transfers": [],
    "address": "長野県北安曇郡小谷村大字北小谷",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OW-04",
    "lineId": "oito_west",
    "number": 4,
    "name": "平岩",
    "nameKana": "ひらいわ",
    "nameEn": "Hiraiwa",
    "lat": 36.8871476,
    "lng": 137.8654071,
    "transfers": [],
    "address": "新潟県糸魚川市大字大所",
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "OW-05",
    "lineId": "oito_west",
    "number": 5,
    "name": "小滝",
    "nameKana": "こたき",
    "nameEn": "Kotaki",
    "lat": 36.937941,
    "lng": 137.8600393,
    "transfers": [],
    "address": "新潟県糸魚川市大字小滝",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OW-06",
    "lineId": "oito_west",
    "number": 6,
    "name": "根知",
    "nameKana": "ねち",
    "nameEn": "Nechi",
    "lat": 36.9668837,
    "lng": 137.8669274,
    "transfers": [],
    "address": "新潟県糸魚川市大字根知",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OW-07",
    "lineId": "oito_west",
    "number": 7,
    "name": "頸城大野",
    "nameKana": "くびきおおの",
    "nameEn": "Kubiki-Ōno",
    "lat": 37.0060513,
    "lng": 137.8725383,
    "transfers": [],
    "address": "新潟県糸魚川市大字大野",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OW-08",
    "lineId": "oito_west",
    "number": 8,
    "name": "姫川",
    "nameKana": "ひめかわ",
    "nameEn": "Himekawa",
    "lat": 37.0203734,
    "lng": 137.8608698,
    "transfers": [],
    "address": "新潟県糸魚川市大字蓮台寺",
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "OW-09",
    "lineId": "oito_west",
    "number": 9,
    "name": "糸魚川",
    "nameKana": "いといがわ",
    "nameEn": "Itoigawa",
    "lat": 37.0433062,
    "lng": 137.8617531,
    "transfers": [
      "JR北陸新幹線",
      "えちごトキめき鉄道日本海ひすいライン"
    ],
    "address": "新潟県糸魚川市大町1丁目",
    "isMajor": true,
    "platforms": {
      "inbound": "4番線",
      "outbound": "4番線"
    },
    "stoppingTypes": [
      "regular"
    ],
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
