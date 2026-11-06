// 特急あずさ・かいじ・富士回遊 ダイヤ補正・直通リンク整備スクリプト（宣言的設定駆動）
const path = require('path');
const {
  safeReadJson,
  safeWriteJson,
  applySymmetricCoupling,
  linkThroughTrips,
} = require('./common/timetableUtils.cjs');

const LINE_PATHS = {
  oito_east: path.resolve('src/data/lines/oito_east/globalTimetable.json'),
  shinonoi: path.resolve('src/data/lines/shinonoi/globalTimetable.json'),
  shinonoiSt: path.resolve('src/data/lines/shinonoi/stationTimetables.json'),
  chuo_main: path.resolve('src/data/lines/chuo_main/globalTimetable.json'),
  chuo: path.resolve('src/data/lines/chuo/globalTimetable.json'),
  chuo_sobu_local: path.resolve('src/data/lines/chuo_sobu_local/globalTimetable.json'),
  sobu_rapid: path.resolve('src/data/lines/sobu_rapid/globalTimetable.json'),
  fujikyu: path.resolve('src/data/lines/fujikyu/globalTimetable.json'),
};

// ============================================================================
// 宣言的設定 1: 白馬始発 あずさ38号 (大糸線 -> 篠ノ井線 -> 中央本線 -> 中央線快速)
// ============================================================================
const AZUSA_38_DEFS = [
  { trainId: '42025', isHoliday: false, prefix: 'WD' },
  { trainId: '42026', isHoliday: true, prefix: 'HD' },
];

const AZUSA_38_SHINONOI_STOPS = [
  { stationId: 'SN-06', arrivalTime: '14:47:00', departureTime: '14:50:00', isPassing: false },
  { stationId: 'SN-05', arrivalTime: '14:52:00', departureTime: '14:52:00', isPassing: true },
  { stationId: 'SN-04', arrivalTime: '14:53:30', departureTime: '14:53:30', isPassing: true },
  { stationId: 'SN-03', arrivalTime: '14:54:30', departureTime: '14:54:30', isPassing: true },
  { stationId: 'SN-02', arrivalTime: '14:56:00', departureTime: '14:56:00', isPassing: true },
  { stationId: 'SN-01', arrivalTime: '14:58:00', departureTime: '14:58:00', isPassing: true },
];

const AZUSA_38_CHUO_MAIN_PREFIX_STOPS = [
  { stationId: 'CO-61', arrivalTime: '14:58:00', departureTime: '14:58:00', isPassing: true },
  { stationId: 'CO-60', arrivalTime: '15:00:26', departureTime: '15:00:26', isPassing: true },
  { stationId: 'CO-59', arrivalTime: '15:04:30', departureTime: '15:04:30', isPassing: true },
  { stationId: 'CO-58', arrivalTime: '15:07:45', departureTime: '15:07:45', isPassing: true },
];

// ============================================================================
// 宣言的設定 2: 塩尻通過の下り特急あずさ9号・37号 (中央本線延伸 & 篠ノ井線新設)
// ============================================================================
const AZUSA_9_TIMES = {
  suwaDep: '11:17:00',
  shimosuwa: '11:20:15',
  okaya: '11:23:30',
  midoriko: '11:27:34',
  shiojiri: '11:30:00',
  hirooka: '11:32:00',
  murai: '11:33:30',
  hirata: '11:34:30',
  minamimatsumoto: '11:36:00',
  matsumotoArr: '11:39:00',
};

const AZUSA_37_TIMES = {
  suwaDep: '18:07:00',
  shimosuwa: '18:10:15',
  okaya: '18:13:30',
  midoriko: '18:17:34',
  shiojiri: '18:20:00',
  hirooka: '18:22:00',
  murai: '18:23:30',
  hirata: '18:24:30',
  minamimatsumoto: '18:26:00',
  matsumotoArr: '18:29:00',
};

const OUTBOUND_NONSTOP_SHIOJIRI_DEFS = [
  { trainId: '6862', isHoliday: false, trainNumber: '9M', trainName: 'あずさ9号', cmTripId: 'cm_WD_OUT_JC-05_0900_6862', snTripId: 'sn_WD_OUT_SN-01_1130_6862', times: AZUSA_9_TIMES },
  { trainId: '6861', isHoliday: true, trainNumber: '9M', trainName: 'あずさ9号', cmTripId: 'cm_HD_OUT_JC-05_0900_6861', snTripId: 'sn_HD_OUT_SN-01_1130_6861', times: AZUSA_9_TIMES },
  { trainId: '6864', isHoliday: false, trainNumber: '37M', trainName: 'あずさ37号', cmTripId: 'cm_WD_OUT_JC-05_1600_6864', snTripId: 'sn_WD_OUT_SN-01_1820_6864', times: AZUSA_37_TIMES },
  { trainId: '6863', isHoliday: true, trainNumber: '37M', trainName: 'あずさ37号', cmTripId: 'cm_HD_OUT_JC-05_1600_6863', snTripId: 'sn_HD_OUT_SN-01_1820_6863', times: AZUSA_37_TIMES },
];

// ============================================================================
// 宣言的設定 3: 個別列車のメタデータ・通過時刻補正ルールテーブル
// ============================================================================
const TRIP_METADATA_OVERRIDES = [
  // (A) あずさ1号 (6843): 富士回遊併結の名残による行先誤りを '松本' に補正
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6843'],
    metadata: { customOrigin: '新宿', customDestination: '松本' },
  },
  // (B) あずさ8号 休日 (6897): 東京行に補正
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6897'],
    isHoliday: true,
    metadata: { customOrigin: '松本', customDestination: '東京' },
  },
  // (C) あずさ44号 平日 (6926)
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6926'],
    isHoliday: false,
    metadata: { trainName: 'あずさ44号', customOrigin: '松本', customDestination: '新宿' },
  },
  // (D-1) あずさ78号 休日 (6925): 高尾・西八王子通過時刻および公式列車番号補正
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6925'],
    isHoliday: true,
    metadata: { trainName: 'あずさ78号', trainNumber: '9078M', customOrigin: '松本', customDestination: '新宿' },
    stopOverrides: {
      'JC-24': { arrivalTime: '17:47:23', departureTime: '17:47:23', isPassing: true },
      'JC-23': { arrivalTime: '17:49:42', departureTime: '17:49:42', isPassing: true },
    },
  },
  // (D-2) 富士回遊78号 休日 (39448): あずさ78号と高尾・西八王子通過時刻を完全一致
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['39448'],
    isHoliday: true,
    metadata: { trainName: '富士回遊78号', trainNumber: '9178M', customOrigin: '河口湖', customDestination: '新宿' },
    stopOverrides: {
      'JC-24': { arrivalTime: '17:47:23', departureTime: '17:47:23', isPassing: true },
      'JC-23': { arrivalTime: '17:49:42', departureTime: '17:49:42', isPassing: true },
    },
  },
  // (D-3) あずさ44号 休日 (6927)
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6927'],
    isHoliday: true,
    metadata: { trainName: 'あずさ44号', trainNumber: '44M', customOrigin: '松本', customDestination: '新宿' },
    stopOverrides: {
      'JC-24': { arrivalTime: '18:06:52', departureTime: '18:06:52', isPassing: true },
    },
  },
  // (D-4) 富士回遊44号 (39450 / 39449)
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['39450', '39449'],
    metadata: { trainName: '富士回遊44号', trainNumber: '2144M', customOrigin: '河口湖', customDestination: '新宿' },
    stopOverrides: {
      'JC-24': { arrivalTime: '18:06:52', departureTime: '18:06:52', isPassing: true },
    },
  },
  // (E-1) あずさ88号 (6918)
  {
    lines: ['chuo_main'],
    trainIds: ['6918'],
    metadata: { trainName: 'あずさ88号' },
    stopOverrides: {
      'JC-24': { arrivalTime: '21:53:57', departureTime: '21:53:57', isPassing: true },
    },
  },
  // (E-2) かいじ58号 (33564 / 33563)
  {
    lines: ['chuo_main'],
    trainIds: ['33564', '33563'],
    metadata: { trainName: 'かいじ58号' },
  },
  // (E-3) あずさ60号 (6909 / 6908)
  {
    lines: ['chuo_main'],
    trainIds: ['6909', '6908'],
    metadata: { trainName: 'あずさ60号' },
    stopOverrides: {
      'JC-24': { arrivalTime: '22:08:53', departureTime: '22:08:53', isPassing: true },
    },
  },
  // (F) 普通列車445M (6891 / 6892) の誤愛称クリーンアップ
  {
    lines: ['chuo_main', 'shinonoi'],
    trainIds: ['6891', '6892'],
    onlyNonLimitedExp: true,
    deleteTrainName: true,
  },
  // (G) あずさ1号・あずさ75号の列車番号および愛称の整合
  {
    lines: ['chuo', 'chuo_main'],
    trainIds: ['6842'],
    metadata: { trainName: 'あずさ1号', trainNumber: '1M' },
  },
  {
    lines: ['chuo', 'chuo_main'],
    trainIds: ['6848'],
    metadata: { trainName: 'あずさ75号', trainNumber: '8075M' },
  },
  // (H) かいじ・富士回遊の愛称および公式列車番号の正常化（あずさ誤感染の完全解消）
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['33552', '33570'],
    metadata: { trainName: 'かいじ32号', trainNumber: '3132M', customOrigin: '甲府', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['39443', '39442'],
    metadata: { trainName: '富士回遊32号', trainNumber: '2132M', customOrigin: '河口湖', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['33553', '33571'],
    metadata: { trainName: 'かいじ36号', trainNumber: '3136M', customOrigin: '甲府', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['39444', '39445'],
    metadata: { trainName: '富士回遊36号', trainNumber: '2136M', customOrigin: '河口湖', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['33572', '33573'],
    metadata: { trainName: 'かいじ40号', trainNumber: '3140M', customOrigin: '甲府', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['33557', '33574'],
    metadata: { trainName: 'かいじ48号', trainNumber: '3148M', customOrigin: '甲府', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['39451', '39453'],
    metadata: { trainName: '富士回遊48号', trainNumber: '2148M', customOrigin: '河口湖', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6912', '6913'],
    metadata: { trainName: 'あずさ34号', trainNumber: '34M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6923'],
    metadata: { trainName: 'あずさ74号', trainNumber: '8074M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6917'],
    metadata: { trainName: 'あずさ76号', trainNumber: '9076M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6904', '6905'],
    metadata: { trainName: 'あずさ42号', trainNumber: '42M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6928'],
    metadata: { trainName: 'あずさ84号', trainNumber: '9084M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6916'],
    metadata: { trainName: 'あずさ86号', trainNumber: '9086M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6918'],
    metadata: { trainName: 'あずさ88号', trainNumber: '9088M', customOrigin: '松本', customDestination: '新宿' },
  },
  {
    lines: ['chuo_main', 'chuo'],
    trainIds: ['6908', '6909'],
    metadata: { trainName: 'あずさ60号', trainNumber: '60M', customOrigin: '松本', customDestination: '新宿' },
  },
];

// トリップ間 stops 完全同期ルール（併結相方の正常な stops をコピー）
const TRIP_STOPS_SYNC_RULES = [
  { line: 'chuo', isHoliday: true, sourceTrainId: '39448', targetTrainId: '6925' },
];

// ============================================================================
// 宣言的設定 4: 千葉始発 あずさ3号 & 富士回遊3号 併結直通チェーン定義
// ============================================================================
const CHIBA_AZUSA_FUJI_CHAINS = [
  {
    label: '平日',
    isHoliday: false,
    cslAzusaId: '39504',
    cslAzusaTripId: 'WD_INB_JB-39_0638_39504',
    cslFujiId: '39506',
    cslFujiTripId: 'WD_INB_JB-39_0638_39506',
    chuoAzusaId: '39459',
    chuoAzusaTripId: 'WD_OUT_JC-05_0730_39459',
    cmAzusaTripId: 'cm_WD_OUT_JC-05_0730_39459',
    snAzusaTripId: 'WD_OUT_SN-01_1014_39459',
    chuoFujiId: '39461',
    chuoFujiTripId: 'WD_OUT_JC-05_0730_39461',
    cmFujiTripId: 'cm_WD_OUT_JC-05_0730_39461',
    fjFujiId: '39586',
    fjFujiTripId: 'WD_OUT_FJ-01_0840_39586',
    takaoPassTime: '08:07:18',
  },
  {
    label: '休日',
    isHoliday: true,
    cslAzusaId: '39503',
    cslAzusaTripId: 'HD_INB_JB-39_0638_39503',
    cslFujiId: '39505',
    cslFujiTripId: 'HD_INB_JB-39_0638_39505',
    chuoAzusaId: '39458',
    chuoAzusaTripId: 'HD_OUT_JC-05_0730_39458',
    cmAzusaTripId: 'cm_HD_OUT_JC-05_0730_39458',
    snAzusaTripId: 'HD_OUT_SN-01_1014_39458',
    chuoFujiId: '39460',
    chuoFujiTripId: 'HD_OUT_JC-05_0730_39460',
    cmFujiTripId: 'cm_HD_OUT_JC-05_0730_39460',
    fjFujiId: '39585',
    fjFujiTripId: 'HD_OUT_FJ-01_0840_39585',
    takaoPassTime: '08:06:27',
  },
];

// 宣言的設定 5: あずさ50号（上り 松本発 新宿経由 千葉行）
const AZUSA_50_CHAINS = [
  { isHoliday: false, chuoTripId: 'WD_INB_JC-22_1933_39462', srTripId: 'WD_OUT_JO-22_2027_39556' },
  { isHoliday: true, chuoTripId: 'HD_INB_JC-22_1936_39463', srTripId: 'HD_OUT_JO-22_2027_39557' },
];

/**
 * 列車IDまたはtripIdサフィックスによるトリップ一致判定
 */
function matchesTrainId(trip, trainId) {
  return trip.trainId === trainId || Boolean(trip.tripId && trip.tripId.includes(trainId));
}

function enrichAzusaTimetable() {
  const lineData = {
    oito_east: safeReadJson(LINE_PATHS.oito_east),
    shinonoi: safeReadJson(LINE_PATHS.shinonoi),
    chuo_main: safeReadJson(LINE_PATHS.chuo_main),
    chuo: safeReadJson(LINE_PATHS.chuo),
    chuo_sobu_local: safeReadJson(LINE_PATHS.chuo_sobu_local),
    sobu_rapid: safeReadJson(LINE_PATHS.sobu_rapid),
    fujikyu: safeReadJson(LINE_PATHS.fujikyu),
  };
  const shinonoiSt = safeReadJson(LINE_PATHS.shinonoiSt, {});

  console.log('=== 特急あずさ ダイヤ補完・エンリッチメント開始 ===\n');

  // --------------------------------------------------------------------------
  // 1. 特急あずさ38号（白馬発 新宿行）の修正
  // --------------------------------------------------------------------------
  console.log('--- 1. 特急あずさ38号（白馬発 新宿行）の修正 ---');
  for (const { trainId, isHoliday, prefix } of AZUSA_38_DEFS) {
    const oitoTripId = `${prefix}_INB_OIE-29_1343_${trainId}`;
    const shinonoiTripId = `sn_${prefix}_INB_SN-06_1450_${trainId}`;
    const chuoMainTripId = `cm_${prefix}_INB_CO-61_1458_${trainId}`;
    const chuoTripId = `${prefix}_INB_CO-57_1512_${trainId}`;

    const oitoTrip = lineData.oito_east.find((t) => t.tripId === oitoTripId || t.trainId === trainId);
    if (oitoTrip) {
      oitoTrip.destinationStationId = 'OIE-01';
      oitoTrip.customOrigin = '白馬';
      oitoTrip.customDestination = '新宿';
      oitoTrip.throughTripId = shinonoiTripId;
      oitoTrip.throughLineId = 'shinonoi';
      console.log(`  ✓ oito_east ${oitoTripId} を更新 (through -> ${shinonoiTripId})`);
    }

    const snTripData = {
      tripId: shinonoiTripId,
      lineId: 'shinonoi',
      trainId,
      trainNumber: '38M',
      trainName: 'あずさ38号',
      trainType: 'limitedExp',
      direction: 'inbound',
      originStationId: 'SN-06',
      destinationStationId: 'SN-01',
      customOrigin: '白馬',
      customDestination: '新宿',
      cars: 9,
      isHoliday,
      stops: JSON.parse(JSON.stringify(AZUSA_38_SHINONOI_STOPS)),
      throughTripId: chuoMainTripId,
      throughLineId: 'chuo_main',
    };
    const snExistingIdx = lineData.shinonoi.findIndex((t) => t.tripId === shinonoiTripId || t.trainId === trainId);
    if (snExistingIdx !== -1) lineData.shinonoi[snExistingIdx] = snTripData;
    else lineData.shinonoi.push(snTripData);
    console.log(`  ✓ shinonoi ${shinonoiTripId} を新設/更新`);

    const dayKey = isHoliday ? 'holiday' : 'weekday';
    const matsumoto = shinonoiSt[dayKey]?.['SN-06'];
    if (matsumoto) {
      matsumoto.inbound = (matsumoto.inbound || []).filter((d) => d.trainId !== trainId && d.no !== '38M');
      matsumoto.inbound.push({
        h: 14,
        m: 50,
        time: '50',
        sec: 14 * 3600 + 50 * 60,
        t: 'limitedExp',
        d: '新宿',
        no: '38M',
        trainId,
        track: '1',
      });
      matsumoto.inbound.sort((a, b) => a.sec - b.sec);
    }

    const oldChuoMainId = `cm_${prefix}_INB_CO-57_1512_${trainId}`;
    const cmIdx = lineData.chuo_main.findIndex((t) => t.tripId === oldChuoMainId || t.tripId === chuoMainTripId || t.trainId === trainId);
    if (cmIdx !== -1) {
      const existingTrip = lineData.chuo_main[cmIdx];
      const suwaAndAfter = existingTrip.stops.filter((s) => !['CO-61', 'CO-60', 'CO-59', 'CO-58'].includes(s.stationId));
      lineData.chuo_main[cmIdx] = {
        ...existingTrip,
        tripId: chuoMainTripId,
        trainId,
        trainNumber: '38M',
        trainName: 'あずさ38号',
        trainType: 'limitedExp',
        direction: 'inbound',
        originStationId: 'CO-61',
        destinationStationId: 'JC-24',
        customOrigin: '白馬',
        customDestination: '新宿',
        cars: 9,
        isHoliday,
        stops: [...JSON.parse(JSON.stringify(AZUSA_38_CHUO_MAIN_PREFIX_STOPS)), ...suwaAndAfter],
        throughTripId: chuoTripId,
        throughLineId: 'chuo',
      };
      console.log(`  ✓ chuo_main ${chuoMainTripId} を更新 (塩尻〜下諏訪を追加)`);
    }

    const chuoTrip = lineData.chuo.find((t) => t.tripId === chuoTripId || t.trainId === trainId);
    if (chuoTrip) {
      chuoTrip.customOrigin = '白馬';
      chuoTrip.customDestination = '新宿';
      chuoTrip.throughTripId = chuoMainTripId;
      chuoTrip.throughLineId = 'chuo_main';
      console.log(`  ✓ chuo ${chuoTripId} を更新 (customOrigin: 白馬, through -> ${chuoMainTripId})`);
    }
  }

  // --------------------------------------------------------------------------
  // 2. 下り塩尻通過特急あずさ9号・37号の延伸
  // --------------------------------------------------------------------------
  console.log('\n--- 2. 下り塩尻通過特急あずさ9号・37号の延伸 ---');
  for (const def of OUTBOUND_NONSTOP_SHIOJIRI_DEFS) {
    const { trainId, isHoliday, trainNumber, trainName, cmTripId, snTripId, times } = def;
    const cmTrip = lineData.chuo_main.find((t) => t.tripId === cmTripId || t.trainId === trainId);
    if (cmTrip) {
      cmTrip.destinationStationId = 'CO-61';
      cmTrip.customOrigin = '新宿';
      cmTrip.customDestination = '松本';
      cmTrip.trainName = trainName;
      cmTrip.throughTripId = snTripId;
      cmTrip.throughLineId = 'shinonoi';

      const stops = cmTrip.stops.filter((s) => !['CO-58', 'CO-59', 'CO-60', 'CO-61'].includes(s.stationId));
      stops.push(
        { stationId: 'CO-58', arrivalTime: times.shimosuwa, departureTime: times.shimosuwa, isPassing: true },
        { stationId: 'CO-59', arrivalTime: times.okaya, departureTime: times.okaya, isPassing: true },
        { stationId: 'CO-60', arrivalTime: times.midoriko, departureTime: times.midoriko, isPassing: true },
        { stationId: 'CO-61', arrivalTime: times.shiojiri, departureTime: times.shiojiri, isPassing: true }
      );
      cmTrip.stops = stops;
      console.log(`  ✓ chuo_main ${cmTripId} を塩尻まで延伸 (through -> ${snTripId})`);
    }

    const snStops = [
      { stationId: 'SN-01', arrivalTime: times.shiojiri, departureTime: times.shiojiri, isPassing: true },
      { stationId: 'SN-02', arrivalTime: times.hirooka, departureTime: times.hirooka, isPassing: true },
      { stationId: 'SN-03', arrivalTime: times.murai, departureTime: times.murai, isPassing: true },
      { stationId: 'SN-04', arrivalTime: times.hirata, departureTime: times.hirata, isPassing: true },
      { stationId: 'SN-05', arrivalTime: times.minamimatsumoto, departureTime: times.minamimatsumoto, isPassing: true },
      { stationId: 'SN-06', arrivalTime: times.matsumotoArr, departureTime: times.matsumotoArr, isPassing: false },
    ];

    const snTripData = {
      tripId: snTripId,
      lineId: 'shinonoi',
      trainId,
      trainNumber,
      trainName,
      trainType: 'limitedExp',
      direction: 'outbound',
      originStationId: 'SN-01',
      destinationStationId: 'SN-06',
      customOrigin: '新宿',
      customDestination: '松本',
      cars: 9,
      isHoliday,
      stops: snStops,
      prevTripId: cmTripId,
      prevLineId: 'chuo_main',
    };
    const snExistingIdx = lineData.shinonoi.findIndex((t) => t.tripId === snTripId || t.trainId === trainId);
    if (snExistingIdx !== -1) lineData.shinonoi[snExistingIdx] = snTripData;
    else lineData.shinonoi.push(snTripData);
    console.log(`  ✓ shinonoi ${snTripId} を新設/更新 (松本着 ${times.matsumotoArr})`);
  }

  // --------------------------------------------------------------------------
  // 2-2. 宣言的ルールテーブルに基づく各便の行先・愛称・通過時刻補正
  // --------------------------------------------------------------------------
  console.log('\n--- 2-2. 各あずさ便の行先・愛称・通過時刻補正 ---');
  for (const rule of TRIP_METADATA_OVERRIDES) {
    for (const lineKey of rule.lines) {
      const trips = lineData[lineKey] || [];
      for (const trip of trips) {
        if (rule.isHoliday !== undefined && trip.isHoliday !== rule.isHoliday) continue;
        if (rule.onlyNonLimitedExp && trip.trainType === 'limitedExp') continue;
        if (!rule.trainIds.some((id) => matchesTrainId(trip, id))) continue;

        if (rule.deleteTrainName) delete trip.trainName;
        if (rule.deleteCoupling) delete trip.coupling;
        if (rule.metadata) {
          Object.assign(trip, rule.metadata);
        }
        if (rule.stopOverrides && Array.isArray(trip.stops)) {
          for (const [stationId, override] of Object.entries(rule.stopOverrides)) {
            const stop = trip.stops.find((s) => s.stationId === stationId);
            if (stop) Object.assign(stop, override);
          }
        }
      }
    }
  }

  for (const syncRule of TRIP_STOPS_SYNC_RULES) {
    const trips = lineData[syncRule.line] || [];
    const srcTrip = trips.find((t) => t.isHoliday === syncRule.isHoliday && matchesTrainId(t, syncRule.sourceTrainId));
    const dstTrip = trips.find((t) => t.isHoliday === syncRule.isHoliday && matchesTrainId(t, syncRule.targetTrainId));
    if (srcTrip && dstTrip) {
      dstTrip.stops = JSON.parse(JSON.stringify(srcTrip.stops));
    }
  }

  // --------------------------------------------------------------------------
  // 3. 全上りあずさ号の始発駅（customOrigin）整備 & 篠ノ井線↔中央本線 相互直通リンク
  // --------------------------------------------------------------------------
  console.log('\n--- 3. 全上りあずさ号の始発駅 (customOrigin) 整備 ---');
  let cmUpdatedCount = 0;
  for (const trip of lineData.chuo_main) {
    if (trip.trainType === 'limitedExp' && trip.direction === 'inbound' && trip.originStationId === 'CO-61' && !trip.customOrigin) {
      trip.customOrigin = '松本';
      cmUpdatedCount++;
    }
  }
  console.log(`  ✓ chuo_main: ${cmUpdatedCount} 便の上りあずさに customOrigin: '松本' を設定`);

  let chUpdatedCount = 0;
  for (const trip of lineData.chuo) {
    if (trip.trainType === 'limitedExp' && trip.direction === 'inbound' && trip.customOrigin === '塩尻') {
      trip.customOrigin = '松本';
      chUpdatedCount++;
    }
  }
  console.log(`  ✓ chuo: ${chUpdatedCount} 便の上りあずさの customOrigin を '塩尻' から '松本' に更新`);

  let snInbUpdated = 0;
  let snOutUpdated = 0;

  for (const snTrip of lineData.shinonoi) {
    if (snTrip.trainType !== 'limitedExp' && !(snTrip.trainName && snTrip.trainName.includes('あずさ'))) continue;
    const isHoliday = snTrip.isHoliday;
    const yId = snTrip.trainId || (snTrip.tripId ? snTrip.tripId.split('_').pop() : '');
    if (!yId) continue;

    const matchedCm = lineData.chuo_main.find(
      (t) =>
        (t.trainId === yId || (t.tripId && t.tripId.endsWith(`_${yId}`))) &&
        t.direction === snTrip.direction &&
        t.isHoliday === isHoliday
    );
    if (!matchedCm) continue;

    const sharedName = snTrip.trainName || matchedCm.trainName;
    if (snTrip.direction === 'inbound') {
      if (!snTrip.customOrigin && snTrip.originStationId === 'SN-06') {
        snTrip.customOrigin = '松本';
      }
      linkThroughTrips(snTrip, 'shinonoi', matchedCm, 'chuo_main', {
        trainName: sharedName,
        customOrigin: snTrip.customOrigin || '松本',
        customDestination: matchedCm.customDestination || '新宿',
      });

      const snLast = snTrip.stops[snTrip.stops.length - 1];
      const cmFirst = matchedCm.stops[0];
      if (snLast && cmFirst) {
        const syncTime = snLast.arrivalTime || cmFirst.departureTime;
        snLast.arrivalTime = syncTime;
        snLast.departureTime = syncTime;
        cmFirst.arrivalTime = syncTime;
        cmFirst.departureTime = syncTime;
      }
      snInbUpdated++;
    } else if (snTrip.direction === 'outbound') {
      linkThroughTrips(matchedCm, 'chuo_main', snTrip, 'shinonoi', {
        trainName: sharedName,
        customOrigin: matchedCm.customOrigin || '新宿',
        customDestination: '松本',
      });

      const cmLast = matchedCm.stops[matchedCm.stops.length - 1];
      const snFirst = snTrip.stops[0];
      if (cmLast && snFirst) {
        const syncTime = cmLast.arrivalTime || snFirst.departureTime;
        cmLast.arrivalTime = syncTime;
        cmLast.departureTime = syncTime;
        snFirst.arrivalTime = syncTime;
        snFirst.departureTime = syncTime;
      }
      snOutUpdated++;
    }
  }
  console.log(`  ✓ shinonoi ↔ chuo_main: 上り ${snInbUpdated} 便、下り ${snOutUpdated} 便を相互直通リンク & 時刻同期`);

  // --------------------------------------------------------------------------
  // 4. 千葉発着あずさ号・富士回遊号（あずさ3号・富士回遊3号・あずさ50号）の直通リンク・併結整備
  // --------------------------------------------------------------------------
  console.log('\n--- 4. 千葉発着あずさ号・富士回遊号（あずさ3号・富士回遊3号・あずさ50号）の直通リンク・併結整備 ---');

  for (const chain of CHIBA_AZUSA_FUJI_CHAINS) {
    const cslAzusa = lineData.chuo_sobu_local.find((t) => t.tripId === chain.cslAzusaTripId || t.trainId === chain.cslAzusaId);
    const chuoAzusa = lineData.chuo.find((t) => t.tripId === chain.chuoAzusaTripId || t.trainId === chain.chuoAzusaId);
    const cmAzusa = lineData.chuo_main.find(
      (t) => t.tripId === chain.cmAzusaTripId || (t.trainId === chain.chuoAzusaId && t.direction === 'outbound' && t.isHoliday === chain.isHoliday)
    );
    const snAzusa = lineData.shinonoi.find(
      (t) => t.tripId === chain.snAzusaTripId || (t.trainId === chain.chuoAzusaId && t.direction === 'outbound' && t.isHoliday === chain.isHoliday)
    );

    const chuoFuji = lineData.chuo.find((t) => t.tripId === chain.chuoFujiTripId || t.trainId === chain.chuoFujiId);
    const cmFuji = lineData.chuo_main.find(
      (t) => t.tripId === chain.cmFujiTripId || (t.trainId === chain.chuoFujiId && t.direction === 'outbound' && t.isHoliday === chain.isHoliday)
    );
    const fjFuji = lineData.fujikyu.find(
      (t) => t.tripId === chain.fjFujiTripId || (t.trainId === chain.fjFujiId && t.isHoliday === chain.isHoliday)
    );

    if (!cslAzusa || !chuoAzusa) continue;

    // 1. あずさ3号 (千葉 -> 新宿 -> 高尾 -> 塩尻 -> 松本)
    const lastStop = cslAzusa.stops[cslAzusa.stops.length - 1];
    if (lastStop && lastStop.stationId === 'JB-10') {
      lastStop.departureTime = '07:30:00';
    }

    linkThroughTrips(cslAzusa, 'chuo_sobu_local', chuoAzusa, 'chuo', {
      trainName: 'あずさ3号',
      trainNumber: '5003M',
      customOrigin: '千葉',
      customDestination: '松本',
      cars: 9,
    });

    if (chain.takaoPassTime) {
      const chuoTakao = chuoAzusa.stops.find((s) => s.stationId === 'JC-24');
      if (chuoTakao) {
        chuoTakao.arrivalTime = chain.takaoPassTime;
        chuoTakao.departureTime = chain.takaoPassTime;
        chuoTakao.isPassing = true;
      }
    }

    if (cmAzusa) {
      linkThroughTrips(chuoAzusa, 'chuo', cmAzusa, 'chuo_main', {
        trainName: 'あずさ3号',
        trainNumber: '5003M',
        customOrigin: '千葉',
        customDestination: '松本',
        cars: 9,
      });

      if (chain.takaoPassTime) {
        const cmTakao = cmAzusa.stops.find((s) => s.stationId === 'JC-24') || cmAzusa.stops[0];
        if (cmTakao) {
          cmTakao.arrivalTime = chain.takaoPassTime;
          cmTakao.departureTime = chain.takaoPassTime;
          cmTakao.isPassing = true;
        }
      }

      if (snAzusa) {
        linkThroughTrips(cmAzusa, 'chuo_main', snAzusa, 'shinonoi', {
          trainName: 'あずさ3号',
          trainNumber: '5003M',
          customOrigin: '千葉',
          customDestination: '松本',
          cars: 9,
        });
      }
    }

    // 2. 富士回遊3号 千葉〜新宿トリップの復元注入とカップリング
    let cslFuji = lineData.chuo_sobu_local.find((t) => t.tripId === chain.cslFujiTripId);
    if (!cslFuji) {
      cslFuji = {
        ...JSON.parse(JSON.stringify(cslAzusa)),
        tripId: chain.cslFujiTripId,
        trainId: chain.cslFujiId,
        trainNumber: '2103M',
        trainName: '富士回遊3号',
        trainType: 'limitedExp',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        customOrigin: '千葉',
        customDestination: '河口湖',
        cars: 3,
        throughTripId: chuoFuji ? chuoFuji.tripId : chain.chuoFujiTripId,
        throughLineId: 'chuo',
      };
      lineData.chuo_sobu_local.push(cslFuji);
    } else {
      cslFuji.trainName = '富士回遊3号';
      cslFuji.trainNumber = '2103M';
      cslFuji.customOrigin = '千葉',
      cslFuji.customDestination = '河口湖';
      cslFuji.cars = 3;
      cslFuji.throughTripId = chuoFuji ? chuoFuji.tripId : chain.chuoFujiTripId;
      cslFuji.throughLineId = 'chuo';
    }

    applySymmetricCoupling(cslAzusa, cslFuji, {
      fromStationId: 'JB-39',
      toStationId: 'JB-10',
      primaryCars: 9,
      secondaryCars: 3,
      primaryDest: '松本',
      secondaryDest: '河口湖',
    });

    if (chuoFuji) {
      chuoFuji.trainNumber = '2103M';
      chuoFuji.trainName = '富士回遊3号';
      chuoFuji.prevTripId = chain.cslFujiTripId;
      chuoFuji.prevLineId = 'chuo_sobu_local';
      chuoFuji.customOrigin = '千葉';
      chuoFuji.customDestination = '河口湖';
      chuoFuji.cars = 3;
      if (chain.takaoPassTime) {
        const takao = chuoFuji.stops.find((s) => s.stationId === 'JC-24');
        if (takao) {
          takao.arrivalTime = chain.takaoPassTime;
          takao.departureTime = chain.takaoPassTime;
          takao.isPassing = true;
        }
      }
    }
    if (cmFuji) {
      cmFuji.customOrigin = '千葉';
      cmFuji.cars = 3;
      if (chain.takaoPassTime) {
        const takao = cmFuji.stops.find((s) => s.stationId === 'JC-24') || cmFuji.stops[0];
        if (takao) {
          takao.arrivalTime = chain.takaoPassTime;
          takao.departureTime = chain.takaoPassTime;
          takao.isPassing = true;
        }
      }
    }
    if (fjFuji) {
      fjFuji.customOrigin = '千葉';
      fjFuji.cars = 3;
    }

    console.log(`  ✓ ${chain.label} あずさ3号 & 富士回遊3号: 千葉始発の併結直通チェーン (千葉〜新宿〜大月〜松本/河口湖) を確立`);
  }

  for (const { chuoTripId, srTripId } of AZUSA_50_CHAINS) {
    const chuoTrip = lineData.chuo.find((t) => t.tripId === chuoTripId);
    const srTrip = lineData.sobu_rapid.find((t) => t.tripId === srTripId);
    if (chuoTrip && srTrip) {
      linkThroughTrips(chuoTrip, 'chuo', srTrip, 'sobu_rapid', {
        customOrigin: '松本',
        customDestination: '千葉',
      });
      console.log(`  ✓ あずさ50号 (${chuoTripId} -> ${srTripId}): 松本〜新宿〜千葉 直通リンクを確立`);
    }
  }

  // 5. ファイル保存
  for (const [key, trips] of Object.entries(lineData)) {
    safeWriteJson(LINE_PATHS[key], trips);
  }
  safeWriteJson(LINE_PATHS.shinonoiSt, shinonoiSt);

  console.log('\n✅ 全路線の globalTimetable.json および stationTimetables.json を正常に更新しました！');
}

module.exports = { enrichAzusaTimetable };

if (require.main === module) {
  enrichAzusaTimetable();
}
