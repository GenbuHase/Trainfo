import type { Station } from '../../../types';

/**
 * JR羽越本線 駅メタデータ（新津 → 秋田、60駅）
 *
 * lat/lng は OSM 実軌道（ルートリレーション 1876848・route=railway）の
 * トポロジカル連結パス端点に完全一致（0.0m）した座標です
 *（ROUTE_EXPANSION_PLAYBOOK.md Phase 2・第35条 準拠）。
 *
 * 公式駅ナンバリングは羽越本線（JR東日本新潟地区・秋田地区、地方線区）に
 * 導入されていないため、`stationNumber` は未定義とし、内部管理用IDのみ保持します
 *（プレイブック 第33条に従う）。
 *
 * 【駅リスト訂正】旧リストには奥羽本線の土崎駅が羽越本線の駅として
 * 混入していたため削除し、正規順序（Wikipedia 羽越本線路線図の営業キロ基準:
 * 羽後亀田 243.7 → 岩城みなと 250.2 → 道川 251.8 → 下浜 258.4 → 桂根 261.7 →
 * 新屋 265.7 → 羽後牛島 269.0 → 秋田 271.7 km、計60駅）に再採番済みです。
 */
export const UETSU_MAIN_STATIONS: Station[] = [
  {
    "id": "UE-01",
    "lineId": "uetsu_main",
    "number": 1,
    "name": "新津",
    "nameKana": "しんづ",
    "nameEn": "Shinzu",
    "lat": 37.800025,
    "lng": 139.121101,
    "transfers": [
      "JR信越本線",
      "JR磐越西線"
    ],
    "address": "新潟県新潟市秋葉区新津",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "UE-02",
    "lineId": "uetsu_main",
    "number": 2,
    "name": "京ケ瀬",
    "nameKana": "きがせ",
    "nameEn": "Kigase",
    "lat": 37.8175481,
    "lng": 139.1783058,
    "transfers": [],
    "address": "新潟県新潟市秋葉区",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-03",
    "lineId": "uetsu_main",
    "number": 3,
    "name": "水原",
    "nameKana": "みずはら",
    "nameEn": "Mihara",
    "lat": 37.836609,
    "lng": 139.2171919,
    "transfers": [],
    "address": "新潟県阿賀野市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-04",
    "lineId": "uetsu_main",
    "number": 4,
    "name": "神山",
    "nameKana": "かみやま",
    "nameEn": "Kamiyama",
    "lat": 37.8627231,
    "lng": 139.2446624,
    "transfers": [],
    "address": "新潟県阿賀野市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-05",
    "lineId": "uetsu_main",
    "number": 5,
    "name": "月岡",
    "nameKana": "つきおか",
    "nameEn": "Tsukaoka",
    "lat": 37.8889226,
    "lng": 139.2720322,
    "transfers": [],
    "address": "新潟県東蒲原郡阿賀町",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-06",
    "lineId": "uetsu_main",
    "number": 6,
    "name": "中浦",
    "nameKana": "なかうら",
    "nameEn": "Nakamura",
    "lat": 37.9121843,
    "lng": 139.3026896,
    "transfers": [],
    "address": "新潟県東蒲原郡阿賀町",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-07",
    "lineId": "uetsu_main",
    "number": 7,
    "name": "新発田",
    "nameKana": "しばた",
    "nameEn": "Shibata",
    "lat": 37.9439154,
    "lng": 139.3349564,
    "transfers": [
      "JR白新線"
    ],
    "address": "新潟県新発田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "UE-08",
    "lineId": "uetsu_main",
    "number": 8,
    "name": "加治",
    "nameKana": "かじ",
    "nameEn": "Kaji",
    "lat": 37.976579,
    "lng": 139.358459,
    "transfers": [],
    "address": "新潟県新発田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-09",
    "lineId": "uetsu_main",
    "number": 9,
    "name": "金塚",
    "nameKana": "かなづか",
    "nameEn": "Kanaduka",
    "lat": 38.0197989,
    "lng": 139.3792636,
    "transfers": [],
    "address": "新潟県新発田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-10",
    "lineId": "uetsu_main",
    "number": 10,
    "name": "中条",
    "nameKana": "なかじょう",
    "nameEn": "Nakajo",
    "lat": 38.0500399,
    "lng": 139.3981295,
    "transfers": [],
    "address": "新潟県胎内市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-11",
    "lineId": "uetsu_main",
    "number": 11,
    "name": "平木田",
    "nameKana": "ひらきだ",
    "nameEn": "Hiraketa",
    "lat": 38.0947104,
    "lng": 139.4281982,
    "transfers": [],
    "address": "新潟県胎内市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-12",
    "lineId": "uetsu_main",
    "number": 12,
    "name": "坂町",
    "nameKana": "さかまち",
    "nameEn": "Sakamachi",
    "lat": 38.1208156,
    "lng": 139.4470217,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-13",
    "lineId": "uetsu_main",
    "number": 13,
    "name": "平林",
    "nameKana": "ひらばやし",
    "nameEn": "Hirabayashi",
    "lat": 38.1499749,
    "lng": 139.4589847,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-14",
    "lineId": "uetsu_main",
    "number": 14,
    "name": "岩船町",
    "nameKana": "いわふねまち",
    "nameEn": "Iwafunemachi",
    "lat": 38.1830229,
    "lng": 139.4595751,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-15",
    "lineId": "uetsu_main",
    "number": 15,
    "name": "村上",
    "nameKana": "むらかみ",
    "nameEn": "Murakami",
    "lat": 38.2202974,
    "lng": 139.4633892,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "UE-16",
    "lineId": "uetsu_main",
    "number": 16,
    "name": "間島",
    "nameKana": "まじま",
    "nameEn": "Majima",
    "lat": 38.2729191,
    "lng": 139.4501257,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-17",
    "lineId": "uetsu_main",
    "number": 17,
    "name": "越後早川",
    "nameKana": "えちごはやかわ",
    "nameEn": "Echigo-Hayakawa",
    "lat": 38.3175571,
    "lng": 139.4500533,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-18",
    "lineId": "uetsu_main",
    "number": 18,
    "name": "桑川",
    "nameKana": "くわがわ",
    "nameEn": "Kuwagawa",
    "lat": 38.3739577,
    "lng": 139.4581843,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-19",
    "lineId": "uetsu_main",
    "number": 19,
    "name": "今川",
    "nameKana": "いまがわ",
    "nameEn": "Imagawa",
    "lat": 38.4103628,
    "lng": 139.4683638,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-20",
    "lineId": "uetsu_main",
    "number": 20,
    "name": "越後寒川",
    "nameKana": "えちごかんがわ",
    "nameEn": "Echigo-Kangawa",
    "lat": 38.4495568,
    "lng": 139.4909817,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-21",
    "lineId": "uetsu_main",
    "number": 21,
    "name": "勝木",
    "nameKana": "かつき",
    "nameEn": "Katsuki",
    "lat": 38.4895978,
    "lng": 139.5173745,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-22",
    "lineId": "uetsu_main",
    "number": 22,
    "name": "府屋",
    "nameKana": "ふや",
    "nameEn": "Fuya",
    "lat": 38.5140857,
    "lng": 139.5311433,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-23",
    "lineId": "uetsu_main",
    "number": 23,
    "name": "鼠ケ関",
    "nameKana": "ねずみのせき",
    "nameEn": "Nezuminoseki",
    "lat": 38.5556775,
    "lng": 139.5486492,
    "transfers": [],
    "address": "新潟県村上市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-24",
    "lineId": "uetsu_main",
    "number": 24,
    "name": "小岩川",
    "nameKana": "こいわがわ",
    "nameEn": "Koiwagawa",
    "lat": 38.590683,
    "lng": 139.5661815,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-25",
    "lineId": "uetsu_main",
    "number": 25,
    "name": "あつみ温泉",
    "nameKana": "あつみおんせん",
    "nameEn": "Atsumi-Onsen",
    "lat": 38.6243699,
    "lng": 139.5879972,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-26",
    "lineId": "uetsu_main",
    "number": 26,
    "name": "五十川",
    "nameKana": "いがかわ",
    "nameEn": "Igakawa",
    "lat": 38.6706383,
    "lng": 139.6163138,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-27",
    "lineId": "uetsu_main",
    "number": 27,
    "name": "小波渡",
    "nameKana": "こなみど",
    "nameEn": "Kaminado",
    "lat": 38.692171,
    "lng": 139.6495553,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-28",
    "lineId": "uetsu_main",
    "number": 28,
    "name": "三瀬",
    "nameKana": "みせ",
    "nameEn": "Mise",
    "lat": 38.6994124,
    "lng": 139.6734052,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-29",
    "lineId": "uetsu_main",
    "number": 29,
    "name": "羽前水沢",
    "nameKana": "うぜんみずさわ",
    "nameEn": "Uzen-Mizusawa",
    "lat": 38.7138576,
    "lng": 139.7323515,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-30",
    "lineId": "uetsu_main",
    "number": 30,
    "name": "羽前大山",
    "nameKana": "うぜんおおやま",
    "nameEn": "Uzen-Oyama",
    "lat": 38.7420276,
    "lng": 139.7670501,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-31",
    "lineId": "uetsu_main",
    "number": 31,
    "name": "鶴岡",
    "nameKana": "つるおか",
    "nameEn": "Tsuruoka",
    "lat": 38.7400916,
    "lng": 139.8359612,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "UE-32",
    "lineId": "uetsu_main",
    "number": 32,
    "name": "藤島",
    "nameKana": "ふじしま",
    "nameEn": "Fujishima",
    "lat": 38.7689448,
    "lng": 139.8944812,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-33",
    "lineId": "uetsu_main",
    "number": 33,
    "name": "西袋",
    "nameKana": "にしぶくろ",
    "nameEn": "Nishibukuro",
    "lat": 38.811862,
    "lng": 139.9079883,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-34",
    "lineId": "uetsu_main",
    "number": 34,
    "name": "余目",
    "nameKana": "よのめ",
    "nameEn": "Yome",
    "lat": 38.844264,
    "lng": 139.9115592,
    "transfers": [
      "JR陸羽西線"
    ],
    "address": "山形県東田川郡三川町",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-35",
    "lineId": "uetsu_main",
    "number": 35,
    "name": "北余目",
    "nameKana": "きたよのめ",
    "nameEn": "Kita-Yome",
    "lat": 38.8676381,
    "lng": 139.9083124,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-36",
    "lineId": "uetsu_main",
    "number": 36,
    "name": "砂越",
    "nameKana": "すなごえ",
    "nameEn": "Sunagoe",
    "lat": 38.8941647,
    "lng": 139.9081664,
    "transfers": [],
    "address": "山形県鶴岡市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-37",
    "lineId": "uetsu_main",
    "number": 37,
    "name": "東酒田",
    "nameKana": "ひがしさかた",
    "nameEn": "Higashi-Sakata",
    "lat": 38.9077995,
    "lng": 139.8753768,
    "transfers": [],
    "address": "山形県酒田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-38",
    "lineId": "uetsu_main",
    "number": 38,
    "name": "酒田",
    "nameKana": "さかた",
    "nameEn": "Sakata",
    "lat": 38.9221244,
    "lng": 139.8462445,
    "transfers": [
      "日本貨物鉄道 酒田港支線"
    ],
    "address": "山形県酒田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "UE-39",
    "lineId": "uetsu_main",
    "number": 39,
    "name": "本楯",
    "nameKana": "もんだて",
    "nameEn": "Mondate",
    "lat": 38.9688013,
    "lng": 139.8824004,
    "transfers": [],
    "address": "山形県酒田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-40",
    "lineId": "uetsu_main",
    "number": 40,
    "name": "南鳥海",
    "nameKana": "みなみちょうかい",
    "nameEn": "Minami-Cho kai",
    "lat": 38.9876814,
    "lng": 139.8989083,
    "transfers": [],
    "address": "山形県遊佐町",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-41",
    "lineId": "uetsu_main",
    "number": 41,
    "name": "遊佐",
    "nameKana": "ゆざ",
    "nameEn": "Yuza",
    "lat": 39.0160031,
    "lng": 139.9050516,
    "transfers": [],
    "address": "山形県遊佐町",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-42",
    "lineId": "uetsu_main",
    "number": 42,
    "name": "吹浦",
    "nameKana": "ふこうら",
    "nameEn": "Fukoura",
    "lat": 39.0695678,
    "lng": 139.8789072,
    "transfers": [],
    "address": "山形県遊佐町",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-43",
    "lineId": "uetsu_main",
    "number": 43,
    "name": "女鹿",
    "nameKana": "めじか",
    "nameEn": "Mejika",
    "lat": 39.0989156,
    "lng": 139.8809112,
    "transfers": [],
    "address": "秋田県にかほ市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-44",
    "lineId": "uetsu_main",
    "number": 44,
    "name": "小砂川",
    "nameKana": "こすながわ",
    "nameEn": "Kosunagawa",
    "lat": 39.1373238,
    "lng": 139.8856055,
    "transfers": [],
    "address": "秋田県にかほ市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-45",
    "lineId": "uetsu_main",
    "number": 45,
    "name": "上浜",
    "nameKana": "かみはま",
    "nameEn": "Kami-Hama",
    "lat": 39.1647951,
    "lng": 139.9028394,
    "transfers": [],
    "address": "秋田県にかほ市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-46",
    "lineId": "uetsu_main",
    "number": 46,
    "name": "象潟",
    "nameKana": "きさかた",
    "nameEn": "Kisakata",
    "lat": 39.2072158,
    "lng": 139.9022596,
    "transfers": [],
    "address": "秋田県にかほ市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-47",
    "lineId": "uetsu_main",
    "number": 47,
    "name": "金浦",
    "nameKana": "かなおら",
    "nameEn": "Kanaora",
    "lat": 39.2559305,
    "lng": 139.9204026,
    "transfers": [],
    "address": "秋田県にかほ市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-48",
    "lineId": "uetsu_main",
    "number": 48,
    "name": "仁賀保",
    "nameKana": "にかほ",
    "nameEn": "Nikaho",
    "lat": 39.2897093,
    "lng": 139.9636852,
    "transfers": [],
    "address": "秋田県にかほ市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-49",
    "lineId": "uetsu_main",
    "number": 49,
    "name": "西目",
    "nameKana": "にしめ",
    "nameEn": "Nishime",
    "lat": 39.3474896,
    "lng": 140.0180311,
    "transfers": [],
    "address": "秋田県男鹿市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-50",
    "lineId": "uetsu_main",
    "number": 50,
    "name": "羽後本荘",
    "nameKana": "うごほんじょう",
    "nameEn": "Ugo-Honjo",
    "lat": 39.3865493,
    "lng": 140.0574435,
    "transfers": [],
    "address": "秋田県由利本荘市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
    "id": "UE-51",
    "lineId": "uetsu_main",
    "number": 51,
    "name": "羽後岩谷",
    "nameKana": "うごいわや",
    "nameEn": "Ugo-Iwaya",
    "lat": 39.4419649,
    "lng": 140.0900666,
    "transfers": [],
    "address": "秋田県由利本荘市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-52",
    "lineId": "uetsu_main",
    "number": 52,
    "name": "折渡",
    "nameKana": "おれわたし",
    "nameEn": "Orewatashi",
    "lat": 39.4763648,
    "lng": 140.0911937,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-53",
    "lineId": "uetsu_main",
    "number": 53,
    "name": "羽後亀田",
    "nameKana": "うごかめだ",
    "nameEn": "Ugo-Kameda",
    "lat": 39.4938606,
    "lng": 140.0629871,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-54",
    "lineId": "uetsu_main",
    "number": 54,
    "name": "岩城みなと",
    "nameKana": "いわきみなと",
    "nameEn": "Iwaki-Minato",
    "lat": 39.5455493,
    "lng": 140.0548403,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-55",
    "lineId": "uetsu_main",
    "number": 55,
    "name": "道川",
    "nameKana": "みちかわ",
    "nameEn": "Michikawa",
    "lat": 39.5605017,
    "lng": 140.0571361,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-56",
    "lineId": "uetsu_main",
    "number": 56,
    "name": "下浜",
    "nameKana": "しもはま",
    "nameEn": "Shimo-Hama",
    "lat": 39.6184049,
    "lng": 140.0645273,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-57",
    "lineId": "uetsu_main",
    "number": 57,
    "name": "桂根",
    "nameKana": "かつらね",
    "nameEn": "Katsurane",
    "lat": 39.6477485,
    "lng": 140.0663535,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-58",
    "lineId": "uetsu_main",
    "number": 58,
    "name": "新屋",
    "nameKana": "あらや",
    "nameEn": "Araya",
    "lat": 39.6770125,
    "lng": 140.0875013,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-59",
    "lineId": "uetsu_main",
    "number": 59,
    "name": "羽後牛島",
    "nameKana": "うごうしじま",
    "nameEn": "Ugo-Ushijima",
    "lat": 39.6962449,
    "lng": 140.117049,
    "transfers": [],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local"
    ],
    "isMajor": false,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "UE-60",
    "lineId": "uetsu_main",
    "number": 60,
    "name": "秋田",
    "nameKana": "あきた",
    "nameEn": "Akita",
    "lat": 39.7172882,
    "lng": 140.12952,
    "transfers": [
      "JR奥羽本線",
      "JR男鹿線"
    ],
    "address": "秋田県秋田市",
    "platforms": {
      "inbound": "上り 新津方面",
      "outbound": "下り 秋田方面"
    },
    "stoppingTypes": [
      "local",
      "rapid",
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
  }
];
