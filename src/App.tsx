import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { Station, ActiveTrain, LineId, Direction } from './types';
import { TrainMap } from './components/Map/TrainMap';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TimeController } from './components/Controls/TimeController';
import { TimetableModal } from './components/Modals/TimetableModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { HelpModal } from './components/Modals/HelpModal';
import {
  calculateActiveTrains,
  getRealCurrentSeconds,
} from './services/trainSimulation';
import type { SimulationState } from './services/trainSimulation';
import { getAllLines } from './data/linesRegistry';


import { loadSimulationFps } from './constants';
import type { SimulationFps } from './constants';

export function App() {
  // 選択路線リスト（初期値: localStorage または 登録全路線）
  const [selectedLineIds, setSelectedLineIds] = useState<LineId[]>(() => {
    try {
      const saved = localStorage.getItem('trainfo_selected_lines');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return getAllLines().map((l) => l.id);
  });

  // 表示フィルター状態 (進行方向・列車種別)
  const [filterDirection, setFilterDirection] = useState<'all' | Direction>('all');
  const [filterType, setFilterType] = useState<'all' | 'rapid' | 'local'>('all');

  // 下部タイムコントローラーの展開状態 (モバイルでの地図コントロール配置連動用)
  const [isTimeControllerExpanded, setIsTimeControllerExpanded] = useState<boolean>(false);

  // 実時間から初期化
  const initialRealSec = getRealCurrentSeconds();
  const today = new Date();
  const isWeekend = today.getDay() === 0 || today.getDay() === 6;

  // シミュレーション状態
  const [simState, setSimState] = useState<SimulationState>({
    currentSec: initialRealSec,
    isPlaying: true,
    speedMultiplier: 1,
    isHoliday: isWeekend,
    globalDelayMinutes: 0,
    randomDelays: {},
    selectedLineIds,
  });

  const [isRealTimeSynced, setIsRealTimeSynced] = useState<boolean>(true);
  const [activeTrains, setActiveTrains] = useState<ActiveTrain[]>([]);
  const [simulationFps, setSimulationFps] = useState<SimulationFps>(() => loadSimulationFps());

  // 選択状態
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [isTrackingTrain, setIsTrackingTrain] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


  // 直前に選択されていた列車情報を保持（路線境界をまたぐ直通列車の自動ハンドオーバー用）
  const lastSelectedTrainRef = useRef<ActiveTrain | null>(null);

  // 選択中の列車オブジェクトをリアルタイム算出
  const selectedTrain = useMemo(() => {
    if (!selectedTrainId) return null;
    const found = activeTrains.find((t) => t.tripId === selectedTrainId);
    if (found) return found;

    // もし現在のtripIdが終了していても、直前の列車と同一列車番号の直通トリップが走行中なら即座に引き継ぐ
    const prev = lastSelectedTrainRef.current;
    if (prev && prev.trainNumber) {
      const successor = activeTrains.find(
        (t) => t.trainNumber === prev.trainNumber && t.tripId !== prev.tripId
      );
      if (successor) return successor;
    }
    return null;
  }, [activeTrains, selectedTrainId]);

  // 選択列車が直通トリップへ切り替わった場合に selectedTrainId を同期更新
  useEffect(() => {
    if (selectedTrain) {
      lastSelectedTrainRef.current = selectedTrain;
      if (selectedTrain.tripId !== selectedTrainId) {
        setSelectedTrainId(selectedTrain.tripId);
      }
    }
  }, [selectedTrain, selectedTrainId]);

  // モーダル状態
  const [timetableStation, setTimetableStation] = useState<Station | null>(null);
  const [isTimetableOpen, setIsTimetableOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  const lastTickTimeRef = useRef<number>(performance.now());


  // 路線選択変更ハンドラ
  const handleChangeSelectedLines = useCallback((lineIds: LineId[]) => {
    setSelectedLineIds(lineIds);
    setSimState((prev) => ({ ...prev, selectedLineIds: lineIds }));
    try {
      localStorage.setItem('trainfo_selected_lines', JSON.stringify(lineIds));
    } catch {
      // ignore
    }
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
            // 終電・深夜運行終了（25:30 / 91800秒 = 01:30）を超えたら始発（04:30 / 16200秒）へループ
            if (nextSec >= 25.5 * 3600) {
              nextSec = 4.5 * 3600;
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

  // 列車位置の再計算
  useEffect(() => {
    const trains = calculateActiveTrains({
      ...simState,
      selectedLineIds,
    });
    setActiveTrains(trains);
  }, [simState, selectedLineIds]);

  // 駅選択ハンドラ
  const handleSelectStation = useCallback((station: Station) => {
    setSelectedStation(station);
    setSelectedTrainId(null);
    setIsTrackingTrain(false);
    setIsSidebarOpen(true);
  }, []);

  // 列車選択ハンドラ
  const handleSelectTrain = useCallback((train: ActiveTrain) => {
    setSelectedTrainId(train.tripId);
    setSelectedStation(null);
    setIsSidebarOpen(true);
    if (selectedTrainId !== train.tripId) {
      setIsTrackingTrain(false);
    }
  }, [selectedTrainId]);

  // 詳細パネル閉塞ハンドラ
  // 自動追尾が有効な場合は追尾と列車選択状態を維持し、パネルのみを閉じる（全画面マップでの追尾を可能にするため）
  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
    if (!isTrackingTrain) {
      setSelectedStation(null);
      setSelectedTrainId(null);
    }
  }, [isTrackingTrain]);

  // パネル再表示ハンドラ
  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  // 追尾解除ハンドラ
  const handleStopTracking = useCallback(() => {
    setIsTrackingTrain(false);
    setSelectedTrainId(null);
  }, []);

  // 追尾中の列車が運行終了等で存在しなくなった場合は追尾を自動解除
  useEffect(() => {
    if (isTrackingTrain && !selectedTrain) {
      setIsTrackingTrain(false);
      setSelectedTrainId(null);
    }
  }, [isTrackingTrain, selectedTrain]);

  // 実時間に同期
  const handleSyncRealTime = useCallback(() => {
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
  const handleSeekTime = useCallback((sec: number) => {
    setIsRealTimeSynced(false);
    const normalizedSec = sec < 4 * 3600 ? sec + 86400 : sec;
    setSimState((prev) => ({ ...prev, currentSec: normalizedSec }));
  }, []);

  // 再生/一時停止切り替え
  const handleTogglePlay = useCallback(() => {
    setSimState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  }, []);

  // 再生速度変更
  const handleChangeSpeed = useCallback((speed: number) => {
    if (speed !== 1) {
      setIsRealTimeSynced(false);
    }
    setSimState((prev) => ({ ...prev, speedMultiplier: speed }));
  }, []);

  // 遅延シミュレーション変更
  const handleChangeDelay = useCallback((minutes: number) => {
    setSimState((prev) => ({
      ...prev,
      globalDelayMinutes: minutes,
      randomDelays: {},
    }));
  }, []);

  // ランダム遅延切り替え
  const handleToggleRandomDelay = useCallback(() => {
    setSimState((prev) => {
      const hasRandom = Object.keys(prev.randomDelays).length > 0;
      if (hasRandom) {
        return { ...prev, randomDelays: {} };
      }
      // いくつかの列車に1〜8分のランダムな遅れを付与
      const delays: Record<string, number> = {};
      activeTrains.forEach((t) => {
        if (Math.random() < 0.35) {
          delays[t.tripId] = Math.floor(Math.random() * 8) + 1;
        }
      });
      return { ...prev, randomDelays: delays };
    });
  }, [activeTrains]);

  // 全日時刻表モーダルを開く
  const handleOpenFullTimetable = useCallback((st: Station) => {
    setTimetableStation(st);
    setIsTimetableOpen(true);
  }, []);

  return (
    <div className="relative w-full h-full h-[100dvh] overflow-hidden bg-slate-100 select-none">
      {/* Googleマップ風 ヘッダー＆検索バー (2段組ツールバー) */}
      <Header
        onSelectStation={handleSelectStation}
        onSelectTrain={handleSelectTrain}
        activeTrains={activeTrains}
        isHoliday={simState.isHoliday}
        onToggleHoliday={(val) => setSimState((prev) => ({ ...prev, isHoliday: val }))}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
        selectedLineIds={selectedLineIds}
        onChangeSelectedLines={handleChangeSelectedLines}
        filterDirection={filterDirection}
        onChangeFilterDirection={setFilterDirection}
        filterType={filterType}
        onChangeFilterType={setFilterType}
        selectedTrain={selectedTrain}
        isTrackingTrain={isTrackingTrain}
        onOpenSidebar={handleOpenSidebar}
        onStopTracking={handleStopTracking}
      />

      {/* メイン地図 */}
      <TrainMap
        activeTrains={activeTrains}
        selectedStation={selectedStation}
        selectedTrain={selectedTrain}
        onSelectStation={handleSelectStation}
        onSelectTrain={handleSelectTrain}
        isTrackingTrain={isTrackingTrain}
        trackingTrainId={selectedTrain?.tripId || null}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={handleCloseSidebar}
        selectedLineIds={selectedLineIds}
        filterDirection={filterDirection}
        filterType={filterType}
        isTimeControllerExpanded={isTimeControllerExpanded}
        onStopTracking={handleStopTracking}
      />

      {/* Googleマップ風 サイドパネル */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        selectedStation={selectedStation}
        selectedTrain={selectedTrain}
        currentSec={simState.currentSec}
        isHoliday={simState.isHoliday}
        activeTrains={activeTrains}
        isTrackingTrain={isTrackingTrain}
        onToggleTrackingTrain={() => setIsTrackingTrain((prev) => !prev)}
        onSelectStation={handleSelectStation}
        onSelectTrain={handleSelectTrain}
        onOpenFullTimetable={handleOpenFullTimetable}
        selectedLineIds={selectedLineIds}
      />

      {/* 画面下部 タイムコントローラー */}
      <TimeController
        currentSec={simState.currentSec}
        onSeek={handleSeekTime}
        isPlaying={simState.isPlaying}
        onTogglePlay={handleTogglePlay}
        speedMultiplier={simState.speedMultiplier}
        onChangeSpeed={handleChangeSpeed}
        onSyncRealTime={handleSyncRealTime}
        isRealTimeSynced={isRealTimeSynced}
        globalDelayMinutes={simState.globalDelayMinutes}
        onChangeDelay={handleChangeDelay}
        onToggleRandomDelay={handleToggleRandomDelay}
        isRandomDelayActive={Object.keys(simState.randomDelays).length > 0}
        isSidebarOpen={isSidebarOpen}
        isExpanded={isTimeControllerExpanded}
        onToggleExpanded={() => setIsTimeControllerExpanded((prev) => !prev)}
      />

      {/* 全日時刻表モーダル */}
      <TimetableModal
        station={timetableStation}
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        defaultIsHoliday={simState.isHoliday}
        onSwitchStation={(st) => {
          setTimetableStation(st);
          setSelectedStation(st);
        }}
      />

      {/* 設定モーダル */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentFps={simulationFps}
        onChangeFps={setSimulationFps}
      />

      {/* 使い方ヘルプモーダル */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
