// JR五日市線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { CHUO_PRESETS } from '../../trainTypePresets';

export const ITSUKAICHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: グレー
  local: CHUO_PRESETS.LOCAL,
  // 普通: グレー
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#475569',
    textColor: '#ffffff',
    bgColor: '#475569',
    borderColor: '#64748b',
  },
  // 快速: オレンジバーミリオン
  rapid: CHUO_PRESETS.RAPID,
  // 通勤快速: パープル
  commuter: CHUO_PRESETS.COMMUTER,
  // 特別快速（ホリデー快速あきがわ等）: スカイブルー
  special_rapid: CHUO_PRESETS.SPECIAL_RAPID,
  // 青梅特快: グリーン
  ome_special_rapid: CHUO_PRESETS.OME_SPECIAL_RAPID,
  // 通勤特快: レッド
  commuter_special_rapid: CHUO_PRESETS.COMMUTER_SPECIAL_RAPID,
};
