import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const SOBU_RAPID_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#ffc20e',
    textColor: '#000000',
    bgColor: '#ffc20e',
    borderColor: '#ffc20e',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#0074be',
    textColor: '#ffffff',
    bgColor: '#0074be',
    borderColor: '#0074be',
  },
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
