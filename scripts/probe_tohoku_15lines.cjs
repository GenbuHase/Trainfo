// 東北13鉄道線＋BRT2路線の Yahoo! 駅コード・グループID・全停留駅リスト自動抽出スクリプト
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe2');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 180 });

// 路線ごとの起点・中間代表駅プローブ（{ gid, ysid, name }）
const TARGET_PROBES = [
  { key: 'senzan', label: 'JR仙山線', probes: [{ ysid: '21044', gid: '561', note: '仙台->愛子・山形' }, { ysid: '21298', gid: '560', note: '羽前千歳->仙台' }, { ysid: '21392', gid: '560', note: '山形->仙台' }] },
  { key: 'sendai_airport', label: '仙台空港アクセス線', probes: [{ ysid: '21066', gid: '7041', note: '名取->仙台空港' }, { ysid: '21044', gid: '7041', note: '仙台->名取・仙台空港' }] },
  { key: 'kitakami', label: 'JR北上線', probes: [{ ysid: '20844', gid: '461', note: '北上->横手' }, { ysid: '21269', gid: '460', note: '横手->北上' }] },
  { key: 'ofunato', label: 'JR大船渡線', probes: [{ ysid: '20806', gid: '471', note: '一ノ関->気仙沼' }, { ysid: '21022', gid: '470', note: '気仙沼->一ノ関' }] },
  { key: 'ofunato_brt', label: 'JR大船渡線BRT', probes: [{ ysid: '21022', gid: '7751', note: '気仙沼->盛/上鹿折' }, { ysid: '20861', gid: '7750', note: '盛->気仙沼/陸前矢作' }, { ysid: '20955', gid: '7770', note: '陸前高田->陸前矢作' }] },
  { key: 'kesennuma', label: 'JR気仙沼線(鉄/BRT)', probes: [{ ysid: '21026', gid: '491', note: '小牛田->前谷地・柳津' }, { ysid: '21091', gid: '491', note: '前谷地->柳津・気仙沼' }, { ysid: '21106', gid: '491', note: '柳津->本吉・気仙沼' }, { ysid: '21103', gid: '491', note: '本吉->気仙沼' }, { ysid: '21022', gid: '490', note: '気仙沼->本吉・柳津・前谷地' }] },
  { key: 'kamaishi', label: 'JR釜石線', probes: [{ ysid: '20906', gid: '441', note: '花巻->釜石' }] },
  { key: 'tazawako', label: 'JR田沢湖線', probes: [{ ysid: '20940', gid: '411', note: '盛岡->大曲' }, { ysid: '21168', gid: '410', note: '大曲->盛岡' }] },
  { key: 'yamada', label: 'JR山田線', probes: [{ ysid: '20940', gid: '421', note: '盛岡->宮古' }] },
  { key: 'hachinohe', label: 'JR八戸線', probes: [{ ysid: '20750', gid: '331', note: '八戸->久慈' }] },
  { key: 'ominato', label: 'JR大湊線', probes: [{ ysid: '20747', gid: '311', note: '野辺地->大湊' }] },
  { key: 'tsugaru', label: 'JR津軽線', probes: [{ ysid: '20619', gid: '301', note: '青森->蟹田' }, { ysid: '20658', gid: '301', note: '蟹田->三厩' }, { ysid: '20633', gid: '301', note: '今別->三厩' }] },
  { key: 'gono', label: 'JR五能線', probes: [{ ysid: '21244', gid: '291', note: '東能代->川部' }, { ysid: '20665', gid: '290', note: '川部->東能代' }] },
  { key: 'oga', label: 'JR男鹿線', probes: [{ ysid: '21161', gid: '361', note: '追分->男鹿' }, { ysid: '21137', gid: '361', note: '秋田->男鹿' }] },
];

// 既設側チェック用ハブ駅一覧
const HUB_CHECKS = [
  { name: '仙台', ysid: '21044', sampleGid: '561' },
  { name: '山形', ysid: '21392', sampleGid: '560' },
  { name: '名取', ysid: '21066', sampleGid: '7041' },
  { name: '小牛田', ysid: '21026', sampleGid: '491' },
  { name: '秋田', ysid: '21137', sampleGid: '341' },
  { name: '青森', ysid: '20619', sampleGid: '301' },
  { name: '盛岡', ysid: '20940', sampleGid: '411' },
  { name: '八戸', ysid: '20750', sampleGid: '331' },
  { name: '弘前', ysid: '20776', sampleGid: '340' },
];

async function fetchStationTimetable(ysid, gid, kind = 1) {
  const url = `https://transit.yahoo.co.jp/timetable/${ysid}/${gid}?kind=${kind}`;
  return await client.fetchNextData(url, { cacheKey: `st_${ysid}_${gid}_k${kind}`, subDir: 'stations' });
}

async function fetchTrainDetail(ysid, gid, trainId, kind, hh, mm) {
  const url = `https://transit.yahoo.co.jp/timetable/${ysid}/${gid}/${trainId}?kind=${kind}&hh=${hh}&mm=${mm}`;
  return await client.fetchNextData(url, { cacheKey: `tr_${trainId}_k${kind}`, subDir: 'trains' });
}

async function main() {
  const report = { hubs: {}, lines: {} };

  // 1. 主要ハブ駅のグループ一覧確認
  for (const h of HUB_CHECKS) {
    try {
      const pp = await fetchStationTimetable(h.ysid, h.sampleGid, 1);
      const rg = pp?.timetableItem?.railGroup || [];
      report.hubs[h.name] = {
        stationName: pp?.timetableItem?.stationName,
        ysid: h.ysid,
        groups: rg.map((g) => ({ id: String(g.railGroupId), name: g.railName, dir: g.directionName })),
      };
    } catch (e) {
      report.hubs[h.name] = { error: e.message };
    }
  }

  // 2. 各対象路線の列車パターン網羅収集
  for (const target of TARGET_PROBES) {
    const lineSummary = {
      label: target.label,
      stationCatalog: {},
      routePatterns: {},
      trainTypesSeen: new Set(),
      groupsSeen: {},
    };

    for (const p of target.probes) {
      for (const kind of [1, 4]) {
        const pp = await fetchStationTimetable(p.ysid, p.gid, kind).catch(() => null);
        const tt = pp?.timetableItem;
        if (!tt || !tt.hourTimeTable) continue;

        const rg = tt.railGroup || [];
        lineSummary.groupsSeen[`${p.ysid}:${p.gid}`] = rg.map((g) => ({ id: String(g.railGroupId), name: g.railName, dir: g.directionName }));

        const kindMap = new Map((tt.master?.kind || []).map((k) => [k.id, k.name]));
        const destMap = new Map((tt.master?.destination || []).map((d) => [d.id, d.name]));

        // 行先×種別の組み合わせごとに代表列車を1〜2本ずつサンプリング（過不足防止）
        const pickedByBucket = new Map();
        for (const h of tt.hourTimeTable) {
          for (const m of h.minTimeTable || []) {
            const kName = kindMap.get(m.kindId) || '普通';
            const dName = destMap.get(m.destinationId) || '';
            lineSummary.trainTypesSeen.add(kName);
            const bucket = `${kName}|${dName}`;
            if (!pickedByBucket.has(bucket)) {
              pickedByBucket.set(bucket, {
                trainId: String(m.trainId),
                hh: String(h.hour).padStart(2, '0'),
                mm: String(m.minute).padStart(2, '0'),
                kName,
                dName,
              });
            }
          }
        }

        // 土休日(k=4)は種別や新規行先がある時のみ追加取得して高速化
        for (const [bucket, info] of pickedByBucket.entries()) {
          if (kind === 4 && lineSummary.routePatterns[`wk|${p.gid}|${bucket}`]) continue;
          const trRes = await fetchTrainDetail(p.ysid, p.gid, info.trainId, kind, info.hh, info.mm).catch(() => null);
          const tr = trRes?.timetableStationTrainResult?.timetable;
          if (!tr || !tr.stopStation) continue;
          const stops = tr.stopStation.map((s) => {
            const scode = s.stationCode ? String(s.stationCode) : null;
            if (s.stationName && scode) {
              if (!lineSummary.stationCatalog[s.stationName]) {
                lineSummary.stationCatalog[s.stationName] = scode;
              }
            }
            return {
              name: s.stationName,
              code: scode,
              arr: s.arrivalTime,
              dep: s.departureTime,
              isPass: Boolean(s.isPass),
            };
          });
          const keyPrefix = kind === 1 ? 'wk' : 'hol';
          lineSummary.routePatterns[`${keyPrefix}|${p.gid}|${bucket}`] = {
            displayName: tr.displayName,
            first: stops[0]?.name,
            last: stops[stops.length - 1]?.name,
            count: stops.length,
            stops: stops.map((s) => `${s.name}(${s.code || '?'})`),
          };
        }
      }
    }

    lineSummary.trainTypesSeen = Array.from(lineSummary.trainTypesSeen);
    report.lines[target.key] = lineSummary;
    console.log(`✅ Probed ${target.key} (${target.label}): ${Object.keys(lineSummary.stationCatalog).length} stops, ${Object.keys(lineSummary.routePatterns).length} route patterns, types: [${lineSummary.trainTypesSeen.join(', ')}]`);
  }

  const outPath = path.resolve(__dirname, 'cache/tohoku_15lines_yahoo_probe.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf8');
  console.log(`\n🎉 Saved full probe report to ${outPath}`);
}

main().catch((err) => {
  console.error('❌ Probe Failed:', err);
  process.exit(1);
});
