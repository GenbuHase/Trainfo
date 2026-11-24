// tobu_isesaki 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { LINER_PRESETS, TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  limited_exp: TOBU_PRESETS.LIMITED_EXP,
  th_liner: LINER_PRESETS.TH_LINER,
};
