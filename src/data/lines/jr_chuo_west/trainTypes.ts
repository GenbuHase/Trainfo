import type { TrainTypeConfig } from '../../../types';

export const JR_CHUO_WEST_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#187fc4",
    "textColor": "#ffffff",
    "bgColor": "#187fc4",
    "borderColor": "#187fc4"
  },
  "semi_rapid": {
    "key": "semi_rapid",
    "name": "区間快速",
    "nameEn": "Regional Rapid",
    "shortName": "区快",
    "color": "#22ac38",
    "textColor": "#ffffff",
    "bgColor": "#22ac38",
    "borderColor": "#198754"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0082ba",
    "textColor": "#ffffff",
    "bgColor": "#0082ba",
    "borderColor": "#006591"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#d32f2f",
    "textColor": "#ffffff",
    "bgColor": "#d32f2f",
    "borderColor": "#b71c1c"
  }
};
