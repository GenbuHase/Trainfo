// 相鉄・JR直通線 Yahoo! 路線情報スクレイパー設定 (羽沢横浜国大 〜 新宿 全7駅)
module.exports = {
  lineId: 'sotetsu_jr_direct',
  name: '相鉄・JR直通線',
  stationsFilePath: 'src/data/lines/sotetsu_jr_direct/stations.ts',
  buildStationTimetablesFromTrips: true,
  outputPaths: {
    stationTimetables: 'src/data/lines/sotetsu_jr_direct/stationTimetables.json',
    globalTimetable: 'src/data/lines/sotetsu_jr_direct/globalTimetable.json',
  },
  stations: [
    { id: 'SO-51', name: '羽沢横浜国大', yahooStationId: '29682', inGroupId: '8120', outGroupId: null },
    { id: 'JS-15', name: '武蔵小杉', yahooStationId: '23345', inGroupId: '1051', outGroupId: '8121' },
    { id: 'JS-16', name: '西大井', yahooStationId: '22865', inGroupId: '1051', outGroupId: '8121' },
    { id: 'JS-17', name: '大崎', yahooStationId: '22559', inGroupId: '1061', outGroupId: '8121' },
    { id: 'JS-18', name: '恵比寿', yahooStationId: '22548', inGroupId: '1061', outGroupId: '1060' },
    { id: 'JS-19', name: '渋谷', yahooStationId: '22715', inGroupId: '1061', outGroupId: '1060' },
    { id: 'JS-20', name: '新宿', yahooStationId: '22741', inGroupId: null, outGroupId: '1060' },
  ],
  stationNameAliases: {
    '羽沢横浜国大': '羽沢横浜国大',
  },
  shouldExcludeTrip: (trainDetail) => {
    // 羽沢横浜国大 または 武蔵小杉 を通らない列車（りんかい線直通やりんかい線内折り返し等）は除外
    const names = (trainDetail.stopStation || []).map(s => s.stationName);
    const hasSotetsuDirect = names.some(n => n.includes('羽沢横浜国大') || n.includes('武蔵小杉'));
    return !hasSotetsuDirect;
  },
  trainTypeMap: {
    '各駅停車': 'local',
    '各停': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特急': 'limitedExp',
  },
  defaultCars: 10,
  baseSectionSeconds: {
    1: 960, // 羽沢横浜国大 -> 武蔵小杉 (16分)
    2: 300, // 武蔵小杉 -> 西大井 (5分)
    3: 180, // 西大井 -> 大崎 (3分)
    4: 180, // 大崎 -> 恵比寿 (3分)
    5: 120, // 恵比寿 -> 渋谷 (2分)
    6: 300, // 渋谷 -> 新宿 (5分)
  },
};
