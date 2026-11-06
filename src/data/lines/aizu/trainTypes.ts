// aizu 列車種別設定
import type { TrainTypeConfig } from '../../../types';
import { TOBU_PRESETS } from '../../trainTypePresets';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: TOBU_PRESETS.LOCAL,
  section_rapid: {
    key: 'section_rapid',
    name: '区間快速',
    nameEn: 'Section Rapid',
    shortName: '区快',
    color: '#008080',
    textColor: '#ffffff',
    bgColor: '#008080',
    borderColor: '#008080',
  },
  rapid: TOBU_PRESETS.RAPID,
  limitedExp: TOBU_PRESETS.LIMITED_EXP,
  aizu_ozeto: {
    key: 'aizu_ozeto',
    name: 'お座トロ展望列車',
    nameEn: 'Ozatoro',
    shortName: '展望',
    color: '#e67e22',
    textColor: '#ffffff',
    bgColor: '#e67e22',
    borderColor: '#27ae60',
  },
};
