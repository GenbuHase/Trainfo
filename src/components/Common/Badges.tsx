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
    borderColor: '#004b97',
    prefixColor: '#ed6d00',
    numColor: '#004b97',
  },
  // JR埼京線・JR川越線
  JA: {
    borderColor: '#00ac9a',
    prefixColor: '#00ac9a',
    numColor: '#007060',
  },
  // JR武蔵野線
  JM: {
    borderColor: '#f15a22',
    prefixColor: '#f15a22',
    numColor: '#c83e0c',
  },
  // JR京葉線
  JE: {
    borderColor: '#c9252f',
    prefixColor: '#c9252f',
    numColor: '#a11820',
  },
  // JR中央線
  JC: {
    borderColor: '#f15a22',
    prefixColor: '#e65100',
    numColor: '#b83b00',
  },
  // JR中央本線 (大月〜小淵沢)
  CO: {
    borderColor: '#0072bc',
    prefixColor: '#0072bc',
    numColor: '#005bac',
  },
  // JR宇都宮線・高崎線 (大宮地上ホーム)
  JU: {
    borderColor: '#f68b1f',
    prefixColor: '#f68b1f',
    numColor: '#cc6600',
  },
  // JR京浜東北線
  JK: {
    borderColor: '#00a4e4',
    prefixColor: '#00a4e4',
    numColor: '#007aa8',
  },
  // JR湘南新宿ライン
  JS: {
    borderColor: '#e21f26',
    prefixColor: '#e21f26',
    numColor: '#ad1117',
  },
  // つくばエクスプレス (首都圏新都市鉄道)
  TX: {
    borderColor: '#003893',
    prefixColor: '#df0011',
    numColor: '#003893',
  },
  // JR篠ノ井線
  SN: {
    borderColor: '#d56a29',
    prefixColor: '#d56a29',
    numColor: '#a84e15',
  },
  // JR東日本 大糸線
  OE: {
    borderColor: '#8a579e',
    prefixColor: '#8a579e',
    numColor: '#6c3b82',
  },
  // JR西日本 大糸線
  OW: {
    borderColor: '#0067b8',
    prefixColor: '#0067b8',
    numColor: '#004d8a',
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
    borderColor: '#9c5f24',
    prefixColor: '#9c5f24',
    numColor: '#7a3e0c',
  },
  // 西武池袋線・西武有楽町線・西武秩父線
  SI: {
    borderColor: '#f39800',
    prefixColor: '#f39800',
    numColor: '#b86600',
  },
  // JR八高線
  HA: {
    borderColor: '#a8a39d',
    prefixColor: '#a8a39d',
    numColor: '#6e6964',
  },
  // 秩父鉄道秩父本線
  CR: {
    borderColor: '#0073bc',
    prefixColor: '#0073bc',
    numColor: '#005b94',
  },
};

const DEFAULT_BADGE_COLOR: StationBadgeColor = {
  borderColor: '#64748b',
  prefixColor: '#64748b',
  numColor: '#334155',
};

// 駅ナンバリングバッジ (TJ-XX, JA-XX, JM-XX, JE-XX, JC-XX, JU-XX 等のマルチライン対応)
export const StationBadge: React.FC<{ id: string; size?: 'sm' | 'md' | 'lg' }> = ({
  id,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 min-w-[38px]',
    md: 'text-xs px-2 py-0.5 min-w-[46px] font-bold',
    lg: 'text-sm px-2.5 py-1 min-w-[54px] font-bold',
  }[size];

  const [prefix, num] = id.includes('-') ? id.split('-') : [id.slice(0, 2), id.slice(2)];
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
