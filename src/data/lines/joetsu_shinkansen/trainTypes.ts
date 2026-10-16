import type { TrainTypeConfig, TrainTypeKey } from '../../../types';

export const JOETSU_SHINKANSEN_TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  toki: {
    key: 'toki',
    name: 'とき',
    nameEn: 'Toki',
    shortName: 'とき',
    color: '#f58d79',
    textColor: '#ffffff',
    bgColor: '#f58d79',
    borderColor: '#f58d79',
  },
  tanigawa: {
    key: 'tanigawa',
    name: 'たにがわ',
    nameEn: 'Tanigawa',
    shortName: 'たにがわ',
    color: '#f58d79',
    textColor: '#ffffff',
    bgColor: '#f58d79',
    borderColor: '#f58d79',
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
