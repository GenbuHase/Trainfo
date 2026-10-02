import React, { useState, useEffect } from 'react';
import { X, Settings, CheckCircle, Gauge } from 'lucide-react';
import {
  AVAILABLE_SIMULATION_FPS,
  loadSimulationFps,
  saveSimulationFps,
} from '../../constants';
import type { SimulationFps } from '../../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFps?: SimulationFps;
  onChangeFps?: (fps: SimulationFps) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentFps,
  onChangeFps,
}) => {
  const [selectedFps, setSelectedFps] = useState<SimulationFps>(currentFps || loadSimulationFps());
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedFps(currentFps || loadSimulationFps());
    }
  }, [isOpen, currentFps]);

  if (!isOpen) return null;

  const handleSelectFps = (fps: SimulationFps) => {
    setSelectedFps(fps);
    saveSimulationFps(fps);
    onChangeFps?.(fps);
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
        </div>
      </div>
    </div>
  );
};
