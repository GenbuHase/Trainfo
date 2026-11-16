/**
 * Trainfo JR東海・JR西日本（全38路線＋周辺直通）包括的結合試験スイート (Integration Tests)
 * 検証項目:
 *   1. 全直通境界ペアの双方向リンク対称性・接続成立確認
 *   2. 動的時刻表ロード (loadLinesTimetables) + シミュレーション (calculateActiveTrains) 結合動作
 *   3. 複数路線越境ハンドオーバー (塩尻・京橋・尼崎・天王寺・日根野・山科・近江塩津・綾部 等)
 *   4. 大阪環状線 周回走行 & 直通シームレス遷移
 *   5. 北陸本線 鳩原ループ線 上下線別線の実列車走行座標分離検証
 *   6. 特急固有名称の走行中保持 & 全修復駅（手柄山平和公園/小泉/新堂/紀伊姫/JR各駅等）の発車標結合検証
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { calculateActiveTrains } from '../src/services/trainSimulation';
import {
  formatTrainNumber,
  timeStringToSeconds,
  getFullDayStationTimetable,
} from '../src/data/timetableData';
import { calculateDistanceKm } from '../src/data/trackGeometry';
import { getLine } from '../src/data/linesRegistry';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import type { ActiveTrain, LineId, TimetableTrip } from '../src/types';

// UI(App.tsx / useTrainTracker)の追尾引き継ぎロジックを忠実に再現
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

const TARGET_LINES: LineId[] = [
  // 接続元の既存路線
  'jr_tokaido_toyohashi_maibara',
  'jr_shinonoi',
  'jr_biwako',
  'jr_kyoto',
  'jr_kobe',
  // Wave 1 (10)
  'jr_chuo_west',
  'jr_takayama',
  'jr_kansai_nagoya_kameyama',
  'jr_kisei_kameyama_shingu',
  'jr_iida',
  'jr_minobu',
  'jr_taketoyo',
  'jr_taita',
  'jr_meisho',
  'jr_sangu',
  // Wave 2 (11)
  'jr_osaka_loop',
  'jr_yumesaki',
  'jr_tozai',
  'jr_gakken_toshi',
  'jr_takarazuka',
  'jr_fukuchiyama_north',
  'jr_yamatoji',
  'jr_osaka_higashi',
  'jr_hanwa',
  'jr_kansai_airport',
  'jr_hokuriku_maibara_tsuruga',
  // Wave 3 & 4 (17)
  'jr_sagano',
  'jr_sanin_sonobe_kinosaki',
  'jr_kosei',
  'jr_kusatsu',
  'jr_nara',
  'jr_sakurai',
  'jr_wakayama',
  'jr_kinokuni',
  'jr_kansai_kameyama_kamo',
  'jr_sanyo_himeji_kamigori',
  'jr_ako',
  'jr_kakogawa',
  'jr_kishin',
  'jr_bantan',
  'jr_maizuru',
  'jr_obama',
  'jr_wadamisaki',
];

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

async function runIntegrationTests() {
  console.log('================================================================');
  console.log('  Trainfo 東海・近畿・山陰 (JR東海/JR西日本) 結合試験スイート');
  console.log('================================================================\n');

  console.log('Loading timetables for 43 lines via timetableLoader...');
  await loadLinesTimetables(TARGET_LINES);
  console.log('Timetables loaded successfully.\n');

  // -----------------------------------------------------------------------
  // 1. 主要境界直通ペアの双方向リンク結合検証
  // -----------------------------------------------------------------------
  console.log('--- [Integration 1] 主要直通境界の双方向リンク成立・時刻検証 ---');
  const requiredThroughPairs: Array<[LineId, LineId, string]> = [
    ['jr_chuo_west', 'jr_shinonoi', '塩尻 (中央西線->篠ノ井線)'],
    ['jr_tokaido_toyohashi_maibara', 'jr_takayama', '岐阜 (東海道線->高山線 特急ひだ)'],
    ['jr_takayama', 'jr_tokaido_toyohashi_maibara', '岐阜 (高山線->東海道線 特急ひだ)'],
    ['jr_kisei_kameyama_shingu', 'jr_sangu', '多気 (紀勢線->参宮線 快速みえ)'],
    ['jr_sangu', 'jr_kisei_kameyama_shingu', '多気 (参宮線->紀勢線 快速みえ)'],
    ['jr_tokaido_toyohashi_maibara', 'jr_taketoyo', '大府 (東海道線->武豊線)'],
    ['jr_taketoyo', 'jr_tokaido_toyohashi_maibara', '大府 (武豊線->東海道線)'],
    ['jr_tokaido_toyohashi_maibara', 'jr_hokuriku_maibara_tsuruga', '米原 (東海道線->北陸線 しらさぎ)'],
    ['jr_hokuriku_maibara_tsuruga', 'jr_tokaido_toyohashi_maibara', '米原 (北陸線->東海道線 しらさぎ)'],
    ['jr_tozai', 'jr_gakken_toshi', '京橋 (JR東西線->学研都市線)'],
    ['jr_gakken_toshi', 'jr_tozai', '京橋 (学研都市線->JR東西線)'],
    ['jr_tozai', 'jr_takarazuka', '尼崎 (JR東西線->JR宝塚線)'],
    ['jr_takarazuka', 'jr_tozai', '尼崎 (JR宝塚線->JR東西線)'],
    ['jr_takarazuka', 'jr_fukuchiyama_north', '篠山口 (宝塚線->福知山線)'],
    ['jr_fukuchiyama_north', 'jr_takarazuka', '篠山口 (福知山線->宝塚線)'],
    ['jr_hanwa', 'jr_kansai_airport', '日根野 (阪和線->関西空港線)'],
    ['jr_kansai_airport', 'jr_hanwa', '日根野 (関西空港線->阪和線)'],
    ['jr_osaka_loop', 'jr_hanwa', '天王寺 (大阪環状線->阪和線)'],
    ['jr_hanwa', 'jr_osaka_loop', '天王寺 (阪和線->大阪環状線)'],
    ['jr_osaka_loop', 'jr_yamatoji', '新今宮 (大阪環状線->大和路線)'],
    ['jr_yamatoji', 'jr_osaka_loop', '新今宮 (大和路線->大阪環状線)'],
    ['jr_osaka_loop', 'jr_yumesaki', '西九条 (大阪環状線->ゆめ咲線)'],
    ['jr_yumesaki', 'jr_osaka_loop', '西九条 (ゆめ咲線->大阪環状線)'],
    ['jr_yamatoji', 'jr_osaka_higashi', '久宝寺 (大和路線->おおさか東線)'],
    ['jr_kosei', 'jr_biwako', '山科 (湖西線->琵琶湖線/京都)'],
    ['jr_biwako', 'jr_kosei', '山科 (琵琶湖線/京都->湖西線)'],
    ['jr_biwako', 'jr_hokuriku_maibara_tsuruga', '米原 (琵琶湖線->北陸線)'],
    ['jr_hokuriku_maibara_tsuruga', 'jr_biwako', '米原 (北陸線->琵琶湖線)'],
    ['jr_kusatsu', 'jr_biwako', '草津 (草津線->琵琶湖線)'],
    ['jr_biwako', 'jr_kusatsu', '草津 (琵琶湖線->草津線)'],
    ['jr_sagano', 'jr_sanin_sonobe_kinosaki', '園部 (嵯峨野線->山陰線)'],
    ['jr_sanin_sonobe_kinosaki', 'jr_sagano', '園部 (山陰線->嵯峨野線)'],
    ['jr_sanin_sonobe_kinosaki', 'jr_maizuru', '綾部 (山陰線->舞鶴線)'],
    ['jr_maizuru', 'jr_sanin_sonobe_kinosaki', '綾部 (舞鶴線->山陰線)'],
    ['jr_bantan', 'jr_sanin_sonobe_kinosaki', '和田山 (播但線->山陰線)'],
    ['jr_sanin_sonobe_kinosaki', 'jr_bantan', '和田山 (山陰線->播但線)'],
    ['jr_hanwa', 'jr_kinokuni', '和歌山 (阪和線->きのくに線)'],
    ['jr_kinokuni', 'jr_hanwa', '和歌山 (きのくに線->阪和線)'],
    ['jr_sanyo_himeji_kamigori', 'jr_ako', '相生 (山陽線->赤穂線)'],
    ['jr_ako', 'jr_sanyo_himeji_kamigori', '相生 (赤穂線->山陽線)'],
    ['jr_yamatoji', 'jr_wakayama', '王寺 (大和路線->和歌山線)'],
    ['jr_wakayama', 'jr_yamatoji', '王寺 (和歌山線->大和路線)'],
    ['jr_kinokuni', 'jr_kisei_kameyama_shingu', '新宮 (きのくに線->紀勢線)'],
  ];

  for (const [lineA, lineB, label] of requiredThroughPairs) {
    check(`${label}`, () => {
      const defA = getLine(lineA)!;
      const defB = getLine(lineB)!;
      const mapB = new Map(defB.globalTimetable.map((t) => [t.tripId, t]));
      const linked = defA.globalTimetable.filter((t) => t.throughLineId === lineB);
      assert.ok(linked.length > 0, `直通リンク本数が 0 本です (${lineA} -> ${lineB})`);
      for (const tA of linked) {
        const tB = mapB.get(tA.throughTripId!);
        assert.ok(tB, `直通先トリップ不在: ${tA.tripId} -> ${tA.throughTripId}`);
        assert.equal(tB.prevTripId, tA.tripId, `双方向リンク不整合: ${tA.tripId} <-> ${tB.tripId}`);
      }
    });
  }

  // -----------------------------------------------------------------------
  // 2. 実シミュレーションによる越境ハンドオーバー統合テスト
  // -----------------------------------------------------------------------
  console.log('\n--- [Integration 2] 実シミュレーション 越境ハンドオーバー & 連続座標追尾 ---');

  // Helper: 指定されたトリップの全運行区間を5分または1分刻みで追跡し、直通先への途切れない遷移と座標の連続性を検証
  function traceThroughTrip(initialLineId: LineId, trip: TimetableTrip, targetLines: LineId[], expectedFinalLineId?: LineId) {
    const startSec = timeStringToSeconds(trip.stops[0].departureTime);
    const seenLines = new Set<string>();
    let trackedId: string | null = trip.tripId;
    let lastSelected: ActiveTrain | null = null;
    let prevPos: { lat: number; lng: number } | null = null;
    let maxJumpKm = 0;

    // 開始から最大4時間追跡 (30秒刻み)
    for (let sec = startSec + 10; sec <= startSec + 4 * 3600; sec += 30) {
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
          // 30秒で 2.5km 以上瞬間移動しないこと (在来線最大時速130km=1.08km/30s)
          assert.ok(jump < 2.5, `30秒間で異常ジャンプ検出 (${jump.toFixed(2)}km) @ sec=${sec}, line=${selected.lineId}`);
        }
        prevPos = { lat: selected.currentLat, lng: selected.currentLng };
        lastSelected = selected;
        trackedId = selected.tripId;
      } else if (lastSelected && (!lastSelected.throughTripId)) {
        // 終着まで走りきった場合は終了
        break;
      }
    }

    assert.ok(seenLines.size >= 2, `複数路線を跨ぐはずが ${[...seenLines].join(',')} のみでした`);
    if (expectedFinalLineId) {
      assert.ok(seenLines.has(expectedFinalLineId), `最終目的地路線 ${expectedFinalLineId} に到達しませんでした (${[...seenLines].join(',')})`);
    }
    return { seenLines: [...seenLines], maxJumpKm };
  }

  check('シナリオ1: 特急しなの号 (名古屋 -> 塩尻越境 -> 篠ノ井線 長野) シームレス追尾＆固有名称保持', () => {
    const jr_chuo = getLine('jr_chuo_west')!;
    const shinano = jr_chuo.globalTimetable.find(
      (t) => !t.isHoliday && t.trainType === 'limitedExp' && t.throughLineId === 'jr_shinonoi'
    )!;
    assert.ok(shinano && shinano.trainName, 'しなの号トリップが見つかりません');
    const res = traceThroughTrip('jr_chuo_west', shinano, ['jr_chuo_west', 'jr_shinonoi'], 'jr_shinonoi');
    assert.ok(shinano.trainName.includes('しなの'), `列車愛称不正: ${shinano.trainName}`);
    console.log(`       通過路線: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km (${shinano.trainName})`);
  });

  check('シナリオ2: アーバン3線貫通直通 (学研都市線 -> 京橋 -> JR東西線 -> 尼崎 -> JR宝塚線)', () => {
    const gakken = getLine('jr_gakken_toshi')!;
    const tozai = getLine('jr_tozai')!;
    // 学研都市線から東西線へ、さらに東西線から宝塚線へ繋がる3線連鎖トリップを探す
    const tozaiMap = new Map(tozai.globalTimetable.map((t) => [t.tripId, t]));
    const threeLineTrip = gakken.globalTimetable.find((t) => {
      if (t.isHoliday || t.throughLineId !== 'jr_tozai' || !t.throughTripId) return false;
      const mid = tozaiMap.get(t.throughTripId);
      return mid && mid.throughLineId === 'jr_takarazuka' && mid.throughTripId;
    })!;
    assert.ok(threeLineTrip, '学研都市線->東西線->宝塚線の3線貫通トリップが見つかりません');
    const res = traceThroughTrip(
      'jr_gakken_toshi',
      threeLineTrip,
      ['jr_gakken_toshi', 'jr_tozai', 'jr_takarazuka'],
      'jr_takarazuka'
    );
    assert.equal(res.seenLines.length, 3, `3路線貫通していません: ${res.seenLines.join(',')}`);
    console.log(`       3線貫通成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  check('シナリオ3: 関空快速 3線貫通直通 (大阪環状線内回り -> 天王寺 -> 阪和線 -> 日根野 -> 関西空港線)', () => {
    const loop = getLine('jr_osaka_loop')!;
    const hanwa = getLine('jr_hanwa')!;
    const hanwaMap = new Map(hanwa.globalTimetable.map((t) => [t.tripId, t]));
    const kankuTrip = loop.globalTimetable.find((t) => {
      if (t.isHoliday || t.trainType !== 'kanku_rapid' || t.throughLineId !== 'jr_hanwa' || !t.throughTripId) return false;
      const mid = hanwaMap.get(t.throughTripId);
      return mid && mid.throughLineId === 'jr_kansai_airport' && mid.throughTripId;
    })!;
    assert.ok(kankuTrip, '大阪環状線->阪和線->関西空港線の3線貫通関空快速が見つかりません');
    const res = traceThroughTrip(
      'jr_osaka_loop',
      kankuTrip,
      ['jr_osaka_loop', 'jr_hanwa', 'jr_kansai_airport'],
      'jr_kansai_airport'
    );
    assert.equal(res.seenLines.length, 3);
    console.log(`       関空快速3線貫通成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  check('シナリオ4: 琵琶湖線(京都) -> 山科 -> 湖西線 -> 近江塩津 -> 北陸線(敦賀) 3線貫通新快速', () => {
    const biwako = getLine('jr_biwako')!;
    const kosei = getLine('jr_kosei')!;
    const koseiMap = new Map(kosei.globalTimetable.map((t) => [t.tripId, t]));
    const shinkaisoku = biwako.globalTimetable.find((t) => {
      if (t.isHoliday || t.throughLineId !== 'jr_kosei' || !t.throughTripId) return false;
      const mid = koseiMap.get(t.throughTripId);
      return mid && mid.throughLineId === 'jr_hokuriku_maibara_tsuruga' && mid.throughTripId;
    })!;
    assert.ok(shinkaisoku, '琵琶湖線->湖西線->北陸線の3線貫通列車が見つかりません');
    const res = traceThroughTrip(
      'jr_biwako',
      shinkaisoku,
      ['jr_biwako', 'jr_kosei', 'jr_hokuriku_maibara_tsuruga'],
      'jr_hokuriku_maibara_tsuruga'
    );
    assert.equal(res.seenLines.length, 3);
    console.log(`       湖西新快速3線貫通成功: ${res.seenLines.join(' -> ')}, 最大30s移動=${res.maxJumpKm.toFixed(2)}km`);
  });

  check('シナリオ5: 北陸本線 鳩原ループ線 (新疋田〜敦賀) 下りループ線と上り直線トンネルの上下別線実走行分離', () => {
    const hokuriku = getLine('jr_hokuriku_maibara_tsuruga')!;
    const stShin = hokuriku.stations.find((s) => s.name === '新疋田')!;
    const stTsuruga = hokuriku.stations.find((s) => s.name === '敦賀')!;

    const outTrip = hokuriku.globalTimetable.find(
      (t) => !t.isHoliday && t.direction === 'outbound' &&
        t.stops.some((s) => s.stationId === stShin.id) &&
        t.stops.some((s) => s.stationId === stTsuruga.id)
    )!;
    const inTrip = hokuriku.globalTimetable.find(
      (t) => !t.isHoliday && t.direction === 'inbound' &&
        t.stops.some((s) => s.stationId === stShin.id) &&
        t.stops.some((s) => s.stationId === stTsuruga.id)
    )!;
    assert.ok(outTrip && inTrip);

    const outS1 = outTrip.stops.find((s) => s.stationId === stShin.id)!;
    const outS2 = outTrip.stops.find((s) => s.stationId === stTsuruga.id)!;
    const outMidSec = Math.floor((timeStringToSeconds(outS1.departureTime) + timeStringToSeconds(outS2.arrivalTime)) / 2);

    const inS1 = inTrip.stops.find((s) => s.stationId === stTsuruga.id)!;
    const inS2 = inTrip.stops.find((s) => s.stationId === stShin.id)!;
    const inMidSec = Math.floor((timeStringToSeconds(inS1.departureTime) + timeStringToSeconds(inS2.arrivalTime)) / 2);

    const activeOut = calculateActiveTrains({
      currentSec: outMidSec,
      isHoliday: false,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['jr_hokuriku_maibara_tsuruga'],
    }).find((t) => t.tripId === outTrip.tripId)!;

    const activeIn = calculateActiveTrains({
      currentSec: inMidSec,
      isHoliday: false,
      globalDelayMinutes: 0,
      randomDelays: {},
      isPlaying: true,
      speedMultiplier: 1,
      selectedLineIds: ['jr_hokuriku_maibara_tsuruga'],
    }).find((t) => t.tripId === inTrip.tripId)!;

    assert.ok(activeOut && activeIn);
    const sepKm = calculateDistanceKm(activeOut.currentLat, activeOut.currentLng, activeIn.currentLat, activeIn.currentLng);
    assert.ok(sepKm > 0.3, `上下別線の中間点走行距離が分離していません: ${sepKm.toFixed(3)}km`);
    console.log(`       鳩原ループ走行位置分離: ${sepKm.toFixed(3)}km (下り=${activeOut.currentLat.toFixed(5)},${activeOut.currentLng.toFixed(5)} vs 上り=${activeIn.currentLat.toFixed(5)},${activeIn.currentLng.toFixed(5)})`);
  });

  // -----------------------------------------------------------------------
  // 3. 新規修復駅・全角JR正規化駅・新駅での実停車/発車標結合確認
  // -----------------------------------------------------------------------
  console.log('\n--- [Integration 3] 修復対象駅・新開業駅での列車出現＆発車標結合検証 ---');
  const criticalStations: Array<[LineId, string, string]> = [
    ['jr_sanyo_himeji_kamigori', '手柄山平和公園', '山陽線新駅 手柄山平和公園'],
    ['jr_taita', '多治見', '太多線 多治見'],
    ['jr_taita', '小泉', '太多線 小泉'],
    ['jr_kansai_kameyama_kamo', '新堂', '関西線 新堂'],
    ['jr_kinokuni', '紀伊姫', 'きのくに線 紀伊姫'],
    ['jr_osaka_higashi', 'JR淡路', 'おおさか東線 JR淡路'],
    ['jr_osaka_higashi', '大阪', 'おおさか東線 大阪'],
    ['jr_gakken_toshi', '木津', '学研都市線 木津'],
    ['jr_gakken_toshi', 'JR三山木', '学研都市線 JR三山木'],
    ['jr_nara', 'JR小倉', '奈良線 JR小倉'],
    ['jr_yamatoji', 'JR難波', '大和路線 JR難波'],
    ['jr_wakayama', 'JR五位堂', '和歌山線 JR五位堂'],
    ['jr_osaka_loop', '大阪', '大阪環状線 大阪'],
    ['jr_osaka_loop', '今宮', '大阪環状線 今宮'],
    ['jr_kansai_airport', '日根野', '関西空港線 日根野'],
  ];

  for (const [lid, stName, label] of criticalStations) {
    check(`${label}: 発車標解決 + 運行列車あり検証`, () => {
      const line = getLine(lid)!;
      const st = line.stations.find((s) => s.name === stName);
      assert.ok(st, `${lid} に駅 ${stName} が存在しません`);
      const tt = getFullDayStationTimetable(st.id, false, lid);
      const count = tt.reduce(
        (sum, h) => sum + h.inbound.length + h.outbound.length,
        0
      );
      assert.ok(count >= 10, `${label} の平日発車本数が少なすぎます (${count}本)`);
    });
  }

  console.log('\n================================================================');
  console.log(`  結合試験結果サマリー: PASS=${passed}, FAIL=${failed}`);
  console.log('================================================================');
  if (failed > 0) process.exit(1);
}

runIntegrationTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
