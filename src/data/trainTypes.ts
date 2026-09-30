// 東武東上線 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig, TrainTypeKey } from '../types';

export const TRAIN_TYPES: Record<TrainTypeKey, TrainTypeConfig> = {
  // 普通: #1e1c1c
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#1e1c1c',
    textColor: '#ffffff',
    bgColor: '#1e1c1c',
    borderColor: '#4a4646',
  },
  // 準急: #009a74
  semiExp: {
    key: 'semiExp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: '#009a74',
    textColor: '#ffffff',
    bgColor: '#009a74',
    borderColor: '#05c796',
  },
  // 急行: #f62837
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#f62837',
    textColor: '#ffffff',
    bgColor: '#f62837',
    borderColor: '#ff6b76',
  },
  // 快速急行: #005789
  rapidExp: {
    key: 'rapidExp',
    name: '快速急行',
    nameEn: 'Rapid Express',
    shortName: '快急',
    color: '#005789',
    textColor: '#ffffff',
    bgColor: '#005789',
    borderColor: '#1e88e5',
  },
  // 川越特急: #e73799
  kawagoeExp: {
    key: 'kawagoeExp',
    name: '川越特急',
    nameEn: 'Kawagoe Limited Express',
    shortName: '川特',
    color: '#e73799',
    textColor: '#ffffff',
    bgColor: '#e73799',
    borderColor: '#f472b6',
  },
  // TJライナー: #ff710a
  tjLiner: {
    key: 'tjLiner',
    name: 'TJライナー',
    nameEn: 'TJ Liner',
    shortName: 'TJ',
    color: '#ff710a',
    textColor: '#ffffff',
    bgColor: '#ff710a',
    borderColor: '#ff9d47',
  },
};
