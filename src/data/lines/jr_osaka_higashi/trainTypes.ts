import type { TrainTypeConfig } from '../../../types';

export const JR_OSAKA_HIGASHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#384c97",
    "textColor": "#ffffff",
    "bgColor": "#384c97",
    "borderColor": "#384c97"
  },
  "direct_rapid": {
    "key": "direct_rapid",
    "name": "直通快速",
    "nameEn": "Direct Rapid",
    "shortName": "直快",
    "color": "#884898",
    "textColor": "#ffffff",
    "bgColor": "#884898",
    "borderColor": "#602870"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#d32f2f",
    "textColor": "#ffffff",
    "bgColor": "#d32f2f",
    "borderColor": "#b71c1c"
  }
};
