import type { TrainTypeConfig } from '../../../types';

export const IZUKYU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普",
    "color": "#009cd2",
    "textColor": "#ffffff",
    "bgColor": "#009cd2",
    "borderColor": "#009cd2"
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
