// JR五日市線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { CHUO_PRESETS } from '../../trainTypePresets';

export const ITSUKAICHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: グレー
  local: CHUO_PRESETS.LOCAL,
  // 特急: ワインレッド
  limited_exp: CHUO_PRESETS.LIMITED_EXP,
};
