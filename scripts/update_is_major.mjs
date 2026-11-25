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

// 路線種別ごとの優等種別優先順（停車率60%以下の最上位1種別を採用）
const TOP_KEYS = [
  'liner',
  'tj_liner',
  'limited_exp',
  'limited_express',
  'rapid_exp',
  'new_rapid',
  'special_rapid',
  'yamatoji_rapid',
  'commuter_rapid',
  'express',
  'rapid',
];

// 路線の代表速達種別を個別に指定するオーバーライド（null は優等基準を使わない）
const TOP_KEY_OVERRIDE = {
  // 新幹線
  jr_tokaido_shinkansen: 'hikari',
  jr_sanyo_shinkansen: 'nozomi',
  jr_tohoku_shinkansen: null,
  jr_joetsu_shinkansen: null,
  jr_hokuriku_shinkansen: null,
  // 在来線・私鉄・地下鉄
  jr_chuo: 'special_rapid',
  jr_chuo_sobu_local: null,
  jr_joban_rapid: 'special_rapid',
  jr_joban_toride_iwaki: null,
  jr_kawagoe: null,
  jr_ome: null,
  jr_nambu: null,
  jr_sotobo: null,
  jr_uchibo: null,
  jr_wakayama: null,
  jr_yamatoji: 'yamatoji_rapid',
  jr_kobe: 'new_rapid',
  jr_takarazuka: null,
  jr_musashino: null,
  jr_tohoku_ichinoseki_morioka: null,
  jr_tohoku_sendai_ichinoseki: 'special_rapid',
  jr_kamaishi: null,
  jr_kesennuma_brt: null,
  aoimori: null,
  akita_nairiku: null,
  sanriku_rias: null,
  jr_gono: null,
  shinano_shinano: null,
  seibu_shinjuku: 'limited_exp',
  tobu_urban_park: null,
  kanto_joso: null,
  yokohama_blue: null,
  tokyu_denentoshi: null,
  keio_sagamihara: 'liner',
  toei_mita: null,
};

// 配列末尾が支線・直通先になっているため「端駅」とみなさない例外駅
const NON_TERMINAL_ARRAY_ENDS = {
  jr_narita: new Set(['下総松崎']),
  tokyo_metro_marunouchi: new Set(['中野新橋']),
  jr_musashino: new Set(['横浜']),
};

// カッコ付き別駅連絡でも実質同一ターミナル乗換として扱う駅名
const STRONG_NAMED_TRANSFER_STATIONS = new Set([
  '新秋津', '秋津',
  '北朝霞', '朝霞台',
  '南越谷', '新越谷',
  '川越市', '川越',
  '新松田', '松田',
  '永田町', '赤坂見附',
  '日比谷', '有楽町',
  '溜池山王', '国会議事堂前',
  '新御茶ノ水', '御茶ノ水',
  '水天宮前', '人形町',
  '三越前', '新日本橋',
  '上野広小路', '仲御徒町',
  '新松戸', '津軽二股', '五所川原',
]);

// 都心至近の間引き救済・新幹線・JR西日本データ欠損・ローカル拠点駅の明示追加（forceTrue）
const FORCE_TRUE = {
  // 新幹線
  jr_tokaido_shinkansen: [
    '東京', '品川', '新横浜', '小田原', '熱海', '三島', '静岡', '浜松',
    '豊橋', '名古屋', '米原', '京都', '新大阪',
  ],
  jr_tohoku_shinkansen: ['那須塩原', '新白河', '古川', '一ノ関', '北上', '八戸'],
  jr_joetsu_shinkansen: ['熊谷', '越後湯沢', '長岡', '燕三条'],
  jr_hokuriku_shinkansen: [
    '東京', '上野', '大宮', '熊谷', '高崎', '軽井沢', '上田', '長野',
    '上越妙高', '糸魚川', '富山', '金沢', '小松', '福井', '敦賀',
  ],
  // JR関東・中部・東北
  jr_yamanote: ['浜松町', '高田馬場', '神田', '原宿'],
  jr_keihin_tohoku_negishi: ['浜松町', '神田', '大井町', '蒲田', '桜木町', '王子'],
  jr_chuo: ['吉祥寺', '荻窪'],
  jr_chuo_sobu_local: ['中野', '吉祥寺', '御茶ノ水', '市ケ谷'],
  jr_shonan_shinjuku: ['浦和', '赤羽', '戸塚'],
  jr_tokaido: ['戸塚'],
  jr_yokosuka: ['逗子', '横須賀'],
  jr_yokohama: ['菊名'],
  jr_hachiko: ['東飯能', '高麗川', '小川町'],
  jr_musashino: [
    '府中本町', '西国分寺', '新秋津', '北朝霞', '武蔵浦和', '南浦和',
    '東川口', '南越谷', '南流山', '新松戸', '東松戸', '西船橋', '南船橋',
  ],
  jr_utsunomiya: ['蓮田', '古河', '小金井', '矢板'],
  jr_takasaki: ['籠原'],
  jr_joetsu: ['沼田'],
  jr_echigo: ['巻'],
  jr_ome: ['河辺', '青梅', '御嶽'],
  jr_nambu: ['武蔵溝ノ口', '登戸', '府中本町', '分倍河原'],
  jr_joban_local: ['松戸', '柏', '我孫子'],
  jr_joban_toride_iwaki: ['土浦', '石岡', '日立', '高萩'],
  jr_sotobo: ['蘇我', '大網', '茂原', '上総一ノ宮', '大原', '勝浦'],
  jr_uchibo: ['五井', '木更津', '君津', '浜金谷', '館山'],
  jr_ou_fukushima_shinjo: ['天童'],
  jr_tohoku_fukushima_sendai: ['白石', '岩沼'],
  jr_tohoku_ichinoseki_morioka: ['水沢', '花巻'],
  jr_tohoku_sendai_ichinoseki: ['岩切', '松島', '石越'],
  jr_kamaishi: ['新花巻', '遠野'],
  jr_kesennuma_brt: ['柳津', '志津川', '本吉'],
  jr_rikuu_east: ['最上'],
  sanriku_rias: ['大槌', '陸中山田', '田老', '岩泉小本', '普代', '陸中野田'],
  aoimori: ['三沢', '野辺地', '浅虫温泉'],
  akita_nairiku: ['米内沢', '阿仁合', '松葉'],
  jr_gono: ['能代', '岩館', '十二湖', '深浦', '鰺ケ沢', '五所川原'],
  shinano_shinano: ['戸倉', '篠ノ井'],
  jr_tokaido_toyohashi_maibara: ['安城'],
  // JR関西（優等/乗換データ補完含む）
  jr_takarazuka: ['宝塚', '三田', '新三田'],
  jr_osaka_loop: ['弁天町'],
  jr_gakken_toshi: ['鴫野', '住道', '四条畷', '長尾', '河内磐船', '祝園'],
  jr_kosei: ['大津京'],
  jr_nara: ['東福寺', '六地蔵', '木津'],
  jr_sagano: ['嵯峨嵐山'],
  jr_ako: ['播州赤穂', '備前片上', '西大寺'],
  jr_kakogawa: ['粟生', '西脇市'],
  jr_kansai_kameyama_kamo: ['柘植', '伊賀上野'],
  jr_kusatsu: ['貴生川'],
  jr_sakurai: ['天理', '桜井'],
  jr_obama: ['美浜', '小浜', '若狭高浜'],
  jr_sanyo_himeji_kamigori: ['相生'],
  jr_kishin: ['本竜野', '播磨新宮'],
  jr_wakayama: ['高田', '五条', '橋本', '粉河', '岩出'],
  jr_yamatoji: ['新今宮', 'JR難波'],
  // 関東私鉄・地下鉄
  keisei_main: ['京成八幡', '京成高砂'],
  keisei_matsudo: ['八柱'],
  tobu_skytree: ['押上'],
  tobu_tojo: ['成増'],
  tobu_urban_park: ['岩槻', '春日部', '野田市', '流山おおたかの森'],
  kanto_joso: ['守谷', '水海道', '石下', '下妻'],
  yokohama_blue: ['上永谷', '上大岡', '桜木町', 'センター南'],
  yokohama_green: ['センター南'],
  sendai_subway_namboku: ['北仙台'],
  tokyu_denentoshi: ['三軒茶屋', '溝の口', '鷺沼', 'たまプラーザ', '青葉台'],
  odakyu_tama: ['小田急永山'],
  seibu_ikebukuro: ['石神井公園', 'ひばりヶ丘', '東飯能'],
  seibu_shinjuku: ['田無', '小平', '東村山', '所沢'],
  seibu_haijima: ['小川', '玉川上水'],
  rinkai: ['大井町', '国際展示場', '天王洲アイル'],
  tokyo_metro_ginza: ['表参道', '青山一丁目', '溜池山王', '銀座'],
  tokyo_metro_marunouchi: ['四ツ谷', '新宿三丁目', '銀座', '後楽園', '方南町'],
  tokyo_metro_hibiya: ['中目黒', '六本木', '銀座', '霞ケ関', '茅場町'],
  tokyo_metro_tozai: ['日本橋', '九段下', '茅場町', '門前仲町', '東陽町', '浦安'],
  tokyo_metro_chiyoda: ['代々木上原', '明治神宮前〈原宿〉', '町屋', '綾瀬'],
  tokyo_metro_hanzomon: ['表参道', '清澄白河'],
  tokyo_metro_namboku: ['麻布十番', '四ツ谷', '市ケ谷', '後楽園', '駒込', '王子', '赤羽岩淵'],
  tokyo_metro_yurakucho: ['小竹向原', '市ケ谷', '月島', '豊洲'],
  tokyo_metro_fukutoshin: ['小竹向原'],
  toei_asakusa: ['中延', '泉岳寺', '三田', '大門', '浅草橋'],
  toei_mita: ['三田', '水道橋', '春日', '巣鴨', '高島平'],
  toei_shinjuku: ['新宿三丁目', '九段下', '森下', '住吉'],
  toei_oedo: ['代々木', '月島', '門前仲町', '森下', '本郷三丁目', '大門', '麻布十番', '六本木', '中野坂上', '中井', '汐留'],
  toei_arakawa: ['町屋駅前', '熊野前', '王子駅前', '大塚駅前'],
  toei_nippori_toneri: ['西日暮里', '熊野前', '江北'],
  yurikamome: ['汐留', 'お台場海浜公園', '台場', '有明', '市場前'],
  new_shuttle: ['鉄道博物館', '丸山'],
  enoden: ['江ノ島', '長谷'],
};

// 複々線・並走乗換・各駅停車区間の例外除外（forceFalse）
const FORCE_FALSE = {
  jr_tokaido_shinkansen: ['岐阜羽島'],
  jr_utsunomiya: ['岡本'],
  jr_keihin_tohoku_negishi: ['さいたま新都心'],
  jr_saikyo: ['板橋', '十条'],
  jr_takasaki: ['北本', '新町'],
  jr_yokosuka: ['北鎌倉'],
  jr_nambu: ['鹿島田', '八丁畷', '尻手'],
  jr_musashino: ['大宮', '吉川美南', '馬橋', '鶴見', '横浜'],
  jr_yokohama: ['片倉'],
  jr_hachiko: ['北藤岡'],
  jr_joetsu: ['湯檜曽', '土合'],
  jr_shinonoi: ['田沢', '聖高原'],
  jr_chuo_tatsuno: ['川岸'],
  jr_ou_omagari_akita: ['和田', '四ツ小屋'],
  jr_ou_shinjo_omagari: ['院内', '飯詰'],
  jr_rikuu_east: ['有備館', '川渡温泉', '鳴子御殿湯'],
  jr_yamatoji: ['平城山', '郡山', '大和小泉', '法隆寺'],
  jr_biwako: ['膳所'],
  jr_kobe: ['住吉'],
  jr_sanin_sonobe_kinosaki: ['日吉'],
  jr_tokaido_toyohashi_maibara: ['三河塩津', '熱田', '枇杷島'],
  jr_chuo_west: ['勝川'],
  tobu_tojo: ['つきのわ', '武蔵嵐山', 'みなみ寄居'],
  tobu_nikko: ['杉戸高野台', '板倉東洋大前'],
  tobu_isesaki: ['木崎', '境町', '新伊勢崎'],
  tobu_sano: ['佐野市', '田沼'],
  tobu_kinugawa: ['鬼怒川公園'],
  tokyu_toyoko: ['学芸大学', '田園調布', '多摩川'],
  tokyu_denentoshi: ['高津'],
  odakyu_odawara: ['豪徳寺'],
  seibu_ikebukuro: ['横瀬'],
  nagano_dentetsu: ['市役所前', '本郷', '信濃吉田', '朝陽'],
  echigo_tokimeki_myoko_haneuma: ['春日山'],
  toei_mita: ['白金台'],
  toei_oedo: ['新宿西口', '東新宿', '春日', '新御徒町'],
  tokyo_metro_hibiya: ['仲御徒町'],
  tokyo_metro_namboku: ['白金高輪'],
  tokyo_metro_chiyoda: ['二重橋前〈丸の内〉'],
  tokyo_metro_marunouchi: ['淡路町'],
  yokohama_blue: ['関内', 'センター北'],
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

// 乗換文字列を正規化し、貨物・誤混入データ・弱い徒歩連絡等を分類する
function normalizeTransferEntry(lineId, stationName, rawTr) {
  if (/貨物|工場/.test(rawTr)) return null;
  if (lineId === 'jr_echigo' && stationName === '青山' && /東京メトロ|都営/.test(rawTr)) return null;
  if ((lineId === 'jr_osaka_loop' || lineId === 'jr_yamatoji') && stationName === '今宮' && /南海/.test(rawTr)) return null;

  const norm = rawTr
    .replace(/ＪＲ/g, 'JR')
    .replace(/Osaka Metro/g, 'OsakaMetro')
    .replace(/(JR山手線|JR大阪環状線)(外回り|内回り)/g, '$1')
    .trim();

  const base = norm.replace(/[（(][^）)]*[）)]/g, '').trim();
  const hasParen = /[（(][^）)]*[）)]/.test(norm);
  const isTram = /都電荒川線|東急世田谷線/.test(base);
  const isWeak =
    !STRONG_NAMED_TRANSFER_STATIONS.has(stationName) &&
    ((hasParen && /(駅|停留場|徒歩)/.test(norm)) || isTram);

  return { norm, base, isWeak };
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
  const parsedList = stations.map((s) => {
    const seenNorm = new Set();
    const entries = [];
    for (const rawTr of s.transfers || []) {
      const p = normalizeTransferEntry(lineId, s.name, rawTr);
      if (!p || seenNorm.has(p.norm)) continue;
      seenNorm.add(p.norm);
      entries.push(p);
    }
    return entries;
  });

  // 1. 並走路線を検出（ベース路線名で全体25%以上かつ4駅以上、または新幹線以外で連続4駅以上並走）
  const baseFreq = {};
  for (let i = 0; i < stations.length; i++) {
    const uniqBase = new Set(parsedList[i].map((e) => e.base));
    for (const b of uniqBase) baseFreq[b] = (baseFreq[b] || 0) + 1;
  }
  const parallelBases = new Set(
    Object.entries(baseFreq)
      .filter(([, c]) => c >= 4 && c / stations.length >= 0.25)
      .map(([k]) => k)
  );
  if (!lineId.includes('shinkansen')) {
    for (const b of Object.keys(baseFreq)) {
      if (b.includes('新幹線')) continue;
      let run = 0;
      for (let i = 0; i < stations.length; i++) {
        if (parsedList[i].some((e) => e.base === b)) {
          run++;
          if (run >= 4) {
            parallelBases.add(b);
            break;
          }
        } else {
          run = 0;
        }
      }
    }
  }

  const effStrong = parsedList.map((entries) => {
    const seen = new Set();
    const res = [];
    for (const e of entries) {
      if (parallelBases.has(e.base) || e.isWeak) continue;
      if (!seen.has(e.base)) {
        seen.add(e.base);
        res.push(e.base);
      }
    }
    return res;
  });

  // 2. 代表優等種別の選定（上位優先で停車率60%以下を採用）
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
    for (const k of TOP_KEYS) {
      if (
        typeCounts[k] &&
        typeCounts[k] < stations.length &&
        typeCounts[k] <= stations.length * 0.6 &&
        typeCounts[k] >= 2
      ) {
        topKey = k;
        break;
      }
    }
  }

  // 3. 路線密度に応じた実質乗換数の閾値決定
  const c1 = effStrong.filter((a) => a.length >= 1).length / stations.length;
  const c2 = effStrong.filter((a) => a.length >= 2).length / stations.length;
  let th = 1;
  if (c1 > 0.45) th = 2;
  if (c2 > 0.45) th = 3;
  const isSubway =
    lineId.startsWith('tokyo_metro_') ||
    lineId.startsWith('toei_') ||
    lineId.startsWith('yokohama_') ||
    lineId.startsWith('sendai_subway_');
  const isDenseMetroRail =
    isSubway ||
    lineId === 'jr_yamanote' ||
    lineId === 'jr_keihin_tohoku_negishi' ||
    lineId === 'jr_chuo_sobu_local';
  const effTh = isSubway ? 2 : th;

  const nonEndSet = NON_TERMINAL_ARRAY_ENDS[lineId] || new Set();
  const isAllShinkansen =
    lineId === 'jr_akita_shinkansen' || lineId === 'jr_yamagata_shinkansen';

  const items = stations.map((s, i) => {
    const isEnd = (i === 0 || i === stations.length - 1) && !nonEndSet.has(s.name);
    const isTop = topKey ? (s.stoppingTypes || []).includes(topKey) : false;
    const hasShinkansen = effStrong[i].some((t) => t.includes('新幹線'));
    const trCount = effStrong[i].length;
    const isTr = trCount >= effTh || hasShinkansen;
    const candidate = isEnd || isTop || isTr || isAllShinkansen;
    const score =
      (hasShinkansen ? 80 : 0) +
      (isTop ? 50 : 0) +
      trCount * 15 +
      (s.stoppingTypes || []).length * 3 +
      effStrong[i].length;
    return { s, i, candidate, isEnd, hasShinkansen, isTop, trCount, score };
  });

  // 4. 距離間引き（過密地下鉄・都心路線は複数乗換を保護、それ以外は1.0km未満または隣接1.5km未満で低スコア側を抑制）
  const sorted = [...items.filter((x) => x.candidate)].sort(
    (a, b) => b.score - a.score || a.i - b.i
  );
  const keptSet = new Set();
  for (const item of sorted) {
    const isMust =
      item.isEnd ||
      item.hasShinkansen ||
      item.isTop ||
      item.trCount >= (isDenseMetroRail ? 2 : 4) ||
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
