import type { TrainTypeConfig, TrainTypeKey } from '../../../types';

export const HOKUHOKU_TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#005bac',
    textColor: '#ffffff',
    bgColor: '#005bac',
    borderColor: '#004080',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b3000e',
  },
} as Record<TrainTypeKey, TrainTypeConfig>;
