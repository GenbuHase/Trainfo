import type { TrainTypeConfig } from '../../../types';

export const JR_BANTAN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#a22041",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#a22041",
    "borderColor": "#a22041"
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
