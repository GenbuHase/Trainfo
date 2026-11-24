import type { TrainTypeConfig } from '../../../types';

export const TSUGARU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#15a2c4',
    textColor: '#ffffff',
    bgColor: '#15a2c4',
    borderColor: '#0e7490',
  },
  substitution_bus: {
    key: 'substitution_bus',
    name: '代行バス',
    nameEn: 'Rail Replacement Bus',
    shortName: '代行',
    color: '#d97706',
    textColor: '#ffffff',
    bgColor: '#d97706',
    borderColor: '#b45309',
  },
};
