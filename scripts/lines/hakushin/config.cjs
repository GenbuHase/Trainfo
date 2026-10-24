// scripts/lines/hakushin/config.cjs
// JR白新線 Yahoo! 乗換案内 連携設定
//
// 【重要】yahooStationId / inGroupId / outGroupId は、Phase 3 にて
// https://transit.yahoo.co.jp/timetable/ から各駅の駅時刻表URLを確認し、
// URL中の駅IDおよびグループIDを設定してください。
// 本ファイルは構造のスケルトンであり、Yahoo!データ連携は未完了です。

module.exports = {
  lineId: 'hakushin',
  name: 'JR白新線',
  stationsFilePath: 'src/data/lines/hakushin/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/hakushin/stationTimetables.json',
    globalTimetable: 'src/data/lines/hakushin/globalTimetable.json',
  },
  stations: [
    // 新潟駅は信越本線と共通駅（yahooStationId: 24033 既知）
    // 上りは信越本線に委ねるため inGroupId: null、下りは白新線専用
    { id: 'HS-01', name: '新潟', yahooStationId: 24033, inGroupId: null, outGroupId: 731 },
    { id: 'HS-02', name: '東新潟', yahooStationId: 24054, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-03', name: '大形', yahooStationId: 23941, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-04', name: '新崎', yahooStationId: 24036, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-05', name: '早通', yahooStationId: 24048, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-06', name: '豊栄', yahooStationId: 24022, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-07', name: '黒山', yahooStationId: 23981, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-08', name: '佐々木', yahooStationId: 23991, inGroupId: 730, outGroupId: 731 },
    { id: 'HS-09', name: '西新発田', yahooStationId: 24038, inGroupId: 730, outGroupId: 731 },
    // 新発田駅は羽越本線と共通駅（yahooStationId: 23996 既知）
    // 下りは羽越本線に委ねるため outGroupId: null、上りは白新線専用
    { id: 'HS-10', name: '新発田', yahooStationId: 23996, inGroupId: 730, outGroupId: null },
  ],
  // 駅探路線コード（Phase 4 エンリッチメント用）
  // 白新線: 路線コード 30（https://ekitan.com/timetable/railway/line/33301）
  // 駅インデックス例: 新潟=30-0, 新崎=30-3（line-station/30-<idx>/<dir> 形式）
  ekitanLineCode: 30,
  ekitanStationIndexMap: {
    'HS-01': 0,  // 新潟
    'HS-04': 3,  // 新崎
    // HS-02..HS-03, HS-05..HS-10 は駅探 URL から個別にインデックスを確認して追記
  },
  stationNameAliases: {},
  trainTypeMap: {
    '各駅停車': 'local',
    '普通': 'local',
    '快速': 'rapid',
    '特急いなほ': 'limitedExp',
    'いなほ': 'limitedExp',
    '特急': 'limitedExp',
  },
  defaultCars: 4,
  baseSectionSeconds: {
    '1': 300, // HS-01 新潟 -> HS-02 東新潟
    '2': 300, // HS-02 東新潟 -> HS-03 大形
    '3': 300, // HS-03 大形 -> HS-04 新崎
    '4': 300, // HS-04 新崎 -> HS-05 早通
    '5': 360, // HS-05 早通 -> HS-06 豊栄
    '6': 300, // HS-06 豊栄 -> HS-07 黒山
    '7': 300, // HS-07 黒山 -> HS-08 佐々木
    '8': 300, // HS-08 佐々木 -> HS-09 西新発田
    '9': 360, // HS-09 西新発田 -> HS-10 新発田
  },
};
