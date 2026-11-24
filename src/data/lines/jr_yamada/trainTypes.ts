import type { TrainTypeConfig } from '../../../types';

export const YAMADA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#a52a2a',
    textColor: '#ffffff',
    bgColor: '#a52a2a',
    borderColor: '#7f1d1d',
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
