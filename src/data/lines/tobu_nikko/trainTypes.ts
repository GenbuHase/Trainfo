// tobu_nikko 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  express: TOBU_PRESETS.EXPRESS,
  limited_exp: TOBU_PRESETS.LIMITED_EXP,
};
