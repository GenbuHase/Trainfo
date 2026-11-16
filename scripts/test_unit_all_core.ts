/**
 * Trainfo 包括的単体試験スイート (Unit Tests)
 * 対象:
 *   1. 時刻・フォーマットユーティリティ (timeUtils, timetableData)
 *   2. 軌道ジオメトリ計算 & 上下線別線ルーティング (trackGeometry, 鳩原ループ線等)
 *   3. シミュレーションコア演算 (trainSimulation: resolveActiveTrainInfo, 併結, 区間別列車番号)
 *   4. 試運転・臨時列車接続判定 (testTrainService: areStationsConnectable, findConnectingStationPairs)
 *   5. 全174路線レジストリ & Wave 1〜4 (JR東海・JR西日本 全38路線) データ品質単体検証
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

import {
  secondsToTimeString,
  secondsToHHMM,
  hhmmToSeconds,
  getRealCurrentSeconds,
} from '../src/utils/timeUtils';
import {
  timeStringToSeconds,
  formatTrainNumber,
  getFullDayStationTimetable,
  getThroughChainTrips,
} from '../src/data/timetableData';
import {
  calculateDistanceKm,
  calculateHeading,
  interpolateTrackPosition,
  getTrackDistanceKm,
} from '../src/data/trackGeometry';
import { resolveActiveTrainInfo, calculateDynamicSpeed } from '../src/services/trainSimulation';
import {
  areStationsConnectable,
  findConnectingStationPairs,
} from '../src/services/testTrainService';
import { getAllLines, getLine, getAlternateStations, getTrainTypeConfig } from '../src/data/linesRegistry';
import { loadLinesTimetables } from '../src/data/timetableLoader';
import { STATION_MAP } from '../src/data/stations';
import type { LineId, TimetableTrip } from '../src/types';

// 既存路線の直通連絡・共用境界駅（STATION_MAP に実在する他線側駅ID）の許容リスト
const ALLOWED_FOREIGN_STATIONS = new Set<string>(['jr_joban_rapid:JL-26', 'odakyu_odawara:CB-04']);

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ❌ FAIL: ${name}\n     -> ${err.message}`);
    failed++;
  }
}

async function testAsync(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passed++;
  } catch (err: any) {
    console.error(`  ❌ FAIL: ${name}\n     -> ${err.message}`);
    failed++;
  }
}

// =========================================================================
// 対象: Wave 1〜4 JR東海・JR西日本 全38路線
// =========================================================================
const JR_38_LINES: LineId[] = [
  // Wave 1: JR東海 (10路線)
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
  // Wave 2: JR西日本 アーバンネットワーク中核 (11路線)
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
  // Wave 3 & 4: JR西日本 近畿・山陰・周辺 (17路線)
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

async function runAllUnitTests() {
  console.log('================================================================');
  console.log('  Trainfo 単体試験スイート (Unit Test Suite)');
  console.log('================================================================\n');

  // -----------------------------------------------------------------------
  // 1. 時刻ユーティリティ単体試験 (timeUtils / timetableData)
  // -----------------------------------------------------------------------
  console.log('--- [Suite 1] 時刻・フォーマットユーティリティ ---');
  test('secondsToTimeString: 基本時刻と深夜24時台の正規化', () => {
    assert.equal(secondsToTimeString(0), '00:00:00');
    assert.equal(secondsToTimeString(8 * 3600 + 30 * 60 + 5), '08:30:05');
    assert.equal(secondsToTimeString(25 * 3600 + 15 * 60), '01:15:00');
  });

  test('secondsToHHMM / hhmmToSeconds: 往復変換と深夜4時起点境界', () => {
    assert.equal(secondsToHHMM(3600 * 14 + 60 * 45), '14:45');
    assert.equal(hhmmToSeconds('04:00'), 4 * 3600);
    // 00:30 は鉄道運行日(4:00起点)では 24:30 = 88200秒、または正規化仕様確認
    const sec0030 = hhmmToSeconds('00:30');
    assert.ok(sec0030 === 24 * 3600 + 1800 || sec0030 === 1800, `Unexpected hhmmToSeconds('00:30')=${sec0030}`);
    assert.ok(getRealCurrentSeconds() >= 4 * 3600 && getRealCurrentSeconds() < 28 * 3600);
  });

  test('timeStringToSeconds: 時刻パース (04:00〜27:59対応)', () => {
    assert.equal(timeStringToSeconds('04:00:00'), 4 * 3600);
    assert.equal(timeStringToSeconds('23:59:59'), 23 * 3600 + 59 * 60 + 59);
    // 01:10:00 は深夜帯（< 4:00）として翌日換算(+86400)される
    assert.equal(timeStringToSeconds('01:10:00'), 25 * 3600 + 10 * 60);
  });

  test('formatTrainNumber: 公式番号・YahooID・レ補完フォーマット', () => {
    assert.equal(formatTrainNumber('1001M', 't1'), '1001M');
    assert.equal(formatTrainNumber('21D', 't2'), '21D');
    assert.equal(formatTrainNumber(undefined, 'trip_999'), '999');
    assert.equal(formatTrainNumber('999', 't3'), '999レ');
    assert.equal(formatTrainNumber('600', 't4'), '600レ');
  });

  // -----------------------------------------------------------------------
  // 2. 軌道ジオメトリ・上下別線計算単体試験 (trackGeometry)
  // -----------------------------------------------------------------------
  console.log('\n--- [Suite 2] 軌道ジオメトリ・補間・上下別線ルーティング ---');
  test('calculateHeading: 四方位（北・東・南・西）の方位角計算精度', () => {
    const north = calculateHeading(35.0, 135.0, 35.1, 135.0);
    const east = calculateHeading(35.0, 135.0, 35.0, 135.1);
    const south = calculateHeading(35.0, 135.0, 34.9, 135.0);
    const west = calculateHeading(35.0, 135.0, 35.0, 134.9);
    assert.ok(north < 1 || north > 359, `North heading=${north}`);
    assert.ok(Math.abs(east - 90) < 1, `East heading=${east}`);
    assert.ok(Math.abs(south - 180) < 1, `South heading=${south}`);
    assert.ok(Math.abs(west - 270) < 1, `West heading=${west}`);
  });

  test('calculateDistanceKm & getTrackDistanceKm: 実線路長 >= 直線距離', () => {
    const hokuriku = getLine('jr_hokuriku_maibara_tsuruga')!;
    const stShinHikida = hokuriku.stations.find((s) => s.name === '新疋田')!;
    const stTsuruga = hokuriku.stations.find((s) => s.name === '敦賀')!;
    const straightKm = calculateDistanceKm(stShinHikida.lat, stShinHikida.lng, stTsuruga.lat, stTsuruga.lng);
    const outboundTrackKm = getTrackDistanceKm(stShinHikida.id, stTsuruga.id, 'outbound', undefined, hokuriku.trackSegments);
    const inboundTrackKm = getTrackDistanceKm(stTsuruga.id, stShinHikida.id, 'inbound', undefined, hokuriku.trackSegments);

    // 下りは鳩原ループ線経由のため、上り(深山トンネル直線寄り)より明確に長い
    assert.ok(outboundTrackKm !== null && outboundTrackKm > straightKm, `下り軌道長(${outboundTrackKm}) <= 直線(${straightKm})`);
    assert.ok(inboundTrackKm !== null && outboundTrackKm! > inboundTrackKm + 1.0, `下りループ(${outboundTrackKm}km) > 上りトンネル(${inboundTrackKm}km) + 1km が未達`);
  });

  test('interpolateTrackPosition: 鳩原ループ線の上下線別線位置差異の検証', () => {
    const hokuriku = getLine('jr_hokuriku_maibara_tsuruga')!;
    const stShinHikida = hokuriku.stations.find((s) => s.name === '新疋田')!;
    const stTsuruga = hokuriku.stations.find((s) => s.name === '敦賀')!;

    // 下り 50% 地点 vs 上り 50% 地点（同じ新疋田〜敦賀間でも別線なので大きく座標が異なる）
    const outMid = interpolateTrackPosition(stShinHikida.id, stTsuruga.id, 0.5, 'outbound', undefined, hokuriku.trackSegments);
    const inMid = interpolateTrackPosition(stTsuruga.id, stShinHikida.id, 0.5, 'inbound', undefined, hokuriku.trackSegments);
    const diffKm = calculateDistanceKm(outMid.lat, outMid.lng, inMid.lat, inMid.lng);
    assert.ok(diffKm > 0.3, `鳩原ループ上下線の中間位置が分離されていません (diffKm=${diffKm.toFixed(3)}km)`);
  });

  // -----------------------------------------------------------------------
  // 3. シミュレーションコア（併結・区間列車番号）単体試験
  // -----------------------------------------------------------------------
  console.log('\n--- [Suite 3] シミュレーションコア計算 (resolveActiveTrainInfo) ---');
  test('resolveActiveTrainInfo: 併結区間内での両数合算・番号結合と解結後の分離', () => {
    const mockTrip: TimetableTrip = {
      tripId: 'TEST_COUPLE_01',
      lineId: 'jr_hanwa',
      trainId: '26800',
      trainNumber: '4101M',
      trainType: 'kanku_rapid',
      direction: 'outbound',
      originStationId: 'jr_hanwa-01',
      destinationStationId: 'jr_hanwa-26',
      customDestination: '関西空港',
      cars: 4,
      isHoliday: false,
      stops: [
        { stationId: 'jr_hanwa-01', arrivalTime: '08:00:00', departureTime: '08:00:00', isPassing: false },
        { stationId: 'jr_hanwa-14', arrivalTime: '08:15:00', departureTime: '08:16:00', isPassing: false },
        { stationId: 'jr_hanwa-26', arrivalTime: '08:30:00', departureTime: '08:35:00', isPassing: false },
        { stationId: 'jr_hanwa-35', arrivalTime: '08:50:00', departureTime: '08:50:00', isPassing: false },
      ],
      coupling: {
        role: 'parent',
        coupledTripId: 'TEST_COUPLE_02',
        coupledTrainNumber: '4501M',
        coupledCars: 4,
        coupledDestination: '和歌山',
        fromStationId: 'jr_hanwa-01',
        toStationId: 'jr_hanwa-26',
      },
    };

    // 併結走行区間内 (天王寺 -> 鳳 -> 日根野手前)
    const during = resolveActiveTrainInfo(mockTrip, 'jr_hanwa-14', 'jr_hanwa-26');
    assert.equal(during.isCoupledActive, true);
    assert.equal(during.cars, 8);
    assert.equal(during.trainNumber, '4101M + 4501M');
    assert.equal(during.customDestination, '関西空港・和歌山');

    // 解結駅 (日根野) 到着済みまたは日根野先へ走行中
    const after = resolveActiveTrainInfo(mockTrip, 'jr_hanwa-26', 'jr_hanwa-35');
    assert.equal(after.isCoupledActive, false);
    assert.equal(after.cars, 4);
    assert.equal(after.trainNumber, '4101M');
  });

  test('resolveActiveTrainInfo: trainNumberSections による途中駅での列車番号・種別切替', () => {
    const mockTrip: TimetableTrip = {
      tripId: 'TEST_SEC_01',
      lineId: 'jr_sanin_sonobe_kinosaki',
      trainId: '9001',
      trainNumber: '5001M',
      trainType: 'limitedExp',
      trainName: 'きのさき1号',
      direction: 'outbound',
      originStationId: 'jr_sanin_sonobe_kinosaki-01',
      destinationStationId: 'jr_sanin_sonobe_kinosaki-26',
      cars: 4,
      isHoliday: false,
      stops: [
        { stationId: 'jr_sanin_sonobe_kinosaki-01', arrivalTime: '09:00:00', departureTime: '09:00:00', isPassing: false },
        { stationId: 'jr_sanin_sonobe_kinosaki-12', arrivalTime: '09:40:00', departureTime: '09:45:00', isPassing: false },
        { stationId: 'jr_sanin_sonobe_kinosaki-26', arrivalTime: '10:30:00', departureTime: '10:30:00', isPassing: false },
      ],
      trainNumberSections: [
        { fromStationId: 'jr_sanin_sonobe_kinosaki-12', trainNumber: '3001M', trainType: 'rapid' },
      ],
    };

    const beforeSec = resolveActiveTrainInfo(mockTrip, 'jr_sanin_sonobe_kinosaki-01');
    assert.equal(beforeSec.trainNumber, '5001M');
    assert.equal(beforeSec.trainType, 'limitedExp');

    const inSec = resolveActiveTrainInfo(mockTrip, 'jr_sanin_sonobe_kinosaki-12');
    assert.equal(inSec.trainNumber, '3001M');
    assert.equal(inSec.trainType, 'rapid');
  });

  // -----------------------------------------------------------------------
  // 4. 試運転・乗換・同名駅リンク単体試験 (testTrainService & linesRegistry)
  // -----------------------------------------------------------------------
  console.log('\n--- [Suite 4] 試運転・乗換駅判定・同名駅検索 ---');
  test('areStationsConnectable & findConnectingStationPairs: JR境界駅自動検出', () => {
    // 大府 (東海道線 CA-60 <-> 武豊線 jr_taketoyo-01)
    const pairsObu = findConnectingStationPairs('jr_tokaido_toyohashi_maibara', 'jr_taketoyo');
    assert.ok(pairsObu.length >= 1, '大府駅での接続候補が見つかりません');
    assert.equal(pairsObu[0].stationA.name, '大府');
    assert.equal(pairsObu[0].stationB.name, '大府');
    assert.ok(pairsObu[0].distKm < 0.05, `大府駅間の座標差が大きすぎます: ${pairsObu[0].distKm}km`);

    // 綾部 (山陰線 <-> 舞鶴線)
    const pairsAyabe = findConnectingStationPairs('jr_sanin_sonobe_kinosaki', 'jr_maizuru');
    assert.ok(pairsAyabe.length >= 1 && pairsAyabe[0].stationA.name === '綾部');

    // 山科 (琵琶湖線 <-> 湖西線)
    const pairsYamashina = findConnectingStationPairs('jr_biwako', 'jr_kosei');
    assert.ok(pairsYamashina.length >= 1 && pairsYamashina[0].stationA.name === '山科');
    assert.ok(areStationsConnectable(pairsYamashina[0].stationA, pairsYamashina[0].stationB));
  });

  test('getAlternateStations: 新規追加路線間の乗換駅・同名駅切替リンク解決', () => {
    const saganoKyoto = getLine('jr_sagano')!.stations.find((s) => s.id === 'jr_sagano-01')!;
    const altsKyoto = getAlternateStations(saganoKyoto); // 嵯峨野線 京都駅
    assert.ok(altsKyoto.some((a) => a.station.lineId === 'jr_nara'), '京都駅でJR奈良線への同名駅リンクがありません');
    assert.ok(altsKyoto.some((a) => a.station.lineId === 'jr_biwako'), '京都駅でJR琵琶湖線への同名駅リンクがありません');

    const kakogawaTanikawa = getLine('jr_kakogawa')!.stations.find((s) => s.name === '谷川')!;
    const altsTanikawa = getAlternateStations(kakogawaTanikawa); // 加古川線 谷川駅
    assert.ok(altsTanikawa.some((a) => a.station.lineId === 'jr_fukuchiyama_north'), '谷川駅でJR福知山線へのリンクがありません');
  });

  // -----------------------------------------------------------------------
  // 5. 全174路線 & Wave 1〜4 (38路線) 時刻表ローダー & 設計仕様単体検証
  // -----------------------------------------------------------------------
  console.log('\n--- [Suite 5] 全路線レジストリ・動的ローダー・Wave 1〜4 仕様検証 ---');
  test('LINES_REGISTRY 全174路線 基本定義・カラー・連番・自線混入なし検証', () => {
    const allLines = getAllLines();
    assert.equal(allLines.length, 174, `登録路線数が174ではありません (${allLines.length})`);

    const idSet = new Set<string>();
    for (const line of allLines) {
      assert.ok(!idSet.has(line.id), `路線ID重複: ${line.id}`);
      idSet.add(line.id);
      assert.ok(line.name && line.shortName && line.operator, `必須メタデータ欠損: ${line.id}`);
      assert.match(line.lineColor, /^#[0-9a-fA-F]{6}$/, `不正なHEXラインカラー (${line.id}): ${line.lineColor}`);
      assert.ok(line.stations.length >= 2, `駅数不足 (${line.id})`);
      assert.ok(line.trackSegments.length >= line.stations.length - 1, `セグメント数不足 (${line.id})`);

      for (const st of line.stations) {
        assert.ok(st.lat > 24 && st.lat < 46 && st.lng > 122 && st.lng < 146, `日本国外座標 (${line.id} ${st.name})`);
      }
    }

    // 全126路線のjr_プレフィックスと駅番号連番・自線名混入ゼロ完全チェック
    for (const jrId of JR_38_LINES) {
      assert.ok(jrId.startsWith('jr_'), `jr_ プレフィックス違反: ${jrId}`);
      const line = getLine(jrId);
      assert.ok(line, `LINES_REGISTRY に未登録: ${jrId}`);
      for (let i = 0; i < line.stations.length; i++) {
        assert.equal(line.stations[i].number, i + 1, `${jrId} 駅連番違反: ${line.stations[i].name} number=${line.stations[i].number} (期待 ${i + 1})`);
        assert.ok(
          !line.stations[i].transfers.includes(line.name) && !line.stations[i].transfers.includes(line.shortName),
          `transfers に自路線名が混入 (${line.id} ${line.stations[i].name}): ${line.stations[i].transfers}`
        );
      }
    }
  });

  await testAsync('全174路線: 時刻表動的ロード + 全84,000+便 時刻順序・種別定義・発車標解決 + Wave1〜4厳格検証', async () => {
    const allLines = getAllLines();
    const allLineIds = allLines.map((l) => l.id as LineId);
    const jr38Set = new Set<string>(JR_38_LINES);

    // 既存他社線・BRT・連絡線支線等での仕様上の0通過駅例外
    const ALLOWED_ZERO_STOP_STATIONS = new Set<string>([
      'jr_musashino:JL-24', // 馬橋連絡線支線
      'jr_tsugaru:TSG-12', 'jr_tsugaru:TSG-13', 'jr_tsugaru:TSG-16', 'jr_tsugaru:TSG-17', 'jr_tsugaru:TSG-18', // 蟹田〜三厩代行/休止区間
      'tobu_koizumi:TI-47', 'tobu_koizumi:TI-18', // 東武小泉線支線駅
    ]);
    // 料金不要特急（愛称なし）路線の例外
    const FREE_LIMITED_EXP_LINES = new Set<string>([
      'sotetsu_main',
      'sotetsu_izumino',
      'sotetsu_shin_yokohama',
    ]);

    // 既存路線固有: 宇都宮線/高崎線 大宮始発湘南新宿ライン等の単駅切詰め済みレコード（シミュレーションでは stops<2 で安全にスキップされる）
    const ALLOWED_SINGLE_STOP_LINES = new Set<string>(['jr_takasaki', 'jr_utsunomiya']);

    await loadLinesTimetables(allLineIds);

    for (const line of allLines) {
      const lineId = line.id;
      assert.ok(line.globalTimetable.length > 0, `${lineId}: globalTimetable が空です`);

      const stMap = new Map(line.stations.map((s) => [s.id, s]));
      const stopCounts = new Map<string, number>();
      for (const s of line.stations) stopCounts.set(s.id, 0);

      for (const trip of line.globalTimetable) {
        if (trip.stops.length < 2) {
          assert.ok(
            ALLOWED_SINGLE_STOP_LINES.has(lineId) && trip.stops.length === 1 && !trip.throughTripId && !trip.prevTripId,
            `${lineId} (${trip.tripId}): stops数が2未満 (${trip.stops.length})`
          );
          continue;
        }

        // 全174路線共通: 使用されている種別キーが line.trainTypes に定義済みであること
        assert.ok(
          Boolean(line.trainTypes[trip.trainType]),
          `${lineId} (${trip.tripId}): 未定義の trainType '${trip.trainType}'`
        );

        // 特急仕様確認: 料金不要特急(相鉄)を除き、limitedExp には 100% trainName(固有名称) が存在すること
        if (trip.trainType === 'limitedExp' && !FREE_LIMITED_EXP_LINES.has(lineId)) {
          if (jr38Set.has(lineId)) {
            const typeCfg = line.trainTypes['limitedExp'];
            assert.ok(typeCfg && typeCfg.name === '特急', `${lineId}: limitedExp の種別名は '特急' である必要があります (実際: ${typeCfg?.name})`);
          }
          assert.ok(
            trip.trainName && trip.trainName.trim().length > 0,
            `${lineId} (${trip.tripId}): 特急列車に固有名称(trainName)が設定されていません`
          );
        }

        // 全174路線共通: 時刻逆転ゼロ・未知駅IDゼロ + JR 38路線では駅飛びゼロ
        let prevSec = -1;
        let offset = 0;
        for (let i = 0; i < trip.stops.length; i++) {
          const stId = trip.stops[i].stationId;
          const isValidStation =
            stMap.has(stId) ||
            (!jr38Set.has(lineId) &&
              ALLOWED_FOREIGN_STATIONS.has(`${lineId}:${stId}`) &&
              STATION_MAP.has(stId));
          assert.ok(isValidStation, `${lineId} (${trip.tripId}): 未知の駅ID ${stId}`);
          stopCounts.set(stId, (stopCounts.get(stId) || 0) + 1);

          let arr = timeStringToSeconds(trip.stops[i].arrivalTime) + offset;
          let dep = timeStringToSeconds(trip.stops[i].departureTime) + offset;
          if (prevSec >= 0 && arr < prevSec) {
            if (prevSec - arr > 43200) {
              offset += 86400;
              arr += 86400;
              dep += 86400;
            }
          }
          assert.ok(dep >= arr, `${lineId} (${trip.tripId}) ${stId}: 発車時刻が到着時刻より前`);
          if (prevSec >= 0) {
            assert.ok(arr >= prevSec, `${lineId} (${trip.tripId}) ${stId}: 時刻逆転 (${prevSec} -> ${arr})`);
          }
          prevSec = dep;

          if (i > 0 && jr38Set.has(lineId) && lineId !== 'jr_osaka_loop') {
            const prevNum = stMap.get(trip.stops[i - 1].stationId)!.number;
            const curNum = stMap.get(stId)!.number;
            assert.equal(
              Math.abs(curNum - prevNum),
              1,
              `${lineId} (${trip.tripId}): 駅飛び検出 ${trip.stops[i - 1].stationId}(${prevNum}) -> ${stId}(${curNum})`
            );
          }
        }
      }

      // 全駅に1便以上停車/通過しているか（既知の休止・支線連絡駅除く）
      for (const s of line.stations) {
        const cnt = stopCounts.get(s.id) || 0;
        if (cnt === 0 && !ALLOWED_ZERO_STOP_STATIONS.has(`${lineId}:${s.id}`)) {
          assert.fail(`${lineId}: 駅 ${s.id}(${s.name}) に発着・通過する列車が 0 本です`);
        }
      }

      // 発車標 (getFullDayStationTimetable) の解決が代表駅で正常に動作すること
      const firstSt = line.stations[0];
      const stData = getFullDayStationTimetable(firstSt.id, false, lineId as LineId);
      const totalDeps = stData.reduce(
        (sum, h) => sum + h.inbound.length + h.outbound.length,
        0
      );
      assert.ok(totalDeps > 0, `${lineId}: 駅発車標 (${firstSt.name}) の解決結果が 0 本です`);
    }
  });

  test('getThroughChainTrips: 東日本/東海/西日本の多路線直通チェーン展開整合性', () => {
    // 1. 湖西新快速・北陸線直通チェーン
    const biwako = getLine('jr_biwako')!;
    const koseiMap = new Map(getLine('jr_kosei')!.globalTimetable.map((t) => [t.tripId, t]));
    const sampleWest = biwako.globalTimetable.find((t) => {
      if (t.isHoliday || t.throughLineId !== 'jr_kosei' || !t.throughTripId) return false;
      const mid = koseiMap.get(t.throughTripId);
      return Boolean(mid && mid.throughLineId === 'jr_hokuriku_maibara_tsuruga' && mid.throughTripId);
    })!;
    assert.ok(sampleWest, '琵琶湖->湖西->北陸線サンプルチェーンが見つかりません');
    const chainWest = getThroughChainTrips(sampleWest.tripId);
    assert.ok(chainWest.length >= 3, `西日本3線チェーン長不足 (${chainWest.length})`);

    // 2. 特急アルプス 4線貫通チェーン (東日本)
    const jr_chuo = getLine('jr_chuo')!;
    const alps = jr_chuo.globalTimetable.find((t) => !t.isHoliday && t.trainId === '42781')!;
    assert.ok(alps, '特急アルプス (42781) が見つかりません');
    const chainEast = getThroughChainTrips(alps.tripId);
    assert.equal(chainEast.length, 4, `特急アルプス4線チェーン長不正 (${chainEast.length})`);
  });

  test('calculateDynamicSpeed & getTrainTypeConfig: 異常値防御と長距離駅間加減速抑制', () => {
    // 1. getTrainTypeConfig の未定義/空文字入力防御
    const fallbackUndefined = getTrainTypeConfig(undefined as any);
    assert.equal(fallbackUndefined.name, '普通');
    assert.equal(fallbackUndefined.shortName, '普通');

    // 2. 長距離駅間（480秒, 平均280km/h）で過度な巡航速度インフレが起きないこと
    const longCruise = calculateDynamicSpeed({
      progress: 0.5,
      avgSpeedKmh: 280,
      isDepPassing: false,
      isArrPassing: false,
      durationSec: 480,
    });
    assert.ok(longCruise > 280 && longCruise <= 310, `長距離新幹線巡航速度の過大算出 (${longCruise}km/h)`);

    // 3. 短距離駅間（90秒）では発車直後に緩やかに加速し 5km/h 以上であること
    const shortStart = calculateDynamicSpeed({
      progress: 0.05,
      avgSpeedKmh: 60,
      durationSec: 90,
    });
    assert.ok(shortStart >= 5 && shortStart < 40, `短距離発車直後速度異常 (${shortStart}km/h)`);
  });

  console.log('\n================================================================');
  console.log(`  単体試験結果サマリー: PASS=${passed}, FAIL=${failed}`);
  console.log('================================================================');
  if (failed > 0) process.exit(1);
}

runAllUnitTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
