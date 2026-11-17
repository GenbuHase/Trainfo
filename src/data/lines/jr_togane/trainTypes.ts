import type { TrainTypeConfig } from '../../../types';

export const TOGANE_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "shortName": "普通",
    "bgColor": "#f39800",
    "textColor": "#ffffff",
    "borderColor": "#f39800",
    "nameEn": "Local",
    "color": "#f39800"
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
  }
};
