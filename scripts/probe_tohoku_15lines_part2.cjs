// 東北15路線の上り(inbound)・迂回系統(気仙沼市立病院/上鹿折/陸前矢作)・ハブ駅前チェック用追加プローブ
const fs = require('fs');
const path = require('path');
const YahooClient = require('./common/yahoo/YahooClient.cjs');

const CACHE_DIR = path.resolve(__dirname, 'cache/yahoo_probe2');
const client = new YahooClient({ cacheDir: CACHE_DIR, delayMs: 180 });

const PART2_PROBES = [
  // 仙台空港アクセス線上り
  { key: 'sendai_airport_in', probes: [{ ysid: '29549', gid: '7040', note: '仙台空港->名取・仙台' }] },
  // 北上線ほっとゆだ・和賀仙人等（代行バス・列車）
  { key: 'kitakami_in', probes: [{ ysid: '20923', gid: '460', note: 'ほっとゆだ->北上' }, { ysid: '20923', gid: '461', note: 'ほっとゆだ->横手' }, { ysid: '21269', gid: '460', note: '横手->ほっとゆだ' }] },
  // 気仙沼線BRT 気仙沼市立病院・赤岩港 全パターン（松岩・南気仙沼で全便走査）
  { key: 'kesennuma_brt_detour', scanAll: true, probes: [{ ysid: '21092', gid: '491', note: '松岩->気仙沼' }, { ysid: '21100', gid: '490', note: '南気仙沼->前谷地' }] },
  // 大船渡線BRT 上鹿折・陸前矢作 上り（上鹿折->気仙沼・陸前矢作->盛）
  { key: 'ofunato_brt_in', probes: [{ ysid: '21004', gid: '7750', note: '上鹿折->気仙沼' }, { ysid: '21035', gid: '7751', note: '鹿折唐桑->上鹿折・盛' }, { ysid: '20956', gid: '7771', note: '陸前矢作->盛' }, { ysid: '20956', gid: '7750', note: '陸前矢作->盛(alt)' }, { ysid: '20955', gid: '7750', note: '陸前高田->気仙沼' }] },
  // 釜石線上り
  { key: 'kamaishi_in', probes: [{ ysid: '20839', gid: '440', note: '釜石->花巻・盛岡' }, { ysid: '20892', gid: '440', note: '遠野->花巻' }] },
  // 山田線上り
  { key: 'yamada_in', probes: [{ ysid: '20936', gid: '420', note: '宮古->盛岡' }, { ysid: '20939', gid: '420', note: '茂市->盛岡' }, { ysid: '20842', gid: '420', note: '上米内->盛岡' }] },
  // 八戸線上り
  { key: 'hachinohe_in', probes: [{ ysid: '20849', gid: '330', note: '久慈->八戸' }, { ysid: '20687', gid: '330', note: '鮫->八戸' }] },
  // 大湊線上り
  { key: 'ominato_in', probes: [{ ysid: '20649', gid: '310', note: '大湊->野辺地・八戸' }] },
  // 津軽線上り
  { key: 'tsugaru_in', probes: [{ ysid: '20774', gid: '300', note: '三厩->蟹田' }, { ysid: '20658', gid: '300', note: '蟹田->青森' }] },
  // 男鹿線上り
  { key: 'oga_in', probes: [{ ysid: '21170', gid: '360', note: '男鹿->追分・秋田' }] },
  // 弘前ハブ確認 (20758) & 新青森 (20698)
  { key: 'hirosaki_340', probes: [{ ysid: '20758', gid: '340', note: '弘前->秋田' }, { ysid: '20758', gid: '341', note: '弘前->青森' }, { ysid: '20758', gid: '290', note: '弘前->五能線' }] },
];

async function main() {
  const sample = JSON.parse(fs.readFileSync(path.join(CACHE_DIR, 'stations/st_21044_561_k1.json'), 'utf8'));
  console.log('Sample timetableItem keys:', Object.keys(sample.timetableItem || {}));
  console.log('Sample stationResult keys:', Object.keys(sample));
  if (sample.timetableStationInfo) console.log('timetableStationInfo keys:', Object.keys(sample.timetableStationInfo));

  const results = {};
  for (const t of PART2_PROBES) {
    const out = { catalog: {}, patterns: {}, groupsMeta: {} };
    for (const p of t.probes) {
      for (const kind of [1, 4]) {
        const url = `https://transit.yahoo.co.jp/timetable/${p.ysid}/${p.gid}?kind=${kind}`;
        const pp = await client.fetchNextData(url, { cacheKey: `st_${p.ysid}_${p.gid}_k${kind}`, subDir: 'stations' }).catch(e => ({ _err: e.message }));
        if (pp._err) { out.groupsMeta[`${p.ysid}:${p.gid}:k${kind}`] = pp._err; continue; }
        const tt = pp?.timetableItem;
        if (!tt?.hourTimeTable) { out.groupsMeta[`${p.ysid}:${p.gid}:k${kind}`] = 'no hourTimeTable'; continue; }
        out.groupsMeta[`${p.ysid}:${p.gid}:k${kind}`] = tt.railName || tt.lineName || 'OK';

        const kindMap = new Map((tt.master?.kind || []).map(k => [k.id, k.name]));
        const destMap = new Map((tt.master?.destination || []).map(d => [d.id, d.name]));
        const picked = new Map();
        for (const h of tt.hourTimeTable) {
          for (const m of h.minTimeTable || []) {
            const kName = kindMap.get(m.kindId) || '普通';
            const dName = destMap.get(m.destinationId) || '';
            const bucket = t.scanAll ? `${m.trainId}` : `${kName}|${dName}`;
            if (!picked.has(bucket)) {
              picked.set(bucket, { trainId: String(m.trainId), hh: String(h.hour).padStart(2, '0'), mm: String(m.minute).padStart(2, '0'), kName, dName });
            }
          }
        }
        for (const [b, info] of picked.entries()) {
          if (kind === 4 && !t.scanAll && out.patterns[`wk|${p.gid}|${b}`]) continue;
          const trUrl = `https://transit.yahoo.co.jp/timetable/${p.ysid}/${p.gid}/${info.trainId}?kind=${kind}&hh=${info.hh}&mm=${info.mm}`;
          const trRes = await client.fetchNextData(trUrl, { cacheKey: `tr_${info.trainId}_k${kind}`, subDir: 'trains' }).catch(() => null);
          const tr = trRes?.timetableStationTrainResult?.timetable;
          if (!tr?.stopStation) continue;
          const stops = tr.stopStation.map(s => {
            if (s.stationName && s.stationCode) out.catalog[s.stationName] = String(s.stationCode);
            return `${s.stationName}(${s.stationCode || '?'})`;
          });
          const key = `${kind === 1 ? 'wk' : 'hol'}|${p.gid}|${info.kName}|${info.dName}|stops:${stops.length}`;
          if (!out.patterns[key] || !out.patterns[key].includes(stops.join('->'))) {
            // Check 市立病院 etc
            const sig = stops.join(' -> ');
            if (!Object.values(out.patterns).includes(sig)) {
              out.patterns[`${key}|${info.trainId}`] = sig;
            }
          }
        }
      }
    }
    results[t.key] = out;
    console.log(`✅ ${t.key}: meta=${JSON.stringify(out.groupsMeta)}, patterns=${Object.keys(out.patterns).length}`);
    for (const [pk, pv] of Object.entries(out.patterns)) {
      console.log(`   [${pk}] ${pv}`);
    }
  }
  fs.writeFileSync(path.resolve(__dirname, 'cache/tohoku_15lines_yahoo_probe_part2.json'), JSON.stringify(results, null, 2), 'utf8');
}

main().catch(e => { console.error(e); process.exit(1); });
