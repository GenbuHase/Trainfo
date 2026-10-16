import type { TrainTypeConfig, TrainTypeKey } from '../../../types';

export const MYOKO_HANEUMA_TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#8cc63f',
    textColor: '#ffffff',
    bgColor: '#8cc63f',
    borderColor: '#78b928',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#008000',
    textColor: '#ffffff',
    bgColor: '#008000',
    borderColor: '#006600',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急しらゆき',
    nameEn: 'Ltd Exp Shirayuki',
    shortName: '特急',
    color: '#e66b00',
    textColor: '#ffffff',
    bgColor: '#e66b00',
    borderColor: '#cc5500',
  },
} as Record<TrainTypeKey, TrainTypeConfig>;
