import { AppProviders } from './contexts/AppProviders';
import { useUI } from './contexts/UIContext';
import { TrainMap } from './components/Map/TrainMap';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TimeController } from './components/Controls/TimeController';
import { TimetableModal } from './components/Modals/TimetableModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { HelpModal } from './components/Modals/HelpModal';
import { InstallModal } from './components/Modals/InstallModal';
import { TestRunModal } from './components/Modals/TestRunModal';
import { DebugLinesPage } from './components/Debug/DebugLinesPage';

function AppContent() {
  const ui = useUI();

  return (
    <div className="relative w-full h-full h-[100dvh] overflow-hidden bg-slate-100 select-none">
      {/* Googleマップ風 ヘッダー＆検索バー */}
      <Header />

      {/* メイン地図 */}
      <TrainMap />

      {/* Googleマップ風 サイドパネル */}
      <Sidebar />

      {/* 画面下部 タイムコントローラー */}
      <TimeController />

      {/* 全日時刻表モーダル */}
      <TimetableModal />

      {/* 設定モーダル */}
      <SettingsModal />

      {/* 使い方ヘルプモーダル */}
      <HelpModal />

      {/* PWAインストールモーダル */}
      <InstallModal />

      {/* 試運転・試験走行モーダル */}
      <TestRunModal />

      {/* 路線・列車種別一覧デバッグ用ページ（全画面オーバーレイ） */}
      {ui.isDebugOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-100 overflow-y-auto">
          <DebugLinesPage onBackToMap={ui.closeDebug} />
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <AppProviders>
      <AppContent />
    </AppProviders>
  );
}

export default App;
