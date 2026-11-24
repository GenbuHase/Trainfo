import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS } from '../../trainTypePresets';

export const OFUNATO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#ffa500',
    textColor: '#1e293b',
    bgColor: '#ffa500',
    borderColor: '#c2410c',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
};
