import type { TrainTypeConfig } from '../../../types';

export const JR_AKO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#e6b422",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#e6b422",
    "borderColor": "#e6b422"
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
  }
};
