import type { TrainTypeConfig } from '../../../types';

export const KESENNUMA_BRT_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  brt: {
    key: 'brt',
    name: 'BRT',
    nameEn: 'BRT',
    shortName: 'BRT',
    color: '#7c3aed',
    textColor: '#ffffff',
    bgColor: '#7c3aed',
    borderColor: '#5b21b6',
  },
  rapid: {
    key: 'rapid',
    name: 'BRT快速',
    nameEn: 'BRT Rapid',
    shortName: 'BRT快速',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#005a94',
  },
};
