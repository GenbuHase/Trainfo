import React, { useState, useMemo } from 'react';
import {
  X,
  Play,
  Train,
  Bookmark,
  ChevronRight,
} from 'lucide-react';
import { useUI } from '../../../contexts/UIContext';
import { useSimulation } from '../../../contexts/SimulationContext';
import { useSelection } from '../../../contexts/SelectionContext';
import {
  getAllLines,
  getLinesGroupedByOperator,
  getLine,
} from '../../../data/linesRegistry';
import { STATION_MAP } from '../../../data/stations';
import { TrainTypeBadge } from '../../Common/Badges';
import {
  createDefaultCustomTrainPlan,
  recalculatePlanSchedule,
  buildSegmentStops,
  createRouteSegment,
  appendConnectedSegment,
  getConnectableLines,
  findConnectingStationPairs,
  secondsToHHMM,
  hhmmToSeconds,
  loadSavedCustomTrainPresets,
  saveCustomTrainPreset,
  reorderCustomTrainPresets,
  renameCustomTrainPreset,
  type CustomTrainPlan,
} from '../../../services/testTrainService';
import { timeStringToSeconds } from '../../../data/timetableData';
import type { LineId, TrainTypeKey } from '../../../types';
import type { CreatorTab, RouteSummaryInfo } from './constants';
import { ActiveTestTrainsBanner } from './ActiveTestTrainsBanner';
import { RouteTab } from './RouteTab';
import { StopsTab } from './StopsTab';
import { CustomizeTab } from './CustomizeTab';
import { PresetsTab } from './PresetsTab';

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

  // プリセット保存・並び替え・リネーム用の状態
  const [savedPresets, setSavedPresets] = useState<CustomTrainPlan[]>(() =>
    loadSavedCustomTrainPresets()
  );
  const [presetNameInput, setPresetNameInput] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);
  const [draggedPresetIdx, setDraggedPresetIdx] = useState<number | null>(null);
  const [dragOverPresetIdx, setDragOverPresetIdx] = useState<number | null>(null);
  const [editingPresetId, setEditingPresetId] = useState<string | null>(null);
  const [editingPresetNameValue, setEditingPresetNameValue] = useState('');

  const allLines = useMemo(() => getAllLines(), []);
  const groupedByOperator = useMemo(() => getLinesGroupedByOperator(), []);

  // 表示用の計算済みプラン（現在時刻連動）
  const computedPlan = useMemo(
    () => recalculatePlanSchedule(plan, sim.currentSec),
    [plan, sim.currentSec]
  );

  // 最終路線から直通可能な接続路線レコメンド
  const connectableNextLines = useMemo(() => {
    if (computedPlan.segments.length === 0) return [];
    const lastSeg = computedPlan.segments[computedPlan.segments.length - 1];
    return getConnectableLines(lastSeg.lineId, lastSeg.toStationId, lastSeg.fromStationId).slice(0, 10);
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

  // 全ルートを丸ごと逆転
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
    pattern: 'type_default' | 'all_stop' | 'major_only' | 'nonstop',
    targetSegId?: string
  ) => {
    setPlan((prev) => {
      const effectiveSegId = targetSegId || (selectedStopSegmentFilter !== 'all' ? selectedStopSegmentFilter : undefined);

      const nextSegments = prev.segments.map((seg, segIdx) => {
        if (effectiveSegId && seg.id !== effectiveSegId) {
          return seg;
        }

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
      const curStop = currentComputed.segments[segIdx]?.stops[stopIdx];
      const refSec = curStop?.arrivalSec ?? sim.currentSec;
      const newSec = hhmmToSeconds(newHHMM, refSec);

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
          let stopDuration = st.stopDurationSec;
          if (st.manualDepartureSec !== undefined) {
            stopDuration = Math.max(0, st.manualDepartureSec - newSec);
          }
          return {
            ...st,
            manualArrivalSec: newSec,
            manualStopDurationSec: stopDuration,
            stopDurationSec: stopDuration,
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
      const currentComputed = recalculatePlanSchedule(prev, sim.currentSec);
      const curStop = currentComputed.segments[segIdx]?.stops[stopIdx];
      const curArrival = curStop?.arrivalSec ?? sim.currentSec;
      const newDepSec = curArrival + clamped;

      const nextSegments = prev.segments.map((seg, sIdx) => {
        if (sIdx !== segIdx) return seg;
        const nextStops = seg.stops.map((st, idx) => {
          if (idx !== stopIdx) return st;
          return {
            ...st,
            isPassing: clamped === 0 ? st.isPassing : false,
            manualDepartureSec: newDepSec,
            stopDurationSec: clamped,
            manualStopDurationSec: clamped,
          };
        });
        return { ...seg, stops: nextStops };
      });
      return recalculatePlanSchedule({ ...prev, segments: nextSegments }, sim.currentSec);
    });
  };

  // 個別駅の発車時刻（HH:MM または HH:MM:SS）を手動変更
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
            manualDepartureSec: targetDepSec,
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
          manualDepartureSec: undefined,
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
      presetNameInput.trim() ||
      computedPlan.presetName?.trim() ||
      computedPlan.trainName.trim() ||
      `${STATION_MAP.get(computedPlan.segments[0]?.fromStationId)?.name || '始発'}→${
        STATION_MAP.get(computedPlan.segments[computedPlan.segments.length - 1]?.toStationId)?.name || '終着'
      }`;
    const nameToUse = defaultName;
    const updated = saveCustomTrainPreset(computedPlan, nameToUse);
    setSavedPresets(updated);
    const savedPreset = updated.find((p) => p.presetName === nameToUse);
    if (savedPreset) {
      setPlan((prev) => ({
        ...prev,
        id: savedPreset.id,
        presetName: savedPreset.presetName,
      }));
    }
    setPresetNameInput(nameToUse);
    setSaveSuccessMessage(`「${nameToUse}」を保存しました`);
    setTimeout(() => setSaveSuccessMessage(null), 3000);
  };

  // プリセットのドラッグ＆ドロップ並び替えハンドラー
  const handlePresetDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedPresetIdx(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handlePresetDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverPresetIdx !== index) {
      setDragOverPresetIdx(index);
    }
  };

  const handlePresetDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    e.preventDefault();
    if (draggedPresetIdx !== null && draggedPresetIdx !== dropIndex) {
      const next = [...savedPresets];
      const [moved] = next.splice(draggedPresetIdx, 1);
      next.splice(dropIndex, 0, moved);
      setSavedPresets(reorderCustomTrainPresets(next));
    }
    setDraggedPresetIdx(null);
    setDragOverPresetIdx(null);
  };

  const handlePresetDragEnd = () => {
    setDraggedPresetIdx(null);
    setDragOverPresetIdx(null);
  };

  // プリセット名リネームハンドラー
  const handleStartRenamePreset = (preset: CustomTrainPlan) => {
    setEditingPresetId(preset.id);
    setEditingPresetNameValue(preset.presetName || 'マイプリセット');
  };

  const handleCommitRenamePreset = (presetId: string) => {
    const trimmed = editingPresetNameValue.trim();
    if (trimmed) {
      const updated = renameCustomTrainPreset(presetId, trimmed);
      setSavedPresets(updated);
      if (plan.id === presetId) {
        setPlan((prev) => ({ ...prev, presetName: trimmed }));
        setPresetNameInput(trimmed);
      }
    }
    setEditingPresetId(null);
  };

  const handleCancelRenamePreset = () => {
    setEditingPresetId(null);
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
  const routeSummary = useMemo<RouteSummaryInfo | null>(() => {
    const segs = computedPlan.segments;
    if (segs.length === 0) return null;
    const firstSt = STATION_MAP.get(segs[0].fromStationId);
    const lastSt = STATION_MAP.get(segs[segs.length - 1].toStationId);
    const firstStop = segs[0].stops[0];
    const lastSegStops = segs[segs.length - 1].stops;
    const lastStop = lastSegStops[lastSegStops.length - 1];

    let totalStations = 0;
    let stoppingStations = 0;
    segs.forEach((s, idx) => {
      s.stops.forEach((st, stIdx) => {
        if (idx > 0 && stIdx === 0) return;
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
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 text-white shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30 shrink-0">
              <Train className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                試運転・臨時列車作成
              </h3>
              <p className="text-[11px] text-slate-300 hidden sm:block truncate">
                路線、種別、停車駅、発着時刻等を自由に設定できます
              </p>
            </div>
          </div>
          <button
            onClick={ui.closeTestRun}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            title="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ==================== 現在稼働中・予約中の試験・臨時列車バナー ==================== */}
        <ActiveTestTrainsBanner
          registeredCustomChains={registeredCustomChains}
          onClearTestTrains={sim.clearTestTrains}
          onTrackTrain={handleTrackTrain}
          onRemoveTestTrain={sim.removeTestTrain}
        />

        {/* ==================== ステップ・タブナビゲーション (4等分固定グリッドではみ出し防止) ==================== */}
        <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 px-2 sm:px-6 pt-2 gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('route')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-2.5 text-[11px] sm:text-xs font-bold border-b-2 transition-all min-w-0 ${
              activeTab === 'route'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] flex items-center justify-center font-black shrink-0">
              1
            </span>
            <span className="truncate sm:hidden">路線・種別</span>
            <span className="truncate hidden sm:inline">路線・種別</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stops')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-2.5 text-[11px] sm:text-xs font-bold border-b-2 transition-all min-w-0 ${
              activeTab === 'stops'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] flex items-center justify-center font-black shrink-0">
              2
            </span>
            <span className="truncate sm:hidden">停車駅</span>
            <span className="truncate hidden sm:inline">停車駅</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('customize')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-2.5 text-[11px] sm:text-xs font-bold border-b-2 transition-all min-w-0 ${
              activeTab === 'customize'
                ? 'border-sky-600 text-sky-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 text-[10px] flex items-center justify-center font-black shrink-0">
              3
            </span>
            <span className="truncate sm:hidden">名称・編成</span>
            <span className="truncate hidden sm:inline">名称・編成</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 py-2.5 text-[11px] sm:text-xs font-bold border-b-2 transition-all min-w-0 ${
              activeTab === 'presets'
                ? 'border-amber-500 text-amber-700 bg-white rounded-t-lg shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 rounded-t-lg'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate sm:hidden">
              保存{savedPresets.length > 0 ? `(${savedPresets.length})` : ''}
            </span>
            <span className="truncate hidden sm:inline">
              プリセット{savedPresets.length > 0 ? ` (${savedPresets.length})` : ''}
            </span>
          </button>
        </div>

        {/* ==================== メインコンテンツエリア ==================== */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
          {activeTab === 'route' && (
            <RouteTab
              computedPlan={computedPlan}
              connectableNextLines={connectableNextLines}
              addingLineModalOpen={addingLineModalOpen}
              editingSegmentIdxForLine={editingSegmentIdxForLine}
              lineSearchQuery={lineSearchQuery}
              selectedOperator={selectedOperator}
              groupedByOperator={groupedByOperator}
              filteredLines={filteredLines}
              onSetEditingSegmentIdxForLine={setEditingSegmentIdxForLine}
              onSetAddingLineModalOpen={setAddingLineModalOpen}
              onSetLineSearchQuery={setLineSearchQuery}
              onSetSelectedOperator={setSelectedOperator}
              onRemoveSegment={handleRemoveSegment}
              onUpdateSegmentStations={handleUpdateSegmentStations}
              onReverseSegment={handleReverseSegment}
              onReverseEntireRoute={handleReverseEntireRoute}
              onUpdateSegmentTrainType={handleUpdateSegmentTrainType}
              onUpdateSegmentMeta={handleUpdateSegmentMeta}
              onAddConnectedLine={handleAddConnectedLine}
              onReplaceSegmentLine={handleReplaceSegmentLine}
            />
          )}

          {activeTab === 'stops' && (
            <StopsTab
              computedPlan={computedPlan}
              currentSec={sim.currentSec}
              selectedStopSegmentFilter={selectedStopSegmentFilter}
              stationSearchQuery={stationSearchQuery}
              onSetPlan={setPlan}
              onSetSelectedStopSegmentFilter={setSelectedStopSegmentFilter}
              onSetStationSearchQuery={setStationSearchQuery}
              onResetAllManualTimes={handleResetAllManualTimes}
              onApplyBatchStopPattern={handleApplyBatchStopPattern}
              onToggleStationPassing={handleToggleStationPassing}
              onManualArrivalTimeChange={handleManualArrivalTimeChange}
              onManualDepartureTimeChange={handleManualDepartureTimeChange}
              onManualStopDurationChange={handleManualStopDurationChange}
            />
          )}

          {activeTab === 'customize' && (
            <CustomizeTab
              computedPlan={computedPlan}
              routeSummary={routeSummary}
              onSetPlan={setPlan}
            />
          )}

          {activeTab === 'presets' && (
            <PresetsTab
              currentSec={sim.currentSec}
              presetNameInput={presetNameInput}
              saveSuccessMessage={saveSuccessMessage}
              savedPresets={savedPresets}
              draggedPresetIdx={draggedPresetIdx}
              dragOverPresetIdx={dragOverPresetIdx}
              editingPresetId={editingPresetId}
              editingPresetNameValue={editingPresetNameValue}
              onSetPresetNameInput={setPresetNameInput}
              onSavePreset={handleSavePreset}
              onPresetDragStart={handlePresetDragStart}
              onPresetDragOver={handlePresetDragOver}
              onPresetDrop={handlePresetDrop}
              onPresetDragEnd={handlePresetDragEnd}
              onSetEditingPresetNameValue={setEditingPresetNameValue}
              onStartRenamePreset={handleStartRenamePreset}
              onCommitRenamePreset={handleCommitRenamePreset}
              onCancelRenamePreset={handleCancelRenamePreset}
              onSetPlan={setPlan}
              onSetActiveTab={setActiveTab}
              onSetSavedPresets={setSavedPresets}
            />
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
