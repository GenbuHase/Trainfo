import type { TrainTypeConfig } from '../../../types';

export const SHINETSU_TAKASAKI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#73c11d',
    textColor: '#ffffff',
    bgColor: '#73c11d',
    borderColor: '#5aa114',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#007ac1',
    textColor: '#ffffff',
    bgColor: '#007ac1',
    borderColor: '#005f99',
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
