// yagan 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
      "key": "local",
      "name": "普通",
      "nameEn": "Local",
      "shortName": "普通",
      "color": "#1e1c1c",
      "textColor": "#ffffff",
      "bgColor": "#1e1c1c",
      "borderColor": "#4a4646"
  },
  rapid: {
      "key": "rapid",
      "name": "快速",
      "nameEn": "Rapid",
      "shortName": "快速",
      "color": "#006699",
      "textColor": "#ffffff",
      "bgColor": "#006699",
      "borderColor": "#006699"
  },
  limitedExp: {
      "key": "limitedExp",
      "name": "特急",
      "nameEn": "Limited Express",
      "shortName": "特急",
      "color": "#c8102e",
      "textColor": "#ffffff",
      "bgColor": "#c8102e",
      "borderColor": "#c8102e"
  },
  aizu_mount_exp: {
      "key": "aizu_mount_exp",
      "name": "AIZUマウントエクスプレス",
      "nameEn": "AIZU Mount Express",
      "shortName": "マウント",
      "color": "#c8102e",
      "textColor": "#ffffff",
      "bgColor": "#c8102e",
      "borderColor": "#c8102e"
  },
};
