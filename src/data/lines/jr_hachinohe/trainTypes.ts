import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const HACHINOHE_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ff0000',
    textColor: '#ffffff',
    bgColor: '#ff0000',
    borderColor: '#b91c1c',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ff0000',
    textColor: '#ffffff',
    bgColor: '#ff0000',
    borderColor: '#b91c1c',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
