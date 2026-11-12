import type { TrainTypeConfig } from '../../../types';

export const JR_YAMATOJI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#00a960",
    "textColor": "#ffffff",
    "bgColor": "#00a960",
    "borderColor": "#00a960"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#ff7322",
    "textColor": "#ffffff",
    "bgColor": "#ff7322",
    "borderColor": "#cc5200"
  },
  "direct_rapid": {
    "key": "direct_rapid",
    "name": "直通快速",
    "nameEn": "Direct Rapid",
    "shortName": "直快",
    "color": "#884898",
    "textColor": "#ffffff",
    "bgColor": "#884898",
    "borderColor": "#602870"
  },
  "yamatoji_rapid": {
    "key": "yamatoji_rapid",
    "name": "大和路快速",
    "nameEn": "Yamatoji Rapid",
    "shortName": "大快",
    "color": "#00a960",
    "textColor": "#ffffff",
    "bgColor": "#00a960",
    "borderColor": "#007040"
  }
};
