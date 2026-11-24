import type { TrainTypeConfig } from '../../../types';

export const TOEI_ASAKUSA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#e85298",
    "textColor": "#ffffff",
    "bgColor": "#e85298",
    "borderColor": "#e85298"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#e60012",
    "textColor": "#ffffff",
    "bgColor": "#e60012",
    "borderColor": "#b8000e"
  },
  "access_exp": {
    "key": "access_exp",
    "name": "エアポート快特",
    "nameEn": "Airport Kaitoku",
    "shortName": "エ快",
    "color": "#f37321",
    "textColor": "#ffffff",
    "bgColor": "#f37321",
    "borderColor": "#d45d10"
  }
};
