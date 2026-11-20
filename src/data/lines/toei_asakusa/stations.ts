import type { Station } from '../../../types';

export const TOEI_ASAKUSA_STATIONS: Station[] = [
  {
    "id": "A-01",
    "stationNumber": "A01",
    "lineId": "toei_asakusa",
    "number": 1,
    "name": "西馬込",
    "nameKana": "にしまごめ",
    "nameEn": "Nishimagome",
    "lat": 35.58793,
    "lng": 139.70679,
    "transfers": [],
    "address": "東京都西馬込駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-02",
    "stationNumber": "A02",
    "lineId": "toei_asakusa",
    "number": 2,
    "name": "馬込",
    "nameKana": "まごめ",
    "nameEn": "Magome",
    "lat": 35.59621,
    "lng": 139.71181,
    "transfers": [],
    "address": "東京都馬込駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-03",
    "stationNumber": "A03",
    "lineId": "toei_asakusa",
    "number": 3,
    "name": "中延",
    "nameKana": "なかのぶ",
    "nameEn": "Nakanobu",
    "lat": 35.60593,
    "lng": 139.71374,
    "transfers": [
      "東急大井町線"
    ],
    "address": "東京都中延駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-04",
    "stationNumber": "A04",
    "lineId": "toei_asakusa",
    "number": 4,
    "name": "戸越",
    "nameKana": "とごし",
    "nameEn": "Togoshi",
    "lat": 35.61511,
    "lng": 139.71664,
    "transfers": [],
    "address": "東京都戸越駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-05",
    "stationNumber": "A05",
    "lineId": "toei_asakusa",
    "number": 5,
    "name": "五反田",
    "nameKana": "ごたんだ",
    "nameEn": "Gotanda",
    "lat": 35.62752,
    "lng": 139.7248,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "東急池上線"
    ],
    "address": "東京都五反田駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-06",
    "stationNumber": "A06",
    "lineId": "toei_asakusa",
    "number": 6,
    "name": "高輪台",
    "nameKana": "たかなわだい",
    "nameEn": "Takanawadai",
    "lat": 35.63152,
    "lng": 139.73017,
    "transfers": [],
    "address": "東京都高輪台駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-07",
    "stationNumber": "A07",
    "lineId": "toei_asakusa",
    "number": 7,
    "name": "泉岳寺",
    "nameKana": "せんがくじ",
    "nameEn": "Sengakuji",
    "lat": 35.6388,
    "lng": 139.74008,
    "transfers": [
      "京急本線"
    ],
    "address": "東京都泉岳寺駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-08",
    "stationNumber": "A08",
    "lineId": "toei_asakusa",
    "number": 8,
    "name": "三田",
    "nameKana": "みた",
    "nameEn": "Mita",
    "lat": 35.64776,
    "lng": 139.74914,
    "transfers": [
      "都営地下鉄三田線"
    ],
    "address": "東京都三田駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-09",
    "stationNumber": "A09",
    "lineId": "toei_asakusa",
    "number": 9,
    "name": "大門",
    "nameKana": "だいもん",
    "nameEn": "Daimon",
    "lat": 35.65678,
    "lng": 139.75468,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都大門駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-10",
    "stationNumber": "A10",
    "lineId": "toei_asakusa",
    "number": 10,
    "name": "新橋",
    "nameKana": "しんばし",
    "nameEn": "Shimbashi",
    "lat": 35.66514,
    "lng": 139.7592,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "ＪＲ京浜東北線",
      "ＪＲ横須賀線",
      "ＪＲ東海道本線",
      "東京メトロ銀座線",
      "ゆりかもめ"
    ],
    "address": "東京都新橋駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-11",
    "stationNumber": "A11",
    "lineId": "toei_asakusa",
    "number": 11,
    "name": "東銀座",
    "nameKana": "ひがしぎんざ",
    "nameEn": "Higashiginza",
    "lat": 35.66979,
    "lng": 139.76732,
    "transfers": [
      "東京メトロ日比谷線"
    ],
    "address": "東京都東銀座駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-12",
    "stationNumber": "A12",
    "lineId": "toei_asakusa",
    "number": 12,
    "name": "宝町",
    "nameKana": "たからちょう",
    "nameEn": "Takarachou",
    "lat": 35.67578,
    "lng": 139.77215,
    "transfers": [],
    "address": "東京都宝町駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-13",
    "stationNumber": "A13",
    "lineId": "toei_asakusa",
    "number": 13,
    "name": "日本橋",
    "nameKana": "にほんばし",
    "nameEn": "Nihombashi",
    "lat": 35.68155,
    "lng": 139.77574,
    "transfers": [
      "東京メトロ銀座線",
      "東京メトロ東西線"
    ],
    "address": "東京都日本橋駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-14",
    "stationNumber": "A14",
    "lineId": "toei_asakusa",
    "number": 14,
    "name": "人形町",
    "nameKana": "にんぎょうちょう",
    "nameEn": "Ningyouchou",
    "lat": 35.68611,
    "lng": 139.78178,
    "transfers": [
      "東京メトロ日比谷線"
    ],
    "address": "東京都人形町駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-15",
    "stationNumber": "A15",
    "lineId": "toei_asakusa",
    "number": 15,
    "name": "東日本橋",
    "nameKana": "ひがしにほんばし",
    "nameEn": "Higashinihombashi",
    "lat": 35.6913,
    "lng": 139.78471,
    "transfers": [],
    "address": "東京都東日本橋駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-16",
    "stationNumber": "A16",
    "lineId": "toei_asakusa",
    "number": 16,
    "name": "浅草橋",
    "nameKana": "あさくさばし",
    "nameEn": "Asakusabashi",
    "lat": 35.69834,
    "lng": 139.78693,
    "transfers": [
      "ＪＲ中央・総武線各駅停車"
    ],
    "address": "東京都浅草橋駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-17",
    "stationNumber": "A17",
    "lineId": "toei_asakusa",
    "number": 17,
    "name": "蔵前",
    "nameKana": "くらまえ",
    "nameEn": "Kuramae",
    "lat": 35.70356,
    "lng": 139.79135,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都蔵前駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-18",
    "stationNumber": "A18",
    "lineId": "toei_asakusa",
    "number": 18,
    "name": "浅草",
    "nameKana": "あさくさ",
    "nameEn": "Asakusa",
    "lat": 35.70849,
    "lng": 139.79594,
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ銀座線"
    ],
    "address": "東京都浅草駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-19",
    "stationNumber": "A19",
    "lineId": "toei_asakusa",
    "number": 19,
    "name": "本所吾妻橋",
    "nameKana": "ほんじょあづまばし",
    "nameEn": "Honjoazumabashi",
    "lat": 35.70859,
    "lng": 139.8043,
    "transfers": [],
    "address": "東京都本所吾妻橋駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "A-20",
    "stationNumber": "A20",
    "lineId": "toei_asakusa",
    "number": 20,
    "name": "押上",
    "nameKana": "おしあげ",
    "nameEn": "Oshiage",
    "lat": 35.7106266,
    "lng": 139.8131034,
    "transfers": [
      "東武スカイツリーライン",
      "京成押上線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都押上駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "limited_exp",
      "access_exp"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];