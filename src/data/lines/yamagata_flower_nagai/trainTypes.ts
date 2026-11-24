import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const YAMAGATA_FLOWER_NAGAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#e85298',
    textColor: '#ffffff',
    bgColor: '#e85298',
    borderColor: '#07c63e',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#e85298',
    textColor: '#ffffff',
    bgColor: '#e85298',
    borderColor: '#07c63e',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
