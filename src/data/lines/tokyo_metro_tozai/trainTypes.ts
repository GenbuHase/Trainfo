// 東京メトロ東西線 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const TOZAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00a7db',
    textColor: '#ffffff',
    bgColor: '#00a7db',
    borderColor: '#007ea6',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b3000e',
  },
  commuter_rapid: {
    key: 'commuter_rapid',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#e05a00',
    textColor: '#ffffff',
    bgColor: '#e05a00',
    borderColor: '#b84900',
  },
};
