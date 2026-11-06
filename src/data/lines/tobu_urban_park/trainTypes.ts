// tobu_urban_park 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  section_exp: TOBU_PRESETS.SECTION_EXP,
  express: TOBU_PRESETS.EXPRESS,
};
