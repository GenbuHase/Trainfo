// 首都圏新都市鉄道つくばエクスプレス 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig } from '../../../types';

export const TX_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 普通: #334155 (スレートグレー)
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#334155',
    textColor: '#ffffff',
    bgColor: '#334155',
    borderColor: '#64748b',
  },
  // 区間快速: #0099d8 (TXスカイブルー)
  semi_rapid: {
    key: 'semi_rapid',
    name: '区間快速',
    nameEn: 'Semi-Rapid',
    shortName: '区快',
    color: '#0099d8',
    textColor: '#ffffff',
    bgColor: '#0099d8',
    borderColor: '#38bdf8',
  },
  // 通勤快速: #ea5504 (TXオレンジ)
  commuter_rapid: {
    key: 'commuter_rapid',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#ea5504',
    textColor: '#ffffff',
    bgColor: '#ea5504',
    borderColor: '#fb923c',
  },
  // 快速: #df0011 (TXスカーレットレッド)
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#df0011',
    textColor: '#ffffff',
    bgColor: '#df0011',
    borderColor: '#f87171',
  },
};
