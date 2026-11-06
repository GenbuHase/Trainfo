// JR青梅線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { CHUO_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const OME_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: グレー
  local: CHUO_PRESETS.LOCAL,
  // 快速: オレンジバーミリオン
  rapid: CHUO_PRESETS.RAPID,
  // 通勤快速: パープル
  commuter: CHUO_PRESETS.COMMUTER,
  // 特別快速（ホリデー快速おくたま等）: スカイブルー
  special_rapid: CHUO_PRESETS.SPECIAL_RAPID,
  // 中央特快: スカイブルー
  chuo_special_rapid: CHUO_PRESETS.CHUO_SPECIAL_RAPID,
  // 青梅特快: グリーン
  ome_special_rapid: CHUO_PRESETS.OME_SPECIAL_RAPID,
  // 通勤特快: レッド
  commuter_special_rapid: CHUO_PRESETS.COMMUTER_SPECIAL_RAPID,
  // 特急（おうめ等）: ボルドー
  limitedExp: LIMITED_EXP_PRESETS.CHUO,
};
