// 東京メトロ千代田線 駅メタデータ定義
import type { Station } from '../../../types';

export const CHIYODA_STATIONS: Station[] = [
  {
    "id": "C-01",
    "lineId": "chiyoda",
    "number": 1,
    "name": "代々木上原",
    "nameKana": "よよぎうえはら",
    "nameEn": "Yoyogi-uehara",
    "lat": 35.6690268,
    "lng": 139.6797733,
    "transfers": [
      "小田急小田原線"
    ],
    "address": "東京都渋谷区西原三丁目8-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "C-02",
    "lineId": "chiyoda",
    "number": 2,
    "name": "代々木公園",
    "nameKana": "よよぎこうえん",
    "nameEn": "Yoyogi-koen",
    "lat": 35.6690693,
    "lng": 139.6901201,
    "transfers": [
      "小田急小田原線（代々木八幡駅）"
    ],
    "address": "東京都渋谷区富ヶ谷一丁目3-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-03",
    "lineId": "chiyoda",
    "number": 3,
    "name": "明治神宮前〈原宿〉",
    "nameKana": "めいじじんぐうまえ",
    "nameEn": "Meiji-jingumae 'Harajuku'",
    "lat": 35.6690037,
    "lng": 139.7043842,
    "transfers": [
      "東京メトロ副都心線",
      "JR山手線（原宿駅）"
    ],
    "address": "東京都渋谷区神宮前一丁目18-22",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-04",
    "lineId": "chiyoda",
    "number": 4,
    "name": "表参道",
    "nameKana": "おもてさんどう",
    "nameEn": "Omote-sando",
    "lat": 35.6652821,
    "lng": 139.7124388,
    "transfers": [
      "東京メトロ銀座線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都港区北青山三丁目6-12",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-05",
    "lineId": "chiyoda",
    "number": 5,
    "name": "乃木坂",
    "nameKana": "のぎざか",
    "nameEn": "Nogizaka",
    "lat": 35.6667086,
    "lng": 139.726291,
    "transfers": [],
    "address": "東京都港区南青山一丁目25-8",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-06",
    "lineId": "chiyoda",
    "number": 6,
    "name": "赤坂",
    "nameKana": "あかさか",
    "nameEn": "Akasaka",
    "lat": 35.672188,
    "lng": 139.7362799,
    "transfers": [],
    "address": "東京都港区赤坂五丁目4-7",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-07",
    "lineId": "chiyoda",
    "number": 7,
    "name": "国会議事堂前",
    "nameKana": "こっかいぎじどうまえ",
    "nameEn": "Kokkai-gijidomae",
    "lat": 35.6737567,
    "lng": 139.743424,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ銀座線（溜池山王駅）",
      "東京メトロ南北線（溜池山王駅）"
    ],
    "address": "東京都千代田区永田町一丁目7-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-08",
    "lineId": "chiyoda",
    "number": 8,
    "name": "霞ケ関",
    "nameKana": "かすみがせき",
    "nameEn": "Kasumigaseki",
    "lat": 35.6725562,
    "lng": 139.751661,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ日比谷線"
    ],
    "address": "東京都千代田区霞が関二丁目1-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-09",
    "lineId": "chiyoda",
    "number": 9,
    "name": "日比谷",
    "nameKana": "ひびや",
    "nameEn": "Hibiya",
    "lat": 35.6737764,
    "lng": 139.7583081,
    "transfers": [
      "東京メトロ日比谷線",
      "都営三田線",
      "JR山手線（有楽町駅）",
      "JR京浜東北線（有楽町駅）",
      "東京メトロ有楽町線（有楽町駅）"
    ],
    "address": "東京都千代田区有楽町一丁目5-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-10",
    "lineId": "chiyoda",
    "number": 10,
    "name": "二重橋前〈丸の内〉",
    "nameKana": "にじゅうばしまえ",
    "nameEn": "Nijubashimae 'Marunouchi'",
    "lat": 35.6803364,
    "lng": 139.7616204,
    "transfers": [
      "JR各線（東京駅）",
      "東京メトロ丸ノ内線（東京駅）"
    ],
    "address": "東京都千代田区丸の内二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-11",
    "lineId": "chiyoda",
    "number": 11,
    "name": "大手町",
    "nameKana": "おおてまち",
    "nameEn": "Otemachi",
    "lat": 35.6867813,
    "lng": 139.763575,
    "transfers": [
      "東京メトロ丸ノ内線",
      "東京メトロ東西線",
      "東京メトロ半蔵門線",
      "都営三田線",
      "JR各線（東京駅）"
    ],
    "address": "東京都千代田区大手町一丁目6-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-12",
    "lineId": "chiyoda",
    "number": 12,
    "name": "新御茶ノ水",
    "nameKana": "しんおちゃのみず",
    "nameEn": "Shin-ochanomizu",
    "lat": 35.6972103,
    "lng": 139.765493,
    "transfers": [
      "JR中央線（御茶ノ水駅）",
      "JR総武線各駅停車（御茶ノ水駅）",
      "東京メトロ丸ノ内線（淡路町駅）",
      "都営新宿線（小川町駅）"
    ],
    "address": "東京都千代田区神田駿河台三丁目2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-13",
    "lineId": "chiyoda",
    "number": 13,
    "name": "湯島",
    "nameKana": "ゆしま",
    "nameEn": "Yushima",
    "lat": 35.7073337,
    "lng": 139.7699318,
    "transfers": [],
    "address": "東京都文京区湯島三丁目41-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-14",
    "lineId": "chiyoda",
    "number": 14,
    "name": "根津",
    "nameKana": "ねづ",
    "nameEn": "Nezu",
    "lat": 35.7173532,
    "lng": 139.765722,
    "transfers": [],
    "address": "東京都文京区根津一丁目3-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-15",
    "lineId": "chiyoda",
    "number": 15,
    "name": "千駄木",
    "nameKana": "せんだぎ",
    "nameEn": "Sendagi",
    "lat": 35.7255471,
    "lng": 139.7632712,
    "transfers": [],
    "address": "東京都文京区千駄木二丁目32-5",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-16",
    "lineId": "chiyoda",
    "number": 16,
    "name": "西日暮里",
    "nameKana": "にしにっぽり",
    "nameEn": "Nishi-nippori",
    "lat": 35.7325785,
    "lng": 139.7672213,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "日暮里・舎人ライナー"
    ],
    "address": "東京都荒川区西日暮里五丁目22-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-17",
    "lineId": "chiyoda",
    "number": 17,
    "name": "町屋",
    "nameKana": "まちや",
    "nameEn": "Machiya",
    "lat": 35.7421821,
    "lng": 139.780081,
    "transfers": [
      "京成本線",
      "都電荒川線"
    ],
    "address": "東京都荒川区町屋一丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "C-18",
    "lineId": "chiyoda",
    "number": 18,
    "name": "北千住",
    "nameKana": "きたせんじゅ",
    "nameEn": "Kita-senju",
    "lat": 35.7496771,
    "lng": 139.8044308,
    "transfers": [
      "JR常磐線快速",
      "東武スカイツリーライン",
      "東京メトロ日比谷線",
      "つくばエクスプレス"
    ],
    "address": "東京都足立区千住旭町42-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp",
      "limitedExp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "C-19",
    "lineId": "chiyoda",
    "number": 19,
    "name": "綾瀬",
    "nameKana": "あやせ",
    "nameEn": "Ayase",
    "lat": 35.7621739,
    "lng": 139.8248629,
    "transfers": [
      "JR常磐線"
    ],
    "address": "東京都足立区綾瀬三丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "C-20",
    "lineId": "chiyoda",
    "number": 20,
    "name": "北綾瀬",
    "nameKana": "きたあやせ",
    "nameEn": "Kita-ayase",
    "lat": 35.7769003,
    "lng": 139.8321195,
    "transfers": [],
    "address": "東京都足立区谷中二丁目6-21",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "semiExp",
      "express",
      "commuter_semi",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "isMajor": false
  }
];
