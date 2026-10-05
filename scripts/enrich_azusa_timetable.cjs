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

const oitoTrips = JSON.parse(fs.readFileSync(oitoPath, 'utf8'));
const shinonoiTrips = JSON.parse(fs.readFileSync(shinonoiPath, 'utf8'));
const shinonoiSt = JSON.parse(fs.readFileSync(shinonoiStPath, 'utf8'));
const chuoMainTrips = JSON.parse(fs.readFileSync(chuoMainPath, 'utf8'));
const chuoTrips = JSON.parse(fs.readFileSync(chuoPath, 'utf8'));

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
  const oitoTripId = `${prefix}_INB_OE-29_1343_${trainId}`;
  const shinonoiTripId = `sn_${prefix}_INB_SN-06_1450_${trainId}`;
  const chuoMainTripId = `cm_${prefix}_INB_CO-61_1458_${trainId}`;
  const chuoTripId = `${prefix}_INB_CO-57_1512_${trainId}`;

  // (A) 大糸線
  const oitoTrip = oitoTrips.find((t) => t.tripId === oitoTripId);
  if (oitoTrip) {
    oitoTrip.destinationStationId = 'OE-01';
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
  const { trainId, isHoliday, trainNumber, cmTripId, snTripId, times } = def;

  // 中央本線トリップ延伸 (上諏訪 -> 塩尻)
  const cmTrip = chuoMainTrips.find((t) => t.tripId === cmTripId || t.trainId === trainId);
  if (cmTrip) {
    cmTrip.destinationStationId = 'CO-61';
    cmTrip.customOrigin = '新宿';
    cmTrip.customDestination = '松本';
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
    trainType: 'limitedExp',
    direction: 'outbound',
    originStationId: 'SN-01',
    destinationStationId: 'SN-06',
    customOrigin: '新宿',
    customDestination: '松本',
    cars: 9,
    isHoliday,
    stops: snStops,
    throughTripId: cmTripId,
    throughLineId: 'chuo_main',
  };

  if (snExistingIdx !== -1) {
    shinonoiTrips[snExistingIdx] = snTripData;
  } else {
    shinonoiTrips.push(snTripData);
  }
  console.log(`  ✓ shinonoi ${snTripId} を新設/更新 (松本着 ${times.matsumotoArr})`);
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

// (C) shinonoi の全あずさの始発駅・直通リンク整備
let snInbUpdated = 0;
let snOutUpdated = 0;

for (const snTrip of shinonoiTrips) {
  if (snTrip.trainType === 'limitedExp') {
    const isHoliday = snTrip.isHoliday;
    const trainId = snTrip.trainId;

    if (snTrip.direction === 'inbound') {
      if (!snTrip.customOrigin && snTrip.originStationId === 'SN-06') {
        snTrip.customOrigin = '松本';
        snInbUpdated++;
      }
      // 対応する chuo_main トリップへの throughTripId を紐付け
      if (!snTrip.throughTripId && trainId) {
        const matchedCm = chuoMainTrips.find(
          (t) => t.trainId === trainId && t.direction === 'inbound' && t.isHoliday === isHoliday
        );
        if (matchedCm) {
          snTrip.throughTripId = matchedCm.tripId;
          snTrip.throughLineId = 'chuo_main';
          if (!matchedCm.throughTripId) {
            matchedCm.throughTripId = snTrip.tripId;
            matchedCm.throughLineId = 'shinonoi';
          }
        }
      }
    } else if (snTrip.direction === 'outbound') {
      // 下りあずさ
      if (!snTrip.customOrigin && snTrip.originStationId === 'SN-01') {
        const matchedCm = chuoMainTrips.find(
          (t) => t.trainId === trainId && t.direction === 'outbound' && t.isHoliday === isHoliday
        );
        if (matchedCm) {
          snTrip.customOrigin = matchedCm.customOrigin || '新宿';
          snTrip.customDestination = matchedCm.customDestination || '松本';
          snTrip.throughTripId = matchedCm.tripId;
          snTrip.throughLineId = 'chuo_main';
          snOutUpdated++;
        }
      }
    }
  }
}
console.log(`  ✓ shinonoi: 上り ${snInbUpdated} 便、下り ${snOutUpdated} 便の customOrigin/直通先を整備`);

// 4. ファイル保存
fs.writeFileSync(oitoPath, JSON.stringify(oitoTrips, null, 2), 'utf8');
fs.writeFileSync(shinonoiPath, JSON.stringify(shinonoiTrips, null, 2), 'utf8');
fs.writeFileSync(shinonoiStPath, JSON.stringify(shinonoiSt, null, 2), 'utf8');
fs.writeFileSync(chuoMainPath, JSON.stringify(chuoMainTrips, null, 2), 'utf8');
fs.writeFileSync(chuoPath, JSON.stringify(chuoTrips, null, 2), 'utf8');

console.log('\n✅ 全路線の globalTimetable.json および stationTimetables.json を正常に更新しました！');
