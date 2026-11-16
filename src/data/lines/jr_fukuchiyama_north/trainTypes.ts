import type { TrainTypeConfig } from '../../../types';

export const JR_FUKUCHIYAMA_NORTH_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#fcc800",
    "textColor": "#ffffff",
    "bgColor": "#fcc800",
    "borderColor": "#fcc800"
  },
  "tambaji_rapid": {
    "key": "tambaji_rapid",
    "name": "丹波路快速",
    "nameEn": "Tambaji Rapid",
    "shortName": "丹快",
    "color": "#fcc800",
    "textColor": "#000000",
    "bgColor": "#fcc800",
    "borderColor": "#c09800"
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
