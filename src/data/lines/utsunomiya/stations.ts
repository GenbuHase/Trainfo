import type { Station } from '../../../types';

export const UTSUNOMIYA_STATIONS: Station[] = [
  {
    "id": "JU-02",
    "stationNumber": "JU-02",
    "lineId": "utsunomiya",
    "number": 1,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7135081,
    "lng": 139.7763091,
    "transfers": [
      "JR上野東京ライン",
      "JR山手線",
      "JR京浜東北線",
      "JR高崎線",
      "JR常磐線快速",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東京メトロ銀座線",
      "東京メトロ日比谷線",
      "京成本線"
    ],
    "address": "東京都台東区上野七丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-03",
    "stationNumber": "JU-03",
    "lineId": "utsunomiya",
    "number": 2,
    "name": "尾久",
    "nameKana": "おく",
    "nameEn": "Oku",
    "lat": 35.7468666,
    "lng": 139.7536457,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線"
    ],
    "address": "東京都北区昭和町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-04",
    "stationNumber": "JU-04",
    "lineId": "utsunomiya",
    "number": 3,
    "name": "赤羽",
    "nameKana": "あかばね",
    "nameEn": "Akabane",
    "lat": 35.7781087,
    "lng": 139.720731,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR埼京線",
      "JR湘南新宿ライン",
      "JR京浜東北線"
    ],
    "address": "東京都北区赤羽一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-05",
    "stationNumber": "JU-05",
    "lineId": "utsunomiya",
    "number": 4,
    "name": "浦和",
    "nameKana": "うらわ",
    "nameEn": "Urawa",
    "lat": 35.8589661,
    "lng": 139.6571243,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR湘南新宿ライン",
      "JR京浜東北線"
    ],
    "address": "埼玉県さいたま市浦和区高砂一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-06",
    "stationNumber": "JU-06",
    "lineId": "utsunomiya",
    "number": 5,
    "name": "さいたま新都心",
    "nameKana": "さいたましんとしん",
    "nameEn": "Saitama-Shintoshin",
    "lat": 35.8935861,
    "lng": 139.6338292,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR京浜東北線"
    ],
    "address": "埼玉県さいたま市大宮区吉敷町四丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-07",
    "stationNumber": "JU-07",
    "lineId": "utsunomiya",
    "number": 6,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "lat": 35.9063192,
    "lng": 139.6240596,
    "transfers": [
      "JR宇都宮線",
      "JR高崎線",
      "JR埼京線",
      "JR川越線",
      "JR湘南新宿ライン",
      "JR京浜東北線",
      "JR武蔵野線",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東武アーバンパークライン",
      "埼玉新都市交通ニューシャトル"
    ],
    "address": "埼玉県さいたま市大宮区錦町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid",
      "limitedExp"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-08",
    "lineId": "utsunomiya",
    "number": 7,
    "name": "土呂",
    "nameKana": "とろ",
    "nameEn": "Toro",
    "lat": 35.9318035,
    "lng": 139.6320838,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "埼玉県さいたま市北区土呂町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-09",
    "lineId": "utsunomiya",
    "number": 8,
    "name": "東大宮",
    "nameKana": "ひがしおおみや",
    "nameEn": "Higashi-Omiya",
    "lat": 35.9486432,
    "lng": 139.6402152,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "埼玉県さいたま市見沼区東大宮五丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-10",
    "lineId": "utsunomiya",
    "number": 9,
    "name": "蓮田",
    "nameKana": "はすだ",
    "nameEn": "Hasuda",
    "lat": 35.981426,
    "lng": 139.6529966,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "埼玉県蓮田市本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-11",
    "lineId": "utsunomiya",
    "number": 10,
    "name": "白岡",
    "nameKana": "しらおか",
    "nameEn": "Shiraoka",
    "lat": 36.0175236,
    "lng": 139.6668294,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "埼玉県白岡市小久喜",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-12",
    "lineId": "utsunomiya",
    "number": 11,
    "name": "新白岡",
    "nameKana": "しんしらおか",
    "nameEn": "Shin-Shiraoka",
    "lat": 36.038668,
    "lng": 139.6720662,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "埼玉県白岡市新白岡七丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-13",
    "lineId": "utsunomiya",
    "number": 12,
    "name": "久喜",
    "nameKana": "くき",
    "nameEn": "Kuki",
    "lat": 36.0656306,
    "lng": 139.67723,
    "transfers": [
      "JR宇都宮線",
      "東武伊勢崎線"
    ],
    "address": "埼玉県久喜市久喜中央二丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-14",
    "lineId": "utsunomiya",
    "number": 13,
    "name": "東鷲宮",
    "nameKana": "ひがしわしのみや",
    "nameEn": "Higashi-Washinomiya",
    "lat": 36.0895236,
    "lng": 139.6794661,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "埼玉県久喜市桜田三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-15",
    "lineId": "utsunomiya",
    "number": 14,
    "name": "栗橋",
    "nameKana": "くりはし",
    "nameEn": "Kurihashi",
    "lat": 36.136417,
    "lng": 139.6940977,
    "transfers": [
      "JR宇都宮線",
      "東武日光線"
    ],
    "address": "埼玉県久喜市栗橋北一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-16",
    "lineId": "utsunomiya",
    "number": 15,
    "name": "古河",
    "nameKana": "こが",
    "nameEn": "Koga",
    "lat": 36.1946049,
    "lng": 139.7095755,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "茨城県古河市本町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-17",
    "lineId": "utsunomiya",
    "number": 16,
    "name": "野木",
    "nameKana": "のぎ",
    "nameEn": "Nogi",
    "lat": 36.2302,
    "lng": 139.7348787,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県下都賀郡野木町大字丸林",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-18",
    "lineId": "utsunomiya",
    "number": 17,
    "name": "間々田",
    "nameKana": "ままだ",
    "nameEn": "Mamada",
    "lat": 36.257944,
    "lng": 139.7610803,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県小山市乙女三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-19",
    "lineId": "utsunomiya",
    "number": 18,
    "name": "小山",
    "nameKana": "おやま",
    "nameEn": "Oyama",
    "lat": 36.3122377,
    "lng": 139.8059151,
    "transfers": [
      "JR宇都宮線",
      "JR両毛線",
      "JR水戸線",
      "東北新幹線"
    ],
    "address": "栃木県小山市城山町三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-20",
    "lineId": "utsunomiya",
    "number": 19,
    "name": "小金井",
    "nameKana": "こがねい",
    "nameEn": "Koganei",
    "lat": 36.374634,
    "lng": 139.8421678,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県下野市駅東一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-21",
    "lineId": "utsunomiya",
    "number": 20,
    "name": "自治医大",
    "nameKana": "じちいだい",
    "nameEn": "Jichiidai",
    "lat": 36.3953364,
    "lng": 139.8544684,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県下野市医大前三丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-22",
    "lineId": "utsunomiya",
    "number": 21,
    "name": "石橋",
    "nameKana": "いしばし",
    "nameEn": "Ishibashi",
    "lat": 36.4363396,
    "lng": 139.8665578,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県下野市石橋",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-23",
    "lineId": "utsunomiya",
    "number": 22,
    "name": "雀宮",
    "nameKana": "すずめのみや",
    "nameEn": "Suzumenomiya",
    "lat": 36.4939339,
    "lng": 139.876934,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県宇都宮市雀の宮一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-24",
    "lineId": "utsunomiya",
    "number": 23,
    "name": "宇都宮",
    "nameKana": "うつのみや",
    "nameEn": "Utsunomiya",
    "lat": 36.5592607,
    "lng": 139.8983936,
    "transfers": [
      "JR宇都宮線",
      "JR日光線",
      "JR烏山線",
      "東北新幹線",
      "宇都宮ライトレール"
    ],
    "address": "栃木県宇都宮市川向町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid",
      "rapid_rabbit",
      "commuter_rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-25",
    "lineId": "utsunomiya",
    "number": 24,
    "name": "岡本",
    "nameKana": "おかもと",
    "nameEn": "Okamoto",
    "lat": 36.5984221,
    "lng": 139.944313,
    "transfers": [
      "JR宇都宮線",
      "JR烏山線"
    ],
    "address": "栃木県宇都宮市下岡本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-26",
    "lineId": "utsunomiya",
    "number": 25,
    "name": "宝積寺",
    "nameKana": "ほうしゃくじ",
    "nameEn": "Hoshakuji",
    "lat": 36.6314616,
    "lng": 139.979455,
    "transfers": [
      "JR宇都宮線",
      "JR烏山線"
    ],
    "address": "栃木県塩谷郡高根沢町大字宝積寺",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-27",
    "lineId": "utsunomiya",
    "number": 26,
    "name": "氏家",
    "nameKana": "うじいえ",
    "nameEn": "Ujiie",
    "lat": 36.6814984,
    "lng": 139.96208,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県さくら市氏家",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-28",
    "lineId": "utsunomiya",
    "number": 27,
    "name": "蒲須坂",
    "nameKana": "かますさか",
    "nameEn": "Kamasusaka",
    "lat": 36.7212287,
    "lng": 139.9501884,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県さくら市蒲須坂",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-29",
    "lineId": "utsunomiya",
    "number": 28,
    "name": "片岡",
    "nameKana": "かたおか",
    "nameEn": "Kataoka",
    "lat": 36.7541522,
    "lng": 139.9458057,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県矢板市片岡",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-30",
    "lineId": "utsunomiya",
    "number": 29,
    "name": "矢板",
    "nameKana": "やいた",
    "nameEn": "Yaita",
    "lat": 36.806752,
    "lng": 139.9329574,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県矢板市扇町一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-31",
    "lineId": "utsunomiya",
    "number": 30,
    "name": "野崎",
    "nameKana": "のざき",
    "nameEn": "Nozaki",
    "lat": 36.8437545,
    "lng": 139.957881,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県大田原市野崎一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-32",
    "lineId": "utsunomiya",
    "number": 31,
    "name": "西那須野",
    "nameKana": "にしなすの",
    "nameEn": "Nishi-Nasuno",
    "lat": 36.8843495,
    "lng": 139.9866443,
    "transfers": [
      "JR宇都宮線"
    ],
    "address": "栃木県那須塩原市永森",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-33",
    "lineId": "utsunomiya",
    "number": 32,
    "name": "那須塩原",
    "nameKana": "なすしおばら",
    "nameEn": "Nasu-Shiobara",
    "lat": 36.9316096,
    "lng": 140.0209363,
    "transfers": [
      "JR宇都宮線",
      "東北新幹線"
    ],
    "address": "栃木県那須塩原市大原間",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  },
  {
    "id": "JU-34",
    "lineId": "utsunomiya",
    "number": 33,
    "name": "黒磯",
    "nameKana": "くろいそ",
    "nameEn": "Kuroiso",
    "lat": 36.9702668,
    "lng": 140.0600487,
    "transfers": [
      "JR宇都宮線",
      "JR東北本線(郡山方面)"
    ],
    "address": "栃木県那須塩原市本町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    }
  }
];
