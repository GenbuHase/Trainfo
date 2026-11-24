// JR花輪線 上り直通便（1922D 日詰行）を JR東北本線（一ノ関～盛岡）2578D へ接続する補助スクリプト
// （盛岡～好摩間はIGRいわて銀河鉄道線との共用区間のため、IGR側リンクを残しつつ花輪線全区間トリップにも前方リンクを付与する）
const fs = require('fs');
const path = require('path');

function linkHanawaTohoku() {
  const hnwPath = path.resolve(__dirname, '../src/data/lines/jr_hanawa/globalTimetable.json');
  if (!fs.existsSync(hnwPath)) return;

  const trips = JSON.parse(fs.readFileSync(hnwPath, 'utf8'));
  let linked = 0;

  for (const trip of trips) {
    if (trip.tripId === 'WD_INB_HNW-23_0535_41702') {
      trip.throughTripId = 'WD_INB_TIM-20_0740_42809';
      trip.throughLineId = 'jr_tohoku_ichinoseki_morioka';
      trip.customDestination = '日詰';
      linked++;
    } else if (trip.tripId === 'HD_INB_HNW-23_0535_41702') {
      trip.throughTripId = 'HD_INB_TIM-20_0740_42809';
      trip.throughLineId = 'jr_tohoku_ichinoseki_morioka';
      trip.customDestination = '日詰';
      linked++;
    }
  }

  fs.writeFileSync(hnwPath, JSON.stringify(trips, null, 2), 'utf8');
  console.log(`🔗 [linkHanawaTohoku] JR花輪線 1922D -> JR東北本線(一ノ関〜盛岡) 2578D 日詰行: ${linked} 件リンク完了`);
}

module.exports = { linkHanawaTohoku };

if (require.main === module) {
  linkHanawaTohoku();
}
