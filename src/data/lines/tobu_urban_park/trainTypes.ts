// tobu_urban_park 列車種別設定
import type { TrainTypeConfig } from '../../../types';

export const TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
      "key": "local",
      "name": "普通",
      "nameEn": "Local",
      "shortName": "普通",
      "color": "#1e1c1c",
      "textColor": "#ffffff",
      "bgColor": "#1e1c1c",
      "borderColor": "#4a4646"
  },
  section_exp: {
      "key": "section_exp",
      "name": "区間急行",
      "nameEn": "Section Express",
      "shortName": "区急",
      "color": "#ed1a3d",
      "textColor": "#ffffff",
      "bgColor": "#ed1a3d",
      "borderColor": "#ed1a3d"
  },
  express: {
      "key": "express",
      "name": "急行",
      "nameEn": "Express",
      "shortName": "急行",
      "color": "#ed1a3d",
      "textColor": "#ffffff",
      "bgColor": "#ed1a3d",
      "borderColor": "#ed1a3d"
  },
};
