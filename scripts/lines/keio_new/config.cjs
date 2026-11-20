module.exports = {
  lineId: 'keio_new',
  name: '京王新線',
  stationsFilePath: 'src/data/lines/keio_new/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keio_new/stationTimetables.json',
    globalTimetable: 'src/data/lines/keio_new/globalTimetable.json',
  },
  stations: [
  {
    "id": "KON-01",
    "name": "新宿",
    "yahooStationId": "22741",
    "inGroupId": null,
    "outGroupId": "3031"
  },
  {
    "id": "KON-02",
    "name": "初台",
    "yahooStationId": "22907",
    "inGroupId": "3030",
    "outGroupId": "3031"
  },
  {
    "id": "KON-03",
    "name": "幡ケ谷",
    "yahooStationId": "22903",
    "inGroupId": "3030",
    "outGroupId": "3031"
  },
  {
    "id": "KON-04",
    "name": "笹塚",
    "yahooStationId": "22699",
    "inGroupId": "3030",
    "outGroupId": null
  }
],
  stationNameAliases: {
    '新鎌ケ谷': '新鎌ヶ谷',
    '空港第２ビル': '空港第2ビル',
    '幡ケ谷': '幡ヶ谷',
    '長者ケ浜潮騒はまなす公園前': '長者ヶ浜潮騒はまなす公園前',
  },
  trainTypeMap: {
  "京王ライナー": "liner",
  "Mt.TAKAO": "liner",
  "特急": "limited_exp",
  "準特急": "limited_exp",
  "急行": "express",
  "区間急行": "section_exp",
  "快速": "rapid",
  "各駅停車": "local",
  "普通": "local"
},
  preserveAllStopsTypes: [],
  buildStationTimetablesFromTrips: true,
  shouldExcludeTrip: (trainDetail) => {
    const stops = (trainDetail.stopStation || []).map(s => s.stationName);
    return !stops.some(n => n.includes('初台') || n.includes('幡ケ谷') || n.includes('幡ヶ谷'));
  },
  defaultCars: 10,
  baseSectionSeconds: {
  "1": 180,
  "2": 90,
  "3": 90
},
};
