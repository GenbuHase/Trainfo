import type { TrainTypeConfig } from '../../../types';

export const KEIHIN_TOHOKU_NEGISHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "shortName": "各停",
    "bgColor": "#00b2e5",
    "textColor": "#ffffff",
    "borderColor": "#00b2e5",
    "nameEn": "Local",
    "color": "#00b2e5"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "shortName": "快速",
    "bgColor": "#007ac1",
    "textColor": "#ffffff",
    "borderColor": "#007ac1",
    "nameEn": "Rapid",
    "color": "#007ac1"
  }
};
