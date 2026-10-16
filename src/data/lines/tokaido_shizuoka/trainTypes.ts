import type { TrainTypeConfig } from '../../../types';

export const TOKAIDO_SHIZUOKA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ff7322',
    textColor: '#ffffff',
    bgColor: '#ff7322',
    borderColor: '#ff7322',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#0082ba',
    textColor: '#ffffff',
    bgColor: '#0082ba',
    borderColor: '#0082ba',
  },
  homeliner: {
    key: 'homeliner',
    name: 'ホームライナー',
    nameEn: 'Home Liner',
    shortName: 'HL',
    color: '#e51721',
    textColor: '#ffffff',
    bgColor: '#e51721',
    borderColor: '#e51721',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#e51721',
    textColor: '#ffffff',
    bgColor: '#e51721',
    borderColor: '#e51721',
  },
};
