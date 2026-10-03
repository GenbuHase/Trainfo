// 東京臨海高速鉄道りんかい線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const RINKAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: #00418e (TWRブルー)
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00418e',
    textColor: '#ffffff',
    bgColor: '#00418e',
    borderColor: '#005bbb',
  },
  // 快速 (埼京線直通): #007ac1
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#007ac1',
    textColor: '#ffffff',
    bgColor: '#007ac1',
    borderColor: '#38bdf8',
  },
  // 通勤快速 (埼京線直通): #e60012
  commuter: {
    key: 'commuter',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#f87171',
  },
};
