import type { TrainTypeConfig } from '../../../types';

export const JOBAN_IWAKI_SENDAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0071c5',
    textColor: '#ffffff',
    bgColor: '#0071c5',
    borderColor: '#005596',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#0071c5',
    textColor: '#ffffff',
    bgColor: '#0071c5',
    borderColor: '#005596',
  },
  limited_express: {
    key: 'limited_express',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
};
