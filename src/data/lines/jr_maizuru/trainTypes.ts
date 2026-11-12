import type { TrainTypeConfig } from '../../../types';

export const JR_MAIZURU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#008080",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#008080",
    "borderColor": "#008080"
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
