import type { TrainTypeConfig } from '../../../types';

export const JR_ECHIGO_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "regular": {
    "key": "regular",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#008c38",
    "textColor": "#ffffff",
    "bgColor": "#008c38",
    "borderColor": "#006b2b"
  },
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#008c38",
    "textColor": "#ffffff",
    "bgColor": "#008c38",
    "borderColor": "#006b2b"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#007ac1",
    "textColor": "#ffffff",
    "bgColor": "#007ac1",
    "borderColor": "#005f99"
  }
};
