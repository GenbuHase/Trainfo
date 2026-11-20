import type { TrainTypeConfig } from '../../../types';

export const YOKOHAMA_BLUE_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#0071c5",
    "textColor": "#ffffff",
    "bgColor": "#0071c5",
    "borderColor": "#0071c5"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#e65100",
    "textColor": "#ffffff",
    "bgColor": "#e65100",
    "borderColor": "#bf360c"
  }
};
