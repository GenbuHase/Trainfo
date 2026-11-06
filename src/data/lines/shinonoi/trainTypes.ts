// JR篠ノ井線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { CHUO_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const SHINONOI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 普通: 篠ノ井線/信州ブルー
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0284c7',
    textColor: '#ffffff',
    bgColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  // 快速 (みすず号等): オレンジ
  rapid: CHUO_PRESETS.RAPID,
  // 特急 (しなの、あずさ、信州): クリムゾンレッド
  limitedExp: LIMITED_EXP_PRESETS.CHUO,
};
