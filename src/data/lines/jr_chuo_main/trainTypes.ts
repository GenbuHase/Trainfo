// JR中央本線（高尾〜小淵沢・塩尻） 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const CHUO_MAIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  // 特急（あずさ、かいじ、富士回遊等）: ボルドー
  limited_exp: LIMITED_EXP_PRESETS.CHUO,
};
