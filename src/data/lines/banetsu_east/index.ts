import type { LineDefinition } from '../../../types';
import { BANETSU_EAST_STATIONS } from './stations';
import { BANETSU_EAST_TRACK_SEGMENTS } from './trackGeometry';
import { BANETSU_EAST_TRAIN_TYPES } from './trainTypes';

export const banetsuEastLine: LineDefinition = {
  id: 'banetsu_east',
  name: 'JR磐越東線',
  shortName: '磐越東線',
  operator: 'JR東日本',
  lineColor: '#c5527a',
  accentColor: '#48bb78',
  defaultCars: 2,
  defaultBounds: [
    [37.00, 140.35],
    [37.48, 140.92],
  ],
  directionNames: {
    inbound: 'いわき方面',
    outbound: '郡山方面',
    inboundFull: '上り 小野新町・いわき方面',
    outboundFull: '下り 三春・郡山方面',
    inboundShort: 'いわき方面',
    outboundShort: '郡山方面',
  },
  stations: BANETSU_EAST_STATIONS,
  trackSegments: BANETSU_EAST_TRACK_SEGMENTS,
  trainTypes: BANETSU_EAST_TRAIN_TYPES,
  stationTimetables: { weekday: {}, holiday: {} },
  globalTimetable: [],
};
