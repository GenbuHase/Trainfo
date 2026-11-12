import type { TrainTypeConfig } from '../../../types';

export const JR_WAKAYAMA_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#e60072",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#e60072",
    "borderColor": "#e60072"
  },
  "rapid": {
    "name": "快速",
    "shortName": "快速",
    "color": "#ff7700",
    "key": "rapid",
    "nameEn": "Rapid",
    "textColor": "#ffffff",
    "bgColor": "#ff7700",
    "borderColor": "#ff7700"
  }
};
