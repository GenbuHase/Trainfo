import type { TrainTypeConfig } from '../../../types';

export const IZUHAKONE_SUNZU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#0083ca",
    "textColor": "#ffffff",
    "bgColor": "#0083ca",
    "borderColor": "#0083ca"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#d32f2f",
    "textColor": "#ffffff",
    "bgColor": "#d32f2f",
    "borderColor": "#d32f2f"
  }
};
