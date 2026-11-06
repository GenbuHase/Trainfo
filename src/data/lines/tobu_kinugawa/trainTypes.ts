// tobu_kinugawa 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  rapid: TOBU_PRESETS.RAPID,
  limitedExp: TOBU_PRESETS.LIMITED_EXP,
  sl_taiju: TOBU_PRESETS.SL_TAIJU,
};
