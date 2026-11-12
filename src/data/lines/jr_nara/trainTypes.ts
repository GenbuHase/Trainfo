import type { TrainTypeConfig } from '../../../types';

export const JR_NARA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#996633",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#996633",
    "borderColor": "#996633"
  },
  "semi_rapid": {
    "name": "区間快速",
    "shortName": "区快",
    "color": "#00a960",
    "key": "semi_rapid",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#00a960",
    "borderColor": "#00a960"
  },
  "rapid": {
    "name": "快速",
    "shortName": "快速",
    "color": "#ff7700",
    "key": "rapid",
    "nameEn": "Rapid",
    "textColor": "#ffffff",
    "bgColor": "#ff7700",
    "borderColor": "#ff7700"
  },
  "miyako_rapid": {
    "name": "みやこ路快速",
    "shortName": "み快",
    "color": "#884898",
    "key": "miyako_rapid",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#884898",
    "borderColor": "#884898"
  }
};
