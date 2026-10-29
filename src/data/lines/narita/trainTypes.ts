import type { TrainTypeConfig } from '../../../types';

export const NARITA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "shortName": "普通",
    "bgColor": "#00b261",
    "textColor": "#ffffff",
    "borderColor": "#00b261",
    "nameEn": "Local",
    "color": "#00b261"
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
    "name": "特急成田エクスプレス",
    "shortName": "N'EX",
    "bgColor": "#e60012",
    "textColor": "#ffffff",
    "borderColor": "#e60012",
    "nameEn": "Limited Express",
    "color": "#e60012"
  }
};
