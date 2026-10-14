// 相鉄・JR直通線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const SOTETSU_JR_DIRECT_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: JR埼京線グリーン
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00ac9a',
    textColor: '#ffffff',
    bgColor: '#00ac9a',
    borderColor: '#008577',
  },
  // 快速: ブルー
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#0072bc',
    textColor: '#ffffff',
    bgColor: '#0072bc',
    borderColor: '#005bac',
  },
  // 通勤快速: レッド
  commuter: {
    key: 'commuter',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: '#e60012',
    textColor: '#ffffff',
    bgColor: '#e60012',
    borderColor: '#b8000e',
  },
  // 特急 (相鉄線内特急): オレンジ
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#ff6600',
    textColor: '#ffffff',
    bgColor: '#ff6600',
    borderColor: '#cc5200',
  },
};
