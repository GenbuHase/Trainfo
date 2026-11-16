import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

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
  rapid: JR_RAPID_PRESETS.STANDARD,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
