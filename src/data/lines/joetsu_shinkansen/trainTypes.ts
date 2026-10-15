import type { TrainTypeConfig, TrainTypeKey } from '../../../types';

export const JOETSU_SHINKANSEN_TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  toki: {
    key: 'toki',
    name: 'とき',
    nameEn: 'Toki',
    shortName: 'とき',
    color: '#e05a47',
    textColor: '#ffffff',
    bgColor: '#e05a47',
    borderColor: '#b33624',
  },
  tanigawa: {
    key: 'tanigawa',
    name: 'たにがわ',
    nameEn: 'Tanigawa',
    shortName: 'たにがわ',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#004e80',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Exp',
    shortName: '特急',
    color: '#c9252d',
    textColor: '#ffffff',
    bgColor: '#c9252d',
    borderColor: '#991b1b',
  },
} as Record<TrainTypeKey, TrainTypeConfig>;
