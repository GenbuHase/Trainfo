// 列車種別定義（各路線の種別を統合管理）
import type { TrainTypeConfig } from '../types';
import { getCombinedTrainTypes } from './linesRegistry';

// 全登録路線の統合種別定義（静的アクセス互換用）
export const TRAIN_TYPES: Record<string, TrainTypeConfig> = getCombinedTrainTypes();

// 路線ID指定で種別定義を取得するヘルパー関数
export function getTrainTypes(selectedLineIds?: string[]): Record<string, TrainTypeConfig> {
  return getCombinedTrainTypes(selectedLineIds);
}
