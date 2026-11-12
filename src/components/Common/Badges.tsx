import React from 'react';
import type { TrainTypeKey, LineId, CustomTrainTypeConfig } from '../../types';
import { getTrainTypeConfig } from '../../data/linesRegistry';

interface StationBadgeColor {
  borderColor: string;
  prefixColor: string;
  numColor: string;
}

const STATION_BADGE_COLORS: Record<string, StationBadgeColor> = {
  // 東武東上線・越生線
  TJ: {
    borderColor: '#004098',
    prefixColor: '#ed6d00',
    numColor: '#004098',
  },
  // 東武スカイツリーライン・亀戸線・大師線
  TS: {
    borderColor: '#004098',
    prefixColor: '#226bb8',
    numColor: '#004098',
  },
  // 東武伊勢崎線・佐野線・小泉線・桐生線
  TI: {
    borderColor: '#004098',
    prefixColor: '#e40012',
    numColor: '#004098',
  },
  // 東武日光線・宇都宮線・鬼怒川線
  TN: {
    borderColor: '#004098',
    prefixColor: '#f6a202',
    numColor: '#004098',
  },
  // 東武アーバンパークライン（野田線）
  TD: {
    borderColor: '#004098',
    prefixColor: '#41b3e5',
    numColor: '#004098',
  },
  // JR埼京線・JR川越線
  JA: {
    borderColor: '#00ac84',
    prefixColor: '#00ac84',
    numColor: '#007060',
  },
  // JR武蔵野線
  JM: {
    borderColor: '#eb5c01',
    prefixColor: '#eb5c01',
    numColor: '#c83e0c',
  },
  // JR京葉線
  JE: {
    borderColor: '#cf1225',
    prefixColor: '#cf1225',
    numColor: '#a11820',
  },
  // JR山手線
  JY: {
    borderColor: '#80c241',
    prefixColor: '#80c241',
    numColor: '#598c25',
  },
  // JR中央・総武線各駅停車
  JB: {
    borderColor: '#ffd400',
    prefixColor: '#ffd400',
    numColor: '#8a7500',
  },
  // JR横浜線
  JH: {
    borderColor: '#80c241',
    prefixColor: '#80c241',
    numColor: '#598c25',
  },
  // JR南武線
  JN: {
    borderColor: '#ffd400',
    prefixColor: '#ffd400',
    numColor: '#8a7500',
  },
  // JR鶴見線
  JI: {
    borderColor: '#ffd400',
    prefixColor: '#ffd400',
    numColor: '#8a7500',
  },
  // JR中央線
  JC: {
    borderColor: '#eb5c01',
    prefixColor: '#eb5c01',
    numColor: '#b83b00',
  },
  // JR宇都宮線・高崎線 (大宮地上ホーム)
  JU: {
    borderColor: '#f68b1e',
    prefixColor: '#f68b1e',
    numColor: '#cc6600',
  },
  // JR京浜東北線
  JK: {
    borderColor: '#00a7e3',
    prefixColor: '#00a7e3',
    numColor: '#007aa8',
  },
  // JR湘南新宿ライン
  JS: {
    borderColor: '#de0515',
    prefixColor: '#de0515',
    numColor: '#ad1117',
  },
  // つくばエクスプレス (首都圏新都市鉄道)
  TX: {
    borderColor: '#003b83',
    prefixColor: '#d20012',
    numColor: '#003b83',
  },
  // 小田急小田原線
  OH: {
    borderColor: '#2288cc',
    prefixColor: '#2288cc',
    numColor: '#005b9e',
  },
  // 小田急江ノ島線
  OE: {
    borderColor: '#2288cc',
    prefixColor: '#2288cc',
    numColor: '#005b9e',
  },
  // 小田急多摩線
  OT: {
    borderColor: '#2288cc',
    prefixColor: '#2288cc',
    numColor: '#005b9e',
  },
  // 東京臨海高速鉄道りんかい線
  R: {
    borderColor: '#00418e',
    prefixColor: '#00418e',
    numColor: '#00418e',
  },
  // 東京メトロ有楽町線
  Y: {
    borderColor: '#c1a470',
    prefixColor: '#c1a470',
    numColor: '#8c6e3b',
  },
  // 東京メトロ副都心線
  F: {
    borderColor: '#9c5e31',
    prefixColor: '#9c5e31',
    numColor: '#7a3e0c',
  },
  // 西武池袋線・西武有楽町線・西武秩父線
  SI: {
    borderColor: '#ff6600',
    prefixColor: '#ff6600',
    numColor: '#cc5200',
  },
  // 秩父鉄道秩父本線
  CR: {
    borderColor: '#01479d',
    prefixColor: '#01479d',
    numColor: '#005b94',
  },
  // 東急東横線
  TY: {
    borderColor: '#da0442',
    prefixColor: '#da0442',
    numColor: '#a80030',
  },
  // 横浜高速鉄道みなとみらい線
  MM: {
    borderColor: '#09357f',
    prefixColor: '#09357f',
    numColor: '#052254',
  },
  // 東急新横浜線
  SH: {
    borderColor: '#8a1186',
    prefixColor: '#8a1186',
    numColor: '#5c0859',
  },
  // 相模鉄道 (相鉄本線・いずみ野線・新横浜線)
  SO: {
    borderColor: '#041452',
    prefixColor: '#041452',
    numColor: '#020b2b',
  },
  // 東京メトロ千代田線
  C: {
    borderColor: '#00bb85',
    prefixColor: '#00bb85',
    numColor: '#008a62',
  },
  // 東京メトロ日比谷線
  H: {
    borderColor: '#9caeb7',
    prefixColor: '#9caeb7',
    numColor: '#60727b',
  },
  // 東京メトロ丸ノ内線
  M: {
    borderColor: '#e60012',
    prefixColor: '#e60012',
    numColor: '#b3000e',
  },
  Mb: {
    borderColor: '#e60012',
    prefixColor: '#e60012',
    numColor: '#b3000e',
  },
  m: {
    borderColor: '#e60012',
    prefixColor: '#e60012',
    numColor: '#b3000e',
  },
  // 東京メトロ半蔵門線
  Z: {
    borderColor: '#9b7cb6',
    prefixColor: '#9b7cb6',
    numColor: '#785694',
  },
  // 東京メトロ銀座線
  G: {
    borderColor: '#f39700',
    prefixColor: '#f39700',
    numColor: '#b87200',
  },
  // 東京メトロ南北線
  N: {
    borderColor: '#00ac9a',
    prefixColor: '#00ac9a',
    numColor: '#008274',
  },
  // 東京メトロ東西線
  T: {
    borderColor: '#00a7db',
    prefixColor: '#00a7db',
    numColor: '#007ea6',
  },
  // JR常磐線各駅停車
  JL: {
    borderColor: '#9e9e9f',
    prefixColor: '#9e9e9f',
    numColor: '#707071',
  },
  // JR常磐線快速
  JJ: {
    borderColor: '#00c18a',
    prefixColor: '#00c18a',
    numColor: '#00966b',
  },
  // JR東海道線・JR伊東線
  JT: {
    borderColor: '#f68b1e',
    prefixColor: '#f68b1e',
    numColor: '#cc6600',
  },
  // JR横須賀線・JR総武快速線
  JO: {
    borderColor: '#0074be',
    prefixColor: '#0074be',
    numColor: '#00558a',
  },
  // JR東海 東海道本線
  CA: {
    borderColor: '#ff7322',
    prefixColor: '#ff7322',
    numColor: '#cc5200',
  },
  // JR東海 身延線
  CC: {
    borderColor: '#931b2c',
    prefixColor: '#931b2c',
    numColor: '#70101d',
  },
  // JR東海 飯田線
  CD: {
    borderColor: '#228b22',
    prefixColor: '#228b22',
    numColor: '#176317',
  },
  // JR東海 武豊線
  CE: {
    borderColor: '#6f3c1d',
    prefixColor: '#6f3c1d',
    numColor: '#4f2710',
  },
  // JR東海 中央本線
  CF: {
    borderColor: '#187fc4',
    prefixColor: '#187fc4',
    numColor: '#0e5c91',
  },
  // JR東海 高山本線
  CG: {
    borderColor: '#9b1b30',
    prefixColor: '#9b1b30',
    numColor: '#731121',
  },
  // JR東海 太多線
  CI: {
    borderColor: '#d97706',
    prefixColor: '#d97706',
    numColor: '#a15500',
  },
  // JR東海 関西本線
  CJ: {
    borderColor: '#00a960',
    prefixColor: '#00a960',
    numColor: '#007542',
  },
  // 富士急行線
  FJ: {
    borderColor: '#0066b3',
    prefixColor: '#0066b3',
    numColor: '#0066b3',
  },
  // JR御殿場線
  CB: {
    borderColor: '#1b75bc',
    prefixColor: '#1b75bc',
    numColor: '#1b75bc',
  },
  // 伊豆急行線
  IZ: {
    borderColor: '#0099cc',
    prefixColor: '#0099cc',
    numColor: '#0099cc',
  },
  // 伊豆箱根鉄道駿豆線
  IS: {
    borderColor: '#0073be',
    prefixColor: '#0073be',
    numColor: '#0073be',
  },
  // JR西日本 アーバンネットワーク 東海道本線・山陽本線・北陸本線・赤穂線（琵琶湖線・JR京都線・JR神戸線）
  'JR-A': {
    borderColor: '#0072bc',
    prefixColor: '#0072bc',
    numColor: '#005a96',
  },
  // JR西日本 湖西線
  'JR-B': {
    borderColor: '#00a0e9',
    prefixColor: '#00a0e9',
    numColor: '#007ab8',
  },
  // JR西日本 草津線
  'JR-C': {
    borderColor: '#74a034',
    prefixColor: '#74a034',
    numColor: '#527521',
  },
  // JR西日本 奈良線
  'JR-D': {
    borderColor: '#996633',
    prefixColor: '#996633',
    numColor: '#6e4720',
  },
  // JR西日本 山陰本線・嵯峨野線
  'JR-E': {
    borderColor: '#884898',
    prefixColor: '#884898',
    numColor: '#653173',
  },
  // JR西日本 おおさか東線
  'JR-F': {
    borderColor: '#384c97',
    prefixColor: '#384c97',
    numColor: '#263469',
  },
  // JR西日本 福知山線・JR宝塚線
  'JR-G': {
    borderColor: '#fcc800',
    prefixColor: '#fcc800',
    numColor: '#9e7d00',
  },
  // JR西日本 JR東西線・学研都市線
  'JR-H': {
    borderColor: '#e85298',
    prefixColor: '#e85298',
    numColor: '#b83272',
  },
  // JR西日本 大阪環状線
  'JR-O': {
    borderColor: '#e72227',
    prefixColor: '#e72227',
    numColor: '#b01519',
  },
  // JR西日本 JRゆめ咲線（桜島線）
  'JR-P': {
    borderColor: '#001e62',
    prefixColor: '#001e62',
    numColor: '#00123d',
  },
  // JR西日本 関西本線（大和路線）
  'JR-Q': {
    borderColor: '#00a960',
    prefixColor: '#00a960',
    numColor: '#007542',
  },
  // JR西日本 阪和線
  'JR-R': {
    borderColor: '#f39800',
    prefixColor: '#f39800',
    numColor: '#b57100',
  },
  // JR西日本 関西空港線
  'JR-S': {
    borderColor: '#0072bc',
    prefixColor: '#0072bc',
    numColor: '#005287',
  },
  // JR西日本 和歌山線
  'JR-T': {
    borderColor: '#e60072',
    prefixColor: '#e60072',
    numColor: '#a80053',
  },
  // JR西日本 桜井線（万葉まほろば線）
  'JR-U': {
    borderColor: '#be0049',
    prefixColor: '#be0049',
    numColor: '#8a0035',
  },
  // JR西日本 紀勢本線（きのくに線）
  'JR-W': {
    borderColor: '#00a7db',
    prefixColor: '#00a7db',
    numColor: '#00779e',
  },
};


const DEFAULT_BADGE_COLOR: StationBadgeColor = {
  borderColor: '#64748b',
  prefixColor: '#64748b',
  numColor: '#334155',
};

// 駅ナンバリングバッジ (TJ-XX, JA-XX, JM-XX, JE-XX, JC-XX, JU-XX 等のマルチライン対応)
export const StationBadge: React.FC<{
  id?: string;
  stationNumber?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({ id, stationNumber, size = 'md' }) => {
  const badgeId = stationNumber || id;
  if (!badgeId) return null;

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 min-w-[38px]',
    md: 'text-xs px-2 py-0.5 min-w-[46px] font-bold',
    lg: 'text-sm px-2.5 py-1 min-w-[54px] font-bold',
  }[size];

  let prefix = '';
  let num = '';
  if (badgeId.startsWith('JR-')) {
    const jrMatch = badgeId.match(/^JR-([A-Z]+)(\d+)$/);
    if (jrMatch) {
      prefix = jrMatch[1];
      num = jrMatch[2];
    } else {
      const parts = badgeId.split('-');
      prefix = parts.slice(0, 2).join('-');
      num = parts.slice(2).join('-');
    }
  } else if (badgeId.includes('-')) {
    [prefix, num] = badgeId.split('-');
  } else {
    [prefix, num] = [badgeId.slice(0, 2), badgeId.slice(2)];
  }
  const badgeColor =
    (badgeId.startsWith('JR-') ? STATION_BADGE_COLORS[`JR-${prefix}`] : null) ||
    STATION_BADGE_COLORS[prefix] ||
    DEFAULT_BADGE_COLOR;

  return (
    <span
      className={`inline-flex items-center justify-center font-mono rounded border-2 shadow-xs tracking-wider ${sizeClasses}`}
      style={{
        borderColor: badgeColor.borderColor,
        backgroundColor: '#ffffff',
        color: badgeColor.numColor,
      }}
      title={`駅ナンバリング: ${id}`}
    >
      <span
        className="mr-0.5 font-black"
        style={{ color: badgeColor.prefixColor }}
      >
        {prefix}
      </span>
      <span>{num}</span>
    </span>
  );
};

// 列車種別バッジ (普通, 準急, 急行, 快速急行, 川越特急, TJライナー, 快速, 通勤快速, カスタム種別 等)
export const TrainTypeBadge: React.FC<{
  type: TrainTypeKey;
  size?: 'sm' | 'md' | 'lg';
  showFullName?: boolean;
  lineId?: LineId;
  customType?: CustomTrainTypeConfig;
}> = ({ type, size = 'md', showFullName = true, lineId, customType }) => {
  const config = getTrainTypeConfig(type, lineId, customType);

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 font-medium rounded',
    md: 'text-xs px-2 py-0.5 font-bold rounded',
    lg: 'text-sm px-2.5 py-1 font-bold rounded-md',
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center shadow-xs text-white ${sizeClasses}`}
      style={{
        backgroundColor: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      {showFullName ? config.name : config.shortName}
    </span>
  );
};
