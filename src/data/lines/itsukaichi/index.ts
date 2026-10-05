import type { LineDefinition, StationTimetableStore, TimetableTrip } from '../../../types';
import { ITSUKAICHI_STATIONS } from './stations';
import { ITSUKAICHI_TRACK_SEGMENTS } from './trackGeometry';
import { ITSUKAICHI_TRAIN_TYPES } from './trainTypes';
import rawStationTimetables from './stationTimetables.json';
import rawGlobalTimetable from './globalTimetable.json';

export const itsukaichiLine: LineDefinition = {
  id: 'itsukaichi',
  name: 'JR五日市線',
  shortName: '五日市線',
  operator: 'JR東日本',
  lineColor: '#f15a22', // 中央線・青梅・五日市線オレンジバーミリオン
  accentColor: '#e65100',
  defaultCars: 6,
  defaultBounds: [
    [35.710, 139.210], // 武蔵五日市周辺
    [35.740, 139.360], // 拝島周辺
  ],
  directionNames: {
    inbound: '拝島・立川・東京方面',
    outbound: '武蔵五日市方面',
    inboundFull: '上り 拝島・立川・東京方面',
    outboundFull: '下り 武蔵五日市方面',
    inboundShort: '拝島方面',
    outboundShort: '五日市方面',
  },
  stations: ITSUKAICHI_STATIONS,
  trackSegments: ITSUKAICHI_TRACK_SEGMENTS,
  trainTypes: ITSUKAICHI_TRAIN_TYPES,
  stationTimetables: rawStationTimetables as unknown as StationTimetableStore,
  globalTimetable: rawGlobalTimetable as unknown as TimetableTrip[],
};

