import type { TrainTypeConfig } from '../../../types';

export const JR_KOSEI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#00a0e9",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#00a0e9",
    "borderColor": "#00a0e9"
  },
  "rapid": {
    "name": "快速",
    "shortName": "快速",
    "color": "#ff7700",
    "key": "rapid",
    "nameEn": "Rapid",
    "textColor": "#ffffff",
    "bgColor": "#ff7700",
    "borderColor": "#ff7700"
  },
  "special_rapid": {
    "name": "新快速",
    "shortName": "新快",
    "color": "#0072bc",
    "key": "special_rapid",
    "nameEn": "Special Rapid",
    "textColor": "#ffffff",
    "bgColor": "#0072bc",
    "borderColor": "#0072bc"
  },
  "limitedExp": {
    "name": "特急",
    "shortName": "特急",
    "color": "#e60012",
    "key": "limitedExp",
    "nameEn": "Limited Express",
    "textColor": "#ffffff",
    "bgColor": "#e60012",
    "borderColor": "#e60012"
  }
};
