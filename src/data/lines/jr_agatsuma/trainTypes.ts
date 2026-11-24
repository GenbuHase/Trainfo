import type { TrainTypeConfig } from '../../../types';

export const JR_AGATSUMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "regular": {
    "key": "regular",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#00897b",
    "textColor": "#ffffff",
    "bgColor": "#00897b",
    "borderColor": "#00897b"
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
