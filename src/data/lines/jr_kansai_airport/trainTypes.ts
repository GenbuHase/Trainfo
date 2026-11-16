import type { TrainTypeConfig } from '../../../types';

export const JR_KANSAI_AIRPORT_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#0072bc",
    "textColor": "#ffffff",
    "bgColor": "#0072bc",
    "borderColor": "#0072bc"
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
