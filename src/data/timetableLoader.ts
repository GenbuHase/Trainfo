import type { LineId, TimetableTrip, StationTimetableStore } from '../types';
import { LINES_REGISTRY } from './linesRegistry';
import { invalidateGlobalTripMaps } from './timetableData';

export interface LineTimetableData {
  globalTimetable: TimetableTrip[];
  stationTimetables: StationTimetableStore;
}

// 各路線の JSON アセット URL をオンデマンドで取得する辞書（JSON 全文の JS トランスパイルを完全回避）
let globalTimetableUrls: Record<string, () => Promise<string>> | null = null;
let stationTimetableUrls: Record<string, () => Promise<string>> | null = null;

try {
  globalTimetableUrls = import.meta.glob<string>('./lines/*/globalTimetable.json', {
    query: '?url',
    import: 'default',
  });
  stationTimetableUrls = import.meta.glob<string>('./lines/*/stationTimetables.json', {
    query: '?url',
    import: 'default',
  });
} catch {
  // Node.js (tsx) スクリプト実行環境など import.meta.glob が未定義の場合は fs にフォールバック
}

/**
 * 指定された路線IDの時刻表 JSON をオンデマンドで読み込む
 */
async function loadLineTimetableData(lineId: LineId): Promise<LineTimetableData> {
  const gKey = `./lines/${lineId}/globalTimetable.json`;
  const sKey = `./lines/${lineId}/stationTimetables.json`;

  if (globalTimetableUrls && stationTimetableUrls && globalTimetableUrls[gKey] && stationTimetableUrls[sKey]) {
    const [gUrl, sUrl] = await Promise.all([
      globalTimetableUrls[gKey](),
      stationTimetableUrls[sKey](),
    ]);

    const [gRes, sRes] = await Promise.all([
      fetch(gUrl),
      fetch(sUrl),
    ]);

    if (!gRes.ok || !sRes.ok) {
      throw new Error(`Failed to fetch timetable JSON for line ${lineId}: ${gRes.status} / ${sRes.status}`);
    }

    const [globalTimetable, stationTimetables] = await Promise.all([
      gRes.json() as Promise<TimetableTrip[]>,
      sRes.json() as Promise<StationTimetableStore>,
    ]);

    return { globalTimetable, stationTimetables };
  }

  // Node.js (tsx) 環境向けフォールバック: fs で直接読み込む
  const dynamicFs = 'fs/promises';
  const dynamicPath = 'path';
  const fs: any = await import(/* @vite-ignore */ dynamicFs);
  const path: any = await import(/* @vite-ignore */ dynamicPath);
  const proc = (globalThis as unknown as { process?: { cwd: () => string } }).process;
  const cwd = proc ? proc.cwd() : '.';
  const dir = path.resolve(cwd, `src/data/lines/${lineId}`);
  const [gRaw, sRaw] = await Promise.all([
    fs.readFile(path.join(dir, 'globalTimetable.json'), 'utf-8'),
    fs.readFile(path.join(dir, 'stationTimetables.json'), 'utf-8'),
  ]);
  return {
    globalTimetable: JSON.parse(gRaw),
    stationTimetables: JSON.parse(sRaw),
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
 * 指定路線がすでにロード済みかどうか
 */
export function isLineLoaded(lineId: LineId): boolean {
  return loadedLinesSet.has(lineId);
}

/**
 * 指定路線群がすべてロード済みかどうか
 */
export function areAllLinesLoaded(lineIds: LineId[]): boolean {
  return lineIds.every((id) => loadedLinesSet.has(id));
}

/**
 * 現在ロード済みの全路線ID配列
 */
export function getLoadedLineIds(): LineId[] {
  return Array.from(loadedLinesSet) as LineId[];
}
