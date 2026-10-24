import type { TrainTypeConfig } from '../../../types';

export const HAKUSHIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#e91e63',
    textColor: '#ffffff',
    bgColor: '#e91e63',
    borderColor: '#ad1457',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#c2185b',
    textColor: '#ffffff',
    bgColor: '#c2185b',
    borderColor: '#880e4f',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特',
    color: '#c2410c',
    textColor: '#ffffff',
    bgColor: '#c2410c',
    borderColor: '#9a3412',
  },
};
