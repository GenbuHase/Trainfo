import type { TrainTypeConfig } from '../../../types';

export const TADAMI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#006699',
    textColor: '#ffffff',
    bgColor: '#006699',
    borderColor: '#006699',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#0081b8',
    textColor: '#ffffff',
    bgColor: '#0081b8',
    borderColor: '#006591',
  },
};
