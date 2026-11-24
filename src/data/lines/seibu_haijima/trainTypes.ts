import type { TrainTypeConfig } from '../../../types';

export const SEIBU_HAIJIMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  "liner": {
    "key": "liner",
    "name": "拝島ライナー",
    "nameEn": "Haijima Liner",
    "shortName": "拝島L",
    "color": "#0284c7",
    "textColor": "#ffffff",
    "bgColor": "#0284c7",
    "borderColor": "#0369a1"
  },
};
