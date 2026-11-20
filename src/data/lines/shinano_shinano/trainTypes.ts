import type { TrainTypeConfig } from '../../../types';

export const SHINANO_SHINANO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#d97706",
    "textColor": "#ffffff",
    "bgColor": "#d97706",
    "borderColor": "#b45309"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0066cc",
    "textColor": "#ffffff",
    "bgColor": "#0066cc",
    "borderColor": "#004c99"
  },
  "special_rapid": {
    "key": "special_rapid",
    "name": "特別快速",
    "nameEn": "Special Rapid",
    "shortName": "特快",
    "color": "#0284c7",
    "textColor": "#ffffff",
    "bgColor": "#0284c7",
    "borderColor": "#0369a1"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "観光列車",
    "nameEn": "Tourist Train",
    "shortName": "ろくもん",
    "color": "#7f1d1d",
    "textColor": "#ffffff",
    "bgColor": "#7f1d1d",
    "borderColor": "#d97706"
  }
};
