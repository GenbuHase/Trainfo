import type { TimetableTrip } from '../src/types';
import rawToyoko from '../src/data/lines/tokyu_toyoko/globalTimetable.json';
import rawTokyuShinYokohama from '../src/data/lines/tokyu_shin_yokohama/globalTimetable.json';

const toyokoTrips = rawToyoko as unknown as TimetableTrip[];
const tokyuShinYokohamaTrips = rawTokyuShinYokohama as unknown as TimetableTrip[];

console.log('=== 未対応路線（目黒線・南北線・三田線）直通便の孤立化・遮断検証テスト ===\n');

// 1. 上り（東急新横浜線 -> 東急東横線）の検証
// 行先が浦和美園、西高島平、赤羽岩淵、目黒、奥沢等の列車が、東横線にリンクされていないことを確認
const MEGURO_MITA_NANBOKU_DESTS = new Set([
  '浦和美園', '東川口', '戸塚安行', '新井宿', '鳩ケ谷', '鳩ヶ谷', '南鳩ヶ谷', '川口元郷',
  '赤羽岩淵', '志茂', '王子神谷', '王子', '西ヶ原', '駒込', '本駒込', '東大前', '後楽園',
  '溜池山王', '六本木一丁目', '麻布十番', '白金高輪', '白金台',
  '西高島平', '新高島平', '高島平', '西台', '蓮根', '志村三丁目', '志村坂上', '本蓮沼',
  '板橋本町', '板橋区役所前', '新板橋', '西巣鴨', '巣鴨', '千石', '白山', '春日',
  '水道橋', '神保町', '大手町', '日比谷', '内幸町', '御成門', '芝公園', '三田',
  '目黒', '不動前', '武蔵小山', '西小山', '洗足', '大岡山', '奥沢', '田園調布', '多摩川', '新丸子'
]);

const shinYokohamaInbound = tokyuShinYokohamaTrips.filter(t => t.direction === 'inbound');
console.log(`東急新横浜線上り列車: 全 ${shinYokohamaInbound.length} 本`);

let leakToToyokoCount = 0;
let safelyTerminatedCount = 0;

for (const t of shinYokohamaInbound) {
  const dest = (t.customDestination || '').replace(/\([^)]*\)/g, '').trim();
  if (MEGURO_MITA_NANBOKU_DESTS.has(dest)) {
    if (t.throughTripId || t.throughLineId) {
      console.error(`❌ 漏洩検知: ${t.tripId} (行先: ${dest}) が ${t.throughLineId} (${t.throughTripId}) に直通リンクされています！`);
      leakToToyokoCount++;
    } else {
      safelyTerminatedCount++;
    }
  }
}

console.log(`  目黒線・南北線・三田線方面便: 全 ${safelyTerminatedCount + leakToToyokoCount} 本`);
console.log(`  日吉駅で安全に運行終了（直通先なし）: ${safelyTerminatedCount} 本`);
console.log(`  誤接続・漏洩件数: ${leakToToyokoCount} 本`);

if (leakToToyokoCount > 0) {
  console.error('❌ 上り遮断テスト失敗！未対応路線行きが東横線に接続されています！');
  process.exit(1);
} else {
  console.log('✅ 上り遮断テスト100%成功: 未対応路線行き全便が日吉駅で東横線から完全隔離・安全終了しています！\n');
}

// 2. 東横線内の行先確認
// 東横線の全トリップの中に、浦和美園や西高島平などの未対応駅が混入していないか確認
let toyokoContaminatedCount = 0;
for (const t of toyokoTrips) {
  const dest = (t.customDestination || '').replace(/\([^)]*\)/g, '').trim();
  if (MEGURO_MITA_NANBOKU_DESTS.has(dest)) {
    console.error(`❌ 東横線汚染検知: ${t.tripId} の行先が ${dest} になっています！`);
    toyokoContaminatedCount++;
  }
}

console.log(`東横線内列車: 全 ${toyokoTrips.length} 本`);
console.log(`未対応路線行先混入件数: ${toyokoContaminatedCount} 本`);

if (toyokoContaminatedCount > 0) {
  console.error('❌ 東横線汚染テスト失敗！');
  process.exit(1);
} else {
  console.log('✅ 東横線汚染テスト100%成功: 東横線内に目黒線・南北線・三田線の行先は一切混入していません！\n');
}

console.log('🎉 未対応路線直通便の完全遮断・隔離検証 完了！');
