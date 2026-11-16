import type { TrainTypeConfig } from '../../../types';

export const YOKOHAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "shortName": "各停",
    "bgColor": "#80c241",
    "textColor": "#ffffff",
    "borderColor": "#80c241",
    "nameEn": "Local",
    "color": "#80c241"
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
