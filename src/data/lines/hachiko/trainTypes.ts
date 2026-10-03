// JR八高線 列車種別定義（八高線ラインカラー #a8a39d 準拠）
import type { TrainTypeConfig } from '../../../types';

export const HACHIKO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車 (電化区間: 八王子〜高麗川)
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#a8a39d',
    textColor: '#ffffff',
    bgColor: '#a8a39d',
    borderColor: '#8c8782',
  },
  // 普通 (非電化区間: 高麗川〜高崎)
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#a8a39d',
    textColor: '#ffffff',
    bgColor: '#a8a39d',
    borderColor: '#8c8782',
  },
};
