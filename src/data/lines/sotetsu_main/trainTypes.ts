// 相鉄本線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const SOTETSU_MAIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: 濃紺/グレー
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#4b6584',
    textColor: '#ffffff',
    bgColor: '#4b6584',
    borderColor: '#34495e',
  },
  // 快速: 青
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#0072bc',
    textColor: '#ffffff',
    bgColor: '#0072bc',
    borderColor: '#00558c',
  },
  // 急行: 赤
  express: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
  // 通勤急行: 山吹/オレンジ
  commuter_exp: {
    key: 'commuter_exp',
    name: '通勤急行',
    nameEn: 'Commuter Express',
    shortName: '通急',
    color: '#e08a00',
    textColor: '#ffffff',
    bgColor: '#e08a00',
    borderColor: '#b36e00',
  },
  // 特急: オレンジ
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#f39800',
    textColor: '#ffffff',
    bgColor: '#f39800',
    borderColor: '#c67c00',
  },
  // 通勤特急: ピンク/マゼンタ
  commuter_ltd_exp: {
    key: 'commuter_ltd_exp',
    name: '通勤特急',
    nameEn: 'Commuter Limited Express',
    shortName: '通特',
    color: '#e5007f',
    textColor: '#ffffff',
    bgColor: '#e5007f',
    borderColor: '#b80066',
  },
};
