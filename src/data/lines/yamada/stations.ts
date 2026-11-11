import type { Station } from '../../../types';

export const YAMADA_STATIONS: Station[] = [
  {
    "id": "YM-01",
    "lineId": "yamada",
    "number": 1,
    "name": "盛岡",
    "nameKana": "もりおか",
    "nameEn": "Morioka",
    "lat": 39.7006658,
    "lng": 141.1368084,
    "transfers": [
      "JR東北新幹線",
      "JR秋田新幹線",
      "JR東北本線",
      "IGRいわて銀河鉄道線",
      "JR田沢湖線",
      "JR山田線"
    ],
    "address": "岩手県盛岡駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-02",
    "lineId": "yamada",
    "number": 2,
    "name": "上盛岡",
    "nameKana": "かみもりおか",
    "nameEn": "Kami-Morioka",
    "lat": 39.7114956,
    "lng": 141.148516,
    "transfers": [],
    "address": "岩手県上盛岡駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-03",
    "lineId": "yamada",
    "number": 3,
    "name": "山岸",
    "nameKana": "やまぎし",
    "nameEn": "Yamagishi",
    "lat": 39.7160339,
    "lng": 141.1713191,
    "transfers": [],
    "address": "岩手県山岸駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-04",
    "lineId": "yamada",
    "number": 4,
    "name": "上米内",
    "nameKana": "かみよない",
    "nameEn": "Kami-Yonai",
    "lat": 39.7439231,
    "lng": 141.2038353,
    "transfers": [],
    "address": "岩手県上米内駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-05",
    "lineId": "yamada",
    "number": 5,
    "name": "区界",
    "nameKana": "くざかい",
    "nameEn": "Kuzakai",
    "lat": 39.6517598,
    "lng": 141.351454,
    "transfers": [],
    "address": "岩手県区界駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-06",
    "lineId": "yamada",
    "number": 6,
    "name": "松草",
    "nameKana": "まつくさ",
    "nameEn": "Matsukusa",
    "lat": 39.6357249,
    "lng": 141.4376987,
    "transfers": [],
    "address": "岩手県松草駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-07",
    "lineId": "yamada",
    "number": 7,
    "name": "川内",
    "nameKana": "かわうち",
    "nameEn": "Kawauchi",
    "lat": 39.640706,
    "lng": 141.5977644,
    "transfers": [],
    "address": "岩手県川内駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-08",
    "lineId": "yamada",
    "number": 8,
    "name": "箱石",
    "nameKana": "はこいし",
    "nameEn": "Hakoishi",
    "lat": 39.6173956,
    "lng": 141.6255534,
    "transfers": [],
    "address": "岩手県箱石駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-09",
    "lineId": "yamada",
    "number": 9,
    "name": "陸中川井",
    "nameKana": "りくちゅうかわい",
    "nameEn": "Rikuchū-Kawai",
    "lat": 39.5972217,
    "lng": 141.6813108,
    "transfers": [],
    "address": "岩手県陸中川井駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-10",
    "lineId": "yamada",
    "number": 10,
    "name": "腹帯",
    "nameKana": "はらたい",
    "nameEn": "Haratai",
    "lat": 39.6045202,
    "lng": 141.7677045,
    "transfers": [],
    "address": "岩手県腹帯駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-11",
    "lineId": "yamada",
    "number": 11,
    "name": "茂市",
    "nameKana": "もいち",
    "nameEn": "Moichi",
    "lat": 39.6206297,
    "lng": 141.7990032,
    "transfers": [],
    "address": "岩手県茂市駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-12",
    "lineId": "yamada",
    "number": 12,
    "name": "蟇目",
    "nameKana": "ひきめ",
    "nameEn": "Hikime",
    "lat": 39.6296697,
    "lng": 141.8388039,
    "transfers": [],
    "address": "岩手県蟇目駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-13",
    "lineId": "yamada",
    "number": 13,
    "name": "花原市",
    "nameKana": "けばらいち",
    "nameEn": "Kebaraichi",
    "lat": 39.6305018,
    "lng": 141.8613492,
    "transfers": [],
    "address": "岩手県花原市駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-14",
    "lineId": "yamada",
    "number": 14,
    "name": "千徳",
    "nameKana": "せんとく",
    "nameEn": "Sentoku",
    "lat": 39.6323145,
    "lng": 141.9123209,
    "transfers": [],
    "address": "岩手県千徳駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
    "id": "YM-15",
    "lineId": "yamada",
    "number": 15,
    "name": "宮古",
    "nameKana": "みやこ",
    "nameEn": "Miyako",
    "lat": 39.6398721,
    "lng": 141.9475248,
    "transfers": [
      "三陸鉄道リアス線"
    ],
    "address": "岩手県宮古駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid",
      "substitution_bus"
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
