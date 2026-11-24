// JR常磐線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const JOBAN_LOCAL_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#9e9e9f',
    textColor: '#ffffff',
    bgColor: '#9e9e9f',
    borderColor: '#707071',
  },
};
