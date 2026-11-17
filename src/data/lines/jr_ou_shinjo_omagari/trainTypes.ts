import type { TrainTypeConfig } from '../../../types';

export const OU_SHINJO_OMAGARI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "regular": {
    "key": "regular",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#ff7e1c",
    "textColor": "#ffffff",
    "bgColor": "#ff7e1c",
    "borderColor": "#ff7e1c"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0073bc",
    "textColor": "#ffffff",
    "bgColor": "#0073bc",
    "borderColor": "#0073bc"
  }
};
