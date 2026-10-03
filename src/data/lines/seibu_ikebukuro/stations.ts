import type { Station } from '../../../types';

export const SEIBU_IKEBUKURO_STATIONS: Station[] = [
  {
    "id": "SI-01",
    "lineId": "seibu_ikebukuro",
    "number": 1,
    "name": "池袋",
    "nameKana": "いけぶくろ",
    "nameEn": "Ikebukuro",
    "lat": 35.728041,
    "lng": 139.711082,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "東武東上線",
      "東京メトロ丸ノ内線",
      "東京メトロ有楽町線",
      "東京メトロ副都心線"
    ],
    "address": "東京都豊島区南池袋一丁目28-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "limitedExp",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1-7番線",
      "outbound": "1-7番線"
    }
  },
  {
    "id": "SI-02",
    "lineId": "seibu_ikebukuro",
    "number": 2,
    "name": "椎名町",
    "nameKana": "しいなまち",
    "nameEn": "Shiinamachi",
    "lat": 35.726476,
    "lng": 139.694899,
    "transfers": [],
    "address": "東京都豊島区長崎一丁目1-22",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-03",
    "lineId": "seibu_ikebukuro",
    "number": 3,
    "name": "東長崎",
    "nameKana": "ひがシナがさき",
    "nameEn": "Higashi-Nagasaki",
    "lat": 35.730332,
    "lng": 139.682923,
    "transfers": [],
    "address": "東京都豊島区南長崎五丁目33-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-04",
    "lineId": "seibu_ikebukuro",
    "number": 4,
    "name": "江古田",
    "nameKana": "えこだ",
    "nameEn": "Ekoda",
    "lat": 35.737602,
    "lng": 139.67275,
    "transfers": [],
    "address": "東京都練馬区旭丘一丁目78-7",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-05",
    "lineId": "seibu_ikebukuro",
    "number": 5,
    "name": "桜台",
    "nameKana": "さくらだい",
    "nameEn": "Sakuradai",
    "lat": 35.738812,
    "lng": 139.662426,
    "transfers": [],
    "address": "東京都練馬区桜台一丁目5-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-06",
    "lineId": "seibu_ikebukuro",
    "number": 6,
    "name": "練馬",
    "nameKana": "ねりま",
    "nameEn": "Nerima",
    "lat": 35.737871,
    "lng": 139.654113,
    "transfers": [
      "西武有楽町線",
      "西武豊島線",
      "都営大江戸線"
    ],
    "address": "東京都練馬区練馬一丁目3-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "strain",
      "rapidExp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-07",
    "lineId": "seibu_ikebukuro",
    "number": 7,
    "name": "中村橋",
    "nameKana": "なかむらばし",
    "nameEn": "Nakamurabashi",
    "lat": 35.736859,
    "lng": 139.63779,
    "transfers": [],
    "address": "東京都練馬区中村北四丁目2-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-08",
    "lineId": "seibu_ikebukuro",
    "number": 8,
    "name": "富士見台",
    "nameKana": "ふじみだい",
    "nameEn": "Fujimidai",
    "lat": 35.735977,
    "lng": 139.629726,
    "transfers": [],
    "address": "東京都中野区上鷺宮三丁目15-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-09",
    "lineId": "seibu_ikebukuro",
    "number": 9,
    "name": "練馬高野台",
    "nameKana": "ねりまたかのだい",
    "nameEn": "Nerima-Takanodai",
    "lat": 35.740976,
    "lng": 139.616332,
    "transfers": [],
    "address": "東京都練馬区高野台一丁目7-27",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-10",
    "lineId": "seibu_ikebukuro",
    "number": 10,
    "name": "石神井公園",
    "nameKana": "しゃくじいこうえん",
    "nameEn": "Shakujii-koen",
    "lat": 35.743845,
    "lng": 139.606166,
    "transfers": [],
    "address": "東京都練馬区石神井町三丁目23-15",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "strain",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-11",
    "lineId": "seibu_ikebukuro",
    "number": 11,
    "name": "大泉学園",
    "nameKana": "おおいずみがくえん",
    "nameEn": "Oizumi-gakuen",
    "lat": 35.749557,
    "lng": 139.586635,
    "transfers": [],
    "address": "東京都練馬区東大泉一丁目29-7",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-12",
    "lineId": "seibu_ikebukuro",
    "number": 12,
    "name": "保谷",
    "nameKana": "ほうや",
    "nameEn": "Hoya",
    "lat": 35.748366,
    "lng": 139.567794,
    "transfers": [],
    "address": "東京都西東京市東町三丁目14-30",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "strain",
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3番線"
    }
  },
  {
    "id": "SI-13",
    "lineId": "seibu_ikebukuro",
    "number": 13,
    "name": "ひばりヶ丘",
    "nameKana": "ひばりがおか",
    "nameEn": "Hibarigaoka",
    "lat": 35.75113,
    "lng": 139.546698,
    "transfers": [],
    "address": "東京都西東京市住吉町三丁目9-19",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "express",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-14",
    "lineId": "seibu_ikebukuro",
    "number": 14,
    "name": "東久留米",
    "nameKana": "ひがしくるめ",
    "nameEn": "Higashi-Kurume",
    "lat": 35.760265,
    "lng": 139.534047,
    "transfers": [],
    "address": "東京都東久留米市東本町1-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-15",
    "lineId": "seibu_ikebukuro",
    "number": 15,
    "name": "清瀬",
    "nameKana": "きよせ",
    "nameEn": "Kiyose",
    "lat": 35.772006,
    "lng": 139.520014,
    "transfers": [],
    "address": "東京都清瀬市元町一丁目2-4",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-16",
    "lineId": "seibu_ikebukuro",
    "number": 16,
    "name": "秋津",
    "nameKana": "あきつ",
    "nameEn": "Akitsu",
    "lat": 35.778761,
    "lng": 139.49571,
    "transfers": [
      "JR武蔵野線 (新秋津駅)"
    ],
    "address": "東京都東村山市秋津町五丁目7-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-17",
    "lineId": "seibu_ikebukuro",
    "number": 17,
    "name": "所沢",
    "nameKana": "ところざわ",
    "nameEn": "Tokorozawa",
    "lat": 35.787302,
    "lng": 139.473486,
    "transfers": [
      "西武新宿線"
    ],
    "address": "埼玉県所沢市くすのき台一丁目14-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "limitedExp",
      "strain",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4・5番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "SI-18",
    "lineId": "seibu_ikebukuro",
    "number": 18,
    "name": "西所沢",
    "nameKana": "にしところざわ",
    "nameEn": "Nishi-Tokorozawa",
    "lat": 35.789064,
    "lng": 139.456073,
    "transfers": [
      "西武狭山線"
    ],
    "address": "埼玉県所沢市西所沢一丁目11-9",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "strain",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-19",
    "lineId": "seibu_ikebukuro",
    "number": 19,
    "name": "小手指",
    "nameKana": "こてさし",
    "nameEn": "Kotesashi",
    "lat": 35.800559,
    "lng": 139.437817,
    "transfers": [],
    "address": "埼玉県所沢市小手指町一丁目8-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "strain",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "commuter_semi",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "SI-20",
    "lineId": "seibu_ikebukuro",
    "number": 20,
    "name": "狭山ヶ丘",
    "nameKana": "さやまがおか",
    "nameEn": "Sayamagaoka",
    "lat": 35.810473,
    "lng": 139.416774,
    "transfers": [],
    "address": "埼玉県所沢市狭山ヶ丘一丁目299-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-21",
    "lineId": "seibu_ikebukuro",
    "number": 21,
    "name": "武蔵藤沢",
    "nameKana": "むさしふじさわ",
    "nameEn": "Musashi-Fujisawa",
    "lat": 35.821227,
    "lng": 139.4126,
    "transfers": [],
    "address": "埼玉県入間市下藤沢494-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-22",
    "lineId": "seibu_ikebukuro",
    "number": 22,
    "name": "稲荷山公園",
    "nameKana": "いなりやまこうえん",
    "nameEn": "Inariyama-koen",
    "lat": 35.844863,
    "lng": 139.398771,
    "transfers": [],
    "address": "埼玉県狭山市稲荷山一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-23",
    "lineId": "seibu_ikebukuro",
    "number": 23,
    "name": "入間市",
    "nameKana": "いるまし",
    "nameEn": "Irumashi",
    "lat": 35.842796,
    "lng": 139.39015,
    "transfers": [],
    "address": "埼玉県入間市河原町2-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "limitedExp",
      "strain",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2・3番線",
      "outbound": "4・5番線"
    }
  },
  {
    "id": "SI-24",
    "lineId": "seibu_ikebukuro",
    "number": 24,
    "name": "仏子",
    "nameKana": "ぶし",
    "nameEn": "Bushi",
    "lat": 35.837657,
    "lng": 139.360069,
    "transfers": [],
    "address": "埼玉県入間市仏子883-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2・3番線"
    }
  },
  {
    "id": "SI-25",
    "lineId": "seibu_ikebukuro",
    "number": 25,
    "name": "元加治",
    "nameKana": "もとかじ",
    "nameEn": "Motokaji",
    "lat": 35.840377,
    "lng": 139.345596,
    "transfers": [],
    "address": "埼玉県入間市野田2041-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-26",
    "lineId": "seibu_ikebukuro",
    "number": 26,
    "name": "飯能",
    "nameKana": "はんのう",
    "nameEn": "Hanno",
    "lat": 35.851129,
    "lng": 139.318876,
    "transfers": [],
    "address": "埼玉県飯能市仲町11-21",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "limitedExp",
      "strain",
      "rapidExp",
      "express",
      "commuter_exp",
      "rapid",
      "semiExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1-4番線",
      "outbound": "1-4番線"
    }
  },
  {
    "id": "SI-27",
    "lineId": "seibu_ikebukuro",
    "number": 27,
    "name": "東飯能",
    "nameKana": "ひがしはんのう",
    "nameEn": "Higashi-Hanno",
    "lat": 35.852874,
    "lng": 139.325937,
    "transfers": [
      "JR八高線"
    ],
    "address": "埼玉県飯能市東町1-6",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "2番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-28",
    "lineId": "seibu_ikebukuro",
    "number": 28,
    "name": "高麗",
    "nameKana": "こま",
    "nameEn": "Koma",
    "lat": 35.88211,
    "lng": 139.304291,
    "transfers": [],
    "address": "埼玉県日高市武蔵台一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-29",
    "lineId": "seibu_ikebukuro",
    "number": 29,
    "name": "武蔵横手",
    "nameKana": "むさしよこて",
    "nameEn": "Musashi-Yokote",
    "lat": 35.884882,
    "lng": 139.28114,
    "transfers": [],
    "address": "埼玉県日高市横手636",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-30",
    "lineId": "seibu_ikebukuro",
    "number": 30,
    "name": "東吾野",
    "nameKana": "ひがしあがの",
    "nameEn": "Higashi-Agano",
    "lat": 35.892337,
    "lng": 139.26032,
    "transfers": [],
    "address": "埼玉県飯能市平戸282",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-31",
    "lineId": "seibu_ikebukuro",
    "number": 31,
    "name": "吾野",
    "nameKana": "あがの",
    "nameEn": "Agano",
    "lat": 35.908259,
    "lng": 139.225957,
    "transfers": [],
    "address": "埼玉県飯能市坂石町分324-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-32",
    "lineId": "seibu_ikebukuro",
    "number": 32,
    "name": "西吾野",
    "nameKana": "にしあがの",
    "nameEn": "Nishi-Agano",
    "lat": 35.92689,
    "lng": 139.202398,
    "transfers": [],
    "address": "埼玉県飯能市南川105-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-33",
    "lineId": "seibu_ikebukuro",
    "number": 33,
    "name": "正丸",
    "nameKana": "しょうまる",
    "nameEn": "Shomaru",
    "lat": 35.938431,
    "lng": 139.18152,
    "transfers": [],
    "address": "埼玉県飯能市南川1055-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-34",
    "lineId": "seibu_ikebukuro",
    "number": 34,
    "name": "芦ヶ久保",
    "nameKana": "あしがくぼ",
    "nameEn": "Ashigakubo",
    "lat": 35.976504,
    "lng": 139.136537,
    "transfers": [],
    "address": "埼玉県秩父郡横瀬町芦ヶ久保1911",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-35",
    "lineId": "seibu_ikebukuro",
    "number": 35,
    "name": "横瀬",
    "nameKana": "よこぜ",
    "nameEn": "Yokoze",
    "lat": 35.984956,
    "lng": 139.097976,
    "transfers": [],
    "address": "埼玉県秩父郡横瀬町横瀬4067",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "limitedExp",
      "rapidExp",
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "SI-36",
    "lineId": "seibu_ikebukuro",
    "number": 36,
    "name": "西武秩父",
    "nameKana": "せいぶちちぶ",
    "nameEn": "Seibu-Chichibu",
    "lat": 35.990178,
    "lng": 139.082991,
    "transfers": [
      "秩父鉄道 (御花畑駅)"
    ],
    "address": "埼玉県秩父市野坂町一丁目16-15",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "limitedExp",
      "strain",
      "rapidExp",
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1-3番線",
      "outbound": "1-3番線"
    }
  }
];
