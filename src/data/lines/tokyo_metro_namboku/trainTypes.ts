// 東京メトロ南北線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const NAMBOKU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00ac9a',
    textColor: '#ffffff',
    bgColor: '#00ac9a',
    borderColor: '#008274',
  },
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#0067b8',
    textColor: '#ffffff',
    bgColor: '#0067b8',
    borderColor: '#004c88',
  },
};
