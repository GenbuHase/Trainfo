import React, { useState } from 'react';
import { X, Settings, CheckCircle, Gauge, LocateFixed, EyeOff } from 'lucide-react';
import {
  AVAILABLE_SIMULATION_FPS,
  loadSimulationFps,
  saveSimulationFps,
} from '../../constants';
import type { SimulationFps } from '../../constants';

import { useUI } from '../../contexts/UIContext';
import { useSimulation } from '../../contexts/SimulationContext';
import { useSelection } from '../../contexts/SelectionContext';

export const SettingsModal: React.FC = () => {
  const ui = useUI();
  const isOpen = ui.isSettingsOpen;
  const onClose = ui.closeSettings;
  const { simulationFps: currentFps, setSimulationFps: onChangeFps } = useSimulation();
  const { hideOtherTrainsOnTracking, setHideOtherTrainsOnTracking } = useSelection();

  const selectedFps: SimulationFps = currentFps || loadSimulationFps();
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSelectFps = (fps: SimulationFps) => {
    saveSimulationFps(fps);
    onChangeFps(fps);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#004b97]" />
            <h2 className="text-lg font-bold text-slate-800">Trainfo 設定</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* シミュレーション・アニメーション設定 */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-[#004b97]" />
              <span>アニメーション・描画設定</span>
            </h3>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  リフレッシュレート (FPS)
                </label>
                <span className="text-[11px] font-mono font-semibold text-[#004b97] bg-blue-50 px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                  {saveSuccess && <CheckCircle className="w-3 h-3 text-emerald-600 animate-in zoom-in" />}
                  {selectedFps} FPS (約 {Math.round((1000 / selectedFps) * 10) / 10} ms)
                </span>
              </div>

              {/* 10, 20, 30, 60, 120 FPS 選択ボタン群 */}
              <div className="grid grid-cols-5 gap-1.5">
                {AVAILABLE_SIMULATION_FPS.map((val) => {
                  const isSelected = selectedFps === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleSelectFps(val)}
                      className={`py-2 px-1 rounded-lg border font-bold transition-all flex flex-col items-center justify-center gap-0.5 ${
                        isSelected
                          ? 'bg-[#004b97] text-white border-[#004b97] shadow-sm ring-2 ring-[#004b97]/30'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                      }`}
                    >
                      <span className="text-sm leading-none">{val}</span>
                      <span className="text-[9px] leading-none opacity-80">FPS</span>
                    </button>
                  );
                })}
              </div>

              {/* 選択中のFPSに応じたヒント・目安テキスト */}
              <div className="mt-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <span>目安:</span>
                <span className="font-medium text-slate-700">
                  {selectedFps === 10 && '🌱 省電力・標準（低負荷）'}
                  {selectedFps === 20 && '✨ スムーズ（快適）'}
                  {selectedFps === 30 && '🚀 高フレームレート（滑らか）'}
                  {selectedFps === 60 && '⚡ 60 FPS（超高精度・標準ディスプレイ同期）'}
                  {selectedFps === 120 && '🔥 120 FPS（高駆動ゲーミング/ProMotion向け）'}
                </span>
              </div>
            </div>
          </section>

          {/* 追尾・表示設定 */}
          <section className="space-y-3 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <LocateFixed className="w-4 h-4 text-[#004b97]" />
              <span>列車追尾設定</span>
            </h3>
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/70">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                  追尾中に他の列車を非表示にする
                </span>
                <span className="text-[11px] text-slate-500 block">
                  作成した列車や追尾対象の列車のみをマップに単独表示し、集中して走行を鑑賞できます
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHideOtherTrainsOnTracking((prev: boolean) => !prev)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  hideOtherTrainsOnTracking ? 'bg-[#004b97]' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    hideOtherTrainsOnTracking ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </section>

          {/* 開発・デバッグメニュー */}
          <section className="space-y-3 pt-3 border-t border-slate-200">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>開発・デバッグ</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                onClose();
                ui.openDebug();
              }}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 text-slate-700 hover:text-blue-700 text-xs font-bold flex items-center justify-between transition-all group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>路線・列車種別一覧（デバッグページ）</span>
              </div>
              <span className="text-[11px] text-slate-400 group-hover:text-blue-600 flex items-center gap-0.5">
                開く →
              </span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
