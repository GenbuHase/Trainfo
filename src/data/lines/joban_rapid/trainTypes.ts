import type { TrainTypeConfig } from '../../../types';

export const JOBAN_RAPID_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00b261',
    textColor: '#ffffff',
    bgColor: '#00b261',
    borderColor: '#008a4b',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#005aaa',
    textColor: '#ffffff',
    bgColor: '#005aaa',
    borderColor: '#004280',
  },
  special_rapid: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '#003366',
    textColor: '#ffffff',
    bgColor: '#003366',
    borderColor: '#002244',
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
