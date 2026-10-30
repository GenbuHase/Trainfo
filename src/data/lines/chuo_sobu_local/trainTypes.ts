import type { TrainTypeConfig } from '../../../types';

export const CHUO_SOBU_LOCAL_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "shortName": "各停",
    "bgColor": "#ffd400",
    "textColor": "#000000",
    "borderColor": "#ffd400",
    "nameEn": "Local",
    "color": "#ffd400"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急",
    "shortName": "特急",
    "bgColor": "#c9252d",
    "textColor": "#ffffff",
    "borderColor": "#c9252d",
    "nameEn": "Limited Express",
    "color": "#c9252d"
  }
};
