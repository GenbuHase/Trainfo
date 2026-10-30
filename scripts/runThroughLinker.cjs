// 汎用直通リンカー実行 CLI
// 使い方: node scripts/runThroughLinker.cjs
const { executeUniversalThroughLinker } = require('./common/throughLinker/throughLinkerEngine.cjs');
const { enrichAzusaTimetable } = require('./enrich_azusa_timetable.cjs');
const { extendAlpsTimetable } = require('./extendAlpsTimetable.cjs');
const { bridgeJobanLimitedExpress } = require('./bridgeJobanLimitedExpress.cjs');
const { bridgeOdakyuGotemba } = require('./bridge_odakyu_gotemba.cjs');
const { extendChuoHachiojiTakao } = require('./extend_chuo_hachioji_takao.cjs');
const { bridgeBosoLimitedExpress } = require('./bridgeBosoLimitedExpress.cjs');
const { bridgeNexAndAyame } = require('./bridgeNexAndAyame.cjs');
const { runAllCoupling } = require('./common/throughLinker/coupleAllExpress.cjs');
const { rebuildAllStationTimetables } = require('./rebuildAllStationTimetables.cjs');

// 1. 境界駅を通過する特急列車（あずさ・アルプス・ひたち・ときわ・ふじさん・かいじ・富士回遊・成田エクスプレス・あやめ等）のstops欠落を補間・ダイヤ補完
enrichAzusaTimetable();
extendAlpsTimetable();
extendChuoHachiojiTakao();
bridgeJobanLimitedExpress();
bridgeOdakyuGotemba();
bridgeBosoLimitedExpress();
bridgeNexAndAyame();

// 2. 全路線の併結特急（東武・東北新幹線・中央本線・東海道線・小田急等）カップリング設定と欠落便復元
runAllCoupling();

// 3. 全路線直通リンカーを実行
executeUniversalThroughLinker();

// 3-2. 中央特急・房総特急・成田エクスプレス・特急あやめ（あずさ・かいじ・富士回遊・新宿さざなみ・新宿わかしお・さざなみ・わかしお・しおさい・N'EX・あやめ85号）の直通リンクを確定上書き
extendChuoHachiojiTakao();
bridgeBosoLimitedExpress();
bridgeNexAndAyame();

// 4. 直通リンク・時刻同期・End-to-End行先反映後の駅時刻表 (stationTimetables.json) を一括再集約
rebuildAllStationTimetables();
