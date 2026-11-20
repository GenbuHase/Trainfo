import type { Station } from '../../../types';

export const TOEI_OEDO_STATIONS: Station[] = [
  {
    "id": "E-01",
    "stationNumber": "E01",
    "lineId": "toei_oedo",
    "number": 1,
    "name": "新宿西口",
    "nameKana": "しんじゅくにしぐち",
    "nameEn": "Shinjukunishiguchi",
    "lat": 35.6925,
    "lng": 139.69931,
    "transfers": [],
    "address": "東京都新宿西口駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-02",
    "stationNumber": "E02",
    "lineId": "toei_oedo",
    "number": 2,
    "name": "東新宿",
    "nameKana": "ひがししんじゅく",
    "nameEn": "Higashishinjuku",
    "lat": 35.698,
    "lng": 139.70686,
    "transfers": [
      "東京メトロ副都心線"
    ],
    "address": "東京都東新宿駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-03",
    "stationNumber": "E03",
    "lineId": "toei_oedo",
    "number": 3,
    "name": "若松河田",
    "nameKana": "わかまつかわだ",
    "nameEn": "Wakamatsukawada",
    "lat": 35.69893,
    "lng": 139.71743,
    "transfers": [],
    "address": "東京都若松河田駅",
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
    "id": "E-04",
    "stationNumber": "E04",
    "lineId": "toei_oedo",
    "number": 4,
    "name": "牛込柳町",
    "nameKana": "うしごめやなぎちょう",
    "nameEn": "Ushigomeyanagichou",
    "lat": 35.69952,
    "lng": 139.72439,
    "transfers": [],
    "address": "東京都牛込柳町駅",
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
    "id": "E-05",
    "stationNumber": "E05",
    "lineId": "toei_oedo",
    "number": 5,
    "name": "牛込神楽坂",
    "nameKana": "うしごめかぐらざか",
    "nameEn": "Ushigomekagurazaka",
    "lat": 35.70062,
    "lng": 139.73531,
    "transfers": [],
    "address": "東京都牛込神楽坂駅",
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
    "id": "E-06",
    "stationNumber": "E06",
    "lineId": "toei_oedo",
    "number": 6,
    "name": "飯田橋",
    "nameKana": "いいだばし",
    "nameEn": "Iidabashi",
    "lat": 35.70309,
    "lng": 139.74571,
    "transfers": [
      "ＪＲ中央・総武線各駅停車",
      "東京メトロ東西線",
      "東京メトロ有楽町線",
      "東京メトロ南北線"
    ],
    "address": "東京都飯田橋駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-07",
    "stationNumber": "E07",
    "lineId": "toei_oedo",
    "number": 7,
    "name": "春日",
    "nameKana": "かすが",
    "nameEn": "Kasuga",
    "lat": 35.7085,
    "lng": 139.75179,
    "transfers": [
      "都営地下鉄三田線"
    ],
    "address": "東京都春日駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-08",
    "stationNumber": "E08",
    "lineId": "toei_oedo",
    "number": 8,
    "name": "本郷三丁目",
    "nameKana": "ほんごうさんちょうめ",
    "nameEn": "Hongousanchoume",
    "lat": 35.70758,
    "lng": 139.76106,
    "transfers": [
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都本郷三丁目駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-09",
    "stationNumber": "E09",
    "lineId": "toei_oedo",
    "number": 9,
    "name": "上野御徒町",
    "nameKana": "うえのおかちまち",
    "nameEn": "Uenookachimachi",
    "lat": 35.70802,
    "lng": 139.77246,
    "transfers": [],
    "address": "東京都上野御徒町駅",
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
    "id": "E-10",
    "stationNumber": "E10",
    "lineId": "toei_oedo",
    "number": 10,
    "name": "新御徒町",
    "nameKana": "しんおかちまち",
    "nameEn": "Shinokachimachi",
    "lat": 35.707,
    "lng": 139.78191,
    "transfers": [
      "つくばエクスプレス"
    ],
    "address": "東京都新御徒町駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-11",
    "stationNumber": "E11",
    "lineId": "toei_oedo",
    "number": 11,
    "name": "蔵前",
    "nameKana": "くらまえ",
    "nameEn": "Kuramae",
    "lat": 35.70552,
    "lng": 139.79223,
    "transfers": [
      "都営地下鉄浅草線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-12",
    "stationNumber": "E12",
    "lineId": "toei_oedo",
    "number": 12,
    "name": "両国",
    "nameKana": "りょうごく",
    "nameEn": "Ryougoku",
    "lat": 35.69692,
    "lng": 139.79742,
    "transfers": [],
    "address": "東京都両国駅",
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
    "id": "E-13",
    "stationNumber": "E13",
    "lineId": "toei_oedo",
    "number": 13,
    "name": "森下",
    "nameKana": "もりした",
    "nameEn": "Morishita",
    "lat": 35.68805,
    "lng": 139.79818,
    "transfers": [
      "都営地下鉄新宿線"
    ],
    "address": "東京都森下駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-14",
    "stationNumber": "E14",
    "lineId": "toei_oedo",
    "number": 14,
    "name": "清澄白河",
    "nameKana": "きよすみしらかわ",
    "nameEn": "Kiyosumishirakawa",
    "lat": 35.68322,
    "lng": 139.79862,
    "transfers": [
      "東京メトロ半蔵門線"
    ],
    "address": "東京都清澄白河駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-15",
    "stationNumber": "E15",
    "lineId": "toei_oedo",
    "number": 15,
    "name": "門前仲町",
    "nameKana": "もんぜんなかちょう",
    "nameEn": "Monzennakachou",
    "lat": 35.67273,
    "lng": 139.79511,
    "transfers": [
      "東京メトロ東西線"
    ],
    "address": "東京都門前仲町駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-16",
    "stationNumber": "E16",
    "lineId": "toei_oedo",
    "number": 16,
    "name": "月島",
    "nameKana": "つきしま",
    "nameEn": "Tsukishima",
    "lat": 35.66351,
    "lng": 139.78356,
    "transfers": [
      "東京メトロ有楽町線"
    ],
    "address": "東京都月島駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-17",
    "stationNumber": "E17",
    "lineId": "toei_oedo",
    "number": 17,
    "name": "勝どき",
    "nameKana": "かちどき",
    "nameEn": "Kachidoki",
    "lat": 35.65865,
    "lng": 139.77671,
    "transfers": [],
    "address": "東京都勝どき駅",
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
    "id": "E-18",
    "stationNumber": "E18",
    "lineId": "toei_oedo",
    "number": 18,
    "name": "築地市場",
    "nameKana": "つきじしじょう",
    "nameEn": "Tsukijishijou",
    "lat": 35.6653,
    "lng": 139.76632,
    "transfers": [],
    "address": "東京都築地市場駅",
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
    "id": "E-19",
    "stationNumber": "E19",
    "lineId": "toei_oedo",
    "number": 19,
    "name": "汐留",
    "nameKana": "しおどめ",
    "nameEn": "Shiodome",
    "lat": 35.66443,
    "lng": 139.76088,
    "transfers": [
      "ゆりかもめ"
    ],
    "address": "東京都汐留駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-20",
    "stationNumber": "E20",
    "lineId": "toei_oedo",
    "number": 20,
    "name": "大門",
    "nameKana": "だいもん",
    "nameEn": "Daimon",
    "lat": 35.65664,
    "lng": 139.75617,
    "transfers": [
      "都営地下鉄浅草線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-21",
    "stationNumber": "E21",
    "lineId": "toei_oedo",
    "number": 21,
    "name": "赤羽橋",
    "nameKana": "あかばねばし",
    "nameEn": "Akabanebashi",
    "lat": 35.65489,
    "lng": 139.74497,
    "transfers": [],
    "address": "東京都赤羽橋駅",
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
    "id": "E-22",
    "stationNumber": "E22",
    "lineId": "toei_oedo",
    "number": 22,
    "name": "麻布十番",
    "nameKana": "あざぶじゅうばん",
    "nameEn": "Azabujuuban",
    "lat": 35.65633,
    "lng": 139.73682,
    "transfers": [
      "東京メトロ南北線"
    ],
    "address": "東京都麻布十番駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-23",
    "stationNumber": "E23",
    "lineId": "toei_oedo",
    "number": 23,
    "name": "六本木",
    "nameKana": "ろっぽんぎ",
    "nameEn": "Roppongi",
    "lat": 35.66365,
    "lng": 139.73179,
    "transfers": [
      "東京メトロ日比谷線"
    ],
    "address": "東京都六本木駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-24",
    "stationNumber": "E24",
    "lineId": "toei_oedo",
    "number": 24,
    "name": "青山一丁目",
    "nameKana": "あおやまいっちょうめ",
    "nameEn": "Aoyamaitchoume",
    "lat": 35.67276,
    "lng": 139.72406,
    "transfers": [
      "東京メトロ銀座線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都青山一丁目駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-25",
    "stationNumber": "E25",
    "lineId": "toei_oedo",
    "number": 25,
    "name": "国立競技場",
    "nameKana": "こくりつきょうぎじょう",
    "nameEn": "Kokuritsukyougijou",
    "lat": 35.67997,
    "lng": 139.71441,
    "transfers": [],
    "address": "東京都国立競技場駅",
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
    "id": "E-26",
    "stationNumber": "E26",
    "lineId": "toei_oedo",
    "number": 26,
    "name": "代々木",
    "nameKana": "よよぎ",
    "nameEn": "Yoyogi",
    "lat": 35.68456,
    "lng": 139.70131,
    "transfers": [
      "ＪＲ中央・総武線各駅停車",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り"
    ],
    "address": "東京都代々木駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-27",
    "stationNumber": "E27",
    "lineId": "toei_oedo",
    "number": 27,
    "name": "新宿",
    "nameKana": "しんじゅく",
    "nameEn": "Shinjuku",
    "lat": 35.68809,
    "lng": 139.69918,
    "transfers": [
      "ＪＲ湘南新宿ライン",
      "ＪＲ埼京線",
      "ＪＲ中央線快速",
      "ＪＲ中央・総武線各駅停車",
      "ＪＲ山手線外回り",
      "ＪＲ山手線内回り",
      "京王線",
      "京王新線",
      "小田急小田原線",
      "都営地下鉄新宿線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-28",
    "stationNumber": "E28",
    "lineId": "toei_oedo",
    "number": 28,
    "name": "都庁前",
    "nameKana": "とちょうまえ",
    "nameEn": "Tochoumae",
    "lat": 35.69045,
    "lng": 139.6918,
    "transfers": [],
    "address": "東京都都庁前駅",
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
    "id": "E-29",
    "stationNumber": "E29",
    "lineId": "toei_oedo",
    "number": 29,
    "name": "西新宿五丁目",
    "nameKana": "にししんじゅくごちょうめ",
    "nameEn": "Nishishinjukugochoume",
    "lat": 35.6896,
    "lng": 139.68398,
    "transfers": [],
    "address": "東京都西新宿五丁目駅",
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
    "id": "E-30",
    "stationNumber": "E30",
    "lineId": "toei_oedo",
    "number": 30,
    "name": "中野坂上",
    "nameKana": "なかのさかうえ",
    "nameEn": "Nakanosakaue",
    "lat": 35.69858,
    "lng": 139.68299,
    "transfers": [
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都中野坂上駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-31",
    "stationNumber": "E31",
    "lineId": "toei_oedo",
    "number": 31,
    "name": "東中野",
    "nameKana": "ひがしなかの",
    "nameEn": "Higashinakano",
    "lat": 35.70802,
    "lng": 139.68354,
    "transfers": [
      "ＪＲ中央・総武線各駅停車"
    ],
    "address": "東京都東中野駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-32",
    "stationNumber": "E32",
    "lineId": "toei_oedo",
    "number": 32,
    "name": "中井",
    "nameKana": "なかい",
    "nameEn": "Nakai",
    "lat": 35.71452,
    "lng": 139.68662,
    "transfers": [
      "西武新宿線"
    ],
    "address": "東京都中井駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-33",
    "stationNumber": "E33",
    "lineId": "toei_oedo",
    "number": 33,
    "name": "落合南長崎",
    "nameKana": "おちあいみなみながさき",
    "nameEn": "Ochiaiminaminagasaki",
    "lat": 35.72368,
    "lng": 139.6833,
    "transfers": [],
    "address": "東京都落合南長崎駅",
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
    "id": "E-34",
    "stationNumber": "E34",
    "lineId": "toei_oedo",
    "number": 34,
    "name": "新江古田",
    "nameKana": "しんえごた",
    "nameEn": "Shinegota",
    "lat": 35.73249,
    "lng": 139.67057,
    "transfers": [],
    "address": "東京都新江古田駅",
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
    "id": "E-35",
    "stationNumber": "E35",
    "lineId": "toei_oedo",
    "number": 35,
    "name": "練馬",
    "nameKana": "ねりま",
    "nameEn": "Nerima",
    "lat": 35.73715,
    "lng": 139.65363,
    "transfers": [
      "西武池袋線",
      "西武有楽町線",
      "西武豊島線"
    ],
    "address": "東京都練馬駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "E-36",
    "stationNumber": "E36",
    "lineId": "toei_oedo",
    "number": 36,
    "name": "豊島園",
    "nameKana": "としまえん",
    "nameEn": "Toshimaen",
    "lat": 35.74248,
    "lng": 139.64923,
    "transfers": [],
    "address": "東京都豊島園駅",
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
    "id": "E-37",
    "stationNumber": "E37",
    "lineId": "toei_oedo",
    "number": 37,
    "name": "練馬春日町",
    "nameKana": "ねりまかすがちょう",
    "nameEn": "Nerimakasugachou",
    "lat": 35.75164,
    "lng": 139.63991,
    "transfers": [],
    "address": "東京都練馬春日町駅",
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
    "id": "E-38",
    "stationNumber": "E38",
    "lineId": "toei_oedo",
    "number": 38,
    "name": "光が丘",
    "nameKana": "ひかりがおか",
    "nameEn": "Hikarigaoka",
    "lat": 35.75846,
    "lng": 139.62851,
    "transfers": [],
    "address": "東京都光が丘駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
