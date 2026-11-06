import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const TAKASAKI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#f68b1e',
    textColor: '#ffffff',
    bgColor: '#f68b1e',
    borderColor: '#f68b1e',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
  rapid_urban: JR_RAPID_PRESETS.URBAN,
  commuter_rapid: JR_RAPID_PRESETS.COMMUTER_RAPID,
  special_rapid: JR_RAPID_PRESETS.JOBAN_SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
