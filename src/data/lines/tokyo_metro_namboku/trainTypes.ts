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
};
