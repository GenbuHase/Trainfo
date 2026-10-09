import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { MINATOMIRAI_STATIONS } from './stations';
import { MINATOMIRAI_TRACK_SEGMENTS } from './trackGeometry';
import { MINATOMIRAI_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const minatomiraiLine: LineDefinition = {
  id: 'minatomirai',
  name: '横浜高速鉄道みなとみらい線',
  shortName: 'みなとみらい線',
  operator: '横浜高速鉄道',
  lineColor: '#184189', // みなとみらい線ネイビー
  accentColor: '#ea5504', // 特急オレンジ
  defaultCars: 8,
  defaultBounds: [
    [35.430, 139.610], // 元町・中華街周辺
    [35.480, 139.660], // 横浜周辺
  ],
  directionNames: {
    inbound: '横浜方面',
    outbound: '元町・中華街方面',
    inboundFull: '上り 横浜・東急東横線方面',
    outboundFull: '下り みなとみらい・元町・中華街方面',
    inboundShort: '横浜方面',
    outboundShort: '元町・中華街方面',
  },
  stations: MINATOMIRAI_STATIONS,
  trackSegments: MINATOMIRAI_TRACK_SEGMENTS,
  trainTypes: MINATOMIRAI_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
