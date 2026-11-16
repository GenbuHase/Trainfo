import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const JOBAN_IWAKI_SENDAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0071c5',
    textColor: '#ffffff',
    bgColor: '#0071c5',
    borderColor: '#005596',
  },
  limitedExp: LIMITED_EXP_PRESETS.JOBAN,
  // 既存コード・ダイヤデータ互換用
  limited_express: LIMITED_EXP_PRESETS.JOBAN,
};
