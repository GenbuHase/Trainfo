import type { TrainTypeConfig } from '../../../types';

export const TOKYU_MEGURO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#009cd2",
    "textColor": "#ffffff",
    "bgColor": "#009cd2",
    "borderColor": "#009cd2"
  },
  "semi_exp": {
    "key": "semi_exp",
    "name": "準急",
    "nameEn": "Semi-Express",
    "shortName": "準急",
    "color": "#009944",
    "textColor": "#ffffff",
    "bgColor": "#009944",
    "borderColor": "#007a36"
  },
  "express": {
    "key": "express",
    "name": "急行",
    "nameEn": "Express",
    "shortName": "急行",
    "color": "#da0442",
    "textColor": "#ffffff",
    "bgColor": "#da0442",
    "borderColor": "#a80030"
  }
};
