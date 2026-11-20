import type { TrainTypeConfig } from '../../../types';

export const HAKONE_TOZAN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#dc3c00",
    "textColor": "#ffffff",
    "bgColor": "#dc3c00",
    "borderColor": "#a82c00"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急ロマンスカー",
    "nameEn": "Romancecar",
    "shortName": "特急",
    "color": "#dd3c00",
    "textColor": "#ffffff",
    "bgColor": "#dd3c00",
    "borderColor": "#b03000"
  }
};
