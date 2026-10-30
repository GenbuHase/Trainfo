// 特急あずさ ダイヤ修正・補完スクリプト
// 1. 白馬駅13:43発特急あずさ38号（平日42025/休日42026）の篠ノ井線新設および中央本線塩尻〜上諏訪間補間
// 2. 下り塩尻通過特急あずさ9号・37号の延伸・篠ノ井線新設
// 3. 全特急あずさ号の始発駅（customOrigin）整備（塩尻→松本/白馬）および相互throughTripIdリンク

const fs = require('fs');
const path = require('path');

const oitoPath = path.resolve('src/data/lines/oito_east/globalTimetable.json');
const shinonoiPath = path.resolve('src/data/lines/shinonoi/globalTimetable.json');
const shinonoiStPath = path.resolve('src/data/lines/shinonoi/stationTimetables.json');
const chuoMainPath = path.resolve('src/data/lines/chuo_main/globalTimetable.json');
const chuoPath = path.resolve('src/data/lines/chuo/globalTimetable.json');
const chuoSobuPath = path.resolve('src/data/lines/chuo_sobu_local/globalTimetable.json');
const sobuRapidPath = path.resolve('src/data/lines/sobu_rapid/globalTimetable.json');
const fujikyuPath = path.resolve('src/data/lines/fujikyu/globalTimetable.json');

function enrichAzusaTimetable() {
  const oitoTrips = JSON.parse(fs.readFileSync(oitoPath, 'utf8'));
  const shinonoiTrips = JSON.parse(fs.readFileSync(shinonoiPath, 'utf8'));
  const shinonoiSt = JSON.parse(fs.readFileSync(shinonoiStPath, 'utf8'));
  const chuoMainTrips = JSON.parse(fs.readFileSync(chuoMainPath, 'utf8'));
  const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));
  const chuoSobuTrips = JSON.parse(fs.readFileSync(chuoSobuPath, 'utf8'));
  const sobuRapidTrips = JSON.parse(fs.readFileSync(sobuRapidPath, 'utf8'));
  const fujikyuTrips = JSON.parse(fs.readFileSync(fujikyuPath, 'utf8'));

  console.log('=== 特急あずさ ダイヤ補完・エンリッチメント開始 ===\n');

// ==========================================
// 1. あずさ38号（平日: 42025 / 休日: 42026）
// 白馬 13:43 -> 松本 14:47着/14:50発 -> 塩尻 14:58通過 -> 上諏訪 15:11着/15:12発 -> 新宿 17:26着
// ==========================================
console.log('--- 1. 特急あずさ38号（白馬発 新宿行）の修正 ---');

const azusa38Defs = [
  { trainId: '42025', isHoliday: false, prefix: 'WD' },
  { trainId: '42026', isHoliday: true, prefix: 'HD' },
];

for (const { trainId, isHoliday, prefix } of azusa38Defs) {
  const oitoTripId = `${prefix}_INB_OIE-29_1343_${trainId}`;
  const shinonoiTripId = `sn_${prefix}_INB_SN-06_1450_${trainId}`;
  const chuoMainTripId = `cm_${prefix}_INB_CO-61_1458_${trainId}`;
  const chuoTripId = `${prefix}_INB_CO-57_1512_${trainId}`;

  // (A) 大糸線
  const oitoTrip = oitoTrips.find((t) => t.tripId === oitoTripId || t.trainId === trainId);
  if (oitoTrip) {
    oitoTrip.destinationStationId = 'OIE-01';
    oitoTrip.customOrigin = '白馬';
    oitoTrip.customDestination = '新宿';
    oitoTrip.throughTripId = shinonoiTripId;
    oitoTrip.throughLineId = 'shinonoi';
    console.log(`  ✓ oito_east ${oitoTripId} を更新 (through -> ${shinonoiTripId})`);
  }

  // (B) 篠ノ井線（松本 14:50発 -> 塩尻 14:58通過）
  const shinonoiStops = [
    { stationId: 'SN-06', arrivalTime: '14:47:00', departureTime: '14:50:00', isPassing: false },
    { stationId: 'SN-05', arrivalTime: '14:52:00', departureTime: '14:52:00', isPassing: true },
    { stationId: 'SN-04', arrivalTime: '14:53:30', departureTime: '14:53:30', isPassing: true },
    { stationId: 'SN-03', arrivalTime: '14:54:30', departureTime: '14:54:30', isPassing: true },
    { stationId: 'SN-02', arrivalTime: '14:56:00', departureTime: '14:56:00', isPassing: true },
    { stationId: 'SN-01', arrivalTime: '14:58:00', departureTime: '14:58:00', isPassing: true },
  ];

  const snExistingIdx = shinonoiTrips.findIndex((t) => t.tripId === shinonoiTripId || t.trainId === trainId);
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
    stops: shinonoiStops,
    throughTripId: chuoMainTripId,
    throughLineId: 'chuo_main',
  };

  if (snExistingIdx !== -1) {
    shinonoiTrips[snExistingIdx] = snTripData;
  } else {
    shinonoiTrips.push(snTripData);
  }
  console.log(`  ✓ shinonoi ${shinonoiTripId} を新設/更新`);

  // (C) 篠ノ井線 松本駅 (SN-06) の時刻表に追加
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

  // (D) 中央本線（塩尻 14:58通過 -> 上諏訪 15:11着/15:12発 -> 高尾 16:45通過）
  const oldChuoMainId = `cm_${prefix}_INB_CO-57_1512_${trainId}`;
  const cmIdx = chuoMainTrips.findIndex((t) => t.tripId === oldChuoMainId || t.tripId === chuoMainTripId || t.trainId === trainId);
  if (cmIdx !== -1) {
    const existingTrip = chuoMainTrips[cmIdx];
    const existingStops = existingTrip.stops;

    // 塩尻〜下諏訪の通過駅を先頭に追加（既存の上諏訪以降とマージ）
    const prefixStops = [
      { stationId: 'CO-61', arrivalTime: '14:58:00', departureTime: '14:58:00', isPassing: true },
      { stationId: 'CO-60', arrivalTime: '15:00:26', departureTime: '15:00:26', isPassing: true },
      { stationId: 'CO-59', arrivalTime: '15:04:30', departureTime: '15:04:30', isPassing: true },
      { stationId: 'CO-58', arrivalTime: '15:07:45', departureTime: '15:07:45', isPassing: true },
    ];
    const suwaAndAfter = existingStops.filter((s) => s.stationId !== 'CO-61' && s.stationId !== 'CO-60' && s.stationId !== 'CO-59' && s.stationId !== 'CO-58');

    chuoMainTrips[cmIdx] = {
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
      stops: [...prefixStops, ...suwaAndAfter],
      throughTripId: chuoTripId,
      throughLineId: 'chuo',
    };
    console.log(`  ✓ chuo_main ${chuoMainTripId} を更新 (塩尻〜下諏訪を追加)`);
  }

  // (E) 中央線快速（高尾 16:45通過 -> 新宿 17:26着）
  const chuoTrip = chuoTrips.find((t) => t.tripId === chuoTripId || t.trainId === trainId);
  if (chuoTrip) {
    chuoTrip.customOrigin = '白馬';
    chuoTrip.customDestination = '新宿';
    chuoTrip.throughTripId = chuoMainTripId;
    chuoTrip.throughLineId = 'chuo_main';
    console.log(`  ✓ chuo ${chuoTripId} を更新 (customOrigin: 白馬, through -> ${chuoMainTripId})`);
  }
}

// ==========================================
// 2. 下り塩尻通過特急あずさ9号・37号の延伸
// ==========================================
console.log('\n--- 2. 下り塩尻通過特急あずさ9号・37号の延伸 ---');

const outboundNonstopDefs = [
  // あずさ9号: 新宿 09:00 -> 上諏訪 11:17 -> 塩尻 11:30通過 -> 松本 11:39着
  {
    trainId: '6862',
    isHoliday: false,
    prefix: 'WD',
    trainNumber: '9M',
    trainName: 'あずさ9号',
    cmTripId: 'cm_WD_OUT_JC-05_0900_6862',
    snTripId: 'sn_WD_OUT_SN-01_1130_6862',
    times: {
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
    },
  },
  {
    trainId: '6861',
    isHoliday: true,
    prefix: 'HD',
    trainNumber: '9M',
    trainName: 'あずさ9号',
    cmTripId: 'cm_HD_OUT_JC-05_0900_6861',
    snTripId: 'sn_HD_OUT_SN-01_1130_6861',
    times: {
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
    },
  },
  // あずさ37号: 新宿 16:00 -> 上諏訪 18:07 -> 塩尻 18:20通過 -> 松本 18:29着
  {
    trainId: '6864',
    isHoliday: false,
    prefix: 'WD',
    trainNumber: '37M',
    trainName: 'あずさ37号',
    cmTripId: 'cm_WD_OUT_JC-05_1600_6864',
    snTripId: 'sn_WD_OUT_SN-01_1820_6864',
    times: {
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
    },
  },
  {
    trainId: '6863',
    isHoliday: true,
    prefix: 'HD',
    trainNumber: '37M',
    trainName: 'あずさ37号',
    cmTripId: 'cm_HD_OUT_JC-05_1600_6863',
    snTripId: 'sn_HD_OUT_SN-01_1820_6863',
    times: {
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
    },
  },
];

for (const def of outboundNonstopDefs) {
  const { trainId, isHoliday, trainNumber, trainName, cmTripId, snTripId, times } = def;

  // 中央本線トリップ延伸 (上諏訪 -> 塩尻)
  const cmTrip = chuoMainTrips.find((t) => t.tripId === cmTripId || t.trainId === trainId);
  if (cmTrip) {
    cmTrip.destinationStationId = 'CO-61';
    cmTrip.customOrigin = '新宿';
    cmTrip.customDestination = '松本';
    cmTrip.trainName = trainName;
    cmTrip.throughTripId = snTripId;
    cmTrip.throughLineId = 'shinonoi';

    // 上諏訪より後ろの駅を追加
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

  // 篠ノ井線トリップ新設 (塩尻 -> 松本)
  const snStops = [
    { stationId: 'SN-01', arrivalTime: times.shiojiri, departureTime: times.shiojiri, isPassing: true },
    { stationId: 'SN-02', arrivalTime: times.hirooka, departureTime: times.hirooka, isPassing: true },
    { stationId: 'SN-03', arrivalTime: times.murai, departureTime: times.murai, isPassing: true },
    { stationId: 'SN-04', arrivalTime: times.hirata, departureTime: times.hirata, isPassing: true },
    { stationId: 'SN-05', arrivalTime: times.minamimatsumoto, departureTime: times.minamimatsumoto, isPassing: true },
    { stationId: 'SN-06', arrivalTime: times.matsumotoArr, departureTime: times.matsumotoArr, isPassing: false },
  ];

  const snExistingIdx = shinonoiTrips.findIndex((t) => t.tripId === snTripId || t.trainId === trainId);
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

  if (snExistingIdx !== -1) {
    shinonoiTrips[snExistingIdx] = snTripData;
  } else {
    shinonoiTrips.push(snTripData);
  }
  console.log(`  ✓ shinonoi ${snTripId} を新設/更新 (松本着 ${times.matsumotoArr})`);
}

// ==========================================
// 2-2. 各あずさ便の行先・愛称・通過時刻補正
// ==========================================
console.log('\n--- 2-2. 各あずさ便の行先・愛称・通過時刻補正 ---');

// (A) あずさ1号 (6843): customDestination を '松本' に補正（富士回遊併結の名残を解消）
for (const trips of [chuoMainTrips, chuoTrips]) {
  for (const trip of trips) {
    if (trip.trainId === '6843' || (trip.tripId && trip.tripId.includes('6843'))) {
      trip.customDestination = '松本';
      trip.customOrigin = '新宿';
    }
  }
}

// (B) あずさ8号 休日 (6897): customDestination を '東京' に補正
for (const trips of [chuoMainTrips, chuoTrips]) {
  for (const trip of trips) {
    if (trip.isHoliday && (trip.trainId === '6897' || (trip.tripId && trip.tripId.includes('6897')))) {
      trip.customDestination = '東京';
      trip.customOrigin = '松本';
    }
  }
}

// (C) あずさ44号 平日 (6926): trainName を 'あずさ44号'、customDestination を '新宿' に補正
for (const trips of [chuoMainTrips, chuoTrips]) {
  for (const trip of trips) {
    if (!trip.isHoliday && (trip.trainId === '6926' || (trip.tripId && trip.tripId.includes('6926')))) {
      trip.trainName = 'あずさ44号';
      trip.customDestination = '新宿';
      trip.customOrigin = '松本';
    }
  }
}

// (D) あずさ78号 休日 (6925): trainName を 'あずさ78号'、customDestination を '新宿' に補正
for (const trips of [chuoMainTrips, chuoTrips]) {
  for (const trip of trips) {
    if (trip.isHoliday && (trip.trainId === '6925' || (trip.tripId && trip.tripId.includes('6925')))) {
      trip.trainName = 'あずさ78号';
      trip.customDestination = '新宿';
      trip.customOrigin = '松本';
    }
  }
}

// (E) あずさ88号 (6918) と あずさ60号 (6909/6908):
for (const trip of chuoMainTrips) {
  if (trip.trainId === '6918' || (trip.tripId && trip.tripId.includes('6918'))) {
    trip.trainName = 'あずさ88号';
    const takao = trip.stops && trip.stops.find(s => s.stationId === 'JC-24');
    if (takao) {
      takao.arrivalTime = '21:53:57';
      takao.departureTime = '21:53:57';
      takao.isPassing = true;
    }
  }
  if (trip.trainId === '33564' || trip.trainId === '33563' || (trip.tripId && (trip.tripId.includes('33564') || trip.tripId.includes('33563')))) {
    trip.trainName = 'かいじ58号';
  }
  if (trip.trainId === '6909' || trip.trainId === '6908' || (trip.tripId && (trip.tripId.includes('6909') || trip.tripId.includes('6908')))) {
    trip.trainName = 'あずさ60号';
    const takao = trip.stops && trip.stops.find(s => s.stationId === 'JC-24');
    if (takao) {
      takao.arrivalTime = '22:08:53';
      takao.departureTime = '22:08:53';
      takao.isPassing = true;
    }
  }
}

// (F) 普通列車445M (6891/6892) の誤愛称クリーンアップ
for (const trips of [chuoMainTrips, shinonoiTrips]) {
  for (const trip of trips) {
    if (trip.trainId === '6891' || trip.trainId === '6892' || (trip.tripId && (trip.tripId.includes('6891') || trip.tripId.includes('6892')))) {
      if (trip.trainType !== 'limitedExp') {
        delete trip.trainName;
      }
    }
  }
}

// ==========================================
// 3. 全上りあずさ号の始発駅（customOrigin）整備
// ==========================================
console.log('\n--- 3. 全上りあずさ号の始発駅 (customOrigin) 整備 ---');

// (A) chuo_main の上りあずさ (originStationId === 'CO-61')
let cmUpdatedCount = 0;
for (const trip of chuoMainTrips) {
  if (trip.trainType === 'limitedExp' && trip.direction === 'inbound') {
    if (trip.originStationId === 'CO-61') {
      if (!trip.customOrigin) {
        trip.customOrigin = '松本';
        cmUpdatedCount++;
      }
    }
  }
}
console.log(`  ✓ chuo_main: ${cmUpdatedCount} 便の上りあずさに customOrigin: '松本' を設定`);

// (B) chuo の上りあずさ (customOrigin === '塩尻')
let chUpdatedCount = 0;
for (const trip of chuoTrips) {
  if (trip.trainType === 'limitedExp' && trip.direction === 'inbound') {
    if (trip.customOrigin === '塩尻') {
      trip.customOrigin = '松本';
      chUpdatedCount++;
    }
  }
}
console.log(`  ✓ chuo: ${chUpdatedCount} 便の上りあずさの customOrigin を '塩尻' から '松本' に更新`);

// (C) shinonoi と chuo_main の全あずさの始発駅・直通リンク整備
let snInbUpdated = 0;
let snOutUpdated = 0;

for (const snTrip of shinonoiTrips) {
  if (snTrip.trainType === 'limitedExp' || (snTrip.trainName && snTrip.trainName.includes('あずさ'))) {
    const isHoliday = snTrip.isHoliday;
    const yId = snTrip.trainId || (snTrip.tripId ? snTrip.tripId.split('_').pop() : '');
    if (!yId) continue;

    if (snTrip.direction === 'inbound') {
      // 上りあずさ (松本 -> 塩尻 -> 新宿)
      // 篠ノ井線(先行) -> 中央本線(後続)
      if (!snTrip.customOrigin && snTrip.originStationId === 'SN-06') {
        snTrip.customOrigin = '松本';
      }
      const matchedCm = chuoMainTrips.find(
        (t) => (t.trainId === yId || (t.tripId && t.tripId.endsWith(`_${yId}`))) &&
               t.direction === 'inbound' &&
               t.isHoliday === isHoliday
      );
      if (matchedCm) {
        snTrip.throughTripId = matchedCm.tripId;
        snTrip.throughLineId = 'chuo_main';
        matchedCm.prevTripId = snTrip.tripId;
        matchedCm.prevLineId = 'shinonoi';

        if (!matchedCm.trainName && snTrip.trainName) matchedCm.trainName = snTrip.trainName;
        if (!snTrip.trainName && matchedCm.trainName) snTrip.trainName = matchedCm.trainName;

        matchedCm.customOrigin = snTrip.customOrigin || '松本';
        snTrip.customDestination = matchedCm.customDestination || '新宿';

        // 塩尻駅(SN-01 / CO-61)の時刻同期
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
      }
    } else if (snTrip.direction === 'outbound') {
      // 下りあずさ (新宿 -> 塩尻 -> 松本)
      // 中央本線(先行) -> 篠ノ井線(後続)
      const matchedCm = chuoMainTrips.find(
        (t) => (t.trainId === yId || (t.tripId && t.tripId.endsWith(`_${yId}`))) &&
               t.direction === 'outbound' &&
               t.isHoliday === isHoliday
      );
      if (matchedCm) {
        matchedCm.throughTripId = snTrip.tripId;
        matchedCm.throughLineId = 'shinonoi';
        snTrip.prevTripId = matchedCm.tripId;
        snTrip.prevLineId = 'chuo_main';

        if (!snTrip.trainName && matchedCm.trainName) snTrip.trainName = matchedCm.trainName;
        if (!matchedCm.trainName && snTrip.trainName) matchedCm.trainName = snTrip.trainName;

        snTrip.customOrigin = matchedCm.customOrigin || '新宿';
        snTrip.customDestination = '松本';
        matchedCm.customDestination = '松本';

        // 塩尻駅(CO-61 / SN-01)の時刻同期
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
  }
}
  console.log(`  ✓ shinonoi ↔ chuo_main: 上り ${snInbUpdated} 便、下り ${snOutUpdated} 便を相互直通リンク & 時刻同期`);

  // ==========================================
  // 4. 千葉発着あずさ号・富士回遊号（あずさ3号・富士回遊3号・あずさ50号）の直通リンク・愛称・併結整備
  // ==========================================
  console.log('\n--- 4. 千葉発着あずさ号・富士回遊号（あずさ3号・富士回遊3号・あずさ50号）の直通リンク・併結整備 ---');

  // (A) あずさ3号 & 富士回遊3号 平日: 千葉 06:38 -> 新宿 07:26着/07:30発 (併結) -> 大月 08:30着/08:40発 (分割) -> 松本 / 河口湖
  const cslAzusa3WD = chuoSobuTrips.find((t) => t.tripId === 'WD_INB_JB-39_0638_39504' || t.trainId === '39504');
  const chuoAzusa3WD = chuoTrips.find((t) => t.tripId === 'WD_OUT_JC-05_0730_39459' || t.trainId === '39459');
  const cmAzusa3WD = chuoMainTrips.find((t) => t.tripId === 'cm_WD_OUT_JC-05_0730_39459' || (t.trainId === '39459' && t.direction === 'outbound' && !t.isHoliday));
  const snAzusa3WD = shinonoiTrips.find((t) => t.tripId === 'WD_OUT_SN-01_1014_39459' || (t.trainId === '39459' && t.direction === 'outbound' && !t.isHoliday));

  const chuoFuji3WD = chuoTrips.find((t) => t.tripId === 'WD_OUT_JC-05_0730_39461' || t.trainId === '39461');
  const cmFuji3WD = chuoMainTrips.find((t) => t.tripId === 'cm_WD_OUT_JC-05_0730_39461' || (t.trainId === '39461' && t.direction === 'outbound' && !t.isHoliday));
  const fjFuji3WD = fujikyuTrips.find((t) => t.tripId === 'WD_OUT_FJ-01_0840_39586' || (t.trainId === '39586' && !t.isHoliday));

  if (cslAzusa3WD && chuoAzusa3WD) {
    // 1. あずさ3号 (平日)
    cslAzusa3WD.trainName = 'あずさ3号';
    cslAzusa3WD.trainNumber = '5003M';
    cslAzusa3WD.customOrigin = '千葉';
    cslAzusa3WD.customDestination = '松本';
    cslAzusa3WD.cars = 9;
    cslAzusa3WD.throughTripId = chuoAzusa3WD.tripId;
    cslAzusa3WD.throughLineId = 'chuo';

    const lastStop = cslAzusa3WD.stops[cslAzusa3WD.stops.length - 1];
    if (lastStop && lastStop.stationId === 'JB-10') {
      lastStop.departureTime = '07:30:00';
    }

    chuoAzusa3WD.trainName = 'あずさ3号';
    chuoAzusa3WD.trainNumber = '5003M';
    chuoAzusa3WD.customOrigin = '千葉';
    chuoAzusa3WD.customDestination = '松本';
    chuoAzusa3WD.cars = 9;
    chuoAzusa3WD.prevTripId = cslAzusa3WD.tripId;
    chuoAzusa3WD.prevLineId = 'chuo_sobu_local';

    if (cmAzusa3WD) {
      chuoAzusa3WD.throughTripId = cmAzusa3WD.tripId;
      chuoAzusa3WD.throughLineId = 'chuo_main';
      cmAzusa3WD.prevTripId = chuoAzusa3WD.tripId;
      cmAzusa3WD.prevLineId = 'chuo';
      cmAzusa3WD.trainName = 'あずさ3号';
      cmAzusa3WD.trainNumber = '5003M';
      cmAzusa3WD.customOrigin = '千葉';
      cmAzusa3WD.customDestination = '松本';
      cmAzusa3WD.cars = 9;

      if (snAzusa3WD) {
        cmAzusa3WD.throughTripId = snAzusa3WD.tripId;
        cmAzusa3WD.throughLineId = 'shinonoi';
        snAzusa3WD.prevTripId = cmAzusa3WD.tripId;
        snAzusa3WD.prevLineId = 'chuo_main';
        snAzusa3WD.trainName = 'あずさ3号';
        snAzusa3WD.trainNumber = '5003M';
        snAzusa3WD.customOrigin = '千葉';
        snAzusa3WD.customDestination = '松本';
        snAzusa3WD.cars = 9;
      }
    }

    // 2. 富士回遊3号 (平日) 千葉〜新宿トリップの復元注入とカップリング
    const fujiTripIdWD = 'WD_INB_JB-39_0638_39506';
    let cslFuji3WD = chuoSobuTrips.find((t) => t.tripId === fujiTripIdWD);
    if (!cslFuji3WD) {
      cslFuji3WD = {
        ...JSON.parse(JSON.stringify(cslAzusa3WD)),
        tripId: fujiTripIdWD,
        trainId: '39506',
        trainNumber: '1457M',
        trainName: '富士回遊3号',
        trainType: 'limitedExp',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        customOrigin: '千葉',
        customDestination: '河口湖',
        cars: 3,
        throughTripId: chuoFuji3WD ? chuoFuji3WD.tripId : 'WD_OUT_JC-05_0730_39461',
        throughLineId: 'chuo',
      };
      chuoSobuTrips.push(cslFuji3WD);
    } else {
      cslFuji3WD.trainName = '富士回遊3号';
      cslFuji3WD.trainNumber = '1457M';
      cslFuji3WD.customOrigin = '千葉';
      cslFuji3WD.customDestination = '河口湖';
      cslFuji3WD.cars = 3;
      cslFuji3WD.throughTripId = chuoFuji3WD ? chuoFuji3WD.tripId : 'WD_OUT_JC-05_0730_39461';
      cslFuji3WD.throughLineId = 'chuo';
    }

    // 千葉〜新宿間の併結設定 (PRIMARY: あずさ3号 9両, SECONDARY: 富士回遊3号 3両)
    cslAzusa3WD.coupling = {
      role: 'PRIMARY',
      fromStationId: 'JB-39',
      toStationId: 'JB-10',
      coupledTripId: fujiTripIdWD,
      coupledTrainNumber: '1457M',
      coupledCars: 3,
      coupledDestination: '河口湖',
    };
    cslFuji3WD.coupling = {
      role: 'SECONDARY',
      fromStationId: 'JB-39',
      toStationId: 'JB-10',
      coupledTripId: cslAzusa3WD.tripId,
      coupledTrainNumber: '5003M',
      coupledCars: 9,
      coupledDestination: '松本',
    };

    if (chuoFuji3WD) {
      chuoFuji3WD.prevTripId = fujiTripIdWD;
      chuoFuji3WD.prevLineId = 'chuo_sobu_local';
      chuoFuji3WD.customOrigin = '千葉';
      chuoFuji3WD.customDestination = '河口湖';
      chuoFuji3WD.cars = 3;
    }
    if (cmFuji3WD) {
      cmFuji3WD.customOrigin = '千葉';
      cmFuji3WD.cars = 3;
    }
    if (fjFuji3WD) {
      fjFuji3WD.customOrigin = '千葉';
      fjFuji3WD.cars = 3;
    }

    console.log('  ✓ 平日 あずさ3号 & 富士回遊3号: 千葉始発の併結直通チェーン (千葉〜新宿〜大月〜松本/河口湖) を確立');
  }

  // (B) あずさ3号 & 富士回遊3号 休日: 千葉 06:38 -> 新宿 07:26着/07:30発 (併結) -> 大月 08:30着/08:40発 (分割) -> 松本 / 河口湖
  const cslAzusa3HD = chuoSobuTrips.find((t) => t.tripId === 'HD_INB_JB-39_0638_39503' || t.trainId === '39503');
  const chuoAzusa3HD = chuoTrips.find((t) => t.tripId === 'HD_OUT_JC-05_0730_39458' || t.trainId === '39458');
  const cmAzusa3HD = chuoMainTrips.find((t) => t.tripId === 'cm_HD_OUT_JC-05_0730_39458' || (t.trainId === '39458' && t.direction === 'outbound' && t.isHoliday));
  const snAzusa3HD = shinonoiTrips.find((t) => t.tripId === 'HD_OUT_SN-01_1014_39458' || (t.trainId === '39458' && t.direction === 'outbound' && t.isHoliday));

  const chuoFuji3HD = chuoTrips.find((t) => t.tripId === 'HD_OUT_JC-05_0730_39460' || t.trainId === '39460');
  const cmFuji3HD = chuoMainTrips.find((t) => t.tripId === 'cm_HD_OUT_JC-05_0730_39460' || (t.trainId === '39460' && t.direction === 'outbound' && t.isHoliday));
  const fjFuji3HD = fujikyuTrips.find((t) => t.tripId === 'HD_OUT_FJ-01_0840_39585' || (t.trainId === '39585' && t.isHoliday));

  if (cslAzusa3HD && chuoAzusa3HD) {
    // 1. あずさ3号 (休日)
    cslAzusa3HD.trainName = 'あずさ3号';
    cslAzusa3HD.trainNumber = '5003M';
    cslAzusa3HD.customOrigin = '千葉';
    cslAzusa3HD.customDestination = '松本';
    cslAzusa3HD.cars = 9;
    cslAzusa3HD.throughTripId = chuoAzusa3HD.tripId;
    cslAzusa3HD.throughLineId = 'chuo';

    const lastStop = cslAzusa3HD.stops[cslAzusa3HD.stops.length - 1];
    if (lastStop && lastStop.stationId === 'JB-10') {
      lastStop.departureTime = '07:30:00';
    }

    chuoAzusa3HD.trainName = 'あずさ3号';
    chuoAzusa3HD.trainNumber = '5003M';
    chuoAzusa3HD.customOrigin = '千葉';
    chuoAzusa3HD.customDestination = '松本';
    chuoAzusa3HD.cars = 9;
    chuoAzusa3HD.prevTripId = cslAzusa3HD.tripId;
    chuoAzusa3HD.prevLineId = 'chuo_sobu_local';

    const chuoTakao = chuoAzusa3HD.stops.find((s) => s.stationId === 'JC-24');
    if (chuoTakao) {
      chuoTakao.arrivalTime = '08:06:27';
      chuoTakao.departureTime = '08:06:27';
      chuoTakao.isPassing = true;
    }

    if (cmAzusa3HD) {
      chuoAzusa3HD.throughTripId = cmAzusa3HD.tripId;
      chuoAzusa3HD.throughLineId = 'chuo_main';
      cmAzusa3HD.prevTripId = chuoAzusa3HD.tripId;
      cmAzusa3HD.prevLineId = 'chuo';
      cmAzusa3HD.trainName = 'あずさ3号';
      cmAzusa3HD.trainNumber = '5003M';
      cmAzusa3HD.customOrigin = '千葉';
      cmAzusa3HD.customDestination = '松本';
      cmAzusa3HD.cars = 9;

      const cmTakao = cmAzusa3HD.stops.find((s) => s.stationId === 'JC-24') || cmAzusa3HD.stops[0];
      if (cmTakao) {
        cmTakao.arrivalTime = '08:06:27';
        cmTakao.departureTime = '08:06:27';
        cmTakao.isPassing = true;
      }

      if (snAzusa3HD) {
        cmAzusa3HD.throughTripId = snAzusa3HD.tripId;
        cmAzusa3HD.throughLineId = 'shinonoi';
        snAzusa3HD.prevTripId = cmAzusa3HD.tripId;
        snAzusa3HD.prevLineId = 'chuo_main';
        snAzusa3HD.trainName = 'あずさ3号';
        snAzusa3HD.trainNumber = '5003M';
        snAzusa3HD.customOrigin = '千葉';
        snAzusa3HD.customDestination = '松本';
        snAzusa3HD.cars = 9;
      }
    }

    // 2. 富士回遊3号 (休日) 千葉〜新宿トリップの復元注入とカップリング
    const fujiTripIdHD = 'HD_INB_JB-39_0638_39505';
    let cslFuji3HD = chuoSobuTrips.find((t) => t.tripId === fujiTripIdHD);
    if (!cslFuji3HD) {
      cslFuji3HD = {
        ...JSON.parse(JSON.stringify(cslAzusa3HD)),
        tripId: fujiTripIdHD,
        trainId: '39505',
        trainNumber: '1457M',
        trainName: '富士回遊3号',
        trainType: 'limitedExp',
        originStationId: 'JB-39',
        destinationStationId: 'JB-10',
        customOrigin: '千葉',
        customDestination: '河口湖',
        cars: 3,
        throughTripId: chuoFuji3HD ? chuoFuji3HD.tripId : 'HD_OUT_JC-05_0730_39460',
        throughLineId: 'chuo',
      };
      chuoSobuTrips.push(cslFuji3HD);
    } else {
      cslFuji3HD.trainName = '富士回遊3号';
      cslFuji3HD.trainNumber = '1457M';
      cslFuji3HD.customOrigin = '千葉';
      cslFuji3HD.customDestination = '河口湖';
      cslFuji3HD.cars = 3;
      cslFuji3HD.throughTripId = chuoFuji3HD ? chuoFuji3HD.tripId : 'HD_OUT_JC-05_0730_39460';
      cslFuji3HD.throughLineId = 'chuo';
    }

    // 千葉〜新宿間の併結設定 (PRIMARY: あずさ3号 9両, SECONDARY: 富士回遊3号 3両)
    cslAzusa3HD.coupling = {
      role: 'PRIMARY',
      fromStationId: 'JB-39',
      toStationId: 'JB-10',
      coupledTripId: fujiTripIdHD,
      coupledTrainNumber: '1457M',
      coupledCars: 3,
      coupledDestination: '河口湖',
    };
    cslFuji3HD.coupling = {
      role: 'SECONDARY',
      fromStationId: 'JB-39',
      toStationId: 'JB-10',
      coupledTripId: cslAzusa3HD.tripId,
      coupledTrainNumber: '5003M',
      coupledCars: 9,
      coupledDestination: '松本',
    };

    if (chuoFuji3HD) {
      chuoFuji3HD.prevTripId = fujiTripIdHD;
      chuoFuji3HD.prevLineId = 'chuo_sobu_local';
      chuoFuji3HD.customOrigin = '千葉';
      chuoFuji3HD.customDestination = '河口湖';
      chuoFuji3HD.cars = 3;
      const takao = chuoFuji3HD.stops.find((s) => s.stationId === 'JC-24');
      if (takao) {
        takao.arrivalTime = '08:06:27';
        takao.departureTime = '08:06:27';
        takao.isPassing = true;
      }
    }
    if (cmFuji3HD) {
      cmFuji3HD.customOrigin = '千葉';
      cmFuji3HD.cars = 3;
      const takao = cmFuji3HD.stops.find((s) => s.stationId === 'JC-24') || cmFuji3HD.stops[0];
      if (takao) {
        takao.arrivalTime = '08:06:27';
        takao.departureTime = '08:06:27';
        takao.isPassing = true;
      }
    }
    if (fjFuji3HD) {
      fjFuji3HD.customOrigin = '千葉';
      fjFuji3HD.cars = 3;
    }

    console.log('  ✓ 休日 あずさ3号 & 富士回遊3号: 千葉始発の併結直通チェーン (千葉〜新宿〜大月〜松本/河口湖) を確立');
  }

  // (C) あずさ1号 休日 (6848) の列車番号復元と誤カップリング解除
  const chuoAzusa1HD = chuoTrips.find((t) => t.tripId === 'HD_OUT_JC-05_0708_6848' || t.trainId === '6848');
  if (chuoAzusa1HD) {
    chuoAzusa1HD.trainNumber = '8075M';
    chuoAzusa1HD.trainName = 'あずさ1号';
    delete chuoAzusa1HD.coupling;
  }

  // (D) あずさ50号（上り 松本発 新宿経由 千葉行）の直通リンク
  const azusa50Defs = [
    { isHoliday: false, chuoTripId: 'WD_INB_JC-22_1933_39462', srTripId: 'WD_OUT_JO-22_2027_39556' },
    { isHoliday: true, chuoTripId: 'HD_INB_JC-22_1936_39463', srTripId: 'HD_OUT_JO-22_2027_39557' },
  ];

  for (const { chuoTripId, srTripId } of azusa50Defs) {
    const chuoTrip = chuoTrips.find((t) => t.tripId === chuoTripId);
    const srTrip = sobuRapidTrips.find((t) => t.tripId === srTripId);
    if (chuoTrip && srTrip) {
      chuoTrip.throughTripId = srTrip.tripId;
      chuoTrip.throughLineId = 'sobu_rapid';
      chuoTrip.customOrigin = '松本';
      chuoTrip.customDestination = '千葉';

      srTrip.prevTripId = chuoTrip.tripId;
      srTrip.prevLineId = 'chuo';
      srTrip.customOrigin = '松本';
      srTrip.customDestination = '千葉';
      console.log(`  ✓ あずさ50号 (${chuoTripId} -> ${srTripId}): 松本〜新宿〜千葉 直通リンクを確立`);
    }
  }

  // 5. ファイル保存
  safeWriteJson(oitoPath, oitoTrips);
  safeWriteJson(shinonoiPath, shinonoiTrips);
  safeWriteJson(shinonoiStPath, shinonoiSt);
  safeWriteJson(chuoMainPath, chuoMainTrips);
  safeWriteJson(chuoPath, chuoTrips);
  safeWriteJson(chuoSobuPath, chuoSobuTrips);
  safeWriteJson(sobuRapidPath, sobuRapidTrips);
  safeWriteJson(fujikyuPath, fujikyuTrips);

  console.log('\n✅ 全路線の globalTimetable.json および stationTimetables.json を正常に更新しました！');
}

function safeWriteJson(filePath, data) {
  const content = JSON.stringify(data, null, 2);
  let attempts = 0;
  while (attempts < 10) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (e) {
      attempts++;
      if (attempts >= 10) throw e;
      const start = Date.now();
      while (Date.now() - start < 150) {}
    }
  }
}

module.exports = { enrichAzusaTimetable };

if (require.main === module) {
  enrichAzusaTimetable();
}
