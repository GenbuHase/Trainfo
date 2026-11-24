import type { Station } from '../../../types';

export const TAZAWAKO_STATIONS: Station[] = [
  {
    "id": "TZ-01",
    "lineId": "jr_tazawako",
    "number": 1,
    "name": "盛岡",
    "nameKana": "もりおか",
    "nameEn": "Morioka",
    "lat": 39.7006658,
    "lng": 141.1368084,
    "transfers": [
      "JR東北新幹線",
      "JR秋田新幹線",
      "JR東北本線（一ノ関～盛岡）",
      "IGRいわて銀河鉄道線",
      "JR山田線"
    ],
    "address": "岩手県盛岡市盛岡駅前通",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 2,
    "name": "前潟",
    "nameKana": "まえがた",
    "nameEn": "Maegata",
    "lat": 39.7129346,
    "lng": 141.1008483,
    "transfers": [],
    "address": "岩手県盛岡市上厨川",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 3,
    "name": "大釜",
    "nameKana": "おおがま",
    "nameEn": "Ōgama",
    "lat": 39.711558,
    "lng": 141.0720532,
    "transfers": [],
    "address": "岩手県滝沢市篠木明法",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 4,
    "name": "小岩井",
    "nameKana": "こいわい",
    "nameEn": "Koiwai",
    "lat": 39.7098774,
    "lng": 141.0248423,
    "transfers": [],
    "address": "岩手県滝沢市大釜風林",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 5,
    "name": "雫石",
    "nameKana": "しずくいし",
    "nameEn": "Shizukuishi",
    "lat": 39.6892709,
    "lng": 140.9744464,
    "transfers": [
      "JR秋田新幹線"
    ],
    "address": "岩手県雫石町寺の下",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 6,
    "name": "春木場",
    "nameKana": "はるきば",
    "nameEn": "Harukiba",
    "lat": 39.6934072,
    "lng": 140.9439562,
    "transfers": [],
    "address": "岩手県雫石町上野",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 7,
    "name": "赤渕",
    "nameKana": "あかぶち",
    "nameEn": "Akabuchi",
    "lat": 39.6850376,
    "lng": 140.9064553,
    "transfers": [],
    "address": "岩手県雫石町御明神",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 8,
    "name": "田沢湖",
    "nameKana": "たざわこ",
    "nameEn": "Tazawako",
    "lat": 39.7002861,
    "lng": 140.7223789,
    "transfers": [
      "JR秋田新幹線"
    ],
    "address": "秋田県仙北市田沢湖生保内",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 9,
    "name": "刺巻",
    "nameKana": "さしまき",
    "nameEn": "Sashimaki",
    "lat": 39.6691713,
    "lng": 140.6926002,
    "transfers": [],
    "address": "秋田県仙北市田沢湖刺巻",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 10,
    "name": "神代",
    "nameKana": "じんだい",
    "nameEn": "Jindai",
    "lat": 39.6227936,
    "lng": 140.6277733,
    "transfers": [],
    "address": "秋田県仙北市田沢湖卒田",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 11,
    "name": "生田",
    "nameKana": "しょうでん",
    "nameEn": "Shōden",
    "lat": 39.6120115,
    "lng": 140.6009184,
    "transfers": [],
    "address": "秋田県仙北市田沢湖神代",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 12,
    "name": "角館",
    "nameKana": "かくのだて",
    "nameEn": "Kakunodate",
    "lat": 39.5917435,
    "lng": 140.5711801,
    "transfers": [
      "JR秋田新幹線",
      "秋田内陸縦貫鉄道秋田内陸線"
    ],
    "address": "秋田県仙北市角館町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 13,
    "name": "鶯野",
    "nameKana": "うぐいすの",
    "nameEn": "Uguisuno",
    "lat": 39.5686158,
    "lng": 140.5580018,
    "transfers": [],
    "address": "秋田県大仙市下鴬野",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 14,
    "name": "羽後長野",
    "nameKana": "うごながの",
    "nameEn": "Ugo-Nagano",
    "lat": 39.5459206,
    "lng": 140.5407569,
    "transfers": [],
    "address": "秋田県大仙市長野",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 15,
    "name": "鑓見内",
    "nameKana": "やりみない",
    "nameEn": "Yariminai",
    "lat": 39.5190492,
    "lng": 140.5275442,
    "transfers": [],
    "address": "秋田県大仙市鑓見内",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 16,
    "name": "羽後四ツ屋",
    "nameKana": "うごよつや",
    "nameEn": "Ugo-Yotsuya",
    "lat": 39.5017238,
    "lng": 140.5120897,
    "transfers": [],
    "address": "秋田県大仙市四ツ屋",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 17,
    "name": "北大曲",
    "nameKana": "きたおおまがり",
    "nameEn": "Kita-Ōmagari",
    "lat": 39.4895423,
    "lng": 140.4981067,
    "transfers": [],
    "address": "秋田県大仙市四ツ屋",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
    "lineId": "jr_tazawako",
    "number": 18,
    "name": "大曲",
    "nameKana": "おおまがり",
    "nameEn": "Ōmagari",
    "lat": 39.4655011,
    "lng": 140.479817,
    "transfers": [
      "JR秋田新幹線",
      "JR奥羽本線（大曲～秋田）",
      "JR奥羽本線（新庄～大曲）"
    ],
    "address": "秋田県大仙市大曲通町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "regular"
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
