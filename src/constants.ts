// Trainfo システム全体設定・定数定義

/** 選択可能なFPS（リフレッシュレート）一覧 */
export const AVAILABLE_SIMULATION_FPS = [10, 20, 30, 60, 120] as const;
export type SimulationFps = typeof AVAILABLE_SIMULATION_FPS[number];

/** デフォルトのシミュレーション目標FPS */
export const DEFAULT_SIMULATION_FPS: SimulationFps = 10;

/** 互換用定数 */
export const SIMULATION_FPS = DEFAULT_SIMULATION_FPS;
export const SIMULATION_TICK_INTERVAL_SEC = 1 / DEFAULT_SIMULATION_FPS;
export const SIMULATION_TICK_INTERVAL_MS = 1000 / DEFAULT_SIMULATION_FPS;

const STORAGE_KEY_FPS = 'trainfo_simulation_fps';

/**
 * 保存されたシミュレーションFPSをロード
 */
export function loadSimulationFps(): SimulationFps {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_FPS);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (AVAILABLE_SIMULATION_FPS.includes(parsed as SimulationFps)) {
        return parsed as SimulationFps;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_SIMULATION_FPS;
}

/**
 * シミュレーションFPSを保存
 */
export function saveSimulationFps(fps: SimulationFps): void {
  try {
    localStorage.setItem(STORAGE_KEY_FPS, fps.toString());
  } catch {
    // ignore
  }
}
