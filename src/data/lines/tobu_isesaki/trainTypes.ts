// tobu_isesaki 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  section_semi: TOBU_PRESETS.SECTION_SEMI,
  semiExp: TOBU_PRESETS.SEMI_EXP,
  section_exp: TOBU_PRESETS.SECTION_EXP,
  express: TOBU_PRESETS.EXPRESS,
  limitedExp: TOBU_PRESETS.LIMITED_EXP,
};
