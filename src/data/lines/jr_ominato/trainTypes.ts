import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const OMINATO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ffd700',
    textColor: '#1e293b',
    bgColor: '#ffd700',
    borderColor: '#ca8a04',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ffd700',
    textColor: '#1e293b',
    bgColor: '#ffd700',
    borderColor: '#ca8a04',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
