// JR武蔵野線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const MUSASHINO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: 武蔵野線オレンジバーミリオン (#f15a22)
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#f15a22',
    textColor: '#ffffff',
    bgColor: '#f15a22',
    borderColor: '#fb923c',
  },
  // 普通（むさしの号・しもうさ号等）: ディープオレンジ/アンバー (#e05a10)
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#e05a10',
    textColor: '#ffffff',
    bgColor: '#e05a10',
    borderColor: '#f97316',
  },
  // 特急（臨時特急など）: #d32f2f (JR特急レッド)
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#d32f2f',
    textColor: '#ffffff',
    bgColor: '#d32f2f',
    borderColor: '#ef5350',
  },
};
