// JR中央本線（高尾〜小淵沢・塩尻） 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { CHUO_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const CHUO_MAIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: グレー
  local: CHUO_PRESETS.LOCAL,
  // 普通（中央本線中距離列車）: 中央東線スカイブルー
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0071c5',
    textColor: '#ffffff',
    bgColor: '#0071c5',
    borderColor: '#38bdf8',
  },
  // 快速: オレンジバーミリオン
  rapid: CHUO_PRESETS.RAPID,
  // 通勤快速: パープル
  commuter: CHUO_PRESETS.COMMUTER,
  // 特別快速（ホリデー快速等）: スカイブルー
  special_rapid: CHUO_PRESETS.SPECIAL_RAPID,
  // 中央特快: スカイブルー
  chuo_special_rapid: CHUO_PRESETS.CHUO_SPECIAL_RAPID,
  // 青梅特快: グリーン
  ome_special_rapid: CHUO_PRESETS.OME_SPECIAL_RAPID,
  // 通勤特快: レッド
  commuter_special_rapid: CHUO_PRESETS.COMMUTER_SPECIAL_RAPID,
  // 特急（あずさ、かいじ、富士回遊等）: ボルドー
  limitedExp: LIMITED_EXP_PRESETS.CHUO,
};
