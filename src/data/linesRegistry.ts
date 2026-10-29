import type { LineDefinition, LineId, RegionArea, Station, TrackSegment, TrainTypeConfig, TimetableTrip, StationTimetableStore, CustomTrainTypeConfig } from '../types';
import { tojoLine } from './lines/tojo';
import { ogoseLine } from './lines/ogose';
import { saikyoLine } from './lines/saikyo';
import { kawagoeLine } from './lines/kawagoe';
import { musashinoLine } from './lines/musashino';
import { tsukubaExpressLine } from './lines/tsukuba_express';
import { chuoLine } from './lines/chuo';
import { chuoMainLine } from './lines/chuo_main';
import { shinonoiLine } from './lines/shinonoi';
import { oitoEastLine } from './lines/oito_east';
import { oitoWestLine } from './lines/oito_west';
import { rinkaiLine } from './lines/rinkai';
import { yurakuchoLine } from './lines/yurakucho';
import { fukutoshinLine } from './lines/fukutoshin';
import { seibuIkebukuroLine } from './lines/seibu_ikebukuro';
import { seibuYurakuchoLine } from './lines/seibu_yurakucho';
import { hachikoLine } from './lines/hachiko';
import { itsukaichiLine } from './lines/itsukaichi';
import { omeLine } from './lines/ome';
import { chichibuLine } from './lines/chichibu';
import { odakyuOdawaraLine } from './lines/odakyu_odawara';
import { odakyuEnoshimaLine } from './lines/odakyu_enoshima';
import { odakyuTamaLine } from './lines/odakyu_tama';
import { tokyuToyokoLine } from './lines/tokyu_toyoko';
import { minatomiraiLine } from './lines/minatomirai';
import { tokyuShinYokohamaLine } from './lines/tokyu_shin_yokohama';
import { sotetsuShinYokohamaLine } from './lines/sotetsu_shin_yokohama';
import { sotetsuMainLine } from './lines/sotetsu_main';
import { sotetsuIzuminoLine } from './lines/sotetsu_izumino';
import { sotetsuJrDirectLine } from './lines/sotetsu_jr_direct';
import { chiyodaLine } from './lines/chiyoda';
import { jobanLocalLine } from './lines/joban_local';
import { jobanRapidLine } from './lines/joban_rapid';
import { jobanTorideIwakiLine } from './lines/joban_toride_iwaki';
import { jobanIwakiSendaiLine } from './lines/joban_iwaki_sendai';
import { tohokuShinkansenLine } from './lines/tohoku_shinkansen';
import { joetsuShinkansenLine } from './lines/joetsu_shinkansen';
import { tokaidoLine } from './lines/tokaido';
import { tokaidoShizuokaLine } from './lines/tokaido_shizuoka';
import { itoLine } from './lines/ito';
import { yokosukaLine } from './lines/yokosuka';
import { sobuRapidLine } from './lines/sobu_rapid';
import { utsunomiyaLine } from './lines/utsunomiya';
import { takasakiLine } from './lines/takasaki';
import { shonanShinjukuLine } from './lines/shonan_shinjuku';
import { uenoTokyoLine } from './lines/ueno_tokyo';
import { ryomoLine } from './lines/ryomo';
import { joetsuLine } from './lines/joetsu';
import { shinetsuNaoetsuNiigataLine } from './lines/shinetsu_naoetsu_niigata';
import { shinetsuTakasakiYokokawaLine } from './lines/shinetsu_takasaki_yokokawa';
import { hakushinLine } from './lines/hakushin';
import { uetsuMainLine } from './lines/uetsu_main';
import { tadamiLine } from './lines/tadami';
import { banetsuWestLine } from './lines/banetsu_west';
import { banetsuEastLine } from './lines/banetsu_east';
import { myokoHaneumaLine } from './lines/myoko_haneuma';
import { kitaShinanoLine } from './lines/kita_shinano';
import { nihonkaiHisuiLine } from './lines/nihonkai_hisui';
import { hokuhokuLine } from './lines/hokuhoku';
import { hokurikuShinkansenLine } from './lines/hokuriku_shinkansen';
import { tobuSkytreeLine } from './lines/tobu_skytree';
import { tobuIsesakiLine } from './lines/tobu_isesaki';
import { tobuKameidoLine } from './lines/tobu_kameido';
import { tobuDaishiLine } from './lines/tobu_daishi';
import { tobuSanoLine } from './lines/tobu_sano';
import { tobuKoizumiLine } from './lines/tobu_koizumi';
import { tobuKiryuLine } from './lines/tobu_kiryu';
import { tobuNikkoLine } from './lines/tobu_nikko';
import { tobuUtsunomiyaLine } from './lines/tobu_utsunomiya';
import { tobuKinugawaLine } from './lines/tobu_kinugawa';
import { tobuUrbanParkLine } from './lines/tobu_urban_park';
import { yaganLine } from './lines/yagan';
import { aizuLine } from './lines/aizu';
import { yamagataShinkansenLine } from './lines/yamagata_shinkansen';
import { akitaShinkansenLine } from './lines/akita_shinkansen';
import { ouFukushimaShinjoLine } from './lines/ou_fukushima_shinjo';
import { ouShinjoOmagariLine } from './lines/ou_shinjo_omagari';
import { ouOmagariAkitaLine } from './lines/ou_omagari_akita';
import { ouAkitaAomoriLine } from './lines/ou_akita_aomori';
import { fujikyuLine } from './lines/fujikyu';
import { gotembaLine } from './lines/gotemba';
import { izukyuLine } from './lines/izukyu';
import { izuhakoneSunzuLine } from './lines/izuhakone_sunzu';
import { hibiyaLine } from './lines/hibiya';
import { marunouchiLine } from './lines/marunouchi';
import { hanzomonLine } from './lines/hanzomon';
import { ginzaLine } from './lines/ginza';
import { nambokuLine } from './lines/namboku';
import { tozaiLine } from './lines/tozai';
import { yamanoteLine } from './lines/yamanote';
import { keiyoLine } from './lines/keiyo';
import { sotoboLine } from './lines/sotobo';
import { sobuMainLine } from './lines/sobu_main';
import { naritaLine } from './lines/narita';
import { toganeLine } from './lines/togane';
import { kururiLine } from './lines/kururi';
import { chuoSobuLocalLine } from './lines/chuo_sobu_local';
import { keihinTohokuNegishiLine } from './lines/keihin_tohoku_negishi';
import { yokohamaLine } from './lines/yokohama';
import { nambuLine } from './lines/nambu';
import { tsurumiLine } from './lines/tsurumi';
import { uchiboLine } from './lines/uchibo';


// 登録路線マップ（将来新しい路線を追加する場合はここに追記するだけ）
export const LINES_REGISTRY: Record<string, LineDefinition> = {
  tohoku_shinkansen: tohokuShinkansenLine,
  joetsu_shinkansen: joetsuShinkansenLine,
  yamagata_shinkansen: yamagataShinkansenLine,
  akita_shinkansen: akitaShinkansenLine,
  hokuriku_shinkansen: hokurikuShinkansenLine,
  yamanote: yamanoteLine,
  keihin_tohoku_negishi: keihinTohokuNegishiLine,
  chuo: chuoLine,
  chuo_sobu_local: chuoSobuLocalLine,
  saikyo: saikyoLine,
  musashino: musashinoLine,
  keiyo: keiyoLine,
  ueno_tokyo: uenoTokyoLine,
  shonan_shinjuku: shonanShinjukuLine,
  tokaido: tokaidoLine,
  yokosuka: yokosukaLine,
  sobu_rapid: sobuRapidLine,
  utsunomiya: utsunomiyaLine,
  takasaki: takasakiLine,
  ito: itoLine,
  joban_rapid: jobanRapidLine,
  joban_local: jobanLocalLine,
  joban_toride_iwaki: jobanTorideIwakiLine,
  joban_iwaki_sendai: jobanIwakiSendaiLine,
  yokohama: yokohamaLine,
  nambu: nambuLine,
  tsurumi: tsurumiLine,
  sotetsu_jr_direct: sotetsuJrDirectLine,
  kawagoe: kawagoeLine,
  hachiko: hachikoLine,
  ome: omeLine,
  itsukaichi: itsukaichiLine,
  sobu_main: sobuMainLine,
  narita: naritaLine,
  sotobo: sotoboLine,
  uchibo: uchiboLine,
  togane: toganeLine,
  kururi: kururiLine,
  ryomo: ryomoLine,
  joetsu: joetsuLine,
  chuo_main: chuoMainLine,
  shinonoi: shinonoiLine,
  oito_east: oitoEastLine,
  shinetsu_takasaki_yokokawa: shinetsuTakasakiYokokawaLine,
  shinetsu_naoetsu_niigata: shinetsuNaoetsuNiigataLine,
  hakushin: hakushinLine,
  uetsu_main: uetsuMainLine,
  ou_fukushima_shinjo: ouFukushimaShinjoLine,
  ou_shinjo_omagari: ouShinjoOmagariLine,
  ou_omagari_akita: ouOmagariAkitaLine,
  ou_akita_aomori: ouAkitaAomoriLine,
  tadami: tadamiLine,
  banetsu_west: banetsuWestLine,
  banetsu_east: banetsuEastLine,
  tokaido_shizuoka: tokaidoShizuokaLine,
  gotemba: gotembaLine,
  oito_west: oitoWestLine,
  ginza: ginzaLine,
  marunouchi: marunouchiLine,
  hibiya: hibiyaLine,
  tozai: tozaiLine,
  chiyoda: chiyodaLine,
  yurakucho: yurakuchoLine,
  hanzomon: hanzomonLine,
  namboku: nambokuLine,
  fukutoshin: fukutoshinLine,
  tobu_skytree: tobuSkytreeLine,
  tobu_isesaki: tobuIsesakiLine,
  tobu_kameido: tobuKameidoLine,
  tobu_daishi: tobuDaishiLine,
  tobu_sano: tobuSanoLine,
  tobu_koizumi: tobuKoizumiLine,
  tobu_kiryu: tobuKiryuLine,
  tobu_nikko: tobuNikkoLine,
  tobu_utsunomiya: tobuUtsunomiyaLine,
  tobu_kinugawa: tobuKinugawaLine,
  tobu_urban_park: tobuUrbanParkLine,
  tojo: tojoLine,
  ogose: ogoseLine,
  seibu_ikebukuro: seibuIkebukuroLine,
  seibu_yurakucho: seibuYurakuchoLine,
  odakyu_odawara: odakyuOdawaraLine,
  odakyu_enoshima: odakyuEnoshimaLine,
  odakyu_tama: odakyuTamaLine,
  tokyu_toyoko: tokyuToyokoLine,
  tokyu_shin_yokohama: tokyuShinYokohamaLine,
  minatomirai: minatomiraiLine,
  sotetsu_shin_yokohama: sotetsuShinYokohamaLine,
  sotetsu_main: sotetsuMainLine,
  sotetsu_izumino: sotetsuIzuminoLine,
  tsukuba_express: tsukubaExpressLine,
  rinkai: rinkaiLine,
  chichibu: chichibuLine,
  fujikyu: fujikyuLine,
  izukyu: izukyuLine,
  izuhakone_sunzu: izuhakoneSunzuLine,
  yagan: yaganLine,
  aizu: aizuLine,
  hokuhoku: hokuhokuLine,
  myoko_haneuma: myokoHaneumaLine,
  nihonkai_hisui: nihonkaiHisuiLine,
  kita_shinano: kitaShinanoLine,
};

// 登録されている全路線の配列を取得
export function getAllLines(): LineDefinition[] {
  const lines = Object.values(LINES_REGISTRY);
  for (const line of lines) {
    if (!line.area && LINE_AREA_MAP[line.id]) {
      line.area = LINE_AREA_MAP[line.id];
    }
  }
  return lines;
}

export interface OperatorLinesGroup {
  operator: string;
  lines: LineDefinition[];
}

// 運行会社ごとの標準表示順序
export const OPERATOR_DISPLAY_ORDER = [
  'JR東日本',
  'JR東海',
  'JR西日本',
  '東京メトロ',
  '東武鉄道',
  '西武鉄道',
  '小田急電鉄',
  '東急電鉄',
  '横浜高速鉄道',
  '相模鉄道',
  '首都圏新都市鉄道',
  '東京臨海高速鉄道',
  '秩父鉄道',
  '富士山麓電気鉄道',
  '伊豆急行',
  '伊豆箱根鉄道',
  '野岩鉄道',
  '会津鉄道',
  '北越急行',
  'えちごトキめき鉄道',
  'しなの鉄道',
];

// 運行会社ごとにグループ化した路線リストを取得
export function getLinesGroupedByOperator(): OperatorLinesGroup[] {
  const allLines = getAllLines();
  const map = new Map<string, LineDefinition[]>();

  for (const line of allLines) {
    const op = line.operator || 'その他';
    const list = map.get(op);
    if (list) {
      list.push(line);
    } else {
      map.set(op, [line]);
    }
  }

  const sortedOperators = Array.from(map.keys()).sort((a, b) => {
    const idxA = OPERATOR_DISPLAY_ORDER.indexOf(a);
    const idxB = OPERATOR_DISPLAY_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b, 'ja');
  });

  return sortedOperators.map((operator) => ({
    operator,
    lines: map.get(operator)!,
  }));
}

// エリアマッピング
export const LINE_AREA_MAP: Record<string, RegionArea> = {
  tohoku_shinkansen: 'tohoku',
  joetsu_shinkansen: 'koshinetsu',
  yamagata_shinkansen: 'tohoku',
  akita_shinkansen: 'tohoku',
  hokuriku_shinkansen: 'koshinetsu',
  yamanote: 'kanto',
  keihin_tohoku_negishi: 'kanto',
  chuo: 'kanto',
  chuo_sobu_local: 'kanto',
  saikyo: 'kanto',
  musashino: 'kanto',
  keiyo: 'kanto',
  ueno_tokyo: 'kanto',
  shonan_shinjuku: 'kanto',
  tokaido: 'kanto',
  yokosuka: 'kanto',
  sobu_rapid: 'kanto',
  utsunomiya: 'kanto',
  takasaki: 'kanto',
  ito: 'tokai',
  joban_rapid: 'kanto',
  joban_local: 'kanto',
  joban_toride_iwaki: 'tohoku',
  joban_iwaki_sendai: 'tohoku',
  yokohama: 'kanto',
  nambu: 'kanto',
  tsurumi: 'kanto',
  sotetsu_jr_direct: 'kanto',
  kawagoe: 'kanto',
  hachiko: 'kanto',
  ome: 'kanto',
  itsukaichi: 'kanto',
  sobu_main: 'kanto',
  narita: 'kanto',
  sotobo: 'kanto',
  uchibo: 'kanto',
  togane: 'kanto',
  kururi: 'kanto',
  ryomo: 'kanto',
  joetsu: 'koshinetsu',
  chuo_main: 'koshinetsu',
  shinonoi: 'koshinetsu',
  oito_east: 'koshinetsu',
  shinetsu_takasaki_yokokawa: 'koshinetsu',
  shinetsu_naoetsu_niigata: 'koshinetsu',
  hakushin: 'koshinetsu',
  uetsu_main: 'koshinetsu',
  ou_fukushima_shinjo: 'tohoku',
  ou_shinjo_omagari: 'tohoku',
  ou_omagari_akita: 'tohoku',
  ou_akita_aomori: 'tohoku',
  tadami: 'tohoku',
  banetsu_west: 'tohoku',
  banetsu_east: 'tohoku',
  tokaido_shizuoka: 'tokai',
  gotemba: 'tokai',
  oito_west: 'koshinetsu',
  ginza: 'kanto',
  marunouchi: 'kanto',
  hibiya: 'kanto',
  tozai: 'kanto',
  chiyoda: 'kanto',
  yurakucho: 'kanto',
  hanzomon: 'kanto',
  namboku: 'kanto',
  fukutoshin: 'kanto',
  tobu_skytree: 'kanto',
  tobu_isesaki: 'kanto',
  tobu_kameido: 'kanto',
  tobu_daishi: 'kanto',
  tobu_sano: 'kanto',
  tobu_koizumi: 'kanto',
  tobu_kiryu: 'kanto',
  tobu_nikko: 'kanto',
  tobu_utsunomiya: 'kanto',
  tobu_kinugawa: 'kanto',
  tobu_urban_park: 'kanto',
  tojo: 'kanto',
  ogose: 'kanto',
  seibu_ikebukuro: 'kanto',
  seibu_yurakucho: 'kanto',
  odakyu_odawara: 'kanto',
  odakyu_enoshima: 'kanto',
  odakyu_tama: 'kanto',
  tokyu_toyoko: 'kanto',
  tokyu_shin_yokohama: 'kanto',
  minatomirai: 'kanto',
  sotetsu_shin_yokohama: 'kanto',
  sotetsu_main: 'kanto',
  sotetsu_izumino: 'kanto',
  tsukuba_express: 'kanto',
  rinkai: 'kanto',
  chichibu: 'kanto',
  fujikyu: 'koshinetsu',
  izukyu: 'tokai',
  izuhakone_sunzu: 'tokai',
  yagan: 'tohoku',
  aizu: 'tohoku',
  hokuhoku: 'koshinetsu',
  myoko_haneuma: 'koshinetsu',
  nihonkai_hisui: 'koshinetsu',
  kita_shinano: 'koshinetsu',
};

export const AREA_INFO: Record<RegionArea, { name: string; icon: string }> = {
  kanto: { name: '関東（首都圏・北関東）', icon: '🗼' },
  koshinetsu: { name: '甲信越（新潟・長野・山梨）', icon: '🏔️' },
  tohoku: { name: '東北（福島・山形・秋田）', icon: '❄️' },
  tokai: { name: '東海（静岡方面）', icon: '🌊' },
};

export const AREA_DISPLAY_ORDER: RegionArea[] = ['kanto', 'koshinetsu', 'tohoku', 'tokai'];

export interface AreaLinesGroup {
  area: RegionArea;
  title: string;
  icon: string;
  lines: LineDefinition[];
}

// 運行エリアごとにグループ化した路線リストを取得
export function getLinesGroupedByArea(): AreaLinesGroup[] {
  const allLines = getAllLines();
  const map = new Map<RegionArea, LineDefinition[]>();
  for (const a of AREA_DISPLAY_ORDER) {
    map.set(a, []);
  }

  for (const line of allLines) {
    const area = line.area || LINE_AREA_MAP[line.id] || 'kanto';
    const list = map.get(area);
    if (list) {
      list.push(line);
    } else {
      map.set(area, [line]);
    }
  }

  return AREA_DISPLAY_ORDER.map((area) => ({
    area,
    title: AREA_INFO[area].name,
    icon: AREA_INFO[area].icon,
    lines: map.get(area) || [],
  }));
}


// 路線IDによる路線定義の取得
export function getLine(lineId: LineId): LineDefinition | undefined {
  return LINES_REGISTRY[lineId];
}

// 選択された路線（または全路線）の駅リストを取得（駅ID重複を除外してユニーク化）
export function getCombinedStations(selectedLineIds?: LineId[]): Station[] {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const seen = new Set<string>();
  const result: Station[] = [];
  for (const line of lines) {
    for (const st of line.stations) {
      if (!seen.has(st.id)) {
        seen.add(st.id);
        result.push(st);
      }
    }
  }
  return result;
}

// 選択された路線（または全路線）の線路セグメントを取得
export function getCombinedTrackSegments(selectedLineIds?: LineId[]): TrackSegment[] {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  return lines.flatMap((l) => l.trackSegments);
}

// 選択された路線（または全路線）の列車種別設定を取得
export function getCombinedTrainTypes(selectedLineIds?: LineId[]): Record<string, TrainTypeConfig> {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const combined: Record<string, TrainTypeConfig> = {};
  for (const line of lines) {
    for (const [key, conf] of Object.entries(line.trainTypes)) {
      // 共通キー（local 等）は先行路線（東上線の #1e1c1c 普通）を維持
      if (!combined[key]) {
        combined[key] = conf;
      }
      combined[`${line.id}_${key}`] = conf;
    }
  }
  return combined;
}

// 路線と種別キーから種別設定を取得（路線固有の設定を優先、未指定時は全登録路線から検索、カスタム種別の上書きに対応）
export function getTrainTypeConfig(
  type: string,
  lineId?: LineId,
  customTrainType?: CustomTrainTypeConfig
): TrainTypeConfig {
  let baseConfig: TrainTypeConfig | undefined;

  if (lineId && LINES_REGISTRY[lineId]) {
    baseConfig = LINES_REGISTRY[lineId].trainTypes[type];
  }

  if (!baseConfig && type === 'test_run') {
    baseConfig = {
      key: 'test_run',
      name: '試運転',
      nameEn: 'Test Run',
      shortName: '試',
      color: '#0284c7',
      textColor: '#ffffff',
      bgColor: '#0284c7',
      borderColor: '#0369a1',
    };
  }

  if (!baseConfig) {
    for (const line of getAllLines()) {
      if (line.trainTypes[type]) {
        baseConfig = line.trainTypes[type];
        break;
      }
    }
  }

  if (!baseConfig) {
    baseConfig = {
      key: type,
      name: type,
      nameEn: type,
      shortName: type.slice(0, 2),
      color: '#1e1c1c',
      textColor: '#ffffff',
      bgColor: '#1e1c1c',
      borderColor: '#4a4646',
    };
  }

  if (customTrainType && (customTrainType.name || customTrainType.color || customTrainType.shortName)) {
    const resolvedName = customTrainType.name?.trim() || baseConfig.name;
    const resolvedShort =
      customTrainType.shortName?.trim() ||
      (customTrainType.name?.trim() ? customTrainType.name.trim().slice(0, 2) : baseConfig.shortName);
    const resolvedColor = customTrainType.color || baseConfig.bgColor;
    return {
      ...baseConfig,
      name: resolvedName,
      shortName: resolvedShort,
      color: resolvedColor,
      bgColor: resolvedColor,
      borderColor: resolvedColor,
    };
  }

  return baseConfig;
}

// 選択された路線（または全路線）のダイヤ（全列車）を取得
export function getCombinedGlobalTimetable(selectedLineIds?: LineId[]): TimetableTrip[] {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  return lines.flatMap((l) => l.globalTimetable);
}

// 選択された路線（または全路線）の各駅時刻表ストアを取得
export function getCombinedStationTimetables(selectedLineIds?: LineId[]): StationTimetableStore {
  const lines = selectedLineIds && selectedLineIds.length > 0
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const combined: StationTimetableStore = {
    weekday: {},
    holiday: {},
  };

  for (const line of lines) {
    for (const day of ['weekday', 'holiday'] as const) {
      if (!line.stationTimetables[day]) continue;
      for (const [stId, tt] of Object.entries(line.stationTimetables[day])) {
        if (!combined[day][stId]) {
          combined[day][stId] = {
            inbound: [...(tt.inbound || [])],
            outbound: [...(tt.outbound || [])],
          };
        } else {
          // 境界駅（高尾等）で同一駅が存在する場合、重複なくマージして時刻順ソート
          const existing = combined[day][stId];
          const mergeDepartures = (curr: typeof existing.inbound, incoming: typeof existing.inbound) => {
            const seen = new Set(curr.map((d) => `${d.sec}_${d.d}_${d.no}`));
            for (const inc of incoming) {
              const key = `${inc.sec}_${inc.d}_${inc.no}`;
              if (!seen.has(key)) {
                curr.push(inc);
                seen.add(key);
              }
            }
            curr.sort((a, b) => a.sec - b.sec);
          };
          mergeDepartures(existing.inbound, tt.inbound || []);
          mergeDepartures(existing.outbound, tt.outbound || []);
        }
      }
    }
  }

  return combined;
}

// 選択された路線群のすべての駅をピッタリ包含するバウンディングボックスを計算
export function calculateBoundsForLines(selectedLineIds: LineId[]): [[number, number], [number, number]] {
  const stations = getCombinedStations(selectedLineIds);
  if (stations.length === 0) {
    // デフォルト（東京・埼玉広域）
    return [
      [35.60, 139.15],
      [36.15, 139.75],
    ];
  }

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const st of stations) {
    if (st.lat < minLat) minLat = st.lat;
    if (st.lat > maxLat) maxLat = st.lat;
    if (st.lng < minLng) minLng = st.lng;
    if (st.lng > maxLng) maxLng = st.lng;
  }

  // 余白パディング（約0.015度 = 約1.5km）
  const latPadding = 0.015;
  const lngPadding = 0.015;

  return [
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding],
  ];
}

// 同一駅名を持つ他路線の乗換駅候補リストを取得
export function getAlternateStations(
  station: Station | null | undefined
): { station: Station; lineName: string }[] {
  if (!station) return [];
  const results: { station: Station; lineName: string }[] = [];
  for (const line of getAllLines()) {
    if (line.id !== station.lineId) {
      const found = line.stations.find((s) => s.name === station.name);
      if (found) {
        results.push({ station: found, lineName: line.name });
      }
    }
  }
  return results;
}
