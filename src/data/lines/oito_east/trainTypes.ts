// JR東日本 大糸線 列車種別定義
import type { TrainTypeConfig } from '../../../types';
import { LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const OITO_EAST_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#957490',
    textColor: '#ffffff',
    bgColor: '#957490',
    borderColor: '#734185',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#00ac9a',
    textColor: '#ffffff',
    bgColor: '#00ac9a',
    borderColor: '#007a6d',
  },
  limitedExp: LIMITED_EXP_PRESETS.CHUO,
};
