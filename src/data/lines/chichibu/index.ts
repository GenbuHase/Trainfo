import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { CHICHIBU_STATIONS } from './stations';
import { CHICHIBU_TRACK_SEGMENTS } from './trackGeometry';
import { CHICHIBU_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const chichibuLine: LineDefinition = {
  id: 'chichibu',
  name: '秩父鉄道秩父本線',
  shortName: '秩父本線',
  operator: '秩父鉄道',
  lineColor: '#0073bc', // 秩父鉄道ブルー
  accentColor: '#dc2626', // 急行秩父路レッド
  defaultCars: 3,
  defaultBounds: [
    [35.95, 138.97], // 三峰口周辺
    [36.18, 139.54], // 羽生周辺
  ],
  directionNames: {
    inbound: '羽生方面',
    outbound: '三峰口方面',
    inboundFull: '上り 羽生方面',
    outboundFull: '下り 三峰口方面',
    inboundShort: '羽生方面',
    outboundShort: '三峰口方面',
  },
  stations: CHICHIBU_STATIONS,
  trackSegments: CHICHIBU_TRACK_SEGMENTS,
  trainTypes: CHICHIBU_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
