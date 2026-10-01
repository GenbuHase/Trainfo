import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { STATIONS } from './stations';
import { STATION_TRACK_SEGMENTS } from './trackGeometry';
import { TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const tojoLine: LineDefinition = {
  id: 'tojo',
  name: '東武東上線',
  shortName: '東上線',
  operator: '東武鉄道',
  lineColor: '#002060', // 東武グループブルー
  accentColor: '#009a74',
  defaultBounds: [
    [35.720, 139.180],
    [36.130, 139.725],
  ],
  stations: STATIONS,
  trackSegments: STATION_TRACK_SEGMENTS,
  trainTypes: TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
