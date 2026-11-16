// 東京メトロ半蔵門線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const HANZOMON_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#9b7cb6',
    textColor: '#ffffff',
    bgColor: '#9b7cb6',
    borderColor: '#785694',
  },
  semiExp: {
    key: 'semiExp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: '#3cb371',
    textColor: '#ffffff',
    bgColor: '#3cb371',
    borderColor: '#2e8b57',
  },
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#e05a00',
    textColor: '#ffffff',
    bgColor: '#e05a00',
    borderColor: '#b84900',
  },
};
