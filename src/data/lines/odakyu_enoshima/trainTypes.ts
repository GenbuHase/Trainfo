import type { TrainTypeConfig } from '../../../types';
import { ODAKYU_PRESETS } from '../../trainTypePresets';

export const ODAKYU_ENOSHIMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: ODAKYU_PRESETS.LOCAL,
  express: ODAKYU_PRESETS.EXPRESS,
  rapidExp: ODAKYU_PRESETS.RAPID_EXP,
  limitedExp: ODAKYU_PRESETS.LIMITED_EXP,
};
