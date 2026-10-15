import type { TrainTypeConfig } from '../../../types';

export const TOKAIDO_SHIZUOKA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#808080',
    textColor: '#ffffff',
    bgColor: '#808080',
    borderColor: '#808080',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#f68b1e',
    textColor: '#ffffff',
    bgColor: '#f68b1e',
    borderColor: '#f68b1e',
  },
  homeliner: {
    key: 'homeliner',
    name: 'ホームライナー',
    nameEn: 'Home Liner',
    shortName: 'HL',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#0073bc',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#e60012',
  },
};
