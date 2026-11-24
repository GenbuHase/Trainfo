import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const ATERAZAWA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0072ba',
    textColor: '#ffffff',
    bgColor: '#0072ba',
    borderColor: '#2e7d32',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0072ba',
    textColor: '#ffffff',
    bgColor: '#0072ba',
    borderColor: '#2e7d32',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
