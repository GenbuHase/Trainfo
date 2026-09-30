import React from 'react';
import type { TrainTypeKey } from '../../types';
import { TRAIN_TYPES } from '../../data/trainTypes';

// 東武東上線 駅ナンバリングバッジ (TJ-XX)
export const StationBadge: React.FC<{ id: string; size?: 'sm' | 'md' | 'lg' }> = ({
  id,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 min-w-[38px]',
    md: 'text-xs px-2 py-0.5 min-w-[46px] font-bold',
    lg: 'text-sm px-2.5 py-1 min-w-[54px] font-bold',
  }[size];

  return (
    <span
      className={`inline-flex items-center justify-center font-mono rounded border-2 border-[#004b97] bg-white text-[#004b97] shadow-xs tracking-wider ${sizeClasses}`}
      title={`駅ナンバリング: ${id}`}
    >
      <span className="text-[#ed6d00] mr-0.5 font-black">TJ</span>
      <span>{id.replace('TJ-', '')}</span>
    </span>
  );
};

// 列車種別バッジ (普通, 準急, 急行, 快速急行, 川越特急, TJライナー)
export const TrainTypeBadge: React.FC<{
  type: TrainTypeKey;
  size?: 'sm' | 'md' | 'lg';
  showFullName?: boolean;
}> = ({ type, size = 'md', showFullName = true }) => {
  const config = TRAIN_TYPES[type] || TRAIN_TYPES.local;

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
