import React from 'react';
import type { TrainTypeKey } from '../../types';
import { TRAIN_TYPES } from '../../data/trainTypes';

// 駅ナンバリングバッジ (TJ-XX, JA-XX 等のマルチライン対応)
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
  const isSaikyo = prefix === 'JA';

  return (
    <span
      className={`inline-flex items-center justify-center font-mono rounded border-2 shadow-xs tracking-wider ${sizeClasses}`}
      style={{
        borderColor: isSaikyo ? '#00ac9a' : '#004b97',
        backgroundColor: '#ffffff',
        color: isSaikyo ? '#007060' : '#004b97',
      }}
      title={`駅ナンバリング: ${id}`}
    >
      <span
        className="mr-0.5 font-black"
        style={{ color: isSaikyo ? '#00ac9a' : '#ed6d00' }}
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
}> = ({ type, size = 'md', showFullName = true }) => {
  const config = TRAIN_TYPES[type] || TRAIN_TYPES.local || {
    key: 'local',
    name: '普通',
    nameEn: 'Local',
    shortName: '普',
    color: '#1e1c1c',
    textColor: '#ffffff',
    bgColor: '#1e1c1c',
    borderColor: '#4a4646',
  };

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
