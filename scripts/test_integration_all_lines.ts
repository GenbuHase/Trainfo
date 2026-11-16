/**
 * Trainfo 全174路線 横断総合結合試験スイート (All-Lines Integration Tests)
 * 対象範囲: 全国全174路線（東日本・関東・東北・甲信越・東海・近畿・山陰）
 * 検証項目:
 *   1. 全174路線ロード後の全直通ポインタ (throughTripId / prevTripId) 参照整合性確認
 *   2. 東日本・首都圏・東北・甲信越・東海・近畿・山陰の主要境界リンク成立・双方向確認
 *   3. 実シミュレーション (calculateActiveTrains) による全国主要エリア 越境ハンドオーバー連続追尾
 *   4. 全国主要ターミナル駅（東京・新宿・仙台・名古屋・京都・大阪・姫路等）の発車標結合検証
 */
import assert from 'node:assert/strict';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import {
  formatTrainNumber,
  timeStringToSeconds,
  getFullDayStationTimetable,
  getThroughChainTrips,
} from '../src/data/timetableData';
import { calculateDistanceKm } from '../src/data/trackGeometry';
import { getAllLines, getLine } from '../src/data/linesRegistry';
import { STATION_MAP } from '../src/data/stations';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import type { ActiveTrain, LineId, TimetableTrip } from '../src/types';

function resolveSelectedTrain(
  activeTrains: ActiveTrain[],
  selectedTrainId: string | null,
  lastSelectedTrain: ActiveTrain | null
): ActiveTrain | null {
  if (!selectedTrainId) return null;
  const found = activeTrains.find((t) => t.tripId === selectedTrainId);
  if (found) return found;

  const prev = lastSelectedTrain;
  if (prev) {
    const prevNo = formatTrainNumber(prev.trainNumber, prev.tripId);
    const successor = activeTrains.find((t) => {
      if (t.tripId === prev.tripId) return false;
      if (
        (prev.throughTripId && t.tripId === prev.throughTripId) ||
        (t.throughTripId && t.throughTripId === prev.tripId)
      ) {
        return true;
      }
      const curNo = formatTrainNumber(t.trainNumber, t.tripId);
      if (curNo && prevNo && curNo === prevNo && t.direction === prev.direction) {
        return true;
      }
      return false;
    });
    if (successor) return successor;
  }
  return null;
}

let passed = 0;
let failed = 0;

function check(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ❌ FAIL: ${name}\n     -> ${err.message}`);
    failed++;
  }
}

async function runAllLinesIntegrationTests() {
  console.log('================================================================');
  console.log('  Trainfo 全174路線 横断総合結合試験スイート');
  console.log('================================================================\n');

  const allLines = getAllLines();
  const allLineIds = allLines.map((l) => l.id as LineId);
  console.log(`Loading all ${allLineIds.length} lines via timetableLoader...`);
  await loadLinesTimetables(allLineIds);
  console.log('All timetables loaded.\n');

  // -----------------------------------------------------------------------
  // 1. 全174路線 全トリップ参照整合性（ダングリングリンクゼロ）
  // -----------------------------------------------------------------------
  console.log('--- [Integration 1] 全174路線 直通参照ポインタ実在整合性監査 ---');
  check('全174路線: throughTripId / prevTripId / coupling 参照先不在ゼロ', () => {
    const globalMap = new Map<string, TimetableTrip>();
    for (const line of allLines) {
      for (const trip of line.globalTimetable) {
        globalMap.set(trip.tripId, trip);
      }
    }

    let brokenThrough = 0;
    let brokenPrev = 0;
    let brokenCoupling = 0;

    for (const trip of globalMap.values()) {
      if (trip.throughTripId && !globalMap.has(trip.throughTripId)) brokenThrough++;
      if (trip.prevTripId && !globalMap.has(trip.prevTripId)) brokenPrev++;
      if (trip.coupling?.coupledTripId && !globalMap.has(trip.coupling.coupledTripId)) brokenCoupling++;
    }

    assert.equal(brokenThrough, 0, `参照先不在の throughTripId が ${brokenThrough} 件あります`);
    assert.equal(brokenPrev, 0, `参照先不在の prevTripId が ${brokenPrev} 件あります`);
    assert.equal(brokenCoupling, 0, `参照先不在の coupledTripId が ${brokenCoupling} 件あります`);
    console.log(`       総トリップ数=${globalMap.size}: 破損リンク 0件 確認`);
  });

  check('全174路線: 直通時間逆転ゼロ & 暗黙チェーン境界ジャンプゼロ (伊豆急->中央本線, 新幹線->在来線等防止)', () => {
    const globalMap = new Map<string, TimetableTrip>();
    for (const line of allLines) {
      for (const trip of line.globalTimetable) {
        globalMap.set(trip.tripId, trip);
      }
    }

    // 明示リンクの時刻逆転検査（4時日跨ぎ補正あり）
    let timeReversalCount = 0;
    for (const trip of globalMap.values()) {
      if (!trip.throughTripId) continue;
      const next = globalMap.get(trip.throughTripId);
      if (!next) continue;
      const endStop = trip.stops[trip.stops.length - 1];
      const startStop = next.stops[0];
      if (!endStop || !startStop) continue;
      const eSec = timeStringToSeconds(endStop.arrivalTime || endStop.departureTime);
      const sSec = timeStringToSeconds(startStop.departureTime || startStop.arrivalTime);
      let diff = sSec - eSec;
      if (diff < -18 * 3600) diff += 86400;
      if (diff < -60) timeReversalCount++;
    }
    assert.equal(timeReversalCount, 0, `明示直通リンクの時間逆転が ${timeReversalCount} 件あります`);

    // 全チェーン境界距離 & 系統混入検査
    const allowedExplicitJumpPairs = new Set([
      'shonan_shinjuku->yokosuka',
      'yokosuka->shonan_shinjuku',
      'takasaki->ryomo',
      'ryomo->takasaki',
      'chuo->sobu_rapid',
    ]);
    const seenSigs = new Set<string>();
    const unexpectedJumps: string[] = [];
    for (const tripId of globalMap.keys()) {
      const chain = getThroughChainTrips(tripId);
      const sig = chain.map((c) => c.tripId).join('>');
      if (seenSigs.has(sig)) continue;
      seenSigs.add(sig);

      const lineIds = chain.map((c) => c.lineId);
      if (lineIds.includes('izukyu') || lineIds.includes('ito')) {
        assert.ok(
          !lineIds.includes('chuo') && !lineIds.includes('chuo_main'),
          `伊豆急・伊東線チェーンに中央線系統が混入しています: ${sig}`
        );
      }
      if (lineIds.some((l) => l.endsWith('_shinkansen'))) {
        assert.ok(
          lineIds.every((l) => l.endsWith('_shinkansen')),
          `新幹線チェーンに在来線が混入しています: ${sig}`
        );
      }

      for (let i = 0; i < chain.length - 1; i++) {
        const a = chain[i];
        const b = chain[i + 1];
        const stA = STATION_MAP.get(a.stops[a.stops.length - 1]?.stationId);
        const stB = STATION_MAP.get(b.stops[0]?.stationId);
        if (!stA || !stB) continue;
        const dist = calculateDistanceKm(stA.lat, stA.lng, stB.lat, stB.lng);
        const isExplicit = a.throughTripId === b.tripId || b.prevTripId === a.tripId;
        const pairKey = `${a.lineId}->${b.lineId}`;
        if (dist > 2.5 && (!isExplicit || !allowedExplicitJumpPairs.has(pairKey))) {
          unexpectedJumps.push(`${pairKey} (${stA.name}->${stB.name}, ${dist.toFixed(2)}km)`);
        }
      }
    }
    assert.equal(unexpectedJumps.length, 0, `不正チェーン境界ジャンプ検出: ${unexpectedJumps.slice(0, 5).join(', ')}`);
  });

  check('あずさ5号 (42780) & あずさ38号 (42025): 多線直通チェーン整列順・非循環検証', () => {
    const azusa5 = getThroughChainTrips('WD_OUT_JC-05_0800_42780').map((t) => t.lineId);
    assert.deepEqual(azusa5, ['chuo', 'chuo_main', 'shinonoi', 'oito_east']);

    const azusa38 = getThroughChainTrips('WD_INB_OIE-29_1343_42025');
    assert.deepEqual(
      azusa38.map((t) => t.lineId),
      ['oito_east', 'shinonoi', 'chuo_main', 'chuo']
    );
    assert.equal(azusa38[azusa38.length - 1].throughTripId, undefined);
  });

  // -----------------------------------------------------------------------
  // 2. 全国主要直通境界の成立確認（東北・関東・甲信越・東海・関西・山陰）
  // -----------------------------------------------------------------------
  console.log('\n--- [Integration 2] 全国主要エリア 境界直通リンク成立検証 ---');
  const nationalPairs: Array<[LineId, LineId, string]> = [
    // 東北・新幹線
    ['tohoku_shinkansen', 'yamagata_shinkansen', '福島 (東北新幹線->山形新幹線 つばさ)'],
    ['tohoku_shinkansen', 'akita_shinkansen', '盛岡 (東北新幹線->秋田新幹線 こまち)'],
    ['tohoku_ichinoseki_morioka', 'igr_iwate_ginga', '盛岡 (東北本線->IGRいわて銀河鉄道)'],
    ['igr_iwate_ginga', 'aoimori', '目時 (IGRいわて銀河鉄道->青い森鉄道)'],
    ['sendai_airport', 'tohoku_fukushima_sendai', '名取 (仙台空港線->東北本線)'],
    ['senseki_tohoku', 'senseki', '高城町 (仙石東北ライン->仙石線)'],
    // 関東・首都圏私鉄/JR
    ['yurakucho', 'seibu_yurakucho', '小竹向原 (有楽町線->西武有楽町線)'],
    ['seibu_yurakucho', 'seibu_ikebukuro', '練馬 (西武有楽町線->西武池袋線)'],
    ['tokyu_toyoko', 'minatomirai', '横浜 (東急東横線->みなとみらい線)'],
    ['sotetsu_main', 'sotetsu_shin_yokohama', '西谷 (相鉄本線->相鉄新横浜線)'],
    ['sotetsu_shin_yokohama', 'sotetsu_jr_direct', '羽沢横浜国大 (相鉄新横浜線->相鉄JR直通線)'],
    ['sotetsu_jr_direct', 'saikyo', '新宿方面 (相鉄JR直通線->埼京線)'],
    ['chuo', 'chuo_main', '高尾 (中央線快速->中央本線)'],
    ['chuo_main', 'shinonoi', '塩尻 (中央本線->篠ノ井線)'],
    ['tokaido', 'ito', '熱海 (東海道線->伊東線)'],
    ['ito', 'izukyu', '伊東 (伊東線->伊豆急行線)'],
    ['odakyu_odawara', 'gotemba', '松田/新松田 (小田急小田原線->御殿場線 ふじさん)'],
    // 東海・近畿・山陰
    ['jr_chuo_west', 'shinonoi', '塩尻 (中央西線->篠ノ井線 しなの)'],
    ['tokaido_toyohashi_maibara', 'jr_takayama', '岐阜 (東海道線->高山線 ひだ)'],
    ['tokaido_toyohashi_maibara', 'jr_hokuriku_maibara_tsuruga', '米原 (東海道線->北陸線 しらさぎ)'],
    ['jr_gakken_toshi', 'jr_tozai', '京橋 (学研都市線->JR東西線)'],
    ['jr_tozai', 'jr_takarazuka', '尼崎 (JR東西線->JR宝塚線)'],
    ['jr_osaka_loop', 'jr_hanwa', '天王寺 (大阪環状線->阪和線)'],
    ['jr_hanwa', 'jr_kansai_airport', '日根野 (阪和線->関西空港線)'],
    ['jr_biwako', 'jr_kosei', '山科 (琵琶湖線->湖西線)'],
    ['jr_kosei', 'jr_hokuriku_maibara_tsuruga', '近江塩津 (湖西線->北陸線)'],
    ['jr_sanin_sonobe_kinosaki', 'jr_maizuru', '綾部 (山陰線->舞鶴線)'],
    ['jr_yamatoji', 'jr_wakayama', '王寺 (大和路線->和歌山線)'],
    ['jr_kinokuni', 'jr_kisei_kameyama_shingu', '新宮 (きのくに線->紀勢線)'],
  ];

  for (const [lineA, lineB, label] of nationalPairs) {
    check(`${label}`, () => {
      const defA = getLine(lineA)!;
      const defB = getLine(lineB)!;
      const mapB = new Map(defB.globalTimetable.map((t) => [t.tripId, t]));
      const linked = defA.globalTimetable.filter((t) => t.throughLineId === lineB);
      assert.ok(linked.length > 0, `直通リンク本数が 0 本です (${lineA} -> ${lineB})`);
      for (const tA of linked) {
        assert.ok(mapB.has(tA.throughTripId!), `直通先トリップ不在: ${tA.tripId} -> ${tA.throughTripId}`);
      }
    });
  }

  // -----------------------------------------------------------------------
  // 3. 実シミュレーション 全国代表越境ハンドオーバー 連続座標追尾
  // -----------------------------------------------------------------------
  console.log('\n--- [Integration 3] 実シミュレーション 全国主要エリア越境連続追尾 ---');

  function traceTrip(
    trip: TimetableTrip,
    targetLines: LineId[],
    expectedLines: LineId[],
    maxHours = 5
  ) {
    const startSec = timeStringToSeconds(trip.stops[0].departureTime);
    const seenLines = new Set<string>();
    let trackedId: string | null = trip.tripId;
    let lastSelected: ActiveTrain | null = null;
    let prevPos: { lat: number; lng: number } | null = null;
    let maxJumpKm = 0;

    for (let sec = startSec + 10; sec <= startSec + maxHours * 3600; sec += 30) {
      const active = calculateActiveTrains({
        currentSec: sec,
        isHoliday: trip.isHoliday,
        globalDelayMinutes: 0,
        randomDelays: {},
        isPlaying: true,
        speedMultiplier: 1,
        selectedLineIds: targetLines,
      });

      const selected = resolveSelectedTrain(active, trackedId, lastSelected);
      if (selected) {
        seenLines.add(selected.lineId);
        if (prevPos) {
          const jump = calculateDistanceKm(prevPos.lat, prevPos.lng, selected.currentLat, selected.currentLng);
          if (jump > maxJumpKm) maxJumpKm = jump;
          // 30秒間の上限: 新幹線320km/h≒2.67km/30s を踏まえ 4.0km 未満（在来線は 2.5km未満想定だが東北/東海新幹線含むため4.0km）
          assert.ok(jump < 4.0, `30秒間で異常ジャンプ検出 (${jump.toFixed(2)}km) @ sec=${sec}, line=${selected.lineId}`);
        }
        prevPos = { lat: selected.currentLat, lng: selected.currentLng };
        lastSelected = selected;
        trackedId = selected.tripId;
      } else if (lastSelected && !lastSelected.throughTripId) {
        break;
      }
    }

    for (const exp of expectedLines) {
      assert.ok(seenLines.has(exp), `期待路線 ${exp} を通過しませんでした (実際: ${[...seenLines].join(',')})`);
    }
    return { seenLines: [...seenLines], maxJumpKm };
  }

  check('首都圏: 西武池袋線 -> 西武有楽町線 -> 副都心線 -> 東急東横線 -> みなとみらい線 5線直通', () => {
    const fuk = getLine('fukutoshin')!;
    const seibuYu = getLine('seibu_yurakucho')!;
    const toyoko = getLine('tokyu_toyoko')!;
    const seibuIke = getLine('seibu_ikebukuro')!;
    const seibuYuMap = new Map(seibuYu.globalTimetable.map((t) => [t.tripId, t]));
    const fukMap = new Map(fuk.globalTimetable.map((t) => [t.tripId, t]));
    const toyokoMap = new Map(toyoko.globalTimetable.map((t) => [t.tripId, t]));

    const fiveLineTrip = seibuIke.globalTimetable.find((t) => {
      if (t.isHoliday || t.throughLineId !== 'seibu_yurakucho' || !t.throughTripId) return false;
      const t2 = seibuYuMap.get(t.throughTripId);
      if (!t2 || t2.throughLineId !== 'fukutoshin' || !t2.throughTripId) return false;
      const t3 = fukMap.get(t2.throughTripId);
      if (!t3 || t3.throughLineId !== 'tokyu_toyoko' || !t3.throughTripId) return false;
      const t4 = toyokoMap.get(t3.throughTripId);
      return Boolean(t4 && t4.throughLineId === 'minatomirai' && t4.throughTripId);
    })!;
    assert.ok(fiveLineTrip, '西武〜副都心〜東急〜MM線 5線直通便が見つかりません');
    const res = traceTrip(
      fiveLineTrip,
      ['seibu_ikebukuro', 'seibu_yurakucho', 'fukutoshin', 'tokyu_toyoko', 'minatomirai'],
      ['seibu_ikebukuro', 'seibu_yurakucho', 'fukutoshin', 'tokyu_toyoko', 'minatomirai']
    );
    console.log(`       5線直通成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  check('甲信越: 特急アルプス 4線貫通追尾 (新宿 chuo -> chuo_main -> shinonoi -> 白馬 oito_east)', () => {
    const chuo = getLine('chuo')!;
    const alps = chuo.globalTimetable.find((t) => !t.isHoliday && t.trainId === '42781')!;
    assert.ok(alps, '特急アルプス (42781) が見つかりません');
    assert.equal(alps.customDestination, '白馬');
    const chain = getThroughChainTrips(alps.tripId);
    assert.equal(chain.length, 4, `アルプス直通チェーン数が4ではありません (${chain.length})`);
    console.log(`       4線チェーン確認: ${chain.map((c) => c.lineId).join(' -> ')} (行先=${alps.customDestination})`);
  });

  check('東北: 石巻線 -> 仙石線 -> 仙石東北ライン -> 東北本線 4線直通追尾', () => {
    const ishinomaki = getLine('ishinomaki')!;
    const senseki = getLine('senseki')!;
    const sensekiTohoku = getLine('senseki_tohoku')!;
    const sMap = new Map(senseki.globalTimetable.map((t) => [t.tripId, t]));
    const stMap = new Map(sensekiTohoku.globalTimetable.map((t) => [t.tripId, t]));
    const fourLine = ishinomaki.globalTimetable.find((t) => {
      if (t.isHoliday || t.throughLineId !== 'senseki' || !t.throughTripId) return false;
      const t2 = sMap.get(t.throughTripId);
      if (!t2 || t2.throughLineId !== 'senseki_tohoku' || !t2.throughTripId) return false;
      const t3 = stMap.get(t2.throughTripId);
      return Boolean(t3 && t3.throughLineId === 'tohoku_sendai_ichinoseki' && t3.throughTripId);
    })!;
    assert.ok(fourLine, '石巻線->仙石線->仙石東北ライン->東北本線 4線直通便が見つかりません');
    const res = traceTrip(
      fourLine,
      ['ishinomaki', 'senseki', 'senseki_tohoku', 'tohoku_sendai_ichinoseki'],
      ['ishinomaki', 'senseki', 'senseki_tohoku', 'tohoku_sendai_ichinoseki']
    );
    console.log(`       4線直通成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  check('中部・甲信越: 特急しなの号 (名古屋 jr_chuo_west -> shinonoi 長野) 連続追尾', () => {
    const cw = getLine('jr_chuo_west')!;
    const shinano = cw.globalTimetable.find(
      (t) => !t.isHoliday && t.trainType === 'limitedExp' && t.throughLineId === 'shinonoi'
    )!;
    assert.ok(shinano && shinano.trainName?.includes('しなの'));
    const res = traceTrip(shinano, ['jr_chuo_west', 'shinonoi'], ['jr_chuo_west', 'shinonoi']);
    console.log(`       越境追尾成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  check('近畿・関西: 琵琶湖線 -> 湖西線 -> 北陸本線 新快速3線貫通追尾', () => {
    const bw = getLine('jr_biwako')!;
    const ksMap = new Map(getLine('jr_kosei')!.globalTimetable.map((t) => [t.tripId, t]));
    const sk = bw.globalTimetable.find((t) => {
      if (t.isHoliday || t.throughLineId !== 'jr_kosei' || !t.throughTripId) return false;
      const mid = ksMap.get(t.throughTripId);
      return Boolean(mid && mid.throughLineId === 'jr_hokuriku_maibara_tsuruga' && mid.throughTripId);
    })!;
    assert.ok(sk, '琵琶湖線->湖西線->北陸線 3線直通が見つかりません');
    const res = traceTrip(
      sk,
      ['jr_biwako', 'jr_kosei', 'jr_hokuriku_maibara_tsuruga'],
      ['jr_biwako', 'jr_kosei', 'jr_hokuriku_maibara_tsuruga']
    );
    console.log(`       3線直通成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  // -----------------------------------------------------------------------
  // 4. 全国主要ターミナル駅 発車標結合検証
  // -----------------------------------------------------------------------
  console.log('\n--- [Integration 4] 全国主要ハブ・修復新設駅 発車標結合検証 ---');
  const hubStations: Array<[LineId, string]> = [
    ['yamanote', '東京'],
    ['chuo', '新宿'],
    ['utsunomiya', '大宮'],
    ['tohoku_fukushima_sendai', '仙台'],
    ['tokaido_toyohashi_maibara', '名古屋'],
    ['jr_biwako', '京都'],
    ['jr_osaka_loop', '大阪'],
    ['jr_hanwa', '天王寺'],
    ['jr_sanyo_himeji_kamigori', '姫路'],
    ['jr_sanyo_himeji_kamigori', '手柄山平和公園'],
    ['jr_taita', '小泉'],
    ['jr_kansai_kameyama_kamo', '新堂'],
    ['jr_kinokuni', '紀伊姫'],
  ];

  for (const [lid, stName] of hubStations) {
    check(`${lid} ${stName}: 発車標解決 >= 10本`, () => {
      const line = getLine(lid)!;
      const st = line.stations.find((s) => s.name === stName)!;
      assert.ok(st, `${lid} に ${stName} が見つかりません`);
      const board = getFullDayStationTimetable(st.id, false, lid);
      const cnt = board.reduce((s, h) => s + h.inbound.length + h.outbound.length, 0);
      assert.ok(cnt >= 10, `${lid} ${stName} の平日発車本数が不足しています (${cnt}本)`);
    });
  }

  console.log('\n================================================================');
  console.log(`  全路線横断総合結合試験サマリー: PASS=${passed}, FAIL=${failed}`);
  console.log('================================================================');
  if (failed > 0) process.exit(1);
}

runAllLinesIntegrationTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
