import type { Station } from '../../../types';

export const TAZAWAKO_STATIONS: Station[] = [
  {
    "id": "TZ-01",
    "lineId": "tazawako",
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
      "rapid"
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
    "id": "TZ-02",
    "lineId": "tazawako",
    "number": 2,
    "name": "前潟",
    "nameKana": "まえがた",
    "nameEn": "Maegata",
    "lat": 39.7129346,
    "lng": 141.1008483,
    "transfers": [],
    "address": "岩手県前潟駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-03",
    "lineId": "tazawako",
    "number": 3,
    "name": "大釜",
    "nameKana": "おおがま",
    "nameEn": "Ōgama",
    "lat": 39.711558,
    "lng": 141.0720532,
    "transfers": [],
    "address": "岩手県大釜駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-04",
    "lineId": "tazawako",
    "number": 4,
    "name": "小岩井",
    "nameKana": "こいわい",
    "nameEn": "Koiwai",
    "lat": 39.7098774,
    "lng": 141.0248423,
    "transfers": [],
    "address": "岩手県小岩井駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-05",
    "lineId": "tazawako",
    "number": 5,
    "name": "雫石",
    "nameKana": "しずくいし",
    "nameEn": "Shizukuishi",
    "lat": 39.6892709,
    "lng": 140.9744464,
    "transfers": [
      "JR秋田新幹線"
    ],
    "address": "岩手県雫石駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-06",
    "lineId": "tazawako",
    "number": 6,
    "name": "春木場",
    "nameKana": "はるきば",
    "nameEn": "Harukiba",
    "lat": 39.6934072,
    "lng": 140.9439562,
    "transfers": [],
    "address": "岩手県春木場駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-07",
    "lineId": "tazawako",
    "number": 7,
    "name": "赤渕",
    "nameKana": "あかぶち",
    "nameEn": "Akabuchi",
    "lat": 39.6850376,
    "lng": 140.9064553,
    "transfers": [],
    "address": "岩手県赤渕駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-08",
    "lineId": "tazawako",
    "number": 8,
    "name": "田沢湖",
    "nameKana": "たざわこ",
    "nameEn": "Tazawako",
    "lat": 39.7002861,
    "lng": 140.7223789,
    "transfers": [
      "JR秋田新幹線"
    ],
    "address": "秋田県田沢湖駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-09",
    "lineId": "tazawako",
    "number": 9,
    "name": "刺巻",
    "nameKana": "さしまき",
    "nameEn": "Sashimaki",
    "lat": 39.6691713,
    "lng": 140.6926002,
    "transfers": [],
    "address": "秋田県刺巻駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-10",
    "lineId": "tazawako",
    "number": 10,
    "name": "神代",
    "nameKana": "じんだい",
    "nameEn": "Jindai",
    "lat": 39.6227936,
    "lng": 140.6277733,
    "transfers": [],
    "address": "秋田県神代駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-11",
    "lineId": "tazawako",
    "number": 11,
    "name": "生田",
    "nameKana": "しょうでん",
    "nameEn": "Shōden",
    "lat": 39.6120115,
    "lng": 140.6009184,
    "transfers": [],
    "address": "秋田県生田駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-12",
    "lineId": "tazawako",
    "number": 12,
    "name": "角館",
    "nameKana": "かくのだて",
    "nameEn": "Kakunodate",
    "lat": 39.5917435,
    "lng": 140.5711801,
    "transfers": [
      "JR秋田新幹線",
      "秋田内陸縦貫鉄道線"
    ],
    "address": "秋田県角館駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-13",
    "lineId": "tazawako",
    "number": 13,
    "name": "鶯野",
    "nameKana": "うぐいすの",
    "nameEn": "Uguisuno",
    "lat": 39.5686158,
    "lng": 140.5580018,
    "transfers": [],
    "address": "秋田県鶯野駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-14",
    "lineId": "tazawako",
    "number": 14,
    "name": "羽後長野",
    "nameKana": "うごながの",
    "nameEn": "Ugo-Nagano",
    "lat": 39.5459206,
    "lng": 140.5407569,
    "transfers": [],
    "address": "秋田県羽後長野駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-15",
    "lineId": "tazawako",
    "number": 15,
    "name": "鑓見内",
    "nameKana": "やりみない",
    "nameEn": "Yariminai",
    "lat": 39.5190492,
    "lng": 140.5275442,
    "transfers": [],
    "address": "秋田県鑓見内駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-16",
    "lineId": "tazawako",
    "number": 16,
    "name": "羽後四ツ屋",
    "nameKana": "うごよつや",
    "nameEn": "Ugo-Yotsuya",
    "lat": 39.5017238,
    "lng": 140.5120897,
    "transfers": [],
    "address": "秋田県羽後四ツ屋駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-17",
    "lineId": "tazawako",
    "number": 17,
    "name": "北大曲",
    "nameKana": "きたおおまがり",
    "nameEn": "Kita-Ōmagari",
    "lat": 39.4895423,
    "lng": 140.4981067,
    "transfers": [],
    "address": "秋田県北大曲駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
    "id": "TZ-18",
    "lineId": "tazawako",
    "number": 18,
    "name": "大曲",
    "nameKana": "おおまがり",
    "nameEn": "Ōmagari",
    "lat": 39.4655011,
    "lng": 140.479817,
    "transfers": [
      "JR秋田新幹線",
      "JR奥羽本線"
    ],
    "address": "秋田県大曲駅周辺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular",
      "rapid"
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
