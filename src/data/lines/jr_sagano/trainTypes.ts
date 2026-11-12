import type { TrainTypeConfig } from '../../../types';

export const JR_SAGANO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#884898",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#884898",
    "borderColor": "#884898"
  },
  "rapid": {
    "name": "快速",
    "shortName": "快速",
    "color": "#ff7700",
    "key": "rapid",
    "nameEn": "Rapid",
    "textColor": "#ffffff",
    "bgColor": "#ff7700",
    "borderColor": "#ff7700"
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
