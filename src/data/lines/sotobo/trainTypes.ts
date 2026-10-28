import type { TrainTypeConfig } from '../../../types';

export const SOTOBO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "shortName": "普通",
    "bgColor": "#e60012",
    "textColor": "#ffffff",
    "borderColor": "#e60012",
    "nameEn": "Local",
    "color": "#e60012"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "shortName": "快速",
    "bgColor": "#007ac1",
    "textColor": "#ffffff",
    "borderColor": "#007ac1",
    "nameEn": "Rapid",
    "color": "#007ac1"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急わかしお",
    "shortName": "わかしお",
    "bgColor": "#0074be",
    "textColor": "#ffffff",
    "borderColor": "#0074be",
    "nameEn": "Limited Express",
    "color": "#0074be"
  }
};
