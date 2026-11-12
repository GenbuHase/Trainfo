import type { TrainTypeConfig } from '../../../types';

export const OFUNATO_BRT_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  brt: {
    key: 'brt',
    name: 'BRT',
    nameEn: 'BRT',
    shortName: 'BRT',
    color: '#ea580c',
    textColor: '#ffffff',
    bgColor: '#ea580c',
    borderColor: '#c2410c',
  },
  rapid: {
    key: 'rapid',
    name: 'BRT快速',
    nameEn: 'BRT Rapid',
    shortName: 'BRT快',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#005a94',
  },
  regular: {
    key: 'regular',
    name: 'BRT',
    nameEn: 'BRT',
    shortName: 'BRT',
    color: '#ea580c',
    textColor: '#ffffff',
    bgColor: '#ea580c',
    borderColor: '#c2410c',
  },
};
