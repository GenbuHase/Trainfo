import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const TAZAWAKO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#9d72b0',
    textColor: '#ffffff',
    bgColor: '#9d72b0',
    borderColor: '#7e5292',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#9d72b0',
    textColor: '#ffffff',
    bgColor: '#9d72b0',
    borderColor: '#7e5292',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
