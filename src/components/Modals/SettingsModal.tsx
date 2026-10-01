import React, { useState } from 'react';
import { X, Key, Download, RefreshCw, CheckCircle, Database } from 'lucide-react';
import type { OdptConfig } from '../../services/odptApi';
import { loadOdptConfig, saveOdptConfig } from '../../services/odptApi';
import { GLOBAL_TIMETABLE } from '../../data/timetableData';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySettings: (config: OdptConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onApplySettings,
}) => {
  const [config, setConfig] = useState<OdptConfig>(loadOdptConfig());
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveOdptConfig(config);
    onApplySettings(config);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // 時刻表JSONエクスポート
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(GLOBAL_TIMETABLE, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tobu_tojo_timetable_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-[#004b97]" />
            <h2 className="text-lg font-bold text-slate-800">Trainfo 設定・データ管理</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* ODPT API連携設定 */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-500" />
              <span>公共交通オープンデータセンター (ODPT) 連携</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ODPTの開発者アカウントをお持ちの場合、APIキーを入力することで公式の最新運行情報テキストなどを動的に取得・反映できます。（未設定時も高精度な内蔵シミュレーションが動作します）
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                ODPT Access Token (APIキー)
              </label>
              <input
                type="text"
                value={config.apiKey || ''}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                placeholder="例: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004b97] font-mono text-slate-800"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="useLiveApi"
                checked={config.useLiveApi}
                onChange={(e) => setConfig({ ...config, useLiveApi: e.target.checked })}
                className="w-4 h-4 rounded text-[#004b97] focus:ring-[#004b97]"
              />
              <label htmlFor="useLiveApi" className="text-xs text-slate-700 select-none">
                リアルタイム運行情報APIの問い合わせを有効化
              </label>
            </div>

            <button
              onClick={handleSave}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#004b97] hover:bg-blue-800 text-white text-xs font-bold rounded-lg shadow-md transition-all"
            >
              {saveSuccess ? <CheckCircle className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
              <span>{saveSuccess ? '設定を保存しました' : '設定を保存する'}</span>
            </button>
          </section>

          {/* 時刻表データ エクスポート */}
          <section className="pt-4 border-t border-slate-200/80 space-y-2.5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>時刻表データ (JSON)</span>
            </h3>
            <p className="text-xs text-slate-500">
              現在ロードされている東武東上線全ダイヤ（平日・土休日全便）をJSONファイルとして保存します。
            </p>
            <button
              onClick={handleExportJson}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>全線ダイヤ (JSON) をダウンロード</span>
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
