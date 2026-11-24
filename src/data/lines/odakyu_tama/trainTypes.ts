import type { TrainTypeConfig } from '../../../types';
import { ODAKYU_PRESETS } from '../../trainTypePresets';

export const ODAKYU_TAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: ODAKYU_PRESETS.LOCAL,
  express: ODAKYU_PRESETS.EXPRESS,
  commuter_exp: ODAKYU_PRESETS.COMMUTER_EXP,
  rapid_exp: ODAKYU_PRESETS.RAPID_EXP,
};
