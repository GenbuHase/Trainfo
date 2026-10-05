// 東武越生線 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig } from '../../../types';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 普通: #1e1c1c (各駅停車)
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#1e1c1c',
    textColor: '#ffffff',
    bgColor: '#1e1c1c',
    borderColor: '#4a4646',
  },
};
