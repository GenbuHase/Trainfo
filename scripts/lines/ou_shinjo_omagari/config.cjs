const SHINKANSEN_NAMES = ['つばさ', 'やまびこ', 'こまち', 'はやぶさ', '新幹線'];
function isShinkansenName(name) {
  return SHINKANSEN_NAMES.some(token => (name || '').includes(token));
}
module.exports = {
  "lineId": "ou_shinjo_omagari",
  "name": "JR奥羽本線（新庄～大曲）",
  "stationsFilePath": "src/data/lines/ou_shinjo_omagari/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ou_shinjo_omagari/stationTimetables.json",
    "globalTimetable": "src/data/lines/ou_shinjo_omagari/globalTimetable.json"
  },
  "stations": [
    {
      "id": "OSO-01",
      "name": "新庄",
      "yahooStationId": "21338",
      "inGroupId": null,
      "outGroupId": "341"
    },
    {
      "id": "OSO-02",
      "name": "泉田",
      "yahooStationId": "21286",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-03",
      "name": "羽前豊里",
      "yahooStationId": "21300",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-04",
      "name": "真室川",
      "yahooStationId": "21379",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-05",
      "name": "釜淵",
      "yahooStationId": "21319",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-06",
      "name": "大滝",
      "yahooStationId": "21313",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-07",
      "name": "及位",
      "yahooStationId": "21368",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-08",
      "name": "院内",
      "yahooStationId": "21148",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-09",
      "name": "横堀",
      "yahooStationId": "21270",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-10",
      "name": "三関",
      "yahooStationId": "21257",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-11",
      "name": "上湯沢",
      "yahooStationId": "21183",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-12",
      "name": "湯沢",
      "yahooStationId": "21267",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-13",
      "name": "下湯沢",
      "yahooStationId": "21210",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-14",
      "name": "十文字",
      "yahooStationId": "21213",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-15",
      "name": "醍醐",
      "yahooStationId": "21222",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-16",
      "name": "柳田",
      "yahooStationId": "21264",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-17",
      "name": "横手",
      "yahooStationId": "21269",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-18",
      "name": "後三年",
      "yahooStationId": "21200",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-19",
      "name": "飯詰",
      "yahooStationId": "21145",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OSO-20",
      "name": "大曲",
      "yahooStationId": "21168",
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
  "defaultCars": 2,
  "keepAllLineSegments": true,
  shouldExcludeDeparture: ({ rawKindName }) => isShinkansenName(rawKindName),
  shouldExcludeTrip: (trainDetail) => isShinkansenName(`${trainDetail.displayName || ''} ${trainDetail.guideComment || ''}`),
};
