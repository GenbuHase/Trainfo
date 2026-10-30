import React from 'react';
import { X, Train, MapPin, LocateFixed, Sliders, Layers, Download, Sparkles } from 'lucide-react';
import { getLinesGroupedByOperator } from '../../data/linesRegistry';

import { useUI } from '../../contexts/UIContext';

export const HelpModal: React.FC = () => {
  const { isHelpOpen: isOpen, closeHelp: onClose } = useUI();

  if (!isOpen) return null;

  const groupedLines = getLinesGroupedByOperator();
  const totalLines = groupedLines.reduce((sum, g) => sum + g.lines.length, 0);

  return (
    <div className="fixed inset-0 z-[2000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* ヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#004b97] text-white flex items-center justify-center font-black text-xs">
              T
            </div>
            <h2 className="text-base font-bold text-slate-800">Trainfo の使い方</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-slate-600 leading-relaxed">
          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Train className="w-4 h-4 text-[#004b97]" />
              <span>広域マルチ路線・リアルタイム車両位置の追跡</span>
            </h3>
            <p>
              関東・甲信越・東北・東海エリアにまたがる<strong>{groupedLines.length}事業者・全{totalLines}路線</strong>（新幹線・JR在来線・東京メトロ全線・大手私鉄・第三セクター）の公式ダイヤに基づき、現在走行中の全列車の位置・加減速・進行方向・相互直通運転・併結分割運転を高精度に計算して地図上にアニメーション表示します。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>会社別 / エリア別 路線セレクター & 絞り込み</span>
            </h3>
            <p>
              マップ左下の「表示路線」ドックから、<strong>「🏢 会社別」</strong>と<strong>「🗺️ エリア別（関東・甲信越・東北・東海）」</strong>の2モードで路線を選択・検索できます。「のみ」ボタンでの単独抽出や、方面別（上り・下り）・種別（優等・各停）・駅ピン表示モードの切り替えにも対応しています。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-[#ed6d00]" />
              <span>駅詳細＆電光掲示板（発車標）</span>
            </h3>
            <p>
              地図上の駅ピンまたは検索ボックスから駅を選択すると、サイドパネルに駅構内設備、直近の発車案内（電光掲示板風）、および全日時刻表（平日/土休日）が表示されます。東京・新宿・渋谷・大宮・横浜・北千住・高崎・新潟・長野などの乗換駅では、他社線・他路線の同名駅へワンクリックで切り替え可能です。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <LocateFixed className="w-4 h-4 text-amber-500" />
              <span>列車追尾モード & 直通全区間タイムライン・併結切替</span>
            </h3>
            <p>
              走行中の列車をクリックすると、列車種別・編成両数・停車駅タイムラインが表示されます。直通列車では<strong>「路線内 / 全区間」</strong>の表示切替、併結列車（はやぶさ＋こまち、あずさ＋富士回遊、踊り子、リバティ、ロマンスカー等）では<strong>連結相手編成へのワンタップ切替</strong>が可能です。また、追尾中に他の列車を非表示にして対象列車のみを鑑賞することもできます。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>試運転・臨時列車クリエイター</span>
            </h3>
            <p>
              ヘッダーの「試運転」ボタンから、複数路線をまたぐ直通ルート・停車/通過駅パターン・発着時刻・編成両数・巡航速度・カスタム種別カラーを自由に設計し、オリジナルの臨時列車をマップ上へ即座に発車・プリセット保存できます。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Sliders className="w-4 h-4 text-purple-600" />
              <span>タイムマシン＆遅延シミュレーション</span>
            </h3>
            <p>
              ヘッダーのコントローラーで、早送り（最大3600倍速）、一時停止、時間帯ジャンプ（朝ラッシュ、夕ラッシュ、終電帯など）が可能です。また、任意の遅延（+5分、+15分、ランダム遅延）を発生させるシミュレーションも行えます。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Download className="w-4 h-4 text-sky-600" />
              <span>ホーム画面・PCへのアプリインストール (PWA)</span>
            </h3>
            <p>
              Trainfo は Progressive Web App (PWA) に対応しており、スマホのホーム画面やPCデスクトップにアプリとしてインストールできます。アドレスバーのないフルスクリーン画面と高速起動でご利用いただけます（画面上部のダウンロードボタンからいつでもインストール可能）。
            </p>
          </section>

          {/* 対応路線一覧 */}
          <section className="pt-3 border-t border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-800 mb-1">
              対応路線一覧（{groupedLines.length}事業者・全{totalLines}路線）
            </h4>
            {groupedLines.map((group) => (
              <div key={group.operator} className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                  <span className="w-1 h-3 rounded-full bg-sky-500 shrink-0" />
                  <span>{group.operator}（{group.lines.length}路線）</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.lines.map((l) => (
                    <div key={l.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                        style={{ backgroundColor: l.lineColor }}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-800 text-[11px] block truncate">{l.name}</span>
                        <span className="text-[10px] text-slate-400 block truncate">全{l.stations.length}駅</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
