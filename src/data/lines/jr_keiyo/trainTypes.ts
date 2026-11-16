import type { TrainTypeConfig } from '../../../types';

export const KEIYO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "shortName": "各停",
    "bgColor": "#cf1225",
    "textColor": "#ffffff",
    "borderColor": "#cf1225",
    "nameEn": "Local",
    "color": "#cf1225"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "shortName": "快速",
    "bgColor": "#007ac1",
    "textColor": "#ffffff",
    "borderColor": "#007ac1",
    "nameEn": "Rapid",
    "color": "#007ac1"
  },
  "commuter_rapid": {
    "key": "commuter_rapid",
    "name": "通勤快速",
    "shortName": "通快",
    "bgColor": "#e05a00",
    "textColor": "#ffffff",
    "borderColor": "#e05a00",
    "nameEn": "Commuter Rapid",
    "color": "#e05a00"
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
