// 相鉄いずみ野線 駅メタデータ定義
import type { Station } from '../../../types';

export const SOTETSU_IZUMINO_STATIONS: Station[] = [
  {
    "id": "SO-10",
    "lineId": "sotetsu_izumino",
    "number": 1,
    "name": "二俣川",
    "nameKana": "ふたまたがわ",
    "nameEn": "Futamatagawa",
    "lat": 35.4633846,
    "lng": 139.5322757,
    "transfers": [
      "相鉄本線"
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
    "id": "SO-31",
    "lineId": "sotetsu_izumino",
    "number": 2,
    "name": "南万騎が原",
    "nameKana": "みなみまきがはら",
    "nameEn": "Minami-makigahara",
    "lat": 35.4525798,
    "lng": 139.5263862,
    "transfers": [],
    "address": "神奈川県横浜市旭区柏町127",
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
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-32",
    "lineId": "sotetsu_izumino",
    "number": 3,
    "name": "緑園都市",
    "nameKana": "りょくえんとし",
    "nameEn": "Ryokuentoshi",
    "lat": 35.4394513,
    "lng": 139.5219084,
    "transfers": [],
    "address": "神奈川県横浜市泉区緑園四丁目1",
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
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": true
  },
  {
    "id": "SO-33",
    "lineId": "sotetsu_izumino",
    "number": 4,
    "name": "弥生台",
    "nameKana": "やよいだい",
    "nameEn": "Yayoidai",
    "lat": 35.4299039,
    "lng": 139.5062629,
    "transfers": [],
    "address": "神奈川県横浜市泉区弥生台5-2",
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
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-34",
    "lineId": "sotetsu_izumino",
    "number": 5,
    "name": "いずみ野",
    "nameKana": "いずみの",
    "nameEn": "Izumino",
    "lat": 35.4295908,
    "lng": 139.495126,
    "transfers": [],
    "address": "神奈川県横浜市泉区和泉町6214-1",
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
    "id": "SO-35",
    "lineId": "sotetsu_izumino",
    "number": 6,
    "name": "いずみ中央",
    "nameKana": "いずみちゅうおう",
    "nameEn": "Izumi-chuo",
    "lat": 35.4152581,
    "lng": 139.4873447,
    "transfers": [],
    "address": "神奈川県横浜市泉区和泉中央南五丁目4-13",
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
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-36",
    "lineId": "sotetsu_izumino",
    "number": 7,
    "name": "ゆめが丘",
    "nameKana": "ゆめがおか",
    "nameEn": "Yumegaoka",
    "lat": 35.4056861,
    "lng": 139.4825083,
    "transfers": [
      "横浜市営地下鉄ブルーライン(下飯田駅)"
    ],
    "address": "神奈川県横浜市泉区下飯田町1555-9",
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
      "commuter_exp"
    ],
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    },
    "isMajor": false
  },
  {
    "id": "SO-37",
    "lineId": "sotetsu_izumino",
    "number": 8,
    "name": "湘南台",
    "nameKana": "しょうなんだい",
    "nameEn": "Shonandai",
    "lat": 35.3962433,
    "lng": 139.4664505,
    "transfers": [
      "小田急江ノ島線",
      "横浜市営地下鉄ブルーライン"
    ],
    "address": "神奈川県藤沢市湘南台二丁目15",
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
      "commuter_exp",
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
