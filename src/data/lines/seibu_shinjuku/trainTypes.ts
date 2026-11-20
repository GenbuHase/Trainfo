import type { TrainTypeConfig } from '../../../types';

export const SEIBU_SHINJUKU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  "express": {
    "key": "express",
    "name": "急行",
    "nameEn": "Express",
    "shortName": "急行",
    "color": "#ed1a3d",
    "textColor": "#ffffff",
    "bgColor": "#ed1a3d",
    "borderColor": "#b80d2a"
  },
  "commuter_exp": {
    "key": "commuter_exp",
    "name": "通勤急行",
    "nameEn": "Commuter Express",
    "shortName": "通急",
    "color": "#f39800",
    "textColor": "#ffffff",
    "bgColor": "#f39800",
    "borderColor": "#c47900"
  },
  "rapid_exp": {
    "key": "rapid_exp",
    "name": "快速急行",
    "nameEn": "Rapid Express",
    "shortName": "快急",
    "color": "#7b1fa2",
    "textColor": "#ffffff",
    "bgColor": "#7b1fa2",
    "borderColor": "#5c147a"
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
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急小江戸",
    "nameEn": "Ltd. Exp. Koedo",
    "shortName": "特急",
    "color": "#d32f2f",
    "textColor": "#ffffff",
    "bgColor": "#d32f2f",
    "borderColor": "#b71c1c"
  }
};
