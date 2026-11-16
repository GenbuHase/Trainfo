import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const ISHINOMAKI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ed77a4',
    textColor: '#ffffff',
    bgColor: '#ed77a4',
    borderColor: '#c2185b',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ed77a4',
    textColor: '#ffffff',
    bgColor: '#ed77a4',
    borderColor: '#c2185b',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
