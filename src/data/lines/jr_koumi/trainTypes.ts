import type { TrainTypeConfig } from '../../../types';

export const JR_KOUMI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "regular": {
    "key": "regular",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#009944",
    "textColor": "#ffffff",
    "bgColor": "#009944",
    "borderColor": "#007a36"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#0284c7",
    "textColor": "#ffffff",
    "bgColor": "#0284c7",
    "borderColor": "#0369a1"
  }
};
