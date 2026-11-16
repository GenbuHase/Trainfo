import type { TrainTypeConfig, TrainTypeKey } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

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
    shortName: '快速',
    color: '#008000',
    textColor: '#ffffff',
    bgColor: '#008000',
    borderColor: '#006600',
  },
  limitedExp: LIMITED_EXP_PRESETS.NIIGATA,
} as Record<TrainTypeKey, TrainTypeConfig>;
