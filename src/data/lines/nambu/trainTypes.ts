import type { TrainTypeConfig } from '../../../types';

export const NAMBU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "shortName": "快速",
    "bgColor": "#f39800",
    "textColor": "#ffffff",
    "borderColor": "#f39800",
    "nameEn": "Rapid",
    "color": "#f39800"
  }
};
