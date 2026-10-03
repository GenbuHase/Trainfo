// 東京メトロ副都心線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const FUKUTOSHIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: #9c5f24 (副都心線ブラウン)
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#9c5f24',
    textColor: '#ffffff',
    bgColor: '#9c5f24',
    borderColor: '#7a4210',
  },
  // 急行: #e05a00 (オレンジ)
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#e05a00',
    textColor: '#ffffff',
    bgColor: '#e05a00',
    borderColor: '#ff7722',
  },
  // 通勤急行: #9a285b (マルーン)
  commuter_exp: {
    key: 'commuter_exp',
    name: '通勤急行',
    nameEn: 'Commuter Express',
    shortName: '通急',
    color: '#9a285b',
    textColor: '#ffffff',
    bgColor: '#9a285b',
    borderColor: '#ba3873',
  },
  // S-TRAIN: #008e76
  strain: {
    key: 'strain',
    name: 'S-TRAIN',
    nameEn: 'S-TRAIN',
    shortName: 'S',
    color: '#008e76',
    textColor: '#ffffff',
    bgColor: '#008e76',
    borderColor: '#00695c',
  },
};
