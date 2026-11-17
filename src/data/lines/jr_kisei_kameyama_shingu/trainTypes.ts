import type { TrainTypeConfig } from '../../../types';

export const JR_KISEI_KAMEYAMA_SHINGU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#ff7322",
    "textColor": "#ffffff",
    "bgColor": "#ff7322",
    "borderColor": "#ff7322"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#ff7322",
    "textColor": "#ffffff",
    "bgColor": "#ff7322",
    "borderColor": "#cc5200"
  },
  "rapid_mie": {
    "key": "rapid_mie",
    "name": "快速みえ",
    "nameEn": "Rapid Mie",
    "shortName": "みえ",
    "color": "#ff7322",
    "textColor": "#ffffff",
    "bgColor": "#ff7322",
    "borderColor": "#cc5200"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#d32f2f",
    "textColor": "#ffffff",
    "bgColor": "#d32f2f",
    "borderColor": "#b71c1c"
  }
};
