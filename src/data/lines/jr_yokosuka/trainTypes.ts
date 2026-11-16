import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const YOKOSUKA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0074be',
    textColor: '#ffffff',
    bgColor: '#0074be',
    borderColor: '#0074be',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#0074be',
    textColor: '#ffffff',
    bgColor: '#0074be',
    borderColor: '#0074be',
  },
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
