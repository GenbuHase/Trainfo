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
    "lat": 35.5879391,
    "lng": 139.7067721,
    "transfers": [],
    "address": "東京都大田区南馬込五丁目",
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
    "lat": 35.5962033,
    "lng": 139.7118599,
    "transfers": [],
    "address": "東京都大田区東馬込一丁目",
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
    "isMajor": false,
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
    "lat": 35.6059195,
    "lng": 139.7138293,
    "transfers": [
      "東急大井町線"
    ],
    "address": "東京都品川区豊町六丁目",
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
    "lat": 35.6151072,
    "lng": 139.71665,
    "transfers": [],
    "address": "東京都品川区戸越三丁目",
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
    "isMajor": false,
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
    "lat": 35.6274403,
    "lng": 139.724878,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "東急池上線"
    ],
    "address": "東京都品川区東五反田五丁目",
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
    "lat": 35.631498,
    "lng": 139.7301927,
    "transfers": [],
    "address": "東京都港区高輪三丁目",
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
    "isMajor": false,
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
    "lat": 35.6387951,
    "lng": 139.7400941,
    "transfers": [
      "京急本線"
    ],
    "address": "東京都港区高輪二丁目",
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
    "lat": 35.6477575,
    "lng": 139.7491418,
    "transfers": [
      "都営地下鉄三田線"
    ],
    "address": "東京都港区芝四丁目",
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
    "lat": 35.6567767,
    "lng": 139.7547117,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都港区芝大門二丁目",
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
    "lat": 35.6651388,
    "lng": 139.7592021,
    "transfers": [
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "ＪＲ京浜東北線",
      "ＪＲ横須賀線",
      "ＪＲ東海道本線",
      "東京メトロ銀座線",
      "ゆりかもめ"
    ],
    "address": "東京都港区新橋二丁目",
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
    "lat": 35.6697648,
    "lng": 139.7673597,
    "transfers": [
      "東京メトロ日比谷線"
    ],
    "address": "東京都中央区銀座四丁目12-15",
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
    "isMajor": false,
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
    "lat": 35.6757899,
    "lng": 139.7721257,
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
    "isMajor": false,
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
    "lat": 35.6815753,
    "lng": 139.7756769,
    "transfers": [
      "東京メトロ銀座線",
      "東京メトロ東西線"
    ],
    "address": "東京都中央区日本橋一丁目3-11",
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
    "lat": 35.6860481,
    "lng": 139.7818243,
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
    "isMajor": false,
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
    "lat": 35.6912923,
    "lng": 139.7847992,
    "transfers": [],
    "address": "東京都中央区東日本橋二丁目",
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
    "isMajor": false,
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
    "lat": 35.6983153,
    "lng": 139.7870001,
    "transfers": [
      "ＪＲ中央・総武線各駅停車"
    ],
    "address": "東京都台東区柳橋一丁目",
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
    "lat": 35.7035435,
    "lng": 139.7913704,
    "transfers": [
      "都営地下鉄大江戸線"
    ],
    "address": "東京都台東区蔵前二丁目",
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
    "isMajor": false,
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
    "lat": 35.7084863,
    "lng": 139.7959449,
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ銀座線"
    ],
    "address": "東京都台東区花川戸一丁目4-1",
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
    "lat": 35.7085396,
    "lng": 139.8043035,
    "transfers": [],
    "address": "東京都墨田区吾妻橋二丁目",
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
    "isMajor": false,
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
    "lat": 35.7107383,
    "lng": 139.8130503,
    "transfers": [
      "東武スカイツリーライン",
      "京成押上線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都墨田区押上一丁目10-2",
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
