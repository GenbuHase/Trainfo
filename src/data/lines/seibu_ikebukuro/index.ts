import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SEIBU_IKEBUKURO_STATIONS } from './stations';
import { SEIBU_IKEBUKURO_TRACK_SEGMENTS } from './trackGeometry';
import { SEIBU_IKEBUKURO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const seibuIkebukuroLine: LineDefinition = {
  id: 'seibu_ikebukuro',
  name: '西武池袋線',
  shortName: '池袋線',
  operator: '西武鉄道',
  lineColor: '#f39800', // 西武オレンジ
  accentColor: '#003a8c', // 西武ブルー
  defaultCars: 10,
  defaultBounds: [
    [35.710, 139.050],
    [36.010, 139.730],
  ],
  directionNames: {
    inbound: '池袋方面',
    outbound: '所沢・飯能・西武秩父方面',
    inboundFull: '上り 池袋・豊洲・元町・中華街方面',
    outboundFull: '下り 所沢・飯能・西武秩父方面',
    inboundShort: '池袋方面',
    outboundShort: '西武秩父方面',
  },
  stations: SEIBU_IKEBUKURO_STATIONS,
  trackSegments: SEIBU_IKEBUKURO_TRACK_SEGMENTS,
  trainTypes: SEIBU_IKEBUKURO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
