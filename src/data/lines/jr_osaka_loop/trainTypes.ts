import type { TrainTypeConfig } from '../../../types';

export const JR_OSAKA_LOOP_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#e72227",
    "textColor": "#ffffff",
    "bgColor": "#e72227",
    "borderColor": "#e72227"
  },
  "direct_rapid": {
    "key": "direct_rapid",
    "name": "直通快速",
    "nameEn": "Direct Rapid",
    "shortName": "直快",
    "color": "#884898",
    "textColor": "#ffffff",
    "bgColor": "#884898",
    "borderColor": "#602870"
  },
  "yamatoji_rapid": {
    "key": "yamatoji_rapid",
    "name": "大和路快速",
    "nameEn": "Yamatoji Rapid",
    "shortName": "大快",
    "color": "#00a960",
    "textColor": "#ffffff",
    "bgColor": "#00a960",
    "borderColor": "#007040"
  },
  "kanku_rapid": {
    "key": "kanku_rapid",
    "name": "関空快速",
    "nameEn": "Kansai Airport Rapid",
    "shortName": "関快",
    "color": "#0072bc",
    "textColor": "#ffffff",
    "bgColor": "#0072bc",
    "borderColor": "#005080"
  },
  "kishuji_rapid": {
    "key": "kishuji_rapid",
    "name": "紀州路快速",
    "nameEn": "Kishuji Rapid",
    "shortName": "紀快",
    "color": "#f39800",
    "textColor": "#ffffff",
    "bgColor": "#f39800",
    "borderColor": "#b87200"
  }
};
