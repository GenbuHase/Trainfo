import type { TrainTypeConfig } from '../../../types';

export const TOKYO_MONORAIL_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#003686",
    "textColor": "#ffffff",
    "bgColor": "#003686",
    "borderColor": "#002255"
  },
  "semi_rapid": {
    "key": "semi_rapid",
    "name": "区間快速",
    "nameEn": "Semi-Rapid",
    "shortName": "区快",
    "color": "#009944",
    "textColor": "#ffffff",
    "bgColor": "#009944",
    "borderColor": "#007a36"
  },
  "rapid": {
    "key": "rapid",
    "name": "空港快速",
    "nameEn": "Haneda Express",
    "shortName": "空快",
    "color": "#e65100",
    "textColor": "#ffffff",
    "bgColor": "#e65100",
    "borderColor": "#bf360c"
  }
};
