import type { TrainTypeConfig } from '../../../types';

export const JR_TAKETOYO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#6f3c1d",
    "textColor": "#ffffff",
    "bgColor": "#6f3c1d",
    "borderColor": "#6f3c1d"
  },
  "semi_rapid": {
    "key": "semi_rapid",
    "name": "区間快速",
    "nameEn": "Semi Rapid",
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
    "color": "#0082ba",
    "textColor": "#ffffff",
    "bgColor": "#0082ba",
    "borderColor": "#006591"
  }
};
