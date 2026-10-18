// tobu_sano 列車種別設定
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
};
