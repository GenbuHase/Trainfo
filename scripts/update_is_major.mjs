/**
 * 全276路線の stations.ts に対して、ゼロベース基準（距離間引き＋明示オーバーライド）で
 * isMajor (true / false) を一括再設定するメンテナンススクリプト。
 *
 * 使い方:
 *   node scripts/update_is_major.mjs           # 全路線を更新
 *   node scripts/update_is_major.mjs --dry-run # 変更内容のみ確認（ファイル書換なし）
 */

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const LINES_DIR = path.resolve('src/data/lines');
const DRY_RUN = process.argv.includes('--dry-run');

// 路線種別ごとの優等種別優先順（停車率50%以下、該当なしなら60%以下の最上位1種別を採用）
const TOP_KEYS = [
  'liner',
  'tj_liner',
  'limited_exp',
  'limited_express',
  'rapid_exp',
  'special_rapid',
  'yamatoji_rapid',
  'commuter_rapid',
  'express',
  'rapid',
];

// 路線の代表速達種別を個別に指定するオーバーライド（null は優等基準を使わない）
const TOP_KEY_OVERRIDE = {
  jr_chuo: 'special_rapid',
  jr_chuo_sobu_local: null,
  jr_joban_rapid: 'special_rapid',
  jr_joban_toride_iwaki: null,
  jr_ome: null,
  jr_nambu: null,
  jr_sotobo: null,
  jr_uchibo: null,
  jr_wakayama: null,
  jr_yamatoji: 'yamatoji_rapid',
  jr_tohoku_ichinoseki_morioka: null,
  jr_tohoku_sendai_ichinoseki: 'special_rapid',
  jr_kamaishi: null,
  tobu_urban_park: null,
  kanto_joso: null,
  yokohama_blue: null,
  tokyu_denentoshi: null,
  keio_sagamihara: 'liner',
};

// 配列末尾が支線途中駅になっているため「端駅」とみなさない例外駅
const NON_TERMINAL_ARRAY_ENDS = {
  jr_narita: new Set(['下総松崎']),
  tokyo_metro_marunouchi: new Set(['中野新橋']),
};

// 都心至近の間引き救済およびローカル線拠点駅の明示追加（forceTrue）
const FORCE_TRUE = {
  jr_yamanote: ['浜松町'],
  jr_keihin_tohoku_negishi: ['浜松町'],
  jr_utsunomiya: ['蓮田', '古河', '小金井', '矢板'],
  jr_takasaki: ['籠原'],
  jr_ome: ['河辺', '青梅', '御嶽'],
  jr_nambu: ['尻手', '武蔵溝ノ口', '登戸', '府中本町', '分倍河原'],
  jr_joban_local: ['松戸', '柏', '我孫子'],
  jr_joban_toride_iwaki: ['土浦', '石岡', '日立', '高萩'],
  jr_sotobo: ['蘇我', '大網', '茂原', '上総一ノ宮', '大原', '勝浦'],
  jr_uchibo: ['五井', '木更津', '君津', '浜金谷', '館山'],
  jr_tohoku_ichinoseki_morioka: ['水沢', '花巻'],
  jr_tohoku_sendai_ichinoseki: ['岩切', '松島', '石越'],
  jr_kamaishi: ['新花巻', '遠野'],
  jr_nara: ['木津'],
  jr_wakayama: ['高田', '五条', '橋本', '粉河', '岩出'],
  jr_yamatoji: ['新今宮', 'JR難波'],
  keisei_main: ['京成高砂'],
  tobu_skytree: ['押上'],
  tobu_urban_park: ['岩槻', '春日部', '野田市', '流山おおたかの森'],
  kanto_joso: ['守谷', '水海道', '石下', '下妻'],
  yokohama_blue: ['上永谷', '上大岡', '関内', '桜木町', 'センター南', 'センター北'],
  tokyu_denentoshi: ['溝の口', '鷺沼', 'たまプラーザ', '青葉台'],
  seibu_ikebukuro: ['石神井公園', 'ひばりヶ丘'],
  tokyo_metro_ginza: ['表参道', '銀座', '三越前'],
  tokyo_metro_marunouchi: ['四ツ谷', '銀座', '方南町'],
  tokyo_metro_hibiya: ['銀座', '霞ケ関'],
  tokyo_metro_tozai: ['日本橋'],
  tokyo_metro_hanzomon: ['表参道', '神保町'],
  tokyo_metro_namboku: ['溜池山王', '四ツ谷'],
  toei_asakusa: ['大門', '三田'],
  toei_mita: ['日比谷', '神保町'],
  toei_oedo: ['六本木', '大門', '春日'],
  toei_arakawa: ['町屋駅前', '熊野前', '王子駅前', '大塚駅前'],
  toei_nippori_toneri: ['西日暮里', '熊野前', '江北'],
  yurikamome: ['お台場海浜公園', '台場', '有明', '市場前'],
  new_shuttle: ['鉄道博物館', '丸山'],
  enoden: ['江ノ島', '長谷'],
};

// 複々線・並走乗換や末端各停区間の例外除外（forceFalse）
const FORCE_FALSE = {
  jr_utsunomiya: ['岡本'],
  jr_saikyo: ['板橋', '十条'],
  jr_takasaki: ['北本', '新町'],
  jr_nambu: ['鹿島田', '八丁畷'],
  jr_yamatoji: ['平城山', '大和小泉', '法隆寺'],
  tobu_tojo: ['つきのわ', 'みなみ寄居'],
  tokyu_denentoshi: ['高津'],
  odakyu_odawara: ['豪徳寺'],
};

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function loadStationsArray(stPath) {
  const raw = fs.readFileSync(stPath, 'utf8');
  const js = ts.transpileModule(raw, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText;
  const mod = { exports: {} };
  new Function('exports', 'module', 'require', js)(mod.exports, mod, () => ({}));
  const stations = Object.values(mod.exports).find(Array.isArray) || [];
  return { raw, stations };
}

function computeIsMajorFlags(lineId, stations) {
  // 1. 並走路線を検出（全体25%以上かつ4駅以上、または新幹線以外で連続4駅以上並走）
  const trFreq = {};
  for (const s of stations) {
    for (const t of s.transfers || []) {
      trFreq[t] = (trFreq[t] || 0) + 1;
    }
  }
  const parallel = new Set(
    Object.entries(trFreq)
      .filter(([, c]) => c >= 4 && c / stations.length >= 0.25)
      .map(([k]) => k)
  );
  if (!lineId.includes('shinkansen')) {
    for (const t of Object.keys(trFreq)) {
      if (t.includes('新幹線')) continue;
      let run = 0;
      for (const s of stations) {
        if ((s.transfers || []).includes(t)) {
          run++;
          if (run >= 4) {
            parallel.add(t);
            break;
          }
        } else {
          run = 0;
        }
      }
    }
  }
  const eff = stations.map((s) => (s.transfers || []).filter((t) => !parallel.has(t)));

  // 2. 代表優等種別の選定
  const typeCounts = {};
  for (const s of stations) {
    for (const t of s.stoppingTypes || []) {
      typeCounts[t] = (typeCounts[t] || 0) + 1;
    }
  }
  let topKey = null;
  if (lineId in TOP_KEY_OVERRIDE) {
    topKey = TOP_KEY_OVERRIDE[lineId];
  } else {
    for (const limit of [0.5, 0.6]) {
      for (const k of TOP_KEYS) {
        if (
          typeCounts[k] &&
          typeCounts[k] < stations.length &&
          typeCounts[k] <= stations.length * limit &&
          typeCounts[k] >= 2
        ) {
          topKey = k;
          break;
        }
      }
      if (topKey) break;
    }
  }

  // 3. 路線密度に応じた実質乗換数の閾値決定
  const c1 = eff.filter((a) => a.length >= 1).length / stations.length;
  const c2 = eff.filter((a) => a.length >= 2).length / stations.length;
  let th = 1;
  if (c1 > 0.45) th = 2;
  if (c2 > 0.45) th = 3;
  const isSubway =
    lineId.startsWith('tokyo_metro_') ||
    lineId.startsWith('toei_') ||
    lineId.startsWith('yokohama_') ||
    lineId.startsWith('sendai_subway_');
  const effTh = isSubway ? Math.min(th, 1) : th;

  const nonEndSet = NON_TERMINAL_ARRAY_ENDS[lineId] || new Set();
  const isAllShinkansen =
    lineId === 'jr_akita_shinkansen' || lineId === 'jr_yamagata_shinkansen';

  const items = stations.map((s, i) => {
    const isEnd = (i === 0 || i === stations.length - 1) && !nonEndSet.has(s.name);
    const isTop = topKey ? (s.stoppingTypes || []).includes(topKey) : false;
    const hasShinkansen = eff[i].some((t) => t.includes('新幹線'));
    const trCount = eff[i].length;
    const isTr = trCount >= effTh || hasShinkansen;
    const candidate = isEnd || isTop || isTr || isAllShinkansen;
    const score =
      (hasShinkansen ? 80 : 0) +
      (isTop ? 50 : 0) +
      trCount * 15 +
      (s.stoppingTypes || []).length * 3 +
      (s.transfers || []).length;
    return { s, i, candidate, isEnd, hasShinkansen, isTop, trCount, score };
  });

  // 4. 距離間引き（1.0km以内、または隣接駅で1.5km以内かつ低スコア側を抑制）
  const sorted = [...items.filter((x) => x.candidate)].sort(
    (a, b) => b.score - a.score || a.i - b.i
  );
  const keptSet = new Set();
  for (const item of sorted) {
    const isMust =
      item.isEnd ||
      item.hasShinkansen ||
      item.isTop ||
      item.trCount >= 4 ||
      lineId.includes('shinkansen');
    if (isMust) {
      keptSet.add(item.i);
      continue;
    }
    let suppressed = false;
    for (const kIdx of keptSet) {
      const kept = items[kIdx];
      const dist = haversineKm(item.s.lat, item.s.lng, kept.s.lat, kept.s.lng);
      const isAdj = Math.abs(item.i - kIdx) === 1;
      if (dist < 1.0 || (isAdj && dist < 1.5 && item.score <= kept.score)) {
        suppressed = true;
        break;
      }
    }
    if (!suppressed) keptSet.add(item.i);
  }

  // 5. 明示的オーバーライド適用
  const ft = new Set(FORCE_TRUE[lineId] || []);
  const ff = new Set(FORCE_FALSE[lineId] || []);
  for (const x of items) {
    if (ft.has(x.s.name)) keptSet.add(x.i);
    if (ff.has(x.s.name)) keptSet.delete(x.i);
  }

  return stations.map((_, i) => keptSet.has(i));
}

function getPropertyKeyName(prop) {
  if (!ts.isPropertyAssignment(prop)) return null;
  if (ts.isIdentifier(prop.name) || ts.isStringLiteral(prop.name)) {
    return prop.name.text;
  }
  return null;
}

function applyFlagsToSource(raw, flags) {
  const sf = ts.createSourceFile('stations.ts', raw, ts.ScriptTarget.Latest, true);
  let arrayNode = null;

  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
        arrayNode = decl.initializer;
        break;
      }
    }
    if (arrayNode) break;
  }
  if (!arrayNode) {
    throw new Error('Station[] array literal not found');
  }
  if (arrayNode.elements.length !== flags.length) {
    throw new Error(
      `Station count mismatch: AST=${arrayNode.elements.length}, flags=${flags.length}`
    );
  }

  // 文字スタイル（クォート付きか否か）をファイル全体から判定
  const usesQuotedKeys = /"name":/.test(raw);
  const edits = [];

  for (let i = 0; i < arrayNode.elements.length; i++) {
    const elem = arrayNode.elements[i];
    if (!ts.isObjectLiteralExpression(elem)) continue;
    const targetVal = flags[i] ? 'true' : 'false';

    const existing = elem.properties.find((p) => getPropertyKeyName(p) === 'isMajor');
    if (existing && ts.isPropertyAssignment(existing)) {
      const init = existing.initializer;
      const start = init.getStart(sf);
      const end = init.getEnd();
      if (raw.slice(start, end) !== targetVal) {
        edits.push({ start, end, text: targetVal });
      }
    } else {
      // stoppingTypes の直後、なければ最後のプロパティの直後に挿入
      const stopProp = elem.properties.find(
        (p) => getPropertyKeyName(p) === 'stoppingTypes'
      );
      const anchorProp = stopProp || elem.properties[elem.properties.length - 1];
      const anchorEnd = anchorProp.getEnd();

      // アンカープロパティのインデントを取得
      const lineStart = raw.lastIndexOf('\n', anchorProp.getStart(sf)) + 1;
      const indentMatch = raw.slice(lineStart, anchorProp.getStart(sf)).match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1] : '    ';
      const keyLiteral = usesQuotedKeys ? '"isMajor"' : 'isMajor';

      // アンカー直後にカンマがあるか確認
      const afterAnchor = raw.slice(anchorEnd);
      const hasComma = /^\s*,/.test(afterAnchor);
      if (hasComma) {
        const commaOffset = anchorEnd + afterAnchor.indexOf(',') + 1;
        edits.push({
          start: commaOffset,
          end: commaOffset,
          text: `\n${indent}${keyLiteral}: ${targetVal},`,
        });
      } else {
        edits.push({
          start: anchorEnd,
          end: anchorEnd,
          text: `,\n${indent}${keyLiteral}: ${targetVal}`,
        });
      }
    }
  }

  // 後ろから適用してオフセットのズレを防ぐ
  edits.sort((a, b) => b.start - a.start);
  let next = raw;
  for (const e of edits) {
    next = next.slice(0, e.start) + e.text + next.slice(e.end);
  }
  return next;
}

const dirs = fs
  .readdirSync(LINES_DIR)
  .filter((d) => fs.statSync(path.join(LINES_DIR, d)).isDirectory())
  .sort();

let totalStations = 0;
let totalTrue = 0;
let totalFalse = 0;
let updatedFiles = 0;

for (const d of dirs) {
  const stPath = path.join(LINES_DIR, d, 'stations.ts');
  const { raw, stations } = loadStationsArray(stPath);
  const flags = computeIsMajorFlags(d, stations);

  totalStations += stations.length;
  for (const f of flags) {
    if (f) totalTrue++;
    else totalFalse++;
  }

  const next = applyFlagsToSource(raw, flags);
  if (next !== raw) {
    if (!DRY_RUN) {
      fs.writeFileSync(stPath, next, 'utf8');
    }
    updatedFiles++;
  }
}

console.log(
  JSON.stringify(
    {
      dryRun: DRY_RUN,
      totalLines: dirs.length,
      totalStations,
      totalTrue,
      totalFalse,
      updatedFiles,
    },
    null,
    2
  )
);
