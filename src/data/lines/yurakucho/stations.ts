// 東京メトロ有楽町線 駅メタデータ定義 (和光市 〜 新木場 全24駅)
import type { Station } from '../../../types';

export const YURAKUCHO_STATIONS: Station[] = [
  {
    "id": "Y-01",
    "lineId": "yurakucho",
    "number": 1,
    "name": "和光市",
    "nameKana": "わこうし",
    "nameEn": "Wakoshi",
    "lat": 35.7883529,
    "lng": 139.6128678,
    "transfers": [
      "東武東上線",
      "東京メトロ副都心線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "Y-02",
    "lineId": "yurakucho",
    "number": 2,
    "name": "地下鉄成増",
    "nameKana": "ちかてつなります",
    "nameEn": "Chikatetsu-narimasu",
    "lat": 35.776704,
    "lng": 139.6313339,
    "transfers": [
      "東武東上線（成増駅）",
      "東京メトロ副都心線"
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
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-03",
    "lineId": "yurakucho",
    "number": 3,
    "name": "地下鉄赤塚",
    "nameKana": "ちかてつあかつか",
    "nameEn": "Chikatetsu-akatsuka",
    "lat": 35.769971,
    "lng": 139.6441677,
    "transfers": [
      "東武東上線（下赤塚駅）",
      "東京メトロ副都心線"
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
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-04",
    "lineId": "yurakucho",
    "number": 4,
    "name": "平和台",
    "nameKana": "へいわだい",
    "nameEn": "Heiwadai",
    "lat": 35.7576942,
    "lng": 139.6542458,
    "transfers": [
      "東京メトロ副都心線"
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
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-05",
    "lineId": "yurakucho",
    "number": 5,
    "name": "氷川台",
    "nameKana": "ひかわだい",
    "nameEn": "Hikawadai",
    "lat": 35.7498601,
    "lng": 139.6650785,
    "transfers": [
      "東京メトロ副都心線"
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
      "local"
    ],
    "isMajor": false,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-06",
    "lineId": "yurakucho",
    "number": 6,
    "name": "小竹向原",
    "nameKana": "こたけむかいはら",
    "nameEn": "Kotake-mukaihara",
    "lat": 35.7429781,
    "lng": 139.6807045,
    "transfers": [
      "西武有楽町線",
      "東京メトロ副都心線"
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
      "local"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "Y-07",
    "lineId": "yurakucho",
    "number": 7,
    "name": "千川",
    "nameKana": "せんかわ",
    "nameEn": "Senkawa",
    "lat": 35.7382902,
    "lng": 139.6894971,
    "transfers": [
      "東京メトロ副都心線"
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
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-08",
    "lineId": "yurakucho",
    "number": 8,
    "name": "要町",
    "nameKana": "かなめちょう",
    "nameEn": "Kanamecho",
    "lat": 35.73328,
    "lng": 139.698716,
    "transfers": [
      "東京メトロ副都心線"
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
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-09",
    "lineId": "yurakucho",
    "number": 9,
    "name": "池袋",
    "nameKana": "いけぶくろ",
    "nameEn": "Ikebukuro",
    "lat": 35.7297098,
    "lng": 139.7097272,
    "transfers": [
      "JR山手線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "東武東上線",
      "西武池袋線",
      "東京メトロ丸ノ内線",
      "東京メトロ副都心線"
    ],
    "address": "東京都豊島区西池袋一丁目1-25",
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
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  },
  {
    "id": "Y-10",
    "lineId": "yurakucho",
    "number": 10,
    "name": "東池袋",
    "nameKana": "ひがしいけぶくろ",
    "nameEn": "Higashi-ikebukuro",
    "lat": 35.7257006,
    "lng": 139.7195905,
    "transfers": [
      "都電荒川線(東池袋四丁目停留場)"
    ],
    "address": "東京都豊島区東池袋四丁目4-4",
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
    "id": "Y-11",
    "lineId": "yurakucho",
    "number": 11,
    "name": "護国寺",
    "nameKana": "ごこくじ",
    "nameEn": "Gokokuji",
    "lat": 35.7191034,
    "lng": 139.7275108,
    "transfers": [],
    "address": "東京都文京区大塚五丁目40-8",
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
    "id": "Y-12",
    "lineId": "yurakucho",
    "number": 12,
    "name": "江戸川橋",
    "nameKana": "えどがわばし",
    "nameEn": "Edogawabashi",
    "lat": 35.7095696,
    "lng": 139.7336008,
    "transfers": [],
    "address": "東京都文京区関口一丁目19-6",
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
    "id": "Y-13",
    "lineId": "yurakucho",
    "number": 13,
    "name": "飯田橋",
    "nameKana": "いいだばし",
    "nameEn": "Iidabashi",
    "lat": 35.7015617,
    "lng": 139.7436174,
    "transfers": [
      "JR中央・総武線各駅停車",
      "東京メトロ東西線",
      "東京メトロ南北線",
      "都営大江戸線"
    ],
    "address": "東京都新宿区神楽坂一丁目13",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "strain"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-14",
    "lineId": "yurakucho",
    "number": 14,
    "name": "市ケ谷",
    "nameKana": "いちがや",
    "nameEn": "Ichigaya",
    "lat": 35.6923634,
    "lng": 139.7367792,
    "transfers": [
      "JR中央・総武線各駅停車",
      "東京メトロ南北線",
      "都営新宿線"
    ],
    "address": "東京都新宿区市谷田町一丁目",
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
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-15",
    "lineId": "yurakucho",
    "number": 15,
    "name": "麹町",
    "nameKana": "こうじまち",
    "nameEn": "Kojimachi",
    "lat": 35.6840302,
    "lng": 139.7376724,
    "transfers": [],
    "address": "東京都千代田区麹町三丁目2",
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
    "id": "Y-16",
    "lineId": "yurakucho",
    "number": 16,
    "name": "永田町",
    "nameKana": "ながたちょう",
    "nameEn": "Nagatacho",
    "lat": 35.6779889,
    "lng": 139.7416145,
    "transfers": [
      "東京メトロ銀座線・丸ノ内線(赤坂見附駅)",
      "東京メトロ半蔵門線",
      "東京メトロ南北線"
    ],
    "address": "東京都千代田区永田町一丁目11-28",
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
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-17",
    "lineId": "yurakucho",
    "number": 17,
    "name": "桜田門",
    "nameKana": "さくらだもん",
    "nameEn": "Sakuradamon",
    "lat": 35.6774582,
    "lng": 139.7516866,
    "transfers": [],
    "address": "東京都千代田区霞が関二丁目1-1",
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
    "id": "Y-18",
    "lineId": "yurakucho",
    "number": 18,
    "name": "有楽町",
    "nameKana": "ゆうらくちょう",
    "nameEn": "Yurakucho",
    "lat": 35.6760219,
    "lng": 139.762151,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "東京メトロ日比谷線・千代田線・都営三田線(日比谷駅)"
    ],
    "address": "東京都千代田区有楽町一丁目11-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "strain"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-19",
    "lineId": "yurakucho",
    "number": 19,
    "name": "銀座一丁目",
    "nameKana": "ぎんざいっちょうめ",
    "nameEn": "Ginza-itchome",
    "lat": 35.6743786,
    "lng": 139.7670566,
    "transfers": [
      "東京メトロ銀座線・丸ノ内線・日比谷線(銀座駅)"
    ],
    "address": "東京都中央区銀座一丁目7-12",
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
    "id": "Y-20",
    "lineId": "yurakucho",
    "number": 20,
    "name": "新富町",
    "nameKana": "しんとみちょう",
    "nameEn": "Shintomicho",
    "lat": 35.6706504,
    "lng": 139.7734291,
    "transfers": [
      "東京メトロ日比谷線(築地駅)"
    ],
    "address": "東京都中央区築地一丁目1-1",
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
    "id": "Y-21",
    "lineId": "yurakucho",
    "number": 21,
    "name": "月島",
    "nameKana": "つきしま",
    "nameEn": "Tsukishima",
    "lat": 35.6645697,
    "lng": 139.784766,
    "transfers": [
      "都営大江戸線"
    ],
    "address": "東京都中央区月島一丁目3-9",
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
    "isMajor": true,
    "platforms": {
      "inbound": "1番線",
      "outbound": "2番線"
    }
  },
  {
    "id": "Y-22",
    "lineId": "yurakucho",
    "number": 22,
    "name": "豊洲",
    "nameKana": "とよす",
    "nameEn": "Toyosu",
    "lat": 35.6550808,
    "lng": 139.79625,
    "transfers": [
      "ゆりかもめ"
    ],
    "address": "東京都江東区豊洲四丁目1-1",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "local",
      "strain"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "3・4番線"
    }
  },
  {
    "id": "Y-23",
    "lineId": "yurakucho",
    "number": 23,
    "name": "辰巳",
    "nameKana": "たつみ",
    "nameEn": "Tatsumi",
    "lat": 35.6455232,
    "lng": 139.8107438,
    "transfers": [],
    "address": "東京都江東区辰巳一丁目1-36",
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
    "id": "Y-24",
    "lineId": "yurakucho",
    "number": 24,
    "name": "新木場",
    "nameKana": "しんきば",
    "nameEn": "Shin-kiba",
    "lat": 35.6459744,
    "lng": 139.8266504,
    "transfers": [
      "JR京葉線",
      "東京臨海高速鉄道りんかい線"
    ],
    "address": "東京都江東区新木場一丁目5",
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
    "isMajor": true,
    "platforms": {
      "inbound": "1・2番線",
      "outbound": "1・2番線"
    }
  }
];
