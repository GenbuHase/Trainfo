import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Clock,
  AlertTriangle,
  Sliders,
  ChevronDown,
  ChevronUp,
  Gauge,
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
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
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
  isExpanded,
  onToggleExpanded,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [isSpeedMenuOpen, setIsSpeedMenuOpen] = useState(false);
  const speedMenuRef = useRef<HTMLDivElement>(null);
  const effectiveExpanded = isExpanded !== undefined ? isExpanded : internalExpanded;

  useEffect(() => {
    if (!isSpeedMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target as Node)) {
        setIsSpeedMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSpeedMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSpeedMenuOpen]);

  const handleToggleExpand = () => {
    if (onToggleExpanded) {
      onToggleExpanded();
    } else {
      setInternalExpanded((prev) => !prev);
    }
  };

  // タイムスタンプ表示
  const timeFormatted = secondsToTimeString(currentSec);

  // スライダーの範囲設定 (04:00 始発・早朝 〜 28:00 / 翌04:00 24時間フルサイクル)
  const MIN_SEC = 4 * 3600; // 04:00 (14,400秒)
  const MAX_SEC = 28 * 3600; // 28:00 / 翌04:00 (100,800秒)
  const TOTAL_SEC = MAX_SEC - MIN_SEC; // ちょうど24時間 (86,400秒)

  // 実際の時間と完全に一致するスライダー目盛り定義
  const sliderMarks = [
    { label: '08:00', sec: 8 * 3600 },
    { label: '12:00', sec: 12 * 3600 },
    { label: '16:00', sec: 16 * 3600 },
    { label: '20:00', sec: 20 * 3600 },
    { label: '24:00', sec: 24 * 3600 },
    { label: '02:00', sec: 26 * 3600 },
  ];

  // 時刻プリセット
  const presets = [
    { label: '早朝・始発', time: '05:00', sec: 5 * 3600 },
    { label: '朝ラッシュ', time: '08:00', sec: 8 * 3600 },
    { label: '昼デイタイム', time: '13:00', sec: 13 * 3600 },
    { label: '夕ラッシュ', time: '18:30', sec: 18.5 * 3600 },
    { label: '深夜終電帯', time: '24:15', sec: 24.25 * 3600 },
    { label: '夜行・未明', time: '02:30', sec: 26.5 * 3600 },
  ];

  const speeds = [1, 2, 5, 10, 30, 60, 120, 300, 600, 1200, 1800, 3600];

  return (
    <div
      className={`absolute bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[1000] pointer-events-auto transition-all duration-300 ease-in-out ${
        isSidebarOpen
          ? 'left-[calc(0.75rem+env(safe-area-inset-left,0px))] right-[calc(0.75rem+env(safe-area-inset-right,0px))] sm:left-[calc(460px+env(safe-area-inset-left,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] md:left-[calc(50%+232px)] md:-translate-x-1/2 md:w-[min(680px,calc(100vw-500px))]'
          : 'left-[calc(0.75rem+env(safe-area-inset-left,0px))] right-[calc(0.75rem+env(safe-area-inset-right,0px))] md:left-1/2 md:-translate-x-1/2 md:w-[720px]'
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 transition-all">
        {/* メインバー */}
        <div className="p-2.5 sm:p-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-3">
          {/* デジタル時計表示 ＆ 現在時刻同期 */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline gap-1">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#004b97] shrink-0" />
                <span className="font-mono text-lg sm:text-2xl font-black text-slate-900 tracking-wide sm:tracking-wider whitespace-nowrap">
                  {timeFormatted}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium truncate max-w-[120px] sm:max-w-none">
                {isRealTimeSynced ? '● リアルタイム' : '○ シミュレーション'}
              </span>
            </div>

            <button
              onClick={onSyncRealTime}
              className={`text-[10px] sm:text-[11px] px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-lg font-bold border transition-all whitespace-nowrap shrink-0 ${
                isRealTimeSynced
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
              }`}
              title="現在の実時間へ同期"
            >
              <span className="hidden xs:inline">実時間に</span>同期
            </button>
          </div>

          {/* 再生コントロール */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={onTogglePlay}
              className={`p-2 sm:p-2.5 rounded-full shadow-md text-white transition-all transform active:scale-95 ${
                isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-[#004b97] hover:bg-blue-800'
              }`}
              title={isPlaying ? '一時停止' : '再生'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />}
            </button>

            {/* 倍速切り替えポップオーバー */}
            <div className="relative" ref={speedMenuRef}>
              <button
                type="button"
                onClick={() => setIsSpeedMenuOpen((prev) => !prev)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border text-[11px] sm:text-xs font-bold transition-all shadow-2xs whitespace-nowrap ${
                  isSpeedMenuOpen
                    ? 'bg-blue-50 border-[#004b97] text-[#004b97]'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
                title="再生速度を変更"
              >
                <Gauge className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#004b97]" />
                <span className="font-mono min-w-[24px] sm:min-w-[28px] text-center">{speedMultiplier}x</span>
                <ChevronUp
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform duration-200 ${
                    isSpeedMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* ポップオーバーメニュー */}
              {isSpeedMenuOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-slate-200 p-2.5 z-50 min-w-[240px]">
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-[#004b97]" />
                      再生速度
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">選択中: {speedMultiplier}x</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {speeds.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          onChangeSpeed(s);
                          setIsSpeedMenuOpen(false);
                        }}
                        className={`px-1.5 py-1.5 rounded text-[11px] font-mono font-bold transition-all text-center ${
                          speedMultiplier === s
                            ? 'bg-[#004b97] text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/60'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 展開トグルボタン (シミュレーション設定) */}
            <button
              onClick={handleToggleExpand}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="ダイヤ・遅延シミュレーション設定"
            >
              {effectiveExpanded ? <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>
          </div>
        </div>

        {/* タイムスライダー */}
        <div className="px-4 pb-2.5">
          {/* スライダー上部: 始発・終電インジケーター */}
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1 select-none">
            <button
              type="button"
              onClick={() => onSeek(MIN_SEC)}
              className="hover:text-[#004b97] transition-colors cursor-pointer flex items-center gap-1"
              title="早朝 04:00へジャンプ"
            >
              <span className="text-[9px] px-1 py-0.2 bg-slate-100 rounded text-slate-500 font-medium">起点</span>
              <span className="font-semibold text-slate-600 hover:text-[#004b97]">04:00</span>
            </button>
            <button
              type="button"
              onClick={() => onSeek(MAX_SEC)}
              className="hover:text-[#004b97] transition-colors cursor-pointer flex items-center gap-1"
              title="翌朝 04:00へジャンプ"
            >
              <span className="font-semibold text-slate-600 hover:text-[#004b97]">翌04:00</span>
              <span className="text-[9px] px-1 py-0.2 bg-slate-100 rounded text-slate-500 font-medium">終点</span>
            </button>
          </div>

          <input
            type="range"
            min={MIN_SEC}
            max={MAX_SEC}
            step={10}
            value={currentSec < 4 * 3600 ? currentSec + 86400 : currentSec}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#004b97]"
          />
          {/* ティックマーク（目盛り線: 実際の秒数と完全一致） */}
          <div className="relative w-full h-1 mt-0.5 pointer-events-none">
            {[4 * 3600, 8 * 3600, 12 * 3600, 16 * 3600, 20 * 3600, 24 * 3600, 26 * 3600, 28 * 3600].map((sec) => {
              const percent = ((sec - MIN_SEC) / TOTAL_SEC) * 100;
              return (
                <div
                  key={sec}
                  className="absolute top-0 w-0.5 h-1 bg-slate-300 rounded-full -translate-x-1/2"
                  style={{ left: `${percent}%` }}
                />
              );
            })}
          </div>
          {/* 目盛りラベル（実際の秒数と完全一致・クリックでジャンプ可能） */}
          <div className="relative w-full h-4 text-[10px] text-slate-400 font-mono mt-0.5 select-none">
            {sliderMarks.map((mark) => {
              const percent = ((mark.sec - MIN_SEC) / TOTAL_SEC) * 100;

              return (
                <button
                  key={mark.sec}
                  type="button"
                  onClick={() => onSeek(mark.sec)}
                  className="absolute top-0 -translate-x-1/2 hover:text-[#004b97] transition-colors cursor-pointer group"
                  style={{ left: `${percent}%` }}
                  title={`${mark.label}へジャンプ`}
                >
                  <span className="font-semibold text-slate-600 group-hover:text-[#004b97] transition-colors">
                    {mark.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 展開時: ダイヤプリセット＆遅延シナリオ操作 */}
        {effectiveExpanded && (
          <div className="p-3 bg-slate-50 border-t border-slate-200/80 rounded-b-2xl space-y-3 text-xs">
            {/* 倍速選択（展開パネル用） */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-bold text-slate-600 shrink-0">再生速度:</span>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 flex-1 max-w-[460px]">
                {speeds.map((s) => (
                  <button
                    key={s}
                    onClick={() => onChangeSpeed(s)}
                    className={`px-1.5 py-1 rounded text-xs font-mono font-bold transition-all text-center ${
                      speedMultiplier === s
                        ? 'bg-[#004b97] text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            </div>

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
