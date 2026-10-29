import type { TrainTypeConfig } from '../../../types';

export const UCHIBO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "shortName": "普通",
    "bgColor": "#0074be",
    "textColor": "#ffffff",
    "borderColor": "#0074be",
    "nameEn": "Local",
    "color": "#0074be"
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
  },
  "commuter_rapid": {
    "key": "commuter_rapid",
    "name": "通勤快速",
    "shortName": "通快",
    "bgColor": "#e05a00",
    "textColor": "#ffffff",
    "borderColor": "#e05a00",
    "nameEn": "Commuter Rapid",
    "color": "#e05a00"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急さざなみ",
    "shortName": "さざなみ",
    "bgColor": "#c9252d",
    "textColor": "#ffffff",
    "borderColor": "#c9252d",
    "nameEn": "Limited Express",
    "color": "#c9252d"
  }
};
