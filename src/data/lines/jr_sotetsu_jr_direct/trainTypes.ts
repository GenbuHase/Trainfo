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
  // 通勤快速: レッド
  commuter: {
    key: 'commuter',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
  // 特急 (相鉄線内特急): オレンジ
  limitedExp: SOTETSU_PRESETS.LIMITED_EXP,
};
