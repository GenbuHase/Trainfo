import type { TrainTypeConfig } from '../../../types';

export const YOKOSUKA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#0074be',
    textColor: '#ffffff',
    bgColor: '#0074be',
    borderColor: '#0074be',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#0074be',
    textColor: '#ffffff',
    bgColor: '#0074be',
    borderColor: '#0074be',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#d32f2f',
    textColor: '#ffffff',
    bgColor: '#d32f2f',
    borderColor: '#d32f2f',
  },
};
