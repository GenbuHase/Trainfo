// 東京メトロ日比谷線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const HIBIYA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#9caeb7',
    textColor: '#ffffff',
    bgColor: '#9caeb7',
    borderColor: '#7c8e97',
  },
  th_liner: {
    key: 'th_liner',
    name: 'THライナー',
    nameEn: 'TH LINER',
    shortName: 'TH',
    color: '#c8102e',
    textColor: '#ffffff',
    bgColor: '#c8102e',
    borderColor: '#960018',
  },
};
