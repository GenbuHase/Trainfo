// JR埼京線・川越線 列車種別定義（公式カラー準拠）
import type { TrainTypeConfig } from '../../../types';

export const SAIKYO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  // 各駅停車: #00ac9a (埼京グリーン)
  local: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: '#00ac9a',
    textColor: '#ffffff',
    bgColor: '#00ac9a',
    borderColor: '#05c796',
  },
  // 快速: #007ac1 (JRブルー)
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
  // 通勤快速: #e60012 (JRレッド)
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
  // 特急（臨時特急など）: #d32f2f (JR特急レッド)
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: '#d32f2f',
    textColor: '#ffffff',
    bgColor: '#d32f2f',
    borderColor: '#ef5350',
  },
};
