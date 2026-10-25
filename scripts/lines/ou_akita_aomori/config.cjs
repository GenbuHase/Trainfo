const SHINKANSEN_NAMES = ['つばさ', 'やまびこ', 'こまち', 'はやぶさ', '新幹線'];
function isShinkansenName(name) {
  return SHINKANSEN_NAMES.some(token => (name || '').includes(token));
}
module.exports = {
  "lineId": "ou_akita_aomori",
  "name": "JR奥羽本線（秋田～青森）",
  "stationsFilePath": "src/data/lines/ou_akita_aomori/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ou_akita_aomori/stationTimetables.json",
    "globalTimetable": "src/data/lines/ou_akita_aomori/globalTimetable.json"
  },
  "stations": [
    {
      "id": "OAA-01",
      "name": "秋田",
      "yahooStationId": "21137",
      "inGroupId": null,
      "outGroupId": "341"
    },
    {
      "id": "OAA-02",
      "name": "泉外旭川",
      "yahooStationId": "29847",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-03",
      "name": "土崎",
      "yahooStationId": "21223",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-04",
      "name": "上飯島",
      "yahooStationId": "21178",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-05",
      "name": "追分",
      "yahooStationId": "21161",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-06",
      "name": "大久保",
      "yahooStationId": "21163",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-07",
      "name": "羽後飯塚",
      "yahooStationId": "21150",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-08",
      "name": "井川さくら",
      "yahooStationId": "29063",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-09",
      "name": "八郎潟",
      "yahooStationId": "21241",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-10",
      "name": "鯉川",
      "yahooStationId": "21194",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-11",
      "name": "鹿渡",
      "yahooStationId": "21177",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-12",
      "name": "森岳",
      "yahooStationId": "21260",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-13",
      "name": "北金岡",
      "yahooStationId": "21189",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-14",
      "name": "東能代",
      "yahooStationId": "21244",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-15",
      "name": "鶴形",
      "yahooStationId": "21224",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-16",
      "name": "富根",
      "yahooStationId": "21228",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-17",
      "name": "二ツ井",
      "yahooStationId": "21249",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-18",
      "name": "前山",
      "yahooStationId": "21253",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-19",
      "name": "鷹ノ巣",
      "yahooStationId": "21218",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-20",
      "name": "糠沢",
      "yahooStationId": "21236",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-21",
      "name": "早口",
      "yahooStationId": "21242",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-22",
      "name": "下川沿",
      "yahooStationId": "21208",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-23",
      "name": "大館",
      "yahooStationId": "21165",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-24",
      "name": "白沢",
      "yahooStationId": "21211",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-25",
      "name": "陣場",
      "yahooStationId": "21216",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-26",
      "name": "津軽湯の沢",
      "yahooStationId": "20723",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-27",
      "name": "碇ケ関",
      "yahooStationId": "20628",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-28",
      "name": "長峰",
      "yahooStationId": "20739",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-29",
      "name": "大鰐温泉",
      "yahooStationId": "20651",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-30",
      "name": "石川",
      "yahooStationId": "20629",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-31",
      "name": "弘前",
      "yahooStationId": "20758",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-32",
      "name": "撫牛子",
      "yahooStationId": "20733",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-33",
      "name": "川部",
      "yahooStationId": "20665",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-34",
      "name": "北常盤",
      "yahooStationId": "20669",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-35",
      "name": "浪岡",
      "yahooStationId": "20740",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-36",
      "name": "大釈迦",
      "yahooStationId": "20708",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-37",
      "name": "鶴ケ坂",
      "yahooStationId": "20726",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-38",
      "name": "津軽新城",
      "yahooStationId": "20718",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-39",
      "name": "新青森",
      "yahooStationId": "20698",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OAA-40",
      "name": "青森",
      "yahooStationId": "20619",
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
