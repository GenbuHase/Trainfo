import type { TrainTypeConfig } from '../../../types';

export const TOEI_SHINJUKU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#6cbb5a",
    "textColor": "#ffffff",
    "bgColor": "#6cbb5a",
    "borderColor": "#6cbb5a"
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
