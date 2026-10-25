import type { LineId, TimetableTrip, StationTimetableStore } from '../types';
import { LINES_REGISTRY } from './linesRegistry';
import { invalidateGlobalTripMaps } from './timetableData';

export interface LineTimetableData {
  globalTimetable: TimetableTrip[];
  stationTimetables: StationTimetableStore;
}

// Vite 環境では import.meta.glob により各路線のダイヤ JSON が個別の chunk へ Code Splitting される
let globalTimetableGlob: Record<string, () => Promise<{ default: TimetableTrip[] }>> | null = null;
let stationTimetableGlob: Record<string, () => Promise<{ default: StationTimetableStore }>> | null = null;

try {
  globalTimetableGlob = import.meta.glob<{ default: TimetableTrip[] }>('./lines/*/globalTimetable.json');
  stationTimetableGlob = import.meta.glob<{ default: StationTimetableStore }>('./lines/*/stationTimetables.json');
} catch {
  // Node.js (tsx) スクリプト実行環境など import.meta.glob が未定義の場合は動的 import にフォールバック
}

/**
 * 指定された路線IDの時刻表 JSON をオンデマンドで読み込む
 */
async function loadLineTimetableData(lineId: LineId): Promise<LineTimetableData> {
  const globalPath = `./lines/${lineId}/globalTimetable.json`;
  const stationPath = `./lines/${lineId}/stationTimetables.json`;

  if (globalTimetableGlob && stationTimetableGlob) {
    const loadGlobal = globalTimetableGlob[globalPath];
    const loadStation = stationTimetableGlob[stationPath];
    if (!loadGlobal || !loadStation) {
      throw new Error(`Timetable JSON not found for line: ${lineId}`);
    }
    const [g, s] = await Promise.all([loadGlobal(), loadStation()]);
    return {
      globalTimetable: g.default as unknown as TimetableTrip[],
      stationTimetables: s.default as unknown as StationTimetableStore,
    };
  }

  // Node.js (tsx) 環境向けフォールバック
  const [g, s] = await Promise.all([
    import(/* @vite-ignore */ globalPath),
    import(/* @vite-ignore */ stationPath),
  ]);
  return {
    globalTimetable: (g.default ?? g) as unknown as TimetableTrip[],
    stationTimetables: (s.default ?? s) as unknown as StationTimetableStore,
  };
}

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
  const needed = lineIds.filter((id) => !loadedLinesSet.has(id) && Boolean(LINES_REGISTRY[id]));
  if (needed.length === 0) return;

  const promises: Promise<void>[] = [];

  for (const id of needed) {
    if (inFlightLoads.has(id)) {
      promises.push(inFlightLoads.get(id)!);
      continue;
    }

    const loadPromise = (async () => {
      try {
        const data = await loadLineTimetableData(id);
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
