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
};
