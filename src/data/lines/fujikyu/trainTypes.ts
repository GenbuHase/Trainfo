import type { TrainTypeConfig } from '../../../types';

export const FUJIKYU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普",
    "color": "#0072bc",
    "textColor": "#ffffff",
    "bgColor": "#0072bc",
    "borderColor": "#0072bc"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快",
    "color": "#39b54a",
    "textColor": "#ffffff",
    "bgColor": "#39b54a",
    "borderColor": "#39b54a"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#ed1c24",
    "textColor": "#ffffff",
    "bgColor": "#ed1c24",
    "borderColor": "#ed1c24"
  }
};
