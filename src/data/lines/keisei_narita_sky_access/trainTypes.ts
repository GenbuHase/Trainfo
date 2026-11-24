import type { TrainTypeConfig } from '../../../types';

export const KEISEI_NARITA_SKY_ACCESS_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
  "rapid_exp": {
    "key": "rapid_exp",
    "name": "快速特急",
    "nameEn": "Rapid Ltd. Exp.",
    "shortName": "快特",
    "color": "#009944",
    "textColor": "#ffffff",
    "bgColor": "#009944",
    "borderColor": "#007a36"
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
