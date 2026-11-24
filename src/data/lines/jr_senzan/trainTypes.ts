import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS } from '../../trainTypePresets';

export const SENZAN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#77dd00',
    textColor: '#1e293b',
    bgColor: '#77dd00',
    borderColor: '#4d7c0f',
  },
  rapid: JR_RAPID_PRESETS.STANDARD,
};
