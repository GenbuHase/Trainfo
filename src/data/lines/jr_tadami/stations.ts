import type { Station } from '../../../types';

export const TADAMI_STATIONS: Station[] = [
  {
    "id": "TD-01",
    "lineId": "jr_tadami",
    "number": 1,
    "name": "会津若松",
    "nameKana": "あいづわかまつ",
    "nameEn": "Aizu-Wakamatsu",
    "lat": 37.508824,
    "lng": 139.930159,
    "transfers": [
      "JR磐越西線",
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市駅前町",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
    },
    "stoppingTypes": [
      "local",
      "rapid"
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
    "id": "TD-02",
    "lineId": "jr_tadami",
    "number": 2,
    "name": "七日町",
    "nameKana": "なのかまち",
    "nameEn": "Nanokamachi",
    "lat": 37.50121,
    "lng": 139.918958,
    "transfers": [],
    "address": "福島県/新潟県七日町駅",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "TD-03",
    "lineId": "jr_tadami",
    "number": 3,
    "name": "西若松",
    "nameKana": "にしわかまつ",
    "nameEn": "Nishi-Wakamatsu",
    "lat": 37.486034,
    "lng": 139.914172,
    "transfers": [
      "会津鉄道会津線"
    ],
    "address": "福島県会津若松市材木町一丁目9-1",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
    },
    "stoppingTypes": [
      "local",
      "rapid"
    ],
    "isMajor": true,
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    }
  },
  {
    "id": "TD-04",
    "lineId": "jr_tadami",
    "number": 4,
    "name": "会津本郷",
    "nameKana": "あいづほんごう",
    "nameEn": "Aizu-Hongo",
    "lat": 37.463488,
    "lng": 139.892987,
    "transfers": [],
    "address": "福島県会津若松市北会津町上米塚",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-05",
    "lineId": "jr_tadami",
    "number": 5,
    "name": "会津高田",
    "nameKana": "あいづたかだ",
    "nameEn": "Aizu-Takada",
    "lat": 37.470839,
    "lng": 139.841266,
    "transfers": [],
    "address": "福島県会津美里町字柳台",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-06",
    "lineId": "jr_tadami",
    "number": 6,
    "name": "根岸",
    "nameKana": "ねぎし",
    "nameEn": "Negishi",
    "lat": 37.501885,
    "lng": 139.828603,
    "transfers": [],
    "address": "福島県会津美里町米田",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-07",
    "lineId": "jr_tadami",
    "number": 7,
    "name": "新鶴",
    "nameKana": "にいつる",
    "nameEn": "Niitsuru",
    "lat": 37.517161,
    "lng": 139.828499,
    "transfers": [],
    "address": "福島県会津美里町立石田",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-08",
    "lineId": "jr_tadami",
    "number": 8,
    "name": "若宮",
    "nameKana": "わかみや",
    "nameEn": "Wakamiya",
    "lat": 37.5349943,
    "lng": 139.8283575,
    "transfers": [],
    "address": "福島県会津坂下町大字五ノ併",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-09",
    "lineId": "jr_tadami",
    "number": 9,
    "name": "会津坂下",
    "nameKana": "あいづばんげ",
    "nameEn": "Aizu-Bange",
    "lat": 37.5567784,
    "lng": 139.8216844,
    "transfers": [],
    "address": "福島県会津坂下町字曲田",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-10",
    "lineId": "jr_tadami",
    "number": 10,
    "name": "塔寺",
    "nameKana": "とうでら",
    "nameEn": "Todera",
    "lat": 37.569368,
    "lng": 139.785241,
    "transfers": [],
    "address": "福島県会津坂下町大字気多宮",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-11",
    "lineId": "jr_tadami",
    "number": 11,
    "name": "会津坂本",
    "nameKana": "あいづさかもと",
    "nameEn": "Aizu-Sakamoto",
    "lat": 37.5533464,
    "lng": 139.75652,
    "transfers": [],
    "address": "福島県会津坂下町大字坂本",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-12",
    "lineId": "jr_tadami",
    "number": 12,
    "name": "会津柳津",
    "nameKana": "あいづやないづ",
    "nameEn": "Aizu-Yanaizu",
    "lat": 37.5383428,
    "lng": 139.7237087,
    "transfers": [],
    "address": "福島県柳津町大字柳津",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-13",
    "lineId": "jr_tadami",
    "number": 13,
    "name": "郷戸",
    "nameKana": "ごうど",
    "nameEn": "Godo",
    "lat": 37.51636,
    "lng": 139.709911,
    "transfers": [],
    "address": "福島県柳津町大字柳津",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-14",
    "lineId": "jr_tadami",
    "number": 14,
    "name": "滝谷",
    "nameKana": "たきや",
    "nameEn": "Takiya",
    "lat": 37.494315,
    "lng": 139.69799,
    "transfers": [],
    "address": "福島県柳津町大字郷戸",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-15",
    "lineId": "jr_tadami",
    "number": 15,
    "name": "会津桧原",
    "nameKana": "あいづひのはら",
    "nameEn": "Aizu-Hinohara",
    "lat": 37.4918272,
    "lng": 139.6790773,
    "transfers": [],
    "address": "福島県三島町大字桧原",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-16",
    "lineId": "jr_tadami",
    "number": 16,
    "name": "会津西方",
    "nameKana": "あいづにしかた",
    "nameEn": "Aizu-Nishikata",
    "lat": 37.480937,
    "lng": 139.661528,
    "transfers": [],
    "address": "福島県三島町大字名入",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-17",
    "lineId": "jr_tadami",
    "number": 17,
    "name": "会津宮下",
    "nameKana": "あいづみやした",
    "nameEn": "Aizu-Miyashita",
    "lat": 37.4709934,
    "lng": 139.6471055,
    "transfers": [],
    "address": "福島県三島町大字宮下",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-18",
    "lineId": "jr_tadami",
    "number": 18,
    "name": "早戸",
    "nameKana": "はやと",
    "nameEn": "Hayato",
    "lat": 37.4702287,
    "lng": 139.5935867,
    "transfers": [],
    "address": "福島県三島町大字早戸",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-19",
    "lineId": "jr_tadami",
    "number": 19,
    "name": "会津水沼",
    "nameKana": "あいづみずぬま",
    "nameEn": "Aizu-Mizunuma",
    "lat": 37.4831489,
    "lng": 139.5605062,
    "transfers": [],
    "address": "福島県金山町大字水沼",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-20",
    "lineId": "jr_tadami",
    "number": 20,
    "name": "会津中川",
    "nameKana": "あいづなかがわ",
    "nameEn": "Aizu-Nakagawa",
    "lat": 37.4734442,
    "lng": 139.5319984,
    "transfers": [],
    "address": "福島県金山町大字中川",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-21",
    "lineId": "jr_tadami",
    "number": 21,
    "name": "会津川口",
    "nameKana": "あいづかわぐち",
    "nameEn": "Aizu-Kawaguchi",
    "lat": 37.455076,
    "lng": 139.52384,
    "transfers": [],
    "address": "福島県金山町大字川口",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-22",
    "lineId": "jr_tadami",
    "number": 22,
    "name": "本名",
    "nameKana": "ほんな",
    "nameEn": "Honna",
    "lat": 37.4449849,
    "lng": 139.4990402,
    "transfers": [],
    "address": "福島県金山町大字本名",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-23",
    "lineId": "jr_tadami",
    "number": 23,
    "name": "会津越川",
    "nameKana": "あいづこすがわ",
    "nameEn": "Aizu-Kosugawa",
    "lat": 37.3985423,
    "lng": 139.4690323,
    "transfers": [],
    "address": "福島県金山町大字越川",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-24",
    "lineId": "jr_tadami",
    "number": 24,
    "name": "会津横田",
    "nameKana": "あいづよこた",
    "nameEn": "Aizu-Yokota",
    "lat": 37.392224,
    "lng": 139.4357281,
    "transfers": [],
    "address": "福島県金山町大字横田",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-25",
    "lineId": "jr_tadami",
    "number": 25,
    "name": "会津大塩",
    "nameKana": "あいづおおしお",
    "nameEn": "Aizu-Oshio",
    "lat": 37.3928466,
    "lng": 139.412727,
    "transfers": [],
    "address": "福島県金山町大字大塩",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-26",
    "lineId": "jr_tadami",
    "number": 26,
    "name": "会津塩沢",
    "nameKana": "あいづしおざわ",
    "nameEn": "Aizu-Shiozawa",
    "lat": 37.3936374,
    "lng": 139.3554447,
    "transfers": [],
    "address": "福島県只見町大字塩沢",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-27",
    "lineId": "jr_tadami",
    "number": 27,
    "name": "会津蒲生",
    "nameKana": "あいづがもう",
    "nameEn": "Aizu-Gamo",
    "lat": 37.3816379,
    "lng": 139.3332882,
    "transfers": [],
    "address": "福島県只見町大字蒲生",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-28",
    "lineId": "jr_tadami",
    "number": 28,
    "name": "只見",
    "nameKana": "ただみ",
    "nameEn": "Tadami",
    "lat": 37.350239,
    "lng": 139.314783,
    "transfers": [],
    "address": "福島県只見町大字只見",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-29",
    "lineId": "jr_tadami",
    "number": 29,
    "name": "大白川",
    "nameKana": "おおしらかわ",
    "nameEn": "Oshirakawa",
    "lat": 37.341687,
    "lng": 139.121373,
    "transfers": [],
    "address": "新潟県魚沼市大白川",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-30",
    "lineId": "jr_tadami",
    "number": 30,
    "name": "入広瀬",
    "nameKana": "いりひろせ",
    "nameEn": "Irihirose",
    "lat": 37.3589411,
    "lng": 139.0656947,
    "transfers": [],
    "address": "新潟県魚沼市大栃山",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-31",
    "lineId": "jr_tadami",
    "number": 31,
    "name": "上条",
    "nameKana": "かみじょう",
    "nameEn": "Kamijo",
    "lat": 37.347094,
    "lng": 139.050894,
    "transfers": [],
    "address": "新潟県魚沼市渋川",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-32",
    "lineId": "jr_tadami",
    "number": 32,
    "name": "越後須原",
    "nameKana": "えちごすはら",
    "nameEn": "Echigo-Suhara",
    "lat": 37.3204553,
    "lng": 139.0176287,
    "transfers": [],
    "address": "新潟県魚沼市須原",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-33",
    "lineId": "jr_tadami",
    "number": 33,
    "name": "魚沼田中",
    "nameKana": "うおぬまたなか",
    "nameEn": "Uonuma-Tanaka",
    "lat": 37.294413,
    "lng": 138.992578,
    "transfers": [],
    "address": "新潟県魚沼市田中",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-34",
    "lineId": "jr_tadami",
    "number": 34,
    "name": "越後広瀬",
    "nameKana": "えちごひろせ",
    "nameEn": "Echigo-Hirose",
    "lat": 37.274238,
    "lng": 138.981339,
    "transfers": [],
    "address": "新潟県魚沼市並柳",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-35",
    "lineId": "jr_tadami",
    "number": 35,
    "name": "藪神",
    "nameKana": "やぶかみ",
    "nameEn": "Yabukami",
    "lat": 37.256737,
    "lng": 138.975698,
    "transfers": [],
    "address": "新潟県魚沼市今泉",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
    "id": "TD-36",
    "lineId": "jr_tadami",
    "number": 36,
    "name": "小出",
    "nameKana": "こいで",
    "nameEn": "Koide",
    "lat": 37.2335257,
    "lng": 138.9534583,
    "transfers": [
      "JR上越線"
    ],
    "address": "新潟県魚沼市四日町",
    "platforms": {
      "inbound": "上り 会津若松方面",
      "outbound": "下り 小出方面"
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
