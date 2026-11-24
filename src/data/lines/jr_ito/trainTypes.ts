import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const ITO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#378640',
    textColor: '#ffffff',
    bgColor: '#378640',
    borderColor: '#378640',
  },
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
