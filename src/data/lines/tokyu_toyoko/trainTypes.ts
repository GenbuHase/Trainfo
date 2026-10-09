// 東急東横線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const TOKYU_TOYOKO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  // 通勤特急: オレンジ
  commuter_ltd_exp: {
    key: 'commuter_ltd_exp',
    name: '通勤特急',
    nameEn: 'Commuter Ltd. Exp.',
    shortName: '通特',
    color: '#ea5504',
    textColor: '#ffffff',
    bgColor: '#ea5504',
    borderColor: '#c44400',
  },
  // 特急 (Fライナー含む): オレンジ
  ltd_exp: {
    key: 'ltd_exp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#ea5504',
    textColor: '#ffffff',
    bgColor: '#ea5504',
    borderColor: '#c44400',
  },
  // S-TRAIN: ライムグリーン
  strain: {
    key: 'strain',
    name: 'S-TRAIN',
    nameEn: 'S-TRAIN',
    shortName: 'S',
    color: '#b4c300',
    textColor: '#ffffff',
    bgColor: '#b4c300',
    borderColor: '#8f9b00',
  },
};
