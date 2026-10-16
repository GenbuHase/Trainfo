import React, { useState, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  Search,
  Copy,
  Check,
  Palette,
  Building2,
  MapPin,
  Train,
  SlidersHorizontal,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  getAllLines,
  getLinesGroupedByOperator,
} from '../../data/linesRegistry';
import type { LineDefinition, TrainTypeConfig } from '../../types';
import { StationBadge } from '../Common/Badges';

interface DebugLinesPageProps {
  onBackToMap: () => void;
}

export const DebugLinesPage: React.FC<DebugLinesPageProps> = ({ onBackToMap }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const allLines = useMemo(() => getAllLines(), []);
  const groupedByOperator = useMemo(() => getLinesGroupedByOperator(), []);

  // コピー処理
  const handleCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedColor(text);
    setTimeout(() => {
      setCopiedColor((prev) => (prev === text ? null : prev));
    }, 1500);
  }, []);

  // 統計情報
  const stats = useMemo(() => {
    const totalLines = allLines.length;
    const totalOperators = groupedByOperator.length;
    let totalTrainTypes = 0;
    const uniqueStations = new Set<string>();

    allLines.forEach((line) => {
      totalTrainTypes += Object.keys(line.trainTypes || {}).length;
      line.stations.forEach((st) => uniqueStations.add(st.name));
    });

    return {
      totalLines,
      totalOperators,
      totalTrainTypes,
      totalUniqueStations: uniqueStations.size,
    };
  }, [allLines, groupedByOperator]);

  // フィルタリング処理
  const filteredLines = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allLines.filter((line) => {
      // 事業者フィルタ
      if (selectedOperator !== 'all' && line.operator !== selectedOperator) {
        return false;
      }
      // 検索クエリフィルタ
      if (!query) return true;

      const matchesName = line.name.toLowerCase().includes(query);
      const matchesShortName = line.shortName.toLowerCase().includes(query);
      const matchesId = line.id.toLowerCase().includes(query);
      const matchesOperator = (line.operator || '').toLowerCase().includes(query);
      const matchesColor = line.lineColor.toLowerCase().includes(query);

      // 種別名・キーとのマッチ
      const matchesTrainType = Object.values(line.trainTypes || {}).some(
        (tt) =>
          tt.name.toLowerCase().includes(query) ||
          tt.nameEn.toLowerCase().includes(query) ||
          tt.shortName.toLowerCase().includes(query) ||
          tt.key.toLowerCase().includes(query) ||
          tt.color.toLowerCase().includes(query)
      );

      return (
        matchesName ||
        matchesShortName ||
        matchesId ||
        matchesOperator ||
        matchesColor ||
        matchesTrainType
      );
    });
  }, [allLines, searchQuery, selectedOperator]);

  // 背景色に応じた文字色（白/黒）の自動判定
  const getContrastTextColor = (hexColor: string): string => {
    const hex = hexColor.replace('#', '');
    if (hex.length !== 6) return '#ffffff';
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? '#0f172a' : '#ffffff';
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 text-slate-800 flex flex-col font-sans select-text">
      {/* トップナビゲーションバー */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToMap}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all border border-slate-300 shadow-2xs active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>マップに戻る</span>
            </button>
            <div className="h-6 w-px bg-slate-300 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Train className="w-5 h-5 text-blue-600" />
                  <span>路線・列車種別一覧</span>
                </h1>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full">
                  Debug Mode
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                ニコニコ大百科「鉄道路線のラインカラー一覧」準拠のカラー設定および全35路線の種別定義
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <a
              href="https://dic.nicovideo.jp/a/%E9%89%84%E9%81%93%E8%B7%AF%E7%B7%9A%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%B3%E3%82%AB%E3%83%A9%E3%83%BC%E4%B8%80%E8%A6%A7"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors"
            >
              <span>参照記事を開く</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* メインエリア */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6 flex-1">
        {/* サマリーカード */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Train className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">実装路線数</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {stats.totalLines} <span className="text-xs font-normal text-slate-500">路線</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">運行事業者</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {stats.totalOperators} <span className="text-xs font-normal text-slate-500">社</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">定義済み種別数</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {stats.totalTrainTypes} <span className="text-xs font-normal text-slate-500">種別</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500">ユニーク駅数</div>
              <div className="text-2xl font-black text-slate-900 tracking-tight">
                {stats.totalUniqueStations} <span className="text-xs font-normal text-slate-500">駅</span>
              </div>
            </div>
          </div>
        </section>

        {/* クイックカラーパレット（全路線のラインカラーを並べて俯瞰） */}
        <section className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-blue-500" />
              全35路線ラインカラーパレット（クリックで各路線へスクロール）
            </span>
            <span className="text-slate-400 font-normal">全35色</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {allLines.map((line) => (
              <a
                key={line.id}
                href={`#line-${line.id}`}
                title={`${line.name} (${line.lineColor})`}
                className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white text-xs font-medium transition-all shadow-2xs hover:scale-105"
              >
                <span
                  className="w-3.5 h-3.5 rounded-full shrink-0 shadow-inner border border-black/10"
                  style={{ backgroundColor: line.lineColor }}
                />
                <span className="truncate max-w-[100px] text-slate-700">{line.shortName}</span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600">
                  {line.lineColor}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* 検索・フィルターエリア */}
        <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* 検索バー */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="路線名、事業者名、種別名（各停、快速、特急など）、カラーコードで検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            <div className="text-xs text-slate-500 font-semibold shrink-0">
              該当: <span className="text-blue-600 font-bold">{filteredLines.length}</span> / {allLines.length} 路線
            </div>
          </div>

          {/* 事業者フィルタータグ */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1 mr-1 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              事業者:
            </span>
            <button
              type="button"
              onClick={() => setSelectedOperator('all')}
              className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-all cursor-pointer ${
                selectedOperator === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              すべて ({allLines.length})
            </button>
            {groupedByOperator.map((group) => {
              const isSelected = selectedOperator === group.operator;
              return (
                <button
                  key={group.operator}
                  type="button"
                  onClick={() => setSelectedOperator(group.operator)}
                  className={`px-3 py-1 rounded-lg font-semibold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {group.operator} ({group.lines.length})
                </button>
              );
            })}
          </div>
        </section>

        {/* 路線カード一覧 */}
        <section className="space-y-5">
          {filteredLines.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
              <Info className="w-10 h-10 text-slate-400 mx-auto" />
              <div className="text-base font-bold text-slate-700">該当する路線が見つかりませんでした</div>
              <p className="text-xs text-slate-500">
                検索条件や事業者フィルターを変更してお試しください。
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedOperator('all');
                }}
                className="mt-2 px-4 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
              >
                フィルターをリセット
              </button>
            </div>
          ) : (
            filteredLines.map((line) => (
              <LineCard
                key={line.id}
                line={line}
                copiedColor={copiedColor}
                onCopy={handleCopy}
                getContrastTextColor={getContrastTextColor}
              />
            ))
          )}
        </section>
      </main>

      {/* フッター */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Trainfo Line &amp; Train Type Debugger</span>
          <span>データ参照: ニコニコ大百科「鉄道路線のラインカラー一覧」</span>
        </div>
      </footer>
    </div>
  );
};

// 各路線の詳細カードコンポーネント
interface LineCardProps {
  line: LineDefinition;
  copiedColor: string | null;
  onCopy: (color: string) => void;
  getContrastTextColor: (color: string) => string;
}

const LineCard: React.FC<LineCardProps> = ({
  line,
  copiedColor,
  onCopy,
  getContrastTextColor,
}) => {
  const trainTypeList = Object.values(line.trainTypes || {});
  const sampleStation = line.stations[0];

  return (
    <article
      id={`line-${line.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:shadow-md"
    >
      {/* 路線ヘッダー */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-r from-slate-50/80 to-white">
        <div className="flex items-start gap-3.5">
          {/* 左端のラインカラーアクセントピラー */}
          <div
            className="w-3.5 self-stretch rounded-full shrink-0 shadow-xs"
            style={{ backgroundColor: line.lineColor }}
          />

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 bg-slate-200/70 px-2.5 py-0.5 rounded-md">
                {line.operator}
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                id: {line.id}
              </span>
              {sampleStation?.stationNumber && (
                <div className="scale-90 origin-left">
                  <StationBadge id={sampleStation.stationNumber} size="sm" />
                </div>
              )}
            </div>

            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{line.name}</span>
              <span className="text-sm font-normal text-slate-500">({line.shortName})</span>
            </h2>

            <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
              <span>
                駅数: <strong className="text-slate-700">{line.stations.length}</strong> 駅
              </span>
              {line.directionNames?.inboundFull && (
                <span>
                  上り: <strong className="text-slate-700">{line.directionNames.inboundFull}</strong>
                </span>
              )}
              {line.directionNames?.outboundFull && (
                <span>
                  下り: <strong className="text-slate-700">{line.directionNames.outboundFull}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* カラーコード情報 */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-center shrink-0">
          {/* ラインカラー */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-2.5 shadow-2xs">
            <span
              className="w-7 h-7 rounded-lg shrink-0 shadow-inner border border-black/10 flex items-center justify-center font-bold text-[10px]"
              style={{
                backgroundColor: line.lineColor,
                color: getContrastTextColor(line.lineColor),
              }}
            >
              LC
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-slate-400 leading-tight">ラインカラー</span>
              <button
                type="button"
                onClick={() => onCopy(line.lineColor)}
                className="font-mono text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                title="クリックしてカラーコードをコピー"
              >
                <span>{line.lineColor}</span>
                {copiedColor === line.lineColor ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* アクセントカラー */}
          {line.accentColor && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-2.5 shadow-2xs">
              <span
                className="w-7 h-7 rounded-lg shrink-0 shadow-inner border border-black/10 flex items-center justify-center font-bold text-[10px]"
                style={{
                  backgroundColor: line.accentColor,
                  color: getContrastTextColor(line.accentColor),
                }}
              >
                AC
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-slate-400 leading-tight">アクセント</span>
                <button
                  type="button"
                  onClick={() => onCopy(line.accentColor!)}
                  className="font-mono text-xs font-bold text-slate-800 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                  title="クリックしてカラーコードをコピー"
                >
                  <span>{line.accentColor}</span>
                  {copiedColor === line.accentColor ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 hover:text-slate-600" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 種別一覧セクション */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Train className="w-4 h-4 text-slate-400" />
            <span>登録列車種別 ({trainTypeList.length} 件)</span>
          </h3>
        </div>

        {trainTypeList.length === 0 ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
            この路線には個別の種別定義がありません（全列車各駅停車扱いなど）
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {trainTypeList.map((typeConfig) => (
              <TrainTypeCard
                key={typeConfig.key}
                config={typeConfig}
                copiedColor={copiedColor}
                onCopy={onCopy}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

// 列車種別カード
interface TrainTypeCardProps {
  config: TrainTypeConfig;
  copiedColor: string | null;
  onCopy: (color: string) => void;
}

const TrainTypeCard: React.FC<TrainTypeCardProps> = ({
  config,
  copiedColor,
  onCopy,
}) => {
  return (
    <div className="bg-slate-50/80 rounded-xl border border-slate-200 p-3.5 space-y-2.5 transition-all hover:bg-white hover:border-slate-300 hover:shadow-2xs">
      {/* 種別プレビューバッジ */}
      <div className="flex items-center justify-between gap-2">
        <div
          className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wide shadow-2xs inline-flex items-center gap-1 border"
          style={{
            backgroundColor: config.bgColor || config.color,
            color: config.textColor || '#ffffff',
            borderColor: config.borderColor || config.color,
          }}
        >
          <span>{config.name}</span>
          {config.shortName && config.shortName !== config.name && (
            <span className="opacity-80 text-[10px]">({config.shortName})</span>
          )}
        </div>

        <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
          {config.key}
        </span>
      </div>

      {/* 種別詳細 */}
      <div className="text-xs space-y-1">
        <div className="flex items-center justify-between text-slate-600">
          <span className="text-slate-400 text-[11px]">英語表記</span>
          <span className="font-medium truncate max-w-[150px]">{config.nameEn || '-'}</span>
        </div>
      </div>

      {/* カラーコード内訳 */}
      <div className="pt-2 border-t border-slate-200/80 grid grid-cols-3 gap-1.5 text-[10px] font-mono">
        {/* 背景色 */}
        {(() => {
          const bgVal = config.bgColor || config.color;
          const isCopied = copiedColor === bgVal;
          return (
            <div
              onClick={() => onCopy(bgVal)}
              className="flex flex-col items-center bg-white p-1 rounded border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors"
              title={`背景色: ${bgVal}`}
            >
              <span className="text-[9px] text-slate-400 font-sans">背景色</span>
              <div className="flex items-center gap-1 mt-0.5">
                {isCopied ? (
                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                ) : (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: bgVal }}
                  />
                )}
                <span className="text-[9px] truncate max-w-[45px]">{bgVal}</span>
              </div>
            </div>
          );
        })()}

        {/* 文字色 */}
        {(() => {
          const textVal = config.textColor || '#ffffff';
          const isCopied = copiedColor === textVal;
          return (
            <div
              onClick={() => onCopy(textVal)}
              className="flex flex-col items-center bg-white p-1 rounded border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors"
              title={`文字色: ${textVal}`}
            >
              <span className="text-[9px] text-slate-400 font-sans">文字色</span>
              <div className="flex items-center gap-1 mt-0.5">
                {isCopied ? (
                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                ) : (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: textVal }}
                  />
                )}
                <span className="text-[9px] truncate max-w-[45px]">{textVal}</span>
              </div>
            </div>
          );
        })()}

        {/* 枠線色 */}
        {(() => {
          const borderVal = config.borderColor || config.color;
          const isCopied = copiedColor === borderVal;
          return (
            <div
              onClick={() => onCopy(borderVal)}
              className="flex flex-col items-center bg-white p-1 rounded border border-slate-200 hover:border-blue-400 cursor-pointer transition-colors"
              title={`枠線色: ${borderVal}`}
            >
              <span className="text-[9px] text-slate-400 font-sans">枠線色</span>
              <div className="flex items-center gap-1 mt-0.5">
                {isCopied ? (
                  <Check className="w-2.5 h-2.5 text-emerald-600" />
                ) : (
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/20"
                    style={{ backgroundColor: borderVal }}
                  />
                )}
                <span className="text-[9px] truncate max-w-[45px]">{borderVal}</span>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
