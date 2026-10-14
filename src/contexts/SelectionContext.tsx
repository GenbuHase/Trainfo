import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Station, ActiveTrain, LineId } from '../types';
import { getAllLines } from '../data/linesRegistry';

const STORAGE_KEY_SELECTED_LINES = 'trainfo_selected_lines';

interface SelectionContextValue {
  selectedLineIds: LineId[];
  setSelectedLineIds: (lineIds: LineId[]) => void;
  addLines: (lineIds: LineId[]) => void;
  selectedStation: Station | null;
  selectedTrainId: string | null;
  isTrackingTrain: boolean;
  selectStation: (station: Station | null) => void;
  selectTrain: (train: ActiveTrain | null) => void;
  setSelectedTrainId: (id: string | null) => void;
  setIsTrackingTrain: (tracking: boolean | ((prev: boolean) => boolean)) => void;
  stopTracking: () => void;
  clearTargetSelection: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 選択路線リスト（初期値: localStorage または 登録全路線）
  const [selectedLineIds, setSelectedLineIdsState] = useState<LineId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SELECTED_LINES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validIds = new Set(getAllLines().map((l) => l.id));
          const validSelected = parsed.filter((id) => validIds.has(id));
          if (validSelected.length > 0) return validSelected;
        }
      }
    } catch {
      // ignore
    }
    return getAllLines().map((l) => l.id);
  });

  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [isTrackingTrain, setIsTrackingTrain] = useState<boolean>(false);

  // 路線リストの更新（localStorage への永続化を含む）
  const setSelectedLineIds = useCallback((lineIds: LineId[]) => {
    setSelectedLineIdsState(lineIds);
    try {
      localStorage.setItem(STORAGE_KEY_SELECTED_LINES, JSON.stringify(lineIds));
    } catch {
      // ignore
    }
  }, []);

  // 直通運転などで路線を追加
  const addLines = useCallback((newLines: LineId[]) => {
    setSelectedLineIdsState((prev) => {
      const toAdd = newLines.filter((id) => !prev.includes(id));
      if (toAdd.length === 0) return prev;
      const updated = [...prev, ...toAdd];
      try {
        localStorage.setItem(STORAGE_KEY_SELECTED_LINES, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  // 駅選択
  const selectStation = useCallback((station: Station | null) => {
    setSelectedStation(station);
    setSelectedTrainId(null);
    setIsTrackingTrain(false);
  }, []);

  // 列車選択
  const selectTrain = useCallback((train: ActiveTrain | null) => {
    if (!train) {
      setSelectedTrainId(null);
      setIsTrackingTrain(false);
      return;
    }
    setSelectedTrainId(train.tripId);
    setSelectedStation(null);
  }, []);

  // 追尾停止
  const stopTracking = useCallback(() => {
    setIsTrackingTrain(false);
    setSelectedTrainId(null);
  }, []);

  // 選択解除
  const clearTargetSelection = useCallback(() => {
    setSelectedStation(null);
    setSelectedTrainId(null);
    setIsTrackingTrain(false);
  }, []);

  const value = useMemo(
    () => ({
      selectedLineIds,
      setSelectedLineIds,
      addLines,
      selectedStation,
      selectedTrainId,
      isTrackingTrain,
      selectStation,
      selectTrain,
      setSelectedTrainId,
      setIsTrackingTrain,
      stopTracking,
      clearTargetSelection,
    }),
    [
      selectedLineIds,
      setSelectedLineIds,
      addLines,
      selectedStation,
      selectedTrainId,
      isTrackingTrain,
      selectStation,
      selectTrain,
      stopTracking,
      clearTargetSelection,
    ]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
};

export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
}
