import type { TrainTypeConfig } from '../../../types';

export const JR_SANIN_SONOBE_KINOSAKI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  "limited_exp": {
    "name": "特急",
    "shortName": "特急",
    "color": "#e60012",
    "key": "limited_exp",
    "nameEn": "Limited Express",
    "textColor": "#ffffff",
    "bgColor": "#e60012",
    "borderColor": "#e60012"
  }
};
