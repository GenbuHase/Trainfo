import type { TrainTypeConfig } from '../../../types';

export const HOKUSO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#334155",
    "textColor": "#ffffff",
    "bgColor": "#334155",
    "borderColor": "#1e293b"
  },
  "express": {
    "key": "express",
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
    "name": "アクセス特急",
    "nameEn": "Access Express",
    "shortName": "ア特",
    "color": "#f37321",
    "textColor": "#ffffff",
    "bgColor": "#f37321",
    "borderColor": "#d45d10"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "スカイライナー",
    "nameEn": "Skyliner",
    "shortName": "SL",
    "color": "#003686",
    "textColor": "#ffffff",
    "bgColor": "#003686",
    "borderColor": "#002255"
  }
};
