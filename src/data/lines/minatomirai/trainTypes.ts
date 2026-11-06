// 横浜高速鉄道みなとみらい線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { LINER_PRESETS, TOKYU_PRESETS } from '../../trainTypePresets';

export const MINATOMIRAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: 青
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#0075c2',
    textColor: '#ffffff',
    bgColor: '#0075c2',
    borderColor: '#005a96',
  },
  // 急行: 赤
  express: TOKYU_PRESETS.EXPRESS,
  // 通勤特急: オレンジ
  commuter_ltd_exp: TOKYU_PRESETS.COMMUTER_LTD_EXP,
  // 特急 (Fライナー含む): オレンジ
  ltd_exp: TOKYU_PRESETS.LTD_EXP,
  // S-TRAIN: ライムグリーン
  strain: LINER_PRESETS.STRAIN,
};
