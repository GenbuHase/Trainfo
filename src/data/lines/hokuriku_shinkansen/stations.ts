import type { Station } from '../../../types';

export const HOKURIKU_SHINKANSEN_STATIONS: Station[] = [
  {
    "id": "HKS-01",
    "lineId": "hokuriku_shinkansen",
    "number": 1,
    "name": "東京",
    "nameKana": "とうきょう",
    "nameEn": "Tokyo",
    "lat": 35.6810889,
    "lng": 139.7672325,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR中央線",
      "JR東海道線",
      "JR横須賀線",
      "JR総武快速線",
      "JR京葉線",
      "東北新幹線",
      "上越新幹線",
      "北陸新幹線",
      "東海道新幹線",
      "東京メトロ丸ノ内線"
    ],
    "address": "東京都千代田区丸の内一丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "asama",
      "tsurugi"
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
    "id": "HKS-02",
    "lineId": "hokuriku_shinkansen",
    "number": 2,
    "name": "上野",
    "nameKana": "うえの",
    "nameEn": "Ueno",
    "lat": 35.7130911,
    "lng": 139.7772996,
    "transfers": [
      "JR山手線",
      "JR京浜東北線",
      "JR宇都宮線",
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
      "kagayaki",
      "hakutaka",
      "asama",
      "tsurugi"
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
    "id": "HKS-03",
    "lineId": "hokuriku_shinkansen",
    "number": 3,
    "name": "大宮",
    "nameKana": "おおみや",
    "nameEn": "Omiya",
    "lat": 35.906071,
    "lng": 139.6229046,
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
      "kagayaki",
      "hakutaka",
      "asama",
      "tsurugi"
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
    "id": "HKS-04",
    "lineId": "hokuriku_shinkansen",
    "number": 4,
    "name": "熊谷",
    "nameKana": "くまがや",
    "nameEn": "Kumagaya",
    "lat": 36.1400567,
    "lng": 139.3878836,
    "transfers": [
      "JR高崎線",
      "上越新幹線",
      "北陸新幹線",
      "秩父鉄道秩父本線"
    ],
    "address": "埼玉県熊谷市筑波二丁目",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hakutaka",
      "asama"
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
    "id": "HKS-05",
    "lineId": "hokuriku_shinkansen",
    "number": 5,
    "name": "本庄早稲田",
    "nameKana": "ほんじょうわせだ",
    "nameEn": "Honjo-Waseda",
    "lat": 36.2195709,
    "lng": 139.1778725,
    "transfers": [],
    "address": "埼玉県本庄市早稲田の杜1丁目1-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "asama"
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
    "id": "HKS-06",
    "lineId": "hokuriku_shinkansen",
    "number": 6,
    "name": "高崎",
    "nameKana": "たかさき",
    "nameEn": "Takasaki",
    "lat": 36.3240949,
    "lng": 139.01262,
    "transfers": [
      "JR高崎線",
      "JR上越線",
      "JR信越本線",
      "JR吾妻線",
      "JR両毛線",
      "JR八高線",
      "上越新幹線",
      "北陸新幹線",
      "上信電鉄線"
    ],
    "address": "群馬県高崎市八島町",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "asama",
      "tsurugi"
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
    "id": "HKS-07",
    "lineId": "hokuriku_shinkansen",
    "number": 7,
    "name": "安中榛名",
    "nameKana": "あんなかはるな",
    "nameEn": "Annaka-Haruna",
    "lat": 36.3625143,
    "lng": 138.8481437,
    "transfers": [],
    "address": "群馬県安中市東上秋間2552-5",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "asama"
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
    "id": "HKS-08",
    "lineId": "hokuriku_shinkansen",
    "number": 8,
    "name": "軽井沢",
    "nameKana": "かるいざわ",
    "nameEn": "Karuizawa",
    "lat": 36.3425685,
    "lng": 138.6336585,
    "transfers": [
      "JR北陸新幹線",
      "しなの鉄道線"
    ],
    "address": "長野県北佐久郡軽井沢町大字軽井沢1178-1246",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "asama"
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
    "id": "HKS-09",
    "lineId": "hokuriku_shinkansen",
    "number": 9,
    "name": "佐久平",
    "nameKana": "さくだいら",
    "nameEn": "Sakudaira",
    "lat": 36.2774589,
    "lng": 138.4629706,
    "transfers": [
      "JR北陸新幹線",
      "JR小海線"
    ],
    "address": "長野県佐久市佐久平駅東52",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hakutaka",
      "asama"
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
    "id": "HKS-10",
    "lineId": "hokuriku_shinkansen",
    "number": 10,
    "name": "上田",
    "nameKana": "うえだ",
    "nameEn": "Ueda",
    "lat": 36.3965011,
    "lng": 138.2496583,
    "transfers": [
      "JR北陸新幹線",
      "しなの鉄道線",
      "上田電鉄別所線"
    ],
    "address": "長野県上田市天神1丁目1-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "asama"
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
    "id": "HKS-11",
    "lineId": "hokuriku_shinkansen",
    "number": 11,
    "name": "長野",
    "nameKana": "ながの",
    "nameEn": "Nagano",
    "lat": 36.6427963,
    "lng": 138.1888562,
    "transfers": [
      "JR北陸新幹線",
      "JR篠ノ井線",
      "JR信越本線",
      "しなの鉄道北しなの線",
      "長野電鉄長野線"
    ],
    "address": "長野県長野市南千歳1-25",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "asama",
      "tsurugi"
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
    "id": "HKS-12",
    "lineId": "hokuriku_shinkansen",
    "number": 12,
    "name": "飯山",
    "nameKana": "いいやま",
    "nameEn": "Iiyama",
    "lat": 36.8457787,
    "lng": 138.3584762,
    "transfers": [
      "JR北陸新幹線",
      "JR飯山線"
    ],
    "address": "長野県飯山市大字飯山770-3",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hakutaka"
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
    "id": "HKS-13",
    "lineId": "hokuriku_shinkansen",
    "number": 13,
    "name": "上越妙高",
    "nameKana": "じょうえつみょうこう",
    "nameEn": "Joetsu-Myoko",
    "lat": 37.0813292,
    "lng": 138.2485374,
    "transfers": [
      "北陸新幹線",
      "妙高はねうまライン"
    ],
    "address": "新潟県上越市大和",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-14",
    "lineId": "hokuriku_shinkansen",
    "number": 14,
    "name": "糸魚川",
    "nameKana": "いといがわ",
    "nameEn": "Itoigawa",
    "lat": 37.0426979,
    "lng": 137.8599319,
    "transfers": [
      "JR北陸新幹線",
      "JR大糸線",
      "日本海ひすいライン"
    ],
    "address": "新潟県糸魚川市大町1丁目7-47",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-15",
    "lineId": "hokuriku_shinkansen",
    "number": 15,
    "name": "黒部宇奈月温泉",
    "nameKana": "くろべうなづきおんせん",
    "nameEn": "Kurobe-Unazukionsen",
    "lat": 36.8742181,
    "lng": 137.4813491,
    "transfers": [
      "JR北陸新幹線",
      "富山地方鉄道本線（新黒部）"
    ],
    "address": "富山県黒部市若栗3210-3",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-16",
    "lineId": "hokuriku_shinkansen",
    "number": 16,
    "name": "富山",
    "nameKana": "とやま",
    "nameEn": "Toyama",
    "lat": 36.701368,
    "lng": 137.2134438,
    "transfers": [
      "JR北陸新幹線",
      "JR高山本線",
      "あいの風とやま鉄道",
      "富山地方鉄道本線",
      "富山地方鉄道富山軌道線"
    ],
    "address": "富山県富山市明輪町1-225",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-17",
    "lineId": "hokuriku_shinkansen",
    "number": 17,
    "name": "新高岡",
    "nameKana": "しんたかおか",
    "nameEn": "Shin-Takaoka",
    "lat": 36.7269446,
    "lng": 137.0120241,
    "transfers": [
      "JR北陸新幹線",
      "JR城端線"
    ],
    "address": "富山県高岡市下黒田3011",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-18",
    "lineId": "hokuriku_shinkansen",
    "number": 18,
    "name": "金沢",
    "nameKana": "かなざわ",
    "nameEn": "Kanazawa",
    "lat": 36.5780366,
    "lng": 136.648151,
    "transfers": [
      "JR北陸新幹線",
      "IRいしかわ鉄道",
      "北陸鉄道浅野川線"
    ],
    "address": "石川県金沢市木ノ新保町1-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-19",
    "lineId": "hokuriku_shinkansen",
    "number": 19,
    "name": "小松",
    "nameKana": "こまつ",
    "nameEn": "Komatsu",
    "lat": 36.402476,
    "lng": 136.4531602,
    "transfers": [
      "JR北陸新幹線",
      "IRいしかわ鉄道"
    ],
    "address": "石川県小松市土居原町466番",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-20",
    "lineId": "hokuriku_shinkansen",
    "number": 20,
    "name": "加賀温泉",
    "nameKana": "かがおんせん",
    "nameEn": "Kagaonsen",
    "lat": 36.3202315,
    "lng": 136.3509149,
    "transfers": [
      "JR北陸新幹線",
      "IRいしかわ鉄道"
    ],
    "address": "石川県加賀市作見町ヲ58",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-21",
    "lineId": "hokuriku_shinkansen",
    "number": 21,
    "name": "芦原温泉",
    "nameKana": "あわらおんせん",
    "nameEn": "Awaraonsen",
    "lat": 36.2153427,
    "lng": 136.2354877,
    "transfers": [
      "JR北陸新幹線",
      "ハピラインふくい"
    ],
    "address": "福井県あわら市春宮1丁目12-15",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-22",
    "lineId": "hokuriku_shinkansen",
    "number": 22,
    "name": "福井",
    "nameKana": "ふくい",
    "nameEn": "Fukui",
    "lat": 36.0617497,
    "lng": 136.223543,
    "transfers": [
      "JR北陸新幹線",
      "ハピラインふくい",
      "JR越美北線",
      "えちぜん鉄道勝山永平寺線",
      "福井鉄道福武線"
    ],
    "address": "福井県福井市中央1丁目1番1号",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-23",
    "lineId": "hokuriku_shinkansen",
    "number": 23,
    "name": "越前たけふ",
    "nameKana": "えちぜんたけふ",
    "nameEn": "Echizen-Takefu",
    "lat": 35.8958816,
    "lng": 136.1990645,
    "transfers": [
      "JR北陸新幹線"
    ],
    "address": "福井県越前市大屋町39-10-5",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
    "id": "HKS-24",
    "lineId": "hokuriku_shinkansen",
    "number": 24,
    "name": "敦賀",
    "nameKana": "つるが",
    "nameEn": "Tsuruga",
    "lat": 35.6450309,
    "lng": 136.0780817,
    "transfers": [
      "JR北陸新幹線",
      "JR北陸本線",
      "JR小浜線",
      "ハピラインふくい"
    ],
    "address": "福井県敦賀市鉄輪町一丁目1-24",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "kagayaki",
      "hakutaka",
      "tsurugi"
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
