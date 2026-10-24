import type { TrainTypeConfig } from '../../../types';

/**
 * JR羽越本線 列車種別設定
 *
 * ラインカラー：羽越本線の公式ラインカラーはニコニコ大百科・Wikipediaの
 * 「日本の鉄道路線ラインカラー一覧」に掲載されていないため、
 * JR東日本新潟地区の在来線案内色を根拠に緑系を暫定採用。
 * 後日、公式案内色が判明次第 lineColor/accentColor を差し替えること
 *（プレイブック LINE_COLORS_GUIDELINES.md 優先①・②の方針に従う）。
 */
export const UETSU_MAIN_TRAIN_TYPES: Record<string, TrainTypeConfig> = {
  local: {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#2e7d32',
    textColor: '#ffffff',
    bgColor: '#2e7d32',
    borderColor: '#1b5e20',
  },
  rapid: {
    key: 'rapid',
    name: '快速',
    nameEn: 'Rapid',
    shortName: '快',
    color: '#1b5e20',
    textColor: '#ffffff',
    bgColor: '#1b5e20',
    borderColor: '#003300',
  },
  limitedExp: {
    key: 'limitedExp',
    name: '特急',
    nameEn: 'Limited Express',
    shortName: '特',
    color: '#c2410c',
    textColor: '#ffffff',
    bgColor: '#c2410c',
    borderColor: '#9a3412',
  },
};
