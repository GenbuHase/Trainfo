// 東京メトロ有楽町線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const YURAKUCHO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: #c1a470 (有楽町線ゴールド)
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#c1a470',
    textColor: '#ffffff',
    bgColor: '#c1a470',
    borderColor: '#a38450',
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
