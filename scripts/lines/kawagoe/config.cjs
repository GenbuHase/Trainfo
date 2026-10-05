// JR川越線 Yahoo! 路線情報スクレイパー設定 (大宮 〜 高麗川 全11駅)
const stations = [
  { id: 'JA-26', name: '大宮', yahooStationId: '21987', inGroupId: null, outGroupId: '1041' },
  { id: 'JA-27', name: '日進', yahooStationId: '22089', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-28', name: '西大宮', yahooStationId: '29640', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-29', name: '指扇', yahooStationId: '22043', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-30', name: '南古谷', yahooStationId: '22148', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-31', name: '川越', yahooStationId: '22012', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-32', name: '西川越', yahooStationId: '22095', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-33', name: '的場', yahooStationId: '22135', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-34', name: '笠幡', yahooStationId: '22001', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-35', name: '武蔵高萩', yahooStationId: '22152', inGroupId: '1040', outGroupId: '1041' },
  { id: 'JA-36', name: '高麗川', yahooStationId: '22038', inGroupId: '1040', outGroupId: null },
];

module.exports = {
  lineId: 'kawagoe',
  name: 'JR川越線',
  stationsFilePath: 'src/data/lines/kawagoe/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/kawagoe/stationTimetables.json',
    globalTimetable: 'src/data/lines/kawagoe/globalTimetable.json',
  },
  stations,
  stationNameAliases: {
    '日進(埼玉県)': '日進',
    '大宮(埼玉県)': '大宮',
  },
  trainTypeMap: {
    '普通': 'local',
    '各駅停車': 'local',
    '快速': 'rapid',
    '通勤快速': 'commuter',
    '特急': 'limitedExp',
  },
  defaultCars: 10,
  resolveCars: (trip) => {
    // 川越以西（川越〜高麗川）の列車（origin/destがJA-31〜JA-36）は4両、大宮方面は10両
    const originNum = parseInt(trip.originStationId.replace('JA-', ''), 10);
    const destNum = parseInt(trip.destinationStationId.replace('JA-', ''), 10);
    if (originNum >= 31 && destNum >= 31) {
      return 4;
    }
    return 10;
  },
  baseSectionSeconds: {
    26: 240, // 大宮 -> 日進
    27: 180, // 日進 -> 西大宮
    28: 180, // 西大宮 -> 指扇
    29: 240, // 指扇 -> 南古谷
    30: 240, // 南古谷 -> 川越
    31: 180, // 川越 -> 西川越
    32: 180, // 西川越 -> 的場
    33: 180, // 的場 -> 笠幡
    34: 240, // 笠幡 -> 武蔵高萩
    35: 240, // 武蔵高萩 -> 高麗川
  },
};
