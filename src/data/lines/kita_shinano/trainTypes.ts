import type { TrainTypeConfig, TrainTypeKey } from '../../../types';

export const KITA_SHINANO_TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#c8102e',
    textColor: '#ffffff',
    bgColor: '#c8102e',
    borderColor: '#a6192e',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#0066cc',
    textColor: '#ffffff',
    bgColor: '#0066cc',
    borderColor: '#004c99',
  },
} as Record<TrainTypeKey, TrainTypeConfig>;
