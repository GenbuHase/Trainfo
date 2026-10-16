// 東急東横線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const TOKYU_TOYOKO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: 青
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#1359a9',
    textColor: '#ffffff',
    bgColor: '#1359a9',
    borderColor: '#1359a9',
  },
  // 急行: 赤
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#ef3123',
    textColor: '#ffffff',
    bgColor: '#ef3123',
    borderColor: '#ef3123',
  },
  // 通勤特急: オレンジ
  commuter_ltd_exp: {
    key: 'commuter_ltd_exp',
    name: '通勤特急',
    nameEn: 'Commuter Ltd. Exp.',
    shortName: '通特',
    color: '#f7931d',
    textColor: '#ffffff',
    bgColor: '#f7931d',
    borderColor: '#f7931d',
  },
  // 特急 (Fライナー含む): オレンジ
  ltd_exp: {
    key: 'ltd_exp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#f7931d',
    textColor: '#ffffff',
    bgColor: '#f7931d',
    borderColor: '#f7931d',
  },
  // S-TRAIN: ライムグリーン
  strain: {
    key: 'strain',
    name: 'S-TRAIN',
    nameEn: 'S-TRAIN',
    shortName: 'S',
    color: '#99cc00',
    textColor: '#ffffff',
    bgColor: '#99cc00',
    borderColor: '#99cc00',
  },
};
