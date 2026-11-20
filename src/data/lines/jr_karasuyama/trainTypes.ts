import type { TrainTypeConfig } from '../../../types';

export const JR_KARASUYAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "regular": {
    "key": "regular",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#ef6c00",
    "textColor": "#ffffff",
    "bgColor": "#ef6c00",
    "borderColor": "#ef6c00"
  },
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#ef6c00",
    "textColor": "#ffffff",
    "bgColor": "#ef6c00",
    "borderColor": "#ef6c00"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0073bc",
    "textColor": "#ffffff",
    "bgColor": "#0073bc",
    "borderColor": "#0073bc"
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
