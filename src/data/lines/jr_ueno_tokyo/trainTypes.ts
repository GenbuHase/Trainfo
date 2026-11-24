import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const UENO_TOKYO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#8f0079',
    textColor: '#ffffff',
    bgColor: '#8f0079',
    borderColor: '#8f0079',
  },
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
