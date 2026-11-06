import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const SHINETSU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#00acd1',
    textColor: '#ffffff',
    bgColor: '#00acd1',
    borderColor: '#008ba8',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#007ac1',
    textColor: '#ffffff',
    bgColor: '#007ac1',
    borderColor: '#005f99',
  },
  limitedExp: LIMITED_EXP_PRESETS.NIIGATA,
};
