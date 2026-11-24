import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const TOKAIDO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#f68b1e',
    textColor: '#ffffff',
    bgColor: '#f68b1e',
    borderColor: '#f68b1e',
  },
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
