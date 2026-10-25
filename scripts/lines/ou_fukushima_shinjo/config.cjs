const SHINKANSEN_NAMES = ['つばさ', 'やまびこ', 'こまち', 'はやぶさ', '新幹線'];
function isShinkansenName(name) {
  return SHINKANSEN_NAMES.some(token => (name || '').includes(token));
}
module.exports = {
  "lineId": "ou_fukushima_shinjo",
  "name": "JR奥羽本線（福島～新庄）",
  "stationsFilePath": "src/data/lines/ou_fukushima_shinjo/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ou_fukushima_shinjo/stationTimetables.json",
    "globalTimetable": "src/data/lines/ou_fukushima_shinjo/globalTimetable.json"
  },
  "stations": [
    {
      "id": "OFS-01",
      "name": "福島",
      "yahooStationId": "21551",
      "inGroupId": null,
      "outGroupId": "341"
    },
    {
      "id": "OFS-02",
      "name": "笹木野",
      "yahooStationId": "21488",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-03",
      "name": "庭坂",
      "yahooStationId": "21533",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-04",
      "name": "板谷",
      "yahooStationId": "21287",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-05",
      "name": "峠",
      "yahooStationId": "21356",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-06",
      "name": "大沢",
      "yahooStationId": "21312",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-07",
      "name": "関根",
      "yahooStationId": "21340",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-08",
      "name": "米沢",
      "yahooStationId": "21396",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-09",
      "name": "置賜",
      "yahooStationId": "21310",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-10",
      "name": "高畠",
      "yahooStationId": "21345",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-11",
      "name": "赤湯",
      "yahooStationId": "21278",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-12",
      "name": "中川",
      "yahooStationId": "21358",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-13",
      "name": "羽前中山",
      "yahooStationId": "21301",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-14",
      "name": "かみのやま温泉",
      "yahooStationId": "21320",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-15",
      "name": "茂吉記念館前",
      "yahooStationId": "21390",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-16",
      "name": "蔵王",
      "yahooStationId": "21334",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-17",
      "name": "山形",
      "yahooStationId": "21392",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-18",
      "name": "北山形",
      "yahooStationId": "21324",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-19",
      "name": "羽前千歳",
      "yahooStationId": "21298",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-20",
      "name": "南出羽",
      "yahooStationId": "21384",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-21",
      "name": "漆山",
      "yahooStationId": "21309",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-22",
      "name": "高擶",
      "yahooStationId": "21344",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-23",
      "name": "天童南",
      "yahooStationId": "29746",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-24",
      "name": "天童",
      "yahooStationId": "21355",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-25",
      "name": "乱川",
      "yahooStationId": "21380",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-26",
      "name": "神町",
      "yahooStationId": "21339",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-27",
      "name": "さくらんぼ東根",
      "yahooStationId": "21318",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-28",
      "name": "東根",
      "yahooStationId": "21373",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-29",
      "name": "村山",
      "yahooStationId": "21348",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-30",
      "name": "袖崎",
      "yahooStationId": "21342",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-31",
      "name": "大石田",
      "yahooStationId": "21311",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-32",
      "name": "北大石田",
      "yahooStationId": "21323",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-33",
      "name": "芦沢",
      "yahooStationId": "21279",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-34",
      "name": "舟形",
      "yahooStationId": "21376",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OFS-35",
      "name": "新庄",
      "yahooStationId": "21338",
      "inGroupId": "340",
      "outGroupId": null
    }
  ],
  "stationNameAliases": {
    "福島(福島県)": "福島",
    "大沢(山形県)": "大沢",
    "中川(山形県)": "中川",
    "漆山(山形県)": "漆山",
    "村山(山形県)": "村山",
    "大曲(秋田県)": "大曲",
    "醍醐(秋田県)": "醍醐",
    "追分(秋田県)": "追分",
    "大久保(秋田県)": "大久保",
    "白沢(秋田県)": "白沢",
    "石川(奥羽本線)": "石川",
    "和田(秋田県)": "和田",
    "大滝(山形県)": "大滝"
  },
  "trainTypeMap": {
    "各駅停車": "regular",
    "普通": "regular",
    "快速": "rapid",
    "特急": "limitedExp",
    "つがる": "limitedExp",
    "リゾートしらかみ": "limitedExp"
  },
  "preserveAllStopsTypes": [
    "regular",
    "rapid",
    "limitedExp",
    "special_rapid"
  ],
  "defaultTrainType": "regular",
  "defaultCars": 4,
  "keepAllLineSegments": true,
  shouldExcludeDeparture: ({ rawKindName }) => isShinkansenName(rawKindName),
  shouldExcludeTrip: (trainDetail) => isShinkansenName(`${trainDetail.displayName || ''} ${trainDetail.guideComment || ''}`),
};
