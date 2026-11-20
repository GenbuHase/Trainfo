module.exports = {
  lineId: 'shinano_shinano',
  name: 'しなの鉄道線',
  stationsFilePath: 'src/data/lines/shinano_shinano/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/shinano_shinano/stationTimetables.json',
    globalTimetable: 'src/data/lines/shinano_shinano/globalTimetable.json',
  },
  stations: [
  {
    "id": "SR-01",
    "name": "軽井沢",
    "yahooStationId": "24163",
    "inGroupId": null,
    "outGroupId": "6711"
  },
  {
    "id": "SR-02",
    "name": "中軽井沢",
    "yahooStationId": "24273",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-03",
    "name": "信濃追分",
    "yahooStationId": "24210",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-04",
    "name": "御代田",
    "yahooStationId": "24340",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-05",
    "name": "平原",
    "yahooStationId": "24313",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-06",
    "name": "小諸",
    "yahooStationId": "24191",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-07",
    "name": "滋野",
    "yahooStationId": "24206",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-08",
    "name": "田中",
    "yahooStationId": "24256",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-09",
    "name": "大屋",
    "yahooStationId": "24142",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-10",
    "name": "信濃国分寺",
    "yahooStationId": "29386",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-11",
    "name": "上田",
    "yahooStationId": "24129",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-12",
    "name": "西上田",
    "yahooStationId": "24290",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-13",
    "name": "テクノさかき",
    "yahooStationId": "29257",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-14",
    "name": "坂城",
    "yahooStationId": "24193",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-15",
    "name": "戸倉",
    "yahooStationId": "24269",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-16",
    "name": "千曲",
    "yahooStationId": "29663",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-17",
    "name": "屋代",
    "yahooStationId": "24348",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-18",
    "name": "屋代高校前",
    "yahooStationId": "29349",
    "inGroupId": "6710",
    "outGroupId": "6711"
  },
  {
    "id": "SR-19",
    "name": "篠ノ井",
    "yahooStationId": "24225",
    "inGroupId": "6710",
    "outGroupId": "761"
  },
  {
    "id": "SR-20",
    "name": "今井",
    "yahooStationId": "29211",
    "inGroupId": "760",
    "outGroupId": "761"
  },
  {
    "id": "SR-21",
    "name": "川中島",
    "yahooStationId": "24166",
    "inGroupId": "760",
    "outGroupId": "761"
  },
  {
    "id": "SR-22",
    "name": "安茂里",
    "yahooStationId": "24106",
    "inGroupId": "760",
    "outGroupId": "761"
  },
  {
    "id": "SR-23",
    "name": "長野",
    "yahooStationId": "24282",
    "inGroupId": "760",
    "outGroupId": null
  }
],
  stationNameAliases: {},
  trainTypeMap: {
  "特別快速": "special_rapid",
  "しなのサンライズ": "special_rapid",
  "しなのサンセット": "special_rapid",
  "快速": "rapid",
  "ろくもん": "limited_exp",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: ["rapid","special_rapid"],
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: (trainDetail) => {
    const proper = new Set([
      '軽井沢', '中軽井沢', '信濃追分', '御代田', '平原', '小諸', '滋野', '田中', '大屋',
      '信濃国分寺', '上田', '西上田', 'テクノさかき', '坂城', '戸倉', '千曲', '屋代', '屋代高校前'
    ]);
    const stops = trainDetail.stopStation || [];
    return !stops.some(s => proper.has((s.stationName || '').replace(/\([^)]+\)$/, '')));
  },
  defaultCars: 3,
  baseSectionSeconds: {
  "1": 240,
  "2": 240,
  "3": 390,
  "4": 330,
  "5": 240,
  "6": 390,
  "7": 240,
  "8": 210,
  "9": 150,
  "10": 180,
  "11": 300,
  "12": 210,
  "13": 150,
  "14": 300,
  "15": 150,
  "16": 180,
  "17": 120,
  "18": 210,
  "19": 120,
  "20": 150,
  "21": 150,
  "22": 180
},
};
