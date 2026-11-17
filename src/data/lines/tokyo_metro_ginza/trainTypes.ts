// 東京メトロ銀座線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const GINZA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#f39700',
    textColor: '#ffffff',
    bgColor: '#f39700',
    borderColor: '#b87200',
  },
};
