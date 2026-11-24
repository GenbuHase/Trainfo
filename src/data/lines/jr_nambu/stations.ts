import type { Station } from '../../../types';

export const NAMBU_STATIONS: Station[] = [
  {
    "id": "JN-01",
    "lineId": "jr_nambu",
    "number": 1,
    "name": "川崎",
    "nameKana": "かわさき",
    "nameEn": "Kawasaki",
    "lat": 35.531333,
    "lng": 139.696894,
    "transfers": [
      "JR東海道線",
      "JR京浜東北線",
      "京急本線",
      "京急大師線"
    ],
    "address": "神奈川県川崎市川崎区駅前本町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-01",
    "isMajor": true
  },
  {
    "id": "JN-02",
    "lineId": "jr_nambu",
    "number": 2,
    "name": "尻手",
    "nameKana": "しって",
    "nameEn": "Shitte",
    "lat": 35.53158,
    "lng": 139.68401,
    "transfers": [],
    "address": "神奈川県川崎市幸区南幸町三丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "stationNumber": "JN-02"
  },
  {
    "id": "JN-03",
    "lineId": "jr_nambu",
    "number": 3,
    "name": "矢向",
    "nameKana": "やこう",
    "nameEn": "Yako",
    "lat": 35.53996,
    "lng": 139.68017,
    "transfers": [],
    "address": "神奈川県川崎市幸区塚越四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-03"
  },
  {
    "id": "JN-04",
    "lineId": "jr_nambu",
    "number": 4,
    "name": "鹿島田",
    "nameKana": "かしまだ",
    "nameEn": "Kashimada",
    "lat": 35.55183,
    "lng": 139.67481,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン"
    ],
    "address": "神奈川県川崎市幸区鹿島田一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-04",
    "isMajor": false
  },
  {
    "id": "JN-05",
    "lineId": "jr_nambu",
    "number": 5,
    "name": "平間",
    "nameKana": "ひらま",
    "nameEn": "Hirama",
    "lat": 35.56098,
    "lng": 139.67094,
    "transfers": [],
    "address": "神奈川県川崎市中原区田尻町",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-05"
  },
  {
    "id": "JN-06",
    "lineId": "jr_nambu",
    "number": 6,
    "name": "向河原",
    "nameKana": "むかいがわら",
    "nameEn": "Mukaigawara",
    "lat": 35.57271,
    "lng": 139.66714,
    "transfers": [],
    "address": "神奈川県川崎市中原区下沼部",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-06"
  },
  {
    "id": "JN-07",
    "lineId": "jr_nambu",
    "number": 7,
    "name": "武蔵小杉",
    "nameKana": "むさしこすぎ",
    "nameEn": "Musashi-Kosugi",
    "lat": 35.5744653,
    "lng": 139.6633332,
    "transfers": [
      "JR横須賀線",
      "JR湘南新宿ライン",
      "相鉄・JR直通線",
      "東急東横線",
      "東急目黒線"
    ],
    "address": "神奈川県川崎市中原区小杉町三丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-07",
    "isMajor": true
  },
  {
    "id": "JN-08",
    "lineId": "jr_nambu",
    "number": 8,
    "name": "武蔵中原",
    "nameKana": "むさしなかはら",
    "nameEn": "Musashi-Nakahara",
    "lat": 35.58094,
    "lng": 139.64144,
    "transfers": [],
    "address": "神奈川県川崎市中原区上小田中四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "stationNumber": "JN-08"
  },
  {
    "id": "JN-09",
    "lineId": "jr_nambu",
    "number": 9,
    "name": "武蔵新城",
    "nameKana": "むさししんじょう",
    "nameEn": "Musashi-Shinjo",
    "lat": 35.58688,
    "lng": 139.63035,
    "transfers": [],
    "address": "神奈川県川崎市中原区上新城二丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "stationNumber": "JN-09"
  },
  {
    "id": "JN-10",
    "lineId": "jr_nambu",
    "number": 10,
    "name": "武蔵溝ノ口",
    "nameKana": "むさしみぞのくち",
    "nameEn": "Musashi-Mizonokuchi",
    "lat": 35.59818,
    "lng": 139.6122,
    "transfers": [
      "東急田園都市線",
      "東急大井町線"
    ],
    "address": "神奈川県川崎市高津区久本一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-10",
    "isMajor": true
  },
  {
    "id": "JN-11",
    "lineId": "jr_nambu",
    "number": 11,
    "name": "津田山",
    "nameKana": "つだやま",
    "nameEn": "Tsudayama",
    "lat": 35.60328,
    "lng": 139.60136,
    "transfers": [],
    "address": "神奈川県川崎市高津区下作延六丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-11"
  },
  {
    "id": "JN-12",
    "lineId": "jr_nambu",
    "number": 12,
    "name": "久地",
    "nameKana": "くじ",
    "nameEn": "Kuji",
    "lat": 35.60967,
    "lng": 139.59383,
    "transfers": [],
    "address": "神奈川県川崎市高津区久地四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-12"
  },
  {
    "id": "JN-13",
    "lineId": "jr_nambu",
    "number": 13,
    "name": "宿河原",
    "nameKana": "しゅくがわら",
    "nameEn": "Shukugawara",
    "lat": 35.61515,
    "lng": 139.58022,
    "transfers": [],
    "address": "神奈川県川崎市多摩区宿河原四丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-13"
  },
  {
    "id": "JN-14",
    "lineId": "jr_nambu",
    "number": 14,
    "name": "登戸",
    "nameKana": "のぼりと",
    "nameEn": "Noborito",
    "lat": 35.62035,
    "lng": 139.57105,
    "transfers": [
      "小田急小田原線"
    ],
    "address": "神奈川県川崎市多摩区登戸3435",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-14",
    "isMajor": true
  },
  {
    "id": "JN-15",
    "lineId": "jr_nambu",
    "number": 15,
    "name": "中野島",
    "nameKana": "なかのしま",
    "nameEn": "Nakanoshima",
    "lat": 35.62989,
    "lng": 139.5517,
    "transfers": [],
    "address": "神奈川県川崎市多摩区中野島六丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-15"
  },
  {
    "id": "JN-16",
    "lineId": "jr_nambu",
    "number": 16,
    "name": "稲田堤",
    "nameKana": "いなだづつみ",
    "nameEn": "Inadazutsumi",
    "lat": 35.63322,
    "lng": 139.53675,
    "transfers": [
      "京王相模原線"
    ],
    "address": "神奈川県川崎市多摩区菅稲田堤一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-16",
    "isMajor": true
  },
  {
    "id": "JN-17",
    "lineId": "jr_nambu",
    "number": 17,
    "name": "矢野口",
    "nameKana": "やのくち",
    "nameEn": "Yanokuchi",
    "lat": 35.6414,
    "lng": 139.52103,
    "transfers": [],
    "address": "東京都稲城市矢野口",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-17"
  },
  {
    "id": "JN-18",
    "lineId": "jr_nambu",
    "number": 18,
    "name": "稲城長沼",
    "nameKana": "いなぎながぬま",
    "nameEn": "Inagi-Naganuma",
    "lat": 35.64394,
    "lng": 139.50338,
    "transfers": [],
    "address": "東京都稲城市東長沼",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": false,
    "stationNumber": "JN-18"
  },
  {
    "id": "JN-19",
    "lineId": "jr_nambu",
    "number": 19,
    "name": "南多摩",
    "nameKana": "みなみたま",
    "nameEn": "Minami-Tama",
    "lat": 35.64918,
    "lng": 139.4891,
    "transfers": [],
    "address": "東京都稲城市大丸",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-19"
  },
  {
    "id": "JN-20",
    "lineId": "jr_nambu",
    "number": 20,
    "name": "府中本町",
    "nameKana": "ふちゅうほんまち",
    "nameEn": "Fuchuhommachi",
    "lat": 35.666195,
    "lng": 139.477041,
    "transfers": [
      "JR武蔵野線"
    ],
    "address": "東京都府中市本町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-20",
    "isMajor": true
  },
  {
    "id": "JN-21",
    "lineId": "jr_nambu",
    "number": 21,
    "name": "分倍河原",
    "nameKana": "ぶばいがわら",
    "nameEn": "Bubaigawara",
    "lat": 35.66851,
    "lng": 139.46948,
    "transfers": [
      "京王線"
    ],
    "address": "東京都府中市片町二丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "stationNumber": "JN-21",
    "isMajor": true
  },
  {
    "id": "JN-22",
    "lineId": "jr_nambu",
    "number": 22,
    "name": "西府",
    "nameKana": "にしふ",
    "nameEn": "Nishifu",
    "lat": 35.67078,
    "lng": 139.45762,
    "transfers": [],
    "address": "東京都府中市本宿町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-22"
  },
  {
    "id": "JN-23",
    "lineId": "jr_nambu",
    "number": 23,
    "name": "谷保",
    "nameKana": "やほ",
    "nameEn": "Yaho",
    "lat": 35.68111,
    "lng": 139.44752,
    "transfers": [],
    "address": "東京都国立市谷保",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-23"
  },
  {
    "id": "JN-24",
    "lineId": "jr_nambu",
    "number": 24,
    "name": "矢川",
    "nameKana": "やがわ",
    "nameEn": "Yagawa",
    "lat": 35.68499,
    "lng": 139.4322,
    "transfers": [],
    "address": "東京都国立市石田",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-24"
  },
  {
    "id": "JN-25",
    "lineId": "jr_nambu",
    "number": 25,
    "name": "西国立",
    "nameKana": "にしくにたち",
    "nameEn": "Nishi-Kunitachi",
    "lat": 35.69331,
    "lng": 139.42405,
    "transfers": [],
    "address": "東京都立川市錦町一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-25"
  },
  {
    "id": "JN-26",
    "lineId": "jr_nambu",
    "number": 26,
    "name": "立川",
    "nameKana": "たちかわ",
    "nameEn": "Tachikawa",
    "lat": 35.697956,
    "lng": 139.413704,
    "transfers": [
      "JR中央線",
      "JR中央本線",
      "JR青梅線",
      "多摩都市モノレール"
    ],
    "address": "東京都立川市曙町二丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "limited_exp"
    ],
    "stationNumber": "JN-26",
    "isMajor": true
  },
  {
    "id": "JN-51",
    "lineId": "jr_nambu",
    "number": 27,
    "name": "八丁畷",
    "nameKana": "はっちょうなわて",
    "nameEn": "Hatchonawate",
    "lat": 35.52323,
    "lng": 139.69099,
    "transfers": [
      "京急本線"
    ],
    "address": "神奈川県川崎市川崎区下並木",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-51"
  },
  {
    "id": "JN-52",
    "lineId": "jr_nambu",
    "number": 28,
    "name": "川崎新町",
    "nameKana": "かわさきしんまち",
    "nameEn": "Kawasaki-Shimmachi",
    "lat": 35.51859,
    "lng": 139.69886,
    "transfers": [],
    "address": "神奈川県川崎市川崎区渡田新町三丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-52"
  },
  {
    "id": "JN-53",
    "lineId": "jr_nambu",
    "number": 29,
    "name": "小田栄",
    "nameKana": "おださかえ",
    "nameEn": "Odasakae",
    "lat": 35.51486348,
    "lng": 139.70441782,
    "transfers": [],
    "address": "神奈川県川崎市川崎区小田栄一丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "stationNumber": "JN-53"
  },
  {
    "id": "JN-54",
    "lineId": "jr_nambu",
    "number": 30,
    "name": "浜川崎",
    "nameKana": "はまかわさき",
    "nameEn": "Hama-Kawasaki",
    "lat": 35.51045,
    "lng": 139.71343,
    "transfers": [
      "JR鶴見線"
    ],
    "address": "神奈川県川崎市川崎区鋼管通五丁目",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "platforms": {
      "inbound": "1",
      "outbound": "2"
    },
    "stoppingTypes": [
      "local"
    ],
    "stationNumber": "JN-54",
    "isMajor": true
  }
];
