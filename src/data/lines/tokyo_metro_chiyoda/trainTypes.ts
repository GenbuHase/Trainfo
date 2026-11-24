// 東京メトロ千代田線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const CHIYODA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00bb85',
    textColor: '#ffffff',
    bgColor: '#00bb85',
    borderColor: '#009a6d',
  },
  limited_exp: {
    key: 'limited_exp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#006cb7',
    textColor: '#ffffff',
    bgColor: '#006cb7',
    borderColor: '#004f85',
  },
};
