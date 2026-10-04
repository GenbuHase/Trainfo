// 秩父鉄道秩父本線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const CHICHIBU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 普通: ブルー（秩父鉄道ラインカラー基調）
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0073bc',
    textColor: '#ffffff',
    bgColor: '#0073bc',
    borderColor: '#38bdf8',
  },
  // 急行（急行秩父路）: レッド
  express: {
    key: 'express',
    name: '急行秩父路',
    nameEn: 'Express Chichibuji',
    shortName: '急行',
    color: '#dc2626',
    textColor: '#ffffff',
    bgColor: '#dc2626',
    borderColor: '#f87171',
  },
  // SLパレオエクスプレス: アンバー/ブラウン
  sl: {
    key: 'sl',
    name: 'SLパレオエクスプレス',
    nameEn: 'SL Paleo Express',
    shortName: 'SL',
    color: '#78350f',
    textColor: '#ffffff',
    bgColor: '#78350f',
    borderColor: '#d97706',
  },
};
