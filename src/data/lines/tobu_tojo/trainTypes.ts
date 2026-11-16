// 東武東上線 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig } from '../../../types';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
    color: '#009966',
    textColor: '#ffffff',
    bgColor: '#009966',
    borderColor: '#009966',
  },
  // 急行: #f62837
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#ed1a3d',
    textColor: '#ffffff',
    bgColor: '#ed1a3d',
    borderColor: '#ed1a3d',
  },
  // 快速急行: #005789
  rapidExp: {
    key: 'rapidExp',
    name: '快速急行',
    nameEn: 'Rapid Express',
    shortName: '快急',
    color: '#006699',
    textColor: '#ffffff',
    bgColor: '#006699',
    borderColor: '#006699',
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
    color: '#ff6600',
    textColor: '#ffffff',
    bgColor: '#ff6600',
    borderColor: '#ff6600',
  },
};
