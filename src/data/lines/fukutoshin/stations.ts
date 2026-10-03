// 東京メトロ副都心線 駅メタデータ定義 (和光市 〜 渋谷 全16駅)
import type { Station } from '../../../types';

export const FUKUTOSHIN_STATIONS: Station[] = [
  {
    "id": "F-01",
    "lineId": "fukutoshin",
    "number": 1,
    "name": "和光市",
    "nameKana": "わこうし",
    "nameEn": "Wakoshi",
    "lat": 35.7883529,
    "lng": 139.6128678,
    "transfers": [
      "東武東上線",
      "東京メトロ有楽町線"
    ],
    "address": "埼玉県和光市本町4-6",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp",
      "express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "F-02",
    "lineId": "fukutoshin",
    "number": 2,
    "name": "地下鉄成増",
    "nameKana": "ちかてつなります",
    "nameEn": "Chikatetsu-narimasu",
    "lat": 35.776704,
    "lng": 139.6313339,
    "transfers": [
      "東武東上線（成増駅）",
      "東京メトロ有楽町線"
    ],
    "address": "東京都練馬区旭町三丁目26-8",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "F-03",
    "lineId": "fukutoshin",
    "number": 3,
    "name": "地下鉄赤塚",
    "nameKana": "ちかてつあかつか",
    "nameEn": "Chikatetsu-akatsuka",
    "lat": 35.769971,
    "lng": 139.6441677,
    "transfers": [
      "東武東上線（下赤塚駅）",
      "東京メトロ有楽町線"
    ],
    "address": "東京都練馬区北町八丁目37-16",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "F-04",
    "lineId": "fukutoshin",
    "number": 4,
    "name": "平和台",
    "nameKana": "へいわだい",
    "nameEn": "Heiwadai",
    "lat": 35.7576942,
    "lng": 139.6542458,
    "transfers": [
      "東京メトロ有楽町線"
    ],
    "address": "東京都練馬区平和台四丁目26-8",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "F-05",
    "lineId": "fukutoshin",
    "number": 5,
    "name": "氷川台",
    "nameKana": "ひかわだい",
    "nameEn": "Hikawadai",
    "lat": 35.7498601,
    "lng": 139.6650785,
    "transfers": [
      "東京メトロ有楽町線"
    ],
    "address": "東京都練馬区氷川台三丁目38-18",
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
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "F-06",
    "lineId": "fukutoshin",
    "number": 6,
    "name": "小竹向原",
    "nameKana": "こたけむかいはら",
    "nameEn": "Kotake-mukaihara",
    "lat": 35.7428773,
    "lng": 139.6806313,
    "transfers": [
      "西武有楽町線",
      "東京メトロ有楽町線"
    ],
    "address": "東京都練馬区小竹町二丁目16-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp",
      "express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "F-07",
    "lineId": "fukutoshin",
    "number": 7,
    "name": "千川",
    "nameKana": "せんかわ",
    "nameEn": "Senkawa",
    "lat": 35.7382898,
    "lng": 139.689497,
    "transfers": [
      "東京メトロ有楽町線"
    ],
    "address": "東京都豊島区要町三丁目10-6",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    }
  },
  {
    "id": "F-08",
    "lineId": "fukutoshin",
    "number": 8,
    "name": "要町",
    "nameKana": "かなめちょう",
    "nameEn": "Kanamecho",
    "lat": 35.7332813,
    "lng": 139.6987138,
    "transfers": [
      "東京メトロ有楽町線"
    ],
    "address": "東京都豊島区要町一丁目1-10",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "3番線",
      "outbound": "4番線"
    }
  },
  {
    "id": "F-09",
    "lineId": "fukutoshin",
    "number": 9,
    "name": "池袋",
    "nameKana": "いけぶくろ",
    "nameEn": "Ikebukuro",
    "lat": 35.7312233,
    "lng": 139.7089976,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "東武東上線",
      "西武池袋線",
      "東京メトロ丸ノ内線",
      "東京メトロ有楽町線"
    ],
    "address": "東京都豊島区西池袋三丁目28-14",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp",
      "express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "5・6番線",
      "outbound": "5・6番線"
    }
  },
  {
    "id": "F-10",
    "lineId": "fukutoshin",
    "number": 10,
    "name": "雑司が谷",
    "nameKana": "ぞうしがや",
    "nameEn": "Zoshigaya",
    "lat": 35.7201652,
    "lng": 139.7147443,
    "transfers": [
      "都電荒川線(鬼子母神前停留場)"
    ],
    "address": "東京都豊島区雑司が谷二丁目6-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
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
    "id": "F-11",
    "lineId": "fukutoshin",
    "number": 11,
    "name": "西早稲田",
    "nameKana": "にしわせだ",
    "nameEn": "Nishi-waseda",
    "lat": 35.7079175,
    "lng": 139.7090644,
    "transfers": [],
    "address": "東京都新宿区戸山三丁目18-2",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
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
    "id": "F-12",
    "lineId": "fukutoshin",
    "number": 12,
    "name": "東新宿",
    "nameKana": "ひがししんじゅく",
    "nameEn": "Higashi-shinjuku",
    "lat": 35.6989445,
    "lng": 139.7077279,
    "transfers": [
      "都営大江戸線"
    ],
    "address": "東京都新宿区新宿七丁目27-11",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "F-13",
    "lineId": "fukutoshin",
    "number": 13,
    "name": "新宿三丁目",
    "nameKana": "しんじゅくさんちょうめ",
    "nameEn": "Shinjuku-sanchome",
    "lat": 35.690713,
    "lng": 139.7048282,
    "transfers": [
      "東京メトロ丸ノ内線",
      "都営新宿線"
    ],
    "address": "東京都新宿区新宿三丁目5-4",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp",
      "express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "F-14",
    "lineId": "fukutoshin",
    "number": 14,
    "name": "北参道",
    "nameKana": "きたさんどう",
    "nameEn": "Kita-sando",
    "lat": 35.6784821,
    "lng": 139.7054958,
    "transfers": [],
    "address": "東京都渋谷区千駄ヶ谷四丁目7-11",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": false,
      "ticketOffice": false
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
    "id": "F-15",
    "lineId": "fukutoshin",
    "number": 15,
    "name": "明治神宮前〈原宿〉",
    "nameKana": "めいじじんぐうまえ",
    "nameEn": "Meiji-jingumae 'Harajuku'",
    "lat": 35.668396,
    "lng": 139.7053934,
    "transfers": [
      "JR山手線(原宿駅)",
      "東京メトロ千代田線"
    ],
    "address": "東京都渋谷区神宮前一丁目18-22",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "F-16",
    "lineId": "fukutoshin",
    "number": 16,
    "name": "渋谷",
    "nameKana": "しぶや",
    "nameEn": "Shibuya",
    "lat": 35.6586186,
    "lng": 139.7027508,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "東急東横線",
      "東急田園都市線",
      "京王井の頭線",
      "東京メトロ銀座線",
      "東京メトロ半蔵門線"
    ],
    "address": "東京都渋谷区渋谷二丁目21-13",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "commuter_exp",
      "express"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "3・4番線",
      "outbound": "5・6番線"
    }
  }
];
