// JR五日市線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const ITSUKAICHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: グレー
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#475569',
    textColor: '#ffffff',
    bgColor: '#475569',
    borderColor: '#64748b',
  },
  // 普通: グレー
  regular: {
    key: 'regular',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#475569',
    textColor: '#ffffff',
    bgColor: '#475569',
    borderColor: '#64748b',
  },
  // 快速: オレンジバーミリオン
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#f15a22',
    textColor: '#ffffff',
    bgColor: '#f15a22',
    borderColor: '#fb923c',
  },
  // 通勤快速: パープル
  commuter: {
    key: 'commuter',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#9333ea',
    textColor: '#ffffff',
    bgColor: '#9333ea',
    borderColor: '#c084fc',
  },
  // 特別快速（ホリデー快速あきがわ等）: スカイブルー
  special_rapid: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: '#0284c7',
    textColor: '#ffffff',
    bgColor: '#0284c7',
    borderColor: '#38bdf8',
  },
  // 青梅特快: グリーン
  ome_special_rapid: {
    key: 'ome_special_rapid',
    name: '青梅特快',
    nameEn: 'Ome Special Rapid',
    shortName: '青特',
    color: '#16a34a',
    textColor: '#ffffff',
    bgColor: '#16a34a',
    borderColor: '#4ade80',
  },
  // 通勤特快: レッド
  commuter_special_rapid: {
    key: 'commuter_special_rapid',
    name: '通勤特快',
    nameEn: 'Commuter Special Rapid',
    shortName: '通特',
    color: '#dc2626',
    textColor: '#ffffff',
    bgColor: '#dc2626',
    borderColor: '#f87171',
  },
  // 特急（鎌倉満喫五日市号等）: ボルドー
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#be123c',
    textColor: '#ffffff',
    bgColor: '#be123c',
    borderColor: '#f43f5e',
  },
};

