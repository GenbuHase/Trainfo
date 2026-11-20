import type { TrainTypeConfig } from '../../../types';

export const KEIO_INOKASHIRA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#1d2088",
    "textColor": "#ffffff",
    "bgColor": "#1d2088",
    "borderColor": "#13155c"
  },
  "express": {
    "key": "express",
    "name": "急行",
    "nameEn": "Express",
    "shortName": "急行",
    "color": "#dd0077",
    "textColor": "#ffffff",
    "bgColor": "#dd0077",
    "borderColor": "#b0005e"
  }
};
