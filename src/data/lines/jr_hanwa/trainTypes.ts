import type { TrainTypeConfig } from '../../../types';

export const JR_HANWA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#f39800",
    "textColor": "#ffffff",
    "bgColor": "#f39800",
    "borderColor": "#f39800"
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
  "kanku_rapid": {
    "key": "kanku_rapid",
    "name": "関空快速",
    "nameEn": "Kansai Airport Rapid",
    "shortName": "関快",
    "color": "#0072bc",
    "textColor": "#ffffff",
    "bgColor": "#0072bc",
    "borderColor": "#005080"
  },
  "kishuji_rapid": {
    "key": "kishuji_rapid",
    "name": "紀州路快速",
    "nameEn": "Kishuji Rapid",
    "shortName": "紀快",
    "color": "#f39800",
    "textColor": "#ffffff",
    "bgColor": "#f39800",
    "borderColor": "#b87200"
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
