import type { TrainTypeConfig } from '../../../types';

export const JR_TAKARAZUKA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
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
