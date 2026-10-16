import type { TrainTypeConfig, TrainTypeKey } from '../../../types';

export const NIHONKAI_HISUI_TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#009bb3',
    textColor: '#ffffff',
    bgColor: '#009bb3',
    borderColor: '#008375',
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
