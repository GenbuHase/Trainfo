module.exports = {
  lineId: 'keisei_narita_sky_access',
  name: '京成成田スカイアクセス線',
  stationsFilePath: 'src/data/lines/keisei_narita_sky_access/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/keisei_narita_sky_access/stationTimetables.json',
    globalTimetable: 'src/data/lines/keisei_narita_sky_access/globalTimetable.json',
  },
  stations: [
  {
    "id": "KSSA-01",
    "name": "京成高砂",
    "yahooStationId": "22665",
    "inGroupId": null,
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-02",
    "name": "東松戸",
    "yahooStationId": "22416",
    "inGroupId": "3010",
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-03",
    "name": "新鎌ケ谷",
    "yahooStationId": "22326",
    "inGroupId": "3010",
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-04",
    "name": "千葉ニュータウン中央",
    "yahooStationId": "22365",
    "inGroupId": "3010",
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-05",
    "name": "印旛日本医大",
    "yahooStationId": "29322",
    "inGroupId": "3010",
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-06",
    "name": "成田湯川",
    "yahooStationId": "29673",
    "inGroupId": "3010",
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-07",
    "name": "空港第２ビル",
    "yahooStationId": "22267",
    "inGroupId": "3010",
    "outGroupId": "3011"
  },
  {
    "id": "KSSA-08",
    "name": "成田空港",
    "yahooStationId": "22392",
    "inGroupId": "3010",
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
  "スカイライナー": "limited_exp",
  "モーニングライナー": "limited_exp",
  "イブニングライナー": "limited_exp",
  "イブニング": "limited_exp",
  "モーニング": "limited_exp",
  "ライナー": "limited_exp",
  "アクセス特急": "access_exp",
  "エアポート快特": "rapid_exp",
  "快速特急": "rapid_exp",
  "快特": "rapid_exp",
  "通勤特急": "commuter_limited_exp",
  "特急": "express",
  "快速": "rapid",
  "急行": "rapid",
  "普通": "local",
  "各駅停車": "local"
},
  preserveAllStopsTypes: [],
  buildStationTimetablesFromTrips: true,
  boundaryPassingRules: [
    {
      boundaryStationId: 'KSSA-01',
      throughStations: ['青砥', '日暮里', '京成上野', '押上', '京成立石', '四ツ木'],
    },
  ],
  shouldExcludeTrip: (trainDetail) => {
    const disp = (trainDetail.displayName || '') + (trainDetail.trainType || '');
    const stops = (trainDetail.stopStation || []).map(s => s.stationName);
    if (stops.some(n => n.includes('成田湯川'))) return false;
    if (disp.includes('スカイライナー') && stops.some(n => n.includes('空港第')) && !stops.some(n => n.includes('京成成田') || n.includes('京成船橋'))) {
      return false;
    }
    return true;
  },
  defaultCars: 8,
  baseSectionSeconds: {
  "1": 600,
  "2": 420,
  "3": 870,
  "4": 660,
  "5": 660,
  "6": 780,
  "7": 60
},
};
