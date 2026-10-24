const SHINKANSEN_NAMES = ['つばさ', 'やまびこ', 'こまち', 'はやぶさ', '新幹線'];
function isShinkansenName(name) {
  return SHINKANSEN_NAMES.some(token => (name || '').includes(token));
}
module.exports = {
  "lineId": "ou_omagari_akita",
  "name": "JR奥羽本線（大曲～秋田）",
  "stationsFilePath": "src/data/lines/ou_omagari_akita/stations.ts",
  "outputPaths": {
    "stationTimetables": "src/data/lines/ou_omagari_akita/stationTimetables.json",
    "globalTimetable": "src/data/lines/ou_omagari_akita/globalTimetable.json"
  },
  "stations": [
    {
      "id": "OOA-01",
      "name": "大曲",
      "yahooStationId": "21168",
      "inGroupId": null,
      "outGroupId": "341"
    },
    {
      "id": "OOA-02",
      "name": "神宮寺",
      "yahooStationId": "21214",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-03",
      "name": "刈和野",
      "yahooStationId": "21185",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-04",
      "name": "峰吉川",
      "yahooStationId": "21258",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-05",
      "name": "羽後境",
      "yahooStationId": "21155",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-06",
      "name": "大張野",
      "yahooStationId": "21167",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-07",
      "name": "和田",
      "yahooStationId": "21277",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-08",
      "name": "四ツ小屋",
      "yahooStationId": "21272",
      "inGroupId": "340",
      "outGroupId": "341"
    },
    {
      "id": "OOA-09",
      "name": "秋田",
      "yahooStationId": "21137",
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
