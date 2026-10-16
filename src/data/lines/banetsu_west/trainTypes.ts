import type { TrainTypeConfig } from '../../../types';

export const BANETSU_WEST_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#bc6e23',
    textColor: '#ffffff',
    bgColor: '#bc6e23',
    borderColor: '#98581c',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#c53030',
    textColor: '#ffffff',
    bgColor: '#c53030',
    borderColor: '#9b2c2c',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特',
    color: '#b91c1c',
    textColor: '#ffffff',
    bgColor: '#b91c1c',
    borderColor: '#7f1d1d',
  },
};
