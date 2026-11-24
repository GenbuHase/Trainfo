import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS } from '../../trainTypePresets';

export const SENSEKI_TOHOKU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
};
