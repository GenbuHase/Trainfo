import type { TrainTypeConfig } from '../../../types';

export const UTSUNOMIYA_LIGHT_RAIL_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#ffd400",
    "textColor": "#1e293b",
    "bgColor": "#ffd400",
    "borderColor": "#ffd400"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#e65100",
    "textColor": "#ffffff",
    "bgColor": "#e65100",
    "borderColor": "#bf360c"
  }
};
