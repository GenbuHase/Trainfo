import type { TrainTypeConfig } from '../../../types';

export const SHONAN_SHINJUKU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#e25822',
    textColor: '#ffffff',
    bgColor: '#e25822',
    borderColor: '#e25822',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#0073bc',
  },
  special_rapid: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '#00897b',
    textColor: '#ffffff',
    bgColor: '#00897b',
    borderColor: '#00897b',
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
