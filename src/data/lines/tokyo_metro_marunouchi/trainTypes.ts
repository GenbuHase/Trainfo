// 東京メトロ丸ノ内線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const MARUNOUCHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b3000e',
  },
};
