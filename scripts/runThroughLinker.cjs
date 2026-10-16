// 汎用直通リンカー実行 CLI
// 使い方: node scripts/runThroughLinker.cjs
const { executeUniversalThroughLinker } = require('./common/throughLinker/throughLinkerEngine.cjs');
const { bridgeJobanLimitedExpress } = require('./bridgeJobanLimitedExpress.cjs');
const { rebuildAllStationTimetables } = require('./rebuildAllStationTimetables.cjs');

// 1. 境界駅を通過する特急列車（ひたち・ときわ等）のstops欠落を補間
bridgeJobanLimitedExpress();

// 2. 全路線直通リンカーを実行
executeUniversalThroughLinker();

// 3. 直通リンク・時刻同期・End-to-End行先反映後の駅時刻表 (stationTimetables.json) を一括再集約
rebuildAllStationTimetables();

