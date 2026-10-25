import React, { useState, useMemo, useEffect } from 'react';
import {
  X,
  Play,
  Trash2,
  LocateFixed,
  Search,
  Train,
  Navigation,
  Plus,
  ArrowUpDown,
  Clock,
  Sparkles,
  Bookmark,
  Save,
  RotateCcw,
  CheckCircle2,
  Circle,
  Link2,
  Palette,
  Sliders,
  ChevronRight,
  Pin,
} from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { useSimulation } from '../../contexts/SimulationContext';
import { useSelection } from '../../contexts/SelectionContext';
import {
  getAllLines,
  getLinesGroupedByOperator,
  getLine,
  getTrainTypeConfig,
} from '../../data/linesRegistry';
import { STATION_MAP } from '../../data/stations';
import { StationBadge, TrainTypeBadge } from '../Common/Badges';
import {
  createDefaultCustomTrainPlan,
  recalculatePlanSchedule,
  buildSegmentStops,
  createRouteSegment,
  appendConnectedSegment,
  getConnectableLines,
  findConnectingStationPairs,
  secondsToHHMM,
  secondsToTimeString,
  hhmmToSeconds,
  BUILTIN_TRAIN_TEMPLATES,
  loadSavedCustomTrainPresets,
  saveCustomTrainPreset,
  deleteCustomTrainPreset,
  type CustomTrainPlan,
} from '../../services/testTrainService';
import { timeStringToSeconds } from '../../data/timetableData';
import type { LineId, TrainTypeKey } from '../../types';

type CreatorTab = 'route' | 'stops' | 'customize' | 'presets';

const CUSTOM_TYPE_PRESETS = [
  { name: '試運転', shortName: '試', color: '#0284c7' },
  { name: '臨時', shortName: '臨', color: '#7c3aed' },
  { name: '臨時特急', shortName: '臨特', color: '#e11d48' },
  { name: '臨時急行', shortName: '臨急', color: '#ea580c' },
  { name: '団体', shortName: '団', color: '#059669' },
  { name: '回送', shortName: '回', color: '#475569' },
  { name: '検測', shortName: '検', color: '#ca8a04' },
  { name: '特別快速', shortName: '特快', color: '#2563eb' },
];

const COLOR_SWATCHES = [
  '#0284c7', // スカイブルー (試運転標準)
  '#7c3aed', // バイオレット (臨時)
  '#e11d48', // ローズレッド (特急・急行系)
  '#ea580c', // オレンジ
  '#ca8a04', // アンバーゴールド
  '#059669', // エメラルドグリーン (準急・団体)
  '#2563eb', // ロイヤルブルー
  '#9c5e31', // メトロ副都心ブラウン
  '#1e293b', // スレートブラック (普通・回送)
];

export const TestRunModal: React.FC = () => {
  const ui = useUI();
  const sim = useSimulation();
  const sel = useSelection();

  const [activeTab, setActiveTab] = useState<CreatorTab>('route');
  const [plan, setPlan] = useState<CustomTrainPlan>(() =>
    createDefaultCustomTrainPlan(sim.currentSec, 'tojo')
  );

  // 路線追加・変更用の検索フィルター状態
  const [addingLineModalOpen, setAddingLineModalOpen] = useState<boolean>(false);
  const [editingSegmentIdxForLine, setEditingSegmentIdxForLine] = useState<number | null>(null);
  const [lineSearchQuery, setLineSearchQuery] = useState('');
  const [selectedOperator, setSelectedOperator] = useState('all');

  // 停車駅タブ用のフィルター状態
  const [selectedStopSegmentFilter, setSelectedStopSegmentFilter] = useState<string>('all');
  const [stationSearchQuery, setStationSearchQuery] = useState('');

  // プリセット保存用の入力状態
  const [savedPresets, setSavedPresets] = useState<CustomTrainPlan[]>(() =>
    loadSavedCustomTrainPresets()
  );
  const [presetNameInput, setPresetNameInput] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const allLines = useMemo(() => getAllLines(), []);
  const groupedByOperator = useMemo(() => getLinesGroupedByOperator(), []);

  // モーダルを開いたときに「現在時刻発車」モードなら時刻を再計算して最新化
  useEffect(() => {
    if (ui.isTestRunOpen) {
      setPlan((prev) => recalculatePlanSchedule(prev, sim.currentSec));
      setSavedPresets(loadSavedCustomTrainPresets());
    }
  }, [ui.isTestRunOpen]);

  // 表示用の計算済みプラン（現在時刻連動）
  const computedPlan = useMemo(
    () => recalculatePlanSchedule(plan, sim.currentSec),
    [plan, sim.currentSec]
  );

  // 最終路線から直通可能な接続路線レコメンド
  const connectableNextLines = useMemo(() => {
    if (computedPlan.segments.length === 0) return [];
    const lastSeg = computedPlan.segments[computedPlan.segments.length - 1];
    const usedLineIds = new Set(computedPlan.segments.map((s) => s.lineId));
    return getConnectableLines(lastSeg.lineId, lastSeg.toStationId, lastSeg.fromStationId)
      .filter((item) => !usedLineIds.has(item.line.id))
      .slice(0, 8);
  }, [computedPlan.segments]);

  // 路線ピッカー用のフィルタリング済み路線
  const filteredLines = useMemo(() => {
    const q = lineSearchQuery.trim().toLowerCase();
    return allLines.filter((l) => {
      if (selectedOperator !== 'all' && l.operator !== selectedOperator) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.shortName.toLowerCase().includes(q) ||
        l.id.toLowerCase().includes(q) ||
        l.operator.toLowerCase().includes(q)
      );
    });
  }, [allLines, lineSearchQuery, selectedOperator]);

  // 現在登録・稼働中の試運転/臨時列車一覧
  const registeredCustomChains = useMemo(() => {
    const dayTrips = sim.testTrainTrips.filter((t) => t.isHoliday === sim.isHoliday);
    const groups = new Map<string, typeof dayTrips>();
    for (const t of dayTrips) {
      const key = t.trainId || t.tripId;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(t);
    }

    return Array.from(groups.entries()).map(([chainKey, trips]) => {
      const firstTrip = trips[0];
      const lastTrip = trips[trips.length - 1];
      const liveTrain = sim.activeTrains.find((at) =>
        trips.some((tr) => tr.tripId === at.tripId)
      );
      const startTime = firstTrip.stops[0]?.departureTime?.slice(0, 5) || '--:--';
      const endTime =
        lastTrip.stops[lastTrip.stops.length - 1]?.arrivalTime?.slice(0, 5) || '--:--';
      const startSec = firstTrip.stops[0]?.departureTime
        ? timeStringToSeconds(firstTrip.stops[0].departureTime)
        : 0;

      return {
        chainKey,
        firstTrip,
        lastTrip,
        trips,
        liveTrain,
        startTime,
        endTime,
        startSec,
      };
    });
  }, [sim.testTrainTrips, sim.isHoliday, sim.activeTrains]);

  // ------------------------------------------------------------------
  // プラン編集ハンドラー群
  // ------------------------------------------------------------------

  // セグメントの路線を変更
  const handleReplaceSegmentLine = (segIdx: number, newLineId: LineId) => {
    setPlan((prev) => {
      const nextSegments = [...prev.segments];
      const newSeg = createRouteSegment(newLineId, {
        defaultStopSec: prev.defaultStopSec,
      });

      // 前のセグメントがある場合は接続駅を自動調整
      if (segIdx > 0) {
        const prevSeg = nextSegments[segIdx - 1];
        const pairs = findConnectingStationPairs(prevSeg.lineId, newLineId, prevSeg.fromStationId);
        if (pairs.length > 0) {
          const best = pairs[0];
          const rebuiltPrev = buildSegmentStops(
            prevSeg.lineId,
            prevSeg.fromStationId,
            best.stationA.id,
            prevSeg.trainType,
            prev.defaultStopSec,
            prevSeg.stops,
            false
          );
          nextSegments[segIdx - 1] = {
            ...prevSeg,
            toStationId: best.stationA.id,
            direction: rebuiltPrev.direction,
            stops: rebuiltPrev.stops,
          };

          const lineDef = getLine(newLineId);
          if (lineDef && lineDef.stations.length >= 2) {
            const bIdx = lineDef.stations.findIndex((s) => s.id === best.stationB.id);
            const farEndId =
              bIdx <= lineDef.stations.length / 2
                ? lineDef.stations[lineDef.stations.length - 1].id
                : lineDef.stations[0].id;
            const rebuiltNew = buildSegmentStops(
              newLineId,
              best.stationB.id,
              farEndId,
              newSeg.trainType,
              prev.defaultStopSec
            );
            newSeg.fromStationId = best.stationB.id;
            newSeg.toStationId = farEndId;
            newSeg.direction = rebuiltNew.direction;
            newSeg.stops = rebuiltNew.stops;
          }
        }
      }

      nextSegments[segIdx] = newSeg;
      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
    setEditingSegmentIdxForLine(null);
    setAddingLineModalOpen(false);
  };

  // 直通路線を末尾に追加
  const handleAddConnectedLine = (nextLineId: LineId) => {
    setPlan((prev) => appendConnectedSegment(prev, nextLineId, sim.currentSec));
    setAddingLineModalOpen(false);
  };

  // セグメントを削除
  const handleRemoveSegment = (segIdx: number) => {
    setPlan((prev) => {
      if (prev.segments.length <= 1) return prev;
      const nextSegments = prev.segments.filter((_, i) => i !== segIdx);
      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // セグメントの開始駅・終了駅を変更
  const handleUpdateSegmentStations = (
    segIdx: number,
    fromStationId: string,
    toStationId: string
  ) => {
    setPlan((prev) => {
      const nextSegments = [...prev.segments];
      const seg = nextSegments[segIdx];
      if (!seg) return prev;

      const rebuilt = buildSegmentStops(
        seg.lineId,
        fromStationId,
        toStationId,
        seg.trainType,
        prev.defaultStopSec,
        seg.stops,
        false
      );
      nextSegments[segIdx] = {
        ...seg,
        fromStationId,
        toStationId,
        direction: rebuilt.direction,
        stops: rebuilt.stops,
      };

      // 後続セグメントが存在し、かつこのセグメントの終了駅と同名駅が後続セグメント路線にあれば自動リンク
      if (segIdx < nextSegments.length - 1) {
        const nextSeg = nextSegments[segIdx + 1];
        const nextLine = getLine(nextSeg.lineId);
        const newEndSt = STATION_MAP.get(toStationId);
        if (nextLine && newEndSt) {
          const matchingNextSt = nextLine.stations.find(
            (s) => s.name === newEndSt.name && s.id !== nextSeg.toStationId
          );
          if (matchingNextSt && matchingNextSt.id !== nextSeg.fromStationId) {
            const rebuiltNext = buildSegmentStops(
              nextSeg.lineId,
              matchingNextSt.id,
              nextSeg.toStationId,
              nextSeg.trainType,
              prev.defaultStopSec,
              nextSeg.stops,
              false
            );
            nextSegments[segIdx + 1] = {
              ...nextSeg,
              fromStationId: matchingNextSt.id,
              direction: rebuiltNext.direction,
              stops: rebuiltNext.stops,
            };
          }
        }
      }

      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // セグメントの進行方向（始発⇔終着）を反転
  const handleReverseSegment = (segIdx: number) => {
    const seg = computedPlan.segments[segIdx];
    if (!seg) return;
    handleUpdateSegmentStations(segIdx, seg.toStationId, seg.fromStationId);
  };

  // 全ルートを丸ごと逆転（往復折り返し作成に便利）
  const handleReverseEntireRoute = () => {
    setPlan((prev) => {
      const reversedSegments = [...prev.segments].reverse().map((seg) => {
        const rebuilt = buildSegmentStops(
          seg.lineId,
          seg.toStationId,
          seg.fromStationId,
          seg.trainType,
          prev.defaultStopSec,
          seg.stops,
          true
        );
        return {
          ...seg,
          fromStationId: seg.toStationId,
          toStationId: seg.fromStationId,
          direction: rebuilt.direction,
          stops: rebuilt.stops,
        };
      });
      return recalculatePlanSchedule({ ...prev, segments: reversedSegments }, sim.currentSec);
    });
  };

  // セグメントの列車種別を変更（停車駅もその種別の標準停車駅に自動更新）
  const handleUpdateSegmentTrainType = (segIdx: number, trainType: TrainTypeKey) => {
    setPlan((prev) => {
      const nextSegments = [...prev.segments];
      const seg = nextSegments[segIdx];
      if (!seg) return prev;

      const rebuilt = buildSegmentStops(
        seg.lineId,
        seg.fromStationId,
        seg.toStationId,
        trainType,
        prev.defaultStopSec,
        seg.stops,
        false
      );

      // 種別として test_run 以外（急行・普通・特急等）が明示選択された場合、
      // まだデフォルトの「試運転」固定のままなら、路線別の種別名がそのまま出るモードへスマートに切り替え
      let nextUseCustomType = prev.useCustomType;
      if (
        trainType !== 'test_run' &&
        prev.useCustomType &&
        prev.customTrainType.name === '試運転'
      ) {
        nextUseCustomType = false;
      } else if (trainType === 'test_run' && !prev.useCustomType) {
        nextUseCustomType = true;
      }

      nextSegments[segIdx] = {
        ...seg,
        trainType,
        stops: rebuilt.stops,
      };

      return recalculatePlanSchedule(
        {
          ...prev,
          useCustomType: nextUseCustomType,
          segments: nextSegments,
        },
        sim.currentSec
      );
    });
  };

  // セグメント固有の列車番号や巡航速度を変更
  const handleUpdateSegmentMeta = (
    segIdx: number,
    patch: { trainNumber?: string; speedKmh?: number }
  ) => {
    setPlan((prev) => {
      const nextSegments = prev.segments.map((seg, i) =>
        i === segIdx ? { ...seg, ...patch } : seg
      );
      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 個別駅の「停車 / 通過」をトグル切り替え
  const handleToggleStationPassing = (segIdx: number, stopIdx: number) => {
    setPlan((prev) => {
      const nextSegments = [...prev.segments];
      const seg = { ...nextSegments[segIdx] };
      const nextStops = [...seg.stops];
      const target = { ...nextStops[stopIdx] };

      // 全区間の始発駅と終着駅は必ず停車
      const isGlobalFirst = segIdx === 0 && stopIdx === 0;
      const isGlobalLast =
        segIdx === nextSegments.length - 1 && stopIdx === nextStops.length - 1;
      if (isGlobalFirst || isGlobalLast) return prev;

      target.isPassing = !target.isPassing;
      if (target.isPassing) {
        target.stopDurationSec = 0;
        target.manualStopDurationSec = undefined;
      } else {
        target.stopDurationSec = prev.defaultStopSec || 20;
      }
      nextStops[stopIdx] = target;
      seg.stops = nextStops;
      nextSegments[segIdx] = seg;

      // 境界駅の場合、隣接セグメントの対応する境界駅も同じ停車/通過状態に同期
      if (stopIdx === nextStops.length - 1 && segIdx < nextSegments.length - 1) {
        const nextSeg = { ...nextSegments[segIdx + 1] };
        if (nextSeg.stops.length > 0) {
          const nextSegStops = [...nextSeg.stops];
          nextSegStops[0] = {
            ...nextSegStops[0],
            isPassing: target.isPassing,
            stopDurationSec: target.isPassing ? 0 : prev.defaultStopSec || 20,
          };
          nextSeg.stops = nextSegStops;
          nextSegments[segIdx + 1] = nextSeg;
        }
      } else if (stopIdx === 0 && segIdx > 0) {
        const prevSeg = { ...nextSegments[segIdx - 1] };
        if (prevSeg.stops.length > 0) {
          const prevSegStops = [...prevSeg.stops];
          const lastIdx = prevSegStops.length - 1;
          prevSegStops[lastIdx] = {
            ...prevSegStops[lastIdx],
            isPassing: target.isPassing,
          };
          prevSeg.stops = prevSegStops;
          nextSegments[segIdx - 1] = prevSeg;
        }
      }

      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 一括停車パターン変更（全駅停車 / 主要駅のみ / ノンストップ / 種別標準）
  const handleApplyBatchStopPattern = (
    pattern: 'type_default' | 'all_stop' | 'major_only' | 'nonstop'
  ) => {
    setPlan((prev) => {
      const nextSegments = prev.segments.map((seg, segIdx) => {
        const line = getLine(seg.lineId);
        if (pattern === 'type_default') {
          const rebuilt = buildSegmentStops(
            seg.lineId,
            seg.fromStationId,
            seg.toStationId,
            seg.trainType,
            prev.defaultStopSec,
            seg.stops,
            false
          );
          return { ...seg, stops: rebuilt.stops };
        }

        const nextStops = seg.stops.map((s, stopIdx) => {
          const isGlobalFirst = segIdx === 0 && stopIdx === 0;
          const isGlobalLast =
            segIdx === prev.segments.length - 1 && stopIdx === seg.stops.length - 1;
          const isSegBoundary = stopIdx === 0 || stopIdx === seg.stops.length - 1;

          if (isGlobalFirst || isGlobalLast) {
            return { ...s, isPassing: false, stopDurationSec: 0 };
          }

          let shouldStop = true;
          if (pattern === 'all_stop') {
            shouldStop = true;
          } else if (pattern === 'nonstop') {
            shouldStop = false;
          } else if (pattern === 'major_only') {
            const st = STATION_MAP.get(s.stationId) || line?.stations.find((x) => x.id === s.stationId);
            shouldStop = Boolean(st?.isMajor || isSegBoundary);
          }

          return {
            ...s,
            isPassing: !shouldStop,
            stopDurationSec: shouldStop ? s.manualStopDurationSec ?? prev.defaultStopSec : 0,
          };
        });

        return { ...seg, stops: nextStops };
      });

      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 個別駅の到着時刻を手動変更
  const handleManualArrivalTimeChange = (
    segIdx: number,
    stopIdx: number,
    newHHMM: string
  ) => {
    setPlan((prev) => {
      const currentComputed = recalculatePlanSchedule(prev, sim.currentSec);
      const refSec =
        currentComputed.segments[segIdx]?.stops[stopIdx]?.arrivalSec ?? sim.currentSec;
      const newSec = hhmmToSeconds(newHHMM, refSec);

      // もし全区間の始発駅(segIdx===0, stopIdx===0)の時刻を変えた場合は、時刻指定モードに切り替えて始発時刻自体を更新
      if (segIdx === 0 && stopIdx === 0) {
        return recalculatePlanSchedule(
          {
            ...prev,
            departureMode: 'scheduled',
            scheduledStartSec: newSec,
          },
          sim.currentSec
        );
      }

      const nextSegments = prev.segments.map((seg, sIdx) => {
        if (sIdx !== segIdx) return seg;
        const nextStops = seg.stops.map((st, idx) => {
          if (idx !== stopIdx) return st;
          return {
            ...st,
            manualArrivalSec: newSec,
          };
        });
        return { ...seg, stops: nextStops };
      });

      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 個別駅の停車時間（秒）を手動変更
  const handleManualStopDurationChange = (
    segIdx: number,
    stopIdx: number,
    newDurationSec: number
  ) => {
    const clamped = Math.max(0, Math.min(3600, newDurationSec));
    setPlan((prev) => {
      const nextSegments = prev.segments.map((seg, sIdx) => {
        if (sIdx !== segIdx) return seg;
        const nextStops = seg.stops.map((st, idx) => {
          if (idx !== stopIdx) return st;
          return {
            ...st,
            isPassing: clamped === 0 ? st.isPassing : false,
            stopDurationSec: clamped,
            manualStopDurationSec: clamped,
          };
        });
        return { ...seg, stops: nextStops };
      });
      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 個別駅の発車時刻（HH:MM）を手動変更（到着時刻との差分から停車時間を自動設定）
  const handleManualDepartureTimeChange = (
    segIdx: number,
    stopIdx: number,
    newHHMM: string
  ) => {
    setPlan((prev) => {
      const currentComputed = recalculatePlanSchedule(prev, sim.currentSec);
      const curStop = currentComputed.segments[segIdx]?.stops[stopIdx];
      if (!curStop) return prev;

      if (segIdx === 0 && stopIdx === 0) {
        const newSec = hhmmToSeconds(newHHMM, curStop.departureSec);
        return recalculatePlanSchedule(
          {
            ...prev,
            departureMode: 'scheduled',
            scheduledStartSec: newSec,
          },
          sim.currentSec
        );
      }

      const targetDepSec = hhmmToSeconds(newHHMM, curStop.arrivalSec);
      const durationSec = Math.max(0, targetDepSec - curStop.arrivalSec);

      const nextSegments = prev.segments.map((seg, sIdx) => {
        if (sIdx !== segIdx) return seg;
        const nextStops = seg.stops.map((st, idx) => {
          if (idx !== stopIdx) return st;
          return {
            ...st,
            isPassing: false,
            stopDurationSec: durationSec,
            manualStopDurationSec: durationSec,
          };
        });
        return { ...seg, stops: nextStops };
      });

      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 全駅の手動時刻固定をリセットして自動計算に戻す
  const handleResetAllManualTimes = () => {
    setPlan((prev) => {
      const nextSegments = prev.segments.map((seg) => ({
        ...seg,
        stops: seg.stops.map((st) => ({
          ...st,
          manualArrivalSec: undefined,
          manualStopDurationSec: undefined,
          stopDurationSec: st.isPassing ? 0 : prev.defaultStopSec,
        })),
      }));
      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // プリセットの保存
  const handleSavePreset = () => {
    const defaultName =
      computedPlan.trainName.trim() ||
      `${STATION_MAP.get(computedPlan.segments[0]?.fromStationId)?.name || '始発'}→${
        STATION_MAP.get(computedPlan.segments[computedPlan.segments.length - 1]?.toStationId)?.name || '終着'
      }`;
    const nameToUse = presetNameInput.trim() || defaultName;
    const updated = saveCustomTrainPreset(computedPlan, nameToUse);
    setSavedPresets(updated);
    setPresetNameInput('');
    setSaveSuccessMessage(`「${nameToUse}」を保存しました`);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // 発車実行
  const handleLaunch = () => {
    const tripId = sim.launchCustomTrain(computedPlan);
    sel.setSelectedTrainId(tripId);
    sel.setIsTrackingTrain(true);
    ui.closeTestRun();
  };

  const handleTrackTrain = (tripId: string, startSec?: number, isRunning?: boolean) => {
    if (!isRunning && startSec !== undefined) {
      sim.seekTime(startSec);
    }
    sel.setSelectedTrainId(tripId);
    sel.setIsTrackingTrain(true);
    ui.closeTestRun();
  };

  // ルート全体の要約情報
  const routeSummary = useMemo(() => {
    const segs = computedPlan.segments;
    if (segs.length === 0) return null;
    const firstSt = STATION_MAP.get(segs[0].fromStationId);
    const lastSt = STATION_MAP.get(segs[segs.length - 1].toStationId);
    const firstStop = segs[0].stops[0];
    const lastSegStops = segs[segs.length - 1].stops;
    const lastStop = lastSegStops[lastSegStops.length - 1];

    // 重複する境界駅を除いた総駅数・停車駅数
    let totalStations = 0;
    let stoppingStations = 0;
    segs.forEach((s, idx) => {
      s.stops.forEach((st, stIdx) => {
        if (idx > 0 && stIdx === 0) return; // 境界重複を除外
        totalStations++;
        if (!st.isPassing) stoppingStations++;
      });
    });

    const totalMinutes =
      firstStop && lastStop
        ? Math.max(1, Math.round((lastStop.arrivalSec - firstStop.departureSec) / 60))
        : 0;

    return {
      originName: firstSt?.name || '始発駅',
      destName: lastSt?.name || '終着駅',
      depTimeStr: firstStop ? secondsToHHMM(firstStop.departureSec) : '--:--',
      arrTimeStr: lastStop ? secondsToHHMM(lastStop.arrivalSec) : '--:--',
      totalStations,
      stoppingStations,
      totalMinutes,
    };
  }, [computedPlan]);

  if (!ui.isTestRunOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[2500] flex items-center justify-center p-2 sm:p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={ui.closeTestRun}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================== ヘッダー ==================== */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30 shrink-0">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight flex items-center gap-2">
                <span>試運転・臨時列車クリエイター</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  直通・カスタムダイヤ対応
                </span>
              </h3>
              <p className="text-[11px] text-slate-300 hidden sm:block">
                種別選択・複数路線直通・停車駅＆発着時刻カスタマイズ・固有列車名を設定して走らせます
              </p>
            </div>
          </div>
          <button
            onClick={ui.closeTestRun}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==================== 現在稼働中・予約中の試験・臨時列車バナー ==================== */}
        {registeredCustomChains.length > 0 && (
          <div className="bg-sky-50/90 border-b border-sky-200 px-4 sm:px-6 py-2.5 shrink-0">
            <div className="flex items-center justify-between text-xs font-bold text-sky-950 mb-1.5">
              <span className="flex items-center gap-1.5">
                <LocateFixed className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                現在エントリー中の試運転・臨時列車 ({registeredCustomChains.length}編成)
              </span>
              <button
                onClick={sim.clearTestTrains}
                className="text-[11px] text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3 h-3" />
                全列車を停止・消去
              </button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {registeredCustomChains.map((item) => {
                const { firstTrip, liveTrain, startTime, endTime, startSec } = item;
                const isRunning = Boolean(liveTrain);
                return (
                  <div
                    key={item.chainKey}
                    className="flex items-center justify-between gap-2.5 bg-white px-2.5 py-1.5 rounded-lg border border-sky-200/80 text-xs shadow-2xs shrink-0 min-w-[260px]"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <TrainTypeBadge
                        type={liveTrain?.trainType || firstTrip.trainType}
                        size="sm"
                        lineId={liveTrain?.lineId || firstTrip.lineId}
                        customType={liveTrain?.customTrainType || firstTrip.customTrainType}
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1">
                          {firstTrip.trainName && (
                            <span className="font-extrabold text-amber-600 text-[11px] truncate max-w-[90px]">
                              {firstTrip.trainName}
                            </span>
                          )}
                          <span className="font-bold text-slate-800 text-[11px] truncate">
                            {firstTrip.customOrigin} ➔ {firstTrip.customDestination}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {isRunning
                            ? `走行中 (${Math.round(liveTrain!.speedKmh)}km/h)`
                            : `${startTime}〜${endTime} 運行予定`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>
                          handleTrackTrain(
                            liveTrain?.tripId || firstTrip.tripId,
                            startSec,
                            isRunning
                          )
                        }
                        className="px-2 py-1 bg-sky-600 text-white rounded text-[10px] font-bold hover:bg-sky-700 transition-colors flex items-center gap-1"
                        title={isRunning ? 'この列車をマップで追尾' : '発車時刻へジャンプして追尾'}
                      >
                        <Navigation className="w-2.5 h-2.5" />
                        {isRunning ? '追尾' : '時刻へ移動'}
                      </button>
                      <button
                        onClick={() => sim.removeTestTrain(firstTrip.tripId)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        title="この列車を削除"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==================== ステップ・タブナビゲーション ==================== */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-3 sm:px-6 pt-2 gap-1 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('route')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'route'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] flex items-center justify-center font-black">
              1
            </span>
            <span>路線・直通＆種別</span>
            {computedPlan.segments.length > 1 && (
              <span className="px-1.5 py-0.2 bg-sky-600 text-white rounded-full text-[10px]">
                {computedPlan.segments.length}路線
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stops')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'stops'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] flex items-center justify-center font-black">
              2
            </span>
            <span>停車駅・発着時刻</span>
            {routeSummary && (
              <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 rounded-full text-[10px] font-mono">
                {routeSummary.stoppingStations}駅停車
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customize')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'customize'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] flex items-center justify-center font-black">
              3
            </span>
            <span>種別名・列車名・編成</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs font-bold border-b-2 transition-all whitespace-nowrap ml-auto ${
              activeTab === 'presets'
                ? 'border-amber-500 text-amber-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500" />
            <span>テンプレート・保存 ({savedPresets.length})</span>
          </button>
        </div>

        {/* ==================== メインコンテンツエリア ==================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/40">
          {/* ----------------------------------------------------------------
              TAB 1: 路線・直通 ＆ 種別設定
          ---------------------------------------------------------------- */}
          {activeTab === 'route' && (
            <div className="space-y-4">
              {/* クイック直通テンプレートバー */}
              <div className="bg-gradient-to-r from-sky-50 to-indigo-50/60 border border-sky-200/80 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    ワンクリック直通・臨時列車サンプル
                  </span>
                  <button
                    type="button"
                    onClick={handleReverseEntireRoute}
                    className="text-[11px] font-bold text-sky-700 hover:text-sky-900 bg-white px-2.5 py-1 rounded-md border border-sky-200 shadow-2xs flex items-center gap-1 transition-colors"
                    title="全路線の始発と終着を反転します"
                  >
                    <ArrowUpDown className="w-3 h-3" />
                    全ルートの進行方向を反転
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {BUILTIN_TRAIN_TEMPLATES.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setPlan(tpl.buildPlan(sim.currentSec))}
                      className="text-left p-2 rounded-lg bg-white hover:bg-sky-50/50 border border-slate-200/90 hover:border-sky-400 transition-all shadow-2xs group"
                    >
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span
                          className="text-[9px] font-bold px-1.5 py-0.2 rounded text-white"
                          style={{ backgroundColor: tpl.badgeColor }}
                        >
                          {tpl.badgeText}
                        </span>
                        <span className="text-[10px] text-sky-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          読込 ➔
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 truncate">{tpl.title}</div>
                      <div className="text-[10px] text-slate-500 truncate mt-0.5">
                        {tpl.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 路線セグメント一覧 */}
              <div className="space-y-3">
                {computedPlan.segments.map((seg, segIdx) => {
                  const line = getLine(seg.lineId);
                  if (!line) return null;

                  // 路線内の全種別リスト + 試運転
                  const availableTypes = Object.values(line.trainTypes || {});
                  const prevSeg = segIdx > 0 ? computedPlan.segments[segIdx - 1] : null;
                  const prevEndSt = prevSeg ? STATION_MAP.get(prevSeg.toStationId) : null;
                  const curStartSt = STATION_MAP.get(seg.fromStationId);

                  return (
                    <React.Fragment key={seg.id}>
                      {/* 直通境界コネクター表示 */}
                      {segIdx > 0 && (
                        <div className="flex items-center justify-center gap-2 py-0.5">
                          <div className="h-4 w-0.5 bg-sky-300" />
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/90 border border-sky-300 text-sky-900 text-[11px] font-bold shadow-2xs">
                            <Link2 className="w-3.5 h-3.5 text-sky-600" />
                            <span>
                              直通境界：{prevEndSt?.name || '前駅'}
                              {prevEndSt?.name !== curStartSt?.name && curStartSt
                                ? ` ➔ ${curStartSt.name}`
                                : ' 駅で相互直通'}
                            </span>
                          </div>
                          <div className="h-4 w-0.5 bg-sky-300" />
                        </div>
                      )}

                      {/* セグメントカード */}
                      <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
                        {/* カード上部バー（路線名・変更・削除） */}
                        <div
                          className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100"
                          style={{
                            background: `linear-gradient(90deg, ${line.lineColor}18 0%, #f8fafc 100%)`,
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-0.5 rounded text-[10px] font-black text-white shadow-2xs"
                              style={{ backgroundColor: line.lineColor }}
                            >
                              区間 {segIdx + 1}
                            </span>
                            <span className="font-extrabold text-sm text-slate-800">
                              {line.name}
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                              ({line.operator})
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingSegmentIdxForLine(segIdx);
                                setAddingLineModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs"
                            >
                              路線を変更
                            </button>
                            {computedPlan.segments.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveSegment(segIdx)}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                title="この路線区間を削除"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* カード本体（始発駅・終着駅・種別・列車番号） */}
                        <div className="p-4 space-y-3.5">
                          {/* 開始駅 ➔ 終了駅 セレクタ */}
                          <div className="grid grid-cols-1 sm:grid-cols-11 gap-2 items-center bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                            <div className="sm:col-span-5">
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                {segIdx === 0 ? '始発駅（出発駅）' : '直通開始駅（境界駅）'}
                              </label>
                              <select
                                value={seg.fromStationId}
                                onChange={(e) =>
                                  handleUpdateSegmentStations(
                                    segIdx,
                                    e.target.value,
                                    seg.toStationId
                                  )
                                }
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                              >
                                {line.stations.map((st) => (
                                  <option
                                    key={st.id}
                                    value={st.id}
                                    disabled={st.id === seg.toStationId}
                                  >
                                    {st.stationNumber ? `[${st.stationNumber}] ` : ''}
                                    {st.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="sm:col-span-1 flex justify-center pt-2 sm:pt-4">
                              <button
                                type="button"
                                onClick={() => handleReverseSegment(segIdx)}
                                className="p-1.5 rounded-full bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 hover:border-sky-300 transition-colors shadow-2xs"
                                title="開始駅と終了駅を入れ替え（上下反転）"
                              >
                                <ArrowUpDown className="w-3.5 h-3.5 rotate-90" />
                              </button>
                            </div>

                            <div className="sm:col-span-5">
                              <label className="text-[10px] font-bold text-slate-500 block mb-1">
                                {segIdx === computedPlan.segments.length - 1
                                  ? '終着駅（行先）'
                                  : '直通終了駅（次路線への接続駅）'}
                              </label>
                              <select
                                value={seg.toStationId}
                                onChange={(e) =>
                                  handleUpdateSegmentStations(
                                    segIdx,
                                    seg.fromStationId,
                                    e.target.value
                                  )
                                }
                                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                              >
                                {line.stations.map((st) => (
                                  <option
                                    key={st.id}
                                    value={st.id}
                                    disabled={st.id === seg.fromStationId}
                                  >
                                    {st.stationNumber ? `[${st.stationNumber}] ` : ''}
                                    {st.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* この路線での列車種別セレクタ */}
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="text-[11px] font-bold text-slate-700">
                                この路線での列車種別（選択すると標準停車駅が自動反映されます）
                              </label>
                              <span className="text-[10px] text-slate-400">
                                {seg.direction === 'outbound'
                                  ? line.directionNames.outboundShort
                                  : line.directionNames.inboundShort}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {/* 試運転種別ボタン */}
                              <button
                                type="button"
                                onClick={() => handleUpdateSegmentTrainType(segIdx, 'test_run')}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                  seg.trainType === 'test_run'
                                    ? 'bg-sky-600 text-white ring-2 ring-sky-600 ring-offset-1 shadow-xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-sky-400" />
                                <span>試運転 / カスタム</span>
                              </button>

                              {/* 路線固有の各列車種別ボタン */}
                              {availableTypes.map((tConf) => {
                                const isSelected = seg.trainType === tConf.key;
                                return (
                                  <button
                                    key={tConf.key}
                                    type="button"
                                    onClick={() => handleUpdateSegmentTrainType(segIdx, tConf.key)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                      isSelected
                                        ? 'text-white ring-2 ring-offset-1 shadow-xs'
                                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                    style={
                                      isSelected
                                        ? {
                                            backgroundColor: tConf.bgColor,
                                            borderColor: tConf.borderColor,
                                          }
                                        : {}
                                    }
                                  >
                                    {!isSelected && (
                                      <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ backgroundColor: tConf.bgColor }}
                                      />
                                    )}
                                    <span>{tConf.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 区間固有の列車番号・巡航速度（複数路線時などに便利） */}
                          <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-100 text-[11px] flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-500 font-semibold">区間列車番号:</span>
                              <input
                                type="text"
                                value={seg.trainNumber || ''}
                                onChange={(e) =>
                                  handleUpdateSegmentMeta(segIdx, { trainNumber: e.target.value })
                                }
                                placeholder={computedPlan.defaultTrainNumber || '試9001レ'}
                                className="w-28 px-2 py-0.5 border border-slate-200 rounded font-mono text-xs text-slate-700 bg-slate-50 focus:bg-white"
                              />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-500 font-semibold">標準巡航速度:</span>
                              <select
                                value={seg.speedKmh}
                                onChange={(e) =>
                                  handleUpdateSegmentMeta(segIdx, {
                                    speedKmh: Number(e.target.value),
                                  })
                                }
                                className="px-2 py-0.5 border border-slate-200 rounded font-mono text-xs text-slate-700 bg-slate-50"
                              >
                                <option value={55}>55 km/h (各停・地下鉄)</option>
                                <option value={75}>75 km/h (標準・急行)</option>
                                <option value={95}>95 km/h (高速・特急)</option>
                                <option value={120}>120 km/h (幹線特急)</option>
                                <option value={210}>210 km/h (新幹線)</option>
                                <option value={275}>275 km/h (高速新幹線)</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* 直通路線追加パネル */}
              <div className="bg-white rounded-xl border-2 border-dashed border-sky-300/90 p-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-sky-600" />
                      <span>複数路線を跨ぐ直通路線を追加</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      接続駅（和光市・渋谷・横浜・大宮・新宿・新横浜など）を自動検出してルートを連結します
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSegmentIdxForLine(null);
                      setAddingLineModalOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>全路線リストから追加...</span>
                  </button>
                </div>

                {/* おすすめ接続路線チップ */}
                {connectableNextLines.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
                      🔗 現在の路線（
                      {getLine(computedPlan.segments[computedPlan.segments.length - 1].lineId)
                        ?.shortName || ''}
                      ）と直通・乗換接続できる路線：
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {connectableNextLines.map(({ line, bestPair, isDirectAtCurrentEnd }) => (
                        <button
                          key={line.id}
                          type="button"
                          onClick={() => handleAddConnectedLine(line.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            isDirectAtCurrentEnd
                              ? 'bg-sky-50 border-sky-300 text-sky-900 hover:bg-sky-100 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Plus className="w-3 h-3 text-sky-600" />
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: line.lineColor }}
                          />
                          <span>{line.shortName}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            ({bestPair.stationA.name}接続)
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 路線検索サブモーダル（路線追加・変更時） */}
              {addingLineModalOpen && (
                <div className="bg-slate-900/5 rounded-xl border border-slate-300 p-4 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-800">
                      {editingSegmentIdxForLine !== null
                        ? `区間 ${editingSegmentIdxForLine + 1} の路線を選択`
                        : '追加する直通路線を選択'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setAddingLineModalOpen(false);
                        setEditingSegmentIdxForLine(null);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                    >
                      閉じる ×
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="路線名や会社名で絞り込み..."
                        value={lineSearchQuery}
                        onChange={(e) => setLineSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <select
                      value={selectedOperator}
                      onChange={(e) => setSelectedOperator(e.target.value)}
                      className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-white text-slate-700"
                    >
                      <option value="all">全事業者</option>
                      {groupedByOperator.map((g) => (
                        <option key={g.operator} value={g.operator}>
                          {g.operator}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto bg-white p-2 rounded-lg border border-slate-200">
                    {filteredLines.map((line) => (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => {
                          if (editingSegmentIdxForLine !== null) {
                            handleReplaceSegmentLine(editingSegmentIdxForLine, line.id);
                          } else {
                            handleAddConnectedLine(line.id);
                          }
                        }}
                        className="flex items-center gap-2 p-2 rounded-lg text-left text-xs hover:bg-sky-50 text-slate-700 hover:text-sky-900 font-semibold transition-colors border border-transparent hover:border-sky-200"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: line.lineColor }}
                        />
                        <span className="truncate">{line.shortName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------
              TAB 2: 停車駅の選択 ＆ 各駅時刻設定 (3-1, 3-2)
          ---------------------------------------------------------------- */}
          {activeTab === 'stops' && (
            <div className="space-y-4">
              {/* 始発時刻・停車時間・一括停車設定コントロール */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-100">
                  {/* 始発駅の発車時刻モード */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1 mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>始発駅の発車時刻設定</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                        <button
                          type="button"
                          onClick={() =>
                            setPlan((prev) =>
                              recalculatePlanSchedule(
                                { ...prev, departureMode: 'now' },
                                sim.currentSec
                              )
                            )
                          }
                          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                            computedPlan.departureMode === 'now'
                              ? 'bg-white text-sky-700 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          現在時刻 ({secondsToHHMM(sim.currentSec)})
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setPlan((prev) =>
                              recalculatePlanSchedule(
                                {
                                  ...prev,
                                  departureMode: 'scheduled',
                                  scheduledStartSec:
                                    prev.scheduledStartSec || Math.floor(sim.currentSec / 60) * 60,
                                },
                                sim.currentSec
                              )
                            )
                          }
                          className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                            computedPlan.departureMode === 'scheduled'
                              ? 'bg-white text-sky-700 shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          時刻を指定
                        </button>
                      </div>

                      {computedPlan.departureMode === 'scheduled' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={secondsToHHMM(computedPlan.scheduledStartSec)}
                            onChange={(e) => {
                              const newSec = hhmmToSeconds(e.target.value);
                              setPlan((prev) =>
                                recalculatePlanSchedule(
                                  { ...prev, scheduledStartSec: newSec },
                                  sim.currentSec
                                )
                              );
                            }}
                            className="px-2 py-1 border border-sky-300 rounded-lg text-xs font-mono font-bold text-slate-800 bg-sky-50/40"
                          />
                          <label className="inline-flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={computedPlan.seekToStartOnLaunch}
                              onChange={(e) =>
                                setPlan((prev) => ({
                                  ...prev,
                                  seekToStartOnLaunch: e.target.checked,
                                }))
                              }
                              className="rounded text-sky-600"
                            />
                            <span>発車時にこの時刻へ移動</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 標準停車時間 & 手動時刻リセット */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-bold text-slate-700">
                        各駅の標準停車時間
                      </label>
                      <button
                        type="button"
                        onClick={handleResetAllManualTimes}
                        className="text-[10px] font-bold text-slate-500 hover:text-sky-700 flex items-center gap-1"
                        title="個別に編集した時刻をすべて自動計算に戻します"
                      >
                        <RotateCcw className="w-3 h-3" />
                        手動時刻をすべて自動計算に戻す
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {[15, 20, 30, 60, 120].map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() =>
                            setPlan((prev) => {
                              const nextSegments = prev.segments.map((seg) => ({
                                ...seg,
                                stops: seg.stops.map((st) => ({
                                  ...st,
                                  stopDurationSec: st.isPassing
                                    ? 0
                                    : st.manualStopDurationSec ?? sec,
                                })),
                              }));
                              return recalculatePlanSchedule(
                                { ...prev, defaultStopSec: sec, segments: nextSegments },
                                sim.currentSec
                              );
                            })
                          }
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            computedPlan.defaultStopSec === sec
                              ? 'bg-sky-600 text-white shadow-2xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {sec >= 60 ? `${sec / 60}分` : `${sec}秒`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 一括停車駅プリセット & 駅名クイック検索 */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-500 mr-1">停車駅一括設定:</span>
                    <button
                      type="button"
                      onClick={() => handleApplyBatchStopPattern('type_default')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      種別標準に戻す
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBatchStopPattern('all_stop')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      全駅停車
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBatchStopPattern('major_only')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    >
                      主要駅のみ停車
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApplyBatchStopPattern('nonstop')}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors"
                      title="始発・終着以外をすべて通過にします。その後、停めたい駅（池袋・川越・坂戸など）をクリックするだけで独自の臨時列車が作れます"
                    >
                      始発・終着以外をすべて通過にする
                    </button>
                  </div>

                  {/* 駅名検索フィルター */}
                  <div className="relative w-full sm:w-52">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={stationSearchQuery}
                      onChange={(e) => setStationSearchQuery(e.target.value)}
                      placeholder="駅名で検索 (例: 川越, 坂戸)..."
                      className="w-full pl-8 pr-6 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                    {stationSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setStationSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 複数路線時の路線絞り込みピル */}
              {computedPlan.segments.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setSelectedStopSegmentFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      selectedStopSegmentFilter === 'all'
                        ? 'bg-slate-800 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    全路線を表示 ({computedPlan.segments.length}路線)
                  </button>
                  {computedPlan.segments.map((seg, idx) => {
                    const l = getLine(seg.lineId);
                    const active = selectedStopSegmentFilter === seg.id;
                    return (
                      <button
                        key={seg.id}
                        type="button"
                        onClick={() => setSelectedStopSegmentFilter(seg.id)}
                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                          active
                            ? 'text-white shadow-2xs'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                        style={active ? { backgroundColor: l?.lineColor || '#0284c7' } : {}}
                      >
                        {!active && (
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: l?.lineColor || '#0284c7' }}
                          />
                        )}
                        <span>
                          {idx + 1}. {l?.shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* 停車駅・着発時刻タイムラインエディタ */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                <div className="grid grid-cols-12 bg-slate-100/90 border-b border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-600">
                  <div className="col-span-5 sm:col-span-4">駅名 / 路線</div>
                  <div className="col-span-3 sm:col-span-2 text-center">停車 / 通過</div>
                  <div className="col-span-4 sm:col-span-6 text-right sm:text-left sm:pl-4">
                    到着時刻 ・ 発車時刻 ・ 停車時間
                  </div>
                </div>

                <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
                  {computedPlan.segments.map((seg, segIdx) => {
                    if (
                      selectedStopSegmentFilter !== 'all' &&
                      selectedStopSegmentFilter !== seg.id
                    ) {
                      return null;
                    }
                    const line = getLine(seg.lineId);
                    const q = stationSearchQuery.trim().toLowerCase();

                    return (
                      <React.Fragment key={seg.id}>
                        {/* 路線セクション見出し */}
                        <div
                          className="px-3 py-1.5 text-[11px] font-extrabold text-white flex items-center justify-between sticky top-0 z-10 shadow-2xs"
                          style={{ backgroundColor: line?.lineColor || '#334155' }}
                        >
                          <span>
                            区間 {segIdx + 1}: {line?.name}
                          </span>
                          <TrainTypeBadge
                            type={seg.trainType}
                            size="sm"
                            lineId={seg.lineId}
                            customType={
                              computedPlan.useCustomType ? computedPlan.customTrainType : undefined
                            }
                          />
                        </div>

                        {seg.stops.map((stop, stopIdx) => {
                          const st = STATION_MAP.get(stop.stationId);
                          if (!st) return null;

                          // 駅名検索フィルター適用中
                          if (
                            q &&
                            !st.name.toLowerCase().includes(q) &&
                            !st.nameKana.toLowerCase().includes(q) &&
                            !st.nameEn.toLowerCase().includes(q) &&
                            !st.id.toLowerCase().includes(q)
                          ) {
                            return null;
                          }

                          const isGlobalFirst = segIdx === 0 && stopIdx === 0;
                          const isGlobalLast =
                            segIdx === computedPlan.segments.length - 1 &&
                            stopIdx === seg.stops.length - 1;
                          const isEndpointLock = isGlobalFirst || isGlobalLast;
                          const hasManualOverride =
                            stop.manualArrivalSec !== undefined ||
                            stop.manualStopDurationSec !== undefined;

                          return (
                            <div
                              key={`${seg.id}_${stop.stationId}_${stopIdx}`}
                              className={`grid grid-cols-12 items-center px-3 py-2 text-xs transition-colors ${
                                stop.isPassing
                                  ? 'bg-slate-50/60 text-slate-400'
                                  : 'bg-white text-slate-800 hover:bg-sky-50/30'
                              }`}
                            >
                              {/* 駅名・駅ナンバリング */}
                              <div className="col-span-5 sm:col-span-4 flex items-center gap-2 min-w-0 pr-1">
                                {st.stationNumber && (
                                  <StationBadge id={st.stationNumber} size="sm" />
                                )}
                                <div className="truncate">
                                  <span
                                    className={`font-bold ${
                                      stop.isPassing ? 'text-slate-400 font-medium' : 'text-slate-900'
                                    }`}
                                  >
                                    {st.name}
                                  </span>
                                  {isGlobalFirst && (
                                    <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-100 text-sky-800">
                                      始発
                                    </span>
                                  )}
                                  {isGlobalLast && (
                                    <span className="ml-1.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                                      終着
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* 停車 / 通過 トグルボタン */}
                              <div className="col-span-3 sm:col-span-2 flex justify-center">
                                <button
                                  type="button"
                                  disabled={isEndpointLock}
                                  onClick={() => handleToggleStationPassing(segIdx, stopIdx)}
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                                    stop.isPassing
                                      ? 'bg-slate-200/70 text-slate-500 hover:bg-slate-300/70'
                                      : 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                                  } ${isEndpointLock ? 'opacity-90 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                  {stop.isPassing ? (
                                    <>
                                      <Circle className="w-3 h-3" />
                                      <span>通過</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className="w-3 h-3" />
                                      <span>停車</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* 到着時刻・発車時刻・停車時間 編集 */}
                              <div className="col-span-4 sm:col-span-6 flex items-center justify-end sm:justify-start sm:pl-4 gap-2 flex-wrap">
                                {stop.isPassing ? (
                                  <span className="text-[11px] font-mono text-slate-400">
                                    {secondsToTimeString(stop.arrivalSec).slice(0, 8)} 通過予定
                                  </span>
                                ) : (
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    {/* 到着時刻（始発駅以外） */}
                                    {!isGlobalFirst && (
                                      <label className="inline-flex items-center gap-1 text-[11px]">
                                        <span className="text-slate-400 text-[10px]">着</span>
                                        <input
                                          type="time"
                                          value={secondsToHHMM(stop.arrivalSec)}
                                          onChange={(e) =>
                                            handleManualArrivalTimeChange(
                                              segIdx,
                                              stopIdx,
                                              e.target.value
                                            )
                                          }
                                          className={`px-1.5 py-0.5 rounded border text-xs font-mono font-bold ${
                                            stop.manualArrivalSec !== undefined
                                              ? 'border-amber-400 bg-amber-50 text-amber-900'
                                              : 'border-slate-200 bg-slate-50 text-slate-700'
                                          }`}
                                        />
                                      </label>
                                    )}

                                    {/* 発車時刻（終着駅以外） */}
                                    {!isGlobalLast && (
                                      <label className="inline-flex items-center gap-1 text-[11px]">
                                        <span className="text-slate-400 text-[10px]">発</span>
                                        <input
                                          type="time"
                                          value={secondsToHHMM(stop.departureSec)}
                                          onChange={(e) =>
                                            handleManualDepartureTimeChange(
                                              segIdx,
                                              stopIdx,
                                              e.target.value
                                            )
                                          }
                                          className={`px-1.5 py-0.5 rounded border text-xs font-mono font-bold ${
                                            stop.manualStopDurationSec !== undefined
                                              ? 'border-amber-400 bg-amber-50 text-amber-900'
                                              : 'border-slate-200 bg-white text-slate-900'
                                          }`}
                                        />
                                      </label>
                                    )}

                                    {/* 停車秒数セレクタ（途中停車駅のみ） */}
                                    {!isGlobalFirst && !isGlobalLast && (
                                      <select
                                        value={stop.stopDurationSec}
                                        onChange={(e) =>
                                          handleManualStopDurationChange(
                                            segIdx,
                                            stopIdx,
                                            Number(e.target.value)
                                          )
                                        }
                                        className="px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[11px] text-slate-600 font-mono"
                                        title="この駅での停車時間"
                                      >
                                        <option value={15}>15秒停</option>
                                        <option value={20}>20秒停</option>
                                        <option value={30}>30秒停</option>
                                        <option value={45}>45秒停</option>
                                        <option value={60}>1分停</option>
                                        <option value={120}>2分停</option>
                                        <option value={180}>3分停</option>
                                        <option value={300}>5分停</option>
                                        {![15, 20, 30, 45, 60, 120, 180, 300].includes(
                                          stop.stopDurationSec
                                        ) && (
                                          <option value={stop.stopDurationSec}>
                                            {stop.stopDurationSec}秒停
                                          </option>
                                        )}
                                      </select>
                                    )}

                                    {hasManualOverride && (
                                      <span
                                        className="inline-flex items-center gap-0.5 text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-bold"
                                        title="手動設定された時刻"
                                      >
                                        <Pin className="w-2.5 h-2.5" />
                                        固定
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------
              TAB 3: 種別名・固有列車名称・編成設定 (3-3)
          ---------------------------------------------------------------- */}
          {activeTab === 'customize' && (
            <div className="space-y-4">
              {/* リアルタイム表示プレビュー */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-4 text-white shadow-md">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  列車表示プレビュー（マップ・詳細パネル・駅発車標）
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <TrainTypeBadge
                        type={computedPlan.segments[0]?.trainType || 'test_run'}
                        size="md"
                        lineId={computedPlan.segments[0]?.lineId}
                        customType={
                          computedPlan.useCustomType ? computedPlan.customTrainType : undefined
                        }
                      />
                      {computedPlan.trainName.trim() ? (
                        <span className="font-extrabold text-sm text-amber-300 tracking-wide">
                          {computedPlan.trainName}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 italic">（固有列車名称：なし）</span>
                      )}
                      <span className="font-mono text-xs text-amber-200 font-bold">
                        {computedPlan.defaultTrainNumber || '試9001レ'}
                      </span>
                      <span className="text-xs text-slate-400">({computedPlan.cars}両編成)</span>
                    </div>
                    <div className="text-lg font-black">
                      {routeSummary?.destName || '終着'} 行
                      <span className="text-xs font-normal text-slate-300 ml-2">
                        （始発：{routeSummary?.originName} {routeSummary?.depTimeStr}発）
                      </span>
                    </div>
                  </div>

                  {/* マップピン風プレビュー */}
                  <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-2 rounded-xl border border-slate-700">
                    {(() => {
                      const previewConf = getTrainTypeConfig(
                        computedPlan.segments[0]?.trainType || 'test_run',
                        computedPlan.segments[0]?.lineId,
                        computedPlan.useCustomType ? computedPlan.customTrainType : undefined
                      );
                      return (
                        <>
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white shadow-md"
                            style={{ backgroundColor: previewConf.bgColor }}
                          >
                            電車
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] font-bold">
                            <span
                              className="px-1.5 py-0.5 rounded text-[10px] text-white"
                              style={{ backgroundColor: previewConf.bgColor }}
                            >
                              {previewConf.shortName}
                            </span>
                            {computedPlan.trainName.trim() && (
                              <span className="text-amber-300">{computedPlan.trainName.trim()}</span>
                            )}
                            <span>{routeSummary?.destName}</span>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* 種別名・カラー設定カード */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-2xs">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Palette className="w-4 h-4 text-sky-600" />
                      <span>種別名の表示モード（デフォルト：試運転）</span>
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      任意の種別名（試運転・臨時・団体など）を設定するか、各路線で選んだ標準種別名（急行・特急など）を使うか選べます
                    </p>
                  </div>

                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setPlan((prev) => ({ ...prev, useCustomType: true }))}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        computedPlan.useCustomType
                          ? 'bg-white text-sky-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      任意の種別名を設定
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlan((prev) => ({ ...prev, useCustomType: false }))}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        !computedPlan.useCustomType
                          ? 'bg-white text-sky-700 shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      各路線の標準種別名を使用
                    </button>
                  </div>
                </div>

                {computedPlan.useCustomType && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    {/* クイック種別チップ */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 block mb-1.5">
                        よく使う種別プリセット：
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {CUSTOM_TYPE_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() =>
                              setPlan((prev) => ({
                                ...prev,
                                useCustomType: true,
                                customTrainType: { ...preset },
                              }))
                            }
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: preset.color }}
                            />
                            <span>{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          種別名（フル表記）
                        </label>
                        <input
                          type="text"
                          value={computedPlan.customTrainType.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPlan((prev) => ({
                              ...prev,
                              customTrainType: {
                                ...prev.customTrainType,
                                name: val,
                                shortName: val.trim().slice(0, 2) || '試',
                              },
                            }));
                          }}
                          placeholder="試運転"
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          マップアイコン略称（1〜2文字）
                        </label>
                        <input
                          type="text"
                          maxLength={3}
                          value={computedPlan.customTrainType.shortName || ''}
                          onChange={(e) =>
                            setPlan((prev) => ({
                              ...prev,
                              customTrainType: {
                                ...prev.customTrainType,
                                shortName: e.target.value,
                              },
                            }))
                          }
                          placeholder="試"
                          className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">
                          バッジ・ピンカラー
                        </label>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {COLOR_SWATCHES.map((hex) => (
                            <button
                              key={hex}
                              type="button"
                              onClick={() =>
                                setPlan((prev) => ({
                                  ...prev,
                                  customTrainType: {
                                    ...prev.customTrainType,
                                    color: hex,
                                  },
                                }))
                              }
                              className={`w-5 h-5 rounded-full transition-transform ${
                                computedPlan.customTrainType.color === hex
                                  ? 'scale-125 ring-2 ring-slate-800 ring-offset-1'
                                  : 'hover:scale-110'
                              }`}
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                          <input
                            type="color"
                            value={computedPlan.customTrainType.color || '#0284c7'}
                            onChange={(e) =>
                              setPlan((prev) => ({
                                ...prev,
                                customTrainType: {
                                  ...prev.customTrainType,
                                  color: e.target.value,
                                },
                              }))
                            }
                            className="w-6 h-6 rounded cursor-pointer border border-slate-200"
                            title="自由な色を選択"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 固有列車名称・列車番号・両数・再生倍速 */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-2xs">
                <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-sky-600" />
                  <span>固有列車名称（愛称）・列車番号・両数設定</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      固有列車名称・愛称（デフォルト：なし）
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={computedPlan.trainName}
                        onChange={(e) =>
                          setPlan((prev) => ({ ...prev, trainName: e.target.value }))
                        }
                        placeholder="なし（例: Fライナー, ミステリー号, 小川町観光号）"
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                      />
                      {computedPlan.trainName && (
                        <button
                          type="button"
                          onClick={() => setPlan((prev) => ({ ...prev, trainName: '' }))}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-600"
                        >
                          クリア
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      代表列車番号
                    </label>
                    <input
                      type="text"
                      value={computedPlan.defaultTrainNumber}
                      onChange={(e) =>
                        setPlan((prev) => ({ ...prev, defaultTrainNumber: e.target.value }))
                      }
                      placeholder="試9001レ"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* 両数設定 */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      編成両数 ({computedPlan.cars}両編成)
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[2, 4, 6, 8, 10, 12, 15].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setPlan((prev) => ({ ...prev, cars: c }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            computedPlan.cars === c
                              ? 'bg-slate-800 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {c}両
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 観測再生倍速 */}
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1.5">
                      発車時の観測再生倍速
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {[1, 2, 5, 10, 30, 60].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setPlan((prev) => ({ ...prev, speedMultiplier: s }))}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            computedPlan.speedMultiplier === s
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {s}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------
              TAB 4: テンプレート・プリセット保存＆呼び出し
          ---------------------------------------------------------------- */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              {/* 現在の設定を保存 */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
                <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                  <Save className="w-4 h-4 text-sky-600" />
                  <span>現在作成中の列車プランをブラウザに保存</span>
                </h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={presetNameInput}
                    onChange={(e) => setPresetNameInput(e.target.value)}
                    placeholder="プリセット名を入力（例：東上〜みなとみらい4社直通急行）"
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                  <button
                    type="button"
                    onClick={handleSavePreset}
                    className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>保存する</span>
                  </button>
                </div>
                {saveSuccessMessage && (
                  <p className="text-xs font-bold text-emerald-600">{saveSuccessMessage}</p>
                )}
              </div>

              {/* 保存済みマイプリセット一覧 */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-2xs">
                <h4 className="text-xs font-extrabold text-slate-800">
                  保存済みマイプリセット ({savedPresets.length}件)
                </h4>
                {savedPresets.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    まだ保存されたプリセットはありません。上のフォームからいつでも保存できます。
                  </p>
                ) : (
                  <div className="space-y-2">
                    {savedPresets.map((p) => {
                      const firstLine = getLine(p.segments[0]?.lineId);
                      const lastLine = getLine(p.segments[p.segments.length - 1]?.lineId);
                      return (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-sky-300 bg-slate-50/60 transition-all"
                        >
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-xs text-slate-800">
                                {p.presetName || 'マイプリセット'}
                              </span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-bold">
                                {p.segments.length}路線
                              </span>
                              {p.trainName && (
                                <span className="text-[10px] font-bold text-amber-700">
                                  「{p.trainName}」
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">
                              {firstLine?.shortName} (
                              {STATION_MAP.get(p.segments[0]?.fromStationId)?.name}) ➔{' '}
                              {lastLine?.shortName} (
                              {
                                STATION_MAP.get(
                                  p.segments[p.segments.length - 1]?.toStationId
                                )?.name
                              }
                              )
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setPlan(recalculatePlanSchedule(p, sim.currentSec));
                                setActiveTab('route');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors"
                            >
                              読み込む
                            </button>
                            <button
                              type="button"
                              onClick={() => setSavedPresets(deleteCustomTrainPreset(p.id))}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="削除"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ==================== フッター（常時ルートサマリー＆発車ボタン） ==================== */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-t border-slate-200 bg-white shrink-0">
          {/* ルート・種別・列車名サマリー */}
          {routeSummary && (
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <TrainTypeBadge
                type={computedPlan.segments[0]?.trainType || 'test_run'}
                size="md"
                lineId={computedPlan.segments[0]?.lineId}
                customType={computedPlan.useCustomType ? computedPlan.customTrainType : undefined}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900 truncate">
                  {computedPlan.trainName.trim() && (
                    <span className="text-amber-600 shrink-0">
                      「{computedPlan.trainName.trim()}」
                    </span>
                  )}
                  <span>{routeSummary.originName}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{routeSummary.destName}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono truncate">
                  {computedPlan.segments.length}路線 ・ 全{routeSummary.totalStations}駅中{' '}
                  <strong className="text-slate-700">{routeSummary.stoppingStations}駅停車</strong>{' '}
                  ・ {routeSummary.depTimeStr}発 ➔ {routeSummary.arrTimeStr}着 (約
                  {routeSummary.totalMinutes}分)
                </div>
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={() =>
                setPlan(createDefaultCustomTrainPlan(sim.currentSec, 'tojo'))
              }
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              title="初期設定にリセット"
            >
              リセット
            </button>
            <button
              type="button"
              onClick={handleLaunch}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-sky-600 text-white shadow-md hover:bg-sky-500 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>この設定で発車・追尾開始</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
