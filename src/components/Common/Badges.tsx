import React from 'react';
import type { TrainTypeKey, LineId } from '../../types';
import { getTrainTypeConfig } from '../../data/linesRegistry';

interface StationBadgeColor {
  borderColor: string;
  prefixColor: string;
  numColor: string;
}

const STATION_BADGE_COLORS: Record<string, StationBadgeColor> = {
  // 東武東上線
  TJ: {
    borderColor: '#004098',
    prefixColor: '#ed6d00',
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
  // JR中央本線 (大月〜小淵沢)
  CO: {
    borderColor: '#0071c5',
    prefixColor: '#0071c5',
    numColor: '#005bac',
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
  // JR篠ノ井線
  SN: {
    borderColor: '#cb5f12',
    prefixColor: '#cb5f12',
    numColor: '#a84e15',
  },
  // JR東日本 大糸線
  OIE: {
    borderColor: '#957490',
    prefixColor: '#957490',
    numColor: '#6c3b82',
  },
  // JR西日本 大糸線
  OW: {
    borderColor: '#0068b7',
    prefixColor: '#0068b7',
    numColor: '#004d8a',
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
  // JR八高線
  HA: {
    borderColor: '#a09d95',
    prefixColor: '#a09d95',
    numColor: '#6e6964',
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
  // JR常磐線（取手～いわき）
  JN: {
    borderColor: '#0071c5',
    prefixColor: '#0071c5',
    numColor: '#005596',
  },
  // JR常磐線（いわき～仙台）
  JSD: {
    borderColor: '#0071c5',
    prefixColor: '#0071c5',
    numColor: '#005596',
  },
  // JR東北新幹線
  TS: {
    borderColor: '#41934c',
    prefixColor: '#41934c',
    numColor: '#2b6333',
  },
  // JR上越新幹線
  JOS: {
    borderColor: '#f58d79',
    prefixColor: '#f58d79',
    numColor: '#c85a48',
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
  // JR高崎線
  TK: {
    borderColor: '#f68b1e',
    prefixColor: '#f68b1e',
    numColor: '#cc6600',
  },
  // JR上野東京ライン
  UT: {
    borderColor: '#8f0079',
    prefixColor: '#8f0079',
    numColor: '#630054',
  },
  // JR東海 東海道本線
  CA: {
    borderColor: '#ff7322',
    prefixColor: '#ff7322',
    numColor: '#cc5200',
  },
  // JR両毛線
  RY: {
    borderColor: '#ffd400',
    prefixColor: '#c8a200',
    numColor: '#333333',
  },
  // JR上越線
  JOE: {
    borderColor: '#00b3e6',
    prefixColor: '#00b3e6',
    numColor: '#007ca0',
  },
  // JR信越本線
  SE: {
    borderColor: '#00acd1',
    prefixColor: '#00acd1',
    numColor: '#007b96',
  },
  // JR只見線
  TD: {
    borderColor: '#0081b8',
    prefixColor: '#0081b8',
    numColor: '#005f88',
  },
  // JR磐越西線
  BW: {
    borderColor: '#bc6e23',
    prefixColor: '#bc6e23',
    numColor: '#8a4e16',
  },
  // JR磐越東線
  BE: {
    borderColor: '#c5527a',
    prefixColor: '#c5527a',
    numColor: '#933555',
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

// 列車種別バッジ (普通, 準急, 急行, 快速急行, 川越特急, TJライナー, 快速, 通勤快速 等)
export const TrainTypeBadge: React.FC<{
  type: TrainTypeKey;
  size?: 'sm' | 'md' | 'lg';
  showFullName?: boolean;
  lineId?: LineId;
}> = ({ type, size = 'md', showFullName = true, lineId }) => {
  const config = getTrainTypeConfig(type, lineId);

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
