import { AppProviders } from './contexts/AppProviders';
import { TrainMap } from './components/Map/TrainMap';
import { Header } from './components/Header/Header';
import { Sidebar } from './components/Sidebar/Sidebar';
import { TimeController } from './components/Controls/TimeController';
import { TimetableModal } from './components/Modals/TimetableModal';
import { SettingsModal } from './components/Modals/SettingsModal';
import { HelpModal } from './components/Modals/HelpModal';
import { InstallModal } from './components/Modals/InstallModal';

function AppContent() {
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
