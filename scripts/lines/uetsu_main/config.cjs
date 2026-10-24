// scripts/lines/uetsu_main/config.cjs
// JR羽越本線 Yahoo! 乗換案内 連携設定
//
// 【重要】yahooStationId / inGroupId / outGroupId は、Phase 3 にて
// https://transit.yahoo.co.jp/timetable/ から各駅の駅時刻表URLを確認し、
// URL中の駅IDおよびグループIDを設定してください。
// 羽越本線のグループIDパターン：上り(新津方面)=400、下り(酒田・秋田方面)=401
// 境界駅（新津・新発田）は、いずれか一方の方向のみを自路線で保持し、
// もう一方は直通先路線（信越本線・白新線）に委ねる（inGroupId: null または outGroupId: null）。
// 本ファイルは構造のスケルトンであり、Yahoo!データ連携は未完了です。

module.exports = {
  lineId: 'uetsu_main',
  name: 'JR羽越本線',
  stationsFilePath: 'src/data/lines/uetsu_main/stations.ts',
  outputPaths: {
    stationTimetables: 'src/data/lines/uetsu_main/stationTimetables.json',
    globalTimetable: 'src/data/lines/uetsu_main/globalTimetable.json',
  },
  stations: [
    // 新津駅は信越本線と共通駅（yahooStationId: 24037 既知）
    // 上り下り共に信越本線に委ねるため Yahoo! データはスキップし、
    // 直通運転リンカーで信越本線側からデータを引き継ぐ
    { id: 'UE-01', name: '新津', yahooStationId: 24037, inGroupId: null, outGroupId: null },
    { id: 'UE-02', name: '京ケ瀬', yahooStationId: 23967, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-03', name: '水原', yahooStationId: 24001, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-04', name: '神山', yahooStationId: 23962, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-05', name: '月岡', yahooStationId: 24010, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-06', name: '中浦', yahooStationId: 24027, inGroupId: 400, outGroupId: 401 },
    // 新発田駅は白新線と共通駅（yahooStationId: 23996 既知）
    // 上りは白新線に委ねるため inGroupId: null、下りは羽越本線専用
    { id: 'UE-07', name: '新発田', yahooStationId: 23996, inGroupId: null, outGroupId: 401 },
    { id: 'UE-08', name: '加治', yahooStationId: 23955, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-09', name: '金塚', yahooStationId: null, inGroupId: null, outGroupId: null },
    { id: 'UE-10', name: '中条', yahooStationId: 24028, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-11', name: '平木田', yahooStationId: 24059, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-12', name: '坂町', yahooStationId: 23989, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-13', name: '平林', yahooStationId: 24060, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-14', name: '岩船町', yahooStationId: 23907, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-15', name: '村上', yahooStationId: 24079, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-16', name: '間島', yahooStationId: 24070, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-17', name: '越後早川', yahooStationId: 23933, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-18', name: '桑川', yahooStationId: 23982, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-19', name: '今川', yahooStationId: 23904, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-20', name: '越後寒川', yahooStationId: 23924, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-21', name: '勝木', yahooStationId: 23966, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-22', name: '府屋', yahooStationId: 24061, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-23', name: '鼠ケ関', yahooStationId: 21367, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-24', name: '小岩川', yahooStationId: 21326, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-25', name: 'あつみ温泉', yahooStationId: 21280, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-26', name: '五十川', yahooStationId: 21290, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-27', name: '小波渡', yahooStationId: 21328, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-28', name: '三瀬', yahooStationId: 21333, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-29', name: '羽前水沢', yahooStationId: 21306, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-30', name: '羽前大山', yahooStationId: 21293, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-31', name: '鶴岡', yahooStationId: 21353, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-32', name: '藤島', yahooStationId: 21375, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-33', name: '西袋', yahooStationId: 21365, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-34', name: '余目', yahooStationId: 21282, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-35', name: '北余目', yahooStationId: 21322, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-36', name: '砂越', yahooStationId: 21332, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-37', name: '東酒田', yahooStationId: 21371, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-38', name: '酒田', yahooStationId: 21330, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-39', name: '本楯', yahooStationId: 21391, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-40', name: '南鳥海', yahooStationId: 21383, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-41', name: '遊佐', yahooStationId: 21395, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-42', name: '吹浦', yahooStationId: 21374, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-43', name: '女鹿', yahooStationId: 21389, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-44', name: '小砂川', yahooStationId: 21195, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-45', name: '上浜', yahooStationId: 21180, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-46', name: '象潟', yahooStationId: 21187, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-47', name: '金浦', yahooStationId: 21196, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-48', name: '仁賀保', yahooStationId: 21232, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-49', name: '西目', yahooStationId: 21235, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-50', name: '羽後本荘', yahooStationId: 21159, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-51', name: '羽後岩谷', yahooStationId: 21151, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-52', name: '折渡', yahooStationId: 21173, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-53', name: '羽後亀田', yahooStationId: 21154, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-54', name: '岩城みなと', yahooStationId: 29378, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-55', name: '道川', yahooStationId: 21256, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-56', name: '下浜', yahooStationId: 21209, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-57', name: '桂根', yahooStationId: 21176, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-58', name: '新屋', yahooStationId: 21144, inGroupId: 400, outGroupId: 401 },
    { id: 'UE-59', name: '羽後牛島', yahooStationId: 21152, inGroupId: 400, outGroupId: 401 },
    // 秋田駅は Yahoo! 駅ID 21137（既知）
    // 下りは奥羽本線に委ねるため outGroupId: null、上りは羽越本線専用
    // ※ 旧リストの UE-54「土崎」は奥羽本線の駅（羽越本線非経由）のため削除し、
    //   正規順序（Wikipedia 羽越本線路線図 243.7〜271.7 km）に再採番した
    { id: 'UE-60', name: '秋田', yahooStationId: 21137, inGroupId: 400, outGroupId: null },
  ],
  // 駅探路線コード（Phase 4 エンリッチメント用）
  // 羽越本線: 路線コード 154（https://ekitan.com/timetable/railway/line/35800 / line/35801）
  ekitanLineCode: 154,
  ekitanStationIndexMap: {
    // 駅探 URL から個別にインデックスを確認して追記（例: line-station/154-<idx>/<dir>）
    // 西目=154-48 は既知
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
    // 駅間暫定秒数（OSM実軌道取得後に実測値に差し替える）
    '1': 300, '2': 300, '3': 300, '4': 300, '5': 300, '6': 360,
    '7': 300, '8': 300, '9': 300, '10': 300, '11': 300, '12': 360,
    '13': 300, '14': 360, '15': 360, '16': 300, '17': 300, '18': 300,
    '19': 300, '20': 300, '21': 300, '22': 300, '23': 300, '24': 300,
    '25': 300, '26': 300, '27': 300, '28': 300, '29': 300, '30': 300,
    '31': 300, '32': 300, '33': 300, '34': 300, '35': 300, '36': 360,
    '37': 300, '38': 300, '39': 300, '40': 300, '41': 300, '42': 300,
    '43': 300, '44': 300, '45': 300, '46': 300, '47': 300, '48': 300,
    '49': 360, '50': 300, '51': 300, '52': 300, '53': 300, '54': 300,
    '55': 300, '56': 300, '57': 300, '58': 360, '59': 300, '60': 360,
  },
};
