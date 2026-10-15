// JR篠ノ井線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

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
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#f15a22',
    textColor: '#ffffff',
    bgColor: '#f15a22',
    borderColor: '#fb923c',
  },
  // 特急 (しなの、あずさ、信州): クリムゾンレッド
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#be123c',
    textColor: '#ffffff',
    bgColor: '#be123c',
    borderColor: '#f43f5e',
  },
};
