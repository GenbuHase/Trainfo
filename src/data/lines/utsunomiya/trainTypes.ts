import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const UTSUNOMIYA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  rapid_rabbit: JR_RAPID_PRESETS.RABBIT,
  commuter_rapid: JR_RAPID_PRESETS.COMMUTER_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.STANDARD,
};
