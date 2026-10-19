import type { TrainTypeConfig } from '../../../types';

export const IZUHAKONE_SUNZU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普",
    "color": "#0083ca",
    "textColor": "#ffffff",
    "bgColor": "#0083ca",
    "borderColor": "#0083ca"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快",
    "color": "#ff6600",
    "textColor": "#ffffff",
    "bgColor": "#ff6600",
    "borderColor": "#ff6600"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#d32f2f",
    "textColor": "#ffffff",
    "bgColor": "#d32f2f",
    "borderColor": "#d32f2f"
  }
};
