import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const TSUGARU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#15a2c4',
    textColor: '#ffffff',
    bgColor: '#15a2c4',
    borderColor: '#0e7490',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#15a2c4',
    textColor: '#ffffff',
    bgColor: '#15a2c4',
    borderColor: '#0e7490',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
  substitution_bus: {
    key: 'substitution_bus',
    name: '代行バス',
    nameEn: 'Rail Replacement Bus',
    shortName: '代行',
    color: '#d97706',
    textColor: '#ffffff',
    bgColor: '#d97706',
    borderColor: '#b45309',
  },
};
