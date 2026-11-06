import type { TrainTypeConfig } from '../../../types';

export const JR_KYOTO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#475569',
    textColor: '#ffffff',
    bgColor: '#475569',
    borderColor: '#334155',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#ff7322',
    textColor: '#ffffff',
    bgColor: '#ff7322',
    borderColor: '#e05a0b',
  },
  special_rapid: {
    key: 'special_rapid',
    name: '新快速',
    nameEn: 'Special Rapid',
    shortName: '新快',
    color: '#0072bc',
    textColor: '#ffffff',
    bgColor: '#0072bc',
    borderColor: '#005a96',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#d32f2f',
    textColor: '#ffffff',
    bgColor: '#d32f2f',
    borderColor: '#b71c1c',
  },
};
