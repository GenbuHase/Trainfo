import type { TrainTypeConfig } from '../../../types';

export const SEIBU_SAYAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#00a7db",
    "textColor": "#ffffff",
    "bgColor": "#00a7db",
    "borderColor": "#007ea6"
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
};
