import type { Station } from '../../../types';

export const MYOKO_HANEUMA_STATIONS: Station[] = [
  {
    "id": "ETM-01",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 1,
    "name": "妙高高原",
    "nameKana": "みょうこうこうげん",
    "nameEn": "Myoko-Kogen",
    "lat": 36.8725757,
    "lng": 138.212362,
    "transfers": [
      "しなの鉄道北しなの線"
    ],
    "address": "新潟県妙高市大字田口312",
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "1・3番線"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "ETM-02",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 2,
    "name": "関山",
    "nameKana": "せきやま",
    "nameEn": "Sekiyama",
    "lat": 36.9330033,
    "lng": 138.2265467,
    "transfers": [],
    "address": "新潟県妙高市大字関山1213-15",
    "platforms": {
      "inbound": "2番線",
      "outbound": "1番線"
    },
    "stoppingTypes": [
      "local"
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
    "id": "ETM-03",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 3,
    "name": "二本木",
    "nameKana": "にほんぎ",
    "nameEn": "Nihongi",
    "lat": 36.9897267,
    "lng": 138.232745,
    "transfers": [],
    "address": "新潟県上越市中郷区板橋552",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local"
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
    "id": "ETM-04",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 4,
    "name": "新井",
    "nameKana": "あらい",
    "nameEn": "Arai",
    "lat": 37.0270389,
    "lng": 138.2555559,
    "transfers": [],
    "address": "新潟県妙高市栄町1丁目1-1",
    "platforms": {
      "inbound": "2番線",
      "outbound": "1・3番線"
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "ETM-05",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 5,
    "name": "北新井",
    "nameKana": "きたあらい",
    "nameEn": "Kita-Arai",
    "lat": 37.0531443,
    "lng": 138.2576924,
    "transfers": [],
    "address": "新潟県妙高市柳井田町1丁目10-20",
    "platforms": {
      "inbound": "のりば",
      "outbound": "のりば"
    },
    "stoppingTypes": [
      "local"
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
    "id": "ETM-06",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 6,
    "name": "上越妙高",
    "nameKana": "じょうえつみょうこう",
    "nameEn": "Joetsu-Myoko",
    "lat": 37.0813259,
    "lng": 138.2479995,
    "transfers": [
      "JR北陸新幹線"
    ],
    "address": "新潟県上越市大和2丁目",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limited_exp"
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
    "id": "ETM-07",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 7,
    "name": "南高田",
    "nameKana": "みなみたかだ",
    "nameEn": "Minami-Takada",
    "lat": 37.0969069,
    "lng": 138.2429327,
    "transfers": [],
    "address": "新潟県上越市南高田町1-1",
    "platforms": {
      "inbound": "のりば",
      "outbound": "のりば"
    },
    "stoppingTypes": [
      "local"
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
    "id": "ETM-08",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 8,
    "name": "高田",
    "nameKana": "たかだ",
    "nameEn": "Takada",
    "lat": 37.115143,
    "lng": 138.2419916,
    "transfers": [],
    "address": "新潟県上越市仲町4丁目1-1",
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limited_exp"
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
    "id": "ETM-09",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 9,
    "name": "春日山",
    "nameKana": "かすがやま",
    "nameEn": "Kasugayama",
    "lat": 37.148046,
    "lng": 138.2350179,
    "transfers": [],
    "address": "新潟県上越市春日山町3丁目1-1",
    "platforms": {
      "inbound": "のりば",
      "outbound": "のりば"
    },
    "stoppingTypes": [
      "local",
      "limited_exp"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "ETM-10",
    "lineId": "echigo_tokimeki_myoko_haneuma",
    "number": 10,
    "name": "直江津",
    "nameKana": "なおえつ",
    "nameEn": "Naoetsu",
    "lat": 37.170251,
    "lng": 138.242265,
    "transfers": [
      "JR信越本線（直江津～新潟）",
      "えちごトキめき鉄道日本海ひすいライン",
      "北越急行ほくほく線"
    ],
    "address": "新潟県上越市東町1-1",
    "platforms": {
      "inbound": "1〜3番線",
      "outbound": "1〜5番線"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limited_exp"
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
