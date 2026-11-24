import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const AKITA_NAIRIKU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#16a34a',
    textColor: '#ffffff',
    bgColor: '#16a34a',
    borderColor: '#ea5504',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#16a34a',
    textColor: '#ffffff',
    bgColor: '#16a34a',
    borderColor: '#ea5504',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#ea5504',
    textColor: '#ffffff',
    bgColor: '#ea5504',
    borderColor: '#c2410c',
  },
};
