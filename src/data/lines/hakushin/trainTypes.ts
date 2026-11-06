import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const HAKUSHIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#e91e63',
    textColor: '#ffffff',
    bgColor: '#e91e63',
    borderColor: '#ad1457',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#c2185b',
    textColor: '#ffffff',
    bgColor: '#c2185b',
    borderColor: '#880e4f',
  },
  limitedExp: LIMITED_EXP_PRESETS.NIIGATA,
};
