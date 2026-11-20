import type { TrainTypeConfig } from '../../../types';

export const KANTO_JOSO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#0068b7",
    "textColor": "#ffffff",
    "bgColor": "#0068b7",
    "borderColor": "#0068b7"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#e60012",
    "textColor": "#ffffff",
    "bgColor": "#e60012",
    "borderColor": "#b8000e"
  }
};
