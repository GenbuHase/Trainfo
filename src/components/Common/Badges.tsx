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

  const [prefix, num] = badgeId.includes('-')
    ? badgeId.split('-')
    : [badgeId.slice(0, 2), badgeId.slice(2)];
  const badgeColor = STATION_BADGE_COLORS[prefix] || DEFAULT_BADGE_COLOR;

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
