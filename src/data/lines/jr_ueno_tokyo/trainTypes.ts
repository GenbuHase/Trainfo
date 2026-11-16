import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const UENO_TOKYO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#8f0079',
    textColor: '#ffffff',
    bgColor: '#8f0079',
    borderColor: '#8f0079',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  special_rapid: JR_RAPID_PRESETS.SPECIAL_RAPID,
  commuter_rapid: JR_RAPID_PRESETS.COMMUTER_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
