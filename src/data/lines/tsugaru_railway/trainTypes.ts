import type { TrainTypeConfig } from '../../../types';

export const TSUGARU_RAILWAY_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ea5504',
    textColor: '#ffffff',
    bgColor: '#ea5504',
    borderColor: '#b45309',
  },
  semi_exp: {
    key: 'semi_exp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: '#d97706',
    textColor: '#ffffff',
    bgColor: '#d97706',
    borderColor: '#b45309',
  },
};
