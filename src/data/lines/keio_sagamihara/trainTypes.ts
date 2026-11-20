import type { TrainTypeConfig } from '../../../types';

export const KEIO_SAGAMIHARA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "各駅停車",
    "nameEn": "Local",
    "shortName": "各停",
    "color": "#334155",
    "textColor": "#ffffff",
    "bgColor": "#334155",
    "borderColor": "#1e293b"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0073bc",
    "textColor": "#ffffff",
    "bgColor": "#0073bc",
    "borderColor": "#00558f"
  },
  "section_exp": {
    "key": "section_exp",
    "name": "区間急行",
    "nameEn": "Section Express",
    "shortName": "区急",
    "color": "#84cc16",
    "textColor": "#1e293b",
    "bgColor": "#84cc16",
    "borderColor": "#65a30d"
  },
  "express": {
    "key": "express",
    "name": "急行",
    "nameEn": "Express",
    "shortName": "急行",
    "color": "#009944",
    "textColor": "#ffffff",
    "bgColor": "#009944",
    "borderColor": "#007a36"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急",
    "nameEn": "Special Express",
    "shortName": "特急",
    "color": "#dd0077",
    "textColor": "#ffffff",
    "bgColor": "#dd0077",
    "borderColor": "#b0005e"
  },
  "liner": {
    "key": "liner",
    "name": "京王ライナー",
    "nameEn": "Keio Liner",
    "shortName": "ライナー",
    "color": "#1e293b",
    "textColor": "#ffffff",
    "bgColor": "#1e293b",
    "borderColor": "#dd0077"
  }
};
