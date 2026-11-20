import type { TrainTypeConfig } from '../../../types';

export const TOYO_RAPID_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#53b332",
    "textColor": "#ffffff",
    "bgColor": "#53b332",
    "borderColor": "#53b332"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0073bc",
    "textColor": "#ffffff",
    "bgColor": "#0073bc",
    "borderColor": "#00558f"
  }
};
