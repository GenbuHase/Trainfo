// tobu_skytree 列車種別設定
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
  section_semi: {
      "key": "section_semi",
      "name": "区間準急",
      "nameEn": "Section Semi Express",
      "shortName": "区準",
      "color": "#009966",
      "textColor": "#ffffff",
      "bgColor": "#009966",
      "borderColor": "#009966"
  },
  semiExp: {
      "key": "semiExp",
      "name": "準急",
      "nameEn": "Semi Express",
      "shortName": "準急",
      "color": "#009966",
      "textColor": "#ffffff",
      "bgColor": "#009966",
      "borderColor": "#009966"
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
  th_liner: {
      "key": "th_liner",
      "name": "THライナー",
      "nameEn": "TH LINER",
      "shortName": "TH",
      "color": "#787878",
      "textColor": "#ffffff",
      "bgColor": "#787878",
      "borderColor": "#f39700"
  },
  limitedExp: {
      "key": "limitedExp",
      "name": "特急",
      "nameEn": "Limited Express",
      "shortName": "特急",
      "color": "#c8102e",
      "textColor": "#ffffff",
      "bgColor": "#c8102e",
      "borderColor": "#c8102e"
  },
};
