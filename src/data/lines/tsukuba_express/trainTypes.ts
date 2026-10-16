// 首都圏新都市鉄道つくばエクスプレス 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig } from '../../../types';

export const TX_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 普通: #334155 (スレートグレー)
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#3e3a39',
    textColor: '#ffffff',
    bgColor: '#3e3a39',
    borderColor: '#3e3a39',
  },
  // 区間快速: #0099d8 (TXスカイブルー)
  semi_rapid: {
    key: 'semi_rapid',
    name: '区間快速',
    nameEn: 'Semi-Rapid',
    shortName: '区快',
    color: '#036eb8',
    textColor: '#ffffff',
    bgColor: '#036eb8',
    borderColor: '#036eb8',
  },
  // 通勤快速: #ea5504 (TXオレンジ)
  commuter_rapid: {
    key: 'commuter_rapid',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#f39800',
    textColor: '#ffffff',
    bgColor: '#f39800',
    borderColor: '#f39800',
  },
  // 快速: #df0011 (TXスカーレットレッド)
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#d20012',
    textColor: '#ffffff',
    bgColor: '#d20012',
    borderColor: '#d20012',
  },
};
