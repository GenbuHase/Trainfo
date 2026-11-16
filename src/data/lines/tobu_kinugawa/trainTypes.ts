// tobu_kinugawa 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  rapid: TOBU_PRESETS.RAPID,
  section_rapid: {
    ...TOBU_PRESETS.RAPID,
    key: 'section_rapid',
    name: '区間快速',
    nameEn: 'Section Rapid',
    shortName: '区快',
  },
  limitedExp: TOBU_PRESETS.LIMITED_EXP,
  sl_taiju: TOBU_PRESETS.SL_TAIJU,
};
