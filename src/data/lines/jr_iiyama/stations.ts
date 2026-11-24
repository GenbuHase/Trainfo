import type { Station } from '../../../types';

export const JR_IIYAMA_STATIONS: Station[] = [
  {
    "id": "IY-01",
    "lineId": "jr_iiyama",
    "number": 1,
    "name": "豊野",
    "nameKana": "とよの",
    "nameEn": "Toyono",
    "lat": 36.7109499,
    "lng": 138.2753056,
    "transfers": [],
    "address": "長野県長野市豊野町豊野1002",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-02",
    "lineId": "jr_iiyama",
    "number": 2,
    "name": "信濃浅野",
    "nameKana": "しなのあさの",
    "nameEn": "Shinano-Asano",
    "lat": 36.7220962,
    "lng": 138.294685,
    "transfers": [],
    "address": "長野県長野市豊野町浅野",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-03",
    "lineId": "jr_iiyama",
    "number": 3,
    "name": "立ヶ花",
    "nameKana": "たちがはな",
    "nameEn": "Tachigahana",
    "lat": 36.7316231,
    "lng": 138.3071462,
    "transfers": [],
    "address": "長野県長野市豊野町蟹沢",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-04",
    "lineId": "jr_iiyama",
    "number": 4,
    "name": "上今井",
    "nameKana": "かみいまい",
    "nameEn": "Kami-Imai",
    "lat": 36.7530796,
    "lng": 138.3195573,
    "transfers": [],
    "address": "長野県中野市大字上今井",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-05",
    "lineId": "jr_iiyama",
    "number": 5,
    "name": "替佐",
    "nameKana": "かえさ",
    "nameEn": "Kaesa",
    "lat": 36.7690043,
    "lng": 138.3236739,
    "transfers": [],
    "address": "長野県中野市大字豊津",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-06",
    "lineId": "jr_iiyama",
    "number": 6,
    "name": "蓮",
    "nameKana": "はちす",
    "nameEn": "Hachisu",
    "lat": 36.8085316,
    "lng": 138.3489582,
    "transfers": [],
    "address": "長野県飯山市大字蓮",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-07",
    "lineId": "jr_iiyama",
    "number": 7,
    "name": "飯山",
    "nameKana": "いいやま",
    "nameEn": "Iiyama",
    "lat": 36.8464207,
    "lng": 138.3588345,
    "transfers": [
      "ＪＲ北陸新幹線"
    ],
    "address": "長野県飯山市大字飯山770-3",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-08",
    "lineId": "jr_iiyama",
    "number": 8,
    "name": "北飯山",
    "nameKana": "きたいいやま",
    "nameEn": "Kita-Iiyama",
    "lat": 36.859153,
    "lng": 138.3638833,
    "transfers": [],
    "address": "長野県飯山市大字飯山",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-09",
    "lineId": "jr_iiyama",
    "number": 9,
    "name": "信濃平",
    "nameKana": "しなのたいら",
    "nameEn": "Shinano-Taira",
    "lat": 36.8852952,
    "lng": 138.3786927,
    "transfers": [],
    "address": "長野県飯山市大字常盤",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-10",
    "lineId": "jr_iiyama",
    "number": 10,
    "name": "戸狩野沢温泉",
    "nameKana": "とがりのざわおんせん",
    "nameEn": "Togari-Nozawaonsen",
    "lat": 36.9169501,
    "lng": 138.3932205,
    "transfers": [],
    "address": "長野県飯山市大字照里",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-11",
    "lineId": "jr_iiyama",
    "number": 11,
    "name": "上境",
    "nameKana": "かみさかい",
    "nameEn": "Kami-Sakai",
    "lat": 36.9376623,
    "lng": 138.4189683,
    "transfers": [],
    "address": "長野県飯山市大字一山",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-12",
    "lineId": "jr_iiyama",
    "number": 12,
    "name": "上桑名川",
    "nameKana": "かみくわながわ",
    "nameEn": "Kami-Kuwanagawa",
    "lat": 36.9625931,
    "lng": 138.4413183,
    "transfers": [],
    "address": "長野県飯山市大字照岡",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-13",
    "lineId": "jr_iiyama",
    "number": 13,
    "name": "桑名川",
    "nameKana": "くわながわ",
    "nameEn": "Kuwanagawa",
    "lat": 36.9758695,
    "lng": 138.4579813,
    "transfers": [],
    "address": "長野県飯山市大字照岡",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-14",
    "lineId": "jr_iiyama",
    "number": 14,
    "name": "西大滝",
    "nameKana": "にしおおたき",
    "nameEn": "Nishi-Otaki",
    "lat": 36.979172,
    "lng": 138.4807203,
    "transfers": [],
    "address": "長野県飯山市大字照岡",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-15",
    "lineId": "jr_iiyama",
    "number": 15,
    "name": "信濃白鳥",
    "nameKana": "しなのしらとり",
    "nameEn": "Shinano-Shiratori",
    "lat": 36.9834044,
    "lng": 138.5027038,
    "transfers": [],
    "address": "長野県栄村大字豊栄",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-16",
    "lineId": "jr_iiyama",
    "number": 16,
    "name": "平滝",
    "nameKana": "ひらたき",
    "nameEn": "Hirataki",
    "lat": 36.9860132,
    "lng": 138.533331,
    "transfers": [],
    "address": "長野県栄村大字豊栄",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-17",
    "lineId": "jr_iiyama",
    "number": 17,
    "name": "横倉",
    "nameKana": "よこくら",
    "nameEn": "Yokokura",
    "lat": 36.97978,
    "lng": 138.54994,
    "transfers": [],
    "address": "長野県栄村大字北信",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-18",
    "lineId": "jr_iiyama",
    "number": 18,
    "name": "森宮野原",
    "nameKana": "もりみやのはら",
    "nameEn": "Morimiyanohara",
    "lat": 36.98963,
    "lng": 138.57692,
    "transfers": [],
    "address": "長野県栄村大字北信",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-19",
    "lineId": "jr_iiyama",
    "number": 19,
    "name": "足滝",
    "nameKana": "あしだき",
    "nameEn": "Ashidaki",
    "lat": 36.9990209,
    "lng": 138.603322,
    "transfers": [],
    "address": "新潟県津南町大字上郷寺石",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-20",
    "lineId": "jr_iiyama",
    "number": 20,
    "name": "越後田中",
    "nameKana": "えちごたなか",
    "nameEn": "Echigo-Tanaka",
    "lat": 37.0051457,
    "lng": 138.626702,
    "transfers": [],
    "address": "新潟県津南町大字上郷上田",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-21",
    "lineId": "jr_iiyama",
    "number": 21,
    "name": "津南",
    "nameKana": "つなん",
    "nameEn": "Tsunan",
    "lat": 37.0234122,
    "lng": 138.6391975,
    "transfers": [],
    "address": "新潟県津南町大字外丸",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-22",
    "lineId": "jr_iiyama",
    "number": 22,
    "name": "越後鹿渡",
    "nameKana": "えちごしかわたり",
    "nameEn": "Echigo-Shikawatari",
    "lat": 37.0479182,
    "lng": 138.6712518,
    "transfers": [],
    "address": "新潟県津南町大字三箇",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-23",
    "lineId": "jr_iiyama",
    "number": 23,
    "name": "越後田沢",
    "nameKana": "えちごたざわ",
    "nameEn": "Echigo-Tazawa",
    "lat": 37.0553852,
    "lng": 138.6947923,
    "transfers": [],
    "address": "新潟県十日町市田中",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-24",
    "lineId": "jr_iiyama",
    "number": 24,
    "name": "越後水沢",
    "nameKana": "えちごみずさわ",
    "nameEn": "Echigo-Mizusawa",
    "lat": 37.0740318,
    "lng": 138.7179223,
    "transfers": [],
    "address": "新潟県十日町市馬場甲",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-25",
    "lineId": "jr_iiyama",
    "number": 25,
    "name": "土市",
    "nameKana": "どいち",
    "nameEn": "Doichi",
    "lat": 37.09723,
    "lng": 138.72924,
    "transfers": [],
    "address": "新潟県土市駅",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-26",
    "lineId": "jr_iiyama",
    "number": 26,
    "name": "十日町",
    "nameKana": "とおかまち",
    "nameEn": "Tokamachi",
    "lat": 37.134246,
    "lng": 138.7560949,
    "transfers": [
      "北越急行ほくほく線"
    ],
    "address": "新潟県十日町駅",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-27",
    "lineId": "jr_iiyama",
    "number": 27,
    "name": "魚沼中条",
    "nameKana": "うおぬまなかじょう",
    "nameEn": "Uonuma-Nakajo",
    "lat": 37.1591497,
    "lng": 138.772281,
    "transfers": [],
    "address": "新潟県十日町市中条甲",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-28",
    "lineId": "jr_iiyama",
    "number": 28,
    "name": "下条",
    "nameKana": "げじょう",
    "nameEn": "Gejo",
    "lat": 37.1980595,
    "lng": 138.7800074,
    "transfers": [],
    "address": "新潟県十日町市下条四丁目",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-29",
    "lineId": "jr_iiyama",
    "number": 29,
    "name": "越後岩沢",
    "nameKana": "えちごいわさわ",
    "nameEn": "Echigo-Iwasawa",
    "lat": 37.2405575,
    "lng": 138.7967118,
    "transfers": [],
    "address": "新潟県小千谷市大字岩沢",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-30",
    "lineId": "jr_iiyama",
    "number": 30,
    "name": "内ヶ巻",
    "nameKana": "うちがまき",
    "nameEn": "Uchigamaki",
    "lat": 37.2500784,
    "lng": 138.851404,
    "transfers": [],
    "address": "新潟県小千谷市大字川井",
    "facilities": {
      "elevator": false,
      "restroom": true,
      "multipurposeToilet": false,
      "waitingRoom": true,
      "ticketOffice": false
    },
    "stoppingTypes": [
      "regular"
    ],
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  },
  {
    "id": "IY-31",
    "lineId": "jr_iiyama",
    "number": 31,
    "name": "越後川口",
    "nameKana": "えちごかわぐち",
    "nameEn": "Echigo-Kawaguchi",
    "lat": 37.2727999,
    "lng": 138.8619021,
    "transfers": [
      "ＪＲ上越線"
    ],
    "address": "新潟県長岡市川口牛ケ島",
    "facilities": {
      "elevator": true,
      "restroom": true,
      "multipurposeToilet": true,
      "waitingRoom": true,
      "ticketOffice": true
    },
    "stoppingTypes": [
      "regular",
      "rapid"
    ],
    "isMajor": true,
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    }
  }
];
