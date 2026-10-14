// 相鉄本線 駅メタデータ定義
import type { Station } from '../../../types';

export const SOTETSU_MAIN_STATIONS: Station[] = [
  {
    "id": "SO-01",
    "lineId": "sotetsu_main",
    "number": 1,
    "name": "横浜",
    "nameKana": "よこはま",
    "nameEn": "Yokohama",
    "lat": 35.4651573,
    "lng": 139.6209776,
    "transfers": [
      "JR東海道線",
      "JR京浜東北線",
      "JR横須賀線",
      "JR湘南新宿ライン",
      "東急東横線",
      "京急本線",
      "みなとみらい線",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県横浜市西区南幸一丁目1-1",
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
      "express",
      "commuter_exp",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1・2・3番線",
      "outbound": "1・2・3番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-02",
    "lineId": "sotetsu_main",
    "number": 2,
    "name": "平沼橋",
    "nameKana": "ひらぬまばし",
    "nameEn": "Hiranumabashi",
    "lat": 35.4599264,
    "lng": 139.6165229,
    "transfers": [],
    "address": "神奈川県横浜市西区西平沼町2-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-03",
    "lineId": "sotetsu_main",
    "number": 3,
    "name": "西横浜",
    "nameKana": "にしよこはま",
    "nameEn": "Nishi-yokohama",
    "lat": 35.4535117,
    "lng": 139.6088013,
    "transfers": [],
    "address": "神奈川県横浜市西区西平沼町6-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-04",
    "lineId": "sotetsu_main",
    "number": 4,
    "name": "天王町",
    "nameKana": "てんのうちょう",
    "nameEn": "Tennocho",
    "lat": 35.4540085,
    "lng": 139.6026888,
    "transfers": [],
    "address": "神奈川県横浜市保土ケ谷区天王町二丁目45-40",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-05",
    "lineId": "sotetsu_main",
    "number": 5,
    "name": "星川",
    "nameKana": "ほしかわ",
    "nameEn": "Hoshikawa",
    "lat": 35.4588221,
    "lng": 139.5946793,
    "transfers": [],
    "address": "神奈川県横浜市保土ケ谷区星川一丁目1-1",
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
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-06",
    "lineId": "sotetsu_main",
    "number": 6,
    "name": "和田町",
    "nameKana": "わだまち",
    "nameEn": "Wadamachi",
    "lat": 35.4637861,
    "lng": 139.5864138,
    "transfers": [],
    "address": "神奈川県横浜市保土ケ谷区仏向町20",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-07",
    "lineId": "sotetsu_main",
    "number": 7,
    "name": "上星川",
    "nameKana": "かみほしかわ",
    "nameEn": "Kamihoshikawa",
    "lat": 35.467445,
    "lng": 139.580335,
    "transfers": [],
    "address": "神奈川県横浜市保土ケ谷区上星川二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-08",
    "lineId": "sotetsu_main",
    "number": 8,
    "name": "西谷",
    "nameKana": "にしや",
    "nameEn": "Nishiya",
    "lat": 35.4780622,
    "lng": 139.5654649,
    "transfers": [
      "相鉄新横浜線"
    ],
    "address": "神奈川県横浜市保土ケ谷区西谷町1101",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express",
      "commuter_exp",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-09",
    "lineId": "sotetsu_main",
    "number": 9,
    "name": "鶴ヶ峰",
    "nameKana": "つるがみね",
    "nameEn": "Tsurugamine",
    "lat": 35.4750458,
    "lng": 139.5496591,
    "transfers": [],
    "address": "神奈川県横浜市旭区鶴ヶ峰二丁目22-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express",
      "commuter_exp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-10",
    "lineId": "sotetsu_main",
    "number": 10,
    "name": "二俣川",
    "nameKana": "ふたまたがわ",
    "nameEn": "Futamatagawa",
    "lat": 35.4633846,
    "lng": 139.5322757,
    "transfers": [
      "相鉄いずみ野線"
    ],
    "address": "神奈川県横浜市旭区二俣川二丁目91-7",
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
      "express",
      "commuter_exp",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-11",
    "lineId": "sotetsu_main",
    "number": 11,
    "name": "希望ヶ丘",
    "nameKana": "きぼうがおか",
    "nameEn": "Kibogaoka",
    "lat": 35.4606724,
    "lng": 139.5134001,
    "transfers": [],
    "address": "神奈川県横浜市旭区中希望が丘244",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-12",
    "lineId": "sotetsu_main",
    "number": 12,
    "name": "三ツ境",
    "nameKana": "みつきょう",
    "nameEn": "Mitsukyo",
    "lat": 35.4679494,
    "lng": 139.5022796,
    "transfers": [],
    "address": "神奈川県横浜市瀬谷区三ツ境40",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-13",
    "lineId": "sotetsu_main",
    "number": 13,
    "name": "瀬谷",
    "nameKana": "せや",
    "nameEn": "Seya",
    "lat": 35.4705267,
    "lng": 139.4828959,
    "transfers": [],
    "address": "神奈川県横浜市瀬谷区瀬谷四丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-14",
    "lineId": "sotetsu_main",
    "number": 14,
    "name": "大和",
    "nameKana": "やまと",
    "nameEn": "Yamato",
    "lat": 35.4700147,
    "lng": 139.4614084,
    "transfers": [
      "小田急江ノ島線"
    ],
    "address": "神奈川県大和市大和南一丁目1-1",
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
      "express",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-15",
    "lineId": "sotetsu_main",
    "number": 15,
    "name": "相模大塚",
    "nameKana": "さがみおおつか",
    "nameEn": "Sagami-otsuka",
    "lat": 35.4706234,
    "lng": 139.441079,
    "transfers": [],
    "address": "神奈川県大和市桜森二丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-16",
    "lineId": "sotetsu_main",
    "number": 16,
    "name": "さがみ野",
    "nameKana": "さがみの",
    "nameEn": "Sagamino",
    "lat": 35.4715402,
    "lng": 139.4285206,
    "transfers": [],
    "address": "神奈川県海老名市東柏ケ谷二丁目30-28",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-17",
    "lineId": "sotetsu_main",
    "number": 17,
    "name": "かしわ台",
    "nameKana": "かしわだい",
    "nameEn": "Kashiwadai",
    "lat": 35.4668983,
    "lng": 139.415601,
    "transfers": [],
    "address": "神奈川県海老名市柏ケ谷1002",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "express"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-18",
    "lineId": "sotetsu_main",
    "number": 18,
    "name": "海老名",
    "nameKana": "えびな",
    "nameEn": "Ebina",
    "lat": 35.4530251,
    "lng": 139.3917889,
    "transfers": [
      "小田急小田原線",
      "JR相模線"
    ],
    "address": "神奈川県海老名市めぐみ町1-1",
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
      "express",
      "limitedExp",
      "commuter_ltd_exp"
    ],
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    },
    "isMajor": true
  }
];
