import type { TrainTypeConfig } from '../../../types';

export const ODAKYU_ENOSHIMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#2288cc',
    textColor: '#ffffff',
    bgColor: '#2288cc',
    borderColor: '#2288cc',
  },
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#ff5900',
    textColor: '#ffffff',
    bgColor: '#ff5900',
    borderColor: '#ff5900',
  },
  rapidExp: {
    key: 'rapidExp',
    name: '快速急行',
    nameEn: 'Rapid Express',
    shortName: '快急',
    color: '#f3962c',
    textColor: '#ffffff',
    bgColor: '#f3962c',
    borderColor: '#f3962c',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#dd3c00',
    textColor: '#ffffff',
    bgColor: '#dd3c00',
    borderColor: '#dd3c00',
  },
};
