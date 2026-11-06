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
} as const satisfies Record<string, TrainTypeColorDef>;

/**
 * 特急（limitedExp）設定の共通生成ヘルパー
 * 定数定義オブジェクト（TrainTypeColorDef）または個別HEXカラーを受け取って TrainTypeConfig を生成します
 */
export function createLimitedExp(
  colorDef: TrainTypeColorDef | string,
  borderColor?: string,
  textColor: string = '#ffffff'
): TrainTypeConfig {
  if (typeof colorDef === 'string') {
    return {
      key: 'limitedExp',
      name: '特急',
      nameEn: 'Limited Express',
      shortName: '特急',
      color: colorDef,
      textColor,
      bgColor: colorDef,
      borderColor: borderColor || colorDef,
    };
  }

  return {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特急',
    color: colorDef.color,
    textColor,
    bgColor: colorDef.color,
    borderColor: colorDef.borderColor,
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
} as const;
