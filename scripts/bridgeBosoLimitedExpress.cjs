// 房総特急（新宿さざなみ・新宿わかしお・さざなみ・わかしお・しおさい）ダイヤ補完＆直通リンクスクリプト（宣言的設定駆動）
const path = require('path');
const {
  safeReadJson,
  safeWriteJson,
  buildFullStops,
  linkThroughTrips,
} = require('./common/timetableUtils.cjs');

const LINE_PATHS = {
  chuo_sobu_local: path.resolve('src/data/lines/chuo_sobu_local/globalTimetable.json'),
  sobu_rapid: path.resolve('src/data/lines/sobu_rapid/globalTimetable.json'),
  uchibo: path.resolve('src/data/lines/uchibo/globalTimetable.json'),
  sotobo: path.resolve('src/data/lines/sotobo/globalTimetable.json'),
  keiyo: path.resolve('src/data/lines/keiyo/globalTimetable.json'),
  sobu_main: path.resolve('src/data/lines/sobu_main/globalTimetable.json'),
};

const CSL_STATION_IDS = Array.from({ length: 39 }, (_, i) => `JB-${(i + 1).toString().padStart(2, '0')}`);

// ============================================================================
// 宣言的設定 1: 新宿発着 房総臨時特急（新宿さざなみ・新宿わかしお）直通チェーン定義
// ============================================================================
const SHINJUKU_BOSO_EXPRESS_CHAINS = [
  // 1. 上り 新宿さざなみ2号 (14406) - 休日: 内房線(館山) -> 外房線(蘇我〜千葉) -> 中央総武線(千葉〜新宿)
  {
    trainId: '14406',
    trainNumber: '9046M',
    trainName: '新宿さざなみ2号',
    direction: 'inbound',
    isHoliday: true,
    cars: 5,
    customOrigin: '館山',
    customDestination: '新宿',
    logLabel: '上り 新宿さざなみ2号 (HD) 3線相互直通リンク完了 (館山 -> 蘇我 -> 千葉 -> 新宿)',
    clearKeiyoFromTripId: 'HD_INB_UB-22_1507_14406',
    segments: [
      { lineId: 'uchibo', tripId: 'HD_INB_UB-22_1507_14406', mustExist: true },
      {
        lineId: 'sotobo',
        tripId: 'HD_INB_SB-03_1625_14406',
        originStationId: 'SB-03',
        destinationStationId: 'SB-01',
        stops: [
          { stationId: 'SB-03', arrivalTime: '16:24:00', departureTime: '16:25:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '16:27:00', departureTime: '16:27:00', isPassing: true },
          { stationId: 'SB-01', arrivalTime: '16:30:00', departureTime: '16:31:00', isPassing: false },
        ],
      },
      {
        lineId: 'chuo_sobu_local',
        tripId: 'HD_INB_JB-39_1631_14406',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        cslKeyStops: [
          { stationId: 'JB-39', arrivalTime: '16:30:00', departureTime: '16:31:00' },
          { stationId: 'JB-31', arrivalTime: '16:43:00', departureTime: '16:44:00' },
          { stationId: 'JB-22', arrivalTime: '16:54:00', departureTime: '16:55:00' },
          { stationId: 'JB-10', arrivalTime: '17:12:00', departureTime: '17:12:00' },
        ],
      },
    ],
  },
  // 2. 上り 新宿さざなみ4号 (14408) - 休日: 内房線(館山, 佐貫町停車) -> 外房線(蘇我〜千葉) -> 中央総武線(千葉〜新宿)
  {
    trainId: '14408',
    trainNumber: '9048M',
    trainName: '新宿さざなみ4号',
    direction: 'inbound',
    isHoliday: true,
    cars: 5,
    customOrigin: '館山',
    customDestination: '新宿',
    logLabel: '上り 新宿さざなみ4号 (HD) 3線相互直通リンク完了 (館山 -> 蘇我 -> 千葉 -> 新宿)',
    clearKeiyoFromTripId: 'HD_INB_UB-22_1602_14408',
     segments: [
      {
        lineId: 'uchibo',
        tripId: 'HD_INB_UB-22_1602_14408',
        mustExist: true,
        stopOverrides: {
          'UB-15': { arrivalTime: '16:29:00', departureTime: '16:29:00', isPassing: true },
          'UB-14': { arrivalTime: '16:33:00', departureTime: '16:33:00', isPassing: true },
          'UB-13': { arrivalTime: '16:37:00', departureTime: '16:38:00', isPassing: false },
          'UB-12': { arrivalTime: '16:41:00', departureTime: '16:41:00', isPassing: true },
          'UB-11': { arrivalTime: '16:44:00', departureTime: '16:44:00', isPassing: true },
        },
      },
      {
        lineId: 'sotobo',
        tripId: 'HD_INB_SB-03_1719_14408',
        originStationId: 'SB-03',
        destinationStationId: 'SB-01',
        stops: [
          { stationId: 'SB-03', arrivalTime: '17:17:00', departureTime: '17:19:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '17:21:00', departureTime: '17:21:00', isPassing: true },
          { stationId: 'SB-01', arrivalTime: '17:23:00', departureTime: '17:24:00', isPassing: false },
        ],
      },
      {
        lineId: 'chuo_sobu_local',
        tripId: 'HD_INB_JB-39_1724_14408',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        cslKeyStops: [
          { stationId: 'JB-39', arrivalTime: '17:23:00', departureTime: '17:24:00' },
          { stationId: 'JB-31', arrivalTime: '17:37:00', departureTime: '17:38:00' },
          { stationId: 'JB-22', arrivalTime: '17:48:00', departureTime: '17:49:00' },
          { stationId: 'JB-10', arrivalTime: '18:07:00', departureTime: '18:07:00' },
        ],
      },
    ],
  },
  // 3. 上り 新宿わかしお2号 (14419) - 休日: 外房線(安房鴨川〜千葉) -> 中央総武線(千葉〜新宿)
  {
    trainId: '14419',
    trainNumber: '9056M',
    trainName: '新宿わかしお2号',
    direction: 'inbound',
    isHoliday: true,
    cars: 5,
    customOrigin: '安房鴨川',
    customDestination: '新宿',
    logLabel: '上り 新宿わかしお2号 (HD) 2線相互直通リンク完了 (安房鴨川 -> 千葉 -> 新宿)',
    segments: [
      { lineId: 'sotobo', tripId: 'HD_INB_SB-27_1617_14419', mustExist: true },
      {
        lineId: 'chuo_sobu_local',
        tripId: 'HD_INB_JB-39_1739_14419',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        cslKeyStops: [
          { stationId: 'JB-39', arrivalTime: '17:38:00', departureTime: '17:39:00' },
          { stationId: 'JB-31', arrivalTime: '17:50:00', departureTime: '17:51:00' },
          { stationId: 'JB-22', arrivalTime: '18:03:00', departureTime: '18:04:00' },
          { stationId: 'JB-10', arrivalTime: '18:23:00', departureTime: '18:23:00' },
        ],
      },
    ],
  },
  // 4. 下り 新宿さざなみ1号 (14399) - 休日: 中央総武線(新宿〜千葉) -> 外房線(千葉〜蘇我) -> 内房線(蘇我〜館山)
  {
    trainId: '14399',
    trainNumber: '9043M',
    trainName: '新宿さざなみ1号',
    direction: 'outbound',
    isHoliday: true,
    cars: 5,
    customOrigin: '新宿',
    customDestination: '館山',
    logLabel: '下り 新宿さざなみ1号 (HD) 3線相互直通リンク完了 (新宿 -> 千葉 -> 蘇我 -> 館山)',
    segments: [
      {
        lineId: 'chuo_sobu_local',
        tripId: 'HD_OUT_JB-10_0752_14399',
        originStationId: 'JB-10',
        destinationStationId: 'JB-39',
        cslKeyStops: [
          { stationId: 'JB-10', arrivalTime: '07:51:00', departureTime: '07:52:00' },
          { stationId: 'JB-22', arrivalTime: '08:09:00', departureTime: '08:10:00' },
          { stationId: 'JB-31', arrivalTime: '08:21:00', departureTime: '08:22:00' },
          { stationId: 'JB-39', arrivalTime: '08:35:00', departureTime: '08:37:00' },
        ],
      },
      {
        lineId: 'sotobo',
        tripId: 'HD_OUT_SB-01_0837_14399',
        originStationId: 'SB-01',
        destinationStationId: 'SB-03',
        stops: [
          { stationId: 'SB-01', arrivalTime: '08:35:00', departureTime: '08:37:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '08:40:00', departureTime: '08:40:00', isPassing: true },
          { stationId: 'SB-03', arrivalTime: '08:43:00', departureTime: '08:45:00', isPassing: false },
        ],
      },
      { lineId: 'uchibo', tripId: 'HD_OUT_UB-01_0845_14399', mustExist: true },
    ],
  },
  // 5. 下り 新宿さざなみ3号 (14400) - 休日: 中央総武線(新宿〜千葉) -> 外房線(千葉〜蘇我) -> 内房線(蘇我〜館山)
  {
    trainId: '14400',
    trainNumber: '9045M',
    trainName: '新宿さざなみ3号',
    direction: 'outbound',
    isHoliday: true,
    cars: 5,
    customOrigin: '新宿',
    customDestination: '館山',
    logLabel: '下り 新宿さざなみ3号 (HD) 3線相互直通リンク完了 (新宿 -> 千葉 -> 蘇我 -> 館山)',
    segments: [
      {
        lineId: 'chuo_sobu_local',
        tripId: 'HD_OUT_JB-10_0908_14400',
        originStationId: 'JB-10',
        destinationStationId: 'JB-39',
        cslKeyStops: [
          { stationId: 'JB-10', arrivalTime: '09:07:00', departureTime: '09:08:00' },
          { stationId: 'JB-22', arrivalTime: '09:24:00', departureTime: '09:25:00' },
          { stationId: 'JB-31', arrivalTime: '09:35:00', departureTime: '09:36:00' },
          { stationId: 'JB-39', arrivalTime: '09:50:00', departureTime: '09:52:00' },
        ],
      },
      {
        lineId: 'sotobo',
        tripId: 'HD_OUT_SB-01_0952_14400',
        originStationId: 'SB-01',
        destinationStationId: 'SB-03',
        stops: [
          { stationId: 'SB-01', arrivalTime: '09:50:00', departureTime: '09:52:00', isPassing: false },
          { stationId: 'SB-02', arrivalTime: '09:55:00', departureTime: '09:55:00', isPassing: true },
          { stationId: 'SB-03', arrivalTime: '09:58:00', departureTime: '10:01:00', isPassing: false },
        ],
      },
      { lineId: 'uchibo', tripId: 'HD_OUT_UB-01_1001_14400', mustExist: true },
    ],
  },
  // 6. 下り 新宿わかしお1号 (14414) - 休日: 中央総武線(新宿〜千葉) -> 外房線(千葉〜安房鴨川)
  {
    trainId: '14414',
    trainNumber: '9055M',
    trainName: '新宿わかしお1号',
    direction: 'outbound',
    isHoliday: true,
    cars: 5,
    customOrigin: '新宿',
    customDestination: '安房鴨川',
    logLabel: '下り 新宿わかしお1号 (HD) 2線相互直通リンク完了 (新宿 -> 千葉 -> 安房鴨川)',
    segments: [
      {
        lineId: 'chuo_sobu_local',
        tripId: 'HD_OUT_JB-10_0721_14414',
        originStationId: 'JB-10',
        destinationStationId: 'JB-39',
        cslKeyStops: [
          { stationId: 'JB-10', arrivalTime: '07:20:00', departureTime: '07:21:00' },
          { stationId: 'JB-22', arrivalTime: '07:38:00', departureTime: '07:39:00' },
          { stationId: 'JB-31', arrivalTime: '07:53:00', departureTime: '07:54:00' },
          { stationId: 'JB-39', arrivalTime: '08:06:00', departureTime: '08:10:00' },
        ],
      },
      { lineId: 'sotobo', tripId: 'HD_OUT_SB-01_0810_14414', mustExist: true },
    ],
  },
];

// ============================================================================
// 宣言的設定 2: 東京発着 定期房総特急（さざなみ・わかしお・しおさい）行先エンリッチルール
// ============================================================================
const REGULAR_BOSO_METADATA_RULES = [
  {
    lines: ['keiyo'],
    includeKeywords: ['さざなみ', 'わかしお'],
    excludeKeywords: ['新宿'],
    outboundOrigin: '東京',
    outboundDefaultDestByKeyword: { 'さざなみ': '君津', 'わかしお': '安房鴨川' },
    inboundDest: '東京',
  },
  {
    lines: ['uchibo', 'sotobo'],
    includeKeywords: ['さざなみ', 'わかしお'],
    excludeKeywords: ['新宿'],
    outboundOrigin: '東京',
    inboundDest: '東京',
  },
  {
    lines: ['sobu_rapid', 'sobu_main'],
    includeKeywords: ['しおさい'],
    excludeKeywords: [],
    outboundOrigin: '東京',
    outboundDefaultDestByKeyword: { 'しおさい': '銚子' },
    inboundDest: '東京',
  },
];

function bridgeBosoLimitedExpress() {
  console.log('=== 🏖️ 房総特急（新宿さざなみ・新宿わかしお・さざなみ・わかしお・しおさい）ダイヤ補完＆直通リンク開始 ===');

  const lineData = {
    chuo_sobu_local: safeReadJson(LINE_PATHS.chuo_sobu_local),
    sobu_rapid: safeReadJson(LINE_PATHS.sobu_rapid),
    uchibo: safeReadJson(LINE_PATHS.uchibo),
    sotobo: safeReadJson(LINE_PATHS.sotobo),
    keiyo: safeReadJson(LINE_PATHS.keiyo),
    sobu_main: safeReadJson(LINE_PATHS.sobu_main),
  };

  // 0-1. 総武快速線から新宿発着房総特急の不要・孤立トリップを除去
  const isShinjukuBoso = (t) => t.trainName && (t.trainName.includes('新宿さざなみ') || t.trainName.includes('新宿わかしお'));
  lineData.sobu_rapid = lineData.sobu_rapid.filter((t) => !isShinjukuBoso(t));

  // 0-2. 新宿さざなみ・新宿わかしおは土休日運転のため、平日ダイヤから誤登録されたトリップを除去
  for (const key of ['chuo_sobu_local', 'sotobo', 'uchibo']) {
    lineData[key] = lineData[key].filter((t) => t.isHoliday || !isShinjukuBoso(t));
  }

  // 1. 新宿発着 房総臨時特急チェーンの構築と直通リンク
  for (const chain of SHINJUKU_BOSO_EXPRESS_CHAINS) {
    const resolvedTrips = [];

    for (const seg of chain.segments) {
      const list = lineData[seg.lineId];
      let trip = list.find((t) => t.tripId === seg.tripId);

      if (seg.stopOverrides && trip && Array.isArray(trip.stops)) {
        for (const [stId, ov] of Object.entries(seg.stopOverrides)) {
          const st = trip.stops.find((s) => s.stationId === stId);
          if (st) Object.assign(st, ov);
        }
      }

      const computedStops = seg.cslKeyStops
        ? buildFullStops(CSL_STATION_IDS, seg.cslKeyStops, true)
        : seg.stops
        ? JSON.parse(JSON.stringify(seg.stops))
        : null;

      if (!trip && !seg.mustExist && computedStops) {
        trip = {
          tripId: seg.tripId,
          lineId: seg.lineId,
          trainId: chain.trainId,
          trainNumber: chain.trainNumber,
          trainType: 'limitedExp',
          trainName: chain.trainName,
          direction: chain.direction,
          originStationId: seg.originStationId,
          destinationStationId: seg.destinationStationId,
          customOrigin: chain.customOrigin,
          customDestination: chain.customDestination,
          cars: chain.cars,
          isHoliday: chain.isHoliday,
          stops: computedStops,
        };
        list.push(trip);
      } else if (trip && seg.cslKeyStops && computedStops) {
        trip.stops = computedStops;
        trip.cars = chain.cars;
      }

      resolvedTrips.push({ seg, trip });
    }

    if (resolvedTrips.every((r) => Boolean(r.trip))) {
      // 京葉線の誤リンク解除（該当指定がある場合）
      if (chain.clearKeiyoFromTripId) {
        for (const ky of lineData.keiyo) {
          if (ky.prevTripId === chain.clearKeiyoFromTripId || ky.previousTrip?.tripId === chain.clearKeiyoFromTripId) {
            delete ky.prevTripId;
            delete ky.prevLineId;
            delete ky.previousTrip;
            if (ky.trainName === chain.trainName) {
              ky.trainName = '快速';
              ky.trainType = 'rapid';
            }
          }
        }
      }

      // 隣接セグメント間の相互直通リンク設定
      for (let i = 0; i < resolvedTrips.length - 1; i++) {
        const cur = resolvedTrips[i];
        const nxt = resolvedTrips[i + 1];
        linkThroughTrips(cur.trip, cur.seg.lineId, nxt.trip, nxt.seg.lineId, {
          withLegacyObjects: true,
          legacyTrainNumber: chain.trainNumber,
          trainName: chain.trainName,
          customOrigin: chain.customOrigin,
          customDestination: chain.customDestination,
        });
      }
      console.log(`  ✓ ${chain.logLabel}`);
    }
  }

  // 2. 東京発着 定期特急（さざなみ・わかしお・しおさい）の始発・行先メタデータ整備
  for (const rule of REGULAR_BOSO_METADATA_RULES) {
    for (const lineKey of rule.lines) {
      for (const trip of lineData[lineKey]) {
        if (!trip.trainName) continue;
        if (!rule.includeKeywords.some((kw) => trip.trainName.includes(kw))) continue;
        if (rule.excludeKeywords.some((kw) => trip.trainName.includes(kw))) continue;

        if (trip.direction === 'outbound') {
          if (rule.outboundOrigin) trip.customOrigin = rule.outboundOrigin;
          if (rule.outboundDefaultDestByKeyword && !trip.customDestination) {
            for (const [kw, defaultDest] of Object.entries(rule.outboundDefaultDestByKeyword)) {
              if (trip.trainName.includes(kw)) {
                trip.customDestination = defaultDest;
                break;
              }
            }
          }
        } else if (trip.direction === 'inbound') {
          if (rule.inboundDest) trip.customDestination = rule.inboundDest;
        }
      }
    }
  }

  // 3. 保存
  for (const [key, trips] of Object.entries(lineData)) {
    safeWriteJson(LINE_PATHS[key], trips);
  }

  console.log('🎉 房総特急ダイヤ補完＆直通リンク処理が完了しました！');
}

module.exports = { bridgeBosoLimitedExpress };

if (require.main === module) {
  bridgeBosoLimitedExpress();
}
