import React from 'react';
import { X, Train, MapPin, LocateFixed, Sliders, Layers } from 'lucide-react';
import { getAllLines } from '../../data/linesRegistry';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const lines = getAllLines();

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
              <span>マルチ路線・リアルタイム車両位置の追跡</span>
            </h3>
            <p>
              東武東上線、JR埼京線・川越線、JR武蔵野線（直通含む）、首都圏新都市鉄道つくばエクスプレスの公式ダイヤに基づき、現在走行中の全列車の位置・速度・進行方向を秒単位で高精度に計算して地図上にアニメーション表示します。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>路線セレクター & 絞り込み</span>
            </h3>
            <p>
              画面上部のチェックボックスから、表示したい路線を自由に選択・切り替えできます。方面別（上り・下り）や種別（優等・各停）のフィルタリングにも対応しています。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <MapPin className="w-4 h-4 text-[#ed6d00]" />
              <span>駅詳細＆電光掲示板（発車標）</span>
            </h3>
            <p>
              地図上の駅ピンまたは検索ボックスから駅を選択すると、サイドパネルに駅構内設備、直近の発車案内（電光掲示板風）、および全日時刻表（平日/土休日）が表示されます。南流山や川越、武蔵浦和などの乗換駅では、他路線の同名駅への切り替えも可能です。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <LocateFixed className="w-4 h-4 text-amber-500" />
              <span>列車追尾モード (Track Train)</span>
            </h3>
            <p>
              走行中の列車をクリックすると、列車種別・編成両数・停車駅タイムライン（各駅の着時刻・発時刻）が表示されます。「この列車を追尾する」をONにすると、マップのカメラが列車に追従して自動移動します。
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Sliders className="w-4 h-4 text-purple-600" />
              <span>タイムマシン＆遅延シミュレーション</span>
            </h3>
            <p>
              画面下部のコントローラーで、早送り（最大600倍速）、一時停止、時間帯ジャンプ（朝ラッシュ、夕ラッシュ、終電帯など）が可能です。また、任意の遅延（+5分、+15分、ランダム遅延）を発生させるシミュレーションも行えます。
            </p>
          </section>

          {/* 対応路線一覧 */}
          <section className="pt-3 border-t border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">対応路線一覧</h4>
            <div className="grid grid-cols-2 gap-2">
              {lines.map((l) => (
                <div key={l.id} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: l.lineColor }}
                  />
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">{l.name}</span>
                    <span className="text-[10px] text-slate-400 block">{l.operator}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
