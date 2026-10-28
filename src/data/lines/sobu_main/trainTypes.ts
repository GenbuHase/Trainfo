import type { TrainTypeConfig } from '../../../types';

export const SOBU_MAIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "shortName": "普通",
    "bgColor": "#ffc20e",
    "textColor": "#000000",
    "borderColor": "#ffc20e",
    "nameEn": "Local",
    "color": "#ffc20e"
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
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急しおさい",
    "shortName": "しおさい",
    "bgColor": "#0074be",
    "textColor": "#ffffff",
    "borderColor": "#0074be",
    "nameEn": "Limited Express",
    "color": "#0074be"
  }
};
