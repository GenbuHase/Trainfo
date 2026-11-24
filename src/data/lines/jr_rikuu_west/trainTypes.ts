import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS } from '../../trainTypePresets';

export const RIKUU_WEST_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#6fbf7f',
    textColor: '#ffffff',
    bgColor: '#6fbf7f',
    borderColor: '#3d8b4e',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
};
