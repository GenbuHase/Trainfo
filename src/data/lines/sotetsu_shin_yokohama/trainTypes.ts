// 相鉄新横浜線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { SOTETSU_PRESETS } from '../../trainTypePresets';

export const SOTETSU_SHIN_YOKOHAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: 濃紺/グレー
  local: SOTETSU_PRESETS.LOCAL,
  // 通勤特急: ピンク/マゼンタ
  commuter_limited_exp: SOTETSU_PRESETS.COMMUTER_LTD_EXP,
  // 特急: オレンジ
  limited_exp: SOTETSU_PRESETS.LIMITED_EXP,
};
