import type { TrainTypeConfig } from '../../../types';

export const MOKA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#43a047",
    "textColor": "#ffffff",
    "bgColor": "#43a047",
    "borderColor": "#43a047"
  },
  "sl": {
    "key": "sl",
    "name": "SLもおか",
    "nameEn": "SL Moka",
    "shortName": "SL",
    "color": "#1e1c1c",
    "textColor": "#ffffff",
    "bgColor": "#1e1c1c",
    "borderColor": "#d4af37"
  }
};
