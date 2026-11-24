import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const KONAN_OWANI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#d70a19',
    textColor: '#ffffff',
    bgColor: '#d70a19',
    borderColor: '#16a34a',
  },
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#d70a19',
    textColor: '#ffffff',
    bgColor: '#d70a19',
    borderColor: '#16a34a',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  limited_exp: LIMITED_EXP_PRESETS.STANDARD,
};
