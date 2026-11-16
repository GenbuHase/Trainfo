import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const JOETSU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#00b3e6',
    textColor: '#ffffff',
    bgColor: '#00b3e6',
    borderColor: '#00b3e6',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  rapid_urban: JR_RAPID_PRESETS.URBAN,
  special_rapid: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#0073bc',
  },
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
