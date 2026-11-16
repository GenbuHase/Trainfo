// 東武越生線 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 普通: #1e1c1c (各駅停車)
  local: TOBU_PRESETS.LOCAL,
};
