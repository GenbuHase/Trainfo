import React, { createContext, useContext, useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { ActiveTrain } from '../types';
import {
  calculateActiveTrains,
  getRealCurrentSeconds,
} from '../services/trainSimulation';
import type { SimulationState } from '../services/trainSimulation';
import { loadSimulationFps, saveSimulationFps } from '../constants';
import type { SimulationFps } from '../constants';
import { useSelection } from './SelectionContext';
import { useTrainTracker } from '../hooks/useTrainTracker';
import {
  loadLinesTimetables,
  subscribeTimetableLoad,
  areAllLinesLoaded,
} from '../data/timetableLoader';

interface SimulationContextValue {
  simState: SimulationState;
  currentSec: number;
  isPlaying: boolean;
  speedMultiplier: number;
  isHoliday: boolean;
  globalDelayMinutes: number;
  randomDelays: Record<string, number>;
  isRealTimeSynced: boolean;
  simulationFps: SimulationFps;
  activeTrains: ActiveTrain[];
  selectedTrain: ActiveTrain | null;
  isLoadingTimetables: boolean;
  seekTime: (sec: number) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  syncRealTime: () => void;
  setDelay: (minutes: number) => void;
  toggleRandomDelay: () => void;
  toggleHoliday: (val: boolean) => void;
  setSimulationFps: (fps: SimulationFps) => void;
}


const SimulationContext = createContext<SimulationContextValue | null>(null);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    selectedLineIds,
    selectedTrainId,
    setSelectedTrainId,
    isTrackingTrain,
    setIsTrackingTrain,
    addLines,
  } = useSelection();

  // 実時間から初期化
  const initialRealSec = getRealCurrentSeconds();
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  // シミュレーション状態
  const [simState, setSimState] = useState<Omit<SimulationState, 'selectedLineIds'>>({
    currentSec: initialRealSec,
    isPlaying: true,
    speedMultiplier: 1,
    isHoliday: isWeekend,
    globalDelayMinutes: 0,
    randomDelays: {},
  });

  const [isRealTimeSynced, setIsRealTimeSynced] = useState<boolean>(true);
  const [simulationFps, setSimulationFpsState] = useState<SimulationFps>(() => loadSimulationFps());

  const lastTickTimeRef = useRef<number>(0);

  // FPS変更
  const setSimulationFps = useCallback((fps: SimulationFps) => {
    setSimulationFpsState(fps);
    saveSimulationFps(fps);
  }, []);

  // シミュレーション時刻のメインループ (設定されたFPSに応じて滑らかに更新)
  useEffect(() => {
    let animId: number;
    const tickIntervalSec = 1 / simulationFps;

    const tick = (now: number) => {
      const elapsed = (now - lastTickTimeRef.current) / 1000;
      if (elapsed >= tickIntervalSec) {
        lastTickTimeRef.current = now;

        setSimState((prev) => {
          if (!prev.isPlaying) return prev;

          let nextSec: number;
          if (isRealTimeSynced && prev.speedMultiplier === 1) {
            nextSec = getRealCurrentSeconds();
          } else {
            nextSec = prev.currentSec + elapsed * prev.speedMultiplier;
            // 24時間運行サイクル（28:00 / 100800秒 = 翌朝04:00）を超えたら起点（04:00 / 14400秒）へループ
            if (nextSec >= 28 * 3600) {
              nextSec = 4 * 3600;
            }
          }

          return { ...prev, currentSec: nextSec };
        });
      }

      animId = requestAnimationFrame(tick);
    };

    lastTickTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isRealTimeSynced, simulationFps]);

  // ダイヤデータの非同期ロード状態管理
  const [timetableVersion, setTimetableVersion] = useState(0);
  const [isLoadingTimetables, setIsLoadingTimetables] = useState<boolean>(() => !areAllLinesLoaded(selectedLineIds));

  // 選択路線の変更に合わせて未ロードのダイヤデータを非同期オンデマンド読み込み
  useEffect(() => {
    let isMounted = true;
    const loadNeeded = async () => {
      if (!areAllLinesLoaded(selectedLineIds)) {
        setIsLoadingTimetables(true);
      }
      await loadLinesTimetables(selectedLineIds);
      if (isMounted) {
        setIsLoadingTimetables(false);
      }
    };
    loadNeeded();
    return () => {
      isMounted = false;
    };
  }, [selectedLineIds]);

  // 他の路線（直通追尾など）でダイヤがロードされた通知を受け取りシミュレーションを更新
  useEffect(() => {
    const unsubscribe = subscribeTimetableLoad(() => {
      setTimetableVersion((v) => v + 1);
      setIsLoadingTimetables(!areAllLinesLoaded(selectedLineIds));
    });
    return unsubscribe;
  }, [selectedLineIds]);

  // 列車位置の純粋算出（useEffectによるカスケードレンダリングを解消しパフォーマンス最大化）
  const fullSimState: SimulationState = useMemo(
    () => ({
      ...simState,
      selectedLineIds,
    }),
    [simState, selectedLineIds]
  );

  const activeTrains = useMemo(() => {
    return calculateActiveTrains(fullSimState);
  }, [fullSimState, timetableVersion]);



  // 直通列車の追尾・自動ハンドオーバー
  const { selectedTrain } = useTrainTracker({
    selectedTrainId,
    setSelectedTrainId,
    isTrackingTrain,
    setIsTrackingTrain,
    activeTrains,
    selectedLineIds,
    onAddLines: addLines,
    currentSec: simState.currentSec,
  });

  // 実時間に同期
  const syncRealTime = useCallback(() => {
    const realSec = getRealCurrentSeconds();
    setSimState((prev) => ({
      ...prev,
      currentSec: realSec,
      speedMultiplier: 1,
      isPlaying: true,
      globalDelayMinutes: 0,
      randomDelays: {},
    }));
    setIsRealTimeSynced(true);
  }, []);

  // タイムスライダーシーク
  const seekTime = useCallback((sec: number) => {
    setIsRealTimeSynced(false);
    let normalizedSec = sec;
    if (normalizedSec < 4 * 3600) {
      normalizedSec += 86400;
    } else if (normalizedSec >= 28 * 3600) {
      normalizedSec = 4 * 3600;
    }
    setSimState((prev) => ({ ...prev, currentSec: normalizedSec }));
  }, []);

  // 再生/一時停止切り替え
  const togglePlay = useCallback(() => {
    setSimState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  // 再生速度変更
  const setSpeed = useCallback((speed: number) => {
    if (speed !== 1) {
      setIsRealTimeSynced(false);
    }
    setSimState((prev) => ({ ...prev, speedMultiplier: speed }));
  }, []);

  // 遅延シミュレーション変更
  const setDelay = useCallback((minutes: number) => {
    setSimState((prev) => ({
      ...prev,
      globalDelayMinutes: minutes,
      randomDelays: {},
    }));
  }, []);

  // ランダム遅延切り替え
  const toggleRandomDelay = useCallback(() => {
    setSimState((prev) => {
      const hasRandom = Object.keys(prev.randomDelays).length > 0;
      if (hasRandom) {
        return { ...prev, randomDelays: {} };
      }
      const delays: Record<string, number> = {};
      activeTrains.forEach((t) => {
        if (Math.random() < 0.35) {
          delays[t.tripId] = Math.floor(Math.random() * 8) + 1;
        }
      });
      return { ...prev, randomDelays: delays };
    });
  }, [activeTrains]);

  // 平日/土休日切り替え
  const toggleHoliday = useCallback((val: boolean) => {
    setSimState((prev) => ({ ...prev, isHoliday: val }));
  }, []);

  const value = useMemo(
    () => ({
      simState: fullSimState,
      currentSec: simState.currentSec,
      isPlaying: simState.isPlaying,
      speedMultiplier: simState.speedMultiplier,
      isHoliday: simState.isHoliday,
      globalDelayMinutes: simState.globalDelayMinutes,
      randomDelays: simState.randomDelays,
      isRealTimeSynced,
      simulationFps,
      activeTrains,
      selectedTrain,
      isLoadingTimetables,
      seekTime,

      togglePlay,
      setSpeed,
      syncRealTime,
      setDelay,
      toggleRandomDelay,
      toggleHoliday,
      setSimulationFps,
    }),
    [
      fullSimState,
      simState.currentSec,
      simState.isPlaying,
      simState.speedMultiplier,
      simState.isHoliday,
      simState.globalDelayMinutes,
      simState.randomDelays,

      isRealTimeSynced,
      simulationFps,
      activeTrains,
      selectedTrain,
      isLoadingTimetables,
      seekTime,

      togglePlay,
      setSpeed,
      syncRealTime,
      setDelay,
      toggleRandomDelay,
      toggleHoliday,
      setSimulationFps,
    ]
  );

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
};

export function useSimulation(): SimulationContextValue {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
}
