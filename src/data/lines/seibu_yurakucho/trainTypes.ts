// 西武有楽町線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { LINER_PRESETS } from '../../trainTypePresets';

export const SEIBU_YURAKUCHO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#ff6600',
    textColor: '#ffffff',
    bgColor: '#ff6600',
    borderColor: '#ff6600',
  },
  semi_exp: {
    key: 'semi_exp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: '#00cc99',
    textColor: '#ffffff',
    bgColor: '#00cc99',
    borderColor: '#00cc99',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#00ccff',
    textColor: '#ffffff',
    bgColor: '#00ccff',
    borderColor: '#00ccff',
  },
  rapid_exp: {
    key: 'rapid_exp',
    name: '快速急行',
    nameEn: 'Rapid Express',
    shortName: '快急',
    color: '#8b52a1',
    textColor: '#ffffff',
    bgColor: '#8b52a1',
    borderColor: '#8b52a1',
  },
  s_train: LINER_PRESETS.STRAIN,
};
