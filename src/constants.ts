// Trainfo システム全体設定・定数定義

/**
 * 列車走行アニメーション・シミュレーション時刻のリフレッシュレート設定
 *
 * - SIMULATION_FPS: 1秒あたりの目標更新頻度（フレームレート）
 *   - 10: 約100msごとに更新（デフォルト・軽量で低負荷）
 *   - 20: 約50msごとに更新（より滑らか）
 *   - 30: 約33msごとに更新（非常に滑らか）
 *   - 60: 約16.7msごとに更新（高精細・ディスプレイ同期）
 */
export const SIMULATION_FPS = 10;

/** 1フレームあたりの更新間隔（秒） */
export const SIMULATION_TICK_INTERVAL_SEC = 1 / SIMULATION_FPS;

/** 1フレームあたりの更新間隔（ミリ秒） */
export const SIMULATION_TICK_INTERVAL_MS = 1000 / SIMULATION_FPS;
