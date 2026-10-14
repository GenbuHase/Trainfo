// 東急新横浜線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const TOKYU_SHIN_YOKOHAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: 青
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#0075c2',
    textColor: '#ffffff',
    bgColor: '#0075c2',
    borderColor: '#005a96',
  },
  // 急行: 赤
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#da0442',
    textColor: '#ffffff',
    bgColor: '#da0442',
    borderColor: '#b00335',
  },
};
