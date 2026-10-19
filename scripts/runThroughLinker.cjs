// 汎用直通リンカー実行 CLI
// 使い方: node scripts/runThroughLinker.cjs
const { executeUniversalThroughLinker } = require('./common/throughLinker/throughLinkerEngine.cjs');
const { bridgeJobanLimitedExpress } = require('./bridgeJobanLimitedExpress.cjs');
const { bridgeOdakyuGotemba } = require('./bridge_odakyu_gotemba.cjs');
const { runAllCoupling } = require('./common/throughLinker/coupleAllExpress.cjs');
const { rebuildAllStationTimetables } = require('./rebuildAllStationTimetables.cjs');

// 1. 境界駅を通過する特急列車（ひたち・ときわ・ふじさん等）のstops欠落を補間
bridgeJobanLimitedExpress();
bridgeOdakyuGotemba();

// 2. 全路線の併結特急（東武・東北新幹線・中央本線・東海道線・小田急等）カップリング設定と欠落便復元
runAllCoupling();

// 3. 全路線直通リンカーを実行
executeUniversalThroughLinker();

// 4. 直通リンク・時刻同期・End-to-End行先反映後の駅時刻表 (stationTimetables.json) を一括再集約
rebuildAllStationTimetables();


