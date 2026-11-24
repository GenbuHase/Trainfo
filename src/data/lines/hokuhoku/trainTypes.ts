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
} as Record<TrainTypeKey, TrainTypeConfig>;
