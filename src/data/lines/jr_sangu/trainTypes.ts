import type { TrainTypeConfig } from '../../../types';

export const JR_SANGU_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#ff7322",
    "textColor": "#ffffff",
    "bgColor": "#ff7322",
    "borderColor": "#ff7322"
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
  "rapid_mie": {
    "key": "rapid_mie",
    "name": "快速みえ",
    "nameEn": "Rapid Mie",
    "shortName": "みえ",
    "color": "#ff7322",
    "textColor": "#ffffff",
    "bgColor": "#ff7322",
    "borderColor": "#cc5200"
  }
};
