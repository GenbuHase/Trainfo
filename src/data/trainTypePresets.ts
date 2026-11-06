import type { TrainTypeConfig } from '../types';

/**
 * 列車種別のカラー設定定義
 */
export interface TrainTypeColorDef {
  /** バッジ・ピクトグラムの背景色・シンボルカラー (HEX) */
  color: string;
  /** バッジ・ピクトグラムの境界線色 (HEX) */
  borderColor: string;
}

/**
 * 列車種別の共通カラー定数（背景色・境界線色）
 */
export const TRAIN_TYPE_COLORS = {
  // ==========================================
  // 特急（Limited Express）
  // ==========================================
  /** JR東日本・首都圏標準特急レッド（東海道線、高崎線、上越線、宇都宮線、横須賀線、総武快速線、埼京線、川越線、武蔵野線、伊東線、御殿場線等） */
  LIMITED_EXP_STANDARD: {
    color: '#d32f2f',
    borderColor: '#b71c1c',
  },
  /** 中央線系統特急ワインレッド（中央線、中央本線、青梅線、五日市線、篠ノ井線、大糸線: あずさ・かいじ・富士回遊等） */
  LIMITED_EXP_CHUO: {
    color: '#be123c',
    borderColor: '#9f1239',
  },
  /** 新潟・信越系統特急夕日柿色（信越本線、白新線、羽越本線、妙高はねうまライン: いなほ・しらゆき等） */
  LIMITED_EXP_NIIGATA: {
    color: '#c2410c',
    borderColor: '#9a3412',
  },
  /** 常磐線系統特急レッド（常磐線快速、取手〜いわき、いわき〜仙台、成田線: ひたち・ときわ・成田エクスプレス等） */
  LIMITED_EXP_JOBAN: {
    color: '#e60012',
    borderColor: '#b8000e',
  },
  /** 房総特急ブルー（総武本線、外房線: しおさい・わかしお等） */
  LIMITED_EXP_BOSO: {
    color: '#0074be',
    borderColor: '#00558c',
  },
  /** 房総特急・京葉線クリムゾン（内房線、京葉線: さざなみ・わかしお等） */
  LIMITED_EXP_CRIMSON: {
    color: '#c9252d',
    borderColor: '#a11d24',
  },
  /** 東武鉄道特急レッド（スカイツリーライン、日光線、鬼怒川線、伊勢崎線等: スペーシア・リバティ・りょうもう等） */
  LIMITED_EXP_TOBU: {
    color: '#c8102e',
    borderColor: '#a30d25',
  },
  /** 小田急ロマンスカーバーミリオンオレンジ（小田原線、江ノ島線、多摩線） */
  LIMITED_EXP_ODAKYU: {
    color: '#dd3c00',
    borderColor: '#dd3c00',
  },

  // ==========================================
  // JR東日本・首都圏快速・特快・通勤快速
  // ==========================================
  /** JR東日本・首都圏標準快速ブルー（東海道線、高崎線、上越線、宇都宮線、湘南新宿ライン、上野東京ライン、伊東線、両毛線等） */
  JR_RAPID_STANDARD: {
    color: '#0073bc',
    borderColor: '#0073bc',
  },
  /** JR東日本・首都圏愛称付き快速オレンジ（快速アーバン、快速ラビット、快速アクティー共通） */
  JR_RAPID_NAMED: {
    color: '#e65100',
    borderColor: '#e65100',
  },
  /** JR東日本・首都圏通勤快速パープル（東海道線、高崎線、宇都宮線、上野東京ライン共通） */
  JR_COMMUTER_RAPID: {
    color: '#7b1fa2',
    borderColor: '#7b1fa2',
  },
  /** JR東日本・首都圏特別快速エメラルド（東海道線、湘南新宿ライン、上野東京ライン共通） */
  JR_SPECIAL_RAPID: {
    color: '#00897b',
    borderColor: '#00897b',
  },
  /** 常磐線特別快速ネイビー */
  JOBAN_SPECIAL_RAPID: {
    color: '#003366',
    borderColor: '#002244',
  },

  // ==========================================
  // 中央線特快・直通系統ファミリー
  // ==========================================
  /** 中央線・青梅線・五日市線 各駅停車グレー */
  CHUO_LOCAL: {
    color: '#475569',
    borderColor: '#64748b',
  },
  /** 中央線・青梅線・五日市線・篠ノ井線 快速オレンジバーミリオン */
  CHUO_RAPID: {
    color: '#eb5c01',
    borderColor: '#eb5c01',
  },
  /** 中央線・青梅線・五日市線 通勤快速パープル */
  CHUO_COMMUTER_RAPID: {
    color: '#9333ea',
    borderColor: '#c084fc',
  },
  /** 中央特快スカイブルー */
  CHUO_SPECIAL_RAPID: {
    color: '#0284c7',
    borderColor: '#38bdf8',
  },
  /** 青梅特快グリーン */
  OME_SPECIAL_RAPID: {
    color: '#16a34a',
    borderColor: '#4ade80',
  },
  /** 通勤特快レッド */
  COMMUTER_SPECIAL_RAPID: {
    color: '#dc2626',
    borderColor: '#f87171',
  },

  // ==========================================
  // 東武鉄道系統
  // ==========================================
  /** 東武鉄道 普通グレー */
  TOBU_LOCAL: {
    color: '#1e1c1c',
    borderColor: '#4a4646',
  },
  /** 東武鉄道 準急・区間準急グリーン */
  TOBU_SEMI_EXP: {
    color: '#009966',
    borderColor: '#009966',
  },
  /** 東武鉄道 急行・区間急行レッド */
  TOBU_EXP: {
    color: '#ed1a3d',
    borderColor: '#ed1a3d',
  },
  /** 東武鉄道 快速ブルー（会津・野岩・日光・鬼怒川直通） */
  TOBU_RAPID: {
    color: '#006699',
    borderColor: '#006699',
  },
  /** 東武鉄道 SL大樹ブラック＆ゴールド */
  TOBU_SL_TAIJU: {
    color: '#2b2b2b',
    borderColor: '#d4af37',
  },

  // ==========================================
  // 小田急電鉄系統
  // ==========================================
  /** 小田急 各駅停車ブルー */
  ODAKYU_LOCAL: {
    color: '#2288cc',
    borderColor: '#2288cc',
  },
  /** 小田急 準急・通勤準急グリーン */
  ODAKYU_SEMI_EXP: {
    color: '#009d6a',
    borderColor: '#009d6a',
  },
  /** 小田急 急行・通勤急行オレンジ */
  ODAKYU_EXPRESS: {
    color: '#ff5900',
    borderColor: '#ff5900',
  },
  /** 小田急 快速急行アンバーオレンジ */
  ODAKYU_RAPID_EXP: {
    color: '#f3962c',
    borderColor: '#f3962c',
  },

  // ==========================================
  // 相鉄線系統
  // ==========================================
  /** 相鉄線 各駅停車ヨコハマネイビーブルー */
  SOTETSU_LOCAL: {
    color: '#041452',
    borderColor: '#041452',
  },
  /** 相鉄線 快速ブルー */
  SOTETSU_RAPID: {
    color: '#0072bc',
    borderColor: '#00558c',
  },
  /** 相鉄線 急行レッド */
  SOTETSU_EXPRESS: {
    color: '#e60012',
    borderColor: '#b8000e',
  },
  /** 相鉄線 通勤急行山吹オレンジ */
  SOTETSU_COMMUTER_EXP: {
    color: '#e08a00',
    borderColor: '#b36e00',
  },
  /** 相鉄線 通勤特急ピンクマゼンタ */
  SOTETSU_COMMUTER_LTD_EXP: {
    color: '#e5007f',
    borderColor: '#b80066',
  },
  /** 相鉄線 特急オレンジ */
  SOTETSU_LTD_EXP: {
    color: '#f39800',
    borderColor: '#c67c00',
  },

  // ==========================================
  // 東急東横線・みなとみらい線系統
  // ==========================================
  /** 東急東横・みなとみらい線 急行レッド */
  TOKYU_EXPRESS: {
    color: '#da0442',
    borderColor: '#b00335',
  },
  /** 東急東横・みなとみらい線 通勤特急オレンジ */
  TOKYU_COMMUTER_LTD_EXP: {
    color: '#ea5504',
    borderColor: '#c44400',
  },
  /** 東急東横・みなとみらい線 特急オレンジ */
  TOKYU_LTD_EXP: {
    color: '#ea5504',
    borderColor: '#c44400',
  },

  // ==========================================
  // 直通ライナー
  // ==========================================
  /** S-TRAINライムグリーン（西武・メトロ・東急・みなとみらい直通） */
  STRAIN: {
    color: '#99cc00',
    borderColor: '#7ca600',
  },
  /** THライナー（日比谷線・東武スカイツリーライン直通） */
  TH_LINER: {
    color: '#c8102e',
    borderColor: '#960018',
  },
} as const satisfies Record<string, TrainTypeColorDef>;

/**
 * 特急（limitedExp）設定の共通生成ヘルパー
 */
export function createLimitedExp(
  colorDef: TrainTypeColorDef | string,
  borderColor?: string,
  textColor: string = '#ffffff'
): TrainTypeConfig {
  const color = typeof colorDef === 'string' ? colorDef : colorDef.color;
  const border = typeof colorDef === 'string' ? (borderColor || colorDef) : colorDef.borderColor;

  return {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color,
    textColor,
    bgColor: color,
    borderColor: border,
  };
}

/**
 * 特急（limitedExp）の共通プリセット定義
 */
export const LIMITED_EXP_PRESETS = {
  /** JR東日本・首都圏標準特急（東海道線、高崎線、上越線、宇都宮線、横須賀線、総武快速線、埼京線、川越線、武蔵野線、伊東線、御殿場線等） */
  STANDARD: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_STANDARD),

  /** 中央線系統特急（中央線、中央本線、青梅線、五日市線、篠ノ井線、大糸線） */
  CHUO: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_CHUO),

  /** 新潟・信越地区特急（信越本線、白新線、羽越本線、妙高はねうまライン） */
  NIIGATA: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_NIIGATA),

  /** 常磐線系統特急（常磐線快速、常磐線取手〜いわき、常磐線いわき〜仙台、成田線） */
  JOBAN: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_JOBAN),

  /** 房総特急ブルー（総武本線、外房線） */
  BOSO: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_BOSO),

  /** 房総特急・京葉線クリムゾン（内房線、京葉線） */
  CRIMSON: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_CRIMSON),

  /** 東武特急（スカイツリー、日光、鬼怒川、伊勢崎、桐生、佐野、宇都宮、会津、野岩） */
  TOBU: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_TOBU),

  /** 小田急ロマンスカー（小田原線、江ノ島線、多摩線） */
  ODAKYU: createLimitedExp(TRAIN_TYPE_COLORS.LIMITED_EXP_ODAKYU),
} as const;

/**
 * JR東日本・首都圏 快速・特快・通勤快速プリセット
 */
export const JR_RAPID_PRESETS = {
  /** 首都圏標準快速（東海道線、高崎線、上越線、宇都宮線、湘南新宿ライン、上野東京ライン、伊東線、両毛線等） */
  STANDARD: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: TRAIN_TYPE_COLORS.JR_RAPID_STANDARD.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JR_RAPID_STANDARD.color,
    borderColor: TRAIN_TYPE_COLORS.JR_RAPID_STANDARD.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速アーバン（高崎線、上越線、両毛線） */
  URBAN: {
    key: 'rapid_urban',
    name: '快速アーバン',
    nameEn: 'Rapid Urban',
    shortName: 'アーバン',
    color: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.color,
    borderColor: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速ラビット（宇都宮線） */
  RABBIT: {
    key: 'rapid_rabbit',
    name: '快速ラビット',
    nameEn: 'Rapid Rabbit',
    shortName: 'ラビット',
    color: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.color,
    borderColor: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速アクティー（東海道線） */
  ACTY: {
    key: 'rapid_acty',
    name: '快速アクティー',
    nameEn: 'Rapid Acty',
    shortName: 'アクティー',
    color: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.color,
    borderColor: TRAIN_TYPE_COLORS.JR_RAPID_NAMED.borderColor,
  } satisfies TrainTypeConfig,

  /** 首都圏標準通勤快速（東海道線、高崎線、宇都宮線、上野東京ライン等） */
  COMMUTER_RAPID: {
    key: 'commuter_rapid',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: TRAIN_TYPE_COLORS.JR_COMMUTER_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JR_COMMUTER_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.JR_COMMUTER_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 首都圏特別快速（東海道線、湘南新宿ライン、上野東京ライン等） */
  SPECIAL_RAPID: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: TRAIN_TYPE_COLORS.JR_SPECIAL_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JR_SPECIAL_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.JR_SPECIAL_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 常磐線特別快速（常磐線快速、取手〜いわき） */
  JOBAN_SPECIAL_RAPID: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: TRAIN_TYPE_COLORS.JOBAN_SPECIAL_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.JOBAN_SPECIAL_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.JOBAN_SPECIAL_RAPID.borderColor,
  } satisfies TrainTypeConfig,
} as const;

/**
 * 中央線特快・直通系統ファミリープリセット
 */
export const CHUO_PRESETS = {
  /** 各駅停車（中央線、青梅線、五日市線） */
  LOCAL: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: TRAIN_TYPE_COLORS.CHUO_LOCAL.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.CHUO_LOCAL.color,
    borderColor: TRAIN_TYPE_COLORS.CHUO_LOCAL.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速（中央線、中央本線、青梅線、五日市線、篠ノ井線） */
  RAPID: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: TRAIN_TYPE_COLORS.CHUO_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.CHUO_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.CHUO_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤快速（中央線、青梅線、五日市線） */
  COMMUTER: {
    key: 'commuter',
    name: '通勤快速',
    nameEn: 'Commuter Rapid',
    shortName: '通快',
    color: TRAIN_TYPE_COLORS.CHUO_COMMUTER_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.CHUO_COMMUTER_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.CHUO_COMMUTER_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 特別快速（ホリデー快速等） */
  SPECIAL_RAPID: {
    key: 'special_rapid',
    name: '特別快速',
    nameEn: 'Special Rapid',
    shortName: '特快',
    color: TRAIN_TYPE_COLORS.CHUO_SPECIAL_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.CHUO_SPECIAL_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.CHUO_SPECIAL_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 中央特快 */
  CHUO_SPECIAL_RAPID: {
    key: 'chuo_special_rapid',
    name: '中央特快',
    nameEn: 'Chuo Special Rapid',
    shortName: '中特',
    color: TRAIN_TYPE_COLORS.CHUO_SPECIAL_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.CHUO_SPECIAL_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.CHUO_SPECIAL_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 青梅特快 */
  OME_SPECIAL_RAPID: {
    key: 'ome_special_rapid',
    name: '青梅特快',
    nameEn: 'Ome Special Rapid',
    shortName: '青特',
    color: TRAIN_TYPE_COLORS.OME_SPECIAL_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.OME_SPECIAL_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.OME_SPECIAL_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤特快 */
  COMMUTER_SPECIAL_RAPID: {
    key: 'commuter_special_rapid',
    name: '通勤特快',
    nameEn: 'Commuter Special Rapid',
    shortName: '通特',
    color: TRAIN_TYPE_COLORS.COMMUTER_SPECIAL_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.COMMUTER_SPECIAL_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.COMMUTER_SPECIAL_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 中央線特急 */
  LIMITED_EXP: LIMITED_EXP_PRESETS.CHUO,
} as const;

/**
 * 東武鉄道系統プリセット
 */
export const TOBU_PRESETS = {
  /** 普通（東武本線・支線各線共通） */
  LOCAL: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普通',
    color: TRAIN_TYPE_COLORS.TOBU_LOCAL.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOBU_LOCAL.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_LOCAL.borderColor,
  } satisfies TrainTypeConfig,

  /** 準急 */
  SEMI_EXP: {
    key: 'semiExp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: TRAIN_TYPE_COLORS.TOBU_SEMI_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOBU_SEMI_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_SEMI_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 区間準急 */
  SECTION_SEMI: {
    key: 'section_semi',
    name: '区間準急',
    nameEn: 'Section Semi Express',
    shortName: '区準',
    color: TRAIN_TYPE_COLORS.TOBU_SEMI_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOBU_SEMI_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_SEMI_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 急行 */
  EXPRESS: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: TRAIN_TYPE_COLORS.TOBU_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOBU_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 区間急行 */
  SECTION_EXP: {
    key: 'section_exp',
    name: '区間急行',
    nameEn: 'Section Express',
    shortName: '区急',
    color: TRAIN_TYPE_COLORS.TOBU_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOBU_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速（東武日光線・鬼怒川線・野岩鉄道・会津鉄道直通） */
  RAPID: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: TRAIN_TYPE_COLORS.TOBU_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOBU_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** SL大樹 */
  SL_TAIJU: {
    key: 'sl_taiju',
    name: 'SL大樹',
    nameEn: 'SL Taiju',
    shortName: 'SL',
    color: TRAIN_TYPE_COLORS.TOBU_SL_TAIJU.color,
    textColor: '#d4af37',
    bgColor: TRAIN_TYPE_COLORS.TOBU_SL_TAIJU.color,
    borderColor: TRAIN_TYPE_COLORS.TOBU_SL_TAIJU.borderColor,
  } satisfies TrainTypeConfig,

  /** 特急（東武特急） */
  LIMITED_EXP: LIMITED_EXP_PRESETS.TOBU,
} as const;

/**
 * 相鉄線系統プリセット
 */
export const SOTETSU_PRESETS = {
  /** 各駅停車（相鉄本線、いずみ野線、新横浜線） */
  LOCAL: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: TRAIN_TYPE_COLORS.SOTETSU_LOCAL.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.SOTETSU_LOCAL.color,
    borderColor: TRAIN_TYPE_COLORS.SOTETSU_LOCAL.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速 */
  RAPID: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快速',
    color: TRAIN_TYPE_COLORS.SOTETSU_RAPID.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.SOTETSU_RAPID.color,
    borderColor: TRAIN_TYPE_COLORS.SOTETSU_RAPID.borderColor,
  } satisfies TrainTypeConfig,

  /** 急行 */
  EXPRESS: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: TRAIN_TYPE_COLORS.SOTETSU_EXPRESS.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.SOTETSU_EXPRESS.color,
    borderColor: TRAIN_TYPE_COLORS.SOTETSU_EXPRESS.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤急行 */
  COMMUTER_EXP: {
    key: 'commuter_exp',
    name: '通勤急行',
    nameEn: 'Commuter Express',
    shortName: '通急',
    color: TRAIN_TYPE_COLORS.SOTETSU_COMMUTER_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.SOTETSU_COMMUTER_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.SOTETSU_COMMUTER_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤特急 */
  COMMUTER_LTD_EXP: {
    key: 'commuter_ltd_exp',
    name: '通勤特急',
    nameEn: 'Commuter Limited Express',
    shortName: '通特',
    color: TRAIN_TYPE_COLORS.SOTETSU_COMMUTER_LTD_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.SOTETSU_COMMUTER_LTD_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.SOTETSU_COMMUTER_LTD_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 特急 */
  LIMITED_EXP: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: TRAIN_TYPE_COLORS.SOTETSU_LTD_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.SOTETSU_LTD_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.SOTETSU_LTD_EXP.borderColor,
  } satisfies TrainTypeConfig,
} as const;

/**
 * 東急東横線・みなとみらい線系統プリセット
 */
export const TOKYU_PRESETS = {
  /** 急行 */
  EXPRESS: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: TRAIN_TYPE_COLORS.TOKYU_EXPRESS.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOKYU_EXPRESS.color,
    borderColor: TRAIN_TYPE_COLORS.TOKYU_EXPRESS.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤特急 */
  COMMUTER_LTD_EXP: {
    key: 'commuter_ltd_exp',
    name: '通勤特急',
    nameEn: 'Commuter Ltd. Exp.',
    shortName: '通特',
    color: TRAIN_TYPE_COLORS.TOKYU_COMMUTER_LTD_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOKYU_COMMUTER_LTD_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.TOKYU_COMMUTER_LTD_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 特急 */
  LTD_EXP: {
    key: 'ltd_exp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: TRAIN_TYPE_COLORS.TOKYU_LTD_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TOKYU_LTD_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.TOKYU_LTD_EXP.borderColor,
  } satisfies TrainTypeConfig,
} as const;

/**
 * 直通ライナー共通プリセット
 */
export const LINER_PRESETS = {
  /** S-TRAIN（西武池袋線、西武有楽町線、東京メトロ有楽町線、副都心線、東急東横線、みなとみらい線直通） */
  STRAIN: {
    key: 'strain',
    name: 'S-TRAIN',
    nameEn: 'S-TRAIN',
    shortName: 'S',
    color: TRAIN_TYPE_COLORS.STRAIN.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.STRAIN.color,
    borderColor: TRAIN_TYPE_COLORS.STRAIN.borderColor,
  } satisfies TrainTypeConfig,

  /** THライナー（東京メトロ日比谷線、東武スカイツリーライン直通） */
  TH_LINER: {
    key: 'th_liner',
    name: 'THライナー',
    nameEn: 'TH LINER',
    shortName: 'TH',
    color: TRAIN_TYPE_COLORS.TH_LINER.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.TH_LINER.color,
    borderColor: TRAIN_TYPE_COLORS.TH_LINER.borderColor,
  } satisfies TrainTypeConfig,
} as const;

/**
 * 小田急電鉄系統プリセット
 */
export const ODAKYU_PRESETS = {
  /** 各駅停車 */
  LOCAL: {
    key: 'local',
    name: '各駅停車',
    nameEn: 'Local',
    shortName: '各停',
    color: TRAIN_TYPE_COLORS.ODAKYU_LOCAL.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.ODAKYU_LOCAL.color,
    borderColor: TRAIN_TYPE_COLORS.ODAKYU_LOCAL.borderColor,
  } satisfies TrainTypeConfig,

  /** 準急 */
  SEMI_EXP: {
    key: 'semiExp',
    name: '準急',
    nameEn: 'Semi Express',
    shortName: '準急',
    color: TRAIN_TYPE_COLORS.ODAKYU_SEMI_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.ODAKYU_SEMI_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.ODAKYU_SEMI_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤準急 */
  COMMUTER_SEMI: {
    key: 'commuter_semi',
    name: '通勤準急',
    nameEn: 'Commuter Semi Express',
    shortName: '通準',
    color: TRAIN_TYPE_COLORS.ODAKYU_SEMI_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.ODAKYU_SEMI_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.ODAKYU_SEMI_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 急行 */
  EXPRESS: {
    key: 'express',
    name: '急行',
    nameEn: 'Express',
    shortName: '急行',
    color: TRAIN_TYPE_COLORS.ODAKYU_EXPRESS.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.ODAKYU_EXPRESS.color,
    borderColor: TRAIN_TYPE_COLORS.ODAKYU_EXPRESS.borderColor,
  } satisfies TrainTypeConfig,

  /** 通勤急行 */
  COMMUTER_EXP: {
    key: 'commuter_exp',
    name: '通勤急行',
    nameEn: 'Commuter Express',
    shortName: '通急',
    color: TRAIN_TYPE_COLORS.ODAKYU_EXPRESS.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.ODAKYU_EXPRESS.color,
    borderColor: TRAIN_TYPE_COLORS.ODAKYU_EXPRESS.borderColor,
  } satisfies TrainTypeConfig,

  /** 快速急行 */
  RAPID_EXP: {
    key: 'rapidExp',
    name: '快速急行',
    nameEn: 'Rapid Express',
    shortName: '快急',
    color: TRAIN_TYPE_COLORS.ODAKYU_RAPID_EXP.color,
    textColor: '#ffffff',
    bgColor: TRAIN_TYPE_COLORS.ODAKYU_RAPID_EXP.color,
    borderColor: TRAIN_TYPE_COLORS.ODAKYU_RAPID_EXP.borderColor,
  } satisfies TrainTypeConfig,

  /** 特急（ロマンスカー） */
  LIMITED_EXP: LIMITED_EXP_PRESETS.ODAKYU,
} as const;
