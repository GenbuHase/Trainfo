import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { Station, ActiveTrain, LineId } from '../types';
import { getAllLines } from '../data/linesRegistry';


const OLD_TO_NEW_JR_LINE_IDS: Record<string, LineId> = {
  "tokaido_shinkansen": "jr_tokaido_shinkansen",
  "sanyo_shinkansen": "jr_sanyo_shinkansen",
  "tohoku_shinkansen": "jr_tohoku_shinkansen",
  "joetsu_shinkansen": "jr_joetsu_shinkansen",
  "hokuriku_shinkansen": "jr_hokuriku_shinkansen",
  "yamagata_shinkansen": "jr_yamagata_shinkansen",
  "akita_shinkansen": "jr_akita_shinkansen",
  "yamanote": "jr_yamanote",
  "keihin_tohoku_negishi": "jr_keihin_tohoku_negishi",
  "ueno_tokyo": "jr_ueno_tokyo",
  "shonan_shinjuku": "jr_shonan_shinjuku",
  "tokaido": "jr_tokaido",
  "yokosuka": "jr_yokosuka",
  "chuo": "jr_chuo",
  "chuo_sobu_local": "jr_chuo_sobu_local",
  "sobu_rapid": "jr_sobu_rapid",
  "utsunomiya": "jr_utsunomiya",
  "takasaki": "jr_takasaki",
  "joban_rapid": "jr_joban_rapid",
  "joban_local": "jr_joban_local",
  "saikyo": "jr_saikyo",
  "musashino": "jr_musashino",
  "keiyo": "jr_keiyo",
  "yokohama": "jr_yokohama",
  "nambu": "jr_nambu",
  "tsurumi": "jr_tsurumi",
  "sotetsu_jr_direct": "jr_sotetsu_jr_direct",
  "kawagoe": "jr_kawagoe",
  "hachiko": "jr_hachiko",
  "ome": "jr_ome",
  "itsukaichi": "jr_itsukaichi",
  "sobu_main": "jr_sobu_main",
  "narita": "jr_narita",
  "sotobo": "jr_sotobo",
  "uchibo": "jr_uchibo",
  "togane": "jr_togane",
  "kururi": "jr_kururi",
  "ryomo": "jr_ryomo",
  "ito": "jr_ito",
  "chuo_main": "jr_chuo_main",
  "shinonoi": "jr_shinonoi",
  "oito_east": "jr_oito_east",
  "joetsu": "jr_joetsu",
  "shinetsu_takasaki_yokokawa": "jr_shinetsu_takasaki_yokokawa",
  "shinetsu_naoetsu_niigata": "jr_shinetsu_naoetsu_niigata",
  "hakushin": "jr_hakushin",
  "uetsu_main": "jr_uetsu_main",
  "joban_toride_iwaki": "jr_joban_toride_iwaki",
  "joban_iwaki_sendai": "jr_joban_iwaki_sendai",
  "tohoku_kuroiso_fukushima": "jr_tohoku_kuroiso_fukushima",
  "tohoku_fukushima_sendai": "jr_tohoku_fukushima_sendai",
  "tohoku_sendai_ichinoseki": "jr_tohoku_sendai_ichinoseki",
  "tohoku_rifu": "jr_tohoku_rifu",
  "tohoku_ichinoseki_morioka": "jr_tohoku_ichinoseki_morioka",
  "senzan": "jr_senzan",
  "senseki": "jr_senseki",
  "senseki_tohoku": "jr_senseki_tohoku",
  "ishinomaki": "jr_ishinomaki",
  "ou_fukushima_shinjo": "jr_ou_fukushima_shinjo",
  "ou_shinjo_omagari": "jr_ou_shinjo_omagari",
  "ou_omagari_akita": "jr_ou_omagari_akita",
  "ou_akita_aomori": "jr_ou_akita_aomori",
  "tazawako": "jr_tazawako",
  "kitakami": "jr_kitakami",
  "kamaishi": "jr_kamaishi",
  "yamada": "jr_yamada",
  "hachinohe": "jr_hachinohe",
  "ominato": "jr_ominato",
  "tsugaru": "jr_tsugaru",
  "gono": "jr_gono",
  "oga": "jr_oga",
  "banetsu_east": "jr_banetsu_east",
  "banetsu_west": "jr_banetsu_west",
  "tadami": "jr_tadami",
  "rikuu_east": "jr_rikuu_east",
  "rikuu_west": "jr_rikuu_west",
  "kesennuma": "jr_kesennuma",
  "kesennuma_brt": "jr_kesennuma_brt",
  "ofunato": "jr_ofunato",
  "ofunato_brt": "jr_ofunato_brt",
  "tokaido_atami_toyohashi": "jr_tokaido_atami_toyohashi",
  "tokaido_toyohashi_maibara": "jr_tokaido_toyohashi_maibara",
  "tokaido_minoakasaka": "jr_tokaido_minoakasaka",
  "gotemba": "jr_gotemba",
  "oito_west": "jr_oito_west"
};

const STORAGE_KEY_SELECTED_LINES = 'trainfo_selected_lines';
const STORAGE_KEY_HIDE_OTHER_TRAINS_TRACKING = 'trainfo_hide_other_trains_tracking';

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
  hideOtherTrainsOnTracking: boolean;
  setHideOtherTrainsOnTracking: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export const SelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 選択路線リスト（初期値: localStorage または 0路線）
  const [selectedLineIds, setSelectedLineIdsState] = useState<LineId[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SELECTED_LINES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validIds = new Set(getAllLines().map((l) => l.id));
          return parsed.map((id: string) => OLD_TO_NEW_JR_LINE_IDS[id] || id).filter((id) => validIds.has(id));
        }
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [isTrackingTrain, setIsTrackingTrain] = useState<boolean>(false);
  const [hideOtherTrainsOnTracking, setHideOtherTrainsOnTrackingState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIDE_OTHER_TRAINS_TRACKING);
      if (saved !== null) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return false;
  });

  const setHideOtherTrainsOnTracking = useCallback((val: boolean | ((prev: boolean) => boolean)) => {
    setHideOtherTrainsOnTrackingState((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      try {
        localStorage.setItem(STORAGE_KEY_HIDE_OTHER_TRAINS_TRACKING, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

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
      hideOtherTrainsOnTracking,
      setHideOtherTrainsOnTracking,
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
      hideOtherTrainsOnTracking,
      setHideOtherTrainsOnTracking,
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
