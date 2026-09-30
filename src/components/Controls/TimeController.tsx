import React, { useState } from 'react';
import {
  Play,
  Pause,
  Clock,
  AlertTriangle,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { secondsToTimeString } from '../../data/timetableData';

interface TimeControllerProps {
  currentSec: number;
  onSeek: (sec: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speedMultiplier: number;
  onChangeSpeed: (speed: number) => void;
  onSyncRealTime: () => void;
  isRealTimeSynced: boolean;
  globalDelayMinutes: number;
  onChangeDelay: (minutes: number) => void;
  onToggleRandomDelay: () => void;
  isRandomDelayActive: boolean;
  isSidebarOpen?: boolean;
}

export const TimeController: React.FC<TimeControllerProps> = ({
  currentSec,
  onSeek,
  isPlaying,
  onTogglePlay,
  speedMultiplier,
  onChangeSpeed,
  onSyncRealTime,
  isRealTimeSynced,
  globalDelayMinutes,
  onChangeDelay,
  onToggleRandomDelay,
  isRandomDelayActive,
  isSidebarOpen = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // タイムスタンプ表示
  const timeFormatted = secondsToTimeString(currentSec);

  // 時刻プリセット
  const presets = [
    { label: '朝ラッシュ', time: '08:00', sec: 8 * 3600 },
    { label: '昼デイタイム', time: '13:00', sec: 13 * 3600 },
    { label: '夕ラッシュ', time: '18:30', sec: 18.5 * 3600 },
    { label: '深夜終電帯', time: '23:30', sec: 23.5 * 3600 },
  ];

  const speeds = [1, 2, 5, 10, 30];

  return (
    <div
      className={`absolute bottom-3 z-[1000] pointer-events-auto transition-all duration-300 ease-in-out ${
        isSidebarOpen
          ? 'left-3 sm:left-[436px] right-3 sm:right-6 md:left-[calc(50%+210px)] md:-translate-x-1/2 md:w-[min(680px,calc(100vw-460px))]'
          : 'left-3 right-3 md:left-1/2 md:-translate-x-1/2 md:w-[720px]'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden transition-all">
        {/* メインバー */}
        <div className="p-3 sm:px-4 flex items-center justify-between gap-3">
          {/* デジタル時計表示 ＆ 現在時刻同期 */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <Clock className="w-3.5 h-3.5 text-[#004b97]" />
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                  {timeFormatted}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                {isRealTimeSynced ? '● リアルタイム同期中' : '○ シミュレーション時刻'}
              </span>
            </div>

            <button
              onClick={onSyncRealTime}
              className={`text-[11px] px-2.5 py-1 rounded-lg font-bold border transition-all ${
                isRealTimeSynced
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="現在の実時間へ同期"
            >
              実時間に同期
            </button>
          </div>

          {/* 再生コントロール */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onTogglePlay}
              className={`p-2.5 rounded-full shadow-md text-white transition-all transform active:scale-95 ${
                isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#004b97] hover:bg-blue-800'
              }`}
              title={isPlaying ? '一時停止' : '再生'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>

            {/* 倍速切り替え */}
            <div className="hidden sm:inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-xs font-bold">
              {speeds.map((s) => (
                <button
                  key={s}
                  onClick={() => onChangeSpeed(s)}
                  className={`px-2 py-1 rounded transition-all ${
                    speedMultiplier === s
                      ? 'bg-white text-[#004b97] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* 展開トグルボタン (シミュレーション設定) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="ダイヤ・遅延シミュレーション設定"
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* タイムスライダー */}
        <div className="px-4 pb-2.5">
          <input
            type="range"
            min={4.5 * 3600}
            max={24.8 * 3600}
            step={10}
            value={currentSec}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004b97]"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
            <span>04:30 始発</span>
            <span>08:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:45 終電</span>
          </div>
        </div>

        {/* 展開時: ダイヤプリセット＆遅延シナリオ操作 */}
        {isExpanded && (
          <div className="p-3 bg-slate-50 border-t border-slate-200/80 space-y-3 text-xs">
            {/* プリセット時間ジャンプ */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-slate-600 shrink-0">時間帯ジャンプ:</span>
              <div className="flex gap-1.5 flex-wrap">
                {presets.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => onSeek(p.sec)}
                    className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors shadow-2xs"
                  >
                    {p.label} ({p.time})
                  </button>
                ))}
              </div>
            </div>

            {/* 遅延シミュレーション機能 */}
            <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-t border-slate-200/60">
              <span className="font-bold text-slate-600 flex items-center gap-1 shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                遅延シミュレーション:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => onChangeDelay(0)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    globalDelayMinutes === 0 && !isRandomDelayActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  定刻 (平常)
                </button>
                <button
                  onClick={() => onChangeDelay(5)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    globalDelayMinutes === 5
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  全線+5分遅延
                </button>
                <button
                  onClick={() => onChangeDelay(15)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    globalDelayMinutes === 15
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  全線+15分大幅遅れ
                </button>
                <button
                  onClick={onToggleRandomDelay}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    isRandomDelayActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  ランダム局所遅延
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
