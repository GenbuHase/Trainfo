import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { MUSASHINO_STATIONS } from './stations';
import { MUSASHINO_TRACK_SEGMENTS } from './trackGeometry';
import { MUSASHINO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const musashinoLine: LineDefinition = {
  id: 'musashino',
  name: 'JR武蔵野線',
  shortName: '武蔵野線',
  operator: 'JR東日本',
  lineColor: '#f15a22', // 武蔵野線オレンジバーミリオン
  accentColor: '#c9252d', // 京葉線ワインレッド
  defaultBounds: [
    [35.600, 139.300], // 南西（八王子・東京湾岸）
    [35.920, 140.050], // 北東（大宮・海浜幕張）
  ],
  directionNames: {
    inbound: '府中本町・八王子方面',
    outbound: '西船橋・東京・海浜幕張方面',
    inboundFull: '西行 府中本町・八王子・大宮方面',
    outboundFull: '東行 西船橋・東京・海浜幕張方面',
    inboundShort: '府中本町方面',
    outboundShort: '西船橋方面',
  },
  stations: MUSASHINO_STATIONS,
  trackSegments: MUSASHINO_TRACK_SEGMENTS,
  trainTypes: MUSASHINO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
