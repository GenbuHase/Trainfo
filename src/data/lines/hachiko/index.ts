import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { HACHIKO_STATIONS } from './stations';
import { HACHIKO_TRACK_SEGMENTS } from './trackGeometry';
import { HACHIKO_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const hachikoLine: LineDefinition = {
  id: 'hachiko',
  name: 'JR八高線',
  shortName: '八高線',
  operator: 'JR東日本',
  lineColor: '#a8a39d',
  accentColor: '#e06a3b',
  defaultBounds: [
    [35.64, 139.00],
    [36.34, 139.38],
  ],
  directionNames: {
    inbound: '八王子方面',
    outbound: '高崎方面',
    inboundFull: '上り 八王子方面',
    outboundFull: '下り 高崎方面',
    inboundShort: '八王子方面',
    outboundShort: '高崎方面',
  },
  stations: HACHIKO_STATIONS,
  trackSegments: HACHIKO_TRACK_SEGMENTS,
  trainTypes: HACHIKO_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};
