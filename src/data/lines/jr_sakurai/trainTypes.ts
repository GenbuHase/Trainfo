import type { TrainTypeConfig } from '../../../types';

export const JR_SAKURAI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "name": "普通",
    "shortName": "普通",
    "color": "#be0049",
    "key": "local",
    "nameEn": "Local",
    "textColor": "#ffffff",
    "bgColor": "#be0049",
    "borderColor": "#be0049"
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
