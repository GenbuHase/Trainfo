// 汎用直通リンカー実行 CLI
// 使い方: node scripts/runThroughLinker.cjs
const { executeUniversalThroughLinker } = require('./common/throughLinker/throughLinkerEngine.cjs');
const { bridgeJobanLimitedExpress } = require('./bridgeJobanLimitedExpress.cjs');

// 1. 境界駅を通過する特急列車（ひたち・ときわ等）のstops欠落を補間
bridgeJobanLimitedExpress();

// 2. 全路線直通リンカーを実行
executeUniversalThroughLinker();
