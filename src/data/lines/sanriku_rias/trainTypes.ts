import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS } from '../../trainTypePresets';

export const SANRIKU_RIAS_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#005bac',
    textColor: '#ffffff',
    bgColor: '#005bac',
    borderColor: '#e60012',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
};
