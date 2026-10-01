import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { SAIKYO_STATIONS } from './stations';
import { SAIKYO_TRACK_SEGMENTS } from './trackGeometry';
import { SAIKYO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const saikyoLine: LineDefinition = {
  id: 'saikyo',
  name: 'JR埼京線・川越線',
  shortName: '埼京線',
  operator: 'JR東日本',
  lineColor: '#00ac9a', // 埼京線エメラルドグリーン
  accentColor: '#007ac1', // 快速ブルー
  defaultBounds: [
    [35.600, 139.460],
    [35.940, 139.740],
  ],
  stations: SAIKYO_STATIONS,
  trackSegments: SAIKYO_TRACK_SEGMENTS,
  trainTypes: SAIKYO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
