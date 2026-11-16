import type { TrainTypeConfig } from '../../../types';

export const JR_SANYO_HIMEJI_KAMIGORI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#0072bc",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#0072bc",
    "borderColor": "#0072bc"
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
