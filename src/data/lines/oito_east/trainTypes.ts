// JR東日本 大糸線 列車種別定義
import type { TrainTypeConfig } from '../../../types';

export const OITO_EAST_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "regular": {
    "key": "regular",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#8a579e",
    "textColor": "#ffffff",
    "bgColor": "#8a579e",
    "borderColor": "#734185"
  },
  "rapid": {
    "key": "rapid",
    "name": "快速",
    "nameEn": "Rapid",
    "shortName": "快速",
    "color": "#00ac9a",
    "textColor": "#ffffff",
    "bgColor": "#00ac9a",
    "borderColor": "#007a6d"
  },
  "limitedExp": {
    "key": "limitedExp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#e21f26",
    "textColor": "#ffffff",
    "bgColor": "#e21f26",
    "borderColor": "#ad1117"
  }
};
