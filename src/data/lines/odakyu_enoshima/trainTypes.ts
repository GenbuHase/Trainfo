import type { TrainTypeConfig } from '../../../types';

export const ODAKYU_ENOSHIMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#0065af',
    textColor: '#ffffff',
    bgColor: '#0065af',
    borderColor: '#004c85',
  },
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
  rapidExp: {
    key: 'rapidExp',
    name: '快速急行',
    nameEn: 'Rapid Express',
    shortName: '快急',
    color: '#f39800',
    textColor: '#ffffff',
    bgColor: '#f39800',
    borderColor: '#b87300',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急ロマンスカー',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#c2185b',
    textColor: '#ffffff',
    bgColor: '#c2185b',
    borderColor: '#880e4f',
  },
};
