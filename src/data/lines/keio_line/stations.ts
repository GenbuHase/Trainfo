import type { Station } from '../../../types';

export const KEIO_LINE_STATIONS: Station[] = [
  {
    "id": "KO-01",
    "stationNumber": "KO01",
    "lineId": "keio_line",
    "number": 1,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.6895077,
    "lng": 139.6993171,
    "transfers": [
      "ＪＲ湘南新宿ライン",
      "ＪＲ埼京線",
      "ＪＲ中央線快速",
      "ＪＲ中央・総武線各駅停車",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "京王新線",
      "小田急小田原線",
      "都営地下鉄新宿線",
      "都営地下鉄大江戸線"
    ],
    "address": "東京都新宿駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-02",
    "stationNumber": "KO02",
    "lineId": "keio_line",
    "number": 2,
    "name": "笹塚",
    "nameKana": "ささづか",
    "nameEn": "Sasazuka",
    "lat": 35.6733099,
    "lng": 139.6665249,
    "transfers": [
      "京王新線"
    ],
    "address": "東京都笹塚駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-03",
    "stationNumber": "KO03",
    "lineId": "keio_line",
    "number": 3,
    "name": "代田橋",
    "nameKana": "だいたばし",
    "nameEn": "Daitabashi",
    "lat": 35.670849,
    "lng": 139.6587354,
    "transfers": [],
    "address": "東京都代田橋駅",
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
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-04",
    "stationNumber": "KO04",
    "lineId": "keio_line",
    "number": 4,
    "name": "明大前",
    "nameKana": "めいだいまえ",
    "nameEn": "Meidaimae",
    "lat": 35.6683041,
    "lng": 139.6504471,
    "transfers": [
      "京王井の頭線"
    ],
    "address": "東京都明大前駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-05",
    "stationNumber": "KO05",
    "lineId": "keio_line",
    "number": 5,
    "name": "下高井戸",
    "nameKana": "しもたかいど",
    "nameEn": "Shimotakaido",
    "lat": 35.6660743,
    "lng": 139.6421202,
    "transfers": [
      "東急世田谷線"
    ],
    "address": "東京都下高井戸駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-06",
    "stationNumber": "KO06",
    "lineId": "keio_line",
    "number": 6,
    "name": "桜上水",
    "nameKana": "さくらじょうすい",
    "nameEn": "Sakurajousui",
    "lat": 35.6677515,
    "lng": 139.6306159,
    "transfers": [],
    "address": "東京都桜上水駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-07",
    "stationNumber": "KO07",
    "lineId": "keio_line",
    "number": 7,
    "name": "上北沢",
    "nameKana": "かみきたざわ",
    "nameEn": "Kamikitazawa",
    "lat": 35.6686944,
    "lng": 139.6241946,
    "transfers": [],
    "address": "東京都上北沢駅",
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
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-08",
    "stationNumber": "KO08",
    "lineId": "keio_line",
    "number": 8,
    "name": "八幡山",
    "nameKana": "はちまんやま",
    "nameEn": "Hachimanyama",
    "lat": 35.6701536,
    "lng": 139.6138988,
    "transfers": [],
    "address": "東京都八幡山駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-09",
    "stationNumber": "KO09",
    "lineId": "keio_line",
    "number": 9,
    "name": "芦花公園",
    "nameKana": "ろかこうえん",
    "nameEn": "Rokakouen",
    "lat": 35.6705287,
    "lng": 139.6082204,
    "transfers": [],
    "address": "東京都芦花公園駅",
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
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-10",
    "stationNumber": "KO10",
    "lineId": "keio_line",
    "number": 10,
    "name": "千歳烏山",
    "nameKana": "ちとせからすやま",
    "nameEn": "Chitosekarasuyama",
    "lat": 35.6681337,
    "lng": 139.601284,
    "transfers": [],
    "address": "東京都千歳烏山駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-11",
    "stationNumber": "KO11",
    "lineId": "keio_line",
    "number": 11,
    "name": "仙川",
    "nameKana": "せんがわ",
    "nameEn": "Sengawa",
    "lat": 35.6623716,
    "lng": 139.5851834,
    "transfers": [],
    "address": "東京都仙川駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-12",
    "stationNumber": "KO12",
    "lineId": "keio_line",
    "number": 12,
    "name": "つつじケ丘",
    "nameKana": "つつじがおか",
    "nameEn": "Tsutsujigaoka",
    "lat": 35.6584113,
    "lng": 139.5760179,
    "transfers": [],
    "address": "東京都つつじケ丘駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-13",
    "stationNumber": "KO13",
    "lineId": "keio_line",
    "number": 13,
    "name": "柴崎",
    "nameKana": "しばさき",
    "nameEn": "Shibasaki",
    "lat": 35.6543629,
    "lng": 139.5673363,
    "transfers": [],
    "address": "東京都柴崎駅",
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
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-14",
    "stationNumber": "KO14",
    "lineId": "keio_line",
    "number": 14,
    "name": "国領",
    "nameKana": "こくりょう",
    "nameEn": "Kokuryou",
    "lat": 35.6504311,
    "lng": 139.5590854,
    "transfers": [],
    "address": "東京都国領駅",
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
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-15",
    "stationNumber": "KO15",
    "lineId": "keio_line",
    "number": 15,
    "name": "布田",
    "nameKana": "ふだ",
    "nameEn": "Fuda",
    "lat": 35.6497354,
    "lng": 139.5523449,
    "transfers": [],
    "address": "東京都布田駅",
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
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-16",
    "stationNumber": "KO16",
    "lineId": "keio_line",
    "number": 16,
    "name": "調布",
    "nameKana": "ちょうふ",
    "nameEn": "Choufu",
    "lat": 35.6514639,
    "lng": 139.5459295,
    "transfers": [
      "京王相模原線"
    ],
    "address": "東京都調布駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-17",
    "stationNumber": "KO17",
    "lineId": "keio_line",
    "number": 17,
    "name": "西調布",
    "nameKana": "にしちょうふ",
    "nameEn": "Nishichoufu",
    "lat": 35.6569166,
    "lng": 139.5303475,
    "transfers": [],
    "address": "東京都西調布駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-18",
    "stationNumber": "KO18",
    "lineId": "keio_line",
    "number": 18,
    "name": "飛田給",
    "nameKana": "とびたきゅう",
    "nameEn": "Tobitakyuu",
    "lat": 35.659632,
    "lng": 139.5244414,
    "transfers": [],
    "address": "東京都飛田給駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-19",
    "stationNumber": "KO19",
    "lineId": "keio_line",
    "number": 19,
    "name": "武蔵野台",
    "nameKana": "むさしのだい",
    "nameEn": "Musashinodai",
    "lat": 35.6639708,
    "lng": 139.5120935,
    "transfers": [],
    "address": "東京都武蔵野台駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-20",
    "stationNumber": "KO20",
    "lineId": "keio_line",
    "number": 20,
    "name": "多磨霊園",
    "nameKana": "たまれいえん",
    "nameEn": "Tamareien",
    "lat": 35.6660415,
    "lng": 139.5030817,
    "transfers": [],
    "address": "東京都多磨霊園駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-21",
    "stationNumber": "KO21",
    "lineId": "keio_line",
    "number": 21,
    "name": "東府中",
    "nameKana": "ひがしふちゅう",
    "nameEn": "Higashifuchuu",
    "lat": 35.669015,
    "lng": 139.4947881,
    "transfers": [
      "京王競馬場線"
    ],
    "address": "東京都東府中駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-22",
    "stationNumber": "KO22",
    "lineId": "keio_line",
    "number": 22,
    "name": "府中",
    "nameKana": "ふちゅう",
    "nameEn": "Fuchuu",
    "lat": 35.6723236,
    "lng": 139.4794053,
    "transfers": [],
    "address": "東京都府中駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-23",
    "stationNumber": "KO23",
    "lineId": "keio_line",
    "number": 23,
    "name": "分倍河原",
    "nameKana": "ぶばいがわら",
    "nameEn": "Bubaigawara",
    "lat": 35.6685891,
    "lng": 139.4685667,
    "transfers": [
      "ＪＲ南武線"
    ],
    "address": "東京都分倍河原駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-24",
    "stationNumber": "KO24",
    "lineId": "keio_line",
    "number": 24,
    "name": "中河原",
    "nameKana": "なかがわら",
    "nameEn": "Nakagawara",
    "lat": 35.6595371,
    "lng": 139.4575337,
    "transfers": [],
    "address": "東京都中河原駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-25",
    "stationNumber": "KO25",
    "lineId": "keio_line",
    "number": 25,
    "name": "聖蹟桜ケ丘",
    "nameKana": "せいせきさくらがおか",
    "nameEn": "Seisekisakuragaoka",
    "lat": 35.650732,
    "lng": 139.4467082,
    "transfers": [],
    "address": "東京都聖蹟桜ケ丘駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-26",
    "stationNumber": "KO26",
    "lineId": "keio_line",
    "number": 26,
    "name": "百草園",
    "nameKana": "もぐさえん",
    "nameEn": "Mogusaen",
    "lat": 35.6572619,
    "lng": 139.431944,
    "transfers": [],
    "address": "東京都百草園駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-27",
    "stationNumber": "KO27",
    "lineId": "keio_line",
    "number": 27,
    "name": "高幡不動",
    "nameKana": "たかはたふどう",
    "nameEn": "Takahatafudou",
    "lat": 35.6626778,
    "lng": 139.412235,
    "transfers": [
      "京王動物園線",
      "多摩都市モノレール線"
    ],
    "address": "東京都高幡不動駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-28",
    "stationNumber": "KO28",
    "lineId": "keio_line",
    "number": 28,
    "name": "南平",
    "nameKana": "みなみだいら",
    "nameEn": "Minamidaira",
    "lat": 35.654748,
    "lng": 139.392105,
    "transfers": [],
    "address": "東京都南平駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-29",
    "stationNumber": "KO29",
    "lineId": "keio_line",
    "number": 29,
    "name": "平山城址公園",
    "nameKana": "ひらやまじょうしこうえん",
    "nameEn": "Hirayamajoushikouen",
    "lat": 35.6466813,
    "lng": 139.3792183,
    "transfers": [],
    "address": "東京都平山城址公園駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-30",
    "stationNumber": "KO30",
    "lineId": "keio_line",
    "number": 30,
    "name": "長沼",
    "nameKana": "ながぬま",
    "nameEn": "Naganuma",
    "lat": 35.6427671,
    "lng": 139.3666903,
    "transfers": [],
    "address": "東京都長沼駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-31",
    "stationNumber": "KO31",
    "lineId": "keio_line",
    "number": 31,
    "name": "北野",
    "nameKana": "きたの",
    "nameEn": "Kitano",
    "lat": 35.6444793,
    "lng": 139.3543158,
    "transfers": [
      "京王高尾線"
    ],
    "address": "東京都北野駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "KO-32",
    "stationNumber": "KO32",
    "lineId": "keio_line",
    "number": 32,
    "name": "京王八王子",
    "nameKana": "けいおうはちおうじ",
    "nameEn": "Keiouhachiouji",
    "lat": 35.6579493,
    "lng": 139.3431094,
    "transfers": [],
    "address": "東京都京王八王子駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "section_exp",
      "express",
      "limited_exp",
      "liner"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
