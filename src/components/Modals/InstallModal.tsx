import React, { useEffect, useState } from 'react';
import { X, Download, Share, PlusSquare, Smartphone, Monitor, CheckCircle2 } from 'lucide-react';
import { promptPwaInstall, canPromptPwaInstall, isRunningStandalone, isIosSafari } from '../../services/pwaService';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const [canPrompt, setCanPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCanPrompt(canPromptPwaInstall());
      setIsInstalled(isRunningStandalone());
      setIsIos(isIosSafari());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    const outcome = await promptPwaInstall();
    if (outcome === 'accepted') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#002060] to-[#00ac9a] text-white flex items-center justify-center font-black text-sm shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 leading-tight">Trainfo をインストール</h2>
              <p className="text-[11px] text-slate-500">ホーム画面やデスクトップから即座に起動</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-5 space-y-4 text-xs text-slate-600 leading-relaxed">
          {/* インストール済みステータス */}
          {isInstalled ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 text-sm">インストール完了済み</h4>
                <p className="text-emerald-700 mt-1">
                  Trainfo はすでにスタンドアロンアプリとしてインストールされています。ホーム画面やアプリアイコンから快適にご利用いただけます。
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* PWAインストールダイアログが直接出せる場合 (Chrome / Edge / Android) */}
              {canPrompt ? (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md mx-auto flex items-center justify-center p-2 border border-sky-100">
                    <img src="./icons/icon-192x192.png" alt="Trainfo Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sky-950 text-sm">アプリ版 Trainfo</h3>
                    <p className="text-sky-800 mt-0.5">
                      全画面表示・高速起動・アドレスバーなしのネイティブ感覚で利用できます。
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00356B] to-[#009A74] hover:from-[#002850] hover:to-[#008060] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>今すぐインストールする</span>
                  </button>
                </div>
              ) : null}

              {/* iOS Safari の場合の手順 */}
              {isIos ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Smartphone className="w-4 h-4 text-sky-600" />
                    <span>iPhone / iPad (Safari) での追加手順</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <p>Safari 画面下部（iPad は上部）の <strong>共有ボタン</strong> <Share className="w-3.5 h-3.5 inline mx-0.5 text-sky-600" /> をタップします。</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <p>メニューをスクロールし、<strong>「ホーム画面に追加」</strong> <PlusSquare className="w-3.5 h-3.5 inline mx-0.5 text-slate-700" /> をタップします。</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <p>右上の <strong>「追加」</strong> をタップすると、ホーム画面に Trainfo のアイコンが追加されます。</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* PC / その他のブラウザの場合 */
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <Monitor className="w-4 h-4 text-slate-700" />
                    <span>PCブラウザ (Chrome / Edge) でのインストール</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <p>
                      ブラウザのアドレスバー右端に表示される <strong>インストールアイコン</strong>（パソコンや「アプリをインストール」マーク）をクリックすることでもインストールできます。
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      ※メニュー（︙）内「保存して共有」＞「Trainfo をインストール」からも行えます。
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* メリット紹介 */}
          <div className="pt-2 border-t border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">インストール版の特徴</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800 block">⚡ 超高速な起動</span>
                <span className="text-slate-500">Service Workerにより即座にロード</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800 block">📱 フルスクリーン表示</span>
                <span className="text-slate-500">ブラウザ枠なしの広い地図画面</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800 block">🏠 ワンタップ起動</span>
                <span className="text-slate-500">ホーム画面やDockから即アクセス</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-semibold text-slate-800 block">📦 軽量＆安全</span>
                <span className="text-slate-500">端末容量を圧迫しない最新PWA規格</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
