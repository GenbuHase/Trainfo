import type { TrainTypeConfig } from '../../../types';
import { JR_RAPID_PRESETS, LIMITED_EXP_PRESETS } from '../../trainTypePresets';

export const JOBAN_RAPID_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: '#0071c5',
    textColor: '#ffffff',
    bgColor: '#0071c5',
    borderColor: '#005596',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: '#00c18a',
    textColor: '#ffffff',
    bgColor: '#00c18a',
    borderColor: '#00966b',
  },
  special_rapid: JR_RAPID_PRESETS.JOBAN_SPECIAL_RAPID,
  limitedExp: LIMITED_EXP_PRESETS.JOBAN,
  // 既存コード・ダイヤデータ互換用
  limited_express: LIMITED_EXP_PRESETS.JOBAN,
};
