import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { Station, ActiveTrain } from './types';
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
import {
  fetchTobuOperationStatus,
  loadOdptConfig,
} from './services/odptApi';
import type {
  OdptConfig,
  TrainOperationStatus,
} from './services/odptApi';
import { secondsToTimeString } from './data/timetableData';

export function App() {
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
  });

  const [isRealTimeSynced, setIsRealTimeSynced] = useState<boolean>(true);
  const [activeTrains, setActiveTrains] = useState<ActiveTrain[]>([]);

  // 選択状態
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);
  const [isTrackingTrain, setIsTrackingTrain] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // 選択中の列車オブジェクトをリアルタイム算出
  const selectedTrain = useMemo(() => {
    if (!selectedTrainId) return null;
    return activeTrains.find((t) => t.tripId === selectedTrainId) || null;
  }, [activeTrains, selectedTrainId]);

  // モーダル状態
  const [timetableStation, setTimetableStation] = useState<Station | null>(null);
  const [isTimetableOpen, setIsTimetableOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // 運行情報
  const [operationStatus, setOperationStatus] = useState<TrainOperationStatus>({
    status: 'NORMAL',
    title: '東武東上線：平常運転',
    details: '東武東上線は全線でおおむね平常通り運行しています。',
    updatedAt: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
  });

  const odptConfigRef = useRef<OdptConfig>(loadOdptConfig());
  const lastTickTimeRef = useRef<number>(performance.now());

  // 運行情報ステータスの初期取得
  useEffect(() => {
    fetchTobuOperationStatus(odptConfigRef.current.apiKey).then((res) => {
      setOperationStatus(res);
    });
  }, []);

  // シミュレーション時刻のメインループ (250ms ごとにスロットリング更新)
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const elapsed = (now - lastTickTimeRef.current) / 1000;
      if (elapsed >= 0.25) {
        lastTickTimeRef.current = now;

        setSimState((prev) => {
          if (!prev.isPlaying) return prev;

          let nextSec: number;
          if (isRealTimeSynced && prev.speedMultiplier === 1) {
            nextSec = getRealCurrentSeconds();
          } else {
            nextSec = (prev.currentSec + elapsed * prev.speedMultiplier) % 86400;
          }

          return { ...prev, currentSec: nextSec };
        });
      }

      animId = requestAnimationFrame(tick);
    };

    lastTickTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [isRealTimeSynced]);

  // 列車位置の再計算
  useEffect(() => {
    const trains = calculateActiveTrains(simState);
    setActiveTrains(trains);
  }, [simState]);

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
  }, []);

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
    setSimState((prev) => ({ ...prev, currentSec: sec }));
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
    if (minutes > 0) {
      setOperationStatus({
        status: 'DELAY',
        title: `東武東上線：約${minutes}分遅れ`,
        details: `ダイヤ乱れシミュレーション中（全線で約${minutes}分の遅延が発生しています）。`,
        updatedAt: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      });
    } else {
      setOperationStatus({
        status: 'NORMAL',
        title: '東武東上線：平常運転',
        details: '現在、平常通り運行しています。',
        updatedAt: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
      });
    }
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

  // 設定保存時
  const handleApplySettings = useCallback((config: OdptConfig) => {
    odptConfigRef.current = config;
    if (config.apiKey && config.useLiveApi) {
      fetchTobuOperationStatus(config.apiKey).then((res) => setOperationStatus(res));
    }
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-100 select-none">
      {/* Googleマップ風 ヘッダー＆検索バー */}
      <Header
        onSelectStation={handleSelectStation}
        onSelectTrain={handleSelectTrain}
        activeTrains={activeTrains}
        isHoliday={simState.isHoliday}
        onToggleHoliday={(val) => setSimState((prev) => ({ ...prev, isHoliday: val }))}
        operationStatus={operationStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        currentTimeString={secondsToTimeString(simState.currentSec)}
        isSidebarOpen={isSidebarOpen}
        onCloseSidebar={() => setIsSidebarOpen(false)}
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
        onCloseSidebar={() => setIsSidebarOpen(false)}
      />

      {/* Googleマップ風 サイドパネル */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
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
      />

      {/* 全日時刻表モーダル */}
      <TimetableModal
        station={timetableStation}
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        defaultIsHoliday={simState.isHoliday}
      />

      {/* 設定モーダル */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onApplySettings={handleApplySettings}
      />

      {/* 使い方ヘルプモーダル */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default App;
