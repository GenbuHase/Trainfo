import type { TrainTypeConfig } from '../../../types';

export const KEIKYU_ZUSHI_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  "local": {
    "key": "local",
    "name": "普通",
    "nameEn": "Local",
    "shortName": "普通",
    "color": "#334155",
    "textColor": "#ffffff",
    "bgColor": "#334155",
    "borderColor": "#1e293b"
  },
  "express": {
    "key": "express",
    "name": "急行",
    "nameEn": "Express",
    "shortName": "急行",
    "color": "#0073bc",
    "textColor": "#ffffff",
    "bgColor": "#0073bc",
    "borderColor": "#00558f"
  },
  "limited_exp": {
    "key": "limited_exp",
    "name": "特急",
    "nameEn": "Limited Express",
    "shortName": "特急",
    "color": "#e60012",
    "textColor": "#ffffff",
    "bgColor": "#e60012",
    "borderColor": "#b8000e"
  },
  "rapid_exp": {
    "key": "rapid_exp",
    "name": "快特",
    "nameEn": "Ltd. Exp. (Kaitoku)",
    "shortName": "快特",
    "color": "#009944",
    "textColor": "#ffffff",
    "bgColor": "#009944",
    "borderColor": "#007a36"
  },
  "access_exp": {
    "key": "access_exp",
    "name": "エアポート快特",
    "nameEn": "Airport Kaitoku",
    "shortName": "エ快",
    "color": "#f37321",
    "textColor": "#ffffff",
    "bgColor": "#f37321",
    "borderColor": "#d45d10"
  },
  "liner": {
    "key": "liner",
    "name": "ウィング号",
    "nameEn": "Wing",
    "shortName": "ウィング",
    "color": "#6a1b9a",
    "textColor": "#ffffff",
    "bgColor": "#6a1b9a",
    "borderColor": "#4a148c"
  }
};
