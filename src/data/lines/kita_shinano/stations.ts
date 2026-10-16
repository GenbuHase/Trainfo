import type { Station } from '../../../types';

export const KITA_SHINANO_STATIONS: Station[] = [
  {
    "id": "SRK-01",
    "lineId": "kita_shinano",
    "number": 1,
    "name": "長野",
    "nameKana": "ながの",
    "nameEn": "Nagano",
    "lat": 36.6438932,
    "lng": 138.1896132,
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
    "id": "SRK-02",
    "lineId": "kita_shinano",
    "number": 2,
    "name": "北長野",
    "nameKana": "きたながの",
    "nameEn": "Kita-Nagano",
    "lat": 36.6656585,
    "lng": 138.223183,
    "transfers": [],
    "address": "長野県長野市中越2丁目34-34",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
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
    "id": "SRK-03",
    "lineId": "kita_shinano",
    "number": 3,
    "name": "三才",
    "nameKana": "さんさい",
    "nameEn": "Sansai",
    "lat": 36.6861723,
    "lng": 138.2435174,
    "transfers": [],
    "address": "長野県長野市大字三才2207",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
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
    "id": "SRK-04",
    "lineId": "kita_shinano",
    "number": 4,
    "name": "豊野",
    "nameKana": "とよの",
    "nameEn": "Toyono",
    "lat": 36.7109499,
    "lng": 138.2753056,
    "transfers": [],
    "address": "長野県長野市豊野町豊野1002",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
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
    "id": "SRK-05",
    "lineId": "kita_shinano",
    "number": 5,
    "name": "牟礼",
    "nameKana": "むれ",
    "nameEn": "Mure",
    "lat": 36.7531904,
    "lng": 138.2479478,
    "transfers": [],
    "address": "長野県上水内郡飯綱町大字豊野4921-1",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
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
    "id": "SRK-06",
    "lineId": "kita_shinano",
    "number": 6,
    "name": "古間",
    "nameKana": "ふるま",
    "nameEn": "Furuma",
    "lat": 36.7919257,
    "lng": 138.2304432,
    "transfers": [],
    "address": "長野県上水内郡信濃町大字富濃409",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
    },
    "stoppingTypes": [
      "local",
      "rapid"
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
    "id": "SRK-07",
    "lineId": "kita_shinano",
    "number": 7,
    "name": "黒姫",
    "nameKana": "くろひめ",
    "nameEn": "Kurohime",
    "lat": 36.8076642,
    "lng": 138.1966529,
    "transfers": [],
    "address": "長野県上水内郡信濃町大字柏原2711",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
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
    "id": "SRK-08",
    "lineId": "kita_shinano",
    "number": 8,
    "name": "妙高高原",
    "nameKana": "みょうこうこうげん",
    "nameEn": "Myoko-Kogen",
    "lat": 36.8725757,
    "lng": 138.212362,
    "transfers": [
      "妙高はねうまライン",
      "しなの鉄道北しなの線"
    ],
    "address": "新潟県妙高市大字田口312",
    "platforms": {
      "inbound": "上りホーム",
      "outbound": "下りホーム"
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
  }
];
