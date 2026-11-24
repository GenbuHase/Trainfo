// 東北エリア13路線＋JR米坂線（全14路線）の総合ハンドオーバー・共用区間重複除外・
// 特殊列車（代行バス・準急ストーブ列車・急行もりよし・快速）・別名乗換検証スクリプト
import assert from 'node:assert/strict';
import type { LineId, SimulationState } from '../src/types';
import {
  LINES_REGISTRY,
  getAlternateStations,
  getLinesGroupedByArea,
  getCombinedGlobalTimetable,
} from '../src/data/linesRegistry';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import { timeStringToSeconds } from '../src/data/timetableData';
import { calculateActiveTrains } from '../src/services/trainSimulation';

const TARGET_14_LINES: LineId[] = [
  'jr_yonesaka',
  'jr_aterazawa',
  'jr_hanawa',
  'sendai_subway_namboku',
  'sendai_subway_tozai',
  'sanriku_rias',
  'konan_konan',
  'konan_owani',
  'tsugaru_railway',
  'akita_nairiku',
  'yuri_kogen',
  'yamagata_flower_nagai',
  'abukuma_express',
  'fukushima_iizaka',
];

const RELATED_LINES: LineId[] = [
  ...TARGET_14_LINES,
  'jr_tohoku_fukushima_sendai',
  'jr_tohoku_ichinoseki_morioka',
  'igr_iwate_ginga',
  'jr_ou_fukushima_shinjo',
  'jr_ou_akita_aomori',
  'jr_gono',
];

function makeSimState(timeStr: string, selectedLineIds: LineId[], isHoliday = false): SimulationState {
  return {
    currentSec: timeStringToSeconds(timeStr),
    isHoliday,
    globalDelayMinutes: 0,
    randomDelays: {},
    isPlaying: true,
    speedMultiplier: 1,
    selectedLineIds,
  };
}

async function main() {
  console.log('=== 東北エリア13路線＋JR米坂線 総合検証テスト開始 ===\n');
  await loadLinesTimetables(RELATED_LINES);

  // 1. linesRegistry 登録とエリア分類の確認
  for (const id of TARGET_14_LINES) {
    assert.ok(LINES_REGISTRY[id], `${id} が LINES_REGISTRY に未登録`);
  }
  const areas = getLinesGroupedByArea();
  const tohokuGroup = areas.find((a) => a.area === 'tohoku');
  assert.ok(tohokuGroup, '東北エリアグループが存在すること');
  for (const id of TARGET_14_LINES) {
    assert.ok(tohokuGroup.lines.some((l) => l.id === id), `${id} が東北エリアグループに含まれていない`);
  }
  console.log(`✅ 1. linesRegistry & 東北エリア登録: ${TARGET_14_LINES.length}路線すべて確認（東北計 ${tohokuGroup.lines.length}路線）`);

  // 2. 阿武隈急行線 <-> JR東北本線（福島～仙台）槻木直通検証
  const abkTrips = getCombinedGlobalTimetable(['abukuma_express']);
  const tfsTrips = getCombinedGlobalTimetable(['jr_tohoku_fukushima_sendai']);
  const abkOut2963 = abkTrips.find((t) => !t.isHoliday && t.trainNumber === '2963M');
  const abkIn2960 = abkTrips.find((t) => !t.isHoliday && t.trainNumber === '2960M');
  assert.ok(abkOut2963?.throughTripId, '2963M（仙台行）に throughTripId が設定されていること');
  assert.equal(abkOut2963.throughLineId, 'jr_tohoku_fukushima_sendai');
  const tfsPartner2963 = tfsTrips.find((t) => t.tripId === abkOut2963.throughTripId);
  assert.ok(tfsPartner2963 && tfsPartner2963.prevTripId === abkOut2963.tripId, '2963M 対向リンク整合');

  assert.ok(abkIn2960?.prevTripId, '2960M（梁川行）に prevTripId が設定されていること');
  assert.equal(abkIn2960.prevLineId, 'jr_tohoku_fukushima_sendai');

  const abkAt0640 = calculateActiveTrains(makeSimState('06:40:00', ['abukuma_express', 'jr_tohoku_fukushima_sendai']));
  const abk2963Active1 = abkAt0640.find((t) => t.tripId === abkOut2963.tripId);
  assert.ok(abk2963Active1, '06:40 に 阿武隈急行線内で 2963M が稼働していること');
  const abkAt0715 = calculateActiveTrains(makeSimState('07:15:00', ['abukuma_express', 'jr_tohoku_fukushima_sendai']));
  const tfs2963Active2 = abkAt0715.find((t) => t.tripId === abkOut2963.throughTripId);
  assert.ok(tfs2963Active2, '07:15 に JR東北本線内で 2963M が引き継がれて稼働していること');
  console.log(`✅ 2. 阿武隈急行 ↔ JR東北本線 槻木直通検証: 2963M (${abk2963Active1.lineId} -> ${tfs2963Active2.lineId}) 引き継ぎ成功`);

  // 3. JR花輪線 1922D（鹿角花輪->盛岡->日詰）引き継ぎ＆IGR共用区間重複排除検証
  const hnwTrips = getCombinedGlobalTimetable(['jr_hanawa']);
  const hnw1922 = hnwTrips.find((t) => !t.isHoliday && t.trainNumber === '1922D');
  assert.ok(hnw1922, 'JR花輪線 1922D が存在すること');
  assert.equal(hnw1922.throughTripId, 'WD_INB_TIM-20_0740_42809');
  assert.equal(hnw1922.customDestination, '日詰');

  // 07:20 (好摩〜盛岡 共用区間走行中): JR花輪線 + IGR を両方表示しても 1922D 等は1本のみ描画
  const sharedHnw0720 = calculateActiveTrains(makeSimState('07:20:00', ['jr_hanawa', 'igr_iwate_ginga', 'jr_tohoku_ichinoseki_morioka']));
  const active1922 = sharedHnw0720.filter((t) => t.trainNumber === '1922D');
  assert.equal(active1922.length, 1, `盛岡〜好摩共用区間の1922D重複数が1であること (actual=${active1922.length})`);
  assert.equal(active1922[0].lineId, 'jr_hanawa', '長区間トリップ側（jr_hanawa）が優先保持されること');

  // 07:50 (盛岡発車後、東北本線日詰方面へ引き継ぎ後)
  const sharedHnw0750 = calculateActiveTrains(makeSimState('07:50:00', ['jr_hanawa', 'igr_iwate_ginga', 'jr_tohoku_ichinoseki_morioka']));
  assert.ok(
    sharedHnw0750.some((t) => t.tripId === 'WD_INB_TIM-20_0740_42809'),
    '07:50時点で JR東北本線 2578D（日詰行）へ引き継がれていること'
  );
  console.log('✅ 3. JR花輪線 1922D 盛岡〜好摩 重複排除(1本のみ) ＆ 東北本線2578D日詰行引き継ぎ成功');

  // 4. JR左沢線 山形〜北山形 単線並列・奥羽本線重複排除検証
  const sharedAtz0628 = calculateActiveTrains(makeSimState('06:28:00', ['jr_aterazawa', 'jr_ou_fukushima_shinjo']));
  const active320D = sharedAtz0628.filter((t) => t.trainNumber === '320D');
  assert.equal(active320D.length, 1, `山形〜北山形の320D重複数が1であること (actual=${active320D.length})`);
  assert.equal(active320D[0].lineId, 'jr_aterazawa', '全区間トリップ側（jr_aterazawa）が優先保持されること');
  console.log('✅ 4. JR左沢線 ↔ JR奥羽本線 山形〜北山形 重複排除検証成功 (320D -> jr_aterazawa のみ1本)');

  // 5. 代行バス・冬期ダイヤ（ストーブ列車・田んぼアート通過）・急行・快速・地下鉄の実運行検証
  const yonesaka0830 = calculateActiveTrains(makeSimState('08:30:00', ['jr_yonesaka']));
  assert.ok(
    yonesaka0830.some((t) => t.trainType === 'substitution_bus') && yonesaka0830.some((t) => t.trainType === 'regular'),
    'JR米坂線 08:30時点で 列車(regular) と 代行バス(substitution_bus) が同時稼働していること'
  );

  const tsugaru0945 = calculateActiveTrains(makeSimState('09:45:00', ['tsugaru_railway']));
  const stoveTrain = tsugaru0945.find((t) => t.trainType === 'semi_exp' && t.trainNumber === '151レ');
  assert.ok(stoveTrain, '津軽鉄道 09:45時点で 準急ストーブ列車（151レ）が稼働していること');
  assert.ok(stoveTrain.stops.some((s) => s.stationId === 'TRL-05' && s.isPassing), '準急151レは毘沙門(TRL-05)を通過すること');

  const knn10 = LINES_REGISTRY.konan_konan.stations.find((s) => s.id === 'KNN-10');
  assert.equal(knn10?.stoppingTypes.length, 0, '弘南線 田んぼアート(KNN-10) は冬期ダイヤのため停車種別0件であること');
  assert.equal(getCombinedGlobalTimetable(['konan_konan']).length, 92, '弘南線 冬期ダイヤ本数一致 (92)');

  const akita0925 = calculateActiveTrains(makeSimState('09:25:00', ['akita_nairiku']));
  assert.ok(akita0925.some((t) => t.trainType === 'express' && t.trainNumber === '2001D'), '秋田内陸線 急行もりよし2001D 稼働確認');

  const sanriku1455 = calculateActiveTrains(makeSimState('14:55:00', ['sanriku_rias']));
  const snrRapid = sanriku1455.find((t) => t.trainType === 'rapid');
  if (snrRapid) {
    console.log(`   三陸鉄道快速稼働確認: ${snrRapid.trainNumber}`);
  } else {
    const rTrip = getCombinedGlobalTimetable(['sanriku_rias']).find((t) => !t.isHoliday && t.trainType === 'rapid');
    assert.ok(rTrip, '三陸鉄道リアス線に快速便が存在すること');
  }

  const rush0815 = calculateActiveTrains(
    makeSimState('08:15:00', ['sendai_subway_namboku', 'sendai_subway_tozai', 'fukushima_iizaka'])
  );
  assert.ok(rush0815.filter((t) => t.lineId === 'sendai_subway_namboku').length >= 10, '仙台地下鉄南北線 朝ラッシュ稼働確認');
  assert.ok(rush0815.filter((t) => t.lineId === 'sendai_subway_tozai').length >= 8, '仙台地下鉄東西線 朝ラッシュ稼働確認');
  assert.ok(rush0815.filter((t) => t.lineId === 'fukushima_iizaka').length >= 3, '福島交通飯坂線 朝ラッシュ稼働確認');
  console.log('✅ 5. 代行バス・ストーブ列車(151レ)・田んぼアート冬期通過・急行もりよし・地下鉄・飯坂線 実運行確認成功');

  // 6. getAlternateStations 他社別名駅連携検証
  const owaniSt = LINES_REGISTRY.konan_owani.stations.find((s) => s.name === '大鰐');
  const tsgSt = LINES_REGISTRY.tsugaru_railway.stations.find((s) => s.name === '津軽五所川原');
  const takasuSt = LINES_REGISTRY.akita_nairiku.stations.find((s) => s.name === '鷹巣');
  assert.ok(
    getAlternateStations(owaniSt).some((x) => x.station.name === '大鰐温泉' && x.station.lineId === 'jr_ou_akita_aomori'),
    '大鰐 <-> 大鰐温泉 乗換検索'
  );
  assert.ok(
    getAlternateStations(tsgSt).some((x) => x.station.name === '五所川原' && x.station.lineId === 'jr_gono'),
    '津軽五所川原 <-> 五所川原 乗換検索'
  );
  assert.ok(
    getAlternateStations(takasuSt).some((x) => x.station.name === '鷹ノ巣' && x.station.lineId === 'jr_ou_akita_aomori'),
    '鷹巣 <-> 鷹ノ巣 乗換検索'
  );
  console.log('✅ 6. getAlternateStations 他社別名乗換（大鰐/津軽五所川原/鷹巣）検証成功');

  // 7. 全登録路線統計の算出（ドキュメント更新用）
  const allLines = Object.values(LINES_REGISTRY);
  const ops = new Set(allLines.map((l) => l.operator));
  const stIds = new Set<string>();
  const stNames = new Set<string>();
  let rawCount = 0;
  for (const l of allLines) {
    rawCount += l.stations.length;
    for (const s of l.stations) {
      stIds.add(s.id);
      stNames.add(s.name);
    }
  }
  console.log(`📊 統計: ${ops.size}事業者 / ${allLines.length}路線 / ユニーク駅名=${stNames.size} / 駅ID=${stIds.size} / 延べ=${rawCount}駅`);
  console.log(`📊 内訳: JR東日本=${allLines.filter((l) => l.operator === 'JR東日本').length}路線 / 東北エリア=${tohokuGroup.lines.length}路線`);

  console.log('\n🎉 すべての東北エリア＋JR米坂線 総合検証テストが正常に完了しました！');
}

main().catch((err) => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
