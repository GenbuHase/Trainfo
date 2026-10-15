import type { LineId, TimetableTrip, StationTimetableStore } from '../types';
import { LINES_REGISTRY } from './linesRegistry';
import { invalidateGlobalTripMaps } from './timetableData';


export interface LineTimetableData {
  globalTimetable: TimetableTrip[];
  stationTimetables: StationTimetableStore;
}

type LoaderFn = () => Promise<LineTimetableData>;

// 各路線のダイヤJSON動的インポートマップ（Viteにより個別のchunkへCode Splittingされる）
const TIMETABLE_LOADERS: Record<string, LoaderFn> = {
  tojo: () =>
    Promise.all([
      import('./lines/tojo/globalTimetable.json'),
      import('./lines/tojo/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  ogose: () =>
    Promise.all([
      import('./lines/ogose/globalTimetable.json'),
      import('./lines/ogose/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  saikyo: () =>
    Promise.all([
      import('./lines/saikyo/globalTimetable.json'),
      import('./lines/saikyo/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  kawagoe: () =>
    Promise.all([
      import('./lines/kawagoe/globalTimetable.json'),
      import('./lines/kawagoe/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  rinkai: () =>
    Promise.all([
      import('./lines/rinkai/globalTimetable.json'),
      import('./lines/rinkai/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  yurakucho: () =>
    Promise.all([
      import('./lines/yurakucho/globalTimetable.json'),
      import('./lines/yurakucho/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  fukutoshin: () =>
    Promise.all([
      import('./lines/fukutoshin/globalTimetable.json'),
      import('./lines/fukutoshin/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  seibu_ikebukuro: () =>
    Promise.all([
      import('./lines/seibu_ikebukuro/globalTimetable.json'),
      import('./lines/seibu_ikebukuro/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  seibu_yurakucho: () =>
    Promise.all([
      import('./lines/seibu_yurakucho/globalTimetable.json'),
      import('./lines/seibu_yurakucho/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  tokyu_toyoko: () =>
    Promise.all([
      import('./lines/tokyu_toyoko/globalTimetable.json'),
      import('./lines/tokyu_toyoko/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  minatomirai: () =>
    Promise.all([
      import('./lines/minatomirai/globalTimetable.json'),
      import('./lines/minatomirai/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  tokyu_shin_yokohama: () =>
    Promise.all([
      import('./lines/tokyu_shin_yokohama/globalTimetable.json'),
      import('./lines/tokyu_shin_yokohama/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  sotetsu_shin_yokohama: () =>
    Promise.all([
      import('./lines/sotetsu_shin_yokohama/globalTimetable.json'),
      import('./lines/sotetsu_shin_yokohama/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  sotetsu_main: () =>
    Promise.all([
      import('./lines/sotetsu_main/globalTimetable.json'),
      import('./lines/sotetsu_main/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  sotetsu_izumino: () =>
    Promise.all([
      import('./lines/sotetsu_izumino/globalTimetable.json'),
      import('./lines/sotetsu_izumino/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  sotetsu_jr_direct: () =>
    Promise.all([
      import('./lines/sotetsu_jr_direct/globalTimetable.json'),
      import('./lines/sotetsu_jr_direct/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  hachiko: () =>
    Promise.all([
      import('./lines/hachiko/globalTimetable.json'),
      import('./lines/hachiko/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  musashino: () =>
    Promise.all([
      import('./lines/musashino/globalTimetable.json'),
      import('./lines/musashino/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  tsukuba_express: () =>
    Promise.all([
      import('./lines/tsukuba_express/globalTimetable.json'),
      import('./lines/tsukuba_express/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  chuo: () =>
    Promise.all([
      import('./lines/chuo/globalTimetable.json'),
      import('./lines/chuo/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  chuo_main: () =>
    Promise.all([
      import('./lines/chuo_main/globalTimetable.json'),
      import('./lines/chuo_main/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  ome: () =>
    Promise.all([
      import('./lines/ome/globalTimetable.json'),
      import('./lines/ome/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  itsukaichi: () =>
    Promise.all([
      import('./lines/itsukaichi/globalTimetable.json'),
      import('./lines/itsukaichi/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  chichibu: () =>
    Promise.all([
      import('./lines/chichibu/globalTimetable.json'),
      import('./lines/chichibu/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  shinonoi: () =>
    Promise.all([
      import('./lines/shinonoi/globalTimetable.json'),
      import('./lines/shinonoi/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  oito_east: () =>
    Promise.all([
      import('./lines/oito_east/globalTimetable.json'),
      import('./lines/oito_east/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  oito_west: () =>
    Promise.all([
      import('./lines/oito_west/globalTimetable.json'),
      import('./lines/oito_west/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  odakyu_odawara: () =>
    Promise.all([
      import('./lines/odakyu_odawara/globalTimetable.json'),
      import('./lines/odakyu_odawara/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  odakyu_enoshima: () =>
    Promise.all([
      import('./lines/odakyu_enoshima/globalTimetable.json'),
      import('./lines/odakyu_enoshima/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  odakyu_tama: () =>
    Promise.all([
      import('./lines/odakyu_tama/globalTimetable.json'),
      import('./lines/odakyu_tama/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  chiyoda: () =>
    Promise.all([
      import('./lines/chiyoda/globalTimetable.json'),
      import('./lines/chiyoda/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  joban_local: () =>
    Promise.all([
      import('./lines/joban_local/globalTimetable.json'),
      import('./lines/joban_local/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  joban_rapid: () =>
    Promise.all([
      import('./lines/joban_rapid/globalTimetable.json'),
      import('./lines/joban_rapid/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  joban_toride_iwaki: () =>
    Promise.all([
      import('./lines/joban_toride_iwaki/globalTimetable.json'),
      import('./lines/joban_toride_iwaki/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  joban_iwaki_sendai: () =>
    Promise.all([
      import('./lines/joban_iwaki_sendai/globalTimetable.json'),
      import('./lines/joban_iwaki_sendai/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  tohoku_shinkansen: () =>
    Promise.all([
      import('./lines/tohoku_shinkansen/globalTimetable.json'),
      import('./lines/tohoku_shinkansen/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  joetsu_shinkansen: () =>
    Promise.all([
      import('./lines/joetsu_shinkansen/globalTimetable.json'),
      import('./lines/joetsu_shinkansen/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  tokaido: () =>
    Promise.all([
      import('./lines/tokaido/globalTimetable.json'),
      import('./lines/tokaido/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  ito: () =>
    Promise.all([
      import('./lines/ito/globalTimetable.json'),
      import('./lines/ito/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  yokosuka: () =>
    Promise.all([
      import('./lines/yokosuka/globalTimetable.json'),
      import('./lines/yokosuka/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  sobu_rapid: () =>
    Promise.all([
      import('./lines/sobu_rapid/globalTimetable.json'),
      import('./lines/sobu_rapid/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  utsunomiya: () =>
    Promise.all([
      import('./lines/utsunomiya/globalTimetable.json'),
      import('./lines/utsunomiya/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  takasaki: () =>
    Promise.all([
      import('./lines/takasaki/globalTimetable.json'),
      import('./lines/takasaki/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  shonan_shinjuku: () =>
    Promise.all([
      import('./lines/shonan_shinjuku/globalTimetable.json'),
      import('./lines/shonan_shinjuku/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
  ueno_tokyo: () =>
    Promise.all([
      import('./lines/ueno_tokyo/globalTimetable.json'),
      import('./lines/ueno_tokyo/stationTimetables.json'),
    ]).then(([g, s]) => ({
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    })),
};


// ロード済み路線のIDセット
const loadedLinesSet = new Set<string>();

// 進行中のロード Promise キャッシュ（重複ロード防止）
const inFlightLoads = new Map<string, Promise<void>>();

// リスナー通知（ロード完了時に購読元へ通知）
type LoadListener = (loadedLineIds: string[]) => void;
const listeners = new Set<LoadListener>();

export function subscribeTimetableLoad(listener: LoadListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {

  invalidateGlobalTripMaps();
  const arr = Array.from(loadedLinesSet);
  listeners.forEach((fn) => fn(arr));
}


/**
 * 指定された路線群の時刻表データを非同期・オンデマンドでロード
 */
export async function loadLinesTimetables(lineIds: LineId[]): Promise<void> {
  const needed = lineIds.filter((id) => !loadedLinesSet.has(id) && TIMETABLE_LOADERS[id]);
  if (needed.length === 0) return;

  const promises: Promise<void>[] = [];

  for (const id of needed) {
    if (inFlightLoads.has(id)) {
      promises.push(inFlightLoads.get(id)!);
      continue;
    }

    const loadPromise = (async () => {
      try {
        const loader = TIMETABLE_LOADERS[id];
        const data = await loader();
        const line = LINES_REGISTRY[id];
        if (line) {
          line.globalTimetable = data.globalTimetable;
          line.stationTimetables = data.stationTimetables;
        }
        loadedLinesSet.add(id);
      } catch (err) {
        console.error(`[TimetableLoader] Failed to load timetable for line ${id}:`, err);
      } finally {
        inFlightLoads.delete(id);
      }
    })();

    inFlightLoads.set(id, loadPromise);
    promises.push(loadPromise);
  }

  await Promise.all(promises);
  notifyListeners();
}

/**
 * 特定の路線がロード済みか確認
 */
export function isLineLoaded(lineId: LineId): boolean {
  return loadedLinesSet.has(lineId);
}

/**
 * 指定した路線群がすべてロード済みか確認
 */
export function areAllLinesLoaded(lineIds: LineId[]): boolean {
  return lineIds.every((id) => loadedLinesSet.has(id));
}

/**
 * ロード済みの路線ID配列を取得
 */
export function getLoadedLineIds(): string[] {
  return Array.from(loadedLinesSet);
}
