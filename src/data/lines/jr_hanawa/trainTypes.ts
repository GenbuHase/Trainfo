import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS } from '../../trainTypePresets';

export const HANAWA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#b31c31',
    textColor: '#ffffff',
    bgColor: '#b31c31',
    borderColor: '#880e4f',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
};
