// 相鉄・JR直通線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { SOTETSU_PRESETS } from '../../trainTypePresets';

export const SOTETSU_JR_DIRECT_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: JR埼京線グリーン
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00ac84',
    textColor: '#ffffff',
    bgColor: '#00ac84',
    borderColor: '#00ac84',
  },
  // 快速: ブルー
  rapid: SOTETSU_PRESETS.RAPID,
  // 特急 (相鉄線内特急): オレンジ
  limited_exp: SOTETSU_PRESETS.LIMITED_EXP,
};
